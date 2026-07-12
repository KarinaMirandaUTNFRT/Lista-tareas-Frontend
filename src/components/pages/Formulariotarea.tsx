import { useForm, type SubmitHandler } from "react-hook-form";
import type { TareaFormData } from "../../interfaces/tareas";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

interface FormularioTareaProps {
  titulo: string;
}

const FormularioTarea = ({ titulo }: FormularioTareaProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TareaFormData>();
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
  }, []);

  const onSubmit: SubmitHandler<TareaFormData> = (data, e) => {
    console.log(data);
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
    } else if (id) {
      editarTarea(id, data);
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
                placeholder="Ej: Diseño de sitio web institucional"
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
                  required: "La fecha es obligatoria",
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

export default FormularioTarea;