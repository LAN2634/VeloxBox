package com.Horizon.AnadirProductos;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

import java.nio.charset.StandardCharsets;
import java.security.Key;

public class JwtInterceptor implements HandlerInterceptor {

    // Asegúrate de que esta clave sea la misma que usaste para firmar en el microservicio 8080
    private final String SECRET_KEY = "miClaveSuperSecretaMuyLargaQueDebeSerIgualEnAmbosMicroservicios1234567890";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token JWT no proporcionado");
            return false;
        }

        String token = authHeader.substring(7);

        if (!validarToken(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Token JWT inválido");
            return false;
        }

        return true;
    }

    private boolean validarToken(String token) {
        try {
            Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

            // Validar firma y obtener claims
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            // Opcional: loguear usuario extraído del token
            System.out.println("✅ Usuario autenticado: " + claims.getSubject());

            return true;
        } catch (Exception e) {
            System.out.println("❌ Token inválido: " + e.getMessage());
            return false;
        }
    }
}
