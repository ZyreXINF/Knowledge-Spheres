<?php
session_start();

$cookie_name = "user";

$newPassword = md5($_REQUEST["newPassword"]);
$email = $_REQUEST["email"];

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_save = "UPDATE registration SET userPassword = '$newPassword' WHERE email = '$email'";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);
mysqli_close($conn);
?>