document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function crearGaleria() {
  const cantidadImg = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= cantidadImg; i++) {
    const imagen = document.createElement("PICTURE");

    imagen.innerHTML = imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;

    // imagen.src = `src/img/gallery/thumb/${i}.jpg`;
    // imagen.alt = "Imagen Galeria";
    // imagen.loading = "lazy";
    // imagen.width = "300";
    // imagen.height = "200";

    // Event Hander: esto detecta y responde  a una interaccion de un usuario

    imagen.onclick = function () {
      mostrarImagen(i);
    };

    galeria.appendChild(imagen);
  }
}

// fucion para mostrar el modal

function mostrarImagen(i) {
  // generamos la imagen
  const imagen = document.createElement("PICTURE");
  imagen.src = `src/img/gallery/full/${i}.jpg`;
  imagen.alt = "Imagen Galeria";

  // generar modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");

  modal.onclick = cerrarModal; // cerramos el modal

  // Boton de cerrar modal
  const cerrarModalBtn = document.createElement("BUTTOM");
  cerrarModalBtn.textContent = "X";
  cerrarModalBtn.classList.add("btn-cerrar");
  cerrarModalBtn.onclick = cerrarModal;

  modal.appendChild(imagen);
  modal.appendChild(cerrarModalBtn);

  //agregar al HTML
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

// funcion para cerrar el modal
function cerrarModal() {
  const eliminarModal = document.querySelector(".modal");
  eliminarModal.classList.add("fade-out");

  setTimeout(() => {
    eliminarModal?.remove(); //si existe modal entonces eliminalo

    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden ");
  }, 500); //medio segundos
}

// navegacion fija

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  document.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function resaltarEnlace() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLink = document.querySelectorAll(".navegacion-principal a");

    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navLink.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}

function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
