<?php
session_start();

$host = "localhost";
$dbname = "kb_info_db";
$username = "root";
$password = "";
$conn = mysqli_connect($host, $username, $password, $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$sphere_name = $_GET['sphere_name'];

$sql = "SELECT * FROM spheres WHERE name='$sphere_name' ";

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_array($result);

$sphere_name = $row[1];
$sphere_color = $row[2];
$sphere_volume = $row[3];
$sphere_tier = $row[4];

?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>My Sphere</title>
  <link href="spherestyle2.css" rel="stylesheet" type="text/css" />
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">

  <script type="module" src="sphere4.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
  <a href="mySpheres1.html">
    <img class="back-button" src="double-arrow-left.png">
  </a>
  <div class="container">
    <a>NAME: <span id="name"><?php echo $sphere_name?></span></a>
    <a>COLOR: <span><?php echo "<input type='color' id='color' value='$sphere_color'disabled>"?><span></a>
  </div>
  <div class="container">                                                                                                                       
    <h1 id="incrementable"><?php echo $sphere_volume ?>L</h1>
    <div class="circle" id="sphere">
      <div class="wave"></div>
    </div>

    <div class="button-block">
      <button class="button-block-button-0" id="sbmtBtn1"></button>
      <button class="button-block-button-1" id="sbmtBtn2"></button>
      <button class="button-block-button-2" id="sbmtBtn3"></button>
      <button class="button-block-button-3" id="sbmtBtn4"></button>
    </div>
  </div>
  <div class="tier">
    <h2 id="tier">Tier: <?php echo $sphere_tier?></h2>
    <h2 id="till_next_tier">Until next tier: 10L</h2>
  </div>
</body>
</html>