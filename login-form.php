<?php
session_start();

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";
$cookie_name = "user";

$conn = mysqli_connect(hostname: $host,
username: $username,
password: $password,
database: $dbname);


$email = mysqli_real_escape_string($conn, $_GET['email']);
$userPassword = $_GET["userPassword"];

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
    // if(!isset($_COOKIE[$cookie_name])) {
    //     echo "Cookie named '" . $cookie_name . "' is not set!";
    //   } else {
    //     echo "Cookie '" . $cookie_name . "' is set!<br>";
    //     echo "Value is: " . $_COOKIE[$cookie_name];
    //   }
    header('location:profile2.html');

 }else{
    header('location:alert_login.html');
 }

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}


mysqli_stmt_execute($stmt);

?>
