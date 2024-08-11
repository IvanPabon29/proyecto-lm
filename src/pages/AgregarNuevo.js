// frontend/components/AgregarNuevo.js
import React, { useState } from "react";
import { registrarProducto } from "../api/productoApi";
import "../styles/AgregarNuevo.css";

function AgregarNuevo() {
  // Estado para manejar los datos del formulario
  const [formDatos, setFormDatos] = useState({
    imagen: null, // Para el manejo de la imagen
    idProveedor: "",
    idUsuario: "",
    idProducto: "",
    nombre: "",
    modelo: "",
    descripcion: "",
    cantidad: "",
    precio: "",
  });

  // Manejador del cambio de input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: files ? files[0] : value,
    });
  };

  // Manejador del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un FormData para enviar la imagen y otros datos
    const formData = new FormData();
    if (formDatos.imagen) {
      formData.append("imagen", formDatos.imagen);
    }
    formData.append("idProveedor", formDatos.idProveedor);
    formData.append("idUsuario", formDatos.idUsuario);
    formData.append("idProducto", formDatos.idProducto);
    formData.append("nombre", formDatos.nombre);
    formData.append("modelo", formDatos.modelo);
    formData.append("descripcion", formDatos.descripcion);
    formData.append("cantidad", formDatos.cantidad);
    formData.append("precio", formDatos.precio);

    try {
      const response = await registrarProducto(formData);
      console.log("Producto registrado:", response);
      alert(`Producto ${formDatos.nombre} registrado con éxito`);
      // Resetear el formulario después de registrar el producto
      setFormDatos({
        imagen: null,
        idProveedor: "",
        idUsuario: "",
        idProducto: "",
        nombre: "",
        modelo: "",
        descripcion: "",
        cantidad: "",
        precio: "",
      });
    } catch (error) {
      console.error("Error registrando el producto:", error.message);
      alert("¡Error al registrar el producto! Intente de nuevo");
    }
  };

  return (
    <section id="registro-entrada-nuevo">
      <form
        className="form-entrada-nuevo"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <fieldset>
          <legend>
            <strong>Registro de productos nuevos</strong>
          </legend>

          <label htmlFor="imagen-">Seleccione la Imagen:</label>
          <input
            type="file"
            accept=".jpg,.png,.svg"
            id="imagen-"
            name="imagen"
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="proveedor">Id Proveedor:</label>
          <input
            type="number"
            id="proveedor"
            placeholder="Ingrese el Id"
            name="idProveedor"
            value={formDatos.idProveedor}
            onChange={handleChange}
            required
          />

          <label htmlFor="usuario">Id Usuario:</label>
          <input
            type="number"
            id="usuario"
            placeholder="Ingrese el Id"
            name="idUsuario"
            value={formDatos.idUsuario}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="producto">Id Producto:</label>
          <input
            type="text"
            id="producto"
            placeholder="#"
            name="idProducto"
            value={formDatos.idProducto}
            onChange={handleChange}
            required
          />

          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre del producto"
            name="nombre"
            value={formDatos.nombre}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="modelo">Modelo:</label>
          <input
            type="text"
            id="modelo"
            placeholder="Ingrese el Modelo"
            name="modelo"
            value={formDatos.modelo}
            onChange={handleChange}
            required
          />

          <label htmlFor="descripcion">Descripcion:</label>
          <textarea
            type="text"
            id="descripcion"
            placeholder="Descripcion del Producto"
            name="descripcion"
            value={formDatos.descripcion}
            onChange={handleChange}
            required
          />

          <br />

          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            placeholder="Ingrese la cantidad"
            name="cantidad"
            value={formDatos.cantidad}
            onChange={handleChange}
            required
          />

          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            placeholder="Precio unidad"
            name="precio"
            value={formDatos.precio}
            onChange={handleChange}
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

export default AgregarNuevo;
