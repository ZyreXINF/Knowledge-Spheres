<?php
$cookie_name = "user";

if(!isset($_COOKIE[$cookie_name])) {
  // echo "Cookie named '" . $cookie_name . "' is not set!";
  header('location:register.html');
} else {
  // echo "Cookie '" . $cookie_name . "' is set!<br>";
  // echo "Value is: " . $_COOKIE[$cookie_name];
  header('location:profile2.html');
}

?>  