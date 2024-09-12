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

  const addToCart = (producto) => {
    setCart((prevCart) => [...prevCart, producto]);
  };

  const updateCartItemQuantity = (productoId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productoId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

