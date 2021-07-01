(function() {

    let DB;

    document.addEventListener('DOMContentLoaded', () => {
        //Comprobar si ya existe la BD
        comprobarBD();        
    });

    function comprobarBD() {
        const conectarDB = window.indexedDB.open('crm', 1);

        conectarDB.onerror = function() {
            crearDB();
        }

        conectarDB.onsuccess = function() {
            DB = conectarDB.result;
            leerBD();
        }
    }

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

    function leerBD() {
        const objectStore = DB.transaction(['crm']).objectStore('crm');

        objectStore.openCursor().onsuccess = (e) => {
            console.log(e.target.result);
        }
    }

})();