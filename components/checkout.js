// =============================
// 💜 Checkout Logic - VapersBang
// =============================

document.addEventListener("DOMContentLoaded", () => {
  feather.replace();

  // Mostrar resumen del pedido
  if (window.renderCheckout) {
    window.renderCheckout();
  }

  const processBtn = document.getElementById("process-btn");
  if (!processBtn) return;

  processBtn.addEventListener("click", () => {
    startProcessing();
  });
});

// =============================
// 🎬 Animación de progreso visual
// =============================
function startProcessing() {
  const container = document.getElementById("checkout-summary");
  container.innerHTML = `
    <div class="text-center py-10 fade-in">
      <h2 class="text-2xl font-semibold text-purple-400 mb-4">Procesando compra...</h2>
      <div class="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-purple-700/30 max-w-md mx-auto">
        <div id="progress-bar" class="bg-gradient-to-r from-purple-600 to-purple-500 h-4 w-0 transition-all duration-300 ease-in-out"></div>
      </div>
      <p id="progress-text" class="text-gray-400 mt-4">Conectando con la tienda...</p>
    </div>
  `;

  simulateProgress();
}

// =============================
// ⏳ Simulación del progreso (100%)
// =============================
function simulateProgress() {
  const bar = document.getElementById("progress-bar");
  const text = document.getElementById("progress-text");
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 15; // velocidad variable
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      text.textContent = "✅ Compra completada. Redirigiendo...";
      setTimeout(() => {
        window.cartManager.clearCart();
        window.location.href = "confirmacion.html";
      }, 1500);
    }

    // Actualizar barra y texto
    bar.style.width = `${progress}%`;

    if (progress < 40) {
      text.textContent = "🔄 Procesando pago seguro...";
    } else if (progress < 80) {
      text.textContent = "📦 Confirmando pedido...";
    } else if (progress < 100) {
      text.textContent = "✨ Casi listo...";
    }
  }, 400);
}


