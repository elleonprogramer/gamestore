// Modal y proceso de checkout
const cartButton = document.getElementById("cart-button");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");

if (cartButton) {
  cartButton.addEventListener("click", function() {
    if (cartModal) cartModal.style.display = "flex";
  });
}

if (closeCart) {
  closeCart.addEventListener("click", function() {
    if (cartModal) cartModal.style.display = "none";
  });
}

const checkoutButton = document.getElementById("checkout-button");
const checkoutModal = document.getElementById("checkout-modal");
const closeCheckout = document.getElementById("close-checkout");

if (checkoutButton) {
  checkoutButton.addEventListener("click", function() {
    if (carrito.length == 0) {
      alert("Tu carrito está vacío");
      return;
    }
    if (cartModal) cartModal.style.display = "none";
    if (checkoutModal) checkoutModal.style.display = "flex";
    mostrarPaso(1);
  });
}

if (closeCheckout) {
  closeCheckout.addEventListener("click", function() {
    if (checkoutModal) checkoutModal.style.display = "none";
  });
}

let paso = 1;
function mostrarPaso(numero) {
  for (let p = 1; p <= 4; p++) {
    const el = document.getElementById("paso" + p);
    if (el) el.style.display = "none";
  }
  const mostrar = document.getElementById("paso" + numero);
  if (mostrar) mostrar.style.display = "block";
  paso = numero;
  actualizarBarra();
}

function actualizarBarra() {
  let porcentaje = 0;
  if (paso == 1) porcentaje = 25;
  if (paso == 2) porcentaje = 50;
  if (paso == 3) porcentaje = 75;
  if (paso == 4) porcentaje = 100;
  const bar = document.getElementById("progress-bar");
  if (bar) bar.style.width = porcentaje + "%";
  const txt = document.getElementById("progress-text");
  if (txt) txt.innerHTML = "Paso " + paso + " de 4";
}

const next1 = document.getElementById("next1");
if (next1) {
  next1.addEventListener("click", function() {
    const reviewTotal = document.getElementById("review-total");
    if (reviewTotal) reviewTotal.innerHTML = "$" + calcularTotal();
    mostrarPaso(2);
  });
}

const back2 = document.getElementById("back2");
if (back2) back2.addEventListener("click", function() { mostrarPaso(1); });

const next2 = document.getElementById("next2");
if (next2) {
  next2.addEventListener("click", function() {
    let nombre = document.getElementById("nombre").value;
    let correo = document.getElementById("correo").value;
    let direccion = document.getElementById("direccion").value;
    if (nombre.length < 3) {
      alert("Nombre inválido");
      return;
    }
    // Validar correo: debe contener @ y terminar en .com (o tener .com en alguna parte)
    if (correo.indexOf("@") == -1 || correo.toLowerCase().indexOf(".com") == -1) {
      alert("Correo inválido (debe contener @ y .com)");
      return;
    }
    if (direccion == "") {
      alert("Ingresa dirección");
      return;
    }
    mostrarPaso(3);
  });
}

const back3 = document.getElementById("back3");
if (back3) back3.addEventListener("click", function() { mostrarPaso(2); });

const next3 = document.getElementById("next3");
if (next3) {
  next3.addEventListener("click", function() {
    mostrarPaso(4);
    actualizarResumenFinal();
  });
}

const back4 = document.getElementById("back4");
if (back4) back4.addEventListener("click", function() { mostrarPaso(3); });

function actualizarResumenFinal() {
  const nombreEl = document.getElementById("nombre");
  const correoEl = document.getElementById("correo");
  const direccionEl = document.getElementById("direccion");

  const finalName = document.getElementById("final-name");
  const finalEmail = document.getElementById("final-email");
  const finalAddress = document.getElementById("final-address");
  const finalTotal = document.getElementById("final-total");

  if (finalName && nombreEl) finalName.innerHTML = "Nombre: " + nombreEl.value;
  if (finalEmail && correoEl) finalEmail.innerHTML = "Correo: " + correoEl.value;
  if (finalAddress && direccionEl) finalAddress.innerHTML = "Dirección: " + direccionEl.value;
  if (finalTotal) finalTotal.innerHTML = "$" + calcularTotal();
}

const confirmButton = document.getElementById("confirm-button");
if (confirmButton) {
  confirmButton.addEventListener("click", function() {
    alert("Compra realizada con éxito");
    carrito = [];
    actualizarCarrito();
    if (checkoutModal) checkoutModal.style.display = "none";
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const direccion = document.getElementById("direccion");
    if (nombre) nombre.value = "";
    if (correo) correo.value = "";
    if (direccion) direccion.value = "";
    mostrarPaso(1);
  });
}
