import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "./navbar";

describe("shared/Navbar", () => {
  it("muestra la marca y los enlaces de navegación", () => {
    render(<Navbar />);
    expect(screen.getByText("Lista de tareas")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dropdown")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Tema" })).toBeInTheDocument();
  });
});
