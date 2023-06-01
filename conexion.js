var mysql = require('mysql');
const express = require('express')
const conexion = express.Router()


var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'mybd',
  user     : 'app_dappweb',
  password : '271105',
  database : "bd_t_mascotas"
  

});


connection.connect();

module.exports= conexion ;