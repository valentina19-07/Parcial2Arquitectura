export interface Pedido {
  id: number;
  clienteId: number;
  productoId: number;
  cantidad: number;
  estado: 'PENDIENTE' | 'ENVIADO' | 'ENTREGADO';
}

export type NuevoPedido = Omit<Pedido, 'id' | 'estado'>;
