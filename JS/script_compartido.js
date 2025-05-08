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

 // Funciones para el carrito (básicas)
 const cartToggle = document.getElementById('cart-toggle');
 const cartCount = document.getElementById('cart-count');
 
 // Inicializar contador del carrito
 updateCartCount(0);
 
 function updateCartCount(count) {
   cartCount.textContent = count > 0 ? count : '0';
 }
 
 // Ejemplo de cómo agregar al carrito
 function addToCart() {
   // Lógica para agregar productos al carrito
   const currentCount = parseInt(cartCount.textContent || '0');
   updateCartCount(currentCount + 1);
 }
 // Forzar scroll al inicio al cargar la página
 window.onload = function () {
     window.scrollTo(0, 0);
 };

 //y aqui empezamos con hacer la informacion despegable
 document.querySelectorAll('.btn-desplegar').forEach(btn => {
     btn.addEventListener('click', () => {
       const content = btn.nextElementSibling;
       content.style.display = content.style.display === 'block' ? 'none' : 'block';
     });
   });
   
   const botonesTalla = document.querySelectorAll('.talla');
 
   botonesTalla.forEach(boton => {
     boton.addEventListener('click', () => {
       // Quitar clase activa de todos los botones
       botonesTalla.forEach(btn => btn.classList.remove('activa'));
       
       // Agregar clase activa al botón clickeado
       boton.classList.add('activa');
     });
   });
   