<?php
class User {
    private $login;
    private $senha;

    public function __construct($login, $senha) {
        $this->login = base64_encode($login);
        $this->senha = base64_encode($senha);
    }

    public function getlogin() {
        return $this->login;
    }

    public function getsenha() {
        return $this->senha;
    }

    public function validarUsuario($login, $senha) {
        $loginCerto = base64_decode($this->login);
        $senhaCerta = base64_decode($this->senha);
        return $login === $loginCerto && $senha === $senhaCerta;
    }
}
?>