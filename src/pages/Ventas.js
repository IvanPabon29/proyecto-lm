import React, { useState, useEffect } from "react";
import { useCart } from "./cartContext";
import "../styles/Ventas.css";
import { jsPDF } from "jspdf"; // Importar librería para PDF
import { restarProductos } from "../api/productoApi"; // Importar función API para restar productos
import { registrarVenta } from "../api/registrosApi"; // Importar función API para registrar venta
import logo from "../img/Logo-L_M.png"; 

function Ventas() {
  const { cart = [], clearCart } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calcular el precio total correctamente
    const totalPrice = cart.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
    setTotal(totalPrice);
  }, [cart]);

  // Generar PDF
  const generarFacturaPDF = () => {
    const doc = new jsPDF();

    // Añadir logo
    doc.addImage(logo, "PNG", 10, 10, 30, 20);

    // Añadir header
    doc.setFontSize(18);
    doc.text("Factura de Compra - Lujos y Repuestos L&M", 105, 20, null, null, "center");

    // Añadir detalles de la empresa
    doc.setFontSize(12);
    doc.text("Dirección: Calle Falsa 123", 105, 30, null, null, "center");
    doc.text("Teléfono: +57 123 456 789", 105, 35, null, null, "center");
    doc.text("Correo: contacto@lymrepuestos.com", 105, 40, null, null, "center");

    // Añadir Fecha
    doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 50);

    // Tabla header
    doc.setFontSize(14);
    doc.text("Productos Comprados:", 20, 60);

    // Añadir detalles de producto en tabla
    doc.setFontSize(12);
    let startY = 70;
    cart.forEach((producto, index) => {
      doc.text(`${index + 1}. Producto: ${producto.nombre}`, 20, startY);
      doc.text(`Modelo: ${producto.modelo}`, 80, startY);
      doc.text(`Cantidad: ${producto.cantidad}`, 120, startY);
      doc.text(`Precio: ${producto.precio} COP`, 160, startY);
      startY += 10;
    });

    // Añadir total
    doc.setFontSize(14);
    doc.text(`Total a Pagar: ${total} COP`, 20, startY + 10);

    // Pie de página
    doc.setFontSize(12);
    doc.text("Gracias por su compra.", 105, startY + 30, null, null, "center");

    return doc;
  };

  const handleCheckout = async () => {
    const confirmPurchase = window.confirm("¿Estás seguro de que deseas finalizar la compra?");
    if (!confirmPurchase) return; // Stop si el usuario cancela

    try {
      // 1. Generar PDF de la factura
      const doc = generarFacturaPDF();

      // Abrir el PDF en una ventana nueva con un blob
      const blob = doc.output("blob");
      const blobURL = URL.createObjectURL(blob);
      window.open(blobURL, "_blank");

      // 2. Procesar cada producto del carrito
      await Promise.all(
        cart.map(async (producto) => {
          // Restar la cantidad de productos del inventario
          await restarProductos(producto.idProducto, producto.cantidad);
  
          // Registrar la venta en la base de datos
          await registrarVenta({
            idProducto: producto.idProducto,
            nombre: producto.nombre,
            modelo: producto.modelo || "Sin modelo", // Valor por defecto si el modelo es null
            cantidad: producto.cantidad,
          });
        })
      );

      // 3. Limpiar el carrito después de la compra
      clearCart();
      console.log("Compra finalizada. Productos descontados y venta registrada.");
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
          <ul className="ventas-list">
            {cart.map((producto, index) => (
              <li key={index} className="ventas-item">
                <div className="producto-info">
                  <p className="producto-nombre">{producto.nombre}</p>
                  <p className="producto-precio">{producto.precio} COP</p>
                  <p className="producto-cantidad">Cantidad: {producto.cantidad}</p>
                  <p className="producto-modelo">Modelo: {producto.modelo}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ventas-empty">No hay productos en el carrito.</p>
        )}

        <div className="ventas-footer">
          <h2 className="ventas-total">Total: {total} COP</h2>
          <button className="boton-finalizar" onClick={handleCheckout}>
            Finalizar compra
          </button>
        </div>
      </div>
    </section>
  );
}

export default Ventas;
