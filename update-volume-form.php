<?php
session_start();
$cookie_name = "user";

$volumeToAdd = $_REQUEST['volumeToAdd'];
$sphereName = $_REQUEST['sphereName'];

$host = "localhost";
$dbname = "ks_db";
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

$sql = "UPDATE spheres SET volume = volume+'$volumeToAdd' WHERE user_id = '$user_id' AND name = '$sphereName'";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

$date = date("Y-m-d");
// $sql2 = "INSERT INTO volume_daily (volume_added, date, user_id) VALUES ('$volumeToAdd', '$date', '$user_id')
//     ON DUPLICATE KEY UPDATE
//     $volumeToAdd = VALUES('$date'),
//         column2 = VALUES(column2),"
// $sql2 = "IF EXISTS (
//     SELECT 1 
//     FROM your_table_name 
//     WHERE date = 'your_date_value' AND user_id = 'your_user_id_value'
// ) THEN
//     UPDATE your_table_name 
//     SET other_columns = 'new_values'
//     WHERE date = 'your_date_value' AND user_id = 'your_user_id_value';
// ELSE
//     INSERT INTO your_table_name (date, user_id, other_columns)
//     VALUES ('your_date_value', 'your_user_id_value', 'other_column_values');
// END IF;"

// $result=mysqli_query($conn, $sql); 
// $row = mysqli_fetch_array($result);
?>