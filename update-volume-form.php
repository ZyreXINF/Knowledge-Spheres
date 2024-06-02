<?php
session_start();
$cookie_name = "user";

$volumeToAdd = $_REQUEST['volumeToAdd'];
$sphereName = $_REQUEST['sphereName'];

$host = "localhost:3306";
$dbname = "pjbelamy_ks_db";
$username = "pjbelamy_ks_admin";
$password = "-}3l3fg0t^ZCai!wT]";

$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
$result = mysqli_query($conn, $query_user_id);
$row = mysqli_fetch_row($result);
$user_id = $row[0];

$sql = "UPDATE spheres SET volume = volume+'$volumeToAdd' WHERE user_id = '$user_id' AND name = '$sphereName'";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

$date = date("Y-m-d");

$sql_check = "SELECT COUNT(*) AS count FROM volume_daily WHERE add_date = '$date' AND user_id = '$user_id'";
$result_check = mysqli_query($conn, $sql_check);
$row_check = mysqli_fetch_assoc($result_check);
$count = $row_check['count'];

echo json_encode($count);

if ($count != 0) {
    // Record exists, so update it
    $sql2 = "UPDATE volume_daily SET volume_added = volume_added + '$volumeToAdd' WHERE add_date = '$date' AND user_id = '$user_id'";
} else {
    // Record does not exist, so insert a new record
    $sql2 = "INSERT INTO volume_daily (volume_added, add_date, user_id) VALUES ('$volumeToAdd', '$date', '$user_id')";
}

$stmt2 = mysqli_stmt_init($conn);
if (!mysqli_stmt_prepare($stmt2, $sql2)) {
    die(mysqli_error($conn));
}
mysqli_stmt_execute($stmt2);

?>