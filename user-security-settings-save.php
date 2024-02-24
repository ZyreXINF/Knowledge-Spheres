<?php
session_start();
$cookie_name = "user";

$email = isset($_REQUEST["userEmail"]) ? $_REQUEST["userEmail"] : null;
$name = isset($_REQUEST["userName"]) ? $_REQUEST["userName"] : null;
$userPassword = isset($_REQUEST["userPassword"]) ? $_REQUEST["userPassword"] : null;

echo json_encode($userPassword);

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

$sql_query = "UPDATE registration SET";

if(!is_null($name)){
    $sql_query .= " name = '$name'";
}if(!is_null($email)){
    $sql_query .= " email = '$email'";
    $_SESSION['email'] = $email;
    setcookie($cookie_name, $email, time() + (86400 * 30), "/");
}if(!is_null($userPassword)){
    $userPassword = md5($userPassword);
    $sql_query .= " userPassword = '$userPassword'";
}

$sql_query .= "WHERE id = '$user_id'";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql_query)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

// $result=mysqli_query($conn, $sql); 
// $row = mysqli_fetch_array($result);
?>