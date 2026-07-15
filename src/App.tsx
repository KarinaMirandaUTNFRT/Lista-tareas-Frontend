import Inicio from "./components/pages/Inicio";
import Administrador from "./components/pages/Administrador";
import FormularioTarea from "./components/pages/Formulariotarea";
import Login from "./components/pages/Login";
import DetalleTarea from "./components/pages/DetalleTarea";
import Footer from "./components/shared/footer";
import Menu from "./components/shared/Menu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";
import type { tarea, tareaFormData } from "./interfaces/tareas";
import Error404 from "./components/pages/Error404";

function leerStorage<T>(
  storage: Storage,
  clave: string,
  valorPorDefecto: T,
): T {
  const guardado = storage.getItem(clave);
  if (guardado === null) {
    return valorPorDefecto;
  }
  try {
    return JSON.parse(guardado) as T;
  } catch (error) {
    console.error(
      `No se pudo leer "${clave}" del almacenamiento, se usará el valor por defecto`,
      error,
    );
    return valorPorDefecto;
  }
}

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState<boolean>(() =>
    leerStorage<boolean>(sessionStorage, "usuarioKey", false),
  );
  // agregamos los tareas
  const [tareas, setTareas] = useState<tarea[]>(() =>
    leerStorage<tarea[]>(localStorage, "tareasKey", []),
  );

  useEffect(() => {
    try {
      sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
    } catch (error) {
      console.error("No se pudo guardar la sesión del usuario", error);
    }
  }, [usuarioLogueado]);

  useEffect(() => {
    try {
      localStorage.setItem("tareasKey", JSON.stringify(tareas));
    } catch (error) {
      console.error("No se pudieron guardar las tareas", error);
    }
  }, [tareas]);

  // logicar para trabajar con los sercicios
  const crearTarea = (dataTarea: tareaFormData) => {
    const tareaNuevo: tarea = {
      ...dataTarea,
      id: crypto.randomUUID(),
    };
    setTareas([...tareas, tareaNuevo]);
  };

  const borrarTarea = (idTarea: string) => {
    const tareasFiltrados = tareas.filter(
      (itemTarea) => itemTarea.id !== idTarea,
    );
    setTareas(tareasFiltrados);
  };

  const editarTarea = (
    idTarea: string,
    tareaEditar: tareaFormData,
  ) => {
    const tareasEditados = tareas.map((itemTarea) => {
      if (itemTarea.id === idTarea) {
        return { ...itemTarea, ...tareaEditar };
      }
      return itemTarea;
    });
    setTareas(tareasEditados);
  };

  const buscarTarea = (idTarea: string): tarea | undefined => {
    return tareas.find((item) => item.id === idTarea);
  };

  return (
    <AppContext.Provider
      value={{
        usuarioLogueado,
        setUsuarioLogueado,
        tareas,
        crearTarea,
        borrarTarea,
        editarTarea,
        buscarTarea
      }}
    >
      <BrowserRouter>
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
          <Menu />
          <main className="container grow mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Inicio></Inicio>} />
              <Route path="/login" element={<Login></Login>} />
              <Route path="/tarea/:id" element={<DetalleTarea />} />
              <Route path="/administrador" element={<ProtectorRutas />}>
                <Route index element={<Administrador />} />
                <Route
                  path="crear"
                  element={
                    <FormularioTarea
                      titulo={"Crear Tarea"}
                    ></FormularioTarea>
                  }
                />
                <Route
                  path="editar/:id"
                  element={
                    <FormularioTarea
                      titulo={"Editar Tarea"}
                    ></FormularioTarea>
                  }
                />
              </Route>
              <Route path="*" element={<Error404></Error404>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;