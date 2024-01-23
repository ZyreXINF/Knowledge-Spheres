<?php
session_start();
$cookie_name = "user";

$sphere_name = $_REQUEST["sphere_name"];

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

$query_fetch_config = "SELECT color, droplet, pour, waterfall, rain, volume, tier FROM spheres 
                        WHERE user_id = '$user_id' AND name = '$sphere_name' ";
                        
$result = mysqli_query($conn, $query_fetch_config);
$row = mysqli_fetch_assoc($result);

$sphereUpload = array($row['color'], $row['droplet'], $row['pour'], $row['waterfall'], $row['rain'], $row['volume'], $row['tier']);
echo json_encode($sphereUpload);

mysqli_close($conn);
?>