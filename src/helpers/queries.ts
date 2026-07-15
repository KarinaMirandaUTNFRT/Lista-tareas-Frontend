import type { tarea } from "../interfaces/tareas";

const urlTareas = import.meta.env.VITE_SERVICIO

const verificarRespuesta = async (
    respuesta: Response,
    accion: string,
): Promise<Response> => {
    if (!respuesta.ok) {
        throw new Error(
            `Error al ${accion}: ${respuesta.status} ${respuesta.statusText}`,
        )
    }
    return respuesta
};

export const listarTareasApi = async ():Promise<Response> =>{
    try{
        const respuesta = await fetch(urlTareas)
        return await verificarRespuesta(respuesta, "listar las tareas")
    }catch(error){
        console.error(error)
        throw error
    }
};

export const buscarTareaApi = async (id:string):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlTareas}/${id}`)
        return await verificarRespuesta(respuesta, "buscar la tarea")
    }catch(error){
        console.error(error)
        throw error
    }
};

export const crearTareaApi = async (tarea: tarea):Promise<Response> =>{
    try{
        const respuesta = await fetch(urlTareas, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        })
        return await verificarRespuesta(respuesta, "crear la tarea")
    }catch(error){
        console.error(error)
        throw error
    }
};
export const editarTareaApi = async (id:string, tarea: tarea):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlTareas}/${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tarea)
        })
        return await verificarRespuesta(respuesta, "editar la tarea")
    }catch(error){
        console.error(error)
        throw error
    }
};
export const borrarTareaApi = async (id:string):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlTareas}/${id}`, {
            method: 'DELETE'
        })
        return await verificarRespuesta(respuesta, "borrar la tarea")
    }catch(error){
        console.error(error)
        throw error
    }
};
