package com.Horizon.MCS;

import org.hibernate.mapping.Formula;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface FormRepository extends JpaRepository<Formulario, Long> {
    List<Formulario> findByCategoria(String categoria);
    Optional<Formulario> findById(Long id);
    Optional<Formulario> findBySku(String sku);

}