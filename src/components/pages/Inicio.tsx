import CardTarea from "../services/CardTarea";

const Inicio = () => {
  return (
    <section className="space-y-8 animate-fadeIn">
      {/* Encabezado con estilo moderno */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-800 pb-5 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Ingreso de <span className="text-blue-500">Tareas</span>
          </h1>
          <p className="text-zinc-400 mt-1 text-sm">
           Ingresa las tareas 
          </p>
        </div>

        <div className="text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 self-start md:self-center">
          Tareas Disponibles
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CardTarea />
      </div>
    </section>
  );
};

export default Inicio;