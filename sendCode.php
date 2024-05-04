<?php
session_start();

// Check if email and code are set in the request
if(isset($_REQUEST['email']) && isset($_REQUEST['code'])) {
    $email = $_REQUEST['email'];
    $code = $_REQUEST['code'];

    // Include PHPMailer library
    require "Mail/phpmailer/PHPMailerAutoload.php";
    // $mail = new PHPMailer;

    // $mail->isSMTP();
    // $mail->Host='smtp.gmail.com';
    // $mail->Port=587;
    // $mail->SMTPAuth=true;
    // $mail->SMTPSecure='tls';

    // // Gmail account credentials
    // $mail->Username='knowledgespheres@gmail.com';
    // $mail->Password='aknow20b23sphere29c10d';

    $mail = new PHPMailer();
    $mail->IsSMTP(); // Use SMTP
    $mail->smtpConnect();
    $mail->Host = "smtp.gmail.com"; // Sets SMTP server
    $mail->SMTPDebug = 2; // 2 to enable SMTP debug information 
    $mail->SMTPAuth = TRUE; // enable SMTP authentication
    $mail->SMTPSecure = "tls"; //Secure conection
    $mail->Port = 587; // set the SMTP port
    $mail->Username = 'knowledgespheres@gmail.com'; // SMTP account username
    $mail->Password = 'qahe dqrm cyab afyz'; // SMTP account password   
    $mail->authentication = 'plain';
    $mail->Enable_starttls_auto = true;
    // $mail->Openssl_verify_mode ='none';
    $mail->Priority = 1; // Highest priority - Email priority (1 = High, 3 = Normal, 5 = low)
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = '8bit';
    $mail->ContentType = 'text/html; charset=utf-8\r\n';
    $mail->From = 'knowledgespheres@gmail.com';
    $mail->FromName = 'Knowledge Spheres';
    $mail->WordWrap = 900; // RFC 2822 Compliant for Max 998 characters per line

    // Sender and recipient
    // $mail->setFrom('knowledgespheres@gmail.com', 'Password Reset');
    // $mail->addAddress($email);

    // Email content
    $mail->isHTML(true);
    $mail->Subject="Recover your password";
    $mail->Body="<b>Dear User</b>
    <h3>We received a request to reset your password.</h3>
    <b><h2>Here is your code: $code</h2></b>
    <br><br>
    <p>With regrads,</p>
    <b>Knowledge Spheres</b>";

    $mail->AddAddress($email); // To:
    // $mail->Send();
    // $mail->SmtpClose();

    // Send the email
    if(!$mail->send()) {
        // Email sending failed
        echo json_encode("failed");
    } else {
        // Email sent successfully
        echo json_encode("success");
        
    }
} else {
    // Email and/or code not set in the request
    echo json_encode("Email and/or code not provided");
}
$mail->SmtpClose();
?>