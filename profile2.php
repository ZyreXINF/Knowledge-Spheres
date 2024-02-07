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
  <!-- ====== SETTINGS MODAL ====== -->
  <dialog settings-modal>
    <a settings-close-modal>X</a>
    <h2>Username</h2>
    <button class="edit_username_button" id="edit_username_button">edit</button>
    <br>
    <input class="username_input" id="username_input" disabled value=<?php echo $user_name; ?>></input>

    <hr>

    <h2>Email</h2>
    <button class="edit_email_button" id="edit_email_button">edit</button>
    <br>
    <input class="email_input" id="email_input" disabled value=<?php echo $user_email; ?>></input>

    <hr>

    <h2>Password</h2>
    <button class="edit_password_button" id="edit_password_button">edit</button><br>
    <div class="one_line">
      <input disabled type="password" class="old_password" id="old_password" placeholder="Old password"></input>
      <input disabled type="password" class="new_password" id="new_password" placeholder="New password"></input>
    </div>

    <hr>
    <br>

    <div class="red_buttons">
      <button id="logoutButton">Log out</button>
      <button id="deleteAccountButton">Delete account</button>
    </div>

    <br>
    <br>
    <br>
    <button id="save_settings_button">Save</button>
  </dialog>

  <!--  ====== PFP CHANGE MODAL====== -->
  <dialog pfp-modal>
    <div id="pfp_list">
    </div>
    <button pfp-close-modal>OK</button>
  </dialog>
  <!-- ====== FRAME CHANGE MODAL ====== -->
  <dialog frame-modal>
    <div id="frame_list">
    </div>
    <button frame-close-modal id="frame_save_button">OK</button>
  </dialog>
<!--  ===== USERNAME CHANGE ===== --> 
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
        <button frame-open-modal id="frame">⚙️ Frame</button>
        <div class="image-container">
          <img id="pfp" class="pfp" src="pfp1.png">
          <img id="pfp_frame" class="pfp_frame" src="frame0.png">
        </div>
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
      <button class="settings_button" id="settings_button">⚙️ Settings</button>
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