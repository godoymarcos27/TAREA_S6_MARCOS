// var mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser');
var morgan = require('morgan')
const helmet = require('helmet')
const ruta_clientes= require('./cliente')
const ruta_mascotas= require("./mascotas")
const ruta_proveedores= require("./proveedores")
const ruta_productos= require("./productos ")
const ruta_facturas= require("./facturas")
const ruta_suministra= require("./suministra")
// const conexion = require('./conexion');
// const connections = require('./coneccion0.2');
const app = express() 



// app.use(conexion)
// app.use(connections)
// var connection = mysql.createConnection({
//     host     : 'localhost',
//     database : 'mybd',
//   user     : 'app_dappweb',
//   password : '271105',
//   database : "bd_t_mascotas"
   

// });

// connection.connect();



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
// app.use(myLogger)
app.use(morgan('combined'))
app.use(helmet())

// ***********INFO_CLIENTES*********
app.use(ruta_clientes)
// ***********INFO_MASCOTAS*********
app.use(ruta_mascotas)
// ***********INFO_PROVEEDORES*********
app.use(ruta_proveedores)
// ***********INFO_PRODUCTOS*********
app.use(ruta_productos)
// ***********INFO_FACTURAS*********
app.use(ruta_facturas)
// ***********INFO_SUMINISTRA*********
app.use(ruta_suministra)



 





app.listen(4000, ()=>{
    console.log(`la app se esta ejecutando en elpuerto ${4000}`);
})