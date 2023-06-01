const express = require('express')
const rutas = express.Router()


const users= [
    {
      id: 1 ,
      nombre: "marcos",
      cargo: "administrador"
    },
    {
        id: 2 ,
        nombre: "marian",
        cargo: "useuario"
      }
    
]

rutas.get("/user", (req, res)=> {

          res.status(200).json(users)
      });

      rutas.get("/usuarios-admin", (req, res)=> {

        res.status(200).json(users)
    });
  module.exports= rutas