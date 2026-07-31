import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../context/AppContext";
import type { Tarea } from "../interfaces/tareas";

export const tareaMock: Tarea = {
  id: "1",
  nombreTarea: "Completar informe mensual",
  fecha: new Date("2026-08-01T00:00:00Z"),
  categoria: "Sistemas",
  descripcion: "Terminar el informe del mes",
  prioridad: "alta",
};

export function crearContextoMock(
  overrides: Partial<AppContextType> = {},
): AppContextType {
  return {
    usuarioLogueado: false,
    setUsuarioLogueado: vi.fn(),
    tareas: [],
    crearTarea: vi.fn(),
    borrarTarea: vi.fn(),
    editarTarea: vi.fn(),
    buscarTarea: vi.fn(),
    ...overrides,
  };
}

interface RenderOpts {
  contexto?: Partial<AppContextType>;
  route?: string;
  routerPaths?: string[];
}

export function renderConProveedores(
  ui: React.ReactElement,
  { contexto = {}, route = "/", routerPaths }: RenderOpts = {},
) {
  const valor = crearContextoMock(contexto);
  const utils = render(
    <AppContext.Provider value={valor}>
      <MemoryRouter initialEntries={routerPaths ?? [route]}>{ui}</MemoryRouter>
    </AppContext.Provider>,
  );
  return { ...utils, contexto: valor };
}
