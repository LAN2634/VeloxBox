package com.Horizon.AnadirProductos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
//==================================================================================================

    @RestController
    @RequestMapping("/api/carrito")
    public class CarritoController {
//==================================================================================================
    @Autowired
    private CarritoRepository carritoRepository;

//==================================================================================================
@PostMapping("/agregar")
public ResponseEntity<?> agregarProducto(@RequestBody Producto producto) {
    try {
        // 1. Obtener stock actual desde el microservicio productos
        String url = "http://localhost:8080/api/Productos/" + producto.getId() + "/stock";
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> respuestaStock = restTemplate.getForObject(url, Map.class);

        if (respuestaStock == null || !respuestaStock.containsKey("stock")) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("No se pudo obtener el stock del producto.");
        }

        int stockDisponible = (int) respuestaStock.get("stock");

        // 2. Buscar si ya está en el carrito
        Optional<Producto> productoExistenteOpt = carritoRepository.findBySkuAndUsername(producto.getSku(), producto.getUsername());


        int nuevaCantidad = producto.getCantidad() != null ? producto.getCantidad() : 1;

        if (productoExistenteOpt.isPresent()) {
            Producto productoExistente = productoExistenteOpt.get();
            int cantidadActual = productoExistente.getCantidad();
            int total = cantidadActual + nuevaCantidad;

            if (total > stockDisponible) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No se puede agregar más del stock disponible. Stock actual: " + stockDisponible);
            }

            productoExistente.setCantidad(total);
            Producto actualizado = carritoRepository.save(productoExistente);
            return ResponseEntity.ok(actualizado);
        } else {
            // Validar si la cantidad solicitada excede el stock
            if (nuevaCantidad > stockDisponible) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No se puede agregar más del stock disponible. Stock actual: " + stockDisponible);
            }

            producto.setId(null); // Para que se genere nuevo
            producto.setCantidad(nuevaCantidad);
            Producto guardado = carritoRepository.save(producto);
            return ResponseEntity.ok(guardado);
        }

    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al agregar producto: " + e.getMessage());
    }
}

//==========================================================================================================
    //Aumentar o Disminuir cantidad del producto

    @PutMapping("/incrementar/{id}")
    public ResponseEntity<?> incrementarCantidad(@PathVariable Long id) {
        Optional<Producto> productoOpt = carritoRepository.findById(id);
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setCantidad(producto.getCantidad() + 1);
            carritoRepository.save(producto);
            return ResponseEntity.ok(producto);
        }
        return ResponseEntity.notFound().build();
    }
//=============================================================================================================
    @PutMapping("/disminuir/{id}")
    public ResponseEntity<?> disminuirCantidad(@PathVariable Long id) {
        Optional<Producto> productoOpt = carritoRepository.findById(id);
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            if (producto.getCantidad() > 1) {
                producto.setCantidad(producto.getCantidad() - 1);
                carritoRepository.save(producto);
                return ResponseEntity.ok(producto);
            } else {
                carritoRepository.delete(producto);
                return ResponseEntity.ok(Map.of("deleted", true));
            }
        }
        return ResponseEntity.notFound().build();
    }
//=============================================================================================================
    @GetMapping
    public ResponseEntity<?> listarCarrito() {
        return ResponseEntity.ok(carritoRepository.findAll());
    }
        @GetMapping("/cantidad")
        public ResponseEntity<Long> getCantidadProductos() {
            long cantidad = carritoRepository.count();
            return ResponseEntity.ok(cantidad);
        }
//=================================================================================================================

        @GetMapping("/items") // <- Añade este nuevo endpoint
        public ResponseEntity<List<Producto>> obtenerItems() {
            List<Producto> items = carritoRepository.findAll();
            return ResponseEntity.ok(items);
        }
//==================================================================================================================
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
//==================================================================================================================
// Obtener un producto del carrito por su ID
@GetMapping("/{id}")
public ResponseEntity<Producto> obtenerProductoCarrito(@PathVariable Long id) {
    Optional<Producto> productoOpt = carritoRepository.findById(id);
    return productoOpt.map(ResponseEntity::ok)
            .orElseGet(() -> ResponseEntity.notFound().build());
}
//===============================================================================
@DeleteMapping("/eliminar-todo/{username}")
public ResponseEntity<Void> eliminarProductosPorUsuario(@PathVariable String username) {
    carritoRepository.deleteByUsername(username);
    return ResponseEntity.ok().build();
}
//=============================================


}
