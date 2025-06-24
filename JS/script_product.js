// Forzar scroll al inicio al cargar la página
window.onload = function () {
    window.scrollTo(0, 0);
};
 // Activar menú hamburguesa
 //TODO ESTE ES PARA QUE SE DESPLEIGUE EL MENU HAMBURGUESA


 //AQUI UA ACABO

//y aqui empezamos con hacer la informacion despegable
document.querySelectorAll('.btn-desplegar').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
  
  //Esto es para cambiar el color de boton de la talla seleccionada a negro
  const botonesTalla = document.querySelectorAll('.talla');
  botonesTalla.forEach(boton => {
    boton.addEventListener('click', () => {
      // Quitar clase activa de todos los botones
      botonesTalla.forEach(btn => btn.classList.remove('activa'));
      // Agregar clase activa al botón clickeado
      boton.classList.add('activa');
    });
  });
  
  function renderProductDetails(producto) {
    // ... (código existente)
    
    // 3. Imágenes (ahora manejamos un array)
    const imgElement = document.getElementById('product-image');
    const images = producto.imagen || ['img/placeholder.jpg'];
    imgElement.src = images[0];
    imgElement.alt = producto.nombre || 'Producto';
    
    // Configurar navegación de imágenes si hay más de una
    if (images.length > 1) {
        setupImageNavigation(images);
    } else {
        // Ocultar flechas si solo hay una imagen
        document.querySelector('.prev-arrow').style.display = 'none';
        document.querySelector('.next-arrow').style.display = 'none';
    }
    
    // ... (resto del código existente)
  }

  // Función para manejar la navegación de imágenes (corregida)
  function setupImageNavigation(images) {
    const imgElement = document.getElementById('product-image');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let currentIndex = 0;
    
    // Mostrar flechas
    prevArrow.style.display = 'block';
    nextArrow.style.display = 'block';
    
    // Función para cambiar imagen con transición
    function changeImage(index) {
      currentIndex = index;
      // Efecto de transición
      imgElement.style.opacity = 0;
      setTimeout(() => {
        imgElement.src = images[currentIndex];
        imgElement.alt = `Imagen ${currentIndex + 1} del producto`;
        imgElement.style.opacity = 1;
      }, 200);
    }
    
    // Eventos para las flechas
    prevArrow.addEventListener('click', (e) => {
      e.preventDefault();
      let newIndex = currentIndex - 1;
      if (newIndex < 0) newIndex = images.length - 1;
      changeImage(newIndex);
    });
    
    nextArrow.addEventListener('click', (e) => {
      e.preventDefault();
      let newIndex = currentIndex + 1;
      if (newIndex >= images.length) newIndex = 0;
      changeImage(newIndex);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevArrow.click();
      } else if (e.key === 'ArrowRight') {
        nextArrow.click();
      }
    });
  }

  // Modal de Guía de Tallas
  document.addEventListener('DOMContentLoaded', function() {
    const enlaceGuia = document.querySelector('.guia-tallas');
    const modal = document.getElementById("modalTallas");
    const cerrar = document.getElementById("cerrarModal");

    if (enlaceGuia && modal && cerrar) {
      enlaceGuia.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });

      cerrar.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
      });

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          document.body.style.overflow = "auto";
        }
      });
            // ==================== INICIALIZACIÓN ====================
    document.addEventListener('DOMContentLoaded', async () => {
        // Obtener ID del producto desde la URL
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');


        if (!productId) {
            showError('No se encontró el producto');
            return;
        }


        try {
            // 1. Obtener datos del producto
            const response = await fetch(`http://localhost:8080/api/Productos/${productId}`);
            if (!response.ok) throw new Error('Producto no encontrado');


            const producto = await response.json();
            renderProductDetails(producto);
            setupEventListeners();
            setupCart(); // Configurar funcionalidad del carrito


            // 2. Cargar productos similares (opcional)
            await loadSimilarProducts(producto.categoria);


            // 3. Actualizar contador del carrito
            await updateCartCount();


        } catch (error) {
            console.error('Error:', error);
            showError('No se pudo cargar el producto');
        }
    });


    // ==================== CONFIGURACIÓN DEL CARRITO ====================
    function setupCart() {
        const cartToggle = document.getElementById('cart-toggle');
        const cartPanel = document.getElementById('cartPanel');


        if (cartToggle && cartPanel) {
            cartToggle.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                cartPanel.classList.toggle('hidden');


                if (!cartPanel.classList.contains('hidden')) {
                    await loadCartItems();
                }
            });


            // Cerrar al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!cartPanel.contains(e.target) && e.target !== cartToggle && !cartToggle.contains(e.target)) {
                    cartPanel.classList.add('hidden');
                }
            });
        }
    }


    // ==================== FUNCIONES PARA MOSTRAR PRODUCTOS ====================


    // Renderizar detalles del producto principal
    function renderProductDetails(producto) {
        // 1. Información básica
        document.getElementById('product-name').textContent = producto.nombre || 'Nombre no disponible';
        document.getElementById('product-description').textContent =
            producto.descripcion || 'Descripción no disponible';


        // 2. Detalles específicos
        document.getElementById('product-materials').textContent =
            producto.materiales || 'Materiales no especificados';
        document.getElementById('product-care').textContent =
            producto.cuidados || 'Cuidados no especificados';
        document.getElementById('product-delivery').textContent =
            producto.pagodevolucion || 'Información no disponible';


        // 3. Imagen
        const imgElement = document.getElementById('product-image');
        imgElement.src = producto.imagen?.[0] || 'img/placeholder.jpg';
        imgElement.alt = producto.nombre || 'Producto';


        // 4. Precio
        document.getElementById('product-price').textContent =
            `$${producto.precio?.toFixed(2) || '0.00'} MXN`;


        // 5. Tallas (ejemplo: "S,M,L" -> botones individuales)
        const sizesContainer = document.getElementById('product-sizes');
        if (producto.tamanio) {
            sizesContainer.innerHTML = producto.tamanio.split(',')
                .map(size => `<button class="talla"><h3>${size.trim()}</h3></button>`)
                .join('');
        }


        // 6. Configurar botón de compra
        const buyBtn = document.getElementById('buy-btn');
        if (buyBtn) {
            buyBtn.dataset.id = producto.id;
            buyBtn.dataset.name = producto.nombre;
            buyBtn.dataset.price = producto.precio;
            buyBtn.dataset.img = producto.imagen?.[0] || '';
            buyBtn.dataset.sku = producto.sku || '';
        }
    }


    // Cargar productos similares
    async function loadSimilarProducts(categoria) {
        if (!categoria) return;
      
        try {
            const response = await fetch(`http://localhost:8080/api/Productos/filtrar?categoria=${categoria}&limit=4`);
            if (!response.ok) return;


            const similares = await response.json();
            renderSimilarProducts(similares);
        } catch (error) {
            console.error('Error al cargar similares:', error);
        }
    }


    // Renderizar productos similares con botones de agregar al carrito
    function renderSimilarProducts(productos) {
        const container = document.getElementById('similar-products');
        if (!container) return;


        container.innerHTML = productos.map(producto => `
            <div class="product-card">
                <a href="Detalle_Productos.html?id=${producto.id}">
                    <div class="product-img">
                        <img src="${producto.imagen?.[0] || 'img/placeholder.jpg'}"
                            alt="${producto.nombre}"
                            onerror="this.src='img/placeholder.jpg'">
                    </div>
                </a>
                <div class="product-info">
                    <p class="product-name">${producto.nombre}</p>
                    <p class="product-price">$${producto.precio?.toFixed(2) || '0.00'} MXN</p>
                    <button class="add-to-cart"
                            data-id="${producto.id}"
                            data-name="${producto.nombre}"
                            data-price="${producto.precio}"
                            data-img="${producto.imagen?.[0] || ''}"
                            data-sku="${producto.sku || ''}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        `).join('');


        // Agregar event listeners a los nuevos botones
        setupAddToCartButtons();
    }


    // ==================== FUNCIONALIDADES DEL CARRITO ====================


    // Configurar botones de agregar al carrito
    function setupAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async function(e) {
                e.preventDefault();
                const producto = {
                    id: button.getAttribute('data-id'),
                    nombre: button.getAttribute('data-name'),
                    precio: parseFloat(button.getAttribute('data-price')),
                    sku: button.getAttribute('data-sku'),
                    imagen: [button.getAttribute('data-img')],
                    cantidad: 1
                };


                await addToCart(producto);
            });
        });
    }


    // Función principal para agregar al carrito
    async function addToCart(producto) {
        try {
            // 1. Consultar stock actual
            const stockResponse = await fetch(`http://localhost:8080/api/Productos/${producto.id}/stock`);
            if (!stockResponse.ok) throw new Error("Error al consultar stock");
          
            const stockData = await stockResponse.json();


            // 2. Verificar si hay stock disponible
            if (stockData.stock < 1) {
                showError('Lo sentimos, este producto está agotado.');
                return;
            }


            // 3. Agregar al carrito solo si hay stock
            const response = await fetch('http://localhost:9090/api/carrito/agregar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto)
            });


            if (!response.ok) throw new Error("Error al agregar al carrito");


            showSuccess(`${producto.nombre} añadido al carrito`);
            updateCartCount();
            animateCartIcon();


            // Actualizar panel del carrito si está visible
            const cartPanel = document.getElementById('cartPanel');
            if (cartPanel && !cartPanel.classList.contains('hidden')) {
                await loadCartItems();
            }
        } catch (error) {
            console.error("Error:", error);
            showError('No se pudo agregar al carrito');
        }
    }


    // Cargar items del carrito
    async function loadCartItems() {
        try {
            const response = await fetch('http://localhost:9090/api/carrito');
            if (!response.ok) throw new Error("Error al cargar el carrito");


            const cartProducts = await response.json();
            renderCartItems(cartProducts);
        } catch (error) {
            console.error("Error:", error);
            const cartItemsContainer = document.getElementById('cartItems');
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = `
                    <div class="error">
                        <p>Error al cargar el carrito</p>
                        <small>${error.message}</small>
                    </div>`;
            }
        }
    }


    // Renderizar items del carrito
    function renderCartItems(items) {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;


        if (!items || items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Tu carrito está vacío</p>';
            return;
        }


        cartItemsContainer.innerHTML = items.map(item => {
            const producto = item.producto || item;
            const id = producto.id || '';
            const nombre = producto.nombre || 'Producto sin nombre';
            const precio = producto.precio ? producto.precio.toFixed(2) : '0.00';
            const imagen = producto.imagen?.[0] || 'img/placeholder.jpg';
            const cantidad = item.cantidad || 1;


            return `
            <div class="cart-item" data-id="${id}">
                <div class="cart-item-img-container">
                    <img src="${imagen}" alt="${nombre}" class="cart-item-img" onerror="this.src='img/placeholder.jpg'">
                </div>
                <div class="cart-item-info">
                    <h4>${nombre}</h4>
                    <p>Precio: $${precio} MXN</p>
                    <p>
                        Cantidad:
                        <button class="btn-disminuir" data-id="${id}">-</button>
                        <span class="cantidad">${cantidad}</span>
                        <button class="btn-aumentar" data-id="${id}">+</button>
                    </p>
                    <p>Subtotal: $${(parseFloat(precio) * cantidad).toFixed(2)} MXN</p>
                    <button class="remove-item" data-id="${id}">Eliminar</button>
                </div>
            </div>
            `;
        }).join('');


        // Configurar eventos para los controles del carrito
        setupCartControls();
        updateCartTotal(items);
    }


    // Configurar controles del carrito (eliminar, aumentar/disminuir cantidad)
    function setupCartControls() {
        // Eventos eliminar
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });


        // Eventos aumentar cantidad
        document.querySelectorAll('.btn-aumentar').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                await cambiarCantidad(id, 'incrementar');
            });
        });


        // Eventos disminuir cantidad
        document.querySelectorAll('.btn-disminuir').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const id = e.currentTarget.getAttribute('data-id');
                await cambiarCantidad(id, 'disminuir');
            });
        });
    }


    // Cambiar cantidad de un producto en el carrito
    async function cambiarCantidad(id, accion) {
        try {
            const url = `http://localhost:9090/api/carrito/${accion}/${id}`;
            const response = await fetch(url, { method: 'PUT' });
            if (!response.ok) throw new Error('Error al cambiar cantidad');


            await loadCartItems();
            updateCartCount();
        } catch (error) {
            console.error(error);
            showError('Error al actualizar la cantidad');
        }
    }


    // Eliminar producto del carrito
    async function removeFromCart(e) {
        const productId = e.currentTarget.getAttribute('data-id');


        try {
            const response = await fetch(`http://localhost:9090/api/carrito/eliminar/${productId}`, {
                method: 'DELETE'
            });


            if (!response.ok) throw new Error("Error al eliminar del carrito");


            showSuccess('Producto eliminado del carrito');
            updateCartCount();
            await loadCartItems();
        } catch (error) {
            console.error("Error:", error);
            showError('No se pudo eliminar del carrito');
        }
    }


    // Actualizar total del carrito
    function updateCartTotal(items) {
        const totalContainer = document.createElement('div');
        totalContainer.className = 'cart-total';


        const total = items.reduce((sum, item) => {
            const producto = item.producto || item;
            return sum + (producto.precio * (item.cantidad || 1));
        }, 0);


        totalContainer.innerHTML = `
            <div class="total-line"></div>
            <div class="total-amount">
                <span>Total:</span>
                <span>$${total.toFixed(2)} MXN</span>
            </div>
            <a href="Compras_Carrito.html" class="checkout-btn">Proceder al pago</a>
        `;


        const oldTotal = document.querySelector('.cart-total');
        if (oldTotal) oldTotal.remove();


        const cartItemsContainer = document.getElementById('cartItems');
        if (cartItemsContainer) {
            cartItemsContainer.appendChild(totalContainer);
        }
    }


    // Actualizar contador del carrito
    async function updateCartCount() {
        try {
            const response = await fetch('http://localhost:9090/api/carrito/cantidad');
            if (!response.ok) throw new Error("Error al obtener cantidad");


            const cantidad = await response.json();
            const cartCount = document.getElementById('cart-count');


            if (cartCount) {
                cartCount.textContent = cantidad;
                if (cantidad > 0) {
                    cartCount.classList.add('animate-bounce');
                    setTimeout(() => cartCount.classList.remove('animate-bounce'), 1000);
                }
            }
        } catch (error) {
            console.error("Error actualizando contador:", error);
            const cartCount = document.getElementById('cart-count');
            if (cartCount) cartCount.textContent = '0';
        }
    }


    // ==================== EVENT LISTENERS Y UTILIDADES ====================


    // Configurar event listeners
    function setupEventListeners() {
        // Botón de compra principal
        document.getElementById('buy-btn')?.addEventListener('click', async function(e) {
            const button = e.currentTarget;
            const producto = {
                id: button.getAttribute('data-id'),
                nombre: button.getAttribute('data-name'),
                precio: parseFloat(button.getAttribute('data-price')),
                sku: button.getAttribute('data-sku'),
                imagen: [button.getAttribute('data-img')],
                cantidad: 1
            };
            await addToCart(producto);
        });


        // Acordeones de información
        document.querySelectorAll('.btn-desplegar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const content = e.target.nextElementSibling;
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            });
        });


        // Menú hamburguesa
        const hamburgerBtn = document.getElementById('hamburgerBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuContainer = document.getElementById('menuContainer');


        hamburgerBtn?.addEventListener('click', () => {
            menuContainer.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });


        menuOverlay?.addEventListener('click', () => {
            menuContainer.classList.remove('active');
            menuOverlay.classList.remove('active');
        });


        // Buscador
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                document.querySelectorAll('.product-card').forEach(card => {
                    const name = card.querySelector('.product-name').textContent.toLowerCase();
                    card.style.display = name.includes(searchTerm) ? 'block' : 'none';
                });
            });
        }
    }


    // Animación del icono del carrito
    function animateCartIcon() {
        const cartIcon = document.querySelector('.cart-icon-container');
        if (cartIcon) {
            cartIcon.classList.add('animate-pulse');
            setTimeout(() => cartIcon.classList.remove('animate-pulse'), 1000);
        }
    }


    // Mostrar mensaje de éxito
    function showSuccess(message) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 2000
        });
    }


    // Mostrar mensaje de error
    function showError(message) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: message
        });
    }


        }
      });
 