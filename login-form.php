<?php
session_start();

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";

$conn = mysqli_connect(hostname: $host,
username: $username,
password: $password,
database: $dbname);


$email = mysqli_real_escape_string($conn, $_POST['email']);
$userPassword = $_POST["userPassword"];

$sql = " SELECT * FROM registration WHERE email = '$email' && userPassword = '$userPassword' ";

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0){

$row = mysqli_fetch_array($result);

    $_SESSION['email'] = $row['email'];
    header('location:register.php');

 }else{
    $error[] = 'incorrect email or password!';
 }

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
 
    die(mysqli_error($conn));
}



mysqli_stmt_execute($stmt);

echo "Connected ";
?>