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

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$sql_query = "SELECT volume_added FROM volume_daily WHERE user_id = '$user_id' ORDER BY add_date ASC LIMIT 10";
$result = mysqli_query($conn, $sql_query);
// $row = mysqli_fetch_assoc($result);

$rows = array(); // Initialize an array to store all rows

while ($row = mysqli_fetch_assoc($result)) {
    $rows[] = $row; // Append each row to the array
}

// проблема в том что в массив записываеться только одно значение, точнее первое что выходит из квери. я кушать 
// $data = array($row['volume_added']);

//$data = $result;
echo json_encode($rows);

mysqli_close($conn);
?>