package com.parcial.clientes.infrastructure.web;

import com.parcial.clientes.application.usecase.CrearClienteUseCase;
import com.parcial.clientes.application.usecase.ListarClientesUseCase;
import com.parcial.clientes.application.usecase.ObtenerClienteUseCase;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/clientes")
@Tag(name = "Clientes", description = "Gestión de clientes")
public class ClienteController {

    private final ListarClientesUseCase listar;
    private final ObtenerClienteUseCase obtener;
    private final CrearClienteUseCase crear;

    public ClienteController(ListarClientesUseCase listar, ObtenerClienteUseCase obtener,
                             CrearClienteUseCase crear) {
        this.listar = listar;
        this.obtener = obtener;
        this.crear = crear;
    }

    @GetMapping
    @Operation(summary = "Listar clientes")
    public List<ClienteResponse> listar() {
        return listar.execute().stream().map(ClienteResponse::from).toList();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por id")
    public ClienteResponse obtener(@PathVariable Long id) {
        return ClienteResponse.from(obtener.execute(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Crear cliente")
    public ClienteResponse crear(@RequestBody ClienteRequest request) {
        return ClienteResponse.from(crear.execute(request.nombre(), request.email(), request.ciudad()));
    }
}
