console.log("script.js cargado correctamente");

document.addEventListener("DOMContentLoaded", async () => {
  // Esperar a que cartManager esté disponible
  let retries = 0;
  while (!window.cartManager && retries < 20) {
    await new Promise(res => setTimeout(res, 100));
    retries++;
  }

  if (!window.cartManager) {
    console.error("❌ cartManager no está disponible tras varios intentos.");
    return;
  }
  console.log("✅ cartManager detectado:", window.cartManager);

  const buttons = document.querySelectorAll(".add-to-cart");
  if (buttons.length === 0) {
    console.warn("⚠️ No se encontraron botones .add-to-cart en el DOM");
  }

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const img = btn.dataset.img;

      if (!name || !price || !img) {
        console.error("❌ Faltan datos del producto:", { name, price, img });
        return;
      }

      const item = { name, price, img, quantity: 1 };
      window.cartManager.addItem(item);

      if (window.notifications) {
        notifications.show(`✅ ${name} añadido al carrito`, "success");
      }

      console.log("🛒 Producto añadido:", item);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const addButtons = document.querySelectorAll(".add-to-cart");

  addButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const image = btn.dataset.image;

      const quantityInput = document.querySelector(`#qty-${id}`);
      const quantity = quantityInput ? parseInt(quantityInput.value) : 1;

      if (!window.cartManager) {
        console.error("❌ CartManager no está definido.");
        return;
      }

      window.cartManager.addItem({ id, name, price, image }, quantity);

      // 🎉 Animación visual
      btn.textContent = "✅ Añadido!";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "Añadir al carrito";
        btn.classList.remove("added");
      }, 1000);
    });
  });
});

