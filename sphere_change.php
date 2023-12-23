<?php
session_start();

if (isset($_GET['spherename'])) {
    $sphere_name = $_GET['spherename']; 
} else {
    echo 'Error: not working: sphere_change.php';
}

header("location:mySphere2.php?sphere_name=" . urlencode($sphere_name));

