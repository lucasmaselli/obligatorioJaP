let UYU = 'UYU';
let USD = 'USD';
let price = 40;
let cart;

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", async function (e) {

    let promise = await fetch("https://japdevdep.github.io/ecommerce-api/cart/654.json");
    cart = await promise.json();

    showCart();
    convertCurrency();

});

function showCart() { //Funcion para recorrer los productos y crear los elementos con sus datos para añadirlos a la tabla que representa el carrito

    let htmlContentToAppend = "";
    let id = 0;

    for (let i = 0; i < cart.articles.length; i++) {
        let article = cart.articles[i];
        let subtotal = article.unitCost * article.count;
        if (i == 0) {
            htmlContentToAppend += `
        <th></th>
        <th>Nombre</th>
        <th>Cantidad</th>
        <th>Valor</th>
        <th>Subtotal</th>
        <tr>
            <td><img src=${article.src}></td>
            <td>${article.name}</td>
            <td><input id="input${id}" class="input" type="number" value="${article.count}" min="1" data-currency="${article.currency}" data-unitcost="${article.unitCost}" data-id="${id}" onchange="calculateProductSubtotal(this.dataset.unitcost, this.value, this.dataset.id)"></td>
            <td><span class="currency">${article.currency}</span> <span class="price" id="unitCost${id}">${article.unitCost}</span></td>
            <td><span class="currency">${article.currency}</span> <span class="price" id="subtotal${id}">${subtotal}</span></td>
            <td><input type="button" value="Quitar" data-id="${id}" onclick="removeItem(this.dataset.id)"></td>
        </tr>`
            id++;
        }
        else {
            htmlContentToAppend += `
            <tr>
                <td><img src=${article.src}></td>
                <td>${article.name}</td>
                <td><input id="input${id}" class="input" type="number" value="${article.count}" min="1" data-currency="${article.currency}" data-unitcost="${article.unitCost}" data-id="${id}" onchange="calculateProductSubtotal(this.dataset.unitcost, this.value, this.dataset.id)"></td>
                <td><span class="currency">${article.currency}</span> <span class="price" id="unitCost${id}">${article.unitCost}</span></td>
                <td><span class="currency">${article.currency}</span> <span class="price" id="subtotal${id}">${subtotal}</span></td>
                <td><input type="button" value="Quitar" data-id="${id}" onclick="removeItem(this.dataset.id)"></td>
            </tr>`
            id++;
        }
    }

    document.getElementById("articles").innerHTML = htmlContentToAppend;
}

function calculateProductSubtotal(unitCost, quantity, id) { //Calcula el subtotal del producto (valor por unidad por cantidad)
    if (quantity <= 0) {
        alert("La cantidad no puede ser menor a 1");
        document.getElementById("input" + id).value = 1;
        calculateProductSubtotal(unitCost, 1, id);
    }
    else {
        let subtotal;

        subtotal = unitCost * quantity;

        document.getElementById("subtotal" + id).textContent = subtotal;

    }

    calculateCartSubtotal();
}

function calculateCartSubtotal() { //Calcula el subtotal del carrito sumando el subtotal de cada producto (valor por unidad por cantidad)

    let cartSubtotal = 0;

    for (let i = 0; i < cart.articles.length; i++) {
        cartSubtotal += parseInt(document.getElementById("subtotal" + i).textContent);
    }

    document.getElementById("cartSubtotal").textContent = cartSubtotal;

    calculateCartTotal();
}

function calculateCartTotal() { //Calcula el costo total del carrito a partir del subtotal y contabilizando tipo de envío y su costo

    document.getElementById("subCart").textContent = document.getElementById("cartSubtotal").textContent;
    document.getElementById("shippingCost").textContent = (parseInt(document.getElementById("cartSubtotal").textContent) * returnPercentageShippingCost()).toFixed(0);
    document.getElementById("totalCost").textContent = parseInt(document.getElementById("cartSubtotal").textContent) + parseInt(document.getElementById("shippingCost").textContent);
}

function returnPercentageShippingCost() { //Retorna el porcentaje correspondiente al tipo de envío elegido

    if (document.getElementById("premium").checked) {

        return .15;
    }
    else if (document.getElementById("express").checked) {

        return .07;
    }
    else {

        return .05;
    }
}

function convertCurrency() { //Recorre los subtotales de los productos del carrito y si es necesario cambia su moneda a la seleccionada y calcula el nuevo subtotal a la cotización cargada

    let currencys = document.getElementsByClassName("currency"); //Recorro las etiquetas que muestras la moneda
    let inputs = document.getElementsByClassName("input"); //Recorro los inputs para realizar las modificaciones correspondientes a la moneda seleccionada en su etiqueta

    if (document.getElementById("UYU").checked) {
        for (const input of inputs) {
            if (input.dataset.currency != "UYU") {
                input.dataset.currency = "UYU";
                input.dataset.unitcost = input.dataset.unitcost * price;
            }
        }
        for (const element of currencys) {
            if (element.textContent != "UYU") {
                element.textContent = "UYU ";
                if (element.nextElementSibling.className == "price") {
                    element.nextElementSibling.textContent = element.nextElementSibling.textContent * price
                }
            }
        }
    }
    else {
        for (const input of inputs) {
            if (input.dataset.currency != "USD") {
                input.dataset.currency = "USD";
                input.dataset.unitcost = input.dataset.unitcost / price;
            }
        }
        for (const element of currencys) {
            if (element.textContent != "USD") {
                element.textContent = "USD ";
                if (element.nextElementSibling.className == "price") {
                    element.nextElementSibling.textContent = element.nextElementSibling.textContent / price;
                }
            }
        }
    }

    calculateCartSubtotal(); //Calculo el subtotal del carrito con los nuevos subtotales de los productos

}

document.getElementById("credit_pay").addEventListener("click", function () {//Habilita inputs para pagar con tarjeta de crédito

    document.getElementById("num_card").disabled = false;
    document.getElementById("due_date").disabled = false;
    document.getElementById("security_code").disabled = false;
    document.getElementById("count_num").disabled = true;
    document.getElementById("count_num").value = '';

});


document.getElementById("transfer_pay").addEventListener("click", function () {//Habilita inputs para pagar con transferencia bancaria

    document.getElementById("count_num").disabled = false;
    document.getElementById("num_card").disabled = true;
    document.getElementById("due_date").disabled = true;
    document.getElementById("security_code").disabled = true;
    document.getElementById("num_card").value = '';
    document.getElementById("due_date").value = '';
    document.getElementById("security_code").value = '';

});

function validatePay() {//Valida que estén los datos necesarios del método de pago

    let creditPay = document.getElementById("credit_pay");
    let transferPay = document.getElementById("transfer_pay");

    if (creditPay.checked == true) {

        let numCard = document.getElementById("num_card");
        let dueDate = document.getElementById("due_date");
        let securityCode = document.getElementById("security_code");

        if (numCard.value == '') {

            alert("Debe ingresar el número de tarjeta");

        } else if (dueDate.value == '') {

            alert("Debe ingresar la fecha de vencimiento");

        } else if (securityCode.value == '') {

            alert ("Debe ingresar el código de seguridad");
            
        } else {
            alert("Datos ingresados correctamente");
        }

    } else if (transferPay.checked == true) {

        let countNum = document.getElementById("count_num");

        if (countNum.value == '') {

            alert ("Debe ingresar el número de cuenta");
            
        }
        else {

            alert("Datos ingresados correctamente");

        }
        
    }

}

document.getElementById("confirm_purchase").addEventListener("click", function () {//Valida datos de dirección y confirma la compra

    let street = document.getElementById("street");
    let adressNum = document.getElementById("number");
    let creditPay = document.getElementById("credit_pay");
    let transferPay = document.getElementById("transfer_pay");

    if (street.value == '') {

        alert("Debe especificar una calle para la dirección");
        
    } else if (adressNum.value == '') {
        
        alert("Debe especificar un número para la dirección");

    } else if (creditPay.checked == false && transferPay.checked == false) {

        alert("Debe seleccionar un método de pago");
        
    } else {

        validatePay();
        
    }

});

function removeItem(positionToRemove) {//Elimina el item seleccionado del array de productos y llama a las funciones para cargar los datos y calcular los costos nuevamente

    cart.articles.splice(positionToRemove, 1);
    showCart();
    convertCurrency(); 

}