export interface Tarea {
  id: string;
  nombreTarea: string;
  precio: number;
  imagen: string;
  categoria: string;
  descripcion: string;
}

export type TareaFormData = Omit<Tarea, 'id'>;