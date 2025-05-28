package com.Horizon.AnadirProductos;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

    @CrossOrigin(origins = "*")
    @RestController
    @RequestMapping("/api/carrito")
    public class CarritoController {

    @Autowired
    private CarritoRepository carritoRepository;

    @PostMapping("/agregar")
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
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


    }
