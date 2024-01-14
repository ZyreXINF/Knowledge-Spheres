<?php
session_start();
$cookie_name = "user";

$badge_name = $_REQUEST['badge_name'];

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

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$query_obtainment_date = "SELECT obtainment_date FROM badges WHERE user_id='$user_id' AND name = '$badge_name'";
$result = mysqli_query($conn, $query_obtainment_date);
$row = mysqli_fetch_row($result);
$obtainment_date = $row[0];

echo json_encode($obtainment_date);

mysqli_close($conn);