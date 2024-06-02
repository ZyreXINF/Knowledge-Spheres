<?php
session_start();
$cookie_name = "user";

$badge_name = $_REQUEST["badge_name"];

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

$sql = "SELECT name FROM badges WHERE user_id = '$user_id' AND name = '$badge_name'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);
$badge = $row[0];

echo json_encode(is_null($badge));

mysqli_close($conn);

?>