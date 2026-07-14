import type { tarea } from "../interfaces/tareas";

const urlTareas = import.meta.env.VITE_SERVICIO

export const listarTareasApi = async ():Promise<Response> =>{
    try{
        const respuesta = await fetch(urlTareas)
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};

export const buscarTareaApi = async (id:string):Promise<Response> =>{
    try{
        const respuesta = await fetch(`${urlTareas}/${id}`)
        return respuesta
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
        return respuesta
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
        return respuesta
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
        return respuesta
    }catch(error){
        console.error(error)
        throw error
    }
};