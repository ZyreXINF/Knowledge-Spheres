<?php
session_start();

$token = bin2hex(random_bytes(50));

            //session_start ();
            $_SESSION['token'] = $token;
            $_SESSION['email'] = $email;

            require "Mail/phpmailer/PHPMailerAutoload.php";
            $mail = new PHPMailer;

            $mail->isSMTP();
            $mail->Host='smtp.gmail.com';
            $mail->Port=587;
            $mail->SMTPAuth=true;
            $mail->SMTPSecure='tls';

            // h-hotel account
            $mail->Username='KnowledgeSpheres@gmail.com';
            $mail->Password='aknow20b23sphere29c10d';

            // send by h-hotel email
            $mail->setFrom('email', 'Password Reset');
            // get email from input
            $mail->addAddress($_POST["email"]);
            
            if($mail->send()){
                header("home.html");
            }

            $mail->isHTML(true);
            $mail->Subject="Recover your password";
            $mail->Body="<b>Dear User</b>
            <h3>We received a request to reset your password.</h3>
            <p>Kindly click the below link to reset your password</p>
            http://localhost/http://localhost/phpcodes/Knowledge-Spheres-main/forgotPassword
            <br><br>
            <p>With regrads,</p>
            <b>test/b>";
echo json_encode($rows);

mysqli_close($conn);
?>