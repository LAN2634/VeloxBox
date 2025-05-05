
// Forzar scroll al inicio al cargar la página
window.onload = function () {
    window.scrollTo(0, 0);
};

// También para navegación con caché (SPA)
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            window.scrollTo(0, 0);
        }
});
    window.onload = function () {
    document.querySelector(".loader-i").classList.add("hidden");
};
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
