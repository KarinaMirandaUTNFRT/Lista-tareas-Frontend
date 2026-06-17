import { useState } from "react";
import ListaColor from "./ListaColor";

const FormularioColor = () => {
  const [arrayColores, setarrayColores] = useState([]);
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (color.trim() === ""){  // Evita que agreguen colores vacíos
    return alert("lngresa un color valido");
  };

  const colorBuscada = arrayColores.find(
    (itemColor) => itemColor.toLowerCase() === color.toLowerCase().trim(),
  );

  if (colorBuscada) {
    return alert("El color ya existe");
  }

  setarrayColores([...arrayColores, color.trim()]);
  setColor("");
};


const borrarColor = (nombreColor) => {
  const arrayFiltrado = arrayColores.filter((item) => item !== nombreColor);
  setarrayColores(arrayFiltrado);
}
  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 d-flex ">
          <input
            type="text"
            className="form-control"
            id="inputColor"
            placeholder="Ingresa una color"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          />
          <button className="btn btn-primary">Enviar</button>
        </div>
      </form>
      <ListaColor
        arrayColoresProps={arrayColores}
        borrarColorProps={borrarColor}
      ></ListaColor>
    </section>
  );
};

export default FormularioColor;
