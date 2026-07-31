import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { AppContext, useAppContext } from "./AppContext";
import { crearContextoMock } from "../test/utils";

describe("context/AppContext", () => {
  it("lanza un error cuando useAppContext se usa fuera de un AppProvider", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useAppContext())).toThrow(
      "useAppContext debe usarse dentro de un AppProvider",
    );
    vi.restoreAllMocks();
  });

  it("devuelve el valor del contexto cuando se usa dentro del AppProvider", () => {
    const valor = crearContextoMock({ usuarioLogueado: true });
    const { result } = renderHook(() => useAppContext(), {
      wrapper: ({ children }) => (
        <AppContext.Provider value={valor}>{children}</AppContext.Provider>
      ),
    });

    expect(result.current).toBe(valor);
    expect(result.current.usuarioLogueado).toBe(true);
  });
});
