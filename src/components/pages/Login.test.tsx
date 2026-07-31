import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { renderConProveedores } from "../../test/utils";

const fireMock = vi.fn();
vi.mock("sweetalert2", () => ({
  default: { fire: (...a: unknown[]) => fireMock(...a) },
}));

const navigateMock = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return { ...actual, useNavigate: () => navigateMock };
});

describe("pages/Login", () => {
  beforeEach(() => {
    fireMock.mockReset();
    navigateMock.mockClear();
  });

  it("muestra errores de validación cuando los campos están vacíos", async () => {
    const user = userEvent.setup();
    renderConProveedores(<Login />);
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(await screen.findByText(/el email es obligatorio/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la contraseña es obligatoria/i),
    ).toBeInTheDocument();
  });

  it("loguea al usuario y navega al administrador con credenciales válidas", async () => {
    const user = userEvent.setup();
    const { contexto } = renderConProveedores(<Login />);

    await user.type(screen.getByLabelText(/correo electrónico/i), "admin@admin.com");
    await user.type(screen.getByLabelText(/contraseña/i), "123456Ab@");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() =>
      expect(contexto.setUsuarioLogueado).toHaveBeenCalledWith(true),
    );
    expect(navigateMock).toHaveBeenCalledWith("/administrador");
    expect(fireMock).toHaveBeenCalledTimes(1);
  });

  it("muestra un error con credenciales incorrectas", async () => {
    const user = userEvent.setup();
    const { contexto } = renderConProveedores(<Login />);

    await user.type(screen.getByLabelText(/correo electrónico/i), "otro@correo.com");
    await user.type(screen.getByLabelText(/contraseña/i), "Malapass1@");
    await user.click(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => expect(fireMock).toHaveBeenCalledTimes(1));
    expect(fireMock.mock.calls[0][0]).toMatchObject({
      title: "Ocurrió un error",
    });
    expect(contexto.setUsuarioLogueado).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
