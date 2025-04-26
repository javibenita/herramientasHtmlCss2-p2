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

  let targetColor;
  let targetClass;

  function captchaInitialize(captchaGrid) {
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

    if (!captchaItems || !colorTargetLabel || !captchaGrid) {
      return;
    }
    // Elegimos un color objetivo
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetClass = colorClasses[targetColor];
    colorTargetLabel.textContent = targetColor;

    // Asignamos clase aleatoria a cada item del captcha
    captchaItems.forEach((item) => {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const colorClass = colorClasses[colors[colorIndex]];
      //item.classList.add(colorClass);
      item.className = `registration__captcha-item ${colorClass}`;
      item.dataset.color = colorClass;

      const icon = item.querySelector("i");
      icon.className = "fa-regular fa-square";
      icon.dataset.checked = "false";
    });
    const captchaAlert = document.getElementById("captchaAlert");
    if (captchaAlert) {
      captchaAlert.classList.add("d-none");
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Inicializamos el captcha al cargar la página
    const captchaGrid = document.getElementById("captchaGrid");
    if (captchaGrid) {
      captchaInitialize(captchaGrid);

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
      });
    }

    // Validación del captcha al enviar el formulario
    const form = document.querySelector(".registration__form");
    if (form) {
      form.addEventListener("submit", (e) => {
        let valid = true;

        const captchaItems = document.querySelectorAll(
          ".registration__captcha-item"
        );

        if (!captchaItems) {
          return;
        }
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
          //alert("La selección del captcha no es correcta. Inténtalo de nuevo.");
          const captchaAlert = document.getElementById("captchaAlert");
          if (captchaAlert) {
            captchaAlert.classList.remove("d-none");
          }
        } else {
          // Si el captcha es correcto, ocultamos la alerta
          const captchaAlert = document.getElementById("captchaAlert");
          if (captchaAlert) {
            captchaAlert.classList.add("d-none");
          }
          // Mostrar mensaje de éxito
          const captchaSuccess = document.getElementById("captchaSuccess");
          if (captchaSuccess) {
            e.preventDefault();
            captchaSuccess.classList.remove("d-none");
          }
        }
      });
    }

    //Recalcular el captcha al hacer clic en el botón de recargar
    const captchaReload = document.getElementById("captchaReload");
    if (captchaReload) {
      captchaReload.addEventListener("click", (e) => {
        e.preventDefault();
        captchaInitialize(captchaGrid);
      });
    }
  });
})();
