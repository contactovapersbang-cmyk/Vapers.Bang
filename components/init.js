

document.addEventListener("DOMContentLoaded", () => {
  console.log("init.js: interfaz lista 🚀");

  // Transición entre páginas
  window.addEventListener("beforeunload", () => {
    document.body.classList.add("fade-out");
  });

  // Efecto "reveal" al hacer scroll
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const revealTop = el.getBoundingClientRect().top;
      if (revealTop < windowHeight - 80) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Ejecuta al cargar
});

window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");

  // Transición entre páginas
  document.querySelectorAll("a").forEach(link => {
    if (link.getAttribute("href") && !link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", e => {
        e.preventDefault();
        document.body.classList.remove("loaded");
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      });
    }
  });
});
// Toggle modo oscuro manual
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const dark = document.body.classList.contains("dark-mode");
      localStorage.setItem("darkMode", dark);
      toggle.textContent = dark ? "☀️" : "🌙";
    });
    if (localStorage.getItem("darkMode") === "true") {
      document.body.classList.add("dark-mode");
      toggle.textContent = "☀️";
    }
  }
});
window.addEventListener("DOMContentLoaded", () => {
  console.log("init.js: inicializando UI");
  
  if (window.cartManager) {
    const count = window.cartManager.getCount();
    const countEl = document.getElementById("cart-count");
    if (countEl) {
      countEl.style.display = count > 0 ? "inline-block" : "none";
      countEl.textContent = count;
    }
  }

  // 🔒 Protección extra: si el carrito está vacío y entras al checkout
  if (location.pathname.includes("checkout.html")) {
    const cart = window.cartManager.getCart();
    if (!cart || cart.length === 0) {
      alert("Tu carrito está vacío. Agrega productos antes de continuar 🛒");
      window.location.href = "carrito.html";
    }
  }
});
