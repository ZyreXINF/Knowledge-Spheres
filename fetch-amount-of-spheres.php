<?php
session_start();
$cookie_name = "user";

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect(hostname: $host,
                       username: $username,
                       password: $password,
                       database: $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = "SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]'";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$sql_query = "SELECT Count(*) FROM spheres WHERE user_id = '$user_id'";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_row($result);

echo json_encode($row[0]);

mysqli_close($conn);
?>