/* Contiene la logica de negocio para las operaciones de usuarios,  Aquí es donde manejas las solicitudes y te comunicas con la base de datos. */

// backend/controllers/userController.js
const db = require("../db");
const bcrypt = require("bcryptjs"); //*Para el hash de las contraseñas


const userController = {
  // Controlador del login.
  login: (req, res) => {
    const { username, password } = req.body; // Obtener username y password del cuerpo de la solicitud
    const query = "SELECT * FROM usuarios WHERE id_usuario = ?"; // Consulta SQL para obtener el usuario por ID
    db.query(query, [username], async (err, result) => {
      if (err) {
        console.error(err); // Loguear el error en la consola del servidor
        return res.status(500).json({ message: "Error en el servidor" });
      }
      if (result.length > 0) {
        const user = result[0];

        // Comparar la contraseña ingresada con la almacenada (hashed)
        const isMatch = await bcrypt.compare(password, user.contraseña);

        if (isMatch) {
          return res.status(200).json({ message: "Login Exitoso", user });
        } else {
          return res.status(401).json({ message: "Credenciales Inválidas" });
        }
      } else {
        return res.status(401).json({ message: "Credenciales Inválidas" });
      }
    });
  },

  // Controlador del registro de usuarios.
  registroUsuario: async (req, res) => {
    const { idUsuario, nombre, apellido, rol, correo, contraseña, telefono } = req.body;
    try {
      const salt = await bcrypt.genSalt(10); // Generar una sal para el hashing
      const hashedPassword = await bcrypt.hash(contraseña, salt); // Hashear la contraseña
      
      const query = 
      "INSERT INTO usuarios (id_usuario, nombre, apellido, rol, correo, contraseña, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(query, [idUsuario, nombre, apellido, rol, correo, hashedPassword, telefono], (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).send({ message: "Usuario registrado exitosamente" });
      });
    } catch (error) {
      res.status(500).send({ message: "Error al registrar el usuario" });
    }
  },

  // Contralador Modificar Perfil de usuario
  modificarPerfil: (req, res) => {
    const { idUsuario, nombre, apellido, rol, correo, telefono } = req.body;

    // Crear un objeto para almacenar los campos que se van a actualizar
    const camposParaActualizar = {};

    if (nombre) camposParaActualizar.nombre = nombre;
    if (apellido) camposParaActualizar.apellido = apellido;
    if (rol) camposParaActualizar.rol = rol;
    if (correo) camposParaActualizar.correo = correo;
    if (telefono) camposParaActualizar.telefono = telefono;

    // Si no hay campos para actualizar, devolver un error
    if (Object.keys(camposParaActualizar).length === 0) {
      return res.status(400).json({ message: "No hay campos para actualizar" });
    }

    // Crear la consulta SQL dinámicamente basado en los campos que se van a actualizar
    const setClause = Object.keys(camposParaActualizar)
      .map((campo) => `${campo} = ?`)
      .join(", ");

    const values = Object.values(camposParaActualizar);
    values.push(idUsuario); // Añadir el ID del usuario al final para el WHERE

    const query = `UPDATE usuarios SET ${setClause} WHERE id_usuario = ?`;

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error al actualizar el perfil:", err);
        return res.status(500).json({ message: "Error al actualizar el perfil" });
      }
      res.status(200).json({ message: "Perfil actualizado exitosamente" });
    });
  },

  // Controlador para cambiar la contraseña
  modificarContraseña: (req, res) => {
    const { idUsuario, nuevaContraseña, confirmarContraseña } = req.body;
  
    // Verificar que las contraseñas coinciden
    if (nuevaContraseña !== confirmarContraseña) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }
  
    // Encriptar la nueva contraseña
    bcrypt.hash(nuevaContraseña, 10, (err, hashContraseña) => {
      if (err) {
        console.error("Error al encriptar la contraseña:", err);
        return res.status(500).json({ message: "Error al encriptar la contraseña" });
      }
  
      // Actualizar la contraseña en la base de datos usando callback
      const query = "UPDATE usuarios SET contraseña = ? WHERE id_usuario = ?";
      db.query(query, [hashContraseña, idUsuario], (err, result) => {
        if (err) {
          console.error("Error al cambiar la contraseña:", err);
          return res.status(500).json({ message: "Error al cambiar la contraseña" });
        }
  
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
  
        res.status(200).json({ message: "Contraseña actualizada correctamente" });
      });
    });
  },
  
};

module.exports = userController;

