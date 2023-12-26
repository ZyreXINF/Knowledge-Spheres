<?php
session_start();
$cookie_name = "user";

$tier = $_POST['updatedTier'];
$sphereName = $_POST['sphereName'];

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$sql = "UPDATE spheres SET tier='$tier' WHERE user_id='$user_id' AND name='$sphereName'";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

// $result=mysqli_query($conn, $sql); 
// $row = mysqli_fetch_array($result);
