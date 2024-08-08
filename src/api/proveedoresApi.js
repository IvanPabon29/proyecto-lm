/*Es el punto de comunicación entre el frontend y el backend. Contiene las funciones para hacer solicitudes HTTP desde el frontend. */

import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

// Registrar Proveedores
export const registrarProveedor = async (proveedor) => {
  try {
    const response = await axios.post(`${API_URL}/proveedores`, proveedor);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Obtener Proveedores
export const obtenerProveedores = async () => {
  try {
    const response = await axios.get(`${API_URL}/proveedores`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

// Eliminar Proveedores
export const eliminarProveedor = async (idProveedor) => {
  try {
    const response = await axios.delete(`${API_URL}/proveedores/${idProveedor}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
