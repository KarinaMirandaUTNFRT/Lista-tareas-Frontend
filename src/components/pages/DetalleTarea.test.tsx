import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import DetalleTarea from "./DetalleTarea";
import { AppContext } from "../../context/AppContext";
import { crearContextoMock, tareaMock } from "../../test/utils";

const navigateMock = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => navigateMock };
});

function renderDetalle(buscarTarea: () => unknown, id = "1") {
  return render(
    <AppContext.Provider
      value={crearContextoMock({ buscarTarea: buscarTarea as never })}
    >
      <MemoryRouter initialEntries={[`/tarea/${id}`]}>
        <Routes>
          <Route path="/tarea/:id" element={<DetalleTarea />} />
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>,
  );
}

describe("pages/DetalleTarea", () => {
  beforeEach(() => navigateMock.mockClear());

  it("muestra los detalles cuando la tarea existe", () => {
    renderDetalle(() => tareaMock);
    expect(screen.getByText(tareaMock.nombreTarea)).toBeInTheDocument();
    expect(screen.getByText(tareaMock.descripcion)).toBeInTheDocument();
    expect(screen.getByText(tareaMock.prioridad)).toBeInTheDocument();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("redirige a /404 cuando la tarea no existe", async () => {
    renderDetalle(() => undefined);
    await waitFor(() =>
      expect(navigateMock).toHaveBeenCalledWith("/404", { replace: true }),
    );
  });
});
