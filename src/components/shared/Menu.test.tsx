import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Menu from "./Menu";
import { renderConProveedores } from "../../test/utils";

const navigateMock = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return { ...actual, useNavigate: () => navigateMock };
});

describe("shared/Menu", () => {
  it("muestra el enlace de Login cuando el usuario no está logueado", () => {
    renderConProveedores(<Menu />, { contexto: { usuarioLogueado: false } });
    expect(screen.getAllByText("Login").length).toBeGreaterThan(0);
    expect(screen.queryByText("Administrador")).not.toBeInTheDocument();
  });

  it("muestra Administrador y Logout cuando el usuario está logueado", () => {
    renderConProveedores(<Menu />, { contexto: { usuarioLogueado: true } });
    expect(screen.getAllByText("Administrador").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Logout").length).toBeGreaterThan(0);
  });

  it("cierra sesión y navega al inicio al hacer clic en Logout", async () => {
    const user = userEvent.setup();
    navigateMock.mockClear();
    const { contexto } = renderConProveedores(<Menu />, {
      contexto: { usuarioLogueado: true },
    });

    await user.click(screen.getAllByText("Logout")[0]);

    expect(contexto.setUsuarioLogueado).toHaveBeenCalledWith(false);
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("alterna el menú móvil con el botón hamburguesa", async () => {
    const user = userEvent.setup();
    renderConProveedores(<Menu />, { contexto: { usuarioLogueado: false } });
    const boton = screen.getByRole("button", { name: /menu/i });
    // Abre y cierra sin lanzar errores
    await user.click(boton);
    await user.click(boton);
    expect(boton).toBeInTheDocument();
  });
});
