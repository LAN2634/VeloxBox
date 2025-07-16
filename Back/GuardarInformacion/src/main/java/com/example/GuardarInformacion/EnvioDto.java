package com.example.GuardarInformacion;

public class EnvioDto {
    private Long   id;
    private String nombre;
    private String apellidoPaterno;
    private String apellidoMaterno;
    private String calle;
    private String numero;
    private String codigoPostal;
    private String ciudad;
    private String estado;
    private String pais;

    public EnvioDto() {}

    public EnvioDto(Long id,
                    String nombre,
                    String apellidoPaterno,
                    String apellidoMaterno,
                    String calle,
                    String numero,
                    String codigoPostal,
                    String ciudad,
                    String estado,
                    String pais) {
        this.id = id;
        this.nombre = nombre;
        this.apellidoPaterno = apellidoPaterno;
        this.apellidoMaterno = apellidoMaterno;
        this.calle = calle;
        this.numero = numero;
        this.codigoPostal = codigoPostal;
        this.ciudad = ciudad;
        this.estado = estado;
        this.pais = pais;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getApellidoPaterno() { return apellidoPaterno; }
    public void setApellidoPaterno(String apellidoPaterno) { this.apellidoPaterno = apellidoPaterno; }

    public String getApellidoMaterno() { return apellidoMaterno; }
    public void setApellidoMaterno(String apellidoMaterno) { this.apellidoMaterno = apellidoMaterno; }

    public String getCalle() { return calle; }
    public void setCalle(String calle) { this.calle = calle; }

    public String getNumero() { return numero; }
    public void setNumero(String numero) { this.numero = numero; }

    public String getCodigoPostal() { return codigoPostal; }
    public void setCodigoPostal(String codigoPostal) { this.codigoPostal = codigoPostal; }

    public String getCiudad() { return ciudad; }
    public void setCiudad(String ciudad) { this.ciudad = ciudad; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getPais() { return pais; }
    public void setPais(String pais) { this.pais = pais; }
}
