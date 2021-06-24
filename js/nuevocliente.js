(function() {

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB() {
        //Mandar a abrir BD
        const conectarDB = window.indexedDB.open('crm', 1);

        conectarDB.onerror = function() {
            console.log('Ocurrió un error al abrir la bd');
        }

        conectarDB.onsuccess = function() {
            DB = conectarDB.result;
        }
    }

    function validarCliente(e) {
        e.preventDefault();
        
        //Leer input para valores
        const nombre = document.querySelector('#nombre').value;
        const correo = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        //Que no esten vacios
        if(nombre === '' || correo === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
        }
    }

    function imprimirAlerta(mensaje, tipo) {

        const alerta = document.querySelector('.alerta');

        //Evitar varias alertas
        if(!alerta) {
            const divAlerta = document.createElement('div');
            divAlerta.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta');

            if(tipo === 'error') {
                divAlerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            } else {
                divAlerta.classList.add('bg-gree.100', 'border-green-400', 'text-green-700');
            }

            divAlerta.textContent = mensaje;

            //Agregar a HTML
            formulario.appendChild(divAlerta);

            //Remover alerta
            setTimeout(() => {
                divAlerta.remove();
            }, 3000);
        }
    }
})();