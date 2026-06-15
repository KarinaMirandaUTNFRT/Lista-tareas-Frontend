const ItemTarea = ({textotareaProps, deletetareaProps} ) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {textotareaProps} <button className="btn btn-danger"
       onClick={()=> deletetareaProps(textotareaProps)}> 
       Borrar </button>
    </li>
  );
};

export default ItemTarea;