import "../styles/AgregarExistente.css";

function AgregarExistente() {
  /*Esto Se puede Hacer mas facil reutilizando el component de AGREGAR NUEVO, 
  ya que si se puede agregar un el elmento dentro del ELEMENTO utilizando (Children) 
  El buscar se puede crear aparte y reutilizarlo*/

  return (
    <section id="registro-entrada-existente">

      {/* Form de busqueda */}
      <form className="form-buscar">

        <label htmlFor="buscar">Buscar Producto:</label>
        <input type="search"id="buscar" placeholder="Buscar por ID/Nombre" name="buscar-producto" />

        <button className="boton-search">Buscar</button>

      </form>

      {/* Formulario para los productos */}
      <form className="form-entrada-existente">
        <fieldset>
          <legend>
            <strong>Registro de productos Existentes</strong>
          </legend>

          <label htmlFor="imagen">Seleccione la Imagen:</label>
          <input
            type="file"
            accept=".jpg,.png,.svg"
            id="imagen"
            name="imagen-producto"
            required
          />

          <br />

          <label htmlFor="proveedor">Id Proveedor:</label>
          <input
            type="text"
            id="proveedor"
            placeholder="Ingrese el Id"
            name="id-proveedor"
            required
          />

          <label htmlFor="usuario">Id Usuario:</label>
          <input
            type="text"
            id="usuario"
            placeholder="Ingrese el Id"
            name="id-usuario"
            required
          />

          <br />

          <label htmlFor="producto">Id Producto:</label>
          <input
            type="text"
            id="producto"
            placeholder="#"
            name="id-producto"
            required
          />

          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre del producto"
            name="nombre-producto"
            required
          />

          <br />

          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            placeholder="Ingrese el Modelo"
            name="modelo-producto"
            required
          />

          <label htmlFor="descripcion">Descripcion:</label>
          <textarea
            type="text"
            id="descripcion"
            placeholder="Descripcion del Producto"
            name="des-producto"
            required
          />

          <br />

          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Ingrese la cantidad"
            name="cantidad"
            required
          />

          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            placeholder="Precio unidad"
            name="precio-unidad"
            required
          />

          <div className="contenedor-botones-entrada">
            <button
              type="reset"
              className="botones-entrada boton-reset"
              value="Limpiar"
            >
              Limpiar
            </button>

            <button
              type="submit"
              className="botones-entrada boton-submit"
              value="Registrar"
            >
              Registrar
            </button>
          </div>
        </fieldset>
      </form>
    </section>
  );
}

export default AgregarExistente;
