<?php
session_start();
$cookie_name = "user";

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$name = $_REQUEST["badge_name"];
$obtainment_date = date("Y-m-d");

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$query_save = "INSERT INTO badges (name, obtainment_date, user_id) VALUES (?, ?, ?)";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "ssi", $name, $obtainment_date, $user_id);
mysqli_stmt_execute($stmt);

mysqli_close($conn);
?>
