const ORDER_ASC_BY_PRICE = "0.1";
const ORDER_DESC_BY_PRICE = "1.0";
const ORDER_DESC_BY_RELEVANCE = "Relevance"
let currentProductsArray = [];
let todosLosProductos = [];
let minCount = undefined;
let maxCount = undefined;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {
    let promise = await fetch(PRODUCTS_URL);//hecho por mí desde aquí
    todosLosProductos = await promise.json();
    currentProductsArray = todosLosProductos;
    showProductsList(currentProductsArray);

    document.getElementById("sortAsc").addEventListener("click", function () {
        currentProductsArray = sortProducts(ORDER_ASC_BY_PRICE, currentProductsArray);
        showProductsList(currentProductsArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        currentProductsArray = sortProducts(ORDER_DESC_BY_PRICE, currentProductsArray);
        showProductsList(currentProductsArray);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        currentProductsArray = sortProducts(ORDER_DESC_BY_RELEVANCE, currentProductsArray);
        showProductsList(currentProductsArray);
    });

    document.getElementById("search").addEventListener("keyup", function () {
        filtrarProductosPorNombre(document.getElementById("search").value);
    })
});

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aCostA = parseInt(a.cost);
            let bCostA = parseInt(b.cost);

            if (aCostA < bCostA) { return -1; }
            if (aCostA > bCostA) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            let aCostD = parseInt(a.cost);
            let bCostD = parseInt(b.cost);

            if (aCostD > bCostD) { return -1; }
            if (aCostD < bCostD) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_RELEVANCE) {
        result = array.sort(function (a, b) {
            let aRel = parseInt(a.soldCount);
            let bRel = parseInt(b.soldCount);

            if (aRel > bRel) { return -1; }
            if (aRel < bRel) { return 1; }
            return 0;
        });
    }

    return result;
}

function filtrarProductosPorNombre(valorABuscar) {
    let filtrados = [];
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i].name.toUpperCase();
        if (product.includes(valorABuscar.toUpperCase())) {
            filtrados.push(currentProductsArray[i]);
        }
    }
    //currentProductsArray = filtrados;
    showProductsList(filtrados);
}

function filtrarProducts() {
    if (minCount != "" && maxCount != "") {
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;    
        showProductsList(currentProductsArray);
    }
    else {
        alert("Ingrese mínimo y máximo");
    }
}

function limpiarLista() {
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";
    document.getElementById("search").value = "";

    minCount = undefined;
    maxCount = undefined;

    currentProductsArray = todosLosProductos;
    showProductsList(todosLosProductos);
}

function showProductsList(data_products) {

    let htmlContentToAppend = "";
    if (data_products.length > 0) {
        for (let i = 0; i < data_products.length; i++) {
            let product = data_products[i];

            if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

                htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <small class="text-muted">` + product.currency + ` ` + product.cost + `</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;//Línea 78
        }
    }
    else {
        htmlContentToAppend = `<h3>No hay resultados para su búsqueda</h3>`;
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

/*function sortAndShowProducts() {
    sortProducts()
}*/