var baseDeDatos = openDatabase('datos', '1.0', 'myDatabase', 2 * 1024 * 1024);

baseDeDatos.transaction(function(bD) {
    bD.executeSql("CREATE TABLE IF NOT EXISTS baseDeDatos(id INTEGER PRIMARY KEY,\
        nombre VARCHAR(50), apellido VARCHAR(50),email VARCHAR(50),telefono VARCHAR(20),\
        linkedIn VARCHAR (100),provincia VARCHAR(50),nacionalidad VARCHAR(50),fechaNacimiento VARCHAR(10),\
        escuela VARCHAR (100), especializacion VARCHAR (100))");

    
});

function outputDrafts() {
    baseDeDatos.transaction(function(bD) {
      bD.executeSql("SELECT * FROM baseDeDatos", [], updateDrafts);
    });
  }
outputDrafts();

function addBasicData(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var linkedIn = document.getElementById('linkedIn').value;
    var provincia = document.getElementById('provincia').value;
    var nacionalidad = document.getElementById("nacionalidad").value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;
    console.log(email);
    baseDeDatos.transaction(function(bD) {
        //poner en una sola linea o se rompe to2
        bD.executeSql("INSERT INTO baseDeDatos (nombre, apellido, email, telefono,linkedIn, provincia,nacionalidad,fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?,?)", [nombre, apellido,email, telefono,linkedIn,provincia,nacionalidad, fechaNacimiento]);
        outputDrafts();
    });
}
function addStudies(){
        var escuela = document.getElementById('nombreEscuela').value;
        var especializacion = document.getElementById('especializacionNombre').value;

        baseDeDatos.transaction(function(bD) {
            bD.executeSql("INSERT INTO baseDeDatos (escuela,especializacion) VALUES (? , ?)", [escuela,especializacion]);
            outputDrafts();
        });
    }

    function updateDrafts(transaction, results) {
        var emailValue=document.getElementById('emailValue');
        emailValue.innerHTML='';
        var phoneValue=document.getElementById('phoneValue');
        phoneValue.innerHTML='';
        var valorNombre=document.getElementById('valorNombre');
        valorNombre.innerHTML='';
        var valorlinkedIn=document.getElementById('valorlinkedIn');
        valorlinkedIn.innerHTML='';


        var valorEscuela=document.getElementById('secundaria'); 
        valorEscuela.innerHTML='';
        var valorEsp=document.getElementById('especializacion'); 
        valorEsp.innerHTML='';
        
        
        for(var i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        emailValue.innerHTML+=row.email;
        phoneValue.innerHTML+=row.telefono;
        valorNombre.innerHTML+=row.nombre+' '+row.apellido;
        valorlinkedIn.innerHTML+=row.linkedIn;
        valorEscuela.innerHTML+=row.escuela;
        valorEsp.innerHTML+=row.especializacion;


        }
    }
    function deleteDraft(id) {
        baseDeDatos.transaction(function(bD) {
            bD.executeSql("DELETE FROM baseDeDatos WHERE id=?", [id], outputDrafts);
        });
    }