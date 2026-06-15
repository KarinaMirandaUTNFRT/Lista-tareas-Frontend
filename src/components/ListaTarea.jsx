import ItemTarea from "./ItemTarea";

const ListaTarea = ({arraytareasProps, borrarTareaProps}) => {
  return (
    <ul className="list-group">
      {
      arraytareasProps.map((textoTarea, indice) => 
        <ItemTarea key={indice} textotareaProps={textoTarea} deletetareaProps={borrarTareaProps}></ItemTarea>)
        }
    </ul>
  );
};

export default ListaTarea;

