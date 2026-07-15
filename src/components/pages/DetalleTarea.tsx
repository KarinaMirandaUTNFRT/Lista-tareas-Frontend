import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { obtenerConfiguracionCategoria } from "../../helpers/categorias";
import { formatearFecha } from "../../helpers/fecha";

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

  const config = obtenerConfiguracionCategoria(tarea?.categoria);
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
        {formatearFecha(tarea.fecha)}
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
