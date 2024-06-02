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

$sql_query = "SELECT day_streak_sequence, best_streak, current_streak FROM streak WHERE email = '$_COOKIE[$cookie_name]'";
$result = mysqli_query($conn, $sql_query);
$row = mysqli_fetch_assoc($result);

$data = array($row['day_streak_sequence'], $row['best_streak'], $row['current_streak']);

echo json_encode($data);

mysqli_close($conn);
?>