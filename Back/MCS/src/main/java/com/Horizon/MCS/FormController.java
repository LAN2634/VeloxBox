package com.Horizon.MCS;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/Productos")
@CrossOrigin(origins = "*") // Permite solicitudes CORS desde cualquier origen
public class FormController {

    @Autowired
    private FormRepository productoRepository;

    // Obtener todos los productos
    @GetMapping
    public List<Formulario> getAllProductos() {
        return productoRepository.findAll();
    }

    // Obtener un producto por Id
    @GetMapping("/{id}")
    public ResponseEntity<Formulario> getProductoById(@PathVariable Long id) {
        Optional<Formulario> producto = productoRepository.findById(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/filtrar")
    public ResponseEntity<List<Formulario>> filtrarProductosPorCategoria(
            @RequestParam String categoria) {

        List<Formulario> productos = productoRepository.findByCategoria(categoria);
        return ResponseEntity.ok(productos);
    }

    // Crear un nuevo producto
    @PostMapping
    public Formulario createProducto(@RequestBody Formulario producto) {
        return productoRepository.save(producto);
    }
    // Actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Formulario> updateProducto(@PathVariable Long id, @RequestBody Formulario productoDetails) {
        return productoRepository.findById(id).map(producto -> {
            producto.setNombre(productoDetails.getNombre());
            producto.setCategoria(productoDetails.getCategoria());
            producto.setDescripcion(productoDetails.getDescripcion());
            producto.setPrecio(productoDetails.getPrecio());
            producto.setImagen(productoDetails.getImagen());
            producto.setStock(productoDetails.getStock());
            Formulario updatedProducto = productoRepository.save(producto);
            return ResponseEntity.ok(updatedProducto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        return productoRepository.findById(id)
                .<ResponseEntity<Void>>map(producto -> {  // <-- Especifica el tipo aquí
                    productoRepository.delete(producto);
                    return ResponseEntity.noContent().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

}
