import Footer from "./components/Footer";
import FormularioTarea from "./components/FormularioTarea";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <main className="container my-3">
        <h1 className="text-center">Lista de Colores</h1>
        <h2 className="text-center">Ingresa un color (en ingles)</h2>
        <div>
          <FormularioTarea></FormularioTarea>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
