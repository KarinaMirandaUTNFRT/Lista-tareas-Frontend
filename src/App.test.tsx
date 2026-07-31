import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const fireMock = vi.fn();
vi.mock("sweetalert2", () => ({
  default: { fire: (...a: unknown[]) => fireMock(...a) },
}));

const tareas = [
  {
    id: "a1",
    nombreTarea: "Primera tarea",
    fecha: "2026-08-01",
    categoria: "Sistemas",
    descripcion: "Descripción de la primera tarea",
    prioridad: "alta",
  },
  {
    id: "b2",
    nombreTarea: "Segunda tarea",
    fecha: "2026-08-02",
    categoria: "Ventas",
    descripcion: "Descripción de la segunda tarea",
    prioridad: "baja",
  },
];

function irA(ruta: string) {
  window.history.pushState({}, "", ruta);
}

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    fireMock.mockReset();
    irA("/");
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("carga las tareas desde localStorage y las muestra en el inicio", () => {
    localStorage.setItem("tareasKey", JSON.stringify(tareas));
    render(<App />);
    expect(screen.getByText("2 tareas disponibles")).toBeInTheDocument();
    expect(screen.getByText("Primera tarea")).toBeInTheDocument();
    expect(screen.getByText("Segunda tarea")).toBeInTheDocument();
  });

  it("persiste el estado inicial de sesión y tareas en storage", async () => {
    render(<App />);
    await waitFor(() => {
      expect(sessionStorage.getItem("usuarioKey")).toBe("false");
      expect(localStorage.getItem("tareasKey")).toBe("[]");
    });
  });

  it("busca la tarea por id al abrir el detalle", () => {
    localStorage.setItem("tareasKey", JSON.stringify(tareas));
    irA("/tarea/b2");
    render(<App />);
    expect(screen.getByText("Segunda tarea")).toBeInTheDocument();
    expect(
      screen.getByText("Descripción de la segunda tarea"),
    ).toBeInTheDocument();
  });

  it("borra una tarea desde el panel de administrador y actualiza el storage", async () => {
    const user = userEvent.setup();
    localStorage.setItem("tareasKey", JSON.stringify(tareas));
    sessionStorage.setItem("usuarioKey", "true");
    irA("/administrador");
    render(<App />);

    const fila = screen.getByText("Primera tarea").closest("tr")!;
    fireMock.mockResolvedValueOnce({ isConfirmed: true });
    await user.click(within(fila).getByRole("button", { name: /borrar/i }));

    await waitFor(() => {
      const guardadas = JSON.parse(localStorage.getItem("tareasKey") || "[]");
      expect(guardadas).toHaveLength(1);
      expect(guardadas[0].id).toBe("b2");
    });
    expect(screen.queryByText("Primera tarea")).not.toBeInTheDocument();
  });
});
