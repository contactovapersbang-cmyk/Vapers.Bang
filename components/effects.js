// components/effects.js
class VapersEffects {
  static playSound(action = "add") {
    const audio = new Audio(
      action === "add"
        ? "https://cdn.pixabay.com/download/audio/2023/03/27/audio_3e4beebc2a.mp3?filename=soft-pop-click-131856.mp3"
        : "https://cdn.pixabay.com/download/audio/2023/03/27/audio_6e7b7c5a3b.mp3?filename=click-pop-131847.mp3"
    );
    audio.volume = 0.4;
    audio.play().catch(() => {}); // Evita errores si el navegador bloquea autoplay
  }

  static vibrate(duration = 100) {
    if (navigator.vibrate) {
      navigator.vibrate(duration);
    }
  }

  static successPulse(element) {
    if (!element) return;
    element.style.transition = "transform 0.3s ease";
    element.style.transform = "scale(1.1)";
    setTimeout(() => {
      element.style.transform = "scale(1)";
    }, 300);
  }
}

window.vapersEffects = VapersEffects;
console.log("✅ VapersEffects cargado correctamente");
