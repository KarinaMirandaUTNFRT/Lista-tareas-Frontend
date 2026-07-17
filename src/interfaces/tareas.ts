export interface tarea  {
  id: string;
  nombreTarea: string;
  fecha: Date;
  categoria: string;
  descripcion: string;
  prioridad: string; 
}

export type tareaFormData = Omit<tarea , 'id'>;