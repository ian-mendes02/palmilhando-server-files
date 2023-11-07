<?php
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
ini_set('display_errors', 1);
$mail = new PHPMailer;
$mail->CharSet = "UTF-8";
$mail->Encoding = 'base64';
$mail->isSMTP();
$mail->SMTPDebug = 0;
$mail->Host = 'smtp.hostinger.com';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'contato@palmilhasterapeuticas.com.br';
$mail->Password = '@Podal2023';
$mail->setFrom('contato@palmilhasterapeuticas.com.br', 'André Mendes');
$mail->addReplyTo('contato@palmilhasterapeuticas.com.br', 'André Mendes');
$mail->Subject = '🚨 Falta muito pouco para garantir sua participação!';
$mail->AltBody = "
Sua inscrição na Imersão em Palmilhas Terapêuticas foi concluída com sucesso.
\n
\nVocê deu o primeiro passo para conquistar um negócio lucrativo através das palmilhas e transformá-las no carro-chefe do seu consultório.
\nAgora, queremos te fazer um pedido: Responda à pesquisa abaixo.
\nEsta pesquisa será essencial porque, a partir dela, vamos criar os melhores conteúdos para você - temas que realmente vão te ajudar a atingir os seus principais objetivos profissionais.
\nClique no link abaixo para responder, o tempo estimado é menos que 2 minutos.
\n
\n\t->https://docs.google.com/forms/d/e/1FAIpQLSdJyWlzomTyHdjETlvWlo_dCNZ8W2vO8z4g3AeHGRtxGdYsnA/viewform?usp=sharing
";
$mail->msgHTML(file_get_contents('mail/confirmacao.html'), __DIR__);

if (!empty($_POST['user_name']) && !empty($_POST['user_email'])) {    
    $nome = $_POST['user_name'];
    $email = $_POST['user_email'];
    $mail->addAddress($email, $nome);
    if (!$mail->send()) {
        echo 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        echo 'The email message was sent.';
    }
} else {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
}

?>