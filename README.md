# Parcial 2 - Arquitectura de Software

## Estructura del Proyecto

```text
Parcial2Arquitectura/
├── README.md
├── .gitignore
├── frontend/
│   ├── host/
│   ├── mfe-productos/
│   ├── mfe-clientes/
│   └── mfe-pedidos/
└── backend/
    ├── ms-productos/   (Node)
    ├── ms-clientes/    (Spring Boot)
    └── ms-pedidos/     (Node)
```

## Microservicios y Microfrontends
Cada microservicio cuenta con 3 casos de uso:
- Listar
- Obtener por ID
- Crear

Cada microfrontend implementa los mismos 3 casos de uso en su capa de aplicación.
