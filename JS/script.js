function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}


//Carrusel de Galería
let indiceCarruselGaleria = 0;

function moverCarruselGaleria(direccion) {
    const carruselGaleria = document.querySelector('.contenido-carrusel');
    const totalImagenes = carruselGaleria.children.length;
    const maxIndice = totalImagenes - 3;

    indiceCarruselGaleria += direccion;
    if (indiceCarruselGaleria < 0) {
        indiceCarruselGaleria = maxIndice;
    } else if (indiceCarruselGaleria > maxIndice) {
        indiceCarruselGaleria = 0;
    }

    carruselGaleria.style.transform = `translateX(-${indiceCarruselGaleria * (100 / 3)}%)`;
}

function toggleFullScreen(element) {
    const existingFullscreen = document.querySelector('.fullscreen');
    if (existingFullscreen) {
        existingFullscreen.remove();
        return;
    }

    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.classList.add('fullscreen');

    const img = document.createElement('img');
    img.src = element.src;
    img.alt = element.alt;

    fullscreenDiv.appendChild(img);
    document.body.appendChild(fullscreenDiv);

    fullscreenDiv.onclick = function() {
        fullscreenDiv.remove();
    };
}


// Carrusel de Actores
const carruselActores = document.querySelector('.carrusel-items');
const itemsActores = document.querySelectorAll('.formato-actores');
const visibleItemsActores = 3;
let indexActores = 0;

function updateCarruselActores() {
    const offset = -indexActores * (100 / visibleItemsActores);
    carruselActores.style.transform = `translateX(${offset}%)`;
}

document.querySelector('.actores-carrusel .next').addEventListener('click', () => {
    indexActores = (indexActores + 1) % itemsActores.length;
    updateCarruselActores();
});

document.querySelector('.actores-carrusel .prev').addEventListener('click', () => {
    indexActores = (indexActores - 1 + itemsActores.length) % itemsActores.length;
    updateCarruselActores();
});