// Funcionalidad común
document.querySelectorAll('.back-button').forEach(btn => {
  btn.addEventListener('click', () => window.history.back());
});

// Funcionalidad para productos.html
if (document.querySelector('.productos-container')) {
  document.addEventListener('DOMContentLoaded', () => {
      const loadProducts = () => JSON.parse(localStorage.getItem('products')) || [];
      const renderProducts = (products) => {
          const tbody = document.getElementById('productosList');
          tbody.innerHTML = products.map(product => `
              <tr>
                  <td><input type="checkbox"></td>
                  <td>${product.title}</td>
                  <td><span class="estado estado-${product.status}">${product.status}</span></td>
                  <td>${product.inventory}</td>
                  <td>${product.category}</td>
              </tr>
          `).join('');
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
          window.location.href = 'agregarProductos.html';
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
      document.getElementById('discount').addEventListener('input', (e) => {
          const price = parseFloat(document.getElementById('price').value) || 0;
          const discount = parseFloat(e.target.value) || 0;
          document.getElementById('priceDiscount').value = (price - (price * discount / 100)).toFixed(2);
      });

      // Envío de formulario
      document.getElementById('productForm').addEventListener('submit', (e) => {
          e.preventDefault();
          
          const newProduct = {
              id: Date.now(),
              title: document.getElementById('title').value,
              description: quill.root.innerHTML,
              price: parseFloat(document.getElementById('price').value),
              inventory: parseInt(document.getElementById('inventory').value),
              category: document.getElementById('category').value,
              status: 'activo',
              media: files.map(file => URL.createObjectURL(file))
          };

          // Validación
          let isValid = true;
          document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
          
          if (!newProduct.title) {
              document.getElementById('error-title').textContent = 'El título es requerido';
              isValid = false;
          }
          if (quill.getText().trim().length < 10) {
              document.getElementById('error-description').textContent = 'La descripción debe tener al menos 10 caracteres';
              isValid = false;
          }
          if (files.length === 0) {
              document.getElementById('error-media').textContent = 'Debes subir al menos un archivo';
              isValid = false;
          }

          if (isValid) {
              const products = JSON.parse(localStorage.getItem('products')) || [];
              products.push(newProduct);
              localStorage.setItem('products', JSON.stringify(products));

              Swal.fire({
                  icon: 'success',
                  title: 'Producto guardado!',
                  showConfirmButton: false,
                  timer: 1500
              }).then(() => window.location.href = 'productos.html');
          }
      });

      // Inicializar categorías
      updateCategories();
  });
}