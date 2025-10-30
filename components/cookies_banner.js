// components/cookies-banner.js
document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const accepted = localStorage.getItem("cookies_accepted");
  if (!accepted) banner.classList.remove("hidden");

  document.getElementById("accept-cookies").addEventListener("click", () => {
    localStorage.setItem("cookies_accepted", "yes");
    banner.classList.add("hidden");
  });

  document.getElementById("reject-cookies").addEventListener("click", () => {
    localStorage.setItem("cookies_accepted", "no");
    banner.classList.add("hidden");
  });
});
