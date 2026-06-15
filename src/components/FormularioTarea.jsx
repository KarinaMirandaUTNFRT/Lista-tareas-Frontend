import { useState } from "react";
import ListaTarea from "./ListaTarea";

const FormularioTarea = () => {
  const [arrayTareas, setarrayTareas] = useState([]);
  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const tareaBuscada = arrayTareas.find(
      (itemTarea) => itemTarea.toLowerCase === tarea.toLowerCase().trim(),
    );
    console.log(tareaBuscada);
    if (tareaBuscada) {
      return alert("la tarea ya existe");
    }
    setarrayTareas([...arrayTareas, tarea.trim()]);
    setTarea("");
  };
  const borrarTarea = (nombreTarea) => {
    const arrayFiltrado = arrayTareas.filter((item) => item !== nombreTarea);
    setarrayTareas(arrayFiltrado);
  };
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
      <ListaTarea arraytareasProps={arrayTareas} borrarTareaProps={borrarTarea}></ListaTarea>
    </section>
  );
};

export default FormularioTarea;
