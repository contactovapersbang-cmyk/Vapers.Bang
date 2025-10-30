# Vapers.Bang - Proyecto Web Corregido

## 📦 Contenido del Proyecto

Este paquete contiene la versión corregida y totalmente funcional de la tienda web **Vapers.Bang**.

### 🗂️ Estructura
```
VapersBang_Completo/
│
├── index.html              # Página principal
├── about.html              # Sección "Sobre nosotros"
├── contacto.html           # Página de contacto
├── carrito.html            # Carrito de compras funcional
├── checkout.html           # Página de finalizar compra
├── avisolegal.html         # Aviso legal
├── privacidad.html         # Política de privacidad
├── cookies.html            # Política de cookies
│
├── components/             # Componentes reutilizables
│   ├── navbar.js           # Barra de navegación con iconos y contador de carrito
│   └── footer.js           # Pie de página con enlaces legales y redes sociales
│
├── script.js               # Control del carrito (añadir, eliminar, contador)
├── style.css               # Estilos globales
└── README.txt              # Este archivo
```

---

## ⚙️ Instalación Local

1. **Descarga** el archivo ZIP y descomprímelo en tu ordenador.
2. Abre la carpeta `VapersBang_Completo/`.
3. Haz doble clic en `index.html` para abrir el sitio en tu navegador.

*(No requiere servidor local ni dependencias adicionales)*

---

## 🧠 Funcionalidades Principales

- **Carrito de compras** con almacenamiento local (`localStorage`)
- **Contador dinámico** de productos en el icono del carrito (navbar)
- **Eliminación y cálculo automático** del total en `carrito.html`
- **Modal de edad/términos** con animación suave (solo primera visita)
- **Avisos legales** separados: Aviso Legal, Privacidad y Cookies
- **Diseño responsive y oscuro** con Tailwind CSS
- **Redes sociales activas:**  
  🔗 Instagram → https://instagram.com/vapers.bang_  
  🔗 TikTok → https://tiktok.com/@vapers_bang

---

## 🧰 Recomendaciones Técnicas

- Para probar en dispositivos móviles, usa **Live Server** de VSCode o un servidor local.
- Para limpiar el carrito: abre la consola (F12 → "Consola") y ejecuta:
  ```js
  localStorage.removeItem('cart');
  ```
- Asegúrate de mantener el formato de precios con punto decimal (`$14.99`) para evitar errores en los cálculos.

---

## 🧩 Créditos

- Desarrollo y optimización: **Asistente IA (ChatGPT)**  
- Proyecto base y contenido: **Equipo Vapers.Bang**

VAPERSBANG - FIX CARRITO
========================

Archivos actualizados:
- carrito.html
- carrito.js
- components/cartManager.js
- script.js

Instrucciones:
1. Copia estos archivos en tu estructura de proyecto (mantén las carpetas igual).
2. Abre index.html, añade productos.
3. Ve a carrito.html → deberían mostrarse inmediatamente.
4. Elimina o finaliza compra → todo actualizado sin recargar.

