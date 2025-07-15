package com.Horizon.MCS;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

        @Override
        public void addInterceptors(InterceptorRegistry registry) {
            registry.addInterceptor(new JwtInterceptor())
                    .addPathPatterns("/productos/**", "/pedidos/**", "/guardar", "/descontar-stock")
                    .excludePathPatterns("/usuarios/loginu", "/usuarios/registrar", "/css/**", "/js/**", "/img/**");
        }
    }



