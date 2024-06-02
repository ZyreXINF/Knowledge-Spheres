<?php
session_start();

$cookie_name = "user";

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$name = $_REQUEST["sphereName"];
$color = "#0621f8";     
$volume = 0;
$tier = "Common";
    
$droplet = "droplet";
$pour = "pour";
$waterfall = "waterfall";
$rain = "rain";
$description = "";

$query_user_id = "SELECT id FROM registration WHERE email = ?";
$stmt_user_id = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt_user_id, $query_user_id)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt_user_id, "s", $_COOKIE[$cookie_name]);
mysqli_stmt_execute($stmt_user_id);
$result_user_id = mysqli_stmt_get_result($stmt_user_id);
$row_user_id = mysqli_fetch_row($result_user_id);
$user_id = $row_user_id[0];

$query_save = "INSERT INTO spheres (name, color, droplet, pour, waterfall, rain, description, volume, tier, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

$none = "none";
mysqli_stmt_bind_param($stmt, "sssssssdsi", $name, $color, $droplet, $none, $none, $none, $description, $volume, $tier, $user_id);
mysqli_stmt_execute($stmt);

?>