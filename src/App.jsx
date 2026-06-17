import 'bootstrap/dist/css/bootstrap.min.css'
import Footer from "./components/footer";
import Navbar from "./components/Navbar";
import FormularioColor from './components/FormularioColor';
function App() {
  return (
    <>
    <Navbar></Navbar>
    <main>
       <h1 className='text-center'>Lista de Colores</h1>
       <h2 className='text-center'>Escribi un color para agregar en la lista (en ingles)</h2>
       <FormularioColor/>
    </main>
     
      <Footer />
    </>
  );
}

export default App;
