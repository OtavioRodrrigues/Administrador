document.getElementById('table-select').addEventListener('change', function() {
    const selectedTable = this.value;

    // Esconder todas as tabelas
    document.querySelectorAll('.table-container > .table-scroll > div[id^="table"]').forEach(table => {
        table.style.display = 'none';
    });

    // Mostrar a tabela selecionada
    document.getElementById(selectedTable).style.display = 'block';
});

// Exibir apenas a tabela 1 por padrão
document.getElementById('table1').style.display = 'block';
document.getElementById('table2').style.display = 'none';

// Função de pesquisa
function filterTable() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const tableRows = document.querySelectorAll('#table1 tr:not(.table-title), #table2 tr:not(.table-title)');
    
    tableRows.forEach(row => {
        const cells = row.getElementsByTagName('td');
        let rowContainsSearchTerm = false;

        for (let i = 0; i < cells.length; i++) {
            if (cells[i].textContent.toLowerCase().includes(searchInput)) {
                rowContainsSearchTerm = true;
                break;
            }
        }

        row.style.display = rowContainsSearchTerm ? '' : 'none';
    });
}

// Adiciona o evento de entrada para o campo de pesquisa
document.getElementById('search-input').addEventListener('input', filterTable);

let selectedRow = null; 
let selectedId = null;
let selectedUserData = null;
let selectedUserType = null; // Para armazenar se o selecionado é um usuário ou lojista

// Função para buscar lojistas da rota e adicionar na tabela
async function fetchLojistas() {
    try {
        const response = await fetch('http://localhost:4000/lojistas');
        const lojistas = await response.json();

        const lojistasTbody = document.getElementById('lojistas-tbody');
        lojistasTbody.innerHTML = ''; // Limpa a tabela antes de preencher

        lojistas.forEach(lojista => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lojista.id}</td>
                <td>${lojista.nome}</td>
                <td>${lojista.sobrenome}</td>
                <td>${lojista.cpf}</td>
                <td>${lojista.dataNasc}</td>
                <td>${lojista.nomeEmpresa}</td>
                <td>${lojista.cnpj}</td>
                <td>${lojista.cep}</td>
                <td>${lojista.logradouro}</td>
                <td>${lojista.cidade}</td>
                <td>${lojista.bairro}</td>
                <td>${lojista.numEstab || '-'}</td>
                <td>${lojista.complemento || '-'}</td>
                <td>${lojista.numContato}</td>
                <td>${lojista.email}</td>
            `;

            // Adiciona o evento de clique à linha
            row.addEventListener('click', () => handleLojistaRowClick(row, lojista)); // Passa o objeto lojista completo
            lojistasTbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar lojistas:', error);
    }
}

// Função para lidar com o clique na linha do lojista
function handleLojistaRowClick(row, lojista) {
    selectedUserData = lojista; // Armazena os dados do lojista selecionado
    selectedId = lojista.id;
    selectedUserType = 'lojista'; // Define o tipo selecionado como lojista

    // Remove a classe 'selected-row' da linha anteriormente selecionada
    if (selectedRow) {
        selectedRow.classList.remove('selected-row'); // Remove a classe
    }

    // Adiciona a classe 'selected-row' à linha atual
    row.classList.add('selected-row');
    selectedRow = row;

    // Preenche os dados do lojista no modal
    fillModalWithData(lojista);

    // Abre o modal
    document.getElementById('modal').style.display = 'block';

    document.getElementById('editar-btn').disabled = false;
    document.getElementById('delete-btn').disabled = false;

    console.log(`ID do lojista selecionado: ${selectedId}`);
}

// Função para preencher o modal com os dados do usuário ou lojista
function fillModalWithData(userData) {
    document.getElementById('user-details').innerHTML = `
        <label>ID:</label>
        <input type="text" name="id" value="${userData.id}" readonly />
        <label>Nome:</label>
        <input type="text" name="nome" value="${userData.nome}" />
        ${selectedUserType === 'lojista' ? `
            <label>Sobrenome:</label>
            <input type="text" name="sobrenome" value="${userData.sobrenome || ''}" />
        ` : ''}
        <label>CPF:</label>
        <input type="text" name="cpf" value="${userData.cpf}" />
        <label>Data de Nascimento:</label>
        <input type="date" name="dataNasc" value="${userData.dataNasc}" />
        ${selectedUserType === 'lojista' ? `
            <label>Nome da Empresa:</label>
            <input type="text" name="nomeEmpresa" value="${userData.nomeEmpresa}" />
            <label>CNPJ:</label>
            <input type="text" name="cnpj" value="${userData.cnpj}" />
        ` : ''}
        <label>CEP:</label>
        <input type="text" name="cep" value="${userData.cep}" />
        <label>Logradouro:</label>
        <input type="text" name="logradouro" value="${userData.logradouro}" />
        <label>Bairro:</label>
        <input type="text" name="bairro" value="${userData.bairro}" />
        <label>Cidade:</label>
        <input type="text" name="cidade" value="${userData.cidade}" />
        ${selectedUserType === 'lojista' ? `
            <label>Número do Estabelecimento:</label>
            <input type="text" name="numEstab" value="${userData.numEstab || '-'}" />
            <label>Complemento:</label>
            <input type="text" name="complemento" value="${userData.complemento || '-'}" />
            <label>Número de Contato:</label>
            <input type="text" name="numContato" value="${userData.numContato}" />
        ` : ''}
        <label>Email:</label>
        <input type="text" name="email" value="${userData.email}" />
    `;
}

// Função para buscar usuários
async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:4000/usuarios');
        const usuarios = await response.json();

        const usuariosTbody = document.getElementById('usuarios-tbody');
        usuariosTbody.innerHTML = ''; // Limpa a tabela antes de preencher

        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.cpf}</td>
                <td>${usuario.dataNasc}</td>
                <td>${usuario.telefone}</td>
                <td>${usuario.cep}</td>
                <td>${usuario.logradouro}</td>
                <td>${usuario.bairro}</td>
                <td>${usuario.cidade}</td>
                <td>${usuario.email}</td>
            `;

            // Adiciona o evento de clique à linha
            row.addEventListener('click', () => handleRowClick(row, usuario)); // Passa o objeto usuario completo
            usuariosTbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

// Função para lidar com o clique na linha do usuário
function handleRowClick(row, usuario) {
    selectedUserData = usuario; // Armazena os dados do usuário selecionado
    selectedId = usuario.id;
    selectedUserType = 'usuario'; // Define o tipo selecionado como usuário

    // Remove a classe 'selected-row' da linha anteriormente selecionada
    if (selectedRow) {
        selectedRow.classList.remove('selected-row'); // Remove a classe
    }

    // Adiciona a classe 'selected-row' à linha atual
    row.classList.add('selected-row');
    selectedRow = row;

    // Preenche os dados do usuário no modal
    fillModalWithData(usuario);

    // Abre o modal
    document.getElementById('modal').style.display = 'block';

    console.log(`ID selecionado: ${selectedId}`);
}

// Fecha o modal quando o botão de fechar é clicado
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

// Fecha o modal ao clicar fora do conteúdo do modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Funções dos botões de banir, deletar e editar
document.getElementById('ban-btn').addEventListener('click', () => {
    if (selectedId) {
        alert(`Banir usuário com ID: ${selectedId}`);
    }
});

document.getElementById('delete-btn').addEventListener('click', async () => {
    if (selectedId) {
        const confirmation = confirm(`Você tem certeza que deseja deletar o ${selectedUserType} com ID: ${selectedId}?`);
        if (!confirmation) return;

        const route = selectedUserType === 'lojista' ? `http://localhost:4000/lojistas/${selectedId}` : `http://localhost:4000/usuarios/${selectedId}`;
        const response = await fetch(route, { method: 'DELETE' });
        if (response.ok) {
            alert(`Usuário/lojista deletado com sucesso.`);
            fetchUsuarios(); // Atualiza a lista de usuários
            fetchLojistas(); // Atualiza a lista de lojistas
            selectedRow.classList.remove('selected-row'); // Remove a classe de seleção da linha
            selectedRow = null; // Reseta a linha selecionada
            selectedUserData = null; // Reseta os dados do usuário selecionado
            selectedId = null; // Reseta o ID do usuário selecionado
        } else {
            alert(`Erro ao deletar ${selectedUserType}.`);
        }
    }
});

document.getElementById('editar-btn').addEventListener('click', async () => {
    const updatedUserData = {
        id: selectedUserData.id,
        nome: document.querySelector('input[name="nome"]').value,
        cpf: document.querySelector('input[name="cpf"]').value,
        dataNasc: document.querySelector('input[name="dataNasc"]').value,
        cep: document.querySelector('input[name="cep"]').value,
        logradouro: document.querySelector('input[name="logradouro"]').value,
        bairro: document.querySelector('input[name="bairro"]').value,
        cidade: document.querySelector('input[name="cidade"]').value,
        email: document.querySelector('input[name="email"]').value,
        ...(selectedUserType === 'lojista' && { sobrenome: document.querySelector('input[name="sobrenome"]').value }),
        ...(selectedUserType === 'lojista' && {
            nomeEmpresa: document.querySelector('input[name="nomeEmpresa"]').value,
            cnpj: document.querySelector('input[name="cnpj"]').value,
            numeroEstabelecimento: document.querySelector('input[name="numEstab"]').value,
            complemento: document.querySelector('input[name="complemento"]').value,
            numeroContato: document.querySelector('input[name="numContato"]').value,
        }),
    };

    const route = selectedUserType === 'lojista' ? `http://localhost:4000/lojistas/${selectedUserData.id}` : `http://localhost:4000/usuarios/${selectedUserData.id}`;
    
    try {
        const response = await fetch(route, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUserData),
        });

        if (response.ok) {
            alert(`Dados do ${selectedUserType} atualizados com sucesso.`);
            fetchUsuarios(); // Atualiza a lista de usuários
            fetchLojistas(); // Atualiza a lista de lojistas
            document.getElementById('modal').style.display = 'none'; // Fecha o modal
        } else {
            alert(`Erro ao atualizar dados do ${selectedUserType}.`);
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
    }
});

fetchUsuarios();
fetchLojistas();