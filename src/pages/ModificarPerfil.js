import React, { useState, useEffect } from "react";
import { modificarPerfil } from "../api/userApi"; // Importa la función desde userApi.js
import { useUser } from "./userContext"; // Asegúrate de importar el contexto
import "../styles/ModificarPerfil.css";

function ModificarPerfil() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    rol: "",
    correo: "",
    telefono: "",
  });

  // Estado para rastrear solo los campos modificados
  const [modifiedFields, setModifiedFields] = useState({});

  useEffect(() => {
    // Supongamos que obtenemos el idUsuario de alguna manera (localStorage, contexto, etc.)
    const idUsuario = 11233012; // Reemplaza esto con la lógica real para obtener el ID del usuario actual en sesión
    setFormData((prevData) => ({ ...prevData, idUsuario }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Marcar el campo como modificado
    setModifiedFields({
      ...modifiedFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Solo enviar los campos que se han modificado
      const response = await modificarPerfil({
        idUsuario: formData.idUsuario,
        ...modifiedFields,
      });
      alert(response.message);
      setModifiedFields({}); // Resetear los campos modificados después de la actualización
      
      // Limpiar el formulario después de una actualización exitosa
      setFormData({
        nombre: "",
        apellido: "",
        rol: "",
        correo: "",
        telefono: "",
      });
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Error al actualizar el perfil");
    }
  };

  return (
    <section id="modificar-perfil">
      <h1 className="titulo-modificar-perfil">Modificar Perfil</h1>

      <div className="contendor-modificar-perfil">
        <form className="form-modifica-perfil" onSubmit={handleSubmit}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese nuevo Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />

          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese nuevo Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
          />

          <label htmlFor="rol">Rol</label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <option value="">Seleccione Rol:</option>
            <option value="Ventas">Ventas</option>
            <option value="Almacen">Almacén</option>
          </select>

          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            placeholder="@usuario.com"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />

          <label htmlFor="telefono">Teléfono</label>
          <input
            type="number"
            id="telefono"
            placeholder="Ingrese nuevo Telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />

          <button type="submit" className="boton-modificar-perfil">
            Guardar Cambios
          </button>
        </form>
      </div>
    </section>
  );
}

export default ModificarPerfil;
