//para abrir y cerrar ventanas
function openVentana(id) {
          document.querySelectorAll('.modal-link').forEach(link => {
          link.addEventListener('click', function(e) {
            e.preventDefault(); // Esto evita que la página se desplace
            const modalId = this.getAttribute('href');
            const modal = document.querySelector(modalId);
            if (modal) {
              modal.style.display = 'block';
            }
          });
        });
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
      