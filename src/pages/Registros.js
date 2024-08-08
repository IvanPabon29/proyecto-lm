import "../styles/Registros.css";

function Registros() {
  return(
    <section id="registros">

      <div className="contr-titulo">
        <h1 className="titulo-registro">Registros</h1>
      </div>

      <div className="contenedor-list-registro">

        {/* Filtrar por fecha */}
        <div className="contenedor-filtro">

          <h1 className="t-filtrar">Filtrar</h1>

          <label id="fechaInicio">Fecha Inicio:</label>
          <input type="date" id="fechaInicio" name="fecha-inicio" />

          <label id="fechaFin">Fecha Fin:</label>
          <input type="date" id="fechaFin" name="fecha-fin" />

        </div>

        {/* Tabla de registros */}
        <table className="tabla">
          <thead>
            <tr>
              <th>Id Producto</th>
              <th>Nombre de Producto</th>
              <th>Fecha (DD/MM/AA)</th>
              <th>Cantidad</th>
              <th>Tipo Accion</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#13342</td>
              <td>Bombillo led</td>
              <td>20/06/2024</td>
              <td>5</td>
              <td>Venta</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>#12144</td>
              <td>Espesjo Nkd 125</td>
              <td>22/06/2024</td>
              <td>10</td>
              <td>Ingreso</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
          
        </table>

      </div> 

    </section>

  );
};

export default Registros;