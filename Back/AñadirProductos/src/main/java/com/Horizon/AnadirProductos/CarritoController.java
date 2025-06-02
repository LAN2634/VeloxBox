package com.Horizon.AnadirProductos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
    @RestController
    @RequestMapping("/api/carrito")
    public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

        @PostMapping("/agregar")
        public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
            // Forzar id a null para evitar confusión
            producto.setId(null);

            Producto guardado = carritoRepository.save(producto);
            return ResponseEntity.ok(guardado);
        }


        @GetMapping
    public ResponseEntity<?> listarCarrito() {
        return ResponseEntity.ok(carritoRepository.findAll());
    }
        @GetMapping("/cantidad")
        public ResponseEntity<Long> getCantidadProductos() {
            long cantidad = carritoRepository.count();
            return ResponseEntity.ok(cantidad);
        }


        @GetMapping("/items") // <- Añade este nuevo endpoint
        public ResponseEntity<List<Producto>> obtenerItems() {
            List<Producto> items = carritoRepository.findAll();
            return ResponseEntity.ok(items);
        }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        try {
            // Verificar si el producto existe en el carrito
            Optional<Producto> productoExistente = carritoRepository.findById(id);

            if (productoExistente.isPresent()) {
                carritoRepository.deleteById(id);
                return ResponseEntity.ok().body(Map.of(
                        "success", true,
                        "message", "Producto eliminado del carrito"
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Error al eliminar el producto: " + e.getMessage()
            ));
        }
    }

    }
