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
import ModificarPerfil from './pages/ModificarPerfil';
import ModificarContraseña from './pages/ModificarContraseña';
import NotFound from './pages/NotFound';
import { UserProvider } from "./pages/userContext"; //Para los datos de usuario.
import { CartProvider } from './pages/cartContext'; // Para el carrito de ventas.
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
        
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
                      
                      <Route path='/home' element={<PrivateRoute><Home /></PrivateRoute>} />
                      <Route path='/mi-perfil' element={<PrivateRoute><MiPerfil /></PrivateRoute>} />
                      <Route path='/mi-perfil/modificar-perfil' element={<PrivateRoute><ModificarPerfil /></PrivateRoute>} />
                      <Route path='/mi-perfil/modificar-clave' element={<PrivateRoute><ModificarContraseña /></PrivateRoute>} />
                      <Route path='/nuevo-usuario' element={<PrivateRoute><NuevoUsuario /></PrivateRoute>} />
                      <Route path='/registro-entrada/nuevo-producto' element={<PrivateRoute><AgregarNuevo /></PrivateRoute>} />
                      <Route path='/registro-entrada/producto-existente' element={<PrivateRoute><AgregarExistente /></PrivateRoute>} />
                      <Route path='/productos' element={<PrivateRoute><Productos /></PrivateRoute>} />
                      <Route path='/proveedores' element={<PrivateRoute><Proveedores /></PrivateRoute>} />
                      <Route path='/registros' element={<PrivateRoute><Registros /></PrivateRoute>} />
                      <Route path='/ventas' element={<PrivateRoute><Ventas /></PrivateRoute>} />
                      {/* Componente para cuando no se encuentra la ruta */}
                      <Route path="*" element={<NotFound />} />

                    </Routes>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider> 
      </UserProvider>
    </div>
  );
}

export default App;

