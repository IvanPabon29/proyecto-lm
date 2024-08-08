import "../styles/MiPerfil.css";
import Imagen from "../img/nuevo-usuario.png";
import { useUser } from "./userContext";

function MiPerfil() {

  const { user } = useUser();

  // Si el usuario no está autenticado, puedes redirigirlo o mostrar un mensaje de error
  if (!user) {
    return <div className="no-sesion">No has iniciado sesión</div>; 
  }

  return (
    <section id="mi-perfil">
      <h1 className="titulo-perfil">Mi Perfil</h1>
      <div className="contenedor-perfil">
        <img
          className="imagen-perfil"
          src={Imagen}
          alt="ImgUsuario"
          title="Usuario"
        />
        <p>
          Nombre: <strong>{user.nombre}</strong>
        </p>
        <p>
          Apellido: <strong>{user.apellido}</strong>
        </p>
        <p>
          Rol: <strong>{user.rol}</strong>
        </p>
        <p>
          Correo: <strong>{user.correo}</strong>
        </p>
        <p>
          Teléfono: <strong>{user.telefono}</strong>
        </p>
        <div className="cont-boton">
          <button className="button-perfil">Modificar Perfil</button>
          <button className="button-perfil">Cambiar Contraseña</button>
        </div>
      </div>
    </section>
  );
}

export default MiPerfil;
