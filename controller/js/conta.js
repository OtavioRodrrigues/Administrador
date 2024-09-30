document.getElementById('table-select').addEventListener('change', function() {
    const selectedTable = this.value;

    document.querySelectorAll('.table-container > .table-scroll > div[id^="table"]').forEach(table => {
        table.style.display = 'none';
    });

    document.getElementById(selectedTable).style.display = 'block';
});

document.getElementById('table1').style.display = 'block';
document.getElementById('table2').style.display = 'none';

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

document.getElementById('search-input').addEventListener('input', filterTable);

let selectedRow = null; 
let selectedId = null;
let selectedUserData = null;
let selectedUserType = null; 


async function fetchLojistas() {
    try {
        const response = await fetch('http://localhost:4000/lojistas');
        const lojistas = await response.json();

        const lojistasTbody = document.getElementById('lojistas-tbody');
        lojistasTbody.innerHTML = ''; 

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

            row.addEventListener('click', () => handleLojistaRowClick(row, lojista)); 
            lojistasTbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar lojistas:', error);
    }
}


function handleLojistaRowClick(row, lojista) {
    selectedUserData = lojista; 
    selectedId = lojista.id;
    selectedUserType = 'lojista'; 


    if (selectedRow) {
        selectedRow.classList.remove('selected-row');
    }

    row.classList.add('selected-row');
    selectedRow = row;

    fillModalWithData(lojista);

    document.getElementById('modal').style.display = 'block';

    document.getElementById('editar-btn').disabled = false;
    document.getElementById('delete-btn').disabled = false;

    console.log(`ID do lojista selecionado: ${selectedId}`);
}


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


async function fetchUsuarios() {
    try {
        const response = await fetch('http://localhost:4000/usuarios');
        const usuarios = await response.json();

        const usuariosTbody = document.getElementById('usuarios-tbody');
        usuariosTbody.innerHTML = ''; 

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

            
            row.addEventListener('click', () => handleRowClick(row, usuario));
            usuariosTbody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}


function handleRowClick(row, usuario) {
    selectedUserData = usuario; 
    selectedId = usuario.id;
    selectedUserType = 'usuario'; 

    if (selectedRow) {
        selectedRow.classList.remove('selected-row');
    }

    row.classList.add('selected-row');
    selectedRow = row;

    fillModalWithData(usuario);


    document.getElementById('modal').style.display = 'block';

    console.log(`ID selecionado: ${selectedId}`);
}

document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});


window.addEventListener('click', (event) => {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


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
            fetchUsuarios();
            fetchLojistas(); 
            selectedRow.classList.remove('selected-row'); 
            selectedRow = null;
            selectedUserData = null;
            selectedId = null;
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
            fetchUsuarios();
            fetchLojistas();
            document.getElementById('modal').style.display = 'none';
        } else {
            alert(`Erro ao atualizar dados do ${selectedUserType}.`);
        }
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
    }
});

fetchUsuarios();
fetchLojistas();
