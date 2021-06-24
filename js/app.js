(function() {

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();
    });

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

})();