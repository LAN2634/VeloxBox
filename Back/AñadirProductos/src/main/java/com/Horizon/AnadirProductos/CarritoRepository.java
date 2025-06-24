package com.Horizon.AnadirProductos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CarritoRepository extends JpaRepository<Producto, Long> {
    Optional<Producto> findById(Long id);
    Optional<Producto> findBySku(String sku);

}
