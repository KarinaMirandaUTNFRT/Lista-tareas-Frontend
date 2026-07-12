import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import {
  MdOutlineDesktopWindows,
  MdOutlineAssignmentInd,
  MdOutlineDashboard,
  MdOutlineCellTower,
  MdConnectWithoutContact,
  MdDataUsage,
} from "react-icons/md";

const configuracionCategorias: Record<
  string,
  { clasesFondo: string; Icono: any }
> = {
  Ventas: {
    clasesFondo: "bg-emerald-950/40 border-emerald-500/20 text-emerald-400",
    Icono: MdOutlineDesktopWindows,
  },
  Proveedores: {
    clasesFondo: "bg-amber-950/40 border-amber-500/20 text-amber-400",
    Icono: MdOutlineAssignmentInd,
  },
  Marketing: {
    clasesFondo: "bg-purple-950/40 border-purple-500/20 text-purple-400",
    Icono: MdOutlineDashboard,
  },
  Sistemas: {
    clasesFondo: "bg-blue-950/40 border-blue-500/20 text-blue-400",
    Icono: MdOutlineCellTower,
  },
  "Atencion al Cliente": {
    clasesFondo: "bg-pink-950/40 border-pink-500/20 text-pink-400",
    Icono: MdConnectWithoutContact,
  },
  Defecto: {
    clasesFondo: "bg-zinc-800 border-zinc-700 text-zinc-400",
    Icono: MdDataUsage,
  },
};

const DetalleTarea = () => {
  const { id } = useParams<{ id: string }>();
  const { buscarTarea } = useAppContext();
  const navigate = useNavigate();

  // Buscar el tarea por id
  const tarea = buscarTarea(id || "");

  useEffect(() => {
    if (!tarea) {
      // Si no existe el tarea, redirigir a 404
      navigate("/404", { replace: true });
    }
  }, [tarea, navigate]);

  if (!tarea) {
    return null;
  }

  const config =
    configuracionCategorias[tarea?.categoria || "Defecto"] ||
    configuracionCategorias.Defecto;
  const IconoCategoria = config.Icono;

  return (
    <div className="text-center max-w-xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
      <span className="text-center text-[30px] uppercase font-bold tracking-wider text-zinc-500 select-none mb-1">
        Tarea a realizar:
      </span>

      <h2 className="text-3xl font-bold mb-4 text-center">
        {tarea.nombreTarea}
      </h2>

      <p className="text-lg mb-2 text-zinc-300">
        <span className="font-semibold text-zinc-400">Fecha Límite:</span>{" "}
        {tarea.fecha
          ? String(tarea.fecha).split("-").reverse().join("/")
          : "Sin fecha"}
      </p>

      <p className="text-lg mb-2 text-zinc-300">
        <span className="font-semibold">Area Responsable:</span>{" "}
        {tarea.categoria}
      </p>
      <p className="text-lg mb-2 text-zinc-300">
        <span className="font-semibold">Prioridad:</span>{" "}
        {tarea.prioridad}
      </p>
      <p className="mb-6 text-zinc-300">
        <span className="font-semibold">Descripción:</span> {tarea.descripcion}
      </p>
      <Link
        to="/"
        className="inline-block bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors active:scale-95"
      >
        Volver al Inicio
      </Link>
    </div>
  );
};

export default DetalleTarea;
