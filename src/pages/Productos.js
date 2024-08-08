import "../styles/Productos.css";

function Productos() {
  return(
    <section id="stock">

      {/* Form de Buscador de Productos */}
      <form className="form-buscador">

        <label htmlFor="buscar-p">Buscar Producto:</label>
        <input type="search" id="buscar-p" placeholder="Buscar por ID/Nombre" name="search-producto" />
        <button type="submit" className="boton-buscar">Buscar</button>

      </form>

      





      

    </section>
  );
};
export default Productos;


{/* Preguntar a la IA que es mejor un form en vez del div o un form dentro del div */}
