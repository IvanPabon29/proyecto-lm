/*Es el punto de comunicación entre el frontend y el backend. Contiene las funciones para hacer solicitudes HTTP desde el frontend. */

// src/api/userApi.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

//login
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
 
// Registro usuario
export const registrarUsuario = async (formDatos) => {
  try {
    const response = await axios.post(`${API_URL}/nuevo-usuario`, formDatos);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

