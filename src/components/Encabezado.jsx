import "./Encabezado.css";
import Logo from "../img/Logo-L_M.png";
import Usuario from "../img/img-usuario.png";
import Carrito from "../img/carrito-logo.png";
import avatar from "../img/avatar.png";
import botonAgregar  from "../img/boton-agregar.png";
import cerrarSesion from "../img/cerrar-sesion.png";
import { useState } from "react";
import { Link } from "react-router-dom";

function Encabezado() {
  // Creamos un estado para controlar la visisbilidad del menu
  const [abrir, setAbrir] = useState(false);

  // Para abrir y cerrar el menu.
  const toggleMenu = () => {
    setAbrir(!abrir);
  };
  

  return (
    <header>
      <div className="contenedor-header">

        {/* Aqui va el boton de menu del perfil */}
        <div className="contenedor-img-usuario">
          <img
            src={Usuario}
            className="img-perfil"
            title="Perfil"
            alt="Img-usuario"
            onClick={toggleMenu}
          />
          
          {/* Aqui cuando se de click se llama la funcion de abrir el menu*/}
          {abrir && (
            <div className="menu-perfil">
              <ul>
                <li>
                  <Link className="link" to="/mi-perfil"><img src={avatar} className="avatar-perfil" alt="Perfil" title="Mi Perfil" /> Mi Perfil</Link>
                </li>
                <li>
                  <Link className="link" to="/nuevo-usuario"><img src={botonAgregar} className="boton-agregar" alt="agregar" title="Agregar Usuario" /> Agregar Nuevo Usuario</Link>
                </li>
                <li>
                  <Link className="link" to="/"><img src={cerrarSesion} className="cerrar-sesion" alt="Cerrar" title="Cerrar sesion" /> Cerrar Sesion</Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Aqui va la imagen con el nombre de la empresa */}
        <div className="contendor-img-logo">
          <Link to="/home">
            <img
              src={Logo}
              className="imagen-logo"
              title="Home"
              alt="imagen-logo"
            />
          </Link>
          <h1 className="titulo">Sistema de Inventarios L&M</h1>
        </div>
      </div>

      {/* Barra de navegacion */}
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
              <strong>Productos </strong>
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
              <img
                src={Carrito}
                className="carrito-logo"
                title="Ventas"
                alt="Carrito"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Encabezado;
