package com.Horizon.MCS;

import jakarta.persistence.*;

@Entity
@Table(name ="Producto")
public class Formulario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio")
    private double precio;

    @Column(name = "stock")
    private int stock;

    @Lob
    @Column(name = "imagen")
    private String[] imagen;

    @Column(name = "materiales")
    private String materiales;

    @Column(name = "tamanio")
    private String tamanio;

    @Column(name = "color")
    private String color;

    @Column(name= "sku")
    private String sku;

    @Column(name="pagodevolucion")
    private String pagodevolucion;

    @Column(name="cuidados")
    private String cuidados;


    //----Setters y Getters------


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public double getPrecio() {
        return precio;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String [] getImagen() { return imagen;
    }

    public void setImagen(String [] imagen) { this.imagen = imagen;
    }

    public String getMateriales() {
        return materiales;
    }

    public void setMateriales(String materiales) {
        this.materiales = materiales;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getTamanio() {
        return tamanio;
    }

    public void setTamanio(String tamanio) {
        this.tamanio = tamanio;
    }

    public String getSku() {
        return sku;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public String getCuidados() {
        return cuidados;
    }

    public void setCuidados(String cuidados) {
        this.cuidados = cuidados;
    }

    public String getPagodevolucion() {
        return pagodevolucion;
    }

    public void setPagodevolucion(String pagodevolucion) {
        this.pagodevolucion = pagodevolucion;
    }
}

