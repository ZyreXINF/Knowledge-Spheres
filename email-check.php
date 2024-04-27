<?php
session_start();

$email = $_REQUEST["email"];

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

$sql_query = "SELECT email FROM registration WHERE email = '$email'";
$result = mysqli_query($conn, $sql_query);

echo json_encode(mysqli_num_rows($result) > 0 ? true : false);

mysqli_close($conn);
?>