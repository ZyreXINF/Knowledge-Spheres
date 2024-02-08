<?php
session_start();

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$cookie_name = "user";

$conn = mysqli_connect($host, $username, $password, $dbname);


$email = mysqli_real_escape_string($conn, $_GET['email']);
$userPassword = md5($_GET["userPassword"]);

$sql = " SELECT * FROM registration WHERE email = '$email' AND userPassword = '$userPassword' ";

$result = mysqli_query($conn, $sql);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

$row = mysqli_fetch_array($result);

    $_SESSION['email'] = $row['email'];
    setcookie($cookie_name, $email, time() + (86400 * 30), "/");
    header('location:profile2.php');

 }else{
    header('location:alert_login.html');
 }

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}


mysqli_stmt_execute($stmt);

?>
