package com.parcial.clientes.domain.model;

public class Cliente {
    private final Long id;
    private final String nombre;
    private final String email;
    private final String ciudad;

    public Cliente(Long id, String nombre, String email, String ciudad) {
        if (nombre == null || nombre.isBlank()) {
            throw new IllegalArgumentException("El nombre es obligatorio");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("El email no es válido");
        }
        if (ciudad == null || ciudad.isBlank()) {
            throw new IllegalArgumentException("La ciudad es obligatoria");
        }
        this.id = id;
        this.nombre = nombre.trim();
        this.email = email.trim();
        this.ciudad = ciudad.trim();
    }

    public Long getId() { return id; }
    public String getNombre() { return nombre; }
    public String getEmail() { return email; }
    public String getCiudad() { return ciudad; }
}
