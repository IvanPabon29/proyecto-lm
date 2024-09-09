/*Es el punto de comunicación entre el frontend y el backend. Contiene las funciones para hacer solicitudes HTTP desde el frontend. */

// src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Función para iniciar sesión
export const loginUsuario = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
 
// Función para registrar un nuevo usuario
export const registrarUsuario = async (formDatos) => {
  try {
    const response = await axios.post(`${API_URL}/nuevo-usuario`, formDatos);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

//Función para modificar el perfil del usuario
export const modificarPerfil = async (formDatos) => {
  try {
    const response = await axios.put(`${API_URL}/mi-perfil/modificar-perfil`, formDatos);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Función para modificar la contraseña
export const modificarContraseña = async (idUsuario, nuevaContraseña, confirmarContraseña) => {
  try {
    const response = await axios.post(`${API_URL}/mi-perfil/modificar-clave`, {
      idUsuario,
      nuevaContraseña,
      confirmarContraseña,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message); 
  }
};
