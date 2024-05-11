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


$sql_query = "SELECT name_change FROM gay WHERE email = '$_COOKIE[$cookie_name]'";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_row($result);

echo json_encode($row[0]);

mysqli_close($conn);
?>