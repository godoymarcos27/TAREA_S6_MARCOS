const mysql= require("mysql")
const express= require("express")
const ruta_facturas= express.Router()


  var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'mybd',
  user     : 'app_dappweb',
  password : '271105',
  database : "bd_t_mascotas"
  

});

connection.connect();
// ***********************************************FACTURA*********************************************************
// traer todos las facturas
ruta_facturas.get("/api/facturas/", (req, res)=> {
    connection.query('SELECT id, tbl_cliente_DNI, tbl_productos_codigo FROM bd_t_mascotas.tbl_factura;', function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  

  // traer las facturas por id
ruta_facturas.get("/api/facturas/:id", (req, res)=> {
    const {id} = req.params;
    connection.query('SELECT id, tbl_cliente_DNI, tbl_productos_codigo FROM bd_t_mascotas.tbl_factura where id =? ', [id],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })  


// Enviar una nueva facturas
ruta_facturas.post("/api/facturas/", (req, res)=>{
    const {id, tbl_cliente_DNI, tbl_productos_codigo}= req.body
  connection.query('INSERT INTO bd_t_mascotas.tbl_factura (id, tbl_cliente_DNI, tbl_productos_codigo) VALUES (?,?,?);', 
  [id, tbl_cliente_DNI, tbl_productos_codigo], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];

      if (!tbl_cliente_DNI) {
        mensaje_error.push("El tbl_cliente_DNI no puede ser vacio");
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

// actualizar facturas
ruta_facturas.put("/api/facturas/:id", (req, res)=> {
    const {id} = req.params;
    const { tbl_cliente_DNI, tbl_productos_codigo} = req.body;
    connection.query('UPDATE bd_t_mascotas.tbl_factura SET tbl_cliente_DNI= ?, tbl_productos_codigo= ?  WHERE id= ? ',
  
   [tbl_cliente_DNI, tbl_productos_codigo, id], function(err, rows) {
    if (err) {
      console.error(err);

      const mensaje_error = [];
      if (!id) {
        mensaje_error.push("El id no puede ser vacio");
      }

      if (!tbl_cliente_DNI) {
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

// borrar  facturas
ruta_facturas.delete("/api/facturas/:id", (req, res)=> {
    const {id} = req.params;
    connection.query('delete from  bd_t_mascotas.tbl_factura where id =? ', [id],
   function(err, rows) {
          if (err) throw err;
          res.status(200).json(rows)
      });
  })
  module.exports= ruta_facturas