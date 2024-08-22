import "../styles/Home.css";
import Video from "../video/Fondo_video.mp4";

function Home() {
  return (
    <section id="inicio">
      <div className="overlay">
        <video autoPlay muted loop src={Video}></video>

        <div className="contenido">
          <h2>Lujos y Repuestos L&M</h2>

          {/* Misión */}
          <div className="mision">
            <h3>Misión</h3>
            <p>
              Nos especializamos en la venta de repuestos y lujos para
              motocicletas, entregando excelente servicio, los mejores productos
              y siendo competitivos en calidad y precios. Enviamos productos a
              todo el país.
            </p>
          </div>

          {/* Visión */}
          <div className="vision">
            <h3>Visión</h3>
            <p>
              Dentro de 10 años ser la mejor empresa importadora y
              comercializadora de repuestos y lujos en Colombia, brindando un
              excelente servicio en venta y post-venta, generando valor agregado
              para nuestros clientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
