<?php 
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;
 
 require "phpmailer/src/Exception.php";
 require "phpmailer/src/PHPMailer.php";
 
  $mail = new PHPMailer(true);
  $mail->CharSet = "UTF-8";
  

  $name = $_POST["name"];
  $email = $_POST["email"];
  $gender = "Мужской";
  if($_POST['gender'] === 'female') {
    $gender = "Женский";
  };
  $messageForm = $_POST['message'];
  $age = $_POST['age'];
  if(!empty($_FILES['file']['tmp_name'])) {
    $mail->addAttachment($_FILES['file']['tmp_name'], $_FILES['file']['name']);
  }

  $body = "<p><strong>Имя:</strong> $name </p>
           <p><strong>Почта:</strong> $email </p>
           <p><strong>Пол:</strong> $gender </p>
           <p><strong>Возраст:</strong> $age </p>
           <p><strong>Сообщение:</strong> $messageForm </p>
  ";

  $theme = "Заявка с формы";

  $mail->isHTML(true);  
  $mail->setFrom($email, $name);
  $mail->addAddress("misha-stelmakh@yandex.ru");

  $mail->Subject = $theme;
  $mail->Body = $body;
 
  if(!$mail->send()) {
    $message = 'Сообщение не отправлено!!!';
  } else {
    $message = 'Message has been sent';
  };
  
  $response = ["message" => $message];
  header('Content-type: application/json');

  echo json_encode($response);
 ?>