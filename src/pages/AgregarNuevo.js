import "../styles/AgregarNuevo.css";

function AgregarNuevo({claseSeccion, claseFormulario}) {
  return(
    <section id="registro-entrada-nuevo">

      <form className="form-entrada-nuevo">
        <fieldset>
          <legend><strong>Registro de productos nuevos</strong></legend>
      
          <label htmlFor="imagen">Seleccione la Imagen:</label>
          <input type="file" accept=".jpg,.png,.svg" id="imagen" name="imagen-producto" required />

          <br/>

          <label htmlFor="proveedor">Id Proveedor:</label>
          <input type="text" id="proveedor" placeholder="Ingrese el Id" name="id-proveedor" required />

          <label htmlFor="usuario">Id Usuario:</label>
          <input type="text" id="usuario" placeholder="Ingrese el Id" name="id-usuario"   required />
          
          <br/>

          <label htmlFor="producto">Id Producto:</label>
          <input type="text" id="producto" placeholder="#" name="id-producto" required />

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" placeholder="Nombre del producto" name="nombre-producto" required />

          <br/>

          <label htmlFor="modelo">Modelo:</label>
          <input type="text" id="modelo" placeholder="Ingrese el Modelo" name="modelo-producto" required />

          <label htmlFor="descripcion">Descripcion:</label>
          <textarea type="text" id="descripcion" placeholder="Descripcion del Producto" name="des-producto" required />
 
          <br/>

          <label htmlFor="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" placeholder="Ingrese la cantidad" name="cantidad" required />

          <label htmlFor="precio">Precio:</label>
          <input type="number" id="precio" placeholder="Precio unidad" name="precio-unidad" required />

          <div className="contenedor-botones-entrada">
            <button type="reset" className="botones-entrada boton-reset" value="Limpiar">Limpiar</button>

            <button type="submit" className="botones-entrada boton-submit" value="Registrar">Registrar</button>

          </div>
        
        </fieldset>

      </form>

    </section>

  );

};

export default AgregarNuevo;