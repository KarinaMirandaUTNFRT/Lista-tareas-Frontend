export interface Tarea {
  id: string;
  nombreTarea: string;
  fecha: Date;
  imagen: string;
  categoria: string;
  descripcion: string;
}

export type TareaFormData = Omit<Tarea, 'id'>;