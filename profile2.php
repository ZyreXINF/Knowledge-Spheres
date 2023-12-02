<?php session_start();
$user_name = $_SESSION['user_name'];
$user_email = $_SESSION['user_email'];
?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Profile</title>
  <link href="profilestyle.css" rel="stylesheet" type="text/css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>

<body>
  <div class='container'>
    <nav id="nav-bar">
      <a class="nav-link" href="index.html">Home</a>
      <a class="nav-link" href="profile.php">Profile</a>
      <a class="nav-link" href="myspheres1.html">My Spheres</a>
      <a class="nav-link" href="about1.html">About Us</a>
      <a class="nav-link" href="contact.html">Contact</a>
    </nav>
    <h1>Profile</h1>
    <div class="profile">
      <a>Name</a>
      <p id="username"><?php echo $user_name; ?></p>
      <a>Badges</a>
      <p>None</p>
      <a>Email</a>
      <p id="email" ><?php echo $user_email; ?></p>
    </div>
  </div>
</body>

<br><br><br><br>

<footer>
  <p>Copyright © 2023 Knowledge Spheres</p>
  <a class="fa fa-twitter"></a><a href="https://twitter.com/K_Spheres" target="_blank">Twitter</a>
  <a class="fa fa-youtube"></a><a href="https://youtu.be/uHgt8giw1LY?si=utR2TiP94lhEoFxW" target="_blank">Youtube</a>
  <a>☕</a><a href="https://www.buymeacoffee.com/knowledgespheres" target="_blank">Buy us a coffee</a>
</footer>

</html>