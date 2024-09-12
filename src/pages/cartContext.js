import { createContext, useContext, useState, useEffect } from "react"; 

// Crear el contexto para el carrito de compras
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Recuperar carrito de localStorage al inicio
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    // Guardar carrito en localStorage cuando se actualiza
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito o aumentar cantidad si ya está
  const agregarCarrito = (producto) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.idProducto === producto.idProducto);
      if (existingItem) {
        return prevCart.map(item => 
          item.idProducto === producto.idProducto 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
        );
      } else {
        return [...prevCart, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Actualizar la cantidad de un producto específico en el carrito
  const actualizarCantidadItemCarrito = (idProducto, quantity) => {
    if (quantity === 0) {
      setCart((prevCart) => prevCart.filter(item => item.idProducto !== idProducto));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.idProducto === idProducto ? { ...item, cantidad: quantity } : item
        )
      );
    }
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, agregarCarrito, actualizarCantidadItemCarrito, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
