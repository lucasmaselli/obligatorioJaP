//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});

function validarDatos() {
  let usuario = document.getElementById("inputEmail").value;
  let password = document.getElementById("inputPassword").value;

  if (usuario != '' && password != '') {//Valida que los campos no están vacíos
    if (usuario.includes('@') && usuario.includes('.com')) {//Validar que el usuario contenga '@' y '.gmail'
      localStorage.setItem("user", usuario);
      location.href = 'index.html';
    } else {
      alert("El correo no es correcto");
    }
  }
  else {
    alert("Complete los campos");
  }
}
