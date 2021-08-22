//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function validarDatos() {
  let usuario = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;

  if (usuario != '' && password != '') {
    if (usuario.includes('@') && usuario.includes('.com')) {
      localStorage.setItem("user", usuario);
      location.href = 'index.html';
      //window.open('index.html');
    } else {
      alert("El correo no es correcto");
    }
  }
  else {
    alert("Complete los campos");
  }
}
