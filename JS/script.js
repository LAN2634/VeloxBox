// Funcionalidad común
document.querySelectorAll('.back-button').forEach(btn => {
  btn.addEventListener('click', () => window.history.back());
});

// Funcionalidad para productos.html
if (document.querySelector('.productos-container')) {
    document.addEventListener('DOMContentLoaded', () => {
        const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];
        // Cargar productos desde localStorage y renderizar
        const renderProducts = (products) => {
            const tbody = document.getElementById('productosList');
            tbody.innerHTML = products.map(product => `
                <tr data-id="${product.id}">
                    <td><input type="checkbox" class="product-checkbox"></td>
                    <td>
                    <img src="${product.miniatura}" class="miniatura-tabla">
                    ${product.title}
                    </td>
                    <td><span class="estado estado-${product.status}" style="cursor:pointer;">${product.status}</span></td>
                    <td>${product.inventory}</td>
                    <td>${product.category}</td>
                </tr>
            `).join('');

            // Cambiar estado al hacer clic en el estado
            tbody.querySelectorAll('.estado').forEach(span => {
                span.addEventListener('click', () => {
                    const row = span.closest('tr');
                    const id = parseInt(row.dataset.id);
                    const products = loadProducts();

                    const index = products.findIndex(p => p.id === id);
                    if (index !== -1) {
                        const currentStatus = products[index].status;
                        products[index].status = currentStatus === 'Activo' ? 'Pausa' : 'Activo';

                        localStorage.setItem('products', JSON.stringify(products));
                        renderProducts(products);
                        console.log("Si se pudo cambiar el estado")
                    }
                });
            });

            // Actualizar funcionalidad del checkbox de "Seleccionar todos"
            const selectAllCheckbox = document.getElementById('selectAll');
            const productCheckboxes = document.querySelectorAll('.product-checkbox');
            selectAllCheckbox.addEventListener('change', () => {
                productCheckboxes.forEach(cb => cb.checked = selectAllCheckbox.checked);
            });
        };

        // Filtros
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;
                const products = loadProducts();
                const filtered = filter === 'todos' ? products : products.filter(p => p.status === filter);
                renderProducts(filtered);
            });
        });

        // Carga inicial
        renderProducts(loadProducts());

        // Botón añadir producto
        document.getElementById('addProductBtn').addEventListener('click', () => {
            window.location.href = 'Formulario_Agregar_Productos.html';

        });

                
        // Crear botón Eliminar
        const deleteBtn = document.getElementById('deleteProductBtn');
        deleteBtn.disabled = true; // Deshabilitar inicialmente
        // Función para actualizar el botón Eliminar
        function updateDeleteBtn() {
            const anyChecked = !!document.querySelector('.product-checkbox:checked');
            deleteBtn.disabled = !anyChecked;
            deleteBtn.style.backgroundColor = anyChecked ? 'red' : '#ccc';
            deleteBtn.style.cursor = anyChecked ? 'pointer' : 'not-allowed';
        }

        // Eventos para checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.id === 'selectAll') {
                document.querySelectorAll('.product-checkbox').forEach(cb => cb.checked = e.target.checked);
                updateDeleteBtn();
            }
            if (e.target.classList.contains('product-checkbox')) {
                updateDeleteBtn();
            }
        });

        // Eliminar productos seleccionados
        deleteBtn.addEventListener('click', () => {
            if (!deleteBtn.disabled) {
              Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esto eliminará los productos seleccionados. Esta acción no se puede deshacer.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  const products = loadProducts();
                  const remaining = products.filter(p => {
                    const row = document.querySelector(`tr[data-id="${p.id}"]`);
                    return !row.querySelector('.product-checkbox').checked;
                  });
                  localStorage.setItem('products', JSON.stringify(remaining));
                  renderProducts(remaining);
                  document.getElementById('selectAll').checked = false;
                  updateDeleteBtn();
          
                  Swal.fire({
                    title: '¡Eliminado!',
                    text: 'Los productos fueron eliminados correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6'
                  });
                }
              });
            }
          });
          

            });
        }

// Funcionalidad para agregarProductos.html

if (document.getElementById('productForm')) {
  document.addEventListener('DOMContentLoaded', () => {
      // Editor Quill
      const quill = new Quill('#editor', {
          theme: 'snow',
          modules: { toolbar: true }
      });
// Funcionalidad para agregarProductos.html
if (document.getElementById('cancelBtn')) {
    document.getElementById('cancelBtn').addEventListener('click', () => {
        window.location.href = 'Tabla_productos_agregados.html';  // Regresa a productos.html
    });
  }
  

      // Manejo de archivos
      const fileInput = document.getElementById('fileInput');
      const previewArea = document.getElementById('previewArea');
      let files = [];
      
      document.getElementById('uploadBtn').addEventListener('click', () => fileInput.click());
      
      fileInput.addEventListener('change', (e) => {
          files = Array.from(e.target.files);
          previewArea.innerHTML = '';
          files.forEach(file => {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const element = file.type.startsWith('image') 
                      ? `<img src="${e.target.result}">` 
                      : `<video controls src="${e.target.result}"></video>`;
                  previewArea.innerHTML += element;
              };
              reader.readAsDataURL(file);
          });
      });

      //Reiniciar los archivos
        document.getElementById('resetBtn').addEventListener('click', () => {
            files = [];
            previewArea.innerHTML = '';
            fileInput.value = '';
        });
        
        // Manejo de archivos en miniatura
      const fileInputMiniatura = document.getElementById('fileInputMiniatura');
      const previewMiniatura = document.getElementById('previewMiniatura');
      let filesMiniatura = [];
      
      document.getElementById('uploadBtnMiniatura').addEventListener('click', () => fileInputMiniatura.click());
      
      fileInputMiniatura.addEventListener('change', (e) => {
          filesMiniatura = Array.from(e.target.files);
          previewMiniatura.innerHTML = '';
          filesMiniatura.forEach(file => {
              const reader = new FileReader();
              reader.onload = (e) => {
                  const element = file.type.startsWith('image') 
                      ? `<img src="${e.target.result}">` 
                      : `<video controls src="${e.target.result}"></video>`;
                  previewMiniatura.innerHTML += element;
              };
              reader.readAsDataURL(file);
              console.log("si se subio la miniatura")
          });
      });

      //Reiniciar los archivos
        document.getElementById('resetBtnMiniatura').addEventListener('click', () => {
            filesMiniatura = [];
            previewMiniatura.innerHTML = '';
            fileInputMiniatura.value = '';
        });
        



      // Manejo de categorías
      let categories = JSON.parse(localStorage.getItem('categories')) || [];
      const updateCategories = () => {
          const categorySelect = document.getElementById('category');
          const deleteSelect = document.getElementById('deleteCategory');
          
          categorySelect.innerHTML = '<option value="">Selecciona una categoría</option>';
          deleteSelect.innerHTML = '<option value="">Selecciona para eliminar</option>';
          
          categories.forEach(cat => {
              categorySelect.innerHTML += `<option value="${cat}">${cat}</option>`;
              deleteSelect.innerHTML += `<option value="${cat}">${cat}</option>`;
          });
      };
      
      document.getElementById('addCategoryBtn').addEventListener('click', () => {
          const newCat = document.getElementById('newCategory').value.trim();
          if (newCat && !categories.includes(newCat)) {
              categories.push(newCat);
              localStorage.setItem('categories', JSON.stringify(categories));
              updateCategories();
              document.getElementById('newCategory').value = '';
          }
      });

      document.getElementById('deleteCategoryBtn').addEventListener('click', () => {
          const selected = document.getElementById('deleteCategory').value;
          if (selected) {
              categories = categories.filter(cat => cat !== selected);
              localStorage.setItem('categories', JSON.stringify(categories));
              updateCategories();
          }
      });

      // Calculadora de descuento
      function actualizarPrecioConDescuento() {
        const price = parseFloat(document.getElementById('price').value) || 0;
        const discount = parseFloat(document.getElementById('discount').value) || 0;
        const precioFinal = price - (price * discount / 100);
        document.getElementById('priceDiscount').value = precioFinal.toFixed(2);
    }
    
    document.getElementById('price').addEventListener('input', actualizarPrecioConDescuento);
    document.getElementById('discount').addEventListener('input', actualizarPrecioConDescuento);
    

      // Envío de formulario
      document.getElementById('productForm').addEventListener('submit', (e) => {
        e.preventDefault();
      
        let isValid = true;
      
        // Limpiar errores previos
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
      
        // Validaciones personalizadas
        const title = document.getElementById('title');
        const price = document.getElementById('price');
        const inventory = document.getElementById('inventory');
        const category = document.getElementById('category');
        const size = document.getElementById('size');
        const color = document.getElementById('color');
        const files = document.getElementById('fileInput').files;
        const description = quill.getText().trim();
        const materiales = document.getElementById('materiales');
        const cuidados = document.getElementById('cuidados');
        const entrega = document.getElementById('entrega');
        
        
        if (!title.value.trim()) {
          document.getElementById('error-title').textContent = 'El título es requerido';
          isValid = false;
        }
      
        if (!materiales.value.trim()) {
          document.getElementById('error-materiales').textContent = 'Los materiales son requeridos';
          isValid = false;
        }


        if (!cuidados.value.trim()) {
          document.getElementById('error-cuidados').textContent = 'La guía de cuidados es requerida';
          isValid = false;
        }

         if (!entrega.value.trim()) {
          document.getElementById('error-entrega').textContent = 'La información de entrega, pago y devolución es requerida';
          isValid = false;
        }       

        if (description.length < 10) {
          document.getElementById('error-description').textContent = 'La descripción debe tener al menos 10 caracteres';
          isValid = false;
        }
      
        if (files.length === 0) {
          document.getElementById('error-media').textContent = 'Debes subir al menos un archivo';
          isValid = false;
        }
      
        if (!category.value) {
          document.getElementById('error-category').textContent = 'Selecciona una categoría';
          isValid = false;
        }
      
        if (!price.value || parseFloat(price.value) <= 0) {
          document.getElementById('error-price').textContent = 'El precio debe ser mayor a 0';
          isValid = false;
        }
      
        if (inventory.value === '' || parseInt(inventory.value) < 0) {
          document.getElementById('error-inventory').textContent = 'El inventario no puede ser negativo';
          isValid = false;
        }
      
        if (!size.value.trim()) {
          document.getElementById('error-size').textContent = 'Las tallas son requeridas';
          isValid = false;
        }
      
        if (!color.value.trim()) {
          document.getElementById('error-color').textContent = 'El color es requerido';
          isValid = false;
        }
      
        if (!isValid) {
          Swal.fire({
            title: 'Error',
            text: 'Por favor corrige los errores antes de continuar.',
            icon: 'error',
            confirmButtonColor: '#e74c3c'
          });
          return;
        }
      
        // Si todo es válido, continuar y guardar
        const newProduct = {
          id: Date.now(),
          title: title.value,
          description: quill.root.innerHTML,
          price: parseFloat(price.value),
          inventory: parseInt(inventory.value),
          category: category.value,
          status: 'Activo',
          media: Array.from(files).map(file => URL.createObjectURL(file)),
          miniatura: filesMiniatura.length > 0 ? URL.createObjectURL(filesMiniatura[0]) : '',
          size: size.value,
          color: color.value
        };
        console.log("Miniatura guardada:", newProduct.miniatura);
        console.log("Archivos guardados:", newProduct.media);
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
      
        Swal.fire({
          icon: 'success',
          title: 'Producto guardado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => window.location.href = 'Tabla_productos_agregados.html');
      });
      


      // Inicializar categorías
      updateCategories();
  });
}