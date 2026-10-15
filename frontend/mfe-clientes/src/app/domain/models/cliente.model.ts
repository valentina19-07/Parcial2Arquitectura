export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  ciudad: string;
}

export type NuevoCliente = Omit<Cliente, 'id'>;
