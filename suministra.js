const mysql= require("mysql")
const express= require("express")
const ruta_suministra= express.Router()

 

  var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'mybd',
  user     : 'app_dappweb',
  password : '271105',
  database : "bd_t_mascotas"
  

});

connection.connect();
// ***********************************************SUMINISTRA*********************************************************

// traer todos los suministra
ruta_suministra.get("/api/suministra/", (req, res)=> {
    connection.query('SELECT id, tbl_proveedores_RTN,tbl_productos_codigo  FROM bd_t_mascotas.tbl_suministra;', function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  

  // traer los suministra por id
ruta_suministra.get("/api/suministra/:id", (req, res)=> {
    const {id} = req.params;
    connection.query('SELECT id, tbl_proveedores_RTN,tbl_productos_codigo  FROM bd_t_mascotas.tbl_suministra where id =? ', [id],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })  


// Enviar una nuevo suministra
ruta_suministra.post("/api/suministra/", (req, res)=>{
    const {id, tbl_proveedores_RTN,tbl_productos_codigo}= req.body
  connection.query('INSERT INTO bd_t_mascotas.tbl_suministra (id, tbl_proveedores_RTN,tbl_productos_codigo) VALUES (?,?,?);', 
  [id, tbl_proveedores_RTN,tbl_productos_codigo], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];

      if (!tbl_proveedores_RTN) {
        mensaje_error.push("El tbl_proveedores_RTN no puede ser vacio");
      }
      
      if (!tbl_productos_codigo) {
        mensaje_error.push("El tbl_productos_codigo no puede ser vacio");
      }
     
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
    });
})

// actualizar suministra
ruta_suministra.put("/api/suministra/:id", (req, res)=> {
    const {id} = req.params;
    const {tbl_proveedores_RTN,tbl_productos_codigo} = req.body;
    connection.query('UPDATE bd_t_mascotas.tbl_suministra SETtbl_proveedores_RTN=?, tbl_productos_codigo=?  WHERE id= ? ',
  
   [ tbl_productos_codigo,  id],  function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];

      if (!tbl_proveedores_RTN) {
        mensaje_error.push("El tbl_proveedores_RTN no puede ser vacio");
      }
      
      if (!tbl_productos_codigo) {
        mensaje_error.push("El tbl_productos_codigo no puede ser vacio");
      }
     
      return res.status(200).json(mensaje_error);
    } else {
      res.status(200).json(rows);
    }
      }); 
  })

// borrar  suministra
ruta_suministra.delete("/api/suministra/:id", (req, res)=> {
    const {id} = req.params;
    connection.query('delete from  bd_t_mascotas.tbl_suministra where id =? ', [id],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  module.exports= ruta_suministra