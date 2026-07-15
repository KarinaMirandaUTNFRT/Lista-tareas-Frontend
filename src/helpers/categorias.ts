import type { IconType } from "react-icons";
import {
  MdOutlineDesktopWindows,
  MdOutlineAssignmentInd,
  MdOutlineDashboard,
  MdOutlineCellTower,
  MdConnectWithoutContact,
  MdDataUsage,
} from "react-icons/md";

export interface ConfiguracionCategoria {
  clasesFondo: string;
  Icono: IconType;
}

export const configuracionCategorias: Record<string, ConfiguracionCategoria> = {
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

export const obtenerConfiguracionCategoria = (
  categoria?: string,
): ConfiguracionCategoria =>
  configuracionCategorias[categoria ?? "Defecto"] ??
  configuracionCategorias.Defecto;
