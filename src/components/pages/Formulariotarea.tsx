import { useForm, type SubmitHandler } from "react-hook-form";
import type { TareaFormData } from "../../interfaces/tareas";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import {
  MdOutlineDesktopWindows,
  MdOutlineAssignmentInd,
  MdOutlineDashboard,
  MdOutlineCellTower,
  MdConnectWithoutContact,
  MdDataUsage,
} from "react-icons/md";

interface FormularioTareaProps {
  titulo: string;
}
const iconosPorArea: Record<string, { Icono: any; color: string }> = {
  Ventas: {
    Icono: MdOutlineDesktopWindows,
    color: "text-emerald-400 bg-emerald-950/30 border-emerald-500/20",
  },
  Proveedores: {
    Icono: MdOutlineAssignmentInd,
    color: "text-amber-400 bg-amber-950/30 border-amber-500/20",
  },
  Marketing: {
    Icono: MdOutlineDashboard,
    color: "text-purple-400 bg-purple-950/30 border-purple-500/20",
  },
  Sistemas: {
    Icono: MdOutlineCellTower,
    color: "text-blue-400 bg-blue-950/30 border-blue-500/20",
  },
  "Atencion al Cliente": {
    Icono: MdConnectWithoutContact,
    color: "text-pink-400 bg-pink-950/30 border-pink-500/20",
  },
};
const FormularioTarea = ({ titulo }: FormularioTareaProps) => {
  const{
  register,
  handleSubmit,
  formState: { errors },
    setValue,
  watch,
  }= useForm<TareaFormData>();

const areaSeleccionada = watch("categoria");

const FormularioTarea = ({ titulo }: FormularioTareaProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TareaFormData>();

  const areaSeleccionada = watch("categoria");

  // traigo los datos que necesito del contexto
  const { crearTarea, buscarTarea, editarTarea } = useAppContext();
  // traer el id de la ruta
  const { id } = useParams<{ id: string }>();
  const navegacion = useNavigate();

  useEffect(() => {
    if (titulo.includes("Editar") && id && buscarTarea) {
      const tareaBuscada = buscarTarea(id);
      if (tareaBuscada) {
        setValue("nombreTarea", tareaBuscada.nombreTarea);
        setValue("fecha", tareaBuscada.fecha);
        setValue("categoria", tareaBuscada.categoria);
        setValue("descripcion", tareaBuscada.descripcion);
        setValue("imagen", tareaBuscada.imagen);
      }
    }
  }, [id, titulo, buscarTarea, setValue]);

  const onSubmit: SubmitHandler<TareaFormData> = (data, e) => {
    const datosConImagen = { ...data, imagen: "" };
    if (titulo.includes("Crear") && crearTarea) {
      crearTarea(data);
      Swal.fire({
        title: "Tarea creada",
        text: `La Tarea '${data.nombreTarea}' fue creado correctamente`,
        icon: "success",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#3b82f6",
      });
      if (e) {
        (e.target as HTMLFormElement).reset();
      }
    } else if (id && editarTarea) {
      editarTarea(id, datosConImagen);
      Swal.fire({
        title: "Tarea editada",
        text: `La Tarea '${data.nombreTarea}' fue editado correctamente`,
        icon: "success",
        background: "#18181b",
        color: "#f4f4f5",
        confirmButtonColor: "#3b82f6",
      });
      navegacion("/administrador");
    }
  };

  // Clase utilitaria para inputs
  const inputClass = (hasError: boolean) => `
    w-full px-4 py-2.5 bg-zinc-950 border rounded-lg text-zinc-100 
    focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all
    ${hasError ? "border-red-500" : "border-zinc-700"}
  `;

  return (
    <section className="max-w-4xl mx-auto animate-fadeIn">
      <div className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 border-b border-zinc-800 pb-4">
          {titulo}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre del Tarea */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Nombre del Tarea*
              </label>
              <input
                type="text"
                placeholder="Ej: completar planilla exel"
                className={inputClass(!!errors.nombreTarea)}
                {...register("nombreTarea", {
                  required: "El nombre es obligatorio",
                  minLength: { value: 5, message: "Mínimo 5 caracteres" },
                  maxLength: { value: 100, message: "Máximo 100 caracteres" },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.nombreTarea?.message}
              </p>
            </div>

            {/* Fecha */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Fecha*
              </label>
              <input
                type="date"
                placeholder="Ej: 2026-10-05"
                className={inputClass(!!errors.fecha)}
                {...register("fecha", {
                  required: "El fecha es obligatorio",
                  valueAsNumber: true,
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.fecha?.message}
              </p>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Categoría*
              </label>
              <select
                className={inputClass(!!errors.categoria)}
                {...register("categoria", {
                  required: "Seleccione una categoría",
                })}
              >
                <option value="" className="bg-zinc-900">
                  Seleccione una opción
                </option>
                <option value="Ventas" className="bg-zinc-900">
                  Ventas
                </option>
                <option value="Proveedores" className="bg-zinc-900">
                  Proveedores
                </option>
                <option value="Marketing" className="bg-zinc-900">
                  Marketing
                </option>
                <option value="Sistemas" className="bg-zinc-900">
                  Sistemas
                </option>
                <option value="Atencion al Cliente" className="bg-zinc-900">
                  Atencion al Cliente
                </option>
              </select>
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.categoria?.message}
              </p>
            </div>

            {/* URL Imagen */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Identificador Visual de Área
              </label>
              {areaSeleccionada && iconosPorArea[areaSeleccionada] ? (
                (() => {
                  const { Icono, color } = iconosPorArea[areaSeleccionada];
                  return (
                    <div
                      className={`w-full h-13 rounded-lg border flex items-center justify-center gap-3 transition-all duration-300 ${color}`}
                    >
                      <Icono className="w-6 h-6 animate-pulse" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-zinc-200">
                        Ícono de {areaSeleccionada} Vinculado
                      </span>
                    </div>
                  );
                })()
              ) : (
                <div className="w-full h-13 rounded-lg border border-dashed border-zinc-700 bg-zinc-950/40 flex items-center justify-center text-sm text-zinc-500 italic select-none">
                  Selecciona una categoría arriba para vincular su ícono
                  automáticamente
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Descripción*
              </label>
              <textarea
                rows={4}
                placeholder="Describa el Tarea detalladamente..."
                className={inputClass(!!errors.descripcion)}
                {...register("descripcion", {
                  required: "La descripción es obligatoria",
                  minLength: { value: 10, message: "Mínimo 10 caracteres" },
                  maxLength: { value: 500, message: "Máximo 500 caracteres" },
                })}
              />
              <p className="text-red-500 text-xs mt-1 italic">
                {errors.descripcion?.message}
              </p>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg shadow-blue-900/20"
            >
              Guardar tarea
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
};
export default FormularioTarea;
