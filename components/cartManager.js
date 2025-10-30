if (!window.cartManager) {
  console.log("✅ CartManager listo para producción");
}

class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
    this.updateCount();
  }

  saveCart() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
    this.updateCount();
  }

  addItem(item, quantity = 1) {
  const existing = this.cart.find(p => p.id === item.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    this.cart.push({ ...item, quantity });
  }
  localStorage.setItem("cart", JSON.stringify(this.cart));
  this.updateCount();
}

  updateQuantity(index, newQuantity) {
  if (this.cart[index]) {
    this.cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

  removeItem(index) {
  this.cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(this.cart));
}


  clearCart() {
  this.cart = [];
  localStorage.removeItem("cart");
  this.updateCount();
}


  getCart() {
    return this.cart;
  }

  getCount() {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  getTotal() {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  updateCount() {
    const el = document.getElementById("cart-count");
    if (el) {
      const count = this.getCount();
      el.textContent = count;
      el.style.display = count > 0 ? "inline" : "none";
    }
  }
}


// Redirigir a pago.html al pulsar "Finalizar compra"
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const cart = window.cartManager?.getCart?.() || [];
      if (cart.length === 0) {
        alert("Tu carrito está vacío 🛒. Agrega productos antes de finalizar la compra.");
        return;
      }

      // Guardamos total en localStorage
      const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      localStorage.setItem("cartTotal", total.toFixed(2));

      // Animación de carga morada tipo “procesando”
      checkoutBtn.innerHTML = "Procesando...";
      checkoutBtn.disabled = true;
      checkoutBtn.style.opacity = "0.6";

      setTimeout(() => {
        window.location.href = "pago.html";
      }, 1500);
    });
  }
});

window.cartManager = new CartManager();
console.log("✅ CartManager cargado correctamente");

window.renderCart = function() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cartContainer || !totalEl) return;

  const cart = window.cartManager.getCart();
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Tu carrito está vacío 🛒</p>";
    totalEl.textContent = "0.00 €";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>Precio: ${item.price.toFixed(2)} €</p>
        <div class="quantity-control">
          <button class="decrease" data-index="${index}">-</button>
          <input type="number" min="1" value="${item.quantity}" data-index="${index}" />
          <button class="increase" data-index="${index}">+</button>
        </div>
        <p class="subtotal">Subtotal: ${subtotal.toFixed(2)} €</p>
        <button class="remove" data-index="${index}">Eliminar</button>
      </div>
    `;

    cartContainer.appendChild(div);
  });

  totalEl.textContent = `${total.toFixed(2)} €`;

  // Actualizar cantidad
  document.querySelectorAll(".quantity-control input").forEach(input => {
    input.addEventListener("change", (e) => {
      const i = e.target.dataset.index;
      const newQuantity = parseInt(e.target.value) || 1;
      window.cartManager.updateQuantity(i, newQuantity);
      renderCart();
    });
  });

  // Botones + y -
  document.querySelectorAll(".increase").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      const item = cart[i];
      window.cartManager.updateQuantity(i, item.quantity + 1);
      renderCart();
    });
  });

  document.querySelectorAll(".decrease").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      const item = cart[i];
      if (item.quantity > 1) {
        window.cartManager.updateQuantity(i, item.quantity - 1);
        renderCart();
      }
    });
  });

  // Eliminar producto
  document.querySelectorAll(".remove").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const i = e.target.dataset.index;
      window.cartManager.removeItem(i);
      renderCart();
    });
  });
};
