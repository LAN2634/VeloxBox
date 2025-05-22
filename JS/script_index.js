    // Forzar scroll al inicio al cargar la página
    window.onload = function () {
        window.scrollTo(0, 0);
    };

    // Funciones para el menú hamburguesa
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuContainer = document.getElementById('menuContainer');

    hamburgerBtn.addEventListener('click', () => {
        menuContainer.classList.toggle('active');
        menuOverlay.classList.toggle('active');
    });

    menuOverlay.addEventListener('click', () => {
        menuContainer.classList.remove('active');
        menuOverlay.classList.remove('active');
    });

    // Funciones para el carrito
    const cartToggle = document.getElementById('cart-toggle');
    const cartCount = document.getElementById('cart-count');

    // Inicializar contador del carrito
    updateCartCount(0);

    function updateCartCount(count) {
        cartCount.textContent = count > 0 ? count : '0';
    }

    function addToCart() {
        const currentCount = parseInt(cartCount.textContent || '0');
        updateCartCount(currentCount + 1);
    }

    // Swiper: almacenar instancia en una variable
    let swiper;

    document.addEventListener("DOMContentLoaded", function () {
        swiper = new Swiper(".mySwiper", {
            loop: true,
            spaceBetween: 5,
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
            }
        });
    });

    window.addEventListener("load", () => {
        if (swiper) {
            swiper.update();
        }
    });
