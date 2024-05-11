<?php
session_start();
$cookie_name = "user";

$email = isset($_REQUEST["userEmail"]) ? $_REQUEST["userEmail"] : null;
$name = isset($_REQUEST["userName"]) ? $_REQUEST["userName"] : null;
$userPassword = isset($_REQUEST["userPassword"]) ? $_REQUEST["userPassword"] : null;
$firstappend = true;

echo json_encode($name);
echo json_encode($email);
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
    $firstappend = false;

    $decreaseLimit = "UPDATE gay SET name_change = name_change-1 WHERE email = '$_COOKIE[$cookie_name]'";

    $DecreaseStmt = mysqli_stmt_init($conn);

    if ( ! mysqli_stmt_prepare($DecreaseStmt, $decreaseLimit)) {
        die(mysqli_error($conn));
    }

    mysqli_stmt_execute($DecreaseStmt);


}if(!is_null($email)){
    if(!$firstappend){
        $sql_query .= ",";
    }
    $sql_query .= " email = '$email'";
    $firstappend = false;
    $_SESSION['email'] = $email;
    setcookie($cookie_name, $email, time() + (86400 * 30), "/");
}if(!is_null($userPassword)){
    $userPassword = md5($userPassword);
    if(!$firstappend){
        $sql_query .= ",";
    }
    $sql_query .= " userPassword = '$userPassword'";
}

$sql_query .= "WHERE id = '$user_id'";

echo json_encode($sql_query);


$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql_query)) {
    die(mysqli_error($conn));
}

mysqli_stmt_execute($stmt);

// $result=mysqli_query($conn, $sql); 
// $row = mysqli_fetch_array($result);
?>