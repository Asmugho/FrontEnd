var idPedido
var pedidoAtual
var prodContador = 0
var mode // 0 = Visualização; 1 = Edição; 2 = Criação

var pedidos = [
    { 'id': 1, 'pedHora': '18:10', 'resHora': '19:30', 'entHora': '19:28', 'cliente': 'Ana', 'apt': 26, 'torre': 1, 'valor': 160, 'forPgto': 1, 'itensPedido': [
        { 'item': 1,'descricao': 'Manhattan', 'obs': '', 'valor': 50},
        { 'item': 2,'descricao': 'Lisboa à Beira-Mar', 'obs': 'Sem Cebola', 'valor': 50},
        { 'item': 3,'descricao': 'MM', 'obs': '', 'valor': 60},
    ]},
    { 'id': 2, 'pedHora': '18:10', 'resHora': '19:30', 'entHora': '19:28', 'cliente': 'Geison', 'apt': 146, 'torre': 1, 'valor': 160, 'forPgto': 1, 'itensPedido': [
        { 'item': 1,'descricao': 'Roma Caprichosa', 'obs': 'finalização de pesto', 'valor': 50},
        { 'item': 2,'descricao': 'Lisboa à Beira-Mar', 'obs': 'Sem Cebola', 'valor': 50},
        { 'item': 3,'descricao': 'Trio Cacau', 'obs': '', 'valor': 60},
    ]},
    { 'id': 3, 'pedHora': '18:10', 'resHora': '19:30', 'entHora': '19:28', 'cliente': 'Marco', 'apt': 4, 'torre': 1, 'valor': 160, 'forPgto': 2, 'itensPedido': [
        { 'item': 1,'descricao': 'Manhattan', 'obs': '', 'valor': 50},
        { 'item': 2,'descricao': 'Lisboa à Beira-Mar', 'obs': 'Sem Cebola', 'valor': 50},
        { 'item': 3,'descricao': 'MM', 'obs': '', 'valor': 60},
    ]},
    { 'id': 4, 'pedHora': '18:10', 'resHora': '19:30', 'entHora': '19:28', 'cliente': 'Janaina', 'apt': 24, 'torre': 1, 'valor': 210, 'forPgto': 2, 'itensPedido': [
        { 'item': 1,'descricao': 'Manhattan', 'obs': '', 'valor': 50},
        { 'item': 2,'descricao': 'Manhattan', 'obs': '', 'valor': 50},
        { 'item': 3,'descricao': 'Nápoles', 'obs': 'Sem Cebola', 'valor': 50},
        { 'item': 4,'descricao': 'Trio Cacau', 'obs': '', 'valor': 60},
    ]},
    { 'id': 4, 'pedHora': '18:10', 'resHora': '19:30', 'entHora': '19:28', 'cliente': 'João', 'apt': 146, 'torre': 2, 'valor': 110, 'forPgto': 1, 'itensPedido': [
        { 'item': 1,'descricao': 'Manhattan', 'obs': '', 'valor': 50},
        { 'item': 2,'descricao': 'MM', 'obs': '', 'valor': 60},
    ]},
    { 'id': 4, 'pedHora': '18:10', 'resHora': '20:30', 'entHora': '19:28', 'cliente': 'Luciana', 'apt': 181, 'torre': 2, 'valor': 110, 'forPgto': 2, 'itensPedido': [
        { 'item': 1,'descricao': 'Roma Diversitá', 'obs': '', 'valor': 50},
        { 'item': 2,'descricao': 'ShotCrock', 'obs': '', 'valor': 60},
    ]},
]

var produtos = [
    { 'id': 1, 'descricao': 'Manhattan', 'valor': 50},
    { 'id': 2, 'descricao': 'Nápoles', 'valor': 50},
    { 'id': 3, 'descricao': 'Trio Cacau', 'valor': 50},
    { 'id': 4, 'descricao': 'Lisboa à Beira-Mar', 'valor': 50},
    { 'id': 5, 'descricao': 'Roma Diversitá', 'valor': 50},
    { 'id': 6, 'descricao': 'M&M', 'valor': 50},
    { 'id': 7, 'descricao': 'ShotCrock', 'valor': 50},
]

function refreshTable() {
    clearTable()
    loadTable()
}

function loadTable() {
    var table = document.getElementById("table")

    pedidos.forEach((pedido) => {

        var row = document.createElement('tr')

        row.innerHTML = `
            <td class="pedidosTd"> ${pedido.id} </td>
            <td class="pedidosTd"> ${pedido.cliente} </td>
            <td class="pedidosTd"> ${pedido.apt} </td>
            <td class="pedidosTd"> ${pedido.torre} </td>
            <td class="pedidosTd"> R$ ${pedido.valor} </td>
            <td class="pedidosTd"> 
                <span class="tablebtn_v" onclick="viewItem(${pedido.id})">V</span>    
                <span class="tablebtn_e" onclick="editItem(${pedido.id})">E</span>    
                <span class="tablebtn_d" onclick="del(${pedido.id})">D</span>
            </td>
        `

        table.appendChild(row)
    })
}

function clearTable(){
    let table = document.getElementById("table")

    if (table.children){
        for (var i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i)
        }
    }
}

function newItem() {
    mode = 2
    placeHeaderProdutos()
    
    let dialog = document.getElementById('dialogMain')
    let saveBtn = document.getElementById('saveBtn')
    let tituloId = document.getElementById('idSlot')
    let tituloCliente = document.getElementById('clienteSlot')
    
    // PEGA OS INPUTS PARA ATRIBUIÇÃO DO VALOR
    tituloId.textContent = 'novo'
    tituloCliente.textContent = 'novo'

    // ATRIBUIÇÃO VALOR INPUTS
    document.getElementById('inputPedido').value = ''
    document.getElementById('inputHorario').value = ''
    document.getElementById('inputReserva').value = ''
    document.getElementById('inputEntrega').value = ''
    document.getElementById('inputCliente').value = ''
    document.getElementById('inputApt').value = ''
    document.getElementById('selectTorre').value = ''
    document.getElementById('selectForPgto').value = ''
    clearTableProdutos()
    loadItems()

    if (saveBtn.classList.contains('hidden')){
        saveBtn.classList.remove('hidden')
    }
    if (dialog.classList.contains('hidden')){
        dialog.classList.remove('hidden')
    }
}
function viewItem(id) {
    // idPedido = id
    mode = 0

    placeHeaderProdutos()
    
    let dialog = document.getElementById('dialogMain')
    let tituloId = document.getElementById('idSlot')
    let tituloCliente = document.getElementById('clienteSlot')
    document.getElementById('inputPedido').setAttribute('disabled', true)
    document.getElementById('inputHorario').setAttribute('disabled', true)
    document.getElementById('inputReserva').setAttribute('disabled', true)
    document.getElementById('inputEntrega').setAttribute('disabled', true)
    document.getElementById('inputCliente').setAttribute('disabled', true)
    document.getElementById('inputApt').setAttribute('disabled', true)
    document.getElementById('selectTorre').setAttribute('disabled', true)
    document.getElementById('selectForPgto').setAttribute('disabled', true)
    document.getElementById('selectProduto').classList.add('hidden')
    document.getElementById('addProdutoBtn').classList.add('hidden')

    // PEGA OS INPUTS PARA ATRIBUIÇÃO DO VALOR
    if (id){
        pedidos.forEach((pedido) => {
            if(pedido.id == id){
                pedidoAtual = pedido
                
                tituloId.textContent = pedido.id
                tituloCliente.textContent = pedido.cliente
                
                // ATRIBUIÇÃO VALOR INPUTS
                document.getElementById('inputPedido').value = pedido.id
                document.getElementById('inputHorario').value = pedido.pedHora
                document.getElementById('inputReserva').value = pedido.resHora
                document.getElementById('inputEntrega').value = pedido.entHora
                document.getElementById('inputCliente').value = pedido.cliente
                document.getElementById('inputApt').value = pedido.apt
                document.getElementById('selectTorre').value = pedido.torre
                document.getElementById('selectForPgto').value = pedido.forPgto
                clearTableProdutos()
                loadTableProdutos(pedido.itensPedido)
                loadItems()
            }

            if (dialog.classList.contains('hidden')){
                dialog.classList.remove('hidden')
            }
        })
    }
}
function editItem(id) {
    mode = 1
    placeHeaderProdutos()

    let dialog = document.getElementById('dialogMain')
    let saveBtn = document.getElementById('saveBtn')
    let tituloId = document.getElementById('idSlot')
    let tituloCliente = document.getElementById('clienteSlot')
    document.getElementById('inputPedido').setAttribute('disabled', true)
    document.getElementById('inputHorario').removeAttribute('disabled')
    document.getElementById('inputReserva').removeAttribute('disabled')
    document.getElementById('inputEntrega').removeAttribute('disabled')
    document.getElementById('inputCliente').removeAttribute('disabled')
    document.getElementById('inputApt').removeAttribute('disabled')
    document.getElementById('selectTorre').removeAttribute('disabled')
    document.getElementById('selectForPgto').removeAttribute('disabled')
    document.getElementById('selectProduto').classList.remove('hidden')
    document.getElementById('addProdutoBtn').classList.remove('hidden')

    
    if (id){
        pedidos.forEach((pedido) => {
            if(pedido.id == id){
                pedidoAtual = pedido

                console.log('deu certo')
                
                tituloId.textContent = pedido.id
                tituloCliente.textContent = pedido.cliente
                
                // ATRIBUIÇÃO VALOR INPUTS
                document.getElementById('inputPedido').value = pedido.id
                document.getElementById('inputHorario').value = pedido.pedHora
                document.getElementById('inputReserva').value = pedido.resHora
                document.getElementById('inputEntrega').value = pedido.entHora
                document.getElementById('inputCliente').value = pedido.cliente
                document.getElementById('selectForPgto').value = pedido.forPgto
                document.getElementById('inputApt').value = pedido.apt
                document.getElementById('selectTorre').value = pedido.torre
                clearTableProdutos()
                loadTableProdutos(pedido.itensPedido)
                loadItems()
            }
        })

        if (saveBtn.classList.contains('hidden')){
            saveBtn.classList.remove('hidden')
        }
        if (dialog.classList.contains('hidden')){
            dialog.classList.remove('hidden')
        }
    }
}

function closeDialog() {
    let dialog = document.getElementById('dialogMain')
    let saveBtn = document.getElementById('saveBtn')

    document.getElementById('inputPedido').removeAttribute('disabled')
    document.getElementById('inputHorario').removeAttribute('disabled')
    document.getElementById('inputReserva').removeAttribute('disabled')
    document.getElementById('inputEntrega').removeAttribute('disabled')
    document.getElementById('inputCliente').removeAttribute('disabled')
    document.getElementById('inputApt').removeAttribute('disabled')
    document.getElementById('selectTorre').removeAttribute('disabled')
    document.getElementById('selectForPgto').removeAttribute('disabled')
    document.getElementById('selectProduto').classList.remove('hidden')
    document.getElementById('addProdutoBtn').classList.remove('hidden')

    saveBtn.classList.add('hidden')
    dialog.classList.add('hidden')

    prodContador = 0
}

function loadItems() {
    let selectProdutos = document.getElementById('selectProduto')

    if (selectProdutos.children){
        for (var i = selectProdutos.children.length - 1; i > 0; i--){
            selectProdutos.removeChild(selectProdutos.children[i])
        }

    }

    if (produtos) {
        produtos.forEach((produto) => {
            let option = document.createElement('option')
            option.setAttribute('value', produto.id)
            option.innerHTML = `${produto.id} - ${produto.descricao}`
            selectProdutos.appendChild(option)
        })
    }
}

// ####################### CALL SERVICES BACK-END ###############################

function save(){
    if(mode == 1){ // MODO EDIÇÃO
        console.log('Objeto Editado:')
        console.log(pedidoAtual)
    }
    else if(mode == 2){ // MODO CRIAÇÃO
        console.log('Objeto Criado:')
        console.log(pedidoAtual)
        pedidoService.getPedidoById(1);
    }
}
function del(id){
    console.log('Objeto Deletado:')
    console.log(id)
}

// ####################### TABELA DE PRODUTOS NO DIALOG #########################

function placeHeaderProdutos() {
    let produtoHeaders = document.getElementById('produtoHeaders')

    if (mode == 0){
        produtoHeaders.innerHTML = "<th>Item</th> <th>Produto</th> <th>Observação</th> <th>Valor</th>"
    }
    else {
        produtoHeaders.innerHTML = "<th>Item</th> <th>Produto</th> <th>Observação</th> <th>Valor</th> <th>Ações</th>"
    }
}

function loadTableProdutos(itensPedido) {
    prodContador = 0
    var table = document.getElementById("tableProdutos")

    if(itensPedido) {
        itensPedido.forEach((item) => {
            prodContador++

            let row = document.createElement('tr')

            row.innerHTML = `
                <td class="pedidosTd"> ${prodContador} </td> 
                <td class="pedidosTd"> ${item.descricao} </td>
                <td class="pedidosTd"> ${item.obs ? item.obs : '-'} </td>
                <td class="pedidosTd"> R$ ${item.valor} </td>
                ${mode > 0 ? `
                    <td class="pedidosTd"> 
                        <span id="prod-${prodContador}" class="tablebtn_d" onclick="removeProduto('prod-${prodContador}')">D</span>    
                    </td>
                ` : ''}
            `
            
            // <td class="pedidosTd"> 
            //     <span id="prod-${prodContador}" class="tablebtn_d" onclick="removeProduto('prod-${prodContador}')">D</span>    
            // </td>

            console.log(row)

            table.appendChild(row)
        })
    }
}
function clearTableProdutos(){
    let table = document.getElementById("tableProdutos")

    if (table.children){
        for (var i = table.rows.length - 1; i > 0; i--){
            table.deleteRow(i)
        }
    }
}
function addProduto() {
    let selectedProduto = document.getElementById('selectProduto').value

    if(produtos) {
        produtos.forEach((produto) => {
            if(produto.id == selectedProduto){
                prodContador++
                var table = document.getElementById("tableProdutos")
                var row = document.createElement('tr')

                row.innerHTML = `
                    <td class="pedidosTd"> ${prodContador} </td>
                    <td class="pedidosTd"> ${produto.descricao} </td>
                    <td class="pedidosTd"><input class="input" type="text"></input></td>
                    <td class="pedidosTd"> R$ ${produto.valor} </td>
                    <td class="pedidosTd"> 
                        <span id="prod-${prodContador}" class="tablebtn_d" onclick="removeProduto('prod-${prodContador}')">D</span>    
                    </td>
                `
                table.appendChild(row)
            }
        })
    }
}
function removeProduto(id) {
    let table = document.getElementById("tableProdutos") 
    let rowForDeletion = document.getElementById(id).parentElement.parentElement
    table.removeChild(rowForDeletion)
    pedidoAtual.itensPedido.forEach((item, index) => {
        let itemIndex = id.split('-')[1] - 1
        if (index == itemIndex) {
            // console.log(index)
            // console.log(itemIndex)
            // console.log(pedidoAtual.itensPedido)
            pedidoAtual.itensPedido.splice(itemIndex, 1)
        }
    })

    clearTableProdutos()
    loadTableProdutos(pedidoAtual.itensPedido)
    console.log(pedidoAtual)
}

export {
    refreshTable,
    loadTable,
    clearTable,
    newItem,
    viewItem,
    editItem,
    closeDialog,
    loadItems,
    save,
    del,
    placeHeaderProdutos,
    loadTableProdutos,
    clearTableProdutos,
    addProduto,
    removeProduto
};