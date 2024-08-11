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
          <div key={producto.id_producto} className="producto-item">
            <img src={producto.imagen} alt={producto.nombre} />
            <h4>{producto.nombre}</h4>
            <p>{producto.descripcion}</p>
            <p>Precio: {producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
          </div>
        ))}
      </div>
      
    </section>
  );
};


export default Productos;
