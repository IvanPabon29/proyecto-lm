import React, { useState, useEffect } from "react";
import { useCart } from "./cartContext";
import "../styles/Ventas.css";

function Ventas() {
  const { cart = [], clearCart } = useCart(); 
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcular el precio total correctamente
    const totalPrice = cart.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    setTotal(totalPrice);
  }, [cart]); 

  const handleCheckout = () => {
    // Lógica para finalizar la compra
    console.log("Compra finalizada. Generar factura.");
    clearCart(); // Limpiar el carrito después de la compra
  };

  return (
    <section id="ventas">
      <div className="ventas-header">
        <h1 className="ventas-title">Resumen de la Compra</h1>
      </div>

      <div className="ventas-container">
        {cart.length > 0 ? (
          <ul className="ventas-list">
            {cart.map((producto, index) => (
              <li key={index} className="ventas-item">
                <div className="producto-info">
                  <span className="producto-nombre">{producto.nombre}</span>
                  <br />
                  <span className="producto-precio">{producto.precio} COP</span>
                </div>
                <div className="producto-cantidad">
                  <span>Cantidad: {producto.cantidad}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ventas-empty">No hay productos en el carrito.</p>
        )}

        <div className="ventas-footer">
          <h2 className="ventas-total">Total: {total} COP</h2>
          <button className="btn-finalizar" onClick={handleCheckout}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Ventas;
