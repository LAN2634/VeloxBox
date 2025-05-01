window.onload = function () {
    document.querySelector(".loader").classList.add("hidden");
};

document.getElementById('recoveryForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío predeterminado
    const email = document.getElementById('email').value; // Obtener valor del correo

    if (email) {
        alert(`Se ha enviado un enlace de recuperación a: ${email}`);
        // Aquí puedes agregar la lógica para enviar el correo de recuperación
    } else {
        alert("Por favor, ingresa un correo electrónico válido.");
    }
});