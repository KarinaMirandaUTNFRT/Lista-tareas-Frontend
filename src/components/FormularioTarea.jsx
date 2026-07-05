import { useState } from "react";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {
  const [arrayTareaes, setarrayTareaes] = useState([]);
  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (tarea.trim() === ""){  // Evita que agreguen tareaes vacíos
    return alert("lngresa un tarea valido");
  };

  const tareaBuscada = arrayTareaes.find(
    (itemTarea) => itemTarea.toLowerCase() === tarea.toLowerCase().trim(),
  );

  if (tareaBuscada) {
    return alert("El tarea ya existe");
  }

  setarrayTareaes([...arrayTareaes, tarea.trim()]);
  setTarea("");
};


const borrarTarea = (nombreTarea) => {
  const arrayFiltrado = arrayTareaes.filter((item) => item !== nombreTarea);
  setarrayTareaes(arrayFiltrado);
}
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex ">
          <input
            type="text"
            className="form-control"
            id="inputTarea"
            placeholder="Ingresa una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />
          <button className="btn btn-primary">Enviar</button>
        </div>
      </form>
      <ListaTarea
        arrayTareaesProps={arrayTareaes}
        borrarTareaProps={borrarTarea}
      ></ListaTarea>
    </section>
  );
};

export default FormularioTarea;
