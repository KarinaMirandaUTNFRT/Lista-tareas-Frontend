import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FormularioColor from './components/FormularioColor';

function App() {
  return (
    <>
      <Navbar></Navbar>
      
      
      <main className="container my-5">
        <h2 className="text-center mb-4 text-secondary">Paleta de Colores</h2>
        
        
        <FormularioColor />
      </main>
      
      <Footer />
    </>
  );
}

export default App;