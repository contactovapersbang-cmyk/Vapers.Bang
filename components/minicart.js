// components/minicart.js
class MiniCart {
  constructor() {
    this.container = document.createElement("div");
    this.container.id = "mini-cart";
    this.container.innerHTML = `
      <div class="mini-cart-header">
        <h3>Tu carrito</h3>
        <button id="close-mini-cart">✕</button>
      </div>
      <div id="mini-cart-items"></div>
      <div class="mini-cart-footer">
        <p class="mini-cart-total">Total: <span id="mini-cart-total">0.00 €</span></p>
        <a href="carrito.html" class="mini-cart-btn">Ver carrito</a>
      </div>
    `;

    document.body.appendChild(this.container);
    this.loadStyles();
    this.bindEvents();
  }

  loadStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #mini-cart {
      position: fixed;
      top: 0;
      right: -400px;
      width: 320px;
      height: 100vh;
      background: rgba(27, 0, 33, 0.85);
      color: white;
      box-shadow: -4px 0 25px rgba(150, 0, 255, 0.35);
      backdrop-filter: blur(15px);
      transition: right 0.5s cubic-bezier(0.25, 1, 0.5, 1);
      z-index: 2000;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-left: 2px solid rgba(255,255,255,0.1);
      font-family: 'Poppins', sans-serif;
      transform-origin: right center;
      opacity: 0;
    }

    #mini-cart.open {
      right: 0;
      opacity: 1;
      animation: cartBounce 0.6s ease forwards;
    }

    @keyframes cartBounce {
      0% { transform: translateX(100%) scale(0.95); }
      60% { transform: translateX(-10px) scale(1.03); }
      100% { transform: translateX(0) scale(1); }
    }

    .mini-cart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      background: rgba(255,255,255,0.08);
      border-bottom: 1px solid rgba(255,255,255,0.15);
    }

    .mini-cart-header h3 { margin: 0; font-size: 18px; font-weight: 600; }

    #close-mini-cart {
      background: none;
      border: none;
      color: white;
      font-size: 18px;
      cursor: pointer;
      transition: 0.3s;
    }

    #close-mini-cart:hover {
      transform: scale(1.2);
      color: #b84cff;
    }

    #mini-cart-items {
      flex-grow: 1;
      overflow-y: auto;
      padding: 15px;
    }

    .mini-cart-item {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 10px;
      transition: transform 0.2s;
    }

    .mini-cart-item:hover {
      transform: scale(1.02);
    }

    .mini-cart-item img {
      width: 50px;
      height: 50px;
      border-radius: 8px;
      object-fit: cover;
    }

    .mini-cart-item-info p {
      margin: 0;
      font-size: 14px;
    }

    .mini-cart-footer {
      padding: 20px;
      background: rgba(255,255,255,0.08);
      text-align: center;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .mini-cart-btn {
      display: inline-block;
      background: linear-gradient(135deg, #b84cff, #8a2be2);
      color: white;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      transition: 0.3s;
      box-shadow: 0 4px 10px rgba(150,0,255,0.4);
    }

    .mini-cart-btn:hover {
      box-shadow: 0 6px 20px rgba(150,0,255,0.6);
      transform: translateY(-2px);
    }

    /* Scrollbar elegante */
    #mini-cart-items::-webkit-scrollbar { width: 6px; }
    #mini-cart-items::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.2);
      border-radius: 6px;
    }
  `;
  document.head.appendChild(style);
}


  bindEvents() {
    document.querySelector(".cart-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.toggle();
    });

    document.body.addEventListener("click", (e) => {
      if (e.target.id === "close-mini-cart") this.toggle(false);
    });
  }

  toggle(forceOpen) {
    const isOpen = this.container.classList.contains("open");
    if (forceOpen === undefined) {
      this.container.classList.toggle("open");
    } else {
    forceOpen ? this.container.classList.add("open") : this.container.classList.remove("open");
    }
    if (!isOpen || forceOpen) this.render();
  }

  render() {
    const cart = window.cartManager?.getCart() || [];
    const itemsEl = this.container.querySelector("#mini-cart-items");
    const totalEl = this.container.querySelector("#mini-cart-total");
    itemsEl.innerHTML = "";

    if (cart.length === 0) {
      itemsEl.innerHTML = "<p style='text-align:center;margin-top:50px;'>Tu carrito está vacío 💨</p>";
      totalEl.textContent = "0.00 €";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const subtotal = item.price * item.quantity;
      total += subtotal;
      const div = document.createElement("div");
      div.className = "mini-cart-item";
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="mini-cart-item-info">
          <p><strong>${item.name}</strong></p>
          <p>${item.quantity} x ${item.price.toFixed(2)} €</p>
        </div>
      `;
      itemsEl.appendChild(div);
    });

    totalEl.textContent = total.toFixed(2) + " €";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.miniCart = new MiniCart();
  console.log("✅ MiniCart cargado correctamente");
});
