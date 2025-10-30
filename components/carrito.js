// components/carrito.js
function initCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const summary = document.getElementById("cart-summary");
  const emptyMsg = document.getElementById("cart-empty");
  const checkoutBtn = document.getElementById("checkout-btn");
  const miniSummaryText = document.getElementById("mini-summary-text");
  const navbar = document.querySelector("custom-navbar");

  if (!cartContainer || !totalEl) return;

  const formatPrice = (n) => "$" + Number(n || 0).toFixed(2);

  function animateTotal(newTotal) {
    if (!totalEl) return;
    const current = parseFloat(totalEl.textContent.replace("$", "")) || 0;
    const diff = newTotal - current;
    const duration = 300;
    const start = performance.now();

    const frame = (t) => {
      const p = Math.min((t - start) / duration, 1);
      const v = current + diff * p;
      totalEl.textContent = formatPrice(v);
      if (p < 1) requestAnimationFrame(frame);
      else {
        totalEl.classList.add("pulse-total");
        setTimeout(() => totalEl.classList.remove("pulse-total"), 300);
      }
    };
    requestAnimationFrame(frame);
  }

  function renderCart() {
    const cart = window.cartManager?.getCart() || [];
    cartContainer.innerHTML = "";
    let total = 0;
    let totalItems = 0;

    if (!cart || cart.length === 0) {
      emptyMsg.classList.remove("hidden");
      summary.classList.add("hidden");
      animateTotal(0);
      if (navbar?.updateCartDisplay) navbar.updateCartDisplay();
      return;
    }

    emptyMsg.classList.add("hidden");
    summary.classList.remove("hidden");

    cart.forEach((item, index) => {
      const qty = Number(item.quantity || 1);
      const price = Number(item.price || 0);
      const itemTotal = qty * price;
      total += itemTotal;
      totalItems += qty;

      const row = document.createElement("div");
      row.className = "flex justify-between items-center bg-gray-800 p-3 mb-3 rounded-xl border border-purple-700/30";
      row.innerHTML = `
      <div class="cart-item">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p class="cart-price">${item.price.toFixed(2)} €</p>
        <div class="quantity-control">
          <button class="qty-btn decrease" data-name="${item.name}">-</button>
          <input type="number" class="qty-input" data-name="${item.name}" value="${item.quantity}" min="1" max="99">
          <button class="qty-btn increase" data-name="${item.name}">+</button>
        </div>
      </div>
      <button class="remove-item" data-name="${item.name}">❌</button>
    </div>


      `;
      cartContainer.appendChild(row);
    });

    animateTotal(total);
    if (miniSummaryText) miniSummaryText.textContent = `${totalItems} artículo${totalItems>1?"s":""} • ${formatPrice(total)}`;
    localStorage.setItem("cartTotal", total.toFixed(2));
    if (navbar?.updateCartDisplay) navbar.updateCartDisplay();
  }

  // cambiar cantidad
  document.addEventListener("input", (e) => {
    const input = e.target;
    if (!input.matches("input[type='number'][data-index]")) return;
    const idx = Number(input.dataset.index);
    let qty = Number(input.value);
    if (!Number.isFinite(qty) || qty < 1) { qty = 1; input.value = 1; }
    if (window.cartManager && typeof window.cartManager.updateQuantity === "function") {
      window.cartManager.updateQuantity(idx, qty);
    } else {
      const c = JSON.parse(localStorage.getItem("cart") || "[]");
      if (c[idx]) { c[idx].quantity = qty; localStorage.setItem("cart", JSON.stringify(c)); window.dispatchEvent(new Event("cart-updated")); }
    }
    renderCart();
  });

  // eliminar producto
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-remove]");
    if (!btn) return;
    const idx = Number(btn.dataset.remove);
    if (window.cartManager && typeof window.cartManager.removeProduct === "function") {
      window.cartManager.removeProduct(idx);
    } else {
      const c = JSON.parse(localStorage.getItem("cart") || "[]"); c.splice(idx,1); localStorage.setItem("cart", JSON.stringify(c)); window.dispatchEvent(new Event("cart-updated"));
    }
    renderCart();
  });

  // finalizar compra -> redirige a checkout.html
  checkoutBtn?.addEventListener("click", () => {
    const cart = window.cartManager?.getCart() || [];
    if (!cart.length) {
      alert("Tu carrito está vacío.");
      return;
    }
    // ir al checkout (checkout mostrará su propio botón de procesar)
    window.location.href = "checkout.html";
  });

  // escuchar eventos globales
  window.addEventListener("cart-updated", renderCart);

  // render inicial
  renderCart();
}

document.addEventListener("DOMContentLoaded", initCartPage);








