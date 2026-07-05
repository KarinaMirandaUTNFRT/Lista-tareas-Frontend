import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error404 from "./components/pages/Error404";
import Administrador from "./components/pages/Administrador";
import Login from "./components/pages/Login";
import Footer from "./components/shared/footer";
import Menu from "./components/shared/Menu";

import Inicio from "./components/pages/Inicio";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Menu />
        <main className="container mx-auto">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/administrador" element={<Administrador></Administrador>}/>
            <Route path="*" element={<Error404></Error404>}/>
          </Routes>
          {/*  */}
          {/* <Error404></Error404> */}
          {/* <Login></Login> */}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;