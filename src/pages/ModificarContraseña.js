import React, { useState } from "react";
import { modificarContraseña } from "../api/userApi";
import { useUser } from "./userContext";
import "../styles/ModificarContraseña.css";

function ModificarContraseña() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    nuevaContraseña: "",
    confirmarContraseña: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await modificarContraseña(
        user.id_usuario, // Usa el ID del usuario desde el contexto
        formData.nuevaContraseña,
        formData.confirmarContraseña
      );
      alert(response.message);
      setFormData({
        nuevaContraseña: "",
        confirmarContraseña: "",
      });
    } catch (error) {
      alert(error.message || "Error al cambiar la contraseña");
    }
  };

  return (
    <section id="modificar-contraseña">
      <h1 className="titulo-modificar-contraseña">Modificar Contraseña</h1>

      <div className="contenedor-modificar-contraseña">
        <form className="form-modificar-contraseña" onSubmit={handleSubmit}>
          <label htmlFor="nuevaContraseña">Nueva Contraseña:</label>
          <input
            type="password"
            minLength={8}
            id="nuevaContraseña"
            placeholder="Escriba la Nueva Contraseña"
            name="nuevaContraseña"
            value={formData.nuevaContraseña}
            onChange={handleChange}
          />
          <p className="minimo-caracter">Mínimo 8 Caracteres</p>

          <label htmlFor="confirmarContraseña">Confirma Contraseña:</label>
          <input
            type="password"
            minLength={8}
            id="confirmarContraseña"
            placeholder="Confirme la Nueva Contraseña"
            name="confirmarContraseña"
            value={formData.confirmarContraseña}
            onChange={handleChange}
          />

          <button type="submit" className="boton-modificar-contraseña">
            Confirmar Contraseña
          </button>
        </form>
      </div>
    </section>
  );
}

export default ModificarContraseña;
