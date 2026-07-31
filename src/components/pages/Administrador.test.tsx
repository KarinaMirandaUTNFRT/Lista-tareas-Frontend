import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import Administrador from "./Administrador";
import { renderConProveedores, tareaMock } from "../../test/utils";

vi.mock("sweetalert2", () => ({ default: { fire: vi.fn() } }));

describe("pages/Administrador", () => {
  it("muestra el mensaje vacío cuando no hay tareas registradas", () => {
    renderConProveedores(<Administrador />, { contexto: { tareas: [] } });
    expect(
      screen.getByText(/no hay tareas registrados para administrar/i),
    ).toBeInTheDocument();
  });

  it("renderiza una fila por cada tarea y el enlace de crear", () => {
    const tareas = [
      tareaMock,
      { ...tareaMock, id: "2", nombreTarea: "Otra tarea" },
    ];
    renderConProveedores(<Administrador />, { contexto: { tareas } });
    expect(screen.getByText(tareaMock.nombreTarea)).toBeInTheDocument();
    expect(screen.getByText("Otra tarea")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /crear tareas/i }),
    ).toHaveAttribute("href", "/administrador/crear");
  });
});
