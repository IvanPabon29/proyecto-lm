import "./Encabezado.css";
import Logo from "../img/Logo-L_M.png";
import Usuario from "../img/img-usuario.png";
import Carrito from "../img/carrito-logo.png";
import avatar from "../img/avatar.png";
import botonAgregar  from "../img/boton-agregar.png";
import cerrarSesion from "../img/cerrar-sesion.png";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Cambia useHistory a useNavigate en react-router-dom v6
import { useUser } from "../pages/userContext"; // Para el manejo del contexto de usuario

function Encabezado() {
  const [abrir, setAbrir] = useState(false);
  const { setUser } = useUser(); // Accedemos al contexto del usuario
  const navigate = useNavigate(); // Para redirigir al login

  const toggleMenu = () => {
    setAbrir(!abrir);
  };

  const handleLogout = () => {
    // Limpiar el localStorage y el estado de usuario
    localStorage.removeItem("user");
    setUser(null);
    
    // Redirigir al login
    navigate("/");
  };

  return (
    <header>
      <div className="contenedor-header">
        <div className="contenedor-img-usuario">
          <img
            src={Usuario}
            className="img-perfil"
            title="Perfil"
            alt="Img-usuario"
            onClick={toggleMenu}
          />
          {abrir && (
            <div className="menu-perfil">
              <ul>
                <li>
                  <Link className="link" to="/mi-perfil">
                    <img src={avatar} className="avatar-perfil" alt="Perfil" title="Mi Perfil" /> Mi Perfil
                  </Link>
                </li>
                <li>
                  <Link className="link" to="/nuevo-usuario">
                    <img src={botonAgregar} className="boton-agregar" alt="agregar" title="Agregar Usuario" /> Agregar Nuevo Usuario
                  </Link>
                </li>
                <li>
                  {/* Botón para cerrar sesión */}
                  <Link className="link" onClick={handleLogout}>
                    <img src={cerrarSesion} className="cerrar-sesion" alt="Cerrar" title="Cerrar sesión" /> Cerrar Sesión
                  </Link> 
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Imagen con el nombre de la empresa */}
        <div className="contenedor-img-logo">
          <Link to="/home">
            <img
              src={Logo}
              className="imagen-logo"
              title="Home"
              alt="imagen-logo"
            />
          </Link>
          <Link to="/home"><h1 className="titulo-sistema">Sistema de Inventarios L&M</h1></Link>
        </div>
      </div>

      {/* Barra de navegación */}
      <nav>
        <ul className="nav-menu-horizontal">
          <li>
            <Link className="link">
              <strong>Registro de Entrada</strong>
            </Link>
            <ul className="menu-entrada">
              <li>
                <Link className="link" to="/registro-entrada/nuevo-producto">
                  <strong>
                    <small>Agregar Nuevo</small>
                  </strong>
                </Link>
              </li>
              <li>
                <Link className="link" to="/registro-entrada/producto-existente">
                  <strong>
                    <small>Agregar Existente</small>
                  </strong>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link className="link" to="/productos">
              <strong>Productos</strong>
            </Link>
          </li>
          <li>
            <Link className="link" to="/proveedores">
              <strong>Proveedores</strong>
            </Link>
          </li>
          <li>
            <Link className="link" to="/registros">
              <strong>Registros</strong>
            </Link>
          </li>
          <li>
            <Link className="link" to="/ventas">
              <img src={Carrito} className="carrito-logo" title="Ventas" alt="Carrito" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Encabezado;
