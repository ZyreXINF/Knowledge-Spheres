<?php
session_start();

$cookie_name = "user";

$pfp = $_REQUEST["pfp"];
$frame = $_REQUEST["frame"];
$user_id = $_REQUEST["pfp"];

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

$query_save = "INSERT INTO profiles (pfp, frame) VALUES (?, ?)";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

$none = "none";
mysqli_stmt_bind_param($stmt, "ss", $pfp, $frame);
mysqli_stmt_execute($stmt);

?>