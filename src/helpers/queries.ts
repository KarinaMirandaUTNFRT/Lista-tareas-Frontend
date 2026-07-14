
const URL_TAREAS = 'http://localhost:3000/api/tareas'
// Crear una tarea (POST)
export const crearTareaApi = async (tarea:string):Promise<Response> => {
  try {
    const respuesta = await fetch(URL_TAREAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tarea)
    });
    return respuesta;
  } catch (error) {
    console.log(error);
  }
};