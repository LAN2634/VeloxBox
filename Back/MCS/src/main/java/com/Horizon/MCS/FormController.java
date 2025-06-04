package com.Horizon.MCS;

import java.util.List;
import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Productos")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class FormController {

    @Autowired
    private FormRepository FormRepository;

    @Autowired
    private FormularioService formularioService;

    // Obtener todos los productos
    @GetMapping
    public List<Formulario> getAllProductos() {
        return FormRepository.findAll();
    }

    // Obtener un producto por Id
    @GetMapping("/{id}")
    public ResponseEntity<Formulario> getProductoById(@PathVariable Long id) {
        Optional<Formulario> producto = FormRepository.findById(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Filtrar productos por categoría
    @GetMapping("/filtrar")
    public ResponseEntity<List<Formulario>> filtrarProductosPorCategoria(
            @RequestParam String categoria) {
        List<Formulario> productos = FormRepository.findByCategoria(categoria);
        return ResponseEntity.ok(productos);
    }

    // Crear un nuevo producto
    @PostMapping
    public Formulario createProducto(@RequestBody Formulario producto) {
        return formularioService.guardarFormulario(producto);
    }

    // Actualizar un producto existente
    @PutMapping("/{id}")
    public ResponseEntity<Formulario> updateProducto(@PathVariable Long id, @RequestBody Formulario productoDetails) {
        return FormRepository.findById(id).map(producto -> {
            producto.setNombre(productoDetails.getNombre());
            producto.setDescripcion(productoDetails.getDescripcion());
            producto.setPrecio(productoDetails.getPrecio());
            producto.setStock(productoDetails.getStock());
            producto.setMateriales(productoDetails.getMateriales());
            producto.setTamanio(productoDetails.getTamanio());
            producto.setColor(productoDetails.getColor());
            producto.setCuidados(productoDetails.getCuidados());
            producto.setPagodevolucion(productoDetails.getPagodevolucion());
            producto.setImagen(productoDetails.getImagen());
            Formulario updatedProducto = FormRepository.save(producto);
            return ResponseEntity.ok(updatedProducto);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        return FormRepository.findById(id)
                .<ResponseEntity<Void>>map(producto -> {
                    FormRepository.delete(producto);
                    return ResponseEntity.noContent().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Obtener stock de un producto
    @GetMapping("/{id}/stock")
    public ResponseEntity<Map<String, Object>> getProductStock(@PathVariable Long id) {
        Optional<Formulario> productoOpt = FormRepository.findById(id);

        if (!productoOpt.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Formulario producto = productoOpt.get();
        Map<String, Object> response = new HashMap<>();
        response.put("stock", producto.getStock());
        response.put("id", producto.getId());
        response.put("nombre", producto.getNombre());

        return ResponseEntity.ok(response);
    }


}
