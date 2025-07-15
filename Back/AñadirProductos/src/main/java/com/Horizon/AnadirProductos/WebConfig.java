package com.Horizon.AnadirProductos;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new JwtInterceptor())
                .addPathPatterns("/api/carrito/agregar", "/api/carrito/agregar/**", "/api/usuarios/**")
                .excludePathPatterns("/api/usuarios/login", "/api/usuarios/registrar");
    }
}

