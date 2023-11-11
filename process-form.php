<?php
session_start();

$name = $_POST["name"];
$email = $_POST["email"];
$userPassword = $_POST["userPassword"];

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

$sql = "INSERT INTO registration ( name, email, userPassword)
        VALUES (?, ?, ?)";

$sql2 = " SELECT * FROM registration WHERE email = '$email' AND userPassword = '$userPassword' ";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "sss",
                       $name,
                       $email,
                       $userPassword);


$result = mysqli_query($conn, $sql2);
$row = mysqli_fetch_array($result);

if(!$_SESSION['email'] = $row['email']){
    header('location:alert_register.html');
}else{
    header('location:login.html');
}

mysqli_stmt_execute($stmt);

