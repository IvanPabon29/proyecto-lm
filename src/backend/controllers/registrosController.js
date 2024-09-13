const db = require("../db");

const registrosController = {
  // Controlador para registrar una venta
  registrarVenta: (req, res) => {
    const { idProducto, nombre, modelo, cantidad } = req.body;

    const tipoAccion = "venta"; // tipo de acción como "venta"

    const query = `
      INSERT INTO registros (id_producto, nombre, modelo, cantidad, tipo_accion)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [idProducto, nombre, modelo, cantidad, tipoAccion],
      (err, results) => {
        if (err) {
          console.error("Error al registrar la venta:", err.message);
          return res.status(500).send({ message: "Error al registrar la venta", error: err });
        }
        res.status(201).json({ message: "Venta registrada exitosamente" });
      }
    );
  },
};

module.exports = registrosController;
