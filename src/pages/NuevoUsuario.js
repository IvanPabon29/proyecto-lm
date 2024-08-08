import "../styles/NuevoUsuario.css";
import ImgUsuario from "../img/nuevo-usuario.png";
import { useState } from "react";
import { registrarUsuario } from "../api/userApi";

function NuevoUsuario() {
  // Manejedo de los datos del formulario.
  const [formDatos, setFormDatos] = useState({
    idUsuario: "",
    nombre: "",
    apellido: "",
    rol: "",
    correo: "",
    contraseña: "",
    telefono: "",
  });

  // Manejador de Limpiar
  const handleReset = () => {
    setFormDatos({
      idUsuario: "",
      nombre: "",
      apellido: "",
      rol: "",
      correo: "",
      contraseña: "",
      telefono: "",
    });
  };

  // Manejador del Formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDatos({
      ...formDatos,
      [name]: value,
    });
  };

  // Manejar las respuestas.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registrarUsuario(formDatos);
      console.log("Usuario registrado:", response);
      alert(`Usuario ${formDatos.nombre} Registrado con ¡EXITO!`);
      handleReset(); //reset de datos cuando se cree un usuario nuevo.
    } catch (error) {
      console.error("Error registrando al usuario:", error.message);
      alert("¡ERROR! Intente de nuevo"); 
    }
  };

  return (
    <section id="nuevo-usuario">
      <h1 className="titulo-usuario">Agregar Nuevo Usuario</h1>
      <form className="form-usuario" onSubmit={handleSubmit} onReset={handleReset}>
        <img
          src={ImgUsuario}
          className="img-usuario"
          alt="ImgUsuario"
          title="Usuario"
        />

        <div>
          <label htmlFor="usuario">Id Usuario:</label>
          <input
            type="number"
            id="usuario"
            placeholder="Ingrese el ID."
            name="idUsuario"
            value={formDatos.idUsuario}
            onChange={handleChange}
            required
          />

          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            placeholder="Ingrese el Nombre"
            name="nombre"
            value={formDatos.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido:</label>
          <input
            type="text"
            id="apellido"
            placeholder="Ingrese el Apellido"
            name="apellido"
            value={formDatos.apellido}
            onChange={handleChange}
            required
          />

          <label htmlFor="rol">Rol:</label>
          <select
            id="rol"
            name="rol"
            value={formDatos.rol}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Rol:</option>
            <option value="Admin">Admin</option>
            <option value="Ventas">Ventas</option>
            <option value="Almacen">Almacén</option>
          </select>
        </div>

        <div>
          <label htmlFor="correo">Correo:</label>
          <input
            type="email"
            id="correo"
            placeholder="@usuario.com"
            name="correo"
            value={formDatos.correo}
            onChange={handleChange}
            required
          />

          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            minLength={8}
            id="contraseña"
            placeholder="Contraseña"
            name="contraseña"
            value={formDatos.contraseña}
            onChange={handleChange}
            required
          />

          <label htmlFor="celular">Teléfono:</label>
          <input
            type="number"
            id="celular"
            placeholder="Teléfono"
            name="telefono"
            value={formDatos.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="contenedor-botones-usuario">
          <button type="reset" className="bton b-limpiar">
            Limpiar
          </button>
          <button type="submit" className="bton b-agregar">
            Agregar
          </button>
        </div>
      </form>
    </section>
  );
}

export default NuevoUsuario;
