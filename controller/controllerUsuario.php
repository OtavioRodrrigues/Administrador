<?php
require_once "../model/usuario.php";

$jsonUrl = 'http://localhost/Administrador/select/selectUsuario.php';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $jsonUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$jsonContent = curl_exec($ch);
if ($jsonContent === false) {
    die('Erro no cURL: ' . curl_error($ch));
}

$usuarioArray = json_decode($jsonContent, true);
curl_close($ch);

$usuariosObjArray = [];
foreach ($usuarioArray as $userData) {
    $usuarioObj = new User($userData['login'], $userData['senha']);
    $usuariosObjArray[] = $usuarioObj;
}

session_start();
$_SESSION['usuariosObjArray'] = $usuariosObjArray;

$erro = ""; 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $login = $_POST["login"];
    $senha = $_POST["senha"];
    $Usuario = false;
    foreach ($_SESSION['usuariosObjArray'] as $user) {
        if ($user->validarUsuario($login, $senha)) {
            $Usuario = true;
            break;
        }
    }

    if ($Usuario) {
        $token = '#I2JiNDEyYWJj';
        $_SESSION['token'] = $token;

        header("Location: ../view/dashboard.php");
        exit();
    } else {
        
        header("Location: ../view/index.php?erro=true");
    }
}
?>
