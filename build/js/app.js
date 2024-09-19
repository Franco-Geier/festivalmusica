"use strict";

document.addEventListener("DOMContentLoaded", function() {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}


function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" widht="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen Galeria">
        `;

        imagen.onclick = function() {
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}


function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${id}.avif" type="image/avif">
        <source srcset="build/img/grande/${id}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen Galeria">
    `;

    // Crea el overlay con la imagen
    const overlay = document.createElement("DIV");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");

    // Agregar la clase activo después de un pequeño retraso para que se active la animación
    setTimeout(() => {
        overlay.classList.add("activo");
    }, 10);

    // Botón de cerrar
    const cerrarModal = document.createElement("P");
    cerrarModal.textContent = "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick = function() {
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);

    // Añadir el overlay al body
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");

    // Cerrar el overlay haciendo clic fuera de la imagen
    overlay.onclick = function() {
        body.classList.remove("fijar-body");
        overlay.remove();
    };
}