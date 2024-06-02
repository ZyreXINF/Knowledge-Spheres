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

$select_query = "SELECT pfp, frame FROM registration WHERE id = ?" ;
$stmt_select = mysqli_stmt_init($conn);

if (!mysqli_stmt_prepare($stmt_select, $select_query)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt_select, "i", $user_id);
mysqli_stmt_execute($stmt_select);
$result_customization = mysqli_stmt_get_result($stmt_select);
$arr_customization = mysqli_fetch_assoc($result_customization);

echo json_encode($arr_customization);

?>