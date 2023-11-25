<?php

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

$name = $_POST["name"];
$color = "#ff0000"; 
$volume = 0;
$tier = "common";
$url = $name . '/' . md5($name);

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];


$query_save = "INSERT INTO spheres ( name, color, volume, tier, url, user_id)
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $query_save)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "ssissi",
                       $name,
                       $color,
                       $volume,
                       $tier,
                       $url,
                       $user_id);

mysqli_stmt_execute($stmt);

?>
