import "../styles/Productos.css";
import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../api/productoApi';


function Productos() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProductos();
  }, []);
  
  return(
    <section id="stock">

      {/* Form de Buscador de Productos */}
      <form className="form-buscador">

        <label htmlFor="buscar-p">Buscar Producto:</label>
        <input type="search" id="buscar-p" placeholder="Buscar por ID/Nombre" name="search-producto" />
        <button type="submit" className="boton-buscar">Buscar</button>

      </form>

      {/* Aqui es donde va todos los productos agregados */}
      <div className="productos-lista">
        {productos.map(producto => (
          <article key={producto.id_producto} className="producto-item">
            <img src={`http://localhost:3001${producto.imagen}`} alt={producto.nombre} />
            <h4>{producto.nombre}</h4>
            <p><strong>Descripcion:</strong> {producto.descripcion}</p>
            <p><strong>Precio: $</strong>{producto.precio}</p>
            <p><strong>Cantidad:</strong> {producto.cantidad}</p>
            <button title="Agregar Al Carrito"><strong>Agregar Al Carrito</strong></button>
          </article>
        ))}
      </div>
      
    </section>
  );
};


export default Productos;
