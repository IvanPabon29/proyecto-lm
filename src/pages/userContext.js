import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const UserContext = createContext();

// Proveedor del contexto
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Efecto para sincronizar los cambios del usuario con localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para utilizar el contexto
export function useUser() {
  return useContext(UserContext);
}
