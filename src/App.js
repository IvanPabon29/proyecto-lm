import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Encabezado from './components/Encabezado';
import Login from './pages/Login';
import Home from './pages/Home';
import AgregarNuevo from './pages/AgregarNuevo';
import AgregarExistente from './pages/AgregarExistente';
import Proveedores from './pages/Proveedores';
import Productos from './pages/Productos';
import Registros from './pages/Registros';
import Ventas from './pages/Ventas';
import NuevoUsuario from './pages/NuevoUsuario';
import MiPerfil from './pages/MiPerfil';
import NotFound from './pages/NotFound';
import { UserProvider } from "./pages/userContext"; //Para los datos de usuario.


function App() {
  return (
    <div className="App">
      <UserProvider> 
        <BrowserRouter>
          <Routes>
            {/* Ruta para el Login que no incluye el Encabezado ni el Footer */}
            <Route path="/" element={<Login />} />
            
            {/* Estructura principal con Encabezado y Footer */}
            <Route
              path="*" element={
                <>
                  <Encabezado />
                  <Routes>
                    
                    <Route path='/home' element={<Home />} />
                    <Route path='/mi-perfil' element={<MiPerfil />} />
                    <Route path='/nuevo-usuario' element={<NuevoUsuario />} />
                    <Route path='/registro-entrada/agregar-nuevo' element={<AgregarNuevo />} />
                    <Route path='/registro-entrada/agregar-existente' element={<AgregarExistente />} />
                    <Route path='/productos' element={<Productos />} />
                    <Route path='/proveedores' element={<Proveedores />} />
                    <Route path='/registros' element={<Registros />} />
                    <Route path='/ventas' element={<Ventas />} />
                    {/* Componente para cuando no se encuentra la ruta */}
                    <Route path="*" element={<NotFound />} />

                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;

