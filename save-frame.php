<?php
session_start();

$cookie_name = "user";

$frame = $_REQUEST["frame"];

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = "SELECT id FROM registration WHERE email = ?";
$stmt_user_id = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt_user_id, $query_user_id)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt_user_id, "s", $_COOKIE[$cookie_name]);
mysqli_stmt_execute($stmt_user_id);
$result_user_id = mysqli_stmt_get_result($stmt_user_id);
$row_user_id = mysqli_fetch_row($result_user_id);
$user_id = $row_user_id[0];

$query_save = "UPDATE registration SET frame = ? WHERE id = ?";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "si", $frame, $user_id);
mysqli_stmt_execute($stmt);

?>