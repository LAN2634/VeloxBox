package com.Horizon.MCS;

import java.time.LocalDateTime;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/Productos")
@CrossOrigin("*")
public class FormController {

    @Autowired
    private FormRepository FormRepository;

    @Autowired
    private FormularioService formularioService;

    @Autowired
    private PedidoRepository pedidoRepository;

//===================================================================================================

    // Obtener todos los productos
    @GetMapping
    public List<Formulario> getAllProductos() {
        return FormRepository.findAll();
    }
    //=====================================================================================================
    // Obtener un producto por Id
    @GetMapping("/{id}")
    public ResponseEntity<Formulario> getProductoById(@PathVariable Long id) {
        Optional<Formulario> producto = FormRepository.findById(id);
        return producto.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    //=====================================================================================================
    // Filtrar productos por categoría
    @GetMapping("/filtrar")
    public ResponseEntity<List<Formulario>> filtrarProductosPorCategoria(
            @RequestParam String categoria) {
        List<Formulario> productos = FormRepository.findByCategoria(categoria);
        return ResponseEntity.ok(productos);
    }
    //=====================================================================================================
    // Crear un nuevo producto
    @PostMapping
    public Formulario createProducto(@RequestBody Formulario producto) {
        return formularioService.guardarFormulario(producto);
    }
    //=====================================================================================================
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
    //=====================================================================================================================
    // Eliminar un producto por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        return FormRepository.findById(id)
                .<ResponseEntity<Void>>map(producto -> {
                    FormRepository.delete(producto);
                    return ResponseEntity.noContent().build();
                }).orElseGet(() -> ResponseEntity.notFound().build());
    }
    //==============================================================================================================
    // Obtener el stock de un producto por ID
    @GetMapping("/{id}/stock")
    public ResponseEntity<Map<String, Object>> getStockById(@PathVariable Long id) {
        Optional<Formulario> producto = FormRepository.findById(id);
        if (producto.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", id);
            response.put("stock", producto.get().getStock());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    //==============================================================================================================
    @GetMapping("/stock")
    public ResponseEntity<Map<String, Integer>> obtenerStock(@RequestParam Long id) {
        Optional<Formulario> producto = FormRepository.findById(id);

        if (producto.isPresent()) {
            Map<String, Integer> response = new HashMap<>();
            response.put("stock", producto.get().getStock());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
//==================================================================================
@PostMapping("/descontar-stock")
public ResponseEntity<?> descontarStockPorSku(@RequestBody Formulario producto) {

    String sku = producto.getSku();
    int cantidad = producto.getStock(); // Interpretas stock como cantidad a descontar

    Optional<Formulario> existenteOpt = FormRepository.findBySku(sku);

    if (existenteOpt.isEmpty()) {
        return ResponseEntity.badRequest().body("Producto no encontrado");
    }

    Formulario existente = existenteOpt.get();

    if (existente.getStock() < cantidad) {
        return ResponseEntity.badRequest().body("Stock insuficiente");
    }

    existente.setStock(existente.getStock() - cantidad);
    FormRepository.save(existente);

    return ResponseEntity.ok("Stock actualizado correctamente");
}
//==============Guardar pedidos===============
@PostMapping("/guardar")
public ResponseEntity<?> guardarPedido(@RequestBody Pedidos pedido) {
    if (pedido.getCantidad() <= 0 || pedido.getTotal() <= 0) {
        return ResponseEntity.badRequest().body("Cantidad o total inválido");
    }

    pedido.setFechaPedido(LocalDateTime.now());
    pedidoRepository.save(pedido);

    return ResponseEntity.ok("Pedido guardado correctamente");
}
//=====================================================================
    //Obtener Pedidos
@GetMapping("/pedidos")
public ResponseEntity<List<Pedidos>> obtenerPedidos() {
    List<Pedidos> listaPedidos = pedidoRepository.findAll();
    return ResponseEntity.ok(listaPedidos);
}
//=========================================
//Obtener Pedidos filtrado por usuario
@GetMapping("/pedidos/usuario/{username}")
public List<Pedidos> obtenerPedidosPorUsuario(@PathVariable String username) {
    return pedidoRepository.findByUsername(username);
}
//=========================================================


}