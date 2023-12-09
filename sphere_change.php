<?php
session_start();

if (isset($_GET['spherename'])) {
    $sphere_name = $_GET['spherename'];
} else {
    echo 'Error: IT AINT WORKING';
}

// $host = "localhost";
// $dbname = "kb_info_db";
// $username = "root";
// $password = "";

// $conn = mysqli_connect(hostname: $host,
//                        username: $username,
//                        password: $password,
//                        database: $dbname);

// if (mysqli_connect_errno()) {
//     die("Connection error: " . mysqli_connect_error());
// }

// $sql = "SELECT * FROM spheres WHERE name='$sphere_name' ";

// $result = mysqli_query($conn, $sql);
// $row = mysqli_fetch_array($result);

// $sphere_name = $row[1];
// $sphere_color = $row[2];
// $sphere_volume = $row[3];
// $sphere_tier = $row[4];

// $_SESSION["sphere_name"] = $sphere_name;
// $_SESSION["sphere_color"] = $sphere_color;
// $_SESSION["sphere_volume"] = $sphere_volume;
// $_SESSION["sphere_tier"] = $sphere_tier;

header("location:mySphere2.php?sphere_name=" . urlencode($sphere_name));