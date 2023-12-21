<?php
session_start();

$name = $_POST["name"];
$email = $_POST["email"];
$userPassword = $_POST["userPassword"];

$host = "localhost:3306";
$dbname = "pjbelamy_ks_data";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect($host, $username, $password, $dbname);

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
