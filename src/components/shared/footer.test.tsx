import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./footer";

describe("shared/Footer", () => {
  afterEach(() => vi.useRealTimers());

  it("muestra el nombre de la empresa y los enlaces", () => {
    render(<Footer />);
    expect(screen.getByText("Mi Empresa SRL")).toBeInTheDocument();
    expect(screen.getByText("Privacidad")).toBeInTheDocument();
    expect(screen.getByText("Términos")).toBeInTheDocument();
    expect(screen.getByText("Contacto")).toBeInTheDocument();
  });

  it("muestra el año actual", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2030-01-01T00:00:00Z"));
    render(<Footer />);
    expect(screen.getByText(/2030/)).toBeInTheDocument();
  });
});
