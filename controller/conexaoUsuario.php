<?php
    session_start();
    function conectarUsuarios(){
        $host = 'localhost';
        $usuario = 'root';
        $senha = '';
        $bd = 'db_usuarios';

            try {
                $pdo = new PDO("mysql:host=$host;dbname=$bd", $usuario, $senha);
                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $pdo;
            } catch (PDOException $e) {
                die('Erro ao conectar ao banco de dados: ' . $e->getMessage());
            }
        }
        
        function fecharConexao($pdo) {
            $pdo = null;
        }
        ?>
