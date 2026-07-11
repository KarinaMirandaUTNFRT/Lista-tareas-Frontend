import { Link } from "react-router";
import type { Tarea } from "../../interfaces/tareas";

import {
  MdOutlineDesktopWindows,
  MdOutlineAssignmentInd,
  MdOutlineDashboard,
  MdOutlineCellTower,
  MdConnectWithoutContact,
  MdDataUsage,
} from "react-icons/md";

interface CardTareaProps {
  tarea: Tarea;
}

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
const CardTarea = ({ tarea }: CardTareaProps) => {
  // Formateador de moneda para el fecha
  //const formatearPrecio = (valor: number) => {
  //return new Intl.NumberFormat('es-AR', {
  //style: 'currency',
  //currency: 'ARS',
  //}).format(valor);
  //};
  const config =
    configuracionCategorias[tarea.categoria] || configuracionCategorias.Defecto;
  const IconoCategoria = config.Icono;
  return (
    <article className="group w-full bg-zinc-900 rounded-xl border border-zinc-800 hover:border-blue-500/40 transition-all duration-300 shadow-lg flex flex-col md:flex-row items-center p-4 gap-5">
      {/* Contenedor de Imagen */}
      <div
        className={`relative h-48 flex items-center justify-center border-b border-zinc-800/50 transition-colors duration-300 ${config.clasesFondo}`}
      >
        <IconoCategoria className="w-16 h-16 transition-transform duration-500 group-hover:scale-110" />

        <div className="absolute top-2 right-2">
          <span className="bg-zinc-950/80 backdrop-blur-sm text-blue-400 text-xs font-bold px-2 py-1 rounded border border-zinc-700 uppercase tracking-wider">
            {tarea.categoria}
          </span>
        </div>
      </div>
      {/* Cuerpo de la Card */}
      <div className="flex flex-col grow min-w-0 w-full md:w-auto">
        <div className="flex items-center gap-3 flex-wrap mb-1">
          <h3 className="text-lg font-bold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
            {tarea.nombreTarea}
          </h3>
          <span className="bg-zinc-950/80 backdrop-blur-sm text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded border border-zinc-800 uppercase tracking-wider">
            {tarea.categoria}
          </span>
        </div>

        <p className="text-zinc-400 text-sm line-clamp-1">
          {tarea.descripcion}
        </p>
      </div>

      {/* 🗓️ 3. FECHA Y BOTÓN (Alineados a la derecha de la fila) */}
      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto shrink-0 border-t md:border-t-0 border-zinc-800/60 pt-3 md:pt-0">
        {/* Bloque de Fecha Límite */}
        <div className="flex flex-col text-left md:text-right gap-0.5">
          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 select-none">
            Entrega límite
          </span>

          <div className="text-sm text-zinc-400 font-mono">
            {tarea.fecha
              ? (() => {
                  const fechaObj = new Date(tarea.fecha);
                  return !isNaN(fechaObj.getTime())
                    ? fechaObj.toLocaleDateString("es-AR", { timeZone: "UTC" })
                    : "Sin fecha";
                })()
              : "Sin fecha"}
          </div>
        </div>
        <Link
          to={`tarea/${tarea.id}`}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg 
              text-sm font-bold transition-colors shadow-md shadow-blue-900/20 active:scale-95 whitespace-nowrap"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
};

export default CardTarea;
