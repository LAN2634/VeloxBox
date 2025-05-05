const cartToggle = document.getElementById('cart-toggle');
const cart = document.getElementById('cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeCartBtn = document.querySelector('.close-cart'); // NUEVO

let carrito = [];

cartToggle.addEventListener('click', () => {
  cart.classList.toggle('hidden');
});

// NUEVO: cerrar carrito al hacer clic en botón "close"
closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
});

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.card');
    const id = card.dataset.id;
    const title = card.dataset.title;
    const price = parseFloat(card.dataset.price);
    const color = card.dataset.color;
    const size = card.dataset.size;

    const itemIndex = carrito.findIndex(p => p.id === id);
    if (itemIndex !== -1) {
      carrito[itemIndex].quantity += 1;
    } else {
      carrito.push({ id, title, price, color, size, quantity: 1 });
    }

    renderCart();
  });
});

function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  carrito.forEach(product => {
    total += product.price * product.quantity;

    const item = document.createElement('div');
    item.classList.add('item');
    item.innerHTML = `
      <div class="image"></div>
      <div class="item-info">
        <h3>${product.title} / ${product.color} / ${product.size}</h3>
        <p>$${(product.price * product.quantity).toFixed(2)} MXN</p>
        <div class="quantity-controls">
          <button onclick="updateQuantity('${product.id}', -1)">-</button>
          <span>${product.quantity}</span>
          <button onclick="updateQuantity('${product.id}', 1)">+</button>
        </div>
        <span class="remove" onclick="removeItem('${product.id}')">Eliminar</span>
      </div>
    `;
    cartItems.appendChild(item);
  });

  cartTotal.textContent = `$${total.toFixed(2)} MXN`;
}

function updateQuantity(id, delta) {
  const index = carrito.findIndex(p => p.id === id);
  if (index !== -1) {
    carrito[index].quantity += delta;
    if (carrito[index].quantity <= 0) {
      carrito.splice(index, 1);
    }
    renderCart();
  }
}

function removeItem(id) {
  carrito = carrito.filter(p => p.id !== id);
  renderCart();
}
