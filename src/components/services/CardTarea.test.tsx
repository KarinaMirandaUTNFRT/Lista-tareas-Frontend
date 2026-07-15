import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CardTarea from "./CardTarea";
import { renderConProveedores, tareaMock } from "../../test/utils";

describe("services/CardTarea", () => {
  it("muestra los datos de la tarea y un enlace al detalle", () => {
    renderConProveedores(<CardTarea tarea={tareaMock} />);
    expect(screen.getByText(tareaMock.nombreTarea)).toBeInTheDocument();
    expect(screen.getByText(tareaMock.categoria)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver detalle/i })).toHaveAttribute(
      "href",
      `/tarea/${tareaMock.id}`,
    );
  });

  it("alterna el estado de 'realizada' al hacer clic en el botón", async () => {
    const user = userEvent.setup();
    renderConProveedores(<CardTarea tarea={tareaMock} />);
    const boton = screen.getByRole("button", { name: /marcar realizada/i });
    await user.click(boton);
    expect(
      screen.getByRole("button", { name: /✓ realizada/i }),
    ).toBeInTheDocument();
  });

  it("muestra 'Sin fecha' cuando la tarea no tiene fecha", () => {
    renderConProveedores(
      <CardTarea tarea={{ ...tareaMock, fecha: undefined as unknown as Date }} />,
    );
    expect(screen.getByText("Sin fecha")).toBeInTheDocument();
  });

  it("usa la configuración por defecto para categorías desconocidas", () => {
    renderConProveedores(
      <CardTarea tarea={{ ...tareaMock, categoria: "Inexistente" }} />,
    );
    expect(screen.getByText("Inexistente")).toBeInTheDocument();
  });
});
