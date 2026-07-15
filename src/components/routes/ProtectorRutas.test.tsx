import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectorRutas from "./ProtectorRutas";
import { AppContext } from "../../context/AppContext";
import { crearContextoMock } from "../../test/utils";

function renderConRuta(usuarioLogueado: boolean) {
  return render(
    <AppContext.Provider value={crearContextoMock({ usuarioLogueado })}>
      <MemoryRouter initialEntries={["/administrador"]}>
        <Routes>
          <Route path="/login" element={<div>Pantalla de Login</div>} />
          <Route path="/administrador" element={<ProtectorRutas />}>
            <Route index element={<div>Contenido protegido</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AppContext.Provider>,
  );
}

describe("routes/ProtectorRutas", () => {
  it("redirige a /login cuando el usuario no está logueado", () => {
    renderConRuta(false);
    expect(screen.getByText("Pantalla de Login")).toBeInTheDocument();
    expect(screen.queryByText("Contenido protegido")).not.toBeInTheDocument();
  });

  it("renderiza el contenido protegido cuando el usuario está logueado", () => {
    renderConRuta(true);
    expect(screen.getByText("Contenido protegido")).toBeInTheDocument();
    expect(screen.queryByText("Pantalla de Login")).not.toBeInTheDocument();
  });
});
