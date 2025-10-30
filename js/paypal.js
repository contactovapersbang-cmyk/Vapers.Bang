// js/paypal.js
document.addEventListener("DOMContentLoaded", () => {
  const paypalContainer = document.getElementById("paypal-button-container");
  if (!paypalContainer) return;

  paypal.Buttons({
    style: {
      color: "gold",
      shape: "pill",
      label: "paypal",
    },
    createOrder: (data, actions) => {
      const total = localStorage.getItem("cartTotal") || "10.00";
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: total,
              currency_code: "EUR",
            },
          },
        ],
      });
    },
    onApprove: (data, actions) => {
      return actions.order.capture().then(() => {
        window.location.href = "confirmacion.html";
      });
    },
    onError: (err) => {
      alert("Error con PayPal: " + err);
    },
  }).render("#paypal-button-container");
});
