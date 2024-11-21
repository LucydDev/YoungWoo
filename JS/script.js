//Menú Hamburguesa
function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('open');
}

function toggleSubmenu(element) {
    if (window.innerWidth <= 600) { // Solo afecta pantallas pequeñas
        const parentMenu = element.closest('.item-menu');
        parentMenu.classList.toggle('open');
    }
}

document.querySelector('.hamburger').addEventListener('click', function(event) {
    toggleMenu();
    event.preventDefault(); // Evita cualquier comportamiento predeterminado del clic
});

document.querySelector('.hamburger').addEventListener('touchstart', function(event) {
    toggleMenu();
    event.preventDefault(); // Evita cualquier comportamiento predeterminado del touch
});


//Carrusel de Galería
let indiceCarruselGaleria = 0;

function moverCarruselGaleria(direccion) {
    const carruselGaleria = document.querySelector('.contenido-carrusel');
    const miniaturas = carruselGaleria.children;
    const totalImagenes = miniaturas.length;

    const visibleItems = 3;
    const maxIndice = totalImagenes - visibleItems; 


    const anchoItem = miniaturas[0].offsetWidth;

    indiceCarruselGaleria += direccion;
    if (indiceCarruselGaleria < 0) {
        indiceCarruselGaleria = maxIndice;
    } else if (indiceCarruselGaleria > maxIndice) {
        indiceCarruselGaleria = 0;
    }

    carruselGaleria.style.transform = `translateX(-${indiceCarruselGaleria * anchoItem}px)`;
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


let startX = 0;
let endX = 0;

const carruselGaleria = document.querySelector('.contenido-carrusel');

carruselGaleria.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
});

carruselGaleria.addEventListener('touchmove', (event) => {
    endX = event.touches[0].clientX;
});

carruselGaleria.addEventListener('touchend', () => {
    const desplazamiento = endX - startX;
    if (desplazamiento > 50) {
        moverCarruselGaleria(-1); // Mover a la izquierda
    } else if (desplazamiento < -50) {
        moverCarruselGaleria(1); // Mover a la derecha
    }
});
//Fin Carrusel de Galería



// Carrusel de Actores
const carruselActores = document.querySelector('.carrusel-items');
const itemsActores = document.querySelectorAll('.formato-actores');
let visibleItemsActores = 3; 
let indexActores = 0;

function updateCarruselActores() {
    const offset = -indexActores * (100 / visibleItemsActores);
    carruselActores.style.transform = `translateX(${offset}%)`;
}

function updateResponsiveCarrusel() {
    if (window.innerWidth <= 600) {
        visibleItemsActores = 1; 
    } else {
        visibleItemsActores = 3; 
    }
    updateCarruselActores();
}

document.querySelector('.actores-carrusel .next').addEventListener('click', () => {
    indexActores = (indexActores + 1) % itemsActores.length;
    updateCarruselActores();
});

document.querySelector('.actores-carrusel .prev').addEventListener('click', () => {
    indexActores = (indexActores - 1 + itemsActores.length) % itemsActores.length;
    updateCarruselActores();
});

window.addEventListener('resize', updateResponsiveCarrusel);

updateResponsiveCarrusel();