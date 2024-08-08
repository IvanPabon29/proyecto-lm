import "../styles/Home.css";
import Video from "../video/Fondo_video.mp4";

function Home() {
  return(
    <section id="inicio">
      
      <video autoPlay muted loop src={Video} ></video>

      <h2>Lujos y Repuestos L&M</h2>

      {/*  mision */}
      <div className="mision">
        <h3>Mision</h3>
        <p>Nos especializamos en la venta de repuestos y lujos para motocicletas, Entregando excelente servicio, mejores productos y siendo competitivo en calidad y precios. Enviando productos al todo el país</p>
      </div>

        {/* vision */}
      <div className="vision">
        <h3>Vision</h3>
        <p>Dentro de 10 años ser la mejor empresa importadora y comercializadora de repuestos y lujos en Colombia, brindando un excelente servicio en venta y post venta, generando valor agregado para nuestros clientes</p>
      </div>

    </section>
  );
};

export default Home;