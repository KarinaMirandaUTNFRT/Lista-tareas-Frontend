import { useState } from "react";
import { Link } from "react-router-dom";
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
  const config =
    configuracionCategorias[tarea.categoria] || configuracionCategorias.Defecto;
  const IconoCategoria = config.Icono;
 const [realizada, setRealizada] = useState<boolean>(false);

 return (
    <article
      className={`group w-full bg-zinc-900 rounded-xl border transition-all duration-300 shadow-lg flex flex-col md:flex-row items-center p-4 gap-5 ${
      realizada 
          ? "border-emerald-500/50 shadow-emerald-950/10" 
          : "border-zinc-800 hover:border-red-500/40"
      }`}
    >

      <div
        className={`w-16 h-16 shrink-0 rounded-xl border flex items-center justify-center transition-colors duration-300 ${config.clasesFondo}`}
      >
        <IconoCategoria className="w-8 h-8 transition-transform duration-500 group-hover:scale-110" />
      </div>
      <div className="flex flex-col lg:flex-row grow min-w-0 w-full md:w-auto gap-2 lg:gap-8 items-start lg:items-center">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 select-none whitespace-nowrap">
            Área responsable:
          </span>
          <span className="text-sm font-semibold text-blue-400 uppercase tracking-wide">
            {tarea.categoria}
          </span>
        </div>
        <span className="hidden lg:inline text-zinc-700">|</span>
        <div className="flex items-center gap-2 min-w-0 grow">
          <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 select-none whitespace-nowrap">
            Tarea a realizar:
          </span>
          <h3 className="text-base font-bold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
            {tarea.nombreTarea}
          </h3>
        </div>
      </div>
      <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto shrink-0 border-t md:border-t-0 border-zinc-800/60 pt-3 md:pt-0">
        <div className="flex flex-col text-left md:text-right gap-0.5">
          <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-500 select-none">
            Fecha de entrega límite
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
          <button
          onClick={() => setRealizada(!realizada)} // Al hacer clic, invierte el valor (true/false)
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95 whitespace-nowrap cursor-pointer border ${
            realizada
              ? "border-emerald-500 bg-emerald-600 text-white hover:bg-emerald-700" // Estilo Verde (Hecho)
              : "border-red-500/40 hover:border-red-500 bg-transparent text-red-400 hover:bg-red-600 hover:text-white" // Estilo Rojo (Pendiente)
          }`}
        >
          {realizada ? "✓ Realizada" : "Marcar realizada"}
        </button>


        <Link
          to={`tarea/${tarea.id}`}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md shadow-blue-900/20 active:scale-95 whitespace-nowrap"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
};
export default CardTarea;
