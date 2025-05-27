package com.Horizon.AnadirProductos;

import com.Horizon.AnadirProductos.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoRepository extends JpaRepository<Producto, Long> {
}
