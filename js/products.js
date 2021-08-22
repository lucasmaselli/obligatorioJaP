//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    let promise = await fetch("https://japdevdep.github.io/ecommerce-api/product/all.json");//hecho por mí desde aquí
    let data = await promise.json();
    showProductsList(data);
});

function showProductsList(data_products){

    let htmlContentToAppend = "";
    for(let i = 0; i < data_products.length; i++){
        let product = data_products[i];

        //if (((minCount == undefined) || (minCount != undefined && parseInt(product.productCount) >= minCount)) &&
            //((maxCount == undefined) || (maxCount != undefined && parseInt(product.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                            <small class="text-muted">` + product.currency + ` ` + product.cost + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        //}

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;//Línea 78
    }
}