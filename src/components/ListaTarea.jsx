import ItemTarea from "./ItemTarea";

const ListaTarea = ({arrayTareaesProps, borrarTareaProps}) => {
  return (
    <ul className="list-group">
      {
      arrayTareaesProps.map((textoTarea, indice) => 
        <ItemTarea key={indice} textoTareaProps={textoTarea} deleteTareaProps={borrarTareaProps}></ItemTarea>)
        }
    </ul>
  );
};

export default ListaTarea;

