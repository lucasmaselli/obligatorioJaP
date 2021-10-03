let currentProduct;
let currentCommentsList = [];
let productsList = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {

    let promise = await fetch(PRODUCT_INFO_URL);
    currentProduct = await promise.json();

    let productsPromise = await fetch(PRODUCTS_URL);
    productsList = await productsPromise.json();

    let commentsPromise = await fetch(PRODUCT_INFO_COMMENTS_URL);
    currentCommentsList = await commentsPromise.json();

    showProduct();
    showComments();
    showRelatedProducts();

    document.getElementById("new-comment").style.visibility = "visible";//Hace visible el elemento oculto
    document.getElementById("comments").style.visibility = "visible";
    document.getElementById("related-products").style.visibility = "visible";

    document.getElementById("comentar").addEventListener("click", function () {//Función para agragar nuevo comentario
        if (document.getElementById("comentario").value != "") {
            let puntuacion = document.getElementById("puntuacion").value;
            let descripcion = document.getElementById("comentario").value;
            let fechaActual = takeDate();
            let nuevoComentario = {//Creo nuevo objeto comentario
                score: puntuacion,
                description: descripcion,
                user: localStorage.getItem("user"),
                dateTime: fechaActual
            }
            currentCommentsList.push(nuevoComentario);//Agrego el nuevo comentario a la lista de comentario
            document.getElementById("puntuacion").value = '1';//Seteo valor por defecto
            document.getElementById("comentario").value = "";
            showComments();
        }
        else {
            alert("Debe ingresar un comentario");
        }
    });

});


//FUNCION PARA TOMAR LA FECHA ACTUAL
function takeDate() {
    let date = new Date();
    let currentDate = date.getDate().toString().padStart(2, "0") + "/" + (date.getMonth() + 1).toString().padStart(2, "0") + "/" + date.getFullYear().toString() + " - "
        + date.getHours().toString().padStart(2, "0") + ":" + date.getMinutes().toString().padStart(2, "0") + ":" + date.getSeconds().toString().padStart(2, "0");
    return currentDate;
}

function showProduct() {

    let htmlContentToAppend = "";

    htmlContentToAppend += `<h1> ${currentProduct.name} </h1>
            <p> ${currentProduct.description} </p>
            <p class="second-info"> Precio: ${currentProduct.currency} ${currentProduct.cost} / Cantidad vendidos: ${currentProduct.soldCount} 
            / Categoría del producto: ${currentProduct.category} </p>
            <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">`
    for (let j = 0; j < currentProduct.images.length; j++) {//Recorro las imágenes del producto para crear los indicadores del carrusel
        if (j == 0) {
            htmlContentToAppend += `<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>`
        }
        else {
            htmlContentToAppend += `<li data-target="#carouselExampleIndicators" data-slide-to="${j}"></li>`
        }
    }
    htmlContentToAppend += `
                </ol>
            <div class="carousel-inner">`
    for (let i = 0; i < currentProduct.images.length; i++) {//Recorro las imágenes del producto agragarlas al html
        let image = currentProduct.images[i];
        if (i == 0) {
            htmlContentToAppend += `
                <div class="carousel-item active">
                <img src="${image}" class="d-block w-100" alt="">
            </div>`
        }
        else {
            htmlContentToAppend += `
            <div class="carousel-item">
                <img src="${image}" class="d-block w-100" alt="">
            </div>`
        }
    }
    htmlContentToAppend += `
            </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
                </a>
            </div>`;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
}

function showComments() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `
            <h3>Comentarios</h3>`
    for (let i = 0; i < currentCommentsList.length; i++) {//Recorro los comentarios del producto
        let comment = currentCommentsList[i];
        htmlContentToAppend += `<h5> Usuario: ${comment.user}</h5>
        <p>Fecha: ${comment.dateTime}</p>`
        for (let j = 1; j <= 5; j++) {//Para crear las estrellas
            if (j <= comment.score) {
                htmlContentToAppend += `<span class="fa fa-star checked"></span>`
            }
            else {
                htmlContentToAppend += `<span class="fa fa-star"></span>`
            }
        }
        htmlContentToAppend += `<p>${comment.description}</p>
                <hr>`
    }
    document.getElementById("loaded-comments").innerHTML = htmlContentToAppend;
}

function showRelatedProducts() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `<h3>Productos relacionados</h3>`

    for (let i = 0; i < currentProduct.relatedProducts.length; i++) {//Recorro los productos relacionados
        let indexRelatedProduct = currentProduct.relatedProducts[i];
        htmlContentToAppend += `<a href="">
                <img src="${productsList[indexRelatedProduct].imgSrc}">
                </a>`
    }

    document.getElementById("related-products").innerHTML = htmlContentToAppend;
}