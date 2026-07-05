import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import FormularioTarea from './components/FormularioTarea';

function App() {
  return (
    <>
      <Navbar></Navbar>
      
      
      <main className="container my-5">
        <h2 className="text-center mb-4 text-secondary">Lista tarea</h2>
        
        
        <FormularioTarea />
      </main>
      
      <Footer />
    </>
  );
}

export default App;