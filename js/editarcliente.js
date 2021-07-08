(function() {
    //Selectores
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    //Listeners
    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        obtenerIdDeUrl();
    });

    //Funciones
    function obtenerIdDeUrl() {
        const parametrosURL = new URLSearchParams(window.location.search);
        const id = parametrosURL.get('id');
        
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

})();
