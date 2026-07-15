export const formatearFecha = (fecha?: Date | string): string =>
  fecha ? String(fecha).split("-").reverse().join("/") : "Sin fecha";

export const formatearFechaLarga = (fecha?: Date | string): string => {
  if (!fecha) return "Sin fecha";
  const fechaObj = new Date(fecha);
  return !isNaN(fechaObj.getTime())
    ? fechaObj.toLocaleDateString("es-AR", { timeZone: "UTC" })
    : "Sin fecha";
};
