<?php

$cookie_name = "user";

if(!isset($_COOKIE[$cookie_name])) {
  echo "Cookie named '" . $cookie_name . "' is not set!";
  header('location:register.html');
} else {
  echo "Cookie '" . $cookie_name . "' is set!<br>";
  $test1 = $_COOKIE[$cookie_name];
  echo "Value is: " . urlencode($test1);
}
?>      
