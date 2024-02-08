<?php
session_start();
$cookie_name = "user";

$name = $_REQUEST["badge_name"];

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = "SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$query_delete = "DELETE FROM badges WHERE name = '$name'";

$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_delete)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);
mysqli_close($conn);

?>