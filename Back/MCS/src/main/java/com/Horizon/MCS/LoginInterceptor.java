package com.Horizon.MCS;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;

public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // Cambié "usuario" por "usuarioLogueado" para que coincida con tu controlador
        Object usuario = request.getSession().getAttribute("usuarioLogueado");
        if (usuario == null) {
            response.sendRedirect("/Logeo.html");
            return false;
        }
        return true;
    }
}
