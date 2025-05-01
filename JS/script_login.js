
window.onload = function () {
    document.querySelector(".loader").classList.add("hidden");
};
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Inicio de sesión exitoso');
    window.location.href = 'index.html';
});
document.getElementById('registroLink').addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'registro.html';
});