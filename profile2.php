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
  <link href="profilestyle1.css" rel="stylesheet" type="text/css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script type="module" src="profile.js"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>

<body>
  <a href="home.html">
    <img class="logo" src="logo_transparent.png">
  </a>
  <!-- ====== BADGE INSPECTION MODAL ====== -->
  <dialog badge-modal>
    <img id="imageElement" src="wisdom_badge.png">
    <h3 id="nameElement">You don't need to see it</h3>
    <h4 id="rarityElement">You don't need to see it</h4>
    <h5 id="obtainmentDate" >You don't need to see it</h5>
    <p id ="badgeDescriptionElement"class="badge_description">You don't need to see it.</p>
    <button badge-close-modal>OK</button>
  </dialog>
  <!-- ====== EDIT PROFILE MODAL ====== -->
  <dialog settings-modal>
    <p>Change Username</p>
    <p>Change Password</p>
    <button settings-close-modal>OK</button>
  </dialog>
  <!-- =================== -->
  <div class='container'>
    <nav id="nav-bar">
      <a class="nav-link" href="home.html">Home</a>
      <a class="nav-link" href="cookie-form.php">Profile</a>
      <a class="nav-link" href="cookie-mySpheres.php">My Spheres</a>
      <a class="nav-link" href="about2.html">About Us</a>
      <a class="nav-link" href="upgrade.html">Upgrade</a>
      <a class="nav-link" href="contact1.html">Contact</a>
    </nav>
    <div class="profile">
      <div class="row1">
        <img class="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png">
        <p id="username"><?php echo $user_name; ?></p>
      </div>
      <hr>
      <div class="row2">
        <img class="graph_img" src="https://cdn-icons-png.freepik.com/512/1270/1270360.png">
        <div class="graph_info">
          <p>📅 Date joined: <span class="blue">01/01/2024</span></p>
          <p>📖 Spheres created: <span class="blue">0</span></p>
          <p>🔥 Current streak: <span class="blue">0 days</span></p>
          <button class="graph_button">See more ></button>
        </div>
      </div>
      <hr>
      <a>Badges</a>
      <div class="badges_list" id="badges_list">
      </div>
      <a>Email</a>
      <p id="email" ><?php echo $user_email; ?></p>
      <br>
      <br>
      <button class="settings_button">⚙️ Settings</button>
      <!-- <button id="logoutButton">log out</button>  -->
    </div>
  </div>
</body>

<br><br><br><br>

<footer>
  <p>© Knowledge Spheres 2024. All rights reserved.</p>
  <a class="fa fa-twitter"></a><a href="https://twitter.com/K_Spheres" target="_blank">Twitter</a>
  <a class="fa fa-youtube"></a><a href="https://youtu.be/uHgt8giw1LY?si=utR2TiP94lhEoFxW" target="_blank">Youtube</a>
  <a>☕</a><a href="https://www.buymeacoffee.com/knowledgespheres" target="_blank">Buy us a coffee</a>
</footer>

</html>