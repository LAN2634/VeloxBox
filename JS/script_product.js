// Forzar scroll al inicio al cargar la página
window.onload = function () {
    window.scrollTo(0, 0);
};
 // Activar menú hamburguesa
 //TODO ESTE ES PARA QUE SE DESPLEIGUE EL MENU HAMBURGUESA
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

 //AQUI UA ACABO
