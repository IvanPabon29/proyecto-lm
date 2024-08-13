// src/components/Productos.js
import "../styles/Productos.css";
import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productoApi";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProductos();
  }, []);

  // Filtrar los productos según el término de búsqueda
  const filteredProductos = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      producto.id_producto.toString().includes(searchTerm) ||
      producto.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Manejador para el cambio en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <section id="stock">
      {/* Form de Buscador de Productos */}
      <form className="form-buscador" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="buscar-p">Buscar Producto:</label>
        <input
          type="search"
          id="buscar-p"
          placeholder="Buscar por ID/Nombre/Modelo"
          name="search-producto"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {/* Aquí es donde se muestran los productos filtrados */}
      <div className="productos-lista">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => (
            <article key={producto.id_producto} className="producto-item">
              <img
                src={`http://localhost:3001${producto.imagen}`}
                alt={producto.nombre}
              />
              <h4>{producto.nombre}</h4>
              <p>Id Producto: {producto.id_producto}</p>
              <p>
                <strong>Descripción:</strong> {producto.descripcion}
              </p>
              <p>
                <strong>Modelo:</strong> {producto.modelo}
              </p>
              <p>
                <strong>Precio: $</strong>
                {producto.precio}
              </p>
              <p>
                <strong>Cantidad:</strong> {producto.cantidad}
              </p>
              <button className="boton-item" title="Agregar Al Carrito">
                <strong>Agregar Al Carrito</strong>
              </button>
            </article>
          ))
        ) : (
          <h3>No se encontraron productos que coincidan con la búsqueda.</h3>
        )}
      </div>
    </section>
  );
}

export default Productos;
