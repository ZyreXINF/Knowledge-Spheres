<?php 
session_start();
$cookie_name = "user";

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = "SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$query_badges = "SELECT name FROM badges WHERE user_id = '$user_id' AND name IN ('gold_badge', 'ruby_badge', 'diamond_badge')";
$result = mysqli_query($conn, $query_badges);
$row = mysqli_fetch_row($result);
if(!is_null($row)){  
    $badge = $row[0];
    echo json_encode($badge);
}else{
    echo json_encode("no badges");
}


?>