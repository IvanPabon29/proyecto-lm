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
};

module.exports = userController;



// const userController = {
//   // Controlador del login.
//   login: (req, res) => {
//     const { username, password } = req.body;
//     const query =
//       "SELECT * FROM usuarios WHERE id_usuario = ? AND contraseña = ?";
//     db.query(query, [username, password], (err, result) => {
//       if (err) throw err;
//       if (result.length > 0) {
//         res.status(200).json({ message: "Login Existoso", user: result[0] });
//       } else {
//         res.status(401).json({ message: "Credenciales Invalidas" });
//       }
//     });
//   },
//   // contralador del registro de usuarios.
//   registroUsuario: (req, res) => {
//     const { idUsuario, nombre, apellido, rol, correo, contraseña, telefono } = req.body;
//     const query = 
//     "INSERT INTO usuarios (id_usuario, nombre, apellido, rol, correo, contraseña, telefono) VALUES (?, ?, ?, ?, ?, ?, ?)";
//     db.query(query, [idUsuario, nombre, apellido, rol, correo, contraseña, telefono], (err, results) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       res.status(201).send({ message: "Usuario registrado exitosamente" });
//     });
//   },
// };

// module.exports = userController;
