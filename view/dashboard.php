<?php
session_start();

if (!isset($_SESSION['token'])) {
    header("Location: ../view/index.php");
    echo "<script>alert('Usuário ou senha incorretos!');</script>";
    exit();
}

$token = $_SESSION['token'];

$jsonUrl = 'http://localhost/Administrador/select/selectProdutos.php';
$url = 'http://localhost:4000/usuarios';

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

curl_setopt($ch, CURLOPT_URL, $jsonUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$jsonContent = curl_exec($ch);
$produtosArray = json_decode($jsonContent, true);

curl_close($ch);

if ($response !== false) {
    $usuarios = json_decode($response, true);
} else {
    $usuarios = [];
    echo 'Erro ao obter a lista de usuários.';
}
?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../controller/css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <title>Dashboard</title>
</head>

<body>
    <nav>
        <img src="../imagens/Logo Preta.png" class="logo-image">
        <div class="nav-diretorios">
            <a href="#" class="nav-buttons" data-target="overlay1">
                <img src="../imagens/icone4.png" class="icones-image">Contas Ativas
            </a>
            <a href="#" class="nav-buttons" data-target="overlay2">
                <img src="../imagens/icone3.png" class="icones-image">Financeiro
            </a>
            <a href="#" class="nav-buttons" data-target="overlay3">
                <img src="../imagens/icone2.png" class="icones-image">Região
            </a>
            <a href="#" class="nav-buttons" data-target="overlay4">
                <img src="../imagens/icone1.png" class="icones-image">Suporte
            </a>
        </div>
    </nav>
    <div class="dashboard-navbar">
        <div class="dashboard-navbar-title">DASHBOARD</div>
        <div class="dashboard-navbar-menu">
            <div class="divBusca">
                <input type="text" class="txtBusca" placeholder="Pesquisar" />
                <img src="../imagens/icone8.png" class="icon-busca" alt="Buscar" />
            </div>
            <div class="dashboard-navbar-menu-item1">
                <a href="">
                    <img src="../imagens/icone6.png" alt="">
                </a>
            </div>
            <div class="dashboard-navbar-menu-item2">
                <a href="" id="accountButton">
                    <img src="../imagens/icone7.png" alt="">
                </a>
            </div>
            <div id="accountBox">
                <div class="adm-box">
                    <div class="foto-adm">
                        <img src="../imagens/adm.png">
                    </div>
                    <div class="text-conta-adm">
                        <p class="nome-adm">Silvio Santos da Silva Pinto</p>
                        <p class="email-adm">silvioobrabo777@gmail.com</p>
                    </div>
                    <div class="button-container">
                        <form action="../controller/logout.php" method="post">
                            <button type="submit" class="logout-button">
                                <img src="../imagens/logout.png" alt="Sair" class="icon">Sair
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- overlay 1 -->
    <div id="overlay1" class="overlay">
        <div class="graficos1">
            <div class="grafico1">
                <canvas id="userDistributionChart"></canvas>
                <div class="graficos-text1">
                    <p>Distribuição de Usuários</p>
                </div>
            </div>
            <div class="grafico1">
                <div class="cubo-dados">
                    <div class="cubo-laranja"><img src="../imagens/grupo-de-usuarios.png"></div>
                    <div class="dados">
                        <p>Total:</p>
                        <h1>58</h1>
                    </div>
                </div>
                <div class="graficos-text">
                    <p>Quantidade de Usuários</p>
                </div>
            </div>
            <div class="grafico1">
                <div class="cubo-dados">
                    <div class="cubo-laranja"><img src="../imagens/grupo-de-usuarios.png"></div>
                    <div class="dados">
                        <p>Recentes:</p>
                        <h1>11</h1>
                    </div>
                </div>
                <div class="graficos-text">
                    <p>Novos Acessos</p>
                </div>
            </div>
        </div>
        <div class="graficos2">
            <div class="grafico2">
                <div class="lineChart-container">
                    <canvas id="lineChart"></canvas>
                </div>
                <div class="grafico-lineChart">
                    <p>Tendência de crescimento das contas ativas ao longo do tempo (gráfico de linha).</p>
                </div>
            </div>
            <div class="grafico2">
                <div class="barChart-container">
                    <canvas id="barChart"></canvas>
                </div>
                <div class="grafico-barChart">
                    <p>Gráfico de barras mostrando o número de acessos mensais por conta.</p>
                </div>
            </div>
            <div class="grafico2">
                <div class="histogramChart-container">
                    <canvas id="histogramChart"></canvas>
                </div>
                <div class="grafico-histogramChart">
                    <p>Histograma de frequência de login das contas ativas.</p>
                </div>
            </div>
        </div>
        <div class="tables">
    <div class="table-container">
    <div class="div-select">
    <div class="left-buttons">
    </div>
    <div class="input-select-container"> <!-- Esta é a nova classe -->
        <input type="text" id="search-input" placeholder="Pesquisar...">
        <select id="table-select" class="table-select">
            <option value="table1">Tabela Cliente</option>
            <option value="table2">Tabela Lojista</option>
        </select>
    </div>
</div>

        

<div class="table-scroll">
    <div id="table1">
        <table>
            <tr class="table-title">
                <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Telefone</th>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Bairro</th>
                <th>Cidade</th>
                <th>Email</th>
            </tr>
            <tbody id="usuarios-tbody">
                <!-- Os dados dos usuários serão adicionados aqui -->
            </tbody>
        </table>
    </div>

    <div id="table2">
        <table>
            <tr class="table-title">
                <th>ID</th>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>CPF</th>
                <th>Data de Nascimento</th>
                <th>Nome da Empresa</th>
                <th>CNPJ</th>
                <th>CEP</th>
                <th>Logradouro</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Número do Estabelecimento</th>
                <th>Complemento</th>
                <th>Número de Contato</th>
                <th>Email</th>
            </tr>
            <tbody id="lojistas-tbody">
                <!-- Os dados dos lojistas serão adicionados aqui -->
            </tbody>
        </table>
    </div>
</div>

<div id="modal" class="modal">
    <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>Detalhes</h2>
        <div id="user-details">
            <!-- Informações do usuário serão preenchidas aqui -->
        </div>
        <button id="ban-btn" class="banir">Banir</button>
        <button id="delete-btn" class="excluir">Deletar</button>
        <button id="editar-btn" class="alterar">Editar</button>
    </div>
</div>



        <!-- overlay 2 -->
        <div id="overlay2" class="overlay">
            <div class="teste">
                <h1>Ainda não contem conteúdo !</h1>
            </div>
        </div>
        <!-- overlay 3 -->
        <div id="overlay3" class="overlay">
            <div class="teste">
                <h1>Ainda não contem conteúdo !</h1>
            </div>
        </div>
        <!-- overlay 4 -->
        <div id="overlay4" class="overlay">
            <div class="teste">
                <h1>Ainda não contem conteúdo !</h1>
            </div>
        </div>
        <script src="../controller/js/grafico-pizza.js"></script>
        <script src="../controller/js/overlay.js"></script>
        <script src="../controller/js/lineChart.js"></script>
        <script src="../controller/js/barChart.js"></script>
        <script src="../controller/js/histogramChart.js"></script>
        <script src="../controller/js/conta.js"></script>
</body>
</html>