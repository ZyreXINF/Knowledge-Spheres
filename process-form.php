<?php
session_start();

$name = $_POST["name"];
$email = $_POST["email"];
$userPassword = $_POST["userPassword"];

$host = "localhost";
$dbname = "ks_db";
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
    header('location: alert_register.html');
} else {
    $sql2 = "INSERT INTO registration (name, email, userPassword) VALUES (?, ?, ?)";

    $stmt2 = mysqli_stmt_init($conn);

    if (!mysqli_stmt_prepare($stmt2, $sql2)) {
        die(mysqli_error($conn));
    }

    mysqli_stmt_bind_param($stmt2, "sss", $name, $email, $userPassword);
    mysqli_stmt_execute($stmt2);

    header('location: login.html');
}

mysqli_stmt_execute($stmt);

// close the connection
mysqli_close($conn);
?>
