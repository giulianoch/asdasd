var baseDeDatos = openDatabase('datos', '1.0', 'myDatabase', 2 * 1024 * 1024);


baseDeDatos.transaction(function(t) {

    t.executeSql("CREATE TABLE IF NOT EXISTS baseDeDatos(id INTEGER PRIMARY KEY,\
        nombre VARCHAR(50), apellido VARCHAR(50), nacionalidad VARCHAR(50),\
        email VARCHAR(50),telefono VARCHAR(20),\
        ciudad VARCHAR(50),fechaNacimiento VARCHAR(10))");
});

function outputDrafts() {
      baseDeDatos.transaction(function(t) {
        t.executeSql("SELECT * FROM baseDeDatos", [], updateDrafts);
      });
    } 
  outputDrafts();

function addDraft(){
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var nacionalidad = document.getElementById("nacionalidad").value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var ciudad = document.getElementById('ciudad').value;
    var fechaNacimiento = document.getElementById('fechaNacimiento').value;

console.log(email)
    baseDeDatos.transaction(function(t) {
        t.executeSql("INSERT INTO baseDeDatos (nombre, apellido, nacionalidad, email, telefono, ciudad, fechaNacimiento) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, nacionalidad, email, telefono, ciudad, fechaNacimiento]);
        outputDrafts();
    });
}

function updateDrafts(transaction, results) {
    // var listitems = "";
    // var listholder = document.getElementById("drafts");
    // listholder.innerHTML = "";
    var emailValue=document.getElementById('emailValue');
    emailValue.innerHTML='';

    var phoneValue=document.getElementById('phoneValue');
    phoneValue.innerHTML='';

    var valorNombre=document.getElementById('valorNombre');
    valorNombre.innerHTML='';

    var 
    for(var i = 0; i < results.rows.length; i++) {
      var row = results.rows.item(i);
      // listholder.innerHTML +=  row.nombre + " " + row.apellido + " - " + row.nacionalidad + " - " + row.email + " - " + row.telefono+"\
      // - "+row.ciudad+ "-"+row.fechaNacimiento +"(<a href='javascript:void(0);' onclick='deleteDraft(" + row.id + ");'>Delete Draft</a>)";
      emailValue.innerHTML+=row.email;
      phoneValue.innerHTML+=row.telefono;
      valorNombre.innerHTML+=row.nombre;
    }
}
function deleteDraft(id) {
      baseDeDatos.transaction(function(t) {
        t.executeSql("DELETE FROM baseDeDatos WHERE id=?", [id], outputDrafts);
      });
  }
  
// var link = document.getElementById("addData");
// link.onclick = function () { //alert(1) 
//     addDraft();
// };