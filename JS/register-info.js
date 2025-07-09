// register-info.js

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('infoForm');
  const resetBtn = document.getElementById('resetBtn');

  // Reiniciar formulario
  resetBtn.addEventListener('click', () => form.reset());

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Construir payload JSON
    const payload = {
      nombre:        form.nombre.value.trim(),
      apellidoP:     form.apellidoP.value.trim(),
      apellidoM:     form.apellidoM.value.trim(),
      calle:         form.calle.value.trim(),
      municipio:     form.municipio.value.trim(),
      codigoPostal:  form.codigoPostal.value.trim(),
      estado:        form.estado.value.trim(),
      pais:          form.pais.value.trim()
    };

    try {
      const resp = await fetch('/api/users/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) throw new Error('No se pudo guardar la información');

      await Swal.fire({
        title: '¡Información guardada!',
        icon: 'success',
        confirmButtonText: 'Continuar'
      });
      // redirige, por ejemplo:
      window.location.href = '/dashboard';
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  });
});
