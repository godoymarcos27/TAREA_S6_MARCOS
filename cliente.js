var mysql = require("mysql");
const express = require("express");
const database = require("./conexion");

const ruta_clientes = express.Router();

// ruta_clientes.use(database)

var connection = mysql.createConnection({
  host: "localhost",
  database: "mybd",
  user: "app_dappweb",
  password: "271105",
  database: "bd_t_mascotas",
});

connection.connect();

// ***********************************************CLIENTES*********************************************************

// traer todos clientes

ruta_clientes.get("/api/clientes", (req, res) => {
  connection.query(
    "SELECT DNI, nombre, apellido, email  FROM bd_t_mascotas.tbl_cliente",
    function (err, rows) {
      if (err) throw err;
      res.status(200).json(rows);
    }
  );
});

// traer clientes por id
ruta_clientes.get("/api/clientes/:DNI", (req, res) => {
  const { DNI } = req.params;

  connection.query(
    "select  DNI,  nombre, apellido, email from  bd_t_mascotas.tbl_cliente where DNI =? ",
    [DNI],

    function (err, rows) {
      if(err){

        const mensaje_error = [];

        if(DNI != req.body.DNI){
          mensaje_error.push={ mensaje:`no se encontro el cliente con id: ${DNI}`} 
          return res.status(200).json(mensaje_error)
      }
          }else{ 
            res.status(200).json(rows);
       
           }
          
    }
  );
});

// Enviar un nuevo cliente
ruta_clientes.post("/api/clientes", (req, res) => {
  const { DNI, nombre, apellido, email } = req.body;
  connection.query(
    "INSERT INTO bd_t_mascotas.tbl_cliente (DNI, nombre, apellido, email) VALUES (?,?,?,?);",
    [DNI, nombre, apellido, email],
    function (err, rows) {
      // if (err) throw err;
      if (err) {
        console.error(err);

        const mensaje_error = [];

        if (!nombre) {
          mensaje_error.push("El nombre no puede ser vacio");
        }
        if (!apellido) {
          mensaje_error.push("El aprllido no puede ser vacio");
        }
        if (!email) {
          mensaje_error.push("El email no puede ser vacio");
        }

        return res.status(200).json(mensaje_error);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

// actualizar cliente
ruta_clientes.put("/api/clientes/:DNI", (req, res) => {
  const { DNI } = req.params;
  const { nombre, apellido, email } = req.body;
  connection.query(
    "UPDATE bd_t_mascotas.tbl_cliente SET nombre= ?, apellido= ? email= ? WHERE DNI= ? ",

    [nombre, apellido, email, DNI],
    function (err, rows) {
      if (err) {
        console.error(err);

        const mensaje_error = [];

        if (!nombre) {
          mensaje_error.push("El nombre no puede ser vacio");
        }
        if (!apellido) {
          mensaje_error.push("El aprllido no puede ser vaci0");
        }
        if (!email) {
          mensaje_error.push("El email no puede ser vacio");
        }

        return res.status(200).json(mensaje_error);
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

// borrar  cliente
ruta_clientes.delete("/api/clientes/:DNI", (req, res) => {
  const { DNI } = req.params;
  connection.query(
    "delete from  bd_t_mascotas.tbl_cliente where DNI =? ",
    [DNI],
    function (err, rows) {
      if (err) {
        console.error(err);
      }
      let msjerror = {};
      if (DNI != req.body.DNI) {
        msjerror = `no se enconcro el cliente con DNI: ${DNI}`;
        res.status(200).json(msjerror);
        return;
      } else {
        res.status(200).json(rows);
      }
    }
  );
});

module.exports = ruta_clientes;
