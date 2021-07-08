(function() {
    //Variables
    let id;

    //Selectores
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    //Listeners
    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        obtenerIdDeUrl();

        formulario.addEventListener('submit', validarCliente);
    });

    //Funciones
    function obtenerIdDeUrl() {
        const parametrosURL = new URLSearchParams(window.location.search);
        id = parametrosURL.get('id');
        
        //Si se recibe un id buscar datos en indexedDB
        if(id) {
            //Esperar conexion BD
            setTimeout(() => {
                obtenerCliente(id);
            }, 100)
        }
    }

    function obtenerCliente(id) {
        const objectStore = DB.transaction('crm').objectStore('crm');
        //Obtener objetos del cursor
        objectStore.openCursor().onsuccess = function(e) {
            const cursor = e.target.result;
            if(cursor) {
                if(cursor.value.id === Number(id)) {
                    cargarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }
    
    function cargarFormulario(cliente) {
        const { nombre, email, telefono, empresa } = cliente;
        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }

    function validarCliente(e) {
        e.preventDefault();
        if(nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
            return;
        } else {
            const cliente = {
                nombre: nombreInput.value,
                email: emailInput.value,
                telefono: telefonoInput.value,
                empresa: empresaInput.value,
                id: Number(id)
            }
            //Actualizar cliente
            conectarDB();

            const transaction = DB.transaction(['crm'], ('readwrite'));
            const objectStore = transaction.objectStore('crm');

            objectStore.put(cliente);
            
            transaction.onerror = function() {
                imprimirAlerta('Error al editar cliente', 'error');
            }

            transaction.oncomplete = function() {
                imprimirAlerta('Cliente editado correctamente');

                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 3000)
            }
        }
    }
})();
