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

$query_save = "UPDATE gay SET name_change = name_change+1 WHERE email = '$_COOKIE[$cookie_name]'";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}
mysqli_stmt_execute($stmt);

mysqli_close($conn);
?>