package com.Horizon.AnadirProductos;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api/paypal")
public class PaypalController {

    private final PaypalService paypalService;

    public PaypalController(PaypalService paypalService) {
        this.paypalService = paypalService;
    }

    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> data) {
        Double total = Double.valueOf(data.get("total").toString());
        String moneda = data.getOrDefault("currency", "MXN").toString();  // Coincide con frontend
        return ResponseEntity.ok(paypalService.crearOrden(total, moneda));
    }

    @PostMapping("/capture-order")
    public ResponseEntity<?> captureOrder(@RequestBody Map<String, Object> data) {
        String orderId = data.get("orderID").toString();
        return ResponseEntity.ok(paypalService.capturarOrden(orderId));
    }
}
