<?php
session_start();

$cookie_name = "user";

if(!isset($_COOKIE[$cookie_name])) {
  // echo "Cookie named '" . $cookie_name . "' is not set!";
  header('location:register.html');
} else {
  // echo "Cookie '" . $cookie_name . "' is set!<br>";
  // echo "Value is: " . $_COOKIE[$cookie_name];
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
  
  $query_name=" SELECT * FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
  
  $result=mysqli_query($conn, $query_name); 
  $row = mysqli_fetch_array($result);
  $test = implode($row);
  $_SESSION['test'] = $test;

  header("location:profile2.php?test=" . urlencode($test));
}
?>      
