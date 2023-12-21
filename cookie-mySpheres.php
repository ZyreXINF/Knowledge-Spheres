<?php
session_start();

$cookie_name = "user";

if(!isset($_COOKIE[$cookie_name])) {
  // echo "Cookie named '" . $cookie_name . "' is not set!";
  header('location:register.html');
} else {
  // echo "Cookie '" . $cookie_name . "' is set!<br>";
  // echo "Value is: " . $_COOKIE[$cookie_name];

  $host = "localhost:3306";
  $dbname = "pjbelamy_ks_data";
  $username = "pjbelamy_ks_admin";
  $password = "-}3l3fg0t^ZCai!wT]";
  
  $conn = mysqli_connect($host, $username, $password, $dbname);

  if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
  }
  
  $query_name=" SELECT * FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
  
  $result=mysqli_query($conn, $query_name); 
  $row = mysqli_fetch_array($result);
  $user_name = $row[1];
  $user_email = $row[2];
  $_SESSION['user_name'] = $user_name;
  $_SESSION['user_email'] = $user_email;
  
  
  header("location:mySpheres1.html");
}
?>
