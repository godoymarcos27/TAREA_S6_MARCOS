const mysql= require("mysql")
const express= require("express")
const ruta_proveedores= express.Router()

 

  var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'mybd',
  user     : 'app_dappweb',
  password : '271105',
  database : "bd_t_mascotas"
  

});

connection.connect();
// ***********************************************PROVEEDORES*********************************************************
 // traer todos los proveedores 
 ruta_proveedores.get("/api/proveedores/", (req, res)=> {
    connection.query('select RTN, nombre, email, direccion from bd_t_mascotas.tbl_proveedores;', function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
 


  // traer un proveedores por id
  ruta_proveedores.get("/api/proveedores/:RTN", (req, res)=> {
    const {RTN} = req.params;
    connection.query(' select  RTN, nombre, email, direccion from bd_t_mascotas.tbl_proveedores where RTN =? ', [RTN],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })


// Enviar un nuevo proveedor
ruta_proveedores.post("/api/proveedores", (req, res)=>{
    const {RTN, nombre, email, direccion}= req.body
  connection.query('INSERT INTO bd_t_mascotas.tbl_proveedores (RTN, nombre, email, direccion) VALUES (?,?,?,?);', 
  [RTN, nombre, email, direccion], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];

      if (!nombre) {
        mensaje_error.push("El nombre no puede ser vacio");
      }
      
      if (!email) {
        mensaje_error.push("El email no puede ser vacio");
      }
      if (!direccion) {
        mensaje_error.push("La direccion  no puede ser vacia");
      }
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
    });
})

// actualizar proveedor
ruta_proveedores.put("/api/proveedores/:RTN", (req, res)=> {
    const {RTN} = req.params;
    const {  nombre, email, direccion} = req.body;
    connection.query('UPDATE bd_t_mascotas.tbl_proveedores SET nombre= ? email=?, direccion=? WHERE RTN= ? ',
  
   [ nombre, email, direccion, RTN], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];

      if (!nombre) {
        mensaje_error.push("El nombre no puede ser vacio");
      }
      
      if (!email) {
        mensaje_error.push("El email no puede ser vacio");
      }
      if (!direccion) {
        mensaje_error.push("La direccion  no puede ser vacia");
      }
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
      });
  })

// borrar  proveedor
ruta_proveedores.delete("/api/proveedores/:RTN", (req, res)=> {
    const {RTN} = req.params;
    connection.query('delete from  bd_t_mascotas.tbl_proveedores where RTN =? ', [RTN],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  module.exports= ruta_proveedores