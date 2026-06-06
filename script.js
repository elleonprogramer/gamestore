// =========================
// PRODUCTOS
// =========================

const productos = [

{
id:1,
nombre:"Resident Evil Requiem",
precio:1299,
categoria:"Terror",
imagen:"residen.jpg"
},

{
id:2,
nombre:"Mario Tennis Fever",
precio:799,
categoria:"Deportes",
imagen:"mario.jpg"
},

{
id:3,
nombre:"Mouse: P.I. For Hire",
precio:649,
categoria:"Noir",
imagen:"mause.jpg"
},

{
id:4,
nombre:"Cyber Runner 2077",
precio:999,
categoria:"Acción",
imagen:"https://picsum.photos/500/300?1"
},

{
id:5,
nombre:"Sky Racers Ultimate",
precio:899,
categoria:"Carreras",
imagen:"https://picsum.photos/500/300?2"
},

{
id:6,
nombre:"Mystic Quest Legends",
precio:1099,
categoria:"Aventura",
imagen:"https://picsum.photos/500/300?3"
}

];

// =========================
// VARIABLES
// =========================

let carrito = [];

let paso = 1;

// =========================
// MOSTRAR PRODUCTOS
// =========================

function mostrarProductos(){

let html = "";

for(let i=0;i<productos.length;i++){

html += `

<div class="card">

<div class="card-image">

<img src="${productos[i].imagen}">

</div>

<div class="card-content">

<span class="tag">

${productos[i].categoria}

</span>

<h3>

${productos[i].nombre}

</h3>

<p>

Precio: $${productos[i].precio}

</p>

<button
class="btn_game"
onclick="agregarAlCarrito(${productos[i].id})">

Agregar al carrito

</button>

</div>

</div>

`;

}

document.getElementById("product-grid").innerHTML = html;

}

// =========================
// AGREGAR
// =========================

function agregarAlCarrito(id){

let encontrado = false;

for(let i=0;i<carrito.length;i++){

if(carrito[i].id == id){

carrito[i].cantidad++;

encontrado = true;

}

}

if(encontrado == false){

for(let i=0;i<productos.length;i++){

if(productos[i].id == id){

carrito.push({

id:productos[i].id,
nombre:productos[i].nombre,
precio:productos[i].precio,
cantidad:1

});

}

}

}

actualizarCarrito();

}

// =========================
// ELIMINAR
// =========================

function eliminarProducto(id){

for(let i=0;i<carrito.length;i++){

if(carrito[i].id == id){

carrito.splice(i,1);

}

}

actualizarCarrito();

}

// =========================
// TOTAL
// =========================

function calcularTotal(){

let total = 0;

for(let i=0;i<carrito.length;i++){

total += carrito[i].precio *
carrito[i].cantidad;

}

return total;

}

// =========================
// ACTUALIZAR CARRITO
// =========================

function actualizarCarrito(){

let contador = 0;

for(let i=0;i<carrito.length;i++){

contador += carrito[i].cantidad;

}

document.getElementById("cart-count").innerHTML =
contador;

let html = "";

for(let i=0;i<carrito.length;i++){

html += `

<div class="cart-item">

<div>

<strong>

${carrito[i].nombre}

</strong>

<br>

$${carrito[i].precio}

x

${carrito[i].cantidad}

</div>

<button
onclick="eliminarProducto(${carrito[i].id})">

Eliminar

</button>

</div>

`;

}

document.getElementById("cart-items").innerHTML =
html;

document.getElementById("cart-total").innerHTML =
"$" + calcularTotal();

}

// =========================
// MODAL CARRITO
// =========================

const cartButton =
document.getElementById("cart-button");

const cartModal =
document.getElementById("cart-modal");

const closeCart =
document.getElementById("close-cart");

cartButton.addEventListener("click",function(){

cartModal.style.display = "flex";

});

closeCart.addEventListener("click",function(){

cartModal.style.display = "none";

});

// =========================
// CHECKOUT
// =========================

const checkoutButton =
document.getElementById("checkout-button");

const checkoutModal =
document.getElementById("checkout-modal");

const closeCheckout =
document.getElementById("close-checkout");

checkoutButton.addEventListener("click",function(){

if(carrito.length == 0){

alert("Tu carrito está vacío");

return;

}

cartModal.style.display = "none";

checkoutModal.style.display = "flex";

mostrarPaso(1);

});

closeCheckout.addEventListener("click",function(){

checkoutModal.style.display = "none";

});

// =========================
// PASOS
// =========================

function mostrarPaso(numero){

document.getElementById("paso1").style.display =
"none";

document.getElementById("paso2").style.display =
"none";

document.getElementById("paso3").style.display =
"none";

document.getElementById("paso4").style.display =
"none";

document.getElementById("paso"+numero).style.display =
"block";

paso = numero;

actualizarBarra();

}

// =========================
// BARRA
// =========================

function actualizarBarra(){

let porcentaje = 0;

if(paso == 1) porcentaje = 25;
if(paso == 2) porcentaje = 50;
if(paso == 3) porcentaje = 75;
if(paso == 4) porcentaje = 100;

document.getElementById("progress-bar")
.style.width = porcentaje + "%";

document.getElementById("progress-text")
.innerHTML = "Paso " + paso + " de 4";

}

// =========================
// BOTONES
// =========================

document.getElementById("next1")
.addEventListener("click",function(){

document.getElementById("review-total")
.innerHTML = "$" + calcularTotal();

mostrarPaso(2);

});

document.getElementById("back2")
.addEventListener("click",function(){

mostrarPaso(1);

});

document.getElementById("next2")
.addEventListener("click",function(){

let nombre =
document.getElementById("nombre").value;

let correo =
document.getElementById("correo").value;

let direccion =
document.getElementById("direccion").value;

if(nombre.length < 3){

alert("Nombre inválido");

return;

}

if(correo.indexOf("@") == -1){

alert("Correo inválido");

return;

}

if(direccion == ""){

alert("Ingresa dirección");

return;

}

mostrarPaso(3);

});

document.getElementById("back3")
.addEventListener("click",function(){

mostrarPaso(2);

});

document.getElementById("next3")
.addEventListener("click",function(){

mostrarPaso(4);

actualizarResumenFinal();

});

document.getElementById("back4")
.addEventListener("click",function(){

mostrarPaso(3);

});

// =========================
// RESUMEN FINAL
// =========================

function actualizarResumenFinal(){

document.getElementById("final-name")
.innerHTML =
"Nombre: " +
document.getElementById("nombre").value;

document.getElementById("final-email")
.innerHTML =
"Correo: " +
document.getElementById("correo").value;

document.getElementById("final-address")
.innerHTML =
"Dirección: " +
document.getElementById("direccion").value;

document.getElementById("final-total")
.innerHTML =
"$" + calcularTotal();

}

// =========================
// CONFIRMAR
// =========================

document.getElementById("confirm-button")
.addEventListener("click",function(){

alert("Compra realizada con éxito");

carrito = [];

actualizarCarrito();

checkoutModal.style.display = "none";

document.getElementById("nombre").value = "";
document.getElementById("correo").value = "";
document.getElementById("direccion").value = "";

mostrarPaso(1);

});

// =========================
// INICIO
// =========================

mostrarProductos();

actualizarCarrito();

mostrarPaso(1);