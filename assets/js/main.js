'use strict'

const openModel = () => document.getElementById('model').classList.add('active')

const closeModel = () => {
    clearFields()
    document.getElementById('model').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (db_client) => localStorage.setItem('db_client', JSON.stringify(db_client))

const readClient = () => getLocalStorage()

const createClient = (client) => {
    const db_client = getLocalStorage()
    db_client.push(client)
    setLocalStorage(db_client)
}

const updateClient = (index, client) => {
    const db_client = readClient()
    db_client[index] = client
    setLocalStorage(db_client)
}


const deleteClient = (index) => {
    const db_client = readClient()
    db_client.splice(index, 1)
    setLocalStorage(db_client)
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity()
}

const clearFields = () => {
    const fields = document.querySelectorAll('.model-field')
    fields.forEach(field => field.value = "")
}

const saveClient = () => {
    if (isValidFields()) {
        const client = {
                id: document.getElementById('id').value,
                name: document.getElementById('name').value,
                gender: document.getElementById('gender').value,
                fone: document.getElementById('fone').value,
                mail: document.getElementById('mail').value,
                adress: document.getElementById('adress').value,
            }
            //console.log('The Cadastral student: ' + student)
        const index = document.getElementById('id').dataset.index
        if (index == 'new') {
            createClient(client)
            listClient()
            closeModel()
        } else {
            updateClient(index, client)
            listClient()
            closeModel()
        }
    }
}


const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = `
				<td>${client.id}</td>
				<td>${client.name}</td>
				<td>${client.gender}</td>
				<td>${client.fone}</td>
				<td>${client.mail}</td>
				<td>${client.adress}</td>
                
				<td>
					<button type="button" class="button green" id="edit-${index}">Edit</button>
					<button type="button" class="button red" id="delete-${index}">Delete</button>
				</td>
			`
    document.querySelector('#tblClient>tbody').appendChild(newRow)
}

const crearTable = () => {
    const rows = document.querySelectorAll('#tblClient>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

const listClient = () => {
    const clients = readClient()
        // console.log(clients)
    crearTable()
    clients.forEach(createRow)
}

const fillFields = (client) => {
    document.getElementById('id').value = client.id
    document.getElementById('name').value = client.name
    document.getElementById('gender').value = client.gender
    document.getElementById('fone').value = client.fone
    document.getElementById('mail').value = client.mail
    document.getElementById('adress').value = client.adress

    document.getElementById('id').dataset.index = client.index
}

const editClient = (index) => {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModel()
}

const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
            editClient(index)
        } else {
            const client = readClient()[index]
            const response = confirm(`Are you sure to delete the client ${client.name}`)
            if (response) {
                deleteClient(index)
                listClient()
            }
        }
    }
}

listClient()

document.getElementById('idClient').addEventListener('click', openModel)
document.getElementById('modelClose').addEventListener('click', closeModel)
document.getElementById('cancel').addEventListener('click', closeModel)
document.getElementById('save').addEventListener('click', saveClient)
document.querySelector('#tblClient>tbody').addEventListener('click', editDelete)