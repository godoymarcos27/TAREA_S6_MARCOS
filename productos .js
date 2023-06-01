const mysql= require('mysql')
const express= require('express')
const ruta_productos= express.Router()

 

  var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'mybd',
  user     : 'app_dappweb',
  password : '271105',
  database : "bd_t_mascotas"
  

});

connection.connect();
// ***********************************************PRODUCTOS*********************************************************
// traer todos los productos 
ruta_productos.get("/api/productos/", (req, res)=> {
    connection.query('select codigo, nombre, descripcion, precio, estado, tbl_mascota_id from bd_t_mascotas.tbl_productos;', function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  

  // traer un producto por id
ruta_productos.get("/api/productos/:code", (req, res)=> {
    const {code} = req.params;
    connection.query(' select  codigo, nombre, descripcion, precio, estado, tbl_mascota_id from bd_t_mascotas.tbl_productos where codigo =? ', [code],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })  


// Enviar un nuevo producto
ruta_productos.post("/api/productos", (req, res)=>{
    const {codigo, nombre, descripcion, precio, estado, tbl_mascota_id}= req.body
  connection.query('INSERT INTO bd_t_mascotas.tbl_productos (codigo, nombre, descripcion, precio, estado, tbl_mascota_id) VALUES (?,?,?,?,?,?);', 
  [codigo, nombre, descripcion, precio, estado, tbl_mascota_id], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];
      if (!codigo) {
        mensaje_error.push("El codigo no puede ser vacio");
      }
      if (!nombre) {
        mensaje_error.push("El nombre no puede ser vacio");
      }
      
      if (!descripcion) {
        mensaje_error.push("La decripcion  no puede ser vacia");
      }
      if (!precio) {
        mensaje_error.push("El precio no puede ser vacio");
      }
      if (!estado) {
        mensaje_error.push("El estado no puede ser vacio");
      }
      if (!tbl_mascota_id) {
        mensaje_error.push("La tbl_mascota_id no puede ser vacia");
      }
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
    });
})

// actualizar productos
ruta_productos.put("/api/productos/:codigo", (req, res)=> {
    const {code} = req.params;
    const { codigo,  nombre, descripcion, precio, estado, tbl_mascota_id} = req.body;
    connection.query('UPDATE bd_t_mascotas.tbl_productos SET nombre= ?,  nombre=?, descripcion=?, precio=?, estado=?, tbl_mascota_id=? WHERE codigo= ? ',
  
   [  nombre, descripcion, precio, estado, tbl_mascota_id ,codigo], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];
      if (!codigo) {
        mensaje_error.push("El codigo no puede ser vacio");
      }
      if (!nombre) {
        mensaje_error.push("El nombre no puede ser vacio");
      }
      
      if (!descripcion) {
        mensaje_error.push("La decripcion  no puede ser vacia");
      }
      if (!precio) {
        mensaje_error.push("El precio no puede ser vacio");
      }
      if (!estado) {
        mensaje_error.push("El estado no puede ser vacio");
      }
      if (!tbl_mascota_id) {
        mensaje_error.push("La tbl_mascota_id no puede ser vacia");
      }
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
      });
  })

// borrar  productos
ruta_productos.delete("/api/productos/:code", (req, res)=> {
    const {code} = req.params;
    connection.query('delete from  bd_t_mascotas.tbl_productos where codigo =? ', [code],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  module.exports= ruta_productos