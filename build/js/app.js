document.addEventListener("DOMContentLoaded", function () {
  crearGaleria();
});
function crearGaleria() {
  const cantidadImg = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let i = 1; i <= cantidadImg; i++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = "Imagen Galeria";
    galeria.appendChild(imagen);
  }
}
