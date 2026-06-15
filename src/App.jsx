import Footer from "./components/Footer";
import FormularioTarea from "./components/FormularioTarea";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main className="container my-3">
        <h1 className="text-center">Administrar Tareas</h1>
        <div>
          <FormularioTarea></FormularioTarea>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
