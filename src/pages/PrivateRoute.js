//* Para proteger las rutas y que no puedan acceder sin autetificarce.

import React from 'react';
import { Navigate } from 'react-router-dom'; // Reemplaza Redirect con Navigate
import { useUser } from './userContext'; // Suponiendo que usas un contexto para manejar el usuario

const PrivateRoute = ({ children }) => {
  const { user } = useUser(); // contexto para obtener el usuario

  // Si el usuario no está autenticado, redirige al login
  if (!user) {
    return <Navigate to="/" replace />; 
  }

  // Si está autenticado, renderiza el contenido
  return children;
};

export default PrivateRoute;
