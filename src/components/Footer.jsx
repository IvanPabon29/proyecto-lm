import "./Footer.css";
import Facebook from "../img/facebook.png";
import Instagram from "../img/instagram.png";
import Whatsapp from "../img/whatsapp.png";

function Footer() {
  return (
    <footer>
      <p className="licencia">
        <small>
          <strong>Licencia Freeware 2024 &copy; </strong>
        </small>
      </p>

      {/* Div de Información */}
      <div className="contenedor-informacion">
        <h4>Contacto</h4>

        <div className="contacto">
          <a target="_blank" rel="noopener noreferrer" href="#">
            <img className="img-redes" src={Whatsapp} alt="logo-whatsapp" />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="#">
            <img className="img-redes" src={Facebook} alt="logo-Facebook" />
          </a>

          <a target="_blank" rel="noopener noreferrer" href="#">
            <img className="img-redes" src={Instagram} alt="logo-instagram" />
          </a>
        </div>

        <p className="acerca">
          <small>
            <strong>
              Esto es un sistema de Inventarios desarrollado bajo proyecto
              <br />
              formativo SENA, sin fines comerciales. ¡Disfrútalo!
            </strong>
          </small>
        </p>

        <p className="desarrollador">
          <small>
            <strong>
              Desarrollado por:{" "}
              <a target="_blank" href="#" rel="noopener noreferrer">
                Ivan Pabon
              </a>
            </strong>
          </small>
        </p>
      </div>

      <p className="version">
        <small>
          <strong>Versión 1.0</strong>
        </small>
      </p>
    </footer>
  );
}

export default Footer;
