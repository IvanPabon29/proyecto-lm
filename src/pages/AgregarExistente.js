import "../styles/AgregarExistente.css";
import React, { useState } from "react";
import { buscarProductoPorId, actualizarProductoYRegistrarEntrada } from "../api/productoApi";

function AgregarExistente() {
  const [idProducto, setIdProducto] = useState("");
  const [producto, setProducto] = useState(null);
  const [cantidadAdicional, setCantidadAdicional] = useState(0);

  // Handler para buscar producto por ID
  const handleBuscarProducto = async (e) => {
    e.preventDefault();
    if (!idProducto) {
      console.error("El ID del producto es necesario para buscar.");
      return;
    }
    try {
      const productoEncontrado = await buscarProductoPorId(idProducto);
      setProducto(productoEncontrado);
    } catch (error) {
      console.error("Error al buscar el producto:", error);
    }
  };

  // Handler para actualizar el producto y registrar la entrada
  const handleActualizarProducto = async (e) => {
    e.preventDefault();
    try {
      await actualizarProductoYRegistrarEntrada({
        ...producto,
        cantidadAdicional,
      });
      alert("Producto actualizado y registro agregado con éxito");
      // Resetear el formulario
      setProducto(null);
      setIdProducto("");
      setCantidadAdicional(0);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <section id="registro-entrada-existente">
      <div>
        {/* Formulario de búsqueda */}
        <form className="form-buscar" onSubmit={handleBuscarProducto}>
          <label htmlFor="buscar">Buscar Producto:</label>
          <input
            type="text"
            id="buscar"
            placeholder="Buscar por ID"
            value={idProducto}
            onChange={(e) => setIdProducto(e.target.value)}
            required
          />
          <button type="submit" className="boton-search">
            Buscar
          </button>
        </form>

        {/* Formulario de actualización */}
        {producto && (
          <form onSubmit={handleActualizarProducto} className="form-actualizar">
            {/* <input type="text" value={producto.idProducto} readOnly /> */}
            <input
              type="text"
              value={producto.nombre}
              onChange={(e) =>
                setProducto({ ...producto, nombre: e.target.value })
              }
              required
            />
            <input
              type="text"
              value={producto.modelo}
              onChange={(e) =>
                setProducto({ ...producto, modelo: e.target.value })
              }
              required
            />
            <textarea
              value={producto.descripcion}
              onChange={(e) =>
                setProducto({ ...producto, descripcion: e.target.value })
              }
              required
            />
            <input
              type="number"
              value={producto.precio}
              onChange={(e) =>
                setProducto({ ...producto, precio: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Cantidad a agregar"
              value={cantidadAdicional}
              onChange={(e) => setCantidadAdicional(Number(e.target.value))}
              required
            />
            <button type="submit" className="btn-actualizar">Actualizar Producto</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default AgregarExistente;
