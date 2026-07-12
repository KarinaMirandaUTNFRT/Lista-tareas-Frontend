import { useAppContext } from "../../context/AppContext";
import CardTarea from "../services/CardTarea";

const Inicio = () => {
  const { tareas } = useAppContext();
  return (
    <section className="w-full min-h-screen space-y-8 animate-fadeIn py-6 px-0">
      {/* Encabezado con estilo moderno */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4 text-center">
        <div className="w-full flex flex-col items-center justify-center mb-8 gap-2">
          <h1 className="text-3xl font-bold text-white tracking-tight text-center">
            Lista de  <span className="text-blue-500">Tareas</span>
          </h1>
          <p className="text-zinc-400 mt-1 text-sm text-center">
            Tareas para el mes de Agosto de 2026
          </p>
        </div> 

        <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 self-start md:self-center">
           {tareas.length} tareas disponibles
        </div>
      </div>
     {tareas.length > 0 ? (
        <div className="w-full flex flex-col gap-2">
          {tareas.map((tarea) => (
            <CardTarea key={tarea.id} tarea={tarea} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
          <i className="bi bi-search text-4xl text-zinc-700 mb-4"></i>
          <p className="text-zinc-500">No se encontraron tareas disponibles.</p>
        </div>
      )}
    </section>
  );
};

export default Inicio;