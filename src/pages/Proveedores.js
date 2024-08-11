import "../styles/Proveedores.css";
import LogoProveedores from "../img/logo-proveedor.png";
import Eliminar from "../img/eliminar.png";
import { useState, useEffect } from "react";
import {
  registrarProveedor,
  obtenerProveedores,
  eliminarProveedor,
} from "../api/proveedoresApi";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  // Manejedo de los datos del formulario.
  const [formDatos, setFormDatos] = useState({
    idProveedor: "",
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
    productos: "",
  });

  useEffect(() => {
    // Obtener la lista de proveedores al cargar el componente
    const fetchProveedores = async () => {
      const data = await obtenerProveedores();
      setProveedores(data);
    };

    fetchProveedores();
  }, []);

  // Manejador del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
    });
  };

  // Manejar las respuestas.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registrarProveedor(formDatos);
      // Actualizar la lista de proveedores después de agregar uno nuevo
      const data = await obtenerProveedores();
      setProveedores(data);
      // Limpiar el formulario
      setFormDatos({
        idProveedor: "",
        nombre: "",
        apellido: "",
        correo: "",
        telefono: "",
        direccion: "",
        productos: "",
      });
    } catch (error) {
      console.error("Error al registrar el proveedor:", error);
      alert("¡ERROR! Intente de nuevo");
    }
  };

  // Eliminar proveedores
  const handleEliminar = async (idProveedor) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar este proveedor ? `
    );
    if (confirmar) {
      try {
        await eliminarProveedor(idProveedor);
        const data = await obtenerProveedores();
        setProveedores(data);
      } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        alert("¡ERROR! Intente de nuevo");
      }
    }
  };

  return (
    <section id="proveedores">
      {/* Parte de agregar proveedores */}
      <div className="contenedor-agregar">
        {/* Titulo */}
        <h1 className="titulo-proveedor">Registrar Proveedores</h1>
        <form className="form-proveedores" onSubmit={handleSubmit}>
          <div className="div-1">
            <label htmlFor="proveedor">Id Proveedor:</label>
            <input
              type="number"
              id="proveedor"
              inputMode="numeric"
              placeholder="Ingrese el Id"
              name="idProveedor"
              value={formDatos.idProveedor}
              onChange={handleChange}
              required
            />
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombre"
              name="nombre"
              value={formDatos.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-2">
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              placeholder="Apellido"
              name="apellido"
              value={formDatos.apellido}
              onChange={handleChange}
              required
            />
            <label htmlFor="correo">Correo:</label>
            <input
              type="email"
              id="correo"
              placeholder="@proveedor.com"
              name="correo"
              value={formDatos.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-3">
            <label htmlFor="celular">Telefono:</label>
            <input
              type="number"
              id="celular"
              placeholder="Telefono"
              name="telefono"
              value={formDatos.telefono}
              onChange={handleChange}
              required
            />
            <label htmlFor="direccion">Direccion:</label>
            <input
              type="text"
              id="direccion"
              placeholder="Direccion"
              name="direccion"
              value={formDatos.direccion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="div-4">
            <label htmlFor="p-suministra">Productos:</label>
            <textarea
              id="p-suministra"
              placeholder="Productos que suministra"
              name="productos"
              value={formDatos.productos}
              onChange={handleChange}
              required
            />
          </div>
          {/* Botones */}
          <div className="conte-boton">
            <button type="reset" className="botones-entrada boton-reset">
              Limpiar
            </button>
            <button type="submit" className="botones-entrada boton-submit">
              Agregar
            </button>
          </div>
        </form>
      </div>
      {/* Parte donde se ve el listado de proveedores */}
      <div className="contenedor-listado">
        {/* Titulo y imagen */}
        <div className="contenedor-img-titulo">
          <h1>Proveedores</h1>
          <img
            src={LogoProveedores}
            alt="Logo-proveedores"
            title="LogoProveedores"
          />
        </div>

        {/* Contenedor donde va los proveedores agregados */}
        <div className="contenedor-lista-proveedores">
          {proveedores.map((proveedor) => (
            <article key={proveedor.id_proveedor} className="proveedor-item">
              {/* <p>Id: {proveedor.id_proveedor}</p> */}
              <p>
                <strong>Nombre:</strong> {proveedor.nombre}
              </p>
              <p>
                <strong>Apellido:</strong> {proveedor.apellido}
              </p>
              <p>
                <strong>Correo:</strong> {proveedor.correo}
              </p>
              <p>
                <strong>Telefono:</strong> {proveedor.telefono}
              </p>
              <p>
                <strong>Direccion:</strong> {proveedor.direccion}
              </p>
              <p>
                <strong>Productos Suministra:</strong>{" "}
                {proveedor.productos_suministra}
              </p>
              <div className="contenedor-img-eliminar">
                <img
                  src={Eliminar}
                  alt="Img-Eliminar"
                  onClick={() => handleEliminar(proveedor.id_proveedor)}
                  title="Eliminar"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Proveedores;
