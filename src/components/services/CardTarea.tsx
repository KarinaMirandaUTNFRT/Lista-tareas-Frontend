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
    <article className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex flex-col h-full">
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
      <div className="p-5 flex flex-col grow">
        <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors">
          {tarea.nombreTarea}
        </h3>

        <p className="text-zinc-400 text-sm line-clamp-3 mb-4 grow">
          {tarea.descripcion}
        </p>

        <div className="pt-4 border-t border-zinc-800 mt-auto">
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm text-zinc-400 font-mono">
              {tarea.fecha
                ? (() => {
                    const fechaObj = new Date(tarea.fecha);

                    return !isNaN(fechaObj.getTime())
                      ? fechaObj.toLocaleDateString("es-AR", {
                          timeZone: "UTC",
                        })
                      : "Sin fecha";
                  })()
                : "Sin fecha"}
            </div>

            <Link
              to={`tarea/${tarea.id}`}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-md shadow-blue-900/20 active:scale-95"
            >
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CardTarea;
