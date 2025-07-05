package com.Horizon.MCS;

import jakarta.persistence.*;
        import java.time.LocalDateTime;

@Entity
@Table(name = "Pedidos")
public class Pedidos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sku", nullable = false, length = 50)
    private String sku;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    /*@Lob
    @Column(name = "imagen")
    private String [] imagen;*/

    @Column(name = "cantidad", nullable = false)
    private int cantidad;

    @Column(name = "precio_unitario", nullable = false)
    private double precioUnitario;

    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Column(name = "fecha_pedido", columnDefinition = "DATETIME")
    private LocalDateTime fechaPedido;

    @Column(name = "total", nullable = false)
    private double total;

    @Column(name = "order_id")
    private String orderId;

    // ===== Getters y Setters =====

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSku() { return sku; }
    public void setSku(String sku) { this.sku = sku; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

   /* public String[] getImagen() { return imagen; }
    public void setImagen(String[] imagen) { this.imagen = imagen; }*/

    public int getCantidad() { return cantidad; }
    public void setCantidad(int cantidad) { this.cantidad = cantidad; }

    public double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(double precioUnitario) { this.precioUnitario = precioUnitario; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public LocalDateTime getFechaPedido() { return fechaPedido; }
    public void setFechaPedido(LocalDateTime fechaPedido) { this.fechaPedido = fechaPedido; }

    public double getTotal() { return total; }
    public void setTotal(double total) { this.total = total; }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
}
