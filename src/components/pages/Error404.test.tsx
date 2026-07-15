import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Error404 from "./Error404";

describe("pages/Error404", () => {
  it("muestra el mensaje de página no encontrada y el enlace de vuelta", () => {
    render(
      <MemoryRouter>
        <Error404 />
      </MemoryRouter>,
    );
    expect(screen.getByText(/pagina no encontrada 404/i)).toBeInTheDocument();
    const enlace = screen.getByRole("link", { name: /vuelve al inicio/i });
    expect(enlace).toHaveAttribute("href", "/");
    expect(screen.getByAltText("Error 404")).toBeInTheDocument();
  });
});
