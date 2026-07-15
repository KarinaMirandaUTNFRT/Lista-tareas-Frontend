import type { tarea } from "../interfaces/tareas";

const urlTareas = import.meta.env.VITE_SERVICIO;

const jsonHeaders = { "Content-Type": "application/json" };

const peticionApi = async (
  url: string,
  opciones?: RequestInit,
): Promise<Response> => {
  try {
    return await fetch(url, opciones);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const listarTareasApi = (): Promise<Response> => peticionApi(urlTareas);

export const buscarTareaApi = (id: string): Promise<Response> =>
  peticionApi(`${urlTareas}/${id}`);

export const crearTareaApi = (tarea: tarea): Promise<Response> =>
  peticionApi(urlTareas, {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify(tarea),
  });

export const editarTareaApi = (id: string, tarea: tarea): Promise<Response> =>
  peticionApi(`${urlTareas}/${id}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify(tarea),
  });

export const borrarTareaApi = (id: string): Promise<Response> =>
  peticionApi(`${urlTareas}/${id}`, { method: "DELETE" });
