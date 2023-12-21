<?php
session_start();

if (isset($_GET['spherename'])) {
    $sphere_name = $_GET['spherename']; 
} else {
    echo 'Error: IT AINT WORKING';
}

header("location:mySphere2.php?sphere_name=" . urlencode($sphere_name));
