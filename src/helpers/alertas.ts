import Swal from "sweetalert2";
import type { SweetAlertOptions, SweetAlertResult } from "sweetalert2";

const temaBase: SweetAlertOptions = {
  background: "#18181b", // zinc-900
  color: "#f4f4f5", // zinc-100
};

const AZUL = "#3b82f6"; // blue-500
const ROJO = "#ef4444"; // red-500

export const alertaExito = (
  title: string,
  text: string,
): Promise<SweetAlertResult> =>
  Swal.fire({
    ...temaBase,
    title,
    text,
    icon: "success",
    confirmButtonColor: AZUL,
  });

export const alertaError = (
  title: string,
  text: string,
): Promise<SweetAlertResult> =>
  Swal.fire({
    ...temaBase,
    title,
    text,
    icon: "error",
    confirmButtonColor: ROJO,
  });

export const alertaConfirmacion = (
  title: string,
  text: string,
  confirmButtonText = "Sí, borrar",
  cancelButtonText = "Cancelar",
): Promise<SweetAlertResult> =>
  Swal.fire({
    ...temaBase,
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: AZUL,
    cancelButtonColor: ROJO,
    confirmButtonText,
    cancelButtonText,
  });
