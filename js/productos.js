// Productos y función para mostrarlos
const productos = [
  { id: 1, nombre: "Resident Evil Requiem", precio: 1299, categoria: "Terror", imagen: "img/residen.jpg" },
  { id: 2, nombre: "Mario Tennis Fever", precio: 799, categoria: "Deportes", imagen: "img/mario.jpg" },
  { id: 3, nombre: "Mouse: P.I. For Hire", precio: 649, categoria: "Noir", imagen: "img/mause.jpg" },
  { id: 4, nombre: "forza horizont 6", precio: 999, categoria: "carreras", imagen: "img/forza.avif" },
  { id: 5, nombre: "GTA6", precio: 2500, categoria: "accion y aventura", imagen: "img/gta6.avif" },
  { id: 6, nombre: "lego batman", precio: 1099, categoria: "Aventura", imagen: "img/lego_batman.jpg" }
];

function mostrarProductos() {
  let html = "";
  for (let i = 0; i < productos.length; i++) {
    html += `
      <div class="card product-card">
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
