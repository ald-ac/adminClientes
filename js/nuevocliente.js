(function() {
    //Listeners
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    //Funciones
    function validarCliente(e) {
        e.preventDefault();
        
        //Leer input para valores
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        //Que no esten vacios
        if(nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        //Crear objeto literal con info
        const cliente = {
            nombre,
            email,
            telefono,
            empresa
        }
        cliente.id = Date.now();

        //Agregar a BD
        agregarClienteBD(cliente);
    }

    function agregarClienteBD(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function() {
            imprimirAlerta('Error al agregar cliente', 'error');
        }

        transaction.oncomplete = function() {
            imprimirAlerta('Cliente agregado');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000)
        }
    }

})();