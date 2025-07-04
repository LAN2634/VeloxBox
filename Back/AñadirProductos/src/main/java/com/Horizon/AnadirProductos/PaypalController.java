package com.Horizon.AnadirProductos;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.Base64;
import java.util.Map;

@RestController
@RequestMapping("/api/paypal")
public class PaypalController {

    @Value("${paypal.client.id}")
    private String clientId;

    @Value("${paypal.client.secret}")
    private String clientSecret;

    @Value("${paypal.api.base}")
    private String paypalApiBase;

    private final RestTemplate restTemplate = new RestTemplate();

    // Endpoint 1: Crear orden
    @PostMapping("/create-order")
    public ResponseEntity<?> createOrder(@RequestBody Map<String, Object> request) {
        try {
            String accessToken = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            String amount = request.get("amount").toString();
            String currency = request.getOrDefault("currency", "MXN").toString();

            String body = String.format("""
                {
                  "intent": "CAPTURE",
                  "purchase_units": [
                    {
                      "amount": {
                        "currency_code": "%s",
                        "value": "%s"
                      }
                    }
                  ],
                  "application_context": {
                    "return_url": "http://localhost:9090/api/paypal/capture-success",
                    "cancel_url": "http://localhost:9090/api/paypal/cancel"
                  }
                }
                """, currency, amount);

            HttpEntity<String> entity = new HttpEntity<>(body, headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    paypalApiBase + "/v2/checkout/orders",
                    entity,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            String orderId = responseBody.get("id").toString();

            return ResponseEntity.ok(Map.of("id", orderId));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to create order",
                    "details", e.getMessage()
            ));
        }
    }

    // Endpoint 2: Capturar orden
    @PostMapping("/capture-order/{orderId}")
    public ResponseEntity<?> captureOrder(@PathVariable String orderId) {
        try {
            String accessToken = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<String> entity = new HttpEntity<>("", headers);

            ResponseEntity<Map> response = restTemplate.postForEntity(
                    paypalApiBase + "/v2/checkout/orders/" + orderId + "/capture",
                    entity,
                    Map.class
            );

            return ResponseEntity.ok(response.getBody());

        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to capture order",
                    "details", e.getMessage()
            ));
        }
    }

    // Endpoint 3: Captura automática después de aprobación
    @GetMapping("/capture-success")
    public ResponseEntity<?> captureSuccess(@RequestParam("token") String orderId) {
        try {
            return captureOrder(orderId);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "error", "Failed to capture order after approval",
                    "details", e.getMessage()
            ));
        }
    }

    // Método privado para obtener el token de acceso
    private String getAccessToken() {
        String credentials = clientId + ":" + clientSecret;
        String encodedCredentials = Base64.getEncoder().encodeToString(credentials.getBytes());

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Basic " + encodedCredentials);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "client_credentials");

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                paypalApiBase + "/v1/oauth2/token",
                request,
                Map.class
        );

        return response.getBody().get("access_token").toString();
    }
}
