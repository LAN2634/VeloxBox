//para abrir y cerrar ventanas
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