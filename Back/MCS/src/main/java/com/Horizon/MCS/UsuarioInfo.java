
package com.Horizon.MCS;

import jakarta.persistence.*;

@Entity
@Table(name = "usuario_info")
public class UsuarioInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String firstName;

    @Column(name = "apellido_paterno")
    private String lastNamePaternal;

    @Column(name = "apellido_materno")
    private String lastNameMaternal;

    @Column(name = "calle")
    private String street;

    @Column(name = "numero")
    private String houseNumber;

    @Column(name = "codigo_postal")
    private String postalCode;

    @Column( name = "city")
    private String city;

    @Column(name  = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "username")
    private String username;

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastNamePaternal() { return lastNamePaternal; }
    public void setLastNamePaternal(String lastNamePaternal) { this.lastNamePaternal = lastNamePaternal; }

    public String getLastNameMaternal() { return lastNameMaternal; }
    public void setLastNameMaternal(String lastNameMaternal) { this.lastNameMaternal = lastNameMaternal; }

    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }

    public String getHouseNumber() { return houseNumber; }
    public void setHouseNumber(String houseNumber) { this.houseNumber = houseNumber; }

    public String getPostalCode() { return postalCode; }
    public void setPostalCode(String postalCode) { this.postalCode = postalCode; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getUsername() { return username;}
    public void setUsername(String username) { this.username = username; }
}
