<?php session_start();
$sphere_name = $_SESSION['sphere_name'];
$sphere_color = $_SESSION['sphere_color'];
$sphere_volume = $_SESSION['sphere_volume'];
$sphere_tier = $_SESSION['sphere_tier'];
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>My Sphere</title>
  <link href="spherestyle.css" rel="stylesheet" type="text/css" />
  <link href="https://db.onlinewebfonts.com/c/028b4cfdfab5d1049178e9b1eb42f49e?family=Poppins+SemiBold" rel="stylesheet">
  <script src="sphere.js"></script>
</head>

<body>
  <a href="myspheres.html">
    <img class="back-button" src="double-arrow-left.png">
  </a>
  <div class="container">
    <a>NAME: <span><?php echo $sphere_name?></span></a>
    <a>COLOR: <span><?php echo $sphere_color?><span></a>
  </div>
  <div class="container">
    <h1 id="incrementable"><?php echo $sphere_volume?>L</h1>
    <div class="circle" id="sphere">
      <div class="wave"></div>
    </div>

    <div class="button-block">
      <button class="button-block-button-0" onclick="animateObject(); droplet()"></button>
      <button class="button-block-button-1" onclick="animateObject(); pour()"></button>
      <button class="button-block-button-2" onclick="animateObject(); pour_wide()"></button>
      <button class="button-block-button-3" onclick="animateObject(); rain()"></button>
    </div>
  </div>
  <div class="tier">
    <h2>Tier: <?php echo $sphere_tier?></h2>
    <h2>Until next tier: N</h2>
  </div>
  </div>
</body>
</html>
