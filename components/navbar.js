class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="navbar">
        <div class="nav-left">
          <a href="index.html" class="nav-logo">
            <img src="logo.jpg" alt="VapersBang" class="logo-img" />
          </a>
        </div>
        <div class="nav-right">
          <a href="index.html" class="nav-link">Inicio</a>
          <a href="contacto.html" class="nav-link">Contacto</a>
          <a href="about.html" class="nav-link">Sobre Nosotros</a>
          <a href="cookies.html" class="nav-link">Cookies</a>
          <a href="privacidad.html" class="nav-link">Privacidad</a>
          <a href="avisolegal.html" class="nav-link">Aviso Legal</a>
          <div class="cart-container">
            <a href="carrito.html" class="nav-link cart-link">🛒
              <span id="cart-count" class="cart-count" style="display:none">0</span>
            </a>
            <div id="cart-preview" class="cart-preview hidden">
              <div id="cart-items-preview"></div>
              <div class="cart-preview-footer">
                <a href="carrito.html" class="btn-ver-carrito">Ver carrito</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    `;

    this.updateCartDisplay();

    const cartIcon = this.querySelector(".cart-container");
    const cartPreview = this.querySelector("#cart-preview");

    // Mostrar/ocultar el resumen del carrito
    cartIcon.addEventListener("mouseenter", () => {
      cartPreview.classList.remove("hidden");
      this.renderPreview();
    });
    cartIcon.addEventListener("mouseleave", () => {
      cartPreview.classList.add("hidden");
    });
  }

  updateCartDisplay() {
    try {
      const countEl = this.querySelector("#cart-count");
      const count = window.cartManager?.getCount ? window.cartManager.getCount() : 0;
      if (countEl) {
        countEl.textContent = count;
        countEl.style.display = count > 0 ? "inline-block" : "none";
      }
    } catch (err) {
      console.warn("Error al actualizar contador del carrito:", err);
    }
    const cartIcon = document.querySelector(".cart-link");
if (cartIcon) {
  cartIcon.classList.add("cart-bounce");
  setTimeout(() => cartIcon.classList.remove("cart-bounce"), 600);
}

  }

  renderPreview() {
    const preview = this.querySelector("#cart-items-preview");
    const cart = window.cartManager?.getCart ? window.cartManager.getCart() : [];
    if (!preview) return;

    if (cart.length === 0) {
      preview.innerHTML = `<p class="vacio">Tu carrito está vacío</p>`;
      return;
    }

    preview.innerHTML = cart.map(item => `
      <div class="preview-item">
        <img src="${item.image}" alt="${item.name}" class="preview-img" />
        <div class="preview-info">
          <p class="preview-name">${item.name}</p>
          <p class="preview-qty">x${item.quantity}</p>
          <p class="preview-price">${(item.price * item.quantity).toFixed(2)} €</p>
        </div>
      </div>
    `).join('');
  }
}

customElements.define("custom-navbar", CustomNavbar);



