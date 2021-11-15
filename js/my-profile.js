//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    let profile = JSON.parse(localStorage.getItem("profile"));//Tomo datos del localStorage

    if (profile != null) {

        document.getElementById("name").value = profile.name;
        document.getElementById("lastName").value = profile.lastName;
        document.getElementById("age").value = profile.age;
        document.getElementById("email").value = profile.email;
        document.getElementById("phone").value = profile.phone;
        document.getElementById("profileImage").src = profile.image;

    }

});

function validate() {//Funcion para tomar los datos del perfil y guardarlos en localStorage

    let name = document.getElementById("name").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let image = document.getElementById("profileImage").src;

    user = {
        name: name,
        lastName: lastName,
        age: age,
        email: email,
        phone: phone,
        image: image
    };

    localStorage.setItem("profile", JSON.stringify(user));

    alert("Datos guardados correctamente");
}

function uploadImage() {

    let image = document.getElementById("profileImage");
    let file = document.getElementById("fileSelector").files[0];

    let reader = new FileReader();

    if(file) {
        reader.readAsDataURL(file);
    }
    else {
        image.src = "";
    }

    reader.onloadend = function () {
        image.src = reader.result;
    }

}