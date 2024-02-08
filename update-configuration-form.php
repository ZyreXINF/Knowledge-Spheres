<?php
session_start();
$cookie_name = "user";

$color = $_REQUEST['color'];
$new_sphere_name = $_REQUEST['new_sphere_name'];
$old_sphere_name = $_REQUEST['old_sphere_name'];

$droplet = $_REQUEST['droplet'];
$pour = $_REQUEST['pour'];
$waterfall = $_REQUEST['waterfall'];
$rain = $_REQUEST['rain'];

$description = $_REQUEST['description'];


// $testArray = [$color, $sphereName, $droplet, $pour, $waterfall, $rain, $description];
// echo json_encode($testArray);


$host = "localhost";
$dbname = "ks_db";
$username = "root";
$password = "";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

//=========================================================================================

$query_user_id = "SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";

$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

//=========================================================================================

$query_sphere_id = "SELECT id FROM spheres WHERE name = '$old_sphere_name' AND user_id = '$user_id'";

$result = mysqli_query($conn, $query_sphere_id);
$row = mysqli_fetch_row($result);
$sphere_id = $row[0];

//=========================================================================================

$sql = "UPDATE spheres
        SET name='$new_sphere_name', color='$color', droplet='$droplet', pour='$pour', waterfall='$waterfall', rain='$rain', description='$description'
        WHERE id='$sphere_id'";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

$response = array("success" => true);
echo json_encode($response);

mysqli_close($conn);

?>