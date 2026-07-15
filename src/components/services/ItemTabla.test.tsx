import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemTabla from "./ItemTabla";
import { renderConProveedores, tareaMock } from "../../test/utils";

const fireMock = vi.fn();
vi.mock("sweetalert2", () => ({
  default: { fire: (...args: unknown[]) => fireMock(...args) },
}));

function renderItem(contexto = {}) {
  return renderConProveedores(
    <table>
      <tbody>
        <ItemTabla tarea={tareaMock} fila={1} />
      </tbody>
    </table>,
    { contexto },
  );
}

describe("services/ItemTabla", () => {
  beforeEach(() => {
    fireMock.mockReset();
  });

  it("muestra el número de fila, el nombre y la fecha formateada", () => {
    renderConProveedores(
      <table>
        <tbody>
          <ItemTabla
            tarea={{ ...tareaMock, fecha: "2026-08-01" as unknown as Date }}
            fila={3}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText(tareaMock.nombreTarea)).toBeInTheDocument();
    expect(screen.getByText("01/08/2026")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /editar/i })).toHaveAttribute(
      "href",
      `/administrador/editar/${tareaMock.id}`,
    );
  });

  it("muestra 'Sin fecha' cuando la tarea no tiene fecha", () => {
    renderConProveedores(
      <table>
        <tbody>
          <ItemTabla
            tarea={{ ...tareaMock, fecha: "" as unknown as Date }}
            fila={1}
          />
        </tbody>
      </table>,
    );
    expect(screen.getByText("Sin fecha")).toBeInTheDocument();
  });

  it("borra la tarea cuando se confirma el diálogo", async () => {
    const user = userEvent.setup();
    fireMock.mockResolvedValueOnce({ isConfirmed: true });
    const { contexto } = renderItem();

    await user.click(screen.getByRole("button", { name: /borrar/i }));

    await waitFor(() =>
      expect(contexto.borrarTarea).toHaveBeenCalledWith(tareaMock.id),
    );
    expect(fireMock).toHaveBeenCalledTimes(2);
  });

  it("no borra la tarea cuando se cancela el diálogo", async () => {
    const user = userEvent.setup();
    fireMock.mockResolvedValueOnce({ isConfirmed: false });
    const { contexto } = renderItem();

    await user.click(screen.getByRole("button", { name: /borrar/i }));

    await waitFor(() => expect(fireMock).toHaveBeenCalledTimes(1));
    expect(contexto.borrarTarea).not.toHaveBeenCalled();
  });
});
