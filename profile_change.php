<?php

$name = $_GET["name"];
$email = $_GET["email"];
$userPassword = $_GET["userPassword"];
$cookie_name = "user";

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";

$conn = mysqli_connect(hostname: $host,
                       username: $username,
                       password: $password,
                       database: $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}
$cookie_email = $_COOKIE[$cookie_name];

$sql = 'SELECT name FROM registration WHERE $email = "$cookie_email"';