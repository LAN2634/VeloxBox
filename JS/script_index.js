// ==================== CÓDIGO EXISTENTE ====================
// Forzar scroll al inicio al cargar la página
window.onload = function () {
    window.scrollTo(0, 0);
    updateCartCount(); // Modificado para que se actualice al cargar
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

// FOOTER MODALIDADES
function openVentana(id) {
    document.getElementById(id).style.display = 'block';
}

function closeVentana(id) {
    document.getElementById(id).style.display = 'none';
}

// Cierra la ventana si se hace clic en otro lado
window.onclick = function(event) {
    const ventanas = document.querySelectorAll('.ventana');
    ventanas.forEach(ventana => {
        if (event.target === ventana) {
            ventana.style.display = 'none';
        }
    });
}

// ==================== NUEVO CÓDIGO PARA PRODUCTOS ====================
// Swiper: almacenar instancia en una variable
let swiper;

// Actualizar contador del carrito desde el backend
async function updateCartCount() {
    try {
        const response = await fetch('http://localhost:9090/api/carrito/cantidad');
        if (!response.ok) throw new Error("Error al obtener cantidad");
        
        const cantidad = await response.json();
        cartCount.textContent = cantidad > 0 ? cantidad : '0';
        
        if (cantidad > 0) {
            cartCount.classList.add('animate-bounce');
            setTimeout(() => cartCount.classList.remove('animate-bounce'), 1000);
        }
    } catch (error) {
        console.error("Error actualizando contador:", error);
        cartCount.textContent = '0';
    }
}

// Cargar productos destacados
async function loadFeaturedProducts() {
    try {
        const response = await fetch('http://localhost:8080/api/Productos/destacados');
        if (!response.ok) throw new Error("Error al cargar productos destacados");
        
        const productos = await response.json();
        renderFeaturedProducts(productos);
    } catch (error) {
        console.error("Error:", error);
        renderFeaturedProducts(getFallbackProducts());
    }
}

// Renderizar productos en el slider
function renderFeaturedProducts(productos) {
    const container = document.querySelector('.swiper-wrapper');
    if (!container) return;

    container.innerHTML = productos.map(producto => `
        <div class="swiper-slide">
            <div class="card">
                <div class="image-content">
                    <span class="overlay"></span>
                    <div class="card-image">
                        <img src="${producto.imagen?.[0] || 'img/placeholder.jpg'}" 
                             alt="${producto.nombre}"
                             class="card-img"
                             onerror="this.src='img/placeholder.jpg'">
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="name">${producto.nombre}</h3>
                    <p class="description">$${producto.precio.toFixed(2)} MXN</p>
                    <button class="cardButton" 
                            data-id="${producto.id}"
                            data-name="${producto.nombre}"
                            data-price="${producto.precio}"
                            data-img="${producto.imagen?.[0] || ''}">
                        VER MÁS
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Agregar eventos a los botones
    document.querySelectorAll('.cardButton').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productId = btn.getAttribute('data-id');
            window.location.href = `Detalle_Productos.html?id=${productId}`;
        });
    });

    // Inicializar Swiper
    initSwiper();
}

// Productos de respaldo si la API falla
function getFallbackProducts() {
    return [
        {
            id: 1,
            nombre: "Playera Trabajo Duro",
            precio: 640,
            imagen: ["https://www.veloxboxing.shop/cdn/shop/files/HARDWORK_92719e3f-7158-4fcf-9c22-a00590f7d772.jpg"]
        },
        {
            id: 2,
            nombre: "Playera Agresividad",
            precio: 640,
            imagen: ["https://www.veloxboxing.shop/cdn/shop/files/Playera_Agressive_Tras_V002.png"]
        },
        // Agrega más productos según necesites
    ];
}

// Inicializar Swiper
function initSwiper() {
    if (swiper) {
        swiper.destroy(); // Destruye la instancia anterior si existe
    }
    
    swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 5,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
        }
    });
}

// ==================== INICIALIZACIÓN AL CARGAR LA PÁGINA ====================
document.addEventListener("DOMContentLoaded", function () {
    loadFeaturedProducts();
    updateCartCount();
    
    // Inicializar Swiper con configuración básica
    swiper = new Swiper(".mySwiper", {
        loop: true,
        spaceBetween: 5,
        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        }
    });
});

window.addEventListener("load", () => {
    if (swiper) {
        swiper.update();
    }
});