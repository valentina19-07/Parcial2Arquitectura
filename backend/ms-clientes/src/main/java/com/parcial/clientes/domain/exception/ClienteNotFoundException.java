package com.parcial.clientes.domain.exception;

public class ClienteNotFoundException extends RuntimeException {
    public ClienteNotFoundException(Long id) {
        super("Cliente " + id + " no encontrado");
    }
}
