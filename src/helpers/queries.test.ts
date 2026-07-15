import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  listarTareasApi,
  buscarTareaApi,
  crearTareaApi,
  editarTareaApi,
  borrarTareaApi,
} from "./queries";
import type { Tarea } from "../interfaces/tareas";

const BASE_URL = "https://api.example.com/tareas";

const tareaMock: Tarea = {
  id: "1",
  nombreTarea: "Completar informe",
  fecha: new Date("2026-08-01"),
  categoria: "Sistemas",
  descripcion: "Terminar el informe mensual",
  prioridad: "alta",
};

describe("helpers/queries", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("listarTareasApi", () => {
    it("hace un GET a la URL base y devuelve la respuesta", async () => {
      const respuesta = { ok: true } as Response;
      const fetchMock = vi.fn().mockResolvedValue(respuesta);
      vi.stubGlobal("fetch", fetchMock);

      const resultado = await listarTareasApi();

      expect(fetchMock).toHaveBeenCalledWith(BASE_URL);
      expect(resultado).toBe(respuesta);
    });

    it("propaga el error cuando fetch falla", async () => {
      const error = new Error("network down");
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));

      await expect(listarTareasApi()).rejects.toThrow("network down");
      expect(console.error).toHaveBeenCalledWith(error);
    });
  });

  describe("buscarTareaApi", () => {
    it("hace un GET a la URL con el id", async () => {
      const respuesta = { ok: true } as Response;
      const fetchMock = vi.fn().mockResolvedValue(respuesta);
      vi.stubGlobal("fetch", fetchMock);

      const resultado = await buscarTareaApi("42");

      expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/42`);
      expect(resultado).toBe(respuesta);
    });

    it("propaga el error cuando fetch falla", async () => {
      const error = new Error("not found");
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));

      await expect(buscarTareaApi("42")).rejects.toThrow("not found");
    });
  });

  describe("crearTareaApi", () => {
    it("hace un POST con el cuerpo y las cabeceras correctas", async () => {
      const respuesta = { ok: true } as Response;
      const fetchMock = vi.fn().mockResolvedValue(respuesta);
      vi.stubGlobal("fetch", fetchMock);

      const resultado = await crearTareaApi(tareaMock);

      expect(fetchMock).toHaveBeenCalledWith(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaMock),
      });
      expect(resultado).toBe(respuesta);
    });

    it("propaga el error cuando fetch falla", async () => {
      const error = new Error("bad request");
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));

      await expect(crearTareaApi(tareaMock)).rejects.toThrow("bad request");
    });
  });

  describe("editarTareaApi", () => {
    it("hace un PUT a la URL con el id y el cuerpo correctos", async () => {
      const respuesta = { ok: true } as Response;
      const fetchMock = vi.fn().mockResolvedValue(respuesta);
      vi.stubGlobal("fetch", fetchMock);

      const resultado = await editarTareaApi("7", tareaMock);

      expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/7`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tareaMock),
      });
      expect(resultado).toBe(respuesta);
    });

    it("propaga el error cuando fetch falla", async () => {
      const error = new Error("conflict");
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));

      await expect(editarTareaApi("7", tareaMock)).rejects.toThrow("conflict");
    });
  });

  describe("borrarTareaApi", () => {
    it("hace un DELETE a la URL con el id", async () => {
      const respuesta = { ok: true } as Response;
      const fetchMock = vi.fn().mockResolvedValue(respuesta);
      vi.stubGlobal("fetch", fetchMock);

      const resultado = await borrarTareaApi("9");

      expect(fetchMock).toHaveBeenCalledWith(`${BASE_URL}/9`, {
        method: "DELETE",
      });
      expect(resultado).toBe(respuesta);
    });

    it("propaga el error cuando fetch falla", async () => {
      const error = new Error("server error");
      vi.stubGlobal("fetch", vi.fn().mockRejectedValue(error));

      await expect(borrarTareaApi("9")).rejects.toThrow("server error");
    });
  });
});
