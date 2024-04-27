<?php
session_start();

// Check if a color is received
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    if (isset($requestData['color'])) {
        // Save the received color in the session
        $_SESSION['selected_color'] = $requestData['color'];
        echo 'Color changed successfully';
    } else {
        echo 'No color data received';
    }
}
?>

