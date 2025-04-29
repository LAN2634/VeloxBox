// JavaScript para controlar el carrito
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartCount = document.querySelector('.cart-count');
const subtotalAmount = document.querySelector('.subtotal-amount');
const totalAmount = document.querySelector('.total-amount');
const clearCartBtn = document.querySelector('.clear-cart-btn');

let cart = [];

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productCard = button.parentElement;
    const title = productCard.getAttribute('data-title');
    const price = parseFloat(productCard.getAttribute('data-price'));
    const image = productCard.querySelector('.product-image').getAttribute('src');

    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ title, price, image, quantity: 1 });
    }
    updateCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = '';

  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-image">
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>$${item.price.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="quantity-btn decrease">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn increase">+</button>
        </div>
      </div>
      <button class="remove-item"><i class="fas fa-trash"></i></button>
    `;

    cartItemsContainer.appendChild(cartItem);

    // Botones de cantidad
    cartItem.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(prod => prod.title !== item.title);
      }
      updateCart();
    });

    cartItem.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    // Botón de eliminar individual
    cartItem.querySelector('.remove-item').addEventListener('click', () => {
      cart = cart.filter(prod => prod.title !== item.title);
      updateCart();
    });
  });

  updateTotals();
  updateCartCount();
}

function updateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
  totalAmount.textContent = `$${(subtotal + 5.99).toFixed(2)}`; // Envío fijo
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = count;
}

// Botón Eliminar Todo
clearCartBtn.addEventListener('click', () => {
  cart = [];
  updateCart();
});