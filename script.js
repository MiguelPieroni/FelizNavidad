document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Configuración común para todas las páginas
    setupImageEffects();
    
    if (currentPage === 'index.html') {
        createSnowflakes();
    } else if (currentPage === 'pagina4.html') {
        createHearts();
        setupHomeButton();
    } else if (currentPage === 'pagina3.html') {
        setupPage3Buttons();
    }

    // Configurar navegación para todas las páginas excepto 3 y 4
    if (currentPage !== 'pagina3.html' && currentPage !== 'pagina4.html') {
        setupNavigation(currentPage);
    }
});

function setupPage3Buttons() {
    const btnUnico = document.getElementById('btnUnico');
    const btnSecreto = document.getElementById('btnSecreto');
    
    if (btnUnico) {
        btnUnico.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('index.html');
        });
    }
    
    if (btnSecreto) {
        btnSecreto.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('pagina4.html');
        });
    }
}

function setupHomeButton() {
    const btnVolver = document.getElementById('btnVolver');
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            transitionToPage('index.html');
        });
    }
}

function setupNavigation(currentPage) {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const currentIndex = pages.indexOf(currentPage);

    if (btnAnterior && btnSiguiente) {
        btnAnterior.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('prev', currentIndex);
        });

        btnSiguiente.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage('next', currentIndex);
        });

        setupKeyboardNavigation(currentIndex);
    }
}

const pages = [
    'index.html',
    'pagina2.html',
    'pagina3.html'
];

function navigateToPage(direction, currentIndex) {
    let newIndex;
    
    if (direction === 'next') {
        newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
    } else {
        newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
    }

    transitionToPage(pages[newIndex]);
}

function transitionToPage(page) {
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

function setupImageEffects() {
    const images = document.querySelectorAll('.imagen-galeria');
    
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', () => {
            setTimeout(() => {
                img.style.opacity = '1';
            }, 100);
        });

        if (img.complete) {
            img.dispatchEvent(new Event('load'));
        }

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

function createSnowflakes() {
    const snowflakesCount = window.innerWidth < 768 ? 15 : 30;
    const snowflakes = '❄️✨';

    for (let i = 0; i < snowflakesCount; i++) {
        createSnowflake(snowflakes);
    }
}

function createSnowflake(snowflakes) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
    snowflake.style.opacity = Math.random();
    snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
    
    document.body.appendChild(snowflake);

    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake(snowflakes);
    });
}

function createHearts() {
    const heartsCount = window.innerWidth < 768 ? 10 : 20;
    const hearts = '💖💝💗';

    for (let i = 0; i < heartsCount; i++) {
        createHeart(hearts);
    }
}

function createHeart(hearts) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    
    document.body.appendChild(heart);

    heart.addEventListener('animationend', () => {
        heart.remove();
        createHeart(hearts);
    });
}

function setupKeyboardNavigation(currentIndex) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateToPage('prev', currentIndex);
        } else if (e.key === 'ArrowRight') {
            navigateToPage('next', currentIndex);
        }
    });
}