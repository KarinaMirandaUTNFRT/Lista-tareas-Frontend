import { useParams, useNavigate, Link } from "react-router";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";

const DetalleTarea = () => {
    const { id } = useParams<{ id: string }>();
    const { buscarTarea } = useAppContext();
    const navigate = useNavigate();

    // Buscar el tarea por id
    const tarea = buscarTarea(id || '');

    useEffect(() => {
        if (!tarea) {
            // Si no existe el tarea, redirigir a 404
             navigate("/404", { replace: true });
        }
    }, [tarea, navigate]);

    if (!tarea) {
        return null; 
    }


    return (
        <div className="max-w-xl mx-auto bg-zinc-900 rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-3xl font-bold mb-4 text-center">{tarea.nombreTarea}</h2>
            <img
                src={tarea.imagen}
                alt={tarea.nombreTarea}
                className="w-full h-64 object-cover rounded mb-4 border border-zinc-700"
            />
            <p className="text-lg mb-2">
                <span className="font-semibold">Fecha:</span> ${tarea.precio.toLocaleString("es-AR")}
            </p>
            <p className="text-lg mb-2">
                <span className="font-semibold">Categoría:</span> {tarea.categoria}
            </p>
            <p className="mb-4">
                <span className="font-semibold">Descripción:</span> {tarea.descripcion}
            </p>
            <Link
                to="/"
                className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded"
            >
                Volver
            </Link>
        </div>
    );
};

export default DetalleTarea;