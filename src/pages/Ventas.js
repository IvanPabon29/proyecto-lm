import "../styles/Ventas.css";

function Ventas() {
  return(
    <section id="ventas">

      <div className="contr-titulo-ventas">
        <h1 className="titulo-ventas">Ventas</h1>
      </div>
      
      <div className="contenedor-ventas">



      
        <div className="contenedor-boton-ventas">
          <button className="botones-ventas">Pagar Ahora</button>
          <button className="botones-ventas">Quitar Productos</button>
        </div>

      </div>

    </section>
  );
};

export default Ventas;