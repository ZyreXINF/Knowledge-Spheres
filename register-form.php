<?php
session_start();

$email = $_REQUEST["userEmail"];
$name = $_REQUEST["userName"];
$userPassword = md5($_REQUEST["userPassword"]);
$pfp = "pfp0";
$frame = "none";

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$sql = "SELECT * FROM registration WHERE email = ?";

$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "s", $email); 
mysqli_stmt_execute($stmt);  

$result = mysqli_stmt_get_result($stmt);
$row = mysqli_fetch_assoc($result);

if ($row && $_SESSION['email'] == $row['email']) {
    echo json_encode("false");
} else {
    $sql2 = "INSERT INTO registration (name, email, userPassword, pfp, frame) VALUES (?, ?, ?, ?, ?)";
    
    $stmt2 = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt2, $sql2)) {
        die(mysqli_error($conn));
    }
    
    mysqli_stmt_bind_param($stmt2, "sssss", $name, $email, $userPassword, $pfp, $frame);
    mysqli_stmt_execute($stmt2);
    
    echo json_encode("true");
}

// close the connection
mysqli_close($conn);
?>