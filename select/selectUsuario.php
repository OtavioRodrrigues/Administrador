<?php
  require '..\controller\conexaoUsuario.php';
  $conexao = conectarUsuarios();
  
  $sql = "SELECT * FROM tbl_usuarios";
  $stmt = $conexao->prepare($sql);
  $stmt->execute();
  
  // Apresentar os registros
  $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
  
  fecharConexao($conexao);
  
  $usuarios_json = json_encode($data);
  echo $usuarios_json;
?>