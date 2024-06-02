<?php
session_start();

$cookie_name = "user";

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_delete = "DELETE FROM registration WHERE email = '$_COOKIE[$cookie_name]'";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_delete)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

mysqli_close($conn);
?>