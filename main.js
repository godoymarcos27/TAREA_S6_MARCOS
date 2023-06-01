// var mysql = require('mysql');
// const express = require('express')
// const bodyParser = require('body-parser');
// var morgan = require('morgan')
// const helmet = require('helmet')
// const rutas = require("./usuarios")
// const app = express() 


  


// // coneccion con la base de datos
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     database : 'mybd',
//   user     : 'app_dappweb',
//   password : '271105',
//   database : "bd_t_mascotas",
  
  

// });

// const myLogger = function (req, res, next) {
//     console.log(`se ha llamado la ruta: ${req.path}- ${new Date().toLocaleTimeString()}`)
//     // console.log(req.path);
//     next()
//   }

// connection.connect();
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
// // app.use(myLogger)
// app.use(morgan('combined'))
// app.use(helmet())
// app.use(rutas)
//     // ***********************************************CLIENTES*********************************************************

// // traer todos clientes

// app.get("/api/clientes", (req, res)=> {
//   connection.query('SELECT DNI, nombre, apellido, email  FROM bd_t_mascotas.tbl_cliente', function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // traer clientes por id
// app.get("/api/clientes/:DNI", (req, res)=> {
//     const {DNI} = req.params;
  
//     connection.query('select  DNI,  nombre, apellido, email from  bd_t_mascotas.tbl_cliente where DNI =? ', [DNI],
  
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })

// // Enviar un nuevo cliente
// app.post("/api/clientes", (req, res)=>{
//     const {DNI, nombre, apellido, email}= req.body
//   connection.query('INSERT INTO bd_t_mascotas.tbl_cliente (DNI, nombre, apellido, email) VALUES (?,?,?,?);', 
//   [DNI, nombre, apellido, email], function(err, rows) {
//         // if (err) throw err;
//         if(err){
//             console.error(err)
//             let mensaje_error={}
//             if(err.code==="ER_BAD_NULL_ERROR"){
//                 mensaje_error={codigo: 500, mensaje: "Los campos que intenta ingresar no pueden ser nulos"}
//             }
//             res.status(500).json(mensaje_error)
           
//         }else{
//              res.status(200).json(rows)
//         }
//     });
// })

// // actualizar cliente
// app.put("/api/clientes/:DNI", (req, res)=> {
//     const {DNI} = req.params;
//     const { nombre} = req.body;
//     connection.query('UPDATE bd_t_mascotas.tbl_cliente SET nombre= ? WHERE DNI= ? ',
  
//    [ nombre, DNI], function(err, rows) {
  
//     if(err){
//         console.error(err);
//         let mensaje_error={}
//             if(err.code==="ER_BAD_NULL_ERROR"){
//                 mensaje_error={codigo: 500, mensaje: "Los campos que intenta ingresar no pueden ser nulos"}
//             }
//             res.status(500).json(mensaje_error)
       
//     }else{
//          res.status(200).json(rows)
//     }
//       });
//   })

// // borrar  cliente
// app.delete("/api/clientes/:DNI", (req, res)=> {
//     const {DNI} = req.params;
//     connection.query('delete from  bd_t_mascotas.tbl_cliente where DNI =? ', [DNI],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })

// // ***********************************************MASCOTAS*********************************************************

// // trae todas las mascotas
// app.get("/api/mascotas/", (req, res)=> {
//   connection.query('select id, nombre, raza, edad, sexo, precio  from bd_t_mascotas.tbl_mascota;', function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // traer mascota por id
// app.get("/api/mascotas/:id", (req, res)=> {
//     const {id} = req.params;
//     connection.query(' select id, nombre, raza, edad, sexo, precio from  bd_t_mascotas.tbl_mascota where id =? ', [id],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })


// // enviar unaa nueva mascota
// app.post("/api/mascotas", (req, res)=> {
//   const {id, nombre, raza, edad, sexo, precio} = req.body;
//   connection.query('INSERT INTO bd_t_mascotas.tbl_mascota (id, nombre, raza, edad, sexo, precio)  value(?, ?, ?, ?, ?, ?)', [id, nombre, raza, edad, sexo, precio], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // actualizar una  mascota
// app.put("/api/mascotas/:id", (req, res)=> {
//   const {id} = req.params;
//   const { nombre} = req.body;
//   connection.query('UPDATE bd_t_mascotas.tbl_mascota SET nombre = ? WHERE id= ? ',
//  [ nombre, id], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // borrar una  mascota
// app.delete("/api/mascotas/:id", (req, res)=> {
//   const {id} = req.params;
//   connection.query('delete from  bd_t_mascotas.tbl_mascota where id =? ', [id],
//  function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // ***********************************************PROVEEDORES*********************************************************
//  // traer todos los proveedores 
// app.get("/api/proveedores/", (req, res)=> {
//     connection.query('select RTN, nombre, email, direccion from bd_t_mascotas.tbl_proveedores;', function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
 


//   // traer un proveedores por id
// app.get("/api/proveedores/:RTN", (req, res)=> {
//     const {RTN} = req.params;
//     connection.query(' select  RTN, nombre, email, direccion from bd_t_mascotas.tbl_proveedores where RTN =? ', [RTN],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })


// // Enviar un nuevo proveedor
// app.post("/api/proveedores", (req, res)=>{
//     const {RTN, nombre, email, direccion}= req.body
//   connection.query('INSERT INTO bd_t_mascotas.tbl_proveedores (RTN, nombre, email, direccion) VALUES (?,?,?,?);', 
//   [RTN, nombre, email, direccion], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // actualizar proveedor
// app.put("/api/proveedores/:RTN", (req, res)=> {
//     const {RTN} = req.params;
//     const {  nombre} = req.body;
//     connection.query('UPDATE bd_t_mascotas.tbl_proveedores SET nombre= ? WHERE RTN= ? ',
  
//    [ nombre,RTN], function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })

// // borrar  proveedor
// app.delete("/api/proveedores/:RTN", (req, res)=> {
//     const {RTN} = req.params;
//     connection.query('delete from  bd_t_mascotas.tbl_proveedores where RTN =? ', [RTN],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
// // ***********************************************PRODUCTOS*********************************************************
// // traer todos los productos 
// app.get("/api/productos/", (req, res)=> {
//     connection.query('select codigo, nombre, descripcion, precio, estado, tbl_mascota_id from bd_t_mascotas.tbl_productos;', function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
  

//   // traer un producto por id
// app.get("/api/productos/:code", (req, res)=> {
//     const {code} = req.params;
//     connection.query(' select  codigo, nombre, descripcion, precio, estado, tbl_mascota_id from bd_t_mascotas.tbl_productos where codigo =? ', [code],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })  


// // Enviar un nuevo producto
// app.post("/api/productos", (req, res)=>{
//     const {codigo, nombre, descripcion, precio, estado, tbl_mascota_id}= req.body
//   connection.query('INSERT INTO bd_t_mascotas.tbl_productos (codigo, nombre, descripcion, precio, estado, tbl_mascota_id) VALUES (?,?,?,?,?,?);', 
//   [codigo, nombre, descripcion, precio, estado, tbl_mascota_id], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // actualizar productos
// app.put("/api/productos/:code", (req, res)=> {
//     const {code} = req.params;
//     const {  nombre} = req.body;
//     connection.query('UPDATE bd_t_mascotas.tbl_productos SET nombre= ? WHERE codigo= ? ',
  
//    [ nombre,code], function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })

// // borrar  productos
// app.delete("/api/productos/:code", (req, res)=> {
//     const {code} = req.params;
//     connection.query('delete from  bd_t_mascotas.tbl_productos where codigo =? ', [code],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
// // ***********************************************FACTURA*********************************************************
// // traer todos las facturas
// app.get("/api/facturas/", (req, res)=> {
//     connection.query('SELECT id, tbl_cliente_DNI, tbl_productos_codigo FROM bd_t_mascotas.tbl_factura;', function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
  

//   // traer las facturas por id
// app.get("/api/facturas/:id", (req, res)=> {
//     const {id} = req.params;
//     connection.query('SELECT id, tbl_cliente_DNI, tbl_productos_codigo FROM bd_t_mascotas.tbl_factura where id =? ', [id],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })  


// // Enviar una nueva facturas
// app.post("/api/facturas/", (req, res)=>{
//     const {id, tbl_cliente_DNI, tbl_productos_codigo}= req.body
//   connection.query('INSERT INTO bd_t_mascotas.tbl_factura (id, tbl_cliente_DNI, tbl_productos_codigo) VALUES (?,?,?);', 
//   [id, tbl_cliente_DNI, tbl_productos_codigo], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // actualizar facturas
// app.put("/api/facturas/:id", (req, res)=> {
//     const {id} = req.params;
//     const { tbl_cliente_DNI, tbl_productos_codigo} = req.body;
//     connection.query('UPDATE bd_t_mascotas.tbl_factura SET tbl_cliente_DNI= ?, tbl_productos_codigo= ?  WHERE id= ? ',
  
//    [ tbl_cliente_DNI, tbl_productos_codigo,id], function(err, rows) {
//           if (err) throw err; 
//           res.status(200).json(rows)
//       });
//   })

// // borrar  facturas
// app.delete("/api/facturas/:id", (req, res)=> {
//     const {id} = req.params;
//     connection.query('delete from  bd_t_mascotas.tbl_factura where id =? ', [id],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
// // ***********************************************SUMINISTRA*********************************************************

// // traer todos los suministra
// app.get("/api/suministra/", (req, res)=> {
//     connection.query('SELECT id, tbl_proveedores_RTN,tbl_productos_codigo  FROM bd_t_mascotas.tbl_suministra;', function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })
  

//   // traer los suministra por id
// app.get("/api/suministra/:id", (req, res)=> {
//     const {id} = req.params;
//     connection.query('SELECT id, tbl_proveedores_RTN,tbl_productos_codigo  FROM bd_t_mascotas.tbl_suministra where id =? ', [id],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })  


// // Enviar una nuevo suministra
// app.post("/api/suministra/", (req, res)=>{
//     const {id, tbl_proveedores_RTN,tbl_productos_codigo}= req.body
//   connection.query('INSERT INTO bd_t_mascotas.tbl_suministra (id, tbl_proveedores_RTN,tbl_productos_codigo) VALUES (?,?,?);', 
//   [id, tbl_proveedores_RTN,tbl_productos_codigo], function(err, rows) {
//         if (err) throw err;
//         res.status(200).json(rows)
//     });
// })

// // actualizar suministra
// //pendiente a corregir
// app.put("/api/suministra/:id", (req, res)=> {
//     const {id} = req.params;
//     const {tbl_productos_codigo} = req.body;
//     connection.query('UPDATE bd_t_mascotas.tbl_suministra SET tbl_productos_codigo=?  WHERE id= ? ',
  
//    [ tbl_productos_codigo,  id],  function(err, rows) {
//           if (err) throw err; 
//           res.status(200).json(rows)
//       }); 
//   })

// // borrar  suministra
// app.delete("/api/suministra/:id", (req, res)=> {
//     const {id} = req.params;
//     connection.query('delete from  bd_t_mascotas.tbl_suministra where id =? ', [id],
//    function(err, rows) {
//           if (err) throw err;
//           res.status(200).json(rows)
//       });
//   })



// app.listen(3000, ()=>{
//     console.log(`la app se esta ejecutando en elpuerto ${4000}`);
// })
