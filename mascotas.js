const mysql = require("mysql");
const express = require("express");
const ruta_mascotas = express.Router();

var connection = mysql.createConnection({
  host: "localhost",
  database: "mybd",
  user: "app_dappweb",
  password: "271105",
  database: "bd_t_mascotas",
});

connection.connect();
// ***********************************************MASCOTAS*********************************************************

// trae todas las mascotas
ruta_mascotas.get("/api/mascotas/", (req, res) => {
  connection.query(
    "select id, nombre, raza, edad, sexo, precio  from bd_t_mascotas.tbl_mascota;",
    function (err, rows) {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});

// traer mascota por id
ruta_mascotas.get("/api/mascotas/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    " select id, nombre, raza, edad, sexo, precio from  bd_t_mascotas.tbl_mascota where id =? ",
    [id],
    function (err, rows) {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});

// enviar unaa nueva mascota
ruta_mascotas.post("/api/mascotas", (req, res) => {
  const { id, nombre, raza, edad, sexo, precio } = req.body;
  connection.query(
    "INSERT INTO bd_t_mascotas.tbl_mascota (id, nombre, raza, edad, sexo, precio)  value(?, ?, ?, ?, ?, ?)",
    [id, nombre, raza, edad, sexo, precio],
    function (err, rows) {
      if (err) {
        console.error(err);

        const mensaje_error = [];

        if (!nombre) {
          mensaje_error.push("El nombre no puede ser vacio");
        }
        if (!raza) {
          mensaje_error.push("La raza no puede ser vacia");
        }
        if (!edad) {
          mensaje_error.push("La raza no puede ser vacia");
        }
        if (!sexo) {
          mensaje_error.push("El sexono puede ser vacio");
        }
        if (!precio) {
          mensaje_error.push("El precio no puede ser vacio");
        }

        return res.status(200).json(mensaje_error);
      } else {
        res.status(200).json(rows);
      }

      
    }
  );
});

// actualizar una  mascota
ruta_mascotas.put("/api/mascotas/:id", (req, res) => {
  const { id } = req.params;
  const { nombre,  raza, edad, sexo,precio } = req.body;
  connection.query(
    "UPDATE bd_t_mascotas.tbl_mascota SET nombre = ?, raza = ?, edad = ?, sexo = ?, precio= ? WHERE id= ? ",
    [nombre,  raza, edad, sexo,precio, id],
    function (err, rows) {
        if (err) {
            console.error(err);
    
            const mensaje_error = [];
    
            if (!nombre) {
              mensaje_error.push("El nombre no puede ser vacio");
            }
            if (!raza) {
              mensaje_error.push("La raza no puede ser vacia");
            }
            if (!edad) {
              mensaje_error.push("La raza no puede ser vacia");
            }
            if (!sexo) {
              mensaje_error.push("El sexono puede ser vacio");
            }
            if (!precio) {
              mensaje_error.push("El precio no puede ser vacio");
            }
    
            return res.status(200).json(mensaje_error);
          } else {
            res.status(200).json(rows);
          }

        }
  );
});

// borrar una  mascota
ruta_mascotas.delete("/api/mascotas/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "delete from  bd_t_mascotas.tbl_mascota where id =? ",
    [id],
    function (err, rows) {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});
module.exports = ruta_mascotas;
