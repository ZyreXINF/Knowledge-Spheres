<?php
session_start();

$email = $_REQUEST["userEmail"];
$name = $_REQUEST["userName"];
$userPassword = md5($_REQUEST["userPassword"]);
$pfp = "pfp1";
$frame = "none";

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

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

    $day_streak_sequence = "0000000001";
    $last_day_online = date("Y-m-d");
    $best_streak = 1;
    $current_streak = 1;
    $sql3 = "INSERT INTO streak (day_streak_sequence, last_day_online, best_streak,	current_streak, email) VALUES (?,?,?,?,?)";
    
    $stmt3 = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt3, $sql3)) {
        die(mysqli_error($conn));
    }
    
    mysqli_stmt_bind_param($stmt3, "ssiis", $day_streak_sequence, $last_day_online, $best_streak, $current_streak, $email);
    mysqli_stmt_execute($stmt3);


    $limit = 1;

    $sql4 = "INSERT INTO gay (name_change, email) VALUES (?, ?)";
    
    $stmt4 = mysqli_stmt_init($conn);
    
    if (!mysqli_stmt_prepare($stmt4, $sql4)) {
        die(mysqli_error($conn));
    }
    
    mysqli_stmt_bind_param($stmt4, "is", $limit, $email);
    mysqli_stmt_execute($stmt4);
    
    echo json_encode("true");
}

// close the connection
mysqli_close($conn);
?>