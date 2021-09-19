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

    document.getElementById("new-comment").style.visibility = "visible";
    document.getElementById("comments").style.visibility = "visible";
    document.getElementById("related-products").style.visibility = "visible";

    document.getElementById("comentar").addEventListener("click", function () {
        let puntuacion = document.getElementById("puntuacion").value;
        let descripcion = document.getElementById("comentario").value;
        let fechaActual = takeDate();
        let nuevoComentario = {
            score: puntuacion,
            description: descripcion,
            user: localStorage.getItem("user"),
            dateTime: fechaActual
        }
        currentCommentsList.push(nuevoComentario);
        document.getElementById("puntuacion").value = '1';
        document.getElementById("comentario").value = "";
        showComments();
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
            <div class="images">`
    for (let i = 0; i < currentProduct.images.length; i++) {
        let image = currentProduct.images[i];
        htmlContentToAppend += `<img src="${image}">`
    }
    htmlContentToAppend += `</div>`;
    document.getElementById("product-info").innerHTML = htmlContentToAppend;
    /*<span onmouseover="" class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>
    <button id="comentar" type="button">Comentar</button>
    <hr>`*/
}

function showComments() {

    let htmlContentToAppend = "";

    htmlContentToAppend = `
            <h3>Comentarios</h3>`
    for (let i = 0; i < currentCommentsList.length; i++) {
        let comment = currentCommentsList[i];
        htmlContentToAppend += `<h5> Usuario: ${comment.user}</h5>
        <p>Fecha: ${comment.dateTime}</p>`
        for (let j = 1; j <= 5; j++) {
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

    for (let i = 0; i < currentProduct.relatedProducts.length; i++) {
        let indexRelatedProduct = currentProduct.relatedProducts[i];
        htmlContentToAppend += `<a href="">
                <img src="${productsList[indexRelatedProduct].imgSrc}">
                </a>`
    }

    document.getElementById("related-products").innerHTML = htmlContentToAppend;
}