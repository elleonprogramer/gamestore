//declarando los productos disponibles en la tienda
const productos = [
  { id: 1, nombre: "Resident Evil Requiem", precio: 1299, categoria: "Terror", imagen: "residen.jpg" },
  { id: 2, nombre: "Mario Tennis Fever", precio: 799, categoria: "Deportes", imagen: "mario.jpg" },
  { id: 3, nombre: "Mouse: P.I. For Hire", precio: 649, categoria: "Noir", imagen: "mause.jpg" },
  { id: 4, nombre: "forza horizont 6", precio: 999, categoria: "carreras", imagen: "forza.avif" },
  { id: 5, nombre: "Sky Racers Ultimate", precio: 899, categoria: "Carreras", imagen: "https://picsum.photos/500/300?2" },
  { id: 6, nombre: "Mystic Quest Legends", precio: 1099, categoria: "Aventura", imagen: "https://picsum.photos/500/300?3" }
];

let carrito = [];
let paso = 1;
//mostrar los productos en la página
function mostrarProductos() {
  let html = "";
  for (let i = 0; i < productos.length; i++) {
    html += `
      <div class="card">
        <div class="card-image">
          <img src="${productos[i].imagen}">
        </div>
        <div class="card-content">
          <span class="tag">${productos[i].categoria}</span>
          <h3>${productos[i].nombre}</h3>
          <p>Precio: $${productos[i].precio}</p>
          <button class="btn_game" onclick="agregarAlCarrito(${productos[i].id})">Agregar al carrito</button>
        </div>
      </div>
    `;
  }
  document.getElementById("product-grid").innerHTML = html;
}
//agregar los productos al carrito y berificar y ahy un producto en el carrito y pus ponerlo en el carrito o si ya esta aumentar la cantidad del producto en el carrito
function agregarAlCarrito(id) {
  let encontrado = false;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito[i].cantidad++;
      encontrado = true;
    }
  }
  if (!encontrado) {
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id == id) {
        carrito.push({
          id: productos[i].id,
          nombre: productos[i].nombre,
          precio: productos[i].precio,
          cantidad: 1
        });
      }
    }
  }
  actualizarCarrito();
}
//eliminacion de producto
function eliminarProducto(id) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito.splice(i, 1);
    }
  }
  actualizarCarrito();
}
//los calculos
function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}
//actualizar el carrito y mostrar los productos en el carrito y el total
function actualizarCarrito() {
  let contador = 0;
  for (let i = 0; i < carrito.length; i++) {
    contador += carrito[i].cantidad;
  }
  document.getElementById("cart-count").innerHTML = contador;
  let html = "";
  for (let i = 0; i < carrito.length; i++) {
    html += `
      <div class="cart-item">
        <div>
          <strong>${carrito[i].nombre}</strong><br>
          $${carrito[i].precio} x ${carrito[i].cantidad}
        </div>
        <button onclick="eliminarProducto(${carrito[i].id})">Eliminar</button>
      </div>
    `;
  }
  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("cart-total").innerHTML = "$" + calcularTotal();
}
//funciones para mostrar el modal del carrito y el modal de chequeo y para mostrar los pasos del verificacion del chequeo y para actualizar la barra de progreso del chequeo y para mostrar el resumen final del chequeo y para confirmar la compra
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

cartButton.addEventListener("click", function() {
  cartModal.style.display = "flex";
});

closeCart.addEventListener("click", function() {
  cartModal.style.display = "none";
});

const checkoutButton = document.getElementById("checkout-button");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");

checkoutButton.addEventListener("click", function() {
  if (carrito.length == 0) {
    alert("Tu carrito está vacío");
    return;
  }
  cartModal.style.display = "none";
  checkoutModal.style.display = "flex";
  mostrarPaso(1);
});

closeCheckout.addEventListener("click", function() {
  checkoutModal.style.display = "none";
});

function mostrarPaso(numero) {
  document.getElementById("paso1").style.display = "none";
  document.getElementById("paso2").style.display = "none";
  document.getElementById("paso3").style.display = "none";
  document.getElementById("paso4").style.display = "none";
  document.getElementById("paso" + numero).style.display = "block";
  paso = numero;
  actualizarBarra();
}
//actualizar la barra de progreso del chequeo
function actualizarBarra() {
  let porcentaje = 0;
  if (paso == 1) porcentaje = 25;
  if (paso == 2) porcentaje = 50;
  if (paso == 3) porcentaje = 75;
  if (paso == 4) porcentaje = 100;
  document.getElementById("progress-bar").style.width = porcentaje + "%";
  document.getElementById("progress-text").innerHTML = "Paso " + paso + " de 4";
}
//eventos para los botones de siguiente y anterior en el proceso de chequeo
document.getElementById("next1").addEventListener("click", function() {
  document.getElementById("review-total").innerHTML = "$" + calcularTotal();
  mostrarPaso(2);
});
//validaciones para el paso 2 del chequeo
document.getElementById("back2").addEventListener("click", function() {
  mostrarPaso(1);
});
//validaciones para el paso 2 del chequeo y para mostrar el paso 3 del chequeo
document.getElementById("next2").addEventListener("click", function() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("correo").value;
  let direccion = document.getElementById("direccion").value;
  if (nombre.length < 3) {
    alert("Nombre inválido");
    return;
  }
  if (correo.indexOf("@") == -1) {
    alert("Correo inválido");
    return;
  }
  if (direccion == "") {
    alert("Ingresa dirección");
    return;
  }
  mostrarPaso(3);
});

document.getElementById("back3").addEventListener("click", function() {
  mostrarPaso(2);
});

document.getElementById("next3").addEventListener("click", function() {
  mostrarPaso(4);
  actualizarResumenFinal();
});

document.getElementById("back4").addEventListener("click", function() {
  mostrarPaso(3);
});
//funcion para mostrar el resumen final del chequeo
function actualizarResumenFinal() {
  document.getElementById("final-name").innerHTML = "Nombre: " + document.getElementById("nombre").value;
  document.getElementById("final-email").innerHTML = "Correo: " + document.getElementById("correo").value;
  document.getElementById("final-address").innerHTML = "Dirección: " + document.getElementById("direccion").value;
  document.getElementById("final-total").innerHTML = "$" + calcularTotal();
}
//funcion para confirmar la compra y mostrar un mensaje de éxito y limpiar el carrito y actualizar el carrito y cerrar el modal de chequeo y limpiar los campos del formulario y mostrar el paso 1 del chequeo
document.getElementById("confirm-button").addEventListener("click", function() {
  alert("Compra realizada con éxito");
  carrito = [];
  actualizarCarrito();
  checkoutModal.style.display = "none";
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("direccion").value = "";
  mostrarPaso(1);
});
//que todo inicialize mostrando los producto, la actualizacion del carro y los pasos de compra
mostrarProductos();
actualizarCarrito();
mostrarPaso(1);
