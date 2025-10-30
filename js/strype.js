// js/stripe.js
document.addEventListener("DOMContentLoaded", () => {
  const stripeBtn = document.getElementById("stripe-btn");
  if (!stripeBtn) return;

  stripeBtn.addEventListener("click", async () => {
    stripeBtn.disabled = true;
    stripeBtn.textContent = "Redirigiendo a Stripe...";

    // Public key en modo test (segura para cliente)
    const stripe = Stripe("pk_test_51Nzy5mAq9F9vP6Jz6gWkQbK9IcvPz2RZ3JZZZZZZZZZZZZZZZZZZZZZZZ");

    // Simulación local sin backend (checkout test)
    setTimeout(() => {
      window.location.href = "confirmacion.html";
    }, 3000);
  });
});
