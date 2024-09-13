import React, { useState, useEffect } from "react";
import { useCart } from "./cartContext";
import "../styles/Ventas.css";
import { jsPDF } from "jspdf"; // Importar libreria para pdf
import { restarProductos } from "../api/productoApi"; // Importar API function

function Ventas() {
  const { cart = [], clearCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcular el precio total correctamente
    const totalPrice = cart.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    setTotal(totalPrice);
  }, [cart]);

  // Genererar PDF
  const generarFacturaPDF = () => {
    const doc = new jsPDF();
    doc.text("Factura de Compra", 20, 20);
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 30);
    doc.text("Productos:", 20, 40);

    cart.forEach((producto, index) => {
      doc.text(`${index + 1}. ${producto.nombre} - ${producto.cantidad} unidades - ${producto.precio} COP`, 20, 50 + (index * 10));
    });

    doc.text(`Total: ${total} COP`, 20, 80 + (cart.length * 10));
    doc.save("factura.pdf");
  };

  const handleCheckout = async () => {
    try {
      // 1. Generate PDF invoice
      generarFacturaPDF();

      // 2. Restar productos del inventario
      await Promise.all(cart.map(async (producto) => {
        await restarProductos(producto.idProducto, producto.cantidad); // Make API call for each product
      }));

      // 3. Clear cart
      clearCart();
      console.log("Compra finalizada. Generar factura y restar productos del inventario.");
    } catch (error) {
      console.error("Error al finalizar la compra:", error);
    }
  };

  return (
    <section id="ventas">
      <div className="contr-titulo-ventas">
        <h1 className="titulo-ventas">Ventas</h1>
      </div>

      <div className="contenedor-ventas">
        {cart.length > 0 ? (
          <ul>
            {cart.map((producto, index) => (
              <li key={index}>
                <article>
                  {producto.nombre} - {producto.precio} COP
                  {` Cantidad: ${producto.cantidad}`}
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay productos en el carrito.</p>
        )}

        <div className="contenedor-boton-ventas">
          <h2>Total: {total} COP</h2>
          <button className="boton-finalizar" onClick={handleCheckout}>
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Ventas;
