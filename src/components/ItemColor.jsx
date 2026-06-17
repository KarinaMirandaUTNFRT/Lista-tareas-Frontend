const ItemColor = ({textoColorProps, deleteColorProps} ) => {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div
      style={{
          backgroundColor: textoColorProps, 
            width: "30px", 
            height: "30px", 
            borderRadius: "4px",
            border: "1px solid #ccc"
        }}></div>
      <button className="btn btn-danger"
       onClick={()=> deleteColorProps(textoColorProps)}> 
       Borrar </button>
    </li>
  );
};

export default ItemColor;
