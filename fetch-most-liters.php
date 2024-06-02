<?php
session_start();
$cookie_name = "user";

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect(hostname: $host,
                       username: $username,
                       password: $password,
                       database: $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$sql_query = "SELECT volume_added FROM volume_daily WHERE user_id = '$user_id' ORDER BY volume_added DESC LIMIT 1";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_row($result);

echo json_encode($row);

mysqli_close($conn);
?>