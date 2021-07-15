(function() {
    //Variables
    //let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    //Listeners
    document.addEventListener('DOMContentLoaded', () => {
        crearDB();
    
        if(window.indexedDB.open('crm', 1)) {
            leerClientes();
        } 

        //Escuchar evento de click en boton eliminar
        listadoClientes.addEventListener('click', eliminarCliente);
    });

    //Funciones
    function crearDB() {
        //Crear bd
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('Ocurrió un error al crear la bd');
        }

        crearDB.onsuccess = function() {
            //Asignar la BD ya creada
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            //ObjectStore
            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            //Index
            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });
        }
    }

    function leerClientes() {
        let abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('Ocurrió un error');
        }
    
        abrirConexion.onsuccess = function() {
            //DB = abrirConexion.result;
            const objectStore = DB.transaction('crm').objectStore('crm');

            //Obtener objetos del cursor
            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if(cursor) {
                    const { nombre, email, telefono, empresa, id } = cursor.value;

                    listadoClientes.innerHTML += `
                        <tr>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                            <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                            <p class="text-gray-700">${telefono}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                            <p class="text-gray-600">${empresa}</p>
                        </td>
                        <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                            <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                            <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                        </td>
                        </tr>
                    `;
                    cursor.continue();
                }
            }
        }
    }

    function eliminarCliente(e) {
        //Si se presiona el enlace con clase eliminar
        if(e.target.classList.contains('eliminar')) {
            
            //Verificar accion
            const confirmacion = confirm('¿Desea eliminar realmente el cliente?');

            if(confirmacion) {
                idCliente = Number(e.target.dataset.cliente);
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idCliente);
                
                transaction.oncomplete = function() {
                    imprimirAlerta('Cliente eliminado correctamente', 'exito', true);

                    //Eliminar del DOM
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    imprimirAlerta('Ocurrió un error al eliminar el cliente', 'error', true);
                }
            }
        }
    }

})();