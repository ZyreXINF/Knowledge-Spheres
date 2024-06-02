<?php
session_start();
$cookie_name = "user";

$sphere_name = $_REQUEST["sphere_name"];

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = "SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";

$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$query_fetch_config = "SELECT color, droplet, pour, waterfall, rain, description FROM spheres 
                        WHERE user_id = '$user_id' AND name = '$sphere_name' ";
                        
$result = mysqli_query($conn, $query_fetch_config);
$row = mysqli_fetch_assoc($result);

$sphereConfiguration = array($row['color'], $row['droplet'], $row['pour'], $row['waterfall'], $row['rain'], $row['description']);
echo json_encode($sphereConfiguration);

mysqli_close($conn);
?>