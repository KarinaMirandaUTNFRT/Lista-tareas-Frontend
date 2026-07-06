import { createContext, useContext } from "react";
import type { Tarea, TareaFormData } from "../interfaces/tareas";

export interface AppContextType {
  usuarioLogueado: boolean;
  setUsuarioLogueado: React.Dispatch<React.SetStateAction<boolean>>;
  tareas: Tarea[];
  crearTarea: (nuevoTarea: TareaFormData) => void;
  borrarTarea: (idTarea: string) => void;
  editarTarea: (idTarea: string, tareaEditar: TareaFormData) => void;
  buscarTarea: (idTarea: string) => Tarea | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}