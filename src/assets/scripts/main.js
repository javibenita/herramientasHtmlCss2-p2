/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';
import * as bootstrap from "bootstrap";

/**
 * Write any other JavaScript below
 */

+(function () {
  const university = "UOC";
  console.log(`Hello, ${university}!`);
  console.log(bootstrap);
  console.log(bootstrap.Tooltip);

  document.addEventListener("DOMContentLoaded", () => {
    const colors = ["Verde", "Azul", "Rojo", "Amarillo"];
    const colorClasses = {
      Rojo: "captcha-color1",
      Verde: "captcha-color2",
      Azul: "captcha-color3",
      Amarillo: "captcha-color4",
    };

    const captchaItems = document.querySelectorAll(
      ".registration__captcha-item"
    );
    const colorTargetLabel = document.getElementById("captchaColorTarget");
    const captchaGrid = document.getElementById("captchaGrid");

    // Elegimos un color objetivo
    const targetColor = colors[Math.floor(Math.random() * colors.length)];
    const targetClass = colorClasses[targetColor];
    colorTargetLabel.textContent = targetColor;

    // Asignamos clase aleatoria a cada item del captcha
    captchaItems.forEach((item) => {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const colorClass = colorClasses[colors[colorIndex]];
      item.classList.add(colorClass);
      item.dataset.color = colorClass;

      const icon = item.querySelector("i");
      icon.className = "fa-regular fa-square";
      icon.dataset.checked = "false";
    });

    // Gestión de clics: alterna el estado del icono
    captchaGrid.addEventListener("click", (e) => {
      const item = e.target.closest(".registration__captcha-item");
      if (!item) return;

      const icon = item.querySelector("i");
      const isChecked = icon.dataset.checked === "true";
      icon.className = isChecked
        ? "fa-regular fa-square"
        : "fa-regular fa-check-square";
      icon.dataset.checked = String(!isChecked);

      /*const icon = e.target;
      if (
        !icon.classList.contains("fa-square") &&
        !icon.classList.contains("fa-check-square")
      )
        return;

      const isChecked = icon.dataset.checked === "true";
      icon.className = isChecked
        ? "fa-regular fa-square"
        : "fa-regular fa-check-square";
      icon.dataset.checked = String(!isChecked);*/
    });

    // Validación del captcha al enviar el formulario
    const form = document.querySelector(".registration__form");
    form.addEventListener("submit", (e) => {
      let valid = true;

      captchaItems.forEach((item) => {
        const icon = item.querySelector("i");
        const isTargetColor = item.dataset.color === targetClass;
        const isChecked = icon.dataset.checked === "true";

        if ((isTargetColor && !isChecked) || (!isTargetColor && isChecked)) {
          valid = false;
        }
      });

      if (!valid) {
        e.preventDefault();
        alert("La selección del captcha no es correcta. Inténtalo de nuevo.");
      }
    });
  });
})();
