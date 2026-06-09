// Lógica del carrito
let carrito = [];

function agregarAlCarrito(id) {
  let encontrado = false;
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito[i].cantidad++;
      encontrado = true;
      break;
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
        break;
      }
    }
  }
  actualizarCarrito();
}

function eliminarProducto(id) {
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id == id) {
      carrito.splice(i, 1);
      break;
    }
  }
  actualizarCarrito();
}

function calcularTotal() {
  let total = 0;
  for (let i = 0; i < carrito.length; i++) {
    total += carrito[i].precio * carrito[i].cantidad;
  }
  return total;
}

function actualizarCarrito() {
  let contador = 0;
  for (let i = 0; i < carrito.length; i++) {
    contador += carrito[i].cantidad;
  }
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) cartCountEl.innerHTML = contador;

  let html = "";
  let reviewHtml = "";
  let finalHtml = "";
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

    reviewHtml += `
      <div class="review-item">
        <div>${carrito[i].nombre}</div>
        <div>$${carrito[i].precio} x ${carrito[i].cantidad}</div>
      </div>
    `;

    finalHtml += `
      <div class="review-item">
        <div>${carrito[i].nombre} x ${carrito[i].cantidad}</div>
        <div>$${carrito[i].precio * carrito[i].cantidad}</div>
      </div>
    `;
  }

  const cartItemsEl = document.getElementById("cart-items");
  if (cartItemsEl) cartItemsEl.innerHTML = html;

  const cartTotalEl = document.getElementById("cart-total");
  if (cartTotalEl) cartTotalEl.innerHTML = "$" + calcularTotal();

  const reviewItemsEl = document.getElementById("review-cart-items");
  if (reviewItemsEl) reviewItemsEl.innerHTML = reviewHtml;

  const finalItemsEl = document.getElementById("final-items");
  if (finalItemsEl) finalItemsEl.innerHTML = finalHtml;
}
