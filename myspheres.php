<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>My Spheres</title>
  <link href="myspheresstyle.css" rel="stylesheet" type="text/css" />
  <link href="https://db.onlinewebfonts.com/c/028b4cfdfab5d1049178e9b1eb42f49e?family=Poppins+SemiBold" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
</head>

<body>
  <div class='container'>
    <a href="index.html">
      <img class="logo" src="logo_transparent.png">
    </a>
    <nav id="nav-bar">
      <a class="nav-link" href="index.html">Home</a>
      <a class="nav-link" href="profile.html">Profile</a>
      <a class="nav-link" href="myspheres.php">My Spheres</a>
      <a class="nav-link" href="about.html">About Us</a>
      <a class="nav-link" href="contact.html">Contact</a>
    </nav>
    <h1>My Spheres</h1>
  </div>
    <form>
      <input type="name" name="name" id="txt" required maxlength=20 placeholder="Enter a name here :)">
      <button type="submit" class="btn-list", id="submitButton"> 
        <a>+</a>
      </button>
    </form>
    <div class="list">
      <div class="wrapper">
        <ul>
        </ul>
      </div>
    </div>
    <script>
      $("#submitButton").on("click", function () {
        $(document).ready(function(){
            // Use jQuery to make an AJAX request
            $.ajax({
              url: 'mySpheres-form.php', 
              type: 'POST',    
              success: function (response) {
              // Update the content of the 'result' div with the response from PHP
              $("#result").html(response);
              },
              error: function (error) {
                  console.error('Error:', error);
              }      
            });
        });
      });
    </script>
</body>
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

<footer>
  <p>Copyright © 2023 Knowledge Spheres</p>
  <a class="fa fa-twitter"></a><a href="https://twitter.com/K_Spheres" target="_blank">Twitter</a>
  <a class="fa fa-youtube"></a><a href="https://www.youtube.com/channel/UC_5ziKNCC2xGHFLhRVIjxtg" target="_blank">Youtube</a>
  <a>☕</a><a href="https://www.buymeacoffee.com/knowledgespheres" target="_blank">Buy us a coffee</a>
</footer>
</html>

<?php

// $cookie_name = "user";

// $host = "localhost";
// $dbname = "kb_info_db";
// $username = "root";
// $password = "";

// $conn = mysqli_connect(hostname: $host,
//                        username: $username,
//                        password: $password,
//                        database: $dbname);

// if (mysqli_connect_errno()) {
//     die("Connection error: " . mysqli_connect_error());
// }

// $name = $_POST["name"];
// $color = "#ff0000";
// $volume = 0;
// $url = $name . '/' . md5($name);

// $query_user_id = " SELECT id FROM registration WHERE email = '$_COOKIE[$cookie_name]' ";
// $result = mysqli_query($conn, $query_user_id);
// $row = mysqli_fetch_row($result);

// $user_id = $row[0];


// $query_save = "INSERT INTO spheres ( name, color, volume, url, user_id)
//         VALUES (?, ?, ?, ?, ?)";

// $stmt = mysqli_stmt_init($conn);

// if ( ! mysqli_stmt_prepare($stmt, $query_save)) {
//     die(mysqli_error($conn));
// }

// mysqli_stmt_bind_param($stmt, "ssisi",
//                        $name,
//                        $color,
//                        $volume,
//                        $url,
//                        $user_id);

// mysqli_stmt_execute($stmt);

// echo '<script src="mySpheresScript.js"></script>';
// echo '<script>
//   addElement();
// </script>';

?>