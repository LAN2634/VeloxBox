window.onload = function () {
    document.querySelector(".loader").classList.add("hidden");
};
document.getElementById('registroForm').addEventListener('submit', function(event) {
    
    if (!document.getElementById('aceptoTerminos').checked) {
        alert('Debes aceptar los Términos y Condiciones para continuar.');
        event.preventDefault(); 
    }
});
document.getElementById('aceptoTerminos').addEventListener('change', function() {
    document.querySelector('button[type="submit"]').disabled = !this.checked;
});
