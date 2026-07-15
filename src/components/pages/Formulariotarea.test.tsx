import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import FormularioTarea from "./Formulariotarea";
import { AppContext } from "../../context/AppContext";
import { crearContextoMock, tareaMock } from "../../test/utils";
import type { AppContextType } from "../../context/AppContext";

const fireMock = vi.fn();
vi.mock("sweetalert2", () => ({
  default: { fire: (...a: unknown[]) => fireMock(...a) },
}));

const navigateMock = vi.fn();
vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();
  return { ...actual, useNavigate: () => navigateMock };
});

function renderFormulario(
  titulo: string,
  contexto: Partial<AppContextType> = {},
  ruta = "/administrador/crear",
) {
  const valor = crearContextoMock(contexto);
  render(
    <AppContext.Provider value={valor}>
      <MemoryRouter initialEntries={[ruta]}>
        <Routes>
          <Route
            path="/administrador/crear"
            element={<FormularioTarea titulo={titulo} />}
          />
          <Route
            path="/administrador/editar/:id"
            element={<FormularioTarea titulo={titulo} />}
          />
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>,
  );
  return valor;
}

describe("pages/FormularioTarea", () => {
  beforeEach(() => {
    fireMock.mockReset();
    navigateMock.mockClear();
  });

  it("muestra el título recibido y todos los campos del formulario", () => {
    renderFormulario("Crear Tarea");
    expect(
      screen.getByRole("heading", { name: "Crear Tarea" }),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/completar planilla/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/categoría\*/i)).toBeInTheDocument();
    expect(screen.getByText(/prioridad\*/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /guardar tarea/i }),
    ).toBeInTheDocument();
  });

  it("muestra los mensajes de validación al enviar vacío", async () => {
    const user = userEvent.setup();
    renderFormulario("Crear Tarea");

    await user.click(screen.getByRole("button", { name: /guardar tarea/i }));

    expect(
      await screen.findByText(/el nombre es obligatorio/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/la fecha es obligatoria/i)).toBeInTheDocument();
    expect(screen.getByText(/seleccione una categoría/i)).toBeInTheDocument();
    expect(screen.getByText(/seleccione un estado/i)).toBeInTheDocument();
    expect(
      screen.getByText(/la descripción es obligatoria/i),
    ).toBeInTheDocument();
  });

  it("llama a crearTarea con los datos al enviar en modo Crear", async () => {
    const user = userEvent.setup();
    const contexto = renderFormulario("Crear Tarea");

    const [categoria, prioridad] = screen.getAllByRole("combobox");
    await user.type(
      screen.getByPlaceholderText(/completar planilla/i),
      "Preparar la reunión",
    );
    await user.type(screen.getByPlaceholderText(/2026-10-05/), "2026-08-15");
    await user.selectOptions(categoria, "Ventas");
    await user.selectOptions(prioridad, "alta");
    await user.type(
      screen.getByPlaceholderText(/describa el tarea/i),
      "Descripción con más de diez caracteres",
    );
    await user.click(screen.getByRole("button", { name: /guardar tarea/i }));

    await waitFor(() => expect(contexto.crearTarea).toHaveBeenCalledTimes(1));
    expect(contexto.crearTarea).toHaveBeenCalledWith(
      expect.objectContaining({
        nombreTarea: "Preparar la reunión",
        fecha: "2026-08-15",
        categoria: "Ventas",
        prioridad: "alta",
      }),
    );
    expect(fireMock).toHaveBeenCalledTimes(1);
  });

  it("precarga los datos y llama a editarTarea en modo Editar", async () => {
    const user = userEvent.setup();
    const buscarTarea = vi.fn().mockReturnValue({
      ...tareaMock,
      fecha: "2026-08-01",
    });
    const contexto = renderFormulario(
      "Editar Tarea",
      { buscarTarea },
      `/administrador/editar/${tareaMock.id}`,
    );

    await waitFor(() =>
      expect(screen.getByDisplayValue(tareaMock.nombreTarea)).toBeInTheDocument(),
    );
    expect(buscarTarea).toHaveBeenCalledWith(tareaMock.id);

    await user.click(screen.getByRole("button", { name: /guardar tarea/i }));

    await waitFor(() => expect(contexto.editarTarea).toHaveBeenCalledTimes(1));
    expect(contexto.editarTarea).toHaveBeenCalledWith(
      tareaMock.id,
      expect.objectContaining({ nombreTarea: tareaMock.nombreTarea }),
    );
    expect(navigateMock).toHaveBeenCalledWith("/administrador");
  });
});
