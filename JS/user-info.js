document.addEventListener('DOMContentLoaded', () => {
  const API_BASE   = 'http://localhost:8080/usuario/info';
  const form       = document.getElementById('userInfoForm');
  const editBtn    = document.getElementById('editButton');
  const cancelBtn  = document.getElementById('cancelButton');
  const saveBtn    = document.getElementById('saveButton');
  const backBtn    = document.getElementById('backButton');
  let   originalData = {};

  function toggleFields(enabled) {
    form.querySelectorAll('input').forEach(i => i.disabled = !enabled);
    cancelBtn.disabled = !enabled;
    saveBtn.disabled   = !enabled;
  }

  function loadData() {
    fetch(API_BASE)
      .then(response => {
        if (response.status === 204) {
          // No hay registro aún
          toggleFields(true);
          return {};
        } else if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Error ${response.status}`);
        }
      })
      .then(data => {
        originalData = data;
        // Poblamos el formulario con lo recibido (o lo dejamos vacío)
        Object.entries(data).forEach(([key, val]) => {
          if (form.elements[key] !== undefined) {
            form.elements[key].value = val;
          }
        });
        // Si vino un registro (tiene id), bloqueamos campos
        if (data.id) {
          toggleFields(false);
        }
      })
      .catch(err => {
        console.error('Error cargando info:', err);
        Swal.fire('Error', 'No se pudo cargar la información', 'error');
        toggleFields(true);
      });
  }

  function resetForm() {
    Object.entries(originalData).forEach(([key, val]) => {
      if (form.elements[key] !== undefined) {
        form.elements[key].value = val;
      }
    });
    toggleFields(false);
  }

  // Eventos de botones
  editBtn   .addEventListener('click', () => toggleFields(true));
  cancelBtn.addEventListener('click', resetForm);
  backBtn   .addEventListener('click', () => history.back());

  form.addEventListener('submit', e => {
    e.preventDefault();
    // Construimos payload con todos los campos y, si existe, su id
    const payload = Array.from(form.elements)
      .filter(el => el.name)
      .reduce((o, el) => {
        o[el.name] = el.value.trim();
        return o;
      }, {});

    if (originalData.id) {
      payload.id = originalData.id;
    }

    // Validación básica
    if (Object.values(payload).some(v => v === '')) {
      return Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
    }

    const method = originalData.id ? 'PUT' : 'POST';
    fetch(API_BASE, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(saved => {
        Swal.fire('Listo', 'Información guardada exitosamente', 'success');
        originalData = saved;
        toggleFields(false);
      })
      .catch(() => {
        Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
      });
  });

  // Inicio
  loadData();
});
