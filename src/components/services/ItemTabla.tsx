import { Link } from "react-router";
import type { Tarea } from "../../interfaces/tareas";

interface ItemTablaProps {
  tarea: Tarea;
  fila: number;
}

const ItemTabla = ({tarea, fila}: ItemTablaProps) => {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        {fila}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        {tarea.nombreTarea}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
         ${tarea.fecha.toLocaleString('es-AR')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <Link to={`/administrador/editar/${tarea.id}`} className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1">
            <i className="bi bi-pencil-square"></i> Editar
          </Link>
          <button className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1">
            <i className="bi bi-trash"></i> Borrar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTabla;