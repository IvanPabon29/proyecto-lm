import "../styles/Login.css";
import imagenLogo from "../img/Logo-L_M.png";
import { loginUsuario } from "../api/userApi"; // Importa la función loginUsuario
import { useNavigate } from "react-router-dom";
import { useUser } from "./userContext"; // Importar el contexto de usuario


function Login() {
  const navegacion = useNavigate();
  const { setUser } = useUser(); // Obtener la función setUser del contexto

  // Manejador del login.
  const handleLogin = async (e) => {
    e.preventDefault();
  
    const usuario = e.target.elements.usuario.value;
    const contraseña = e.target.elements.contraseña.value;
  
    try {
      const data = await loginUsuario(usuario, contraseña);
  
      if (data.message === 'Login Exitoso') {
        setUser(data.user); // Guardar los datos del usuario en el contexto
        navegacion('/home'); // Redirige a la página principal
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error!, Usuario o Contraseña Incorrecta, Intente de Nuevo.');
    }
  };  

  return (
    <section id="login">
      {/* Formulario */}
      <form className="login-form" onSubmit={handleLogin}>
        <fieldset>
          <img
            src={imagenLogo}
            className="img-login"
            title="Logo-LM"
            alt="Logo-L_M"
          />
          <h3>
            <strong>Sistema de Inventarios L&M</strong>
          </h3>

          <legend>
            <strong>Iniciar Sesión</strong>
          </legend>

          {/* Inputs */}
          <div className="contenedor-form">
            <label htmlFor="usuario">Iniciar Sesión</label>
            <input
              type="text"
              id="usuario"
              name="idUsuario"
              placeholder="Ingresa el ID"
              required
            />

            <br />

            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="Ingresa tu contraseña"
              required
            />
            <a target="_blank" rel="noreferrer" href="#">
              <small>¿Olvide mi contraseña?</small>
            </a>
          </div>

          {/* Botones */}
          <div className="contenedor-botones">
            <button
              className="botones boton-limpiar"
              type="reset"
              value="LIMPIAR"
            >
              LIMPIAR
            </button>
            <button
              className="botones boton-enviar"
              type="submit"
              value="INGRESAR"
            >
              INGRESAR
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default Login;
