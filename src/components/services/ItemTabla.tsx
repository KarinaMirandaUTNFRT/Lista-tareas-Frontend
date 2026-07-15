import { Link } from "react-router";
import type { Tarea } from "../../interfaces/tareas";
import { useAppContext } from "../../context/AppContext";
import { LuTrash2,LuPencil  } from "react-icons/lu";
import { alertaConfirmacion, alertaExito } from "../../helpers/alertas";
import { formatearFecha } from "../../helpers/fecha";

interface ItemTablaProps {
  tarea: Tarea;
  fila: number;
}

const ItemTabla = ({ tarea, fila }: ItemTablaProps) => {
  const { borrarTarea } = useAppContext();

  const eliminarTarea = () => {
    alertaConfirmacion(
      "¿Estás seguro?",
      "No se puede revertir este proceso",
    ).then((result) => {
      if (result.isConfirmed) {
        borrarTarea(tarea.id);
        alertaExito("Eliminado", "El tarea fue eliminado correctamente");
      }
    });
  };

  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500 font-mono">
        {fila}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-zinc-200">
        {tarea.nombreTarea}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400 font-mono">
        {formatearFecha(tarea.fecha)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex gap-3">
          <Link
            to={`/administrador/editar/${tarea.id}`}
            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <LuPencil /> Editar
          </Link>
          <button
            className="text-red-500 hover:text-red-400 transition-colors flex items-center gap-1"
            onClick={eliminarTarea}
          >
            <LuTrash2 /> Borrar
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemTabla;