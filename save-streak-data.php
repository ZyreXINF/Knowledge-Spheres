<?php
session_start();
$cookie_name = "user";

$day_streak_sequence = $_REQUEST["day_streak_sequence"];
$last_day_online = date("Y-m-d");
$best_streak = $_REQUEST["best_streak"];
$current_streak = $_REQUEST["current_streak"];

$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect(hostname: $host,
                       username: $username,
                       password: $password,
                       database: $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$sql_query = "UPDATE streak SET day_streak_sequence = '$day_streak_sequence',  last_day_online = '$last_day_online' , best_streak = '$best_streak', current_streak = '$current_streak'
              WHERE email = '$_COOKIE[$cookie_name]'";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_assoc($result);

// $data = array($row['day_streak_sequence'], $row['best_streak'], $row['current_streak']);

// echo json_encode($data);

mysqli_close($conn);
?>