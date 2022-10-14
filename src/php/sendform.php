<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendors/phpmailer/src/Exception.php';
require 'vendors/phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'vendors/phpmailer/language/');
$mail->IsHTML(true);

// От кого письмо
$mail->setForm('info@fls.guru', 'От кого письмо');
// Кому отправляем
$mail->addAddress('misha-stelmakh@yandex.ru');
// Тема письма
$mail->Subject = 'Тема письма!';

// Пол
$gender = 'Мужчина';
if($_POST['gender'] == 'femail') {
    $gender = 'Женщина';
};

// Тело письма
$body = '<h1>Заголовок тела письма</h1>';

if(trim(!empty($_POST['name'])) {
    $_body.= '<p><strong>Имя: </strong> '.$_POST['name'].'</p>';
};


// -----------
$mail->Body = $body;

if(!$mail->send()) {
    $message = 'Oшибка';
} else {
    $message = 'Данные отправлены';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>