<?php
ini_set('display_errors', 1);
$conn = new mysqli('srv1078.hstgr.io', 'u232384656_admin', '@Podal2023', 'u232384656_ptnc');

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
} else {
    echo "Connection successful!";
}

if (isset($_POST['user_info']['email'])) {

    $nome = $conn->real_escape_string($_POST['user_info']['nome']);

    $sobrenome = $conn->real_escape_string($_POST['user_info']['sobrenome']);

    $email = $conn->real_escape_string($_POST['user_info']['email']);
    
    $hora = $conn->real_escape_string($_POST['data']['horario']);
    
    $data = $conn->real_escape_string($_POST['data']['data']);
    
    $check = "SELECT * FROM `cadastros-quente` WHERE email='$email'";

    $checkfor = $conn->query($check);

    if ($checkfor->num_rows > 0) {
        echo "\nUser already exists in database, redirecting...";
    } else {
        $conn->query("INSERT IGNORE INTO `cadastros-quente` (`nome`, `sobrenome`, `email`, `hora`, `data`) VALUES ('$nome', '$sobrenome', '$email', '$hora', '$data')");
    }
    
    $conn->close();
}

?>