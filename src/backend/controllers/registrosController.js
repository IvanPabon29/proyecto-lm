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
          return res
            .status(500)
            .send({ message: "Error al registrar la venta", error: err });
        }
        res.status(201).json({ message: "Venta registrada exitosamente" });
      }
    );
  },

  // Controlador para obtener registros filtrados por fecha
  obtenerRegistros: (req, res) => {
    const { fechaInicio, fechaFin } = req.query;

    if (!fechaInicio || !fechaFin) {
      return res
        .status(400)
        .json({ message: "Debe proporcionar las fechas de inicio y fin" });
    }

    const query = `
      SELECT id_producto, nombre, modelo, fecha_registro, cantidad, tipo_accion 
      FROM registros
      WHERE fecha_registro BETWEEN ? AND ?
    `;

    db.query(query, [fechaInicio, fechaFin], (err, results) => {
      if (err) {
        console.error("Error al obtener los registros:", err.message);
        return res
          .status(500)
          .json({ message: "Error al obtener los registros", error: err });
      }
      res.status(200).json(results);
    });
  },
  
};

module.exports = registrosController;
