// Forzar scroll al inicio al cargar la página
window.onload = function () {
    window.scrollTo(0, 0);
};
 // Activar menú hamburguesa
 //TODO ESTE ES PARA QUE SE DESPLEIGUE EL MENU HAMBURGUESA

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
      
    }
  });
