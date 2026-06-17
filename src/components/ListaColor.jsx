import ItemColor from "./ItemColor";

const ListaColor = ({arrayColoresProps, borrarColorProps}) => {
  return (
    <ul className="list-group">
      {
      arrayColoresProps.map((textoColor, indice) => 
        <ItemColor key={indice} textoColorProps={textoColor} deleteColorProps={borrarColorProps}></ItemColor>)
        }
    </ul>
  );
};

export default ListaColor;

