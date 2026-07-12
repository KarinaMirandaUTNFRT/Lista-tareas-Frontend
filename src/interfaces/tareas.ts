export interface Tarea {
  id: string;
  nombreTarea: string;
  fecha: Date;
  categoria: string;
  descripcion: string;
  prioridad: string; 
}

export type TareaFormData = Omit<Tarea, 'id'>;