import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import Inicio from "./Inicio";
import { renderConProveedores, tareaMock } from "../../test/utils";

describe("pages/Inicio", () => {
  it("muestra el estado vacío cuando no hay tareas", () => {
    renderConProveedores(<Inicio />, { contexto: { tareas: [] } });
    expect(
      screen.getByText(/no se encontraron tareas disponibles/i),
    ).toBeInTheDocument();
    expect(screen.getByText("0 tareas disponibles")).toBeInTheDocument();
  });

  it("muestra una tarjeta por cada tarea y el contador correcto", () => {
    const tareas = [
      tareaMock,
      { ...tareaMock, id: "2", nombreTarea: "Segunda tarea" },
    ];
    renderConProveedores(<Inicio />, { contexto: { tareas } });
    expect(screen.getByText("2 tareas disponibles")).toBeInTheDocument();
    expect(screen.getByText(tareaMock.nombreTarea)).toBeInTheDocument();
    expect(screen.getByText("Segunda tarea")).toBeInTheDocument();
  });
});
