import "../styles/Productos.css"; 
import React, { useEffect, useState } from "react";
import { obtenerProductos } from "../api/productoApi";
import { useCart } from "./cartContext"; // Importar el contexto del carrito

function Productos() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda
  const { cart, agregarCarrito, actualizarCantidadItemCarrito } = useCart(); // Extraer las funciones del contexto

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

  // Obtener la cantidad de un producto en el carrito
  const getCantidadEnCarrito = (idProducto) => {
    const productoEnCart = cart.find((item) => item.idProducto === idProducto);
    return productoEnCart ? productoEnCart.cantidad : 0;
  };

  // Manejador para añadir al carrito
  const handleAgregarCarrito = (producto) => {
    agregarCarrito({
      idProducto: producto.id_producto,
      nombre: producto.nombre,
      modelo: producto.modelo,
      precio: producto.precio,
    });
  };

  // Manejador para cambiar la cantidad de productos en el carrito
  const handleCambiarCantidad = (idProducto, cantidad) => {
    actualizarCantidadItemCarrito(idProducto, cantidad);
  };

  // Manejador para actualizar el término de búsqueda
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Actualizar el término de búsqueda
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
          onChange={handleSearchChange} // Llamar al manejador de cambio de búsqueda
        />
      </form>

      {/* Mostrar productos filtrados */}
      <div className="productos-lista">
        {filteredProductos.length > 0 ? (
          filteredProductos.map((producto) => {
            const cantidadEnCarrito = getCantidadEnCarrito(producto.id_producto);

            return (
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

                {/* Botones agregar al carrito */}
                {cantidadEnCarrito === 0 ? (
                  <button
                    className="boton-item"
                    title="Agregar Al Carrito"
                    onClick={() => handleAgregarCarrito(producto)} // Agregar producto al carrito
                  >
                    <strong>Agregar Al Carrito</strong>
                  </button>
                ) : (
                  <div className="control-cantidad">
                    <button
                      onClick={() => handleCambiarCantidad(producto.id_producto, cantidadEnCarrito - 1)}
                    >
                      -
                    </button>
                    <span>{cantidadEnCarrito}</span>
                    <button
                      onClick={() => handleCambiarCantidad(producto.id_producto, cantidadEnCarrito + 1)}
                    >
                      +
                    </button>
                  </div>
                )}
              </article>
            );
          })
        ) : (
          <h3>No se encontraron productos que coincidan con la búsqueda.</h3>
        )}
      </div>
    </section>
  );
}

export default Productos;
