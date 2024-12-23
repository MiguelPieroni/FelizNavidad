// Configuración de páginas
const pages = [
    'index.html',
    'pagina2.html',
    'pagina3.html'
];

// Función principal que se ejecuta cuando el DOM está cargado
document.addEventListener('DOMContentLoaded', () => {
    // Obtener elementos del DOM
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    
    // Obtener página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentIndex = pages.indexOf(currentPage);

    // Configurar visibilidad inicial de los botones
    updateNavigationButtons(currentIndex);

    // Evento para el botón anterior
    btnAnterior.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage('prev', currentIndex);
    });

    // Evento para el botón siguiente
    btnSiguiente.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage('next', currentIndex);
    });

    // Añadir efectos a las imágenes
    setupImageEffects();

    // Añadir efecto de nieve si es la página principal
    if (currentPage === 'index.html') {
        createSnowflakes();
    }

    // Añadir eventos de teclado para navegación
    setupKeyboardNavigation(currentIndex);
});

// Función para actualizar la visibilidad de los botones
function updateNavigationButtons(currentIndex) {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');

    // Mostrar/ocultar botón anterior
    if (currentIndex === 0) {
        btnAnterior.style.visibility = 'visible';
    } else {
        btnAnterior.style.visibility = 'visible';
    }

    // Mostrar/ocultar botón siguiente
    if (currentIndex === pages.length - 1) {
        btnSiguiente.style.visibility = 'visible';
    } else {
        btnSiguiente.style.visibility = 'visible';
    }
}

// Función para navegar entre páginas
function navigateToPage(direction, currentIndex) {
    let newIndex;
    
    if (direction === 'next' && currentIndex < pages.length - 1) {
        newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
    } else {
        return; // No navegar si estamos en los límites
    }

    // Añadir efecto de transición
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = pages[newIndex];
    }, 500);
}

// Configurar efectos para las imágenes
function setupImageEffects() {
    const images = document.querySelectorAll('.imagen-galeria');
    
    images.forEach(img => {
        // Efecto de carga suave
        img.addEventListener('load', () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
        });

        // Efecto hover táctil
        if ('ontouchstart' in window) {
            img.addEventListener('touchstart', () => {
                img.style.transform = 'scale(1.05)';
            });
            img.addEventListener('touchend', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });
}

// Crear efecto de nieve
function createSnowflakes() {
    const snowflakesCount = window.innerWidth < 768 ? 15 : 30;
    const snowflakes = '❄️✨';

    for (let i = 0; i < snowflakesCount; i++) {
        createSnowflake(snowflakes);
    }
}

// Crear un copo de nieve individual
function createSnowflake(snowflakes) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random();
    snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    
    document.body.appendChild(snowflake);

    // Eliminar el copo cuando termine la animación
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake(snowflakes); // Crear uno nuevo
    });
}

// Configurar navegación por teclado
function setupKeyboardNavigation(currentIndex) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateToPage('prev', currentIndex);
        } else if (e.key === 'ArrowRight') {
            navigateToPage('next', currentIndex);
        }
    });
}