<?php
session_start();
$cookie_name = "user";

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

$sql = "SELECT name, color FROM spheres WHERE user_id='$user_id'";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)) {
    $spheres[] = $row;
}
echo json_encode($spheres);

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

?>