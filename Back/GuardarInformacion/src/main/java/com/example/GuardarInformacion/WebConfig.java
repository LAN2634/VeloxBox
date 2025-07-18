package com.example.GuardarInformacion;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")               // aplica a todas las rutas
                .allowedOrigins("*")             // o cambia "*" por tu origen (p.ej. http://localhost:5500)
                .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                .allowCredentials(false);
    }
}
