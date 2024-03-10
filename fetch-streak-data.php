<?php
session_start();
$cookie_name = "user";

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

$sql_query = "SELECT day_streak_sequence, last_day_online, best_streak, current_streak FROM streak WHERE email = '$_COOKIE[$cookie_name]'";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_assoc($result);

$data = array($row['day_streak_sequence'], $row['last_day_online'], $row['best_streak'], $row['current_streak']);

echo json_encode($data);

mysqli_close($conn);
?>