//Controlador de proveedores.

const db = require("../db");

const proveedoresController = {
  // Controlador del registro de proveedores.
  registroProveedor: (req, res) => {
    const {
      idProveedor,
      nombre,
      apellido,
      correo,
      telefono,
      direccion,
      productos,
    } = req.body;
    const query =
      "INSERT INTO proyecto_lm.proveedores (id_proveedor, nombre, apellido, correo, telefono, direccion, productos_suministra) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [idProveedor, nombre, apellido, correo, telefono, direccion, productos],
      (err, results) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(201).send({ message: "Proveedor registrado exitosamente" });
      }
    );
  },

  // Controlador para obtener la lista de proveedores.
  obtenerProveedores: (req, res) => {
    const query = "SELECT * FROM proveedores";
    db.query(query, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).json(results);
    });
  },
  
  // Controlador para eliminar un proveedor
  eliminarProveedor: (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM proveedores WHERE id_proveedor = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).send({ message: "Proveedor no encontrado" });
      }
      res.status(200).send({ message: "Proveedor eliminado exitosamente" });
    });
  },
};

module.exports = proveedoresController;
