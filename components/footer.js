
class CustomFooter extends HTMLElement {
  connectedCallback() { 
    this.innerHTML = `
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="logo.jpg" alt="VapersBang" class="footer-logo" />
            <p class="footer-text">💨 Tu tienda de vapers premium</p>

            <div class="social-icons">
              <a href="https://instagram.com/vapers.bang_" target="_blank" class="social-btn instagram" title="Instagram">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://tiktok.com/@vapers_bang" target="_blank" class="social-btn tiktok" title="TikTok">
                <i class="fab fa-tiktok"></i>
              </a>
            </div>
          </div>

          <div class="footer-links">
            <a href="about.html">Sobre Nosotros</a>
            <a href="cookies.html">Cookies</a>
            <a href="privacidad.html">Privacidad</a>
            <a href="avisolegal.html">Aviso Legal</a>
            <a href="contacto.html">Contacto</a>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© <span id="year"></span> VapersBang. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;

    // Año dinámico
    const yearSpan = this.querySelector("#year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }
}

customElements.define("footer-component", CustomFooter);
