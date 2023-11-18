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
  $user_name = $row[1];
  $user_email = $row[2];
  $_SESSION['user_name'] = $user_name;
  $_SESSION['user_email'] = $user_email;
  
  
  header("location:profile2.php?user_name=" . urlencode($user_name). " " . "user_email=" . urlencode($user_email));
}
?>      
