// components/notification.js
class VapersNotification {
  static show(message = "Producto añadido al carrito 💨") {
    // Si ya hay una notificación activa, elimínala antes de crear una nueva
    const existing = document.getElementById("vapers-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "vapers-toast";
    toast.innerHTML = `<p>${message}</p>`;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.background = "linear-gradient(135deg, #b84cff, #8a2be2)";
    toast.style.color = "white";
    toast.style.padding = "14px 24px";
    toast.style.borderRadius = "14px";
    toast.style.boxShadow = "0 0 20px rgba(150, 0, 255, 0.4)";
    toast.style.fontFamily = "'Poppins', sans-serif";
    toast.style.fontSize = "15px";
    toast.style.opacity = "0";
    toast.style.transition = "all 0.5s ease";
    toast.style.zIndex = "2000";
    toast.style.pointerEvents = "none";

    document.body.appendChild(toast);

    // Animación de entrada
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(-10px)";
    }, 100);

    // Animación de salida
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  }
}

window.vapersNotification = VapersNotification;
console.log("✅ VapersNotification cargado correctamente");
