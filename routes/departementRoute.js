 const express = require("express");
 const { AddDepartement,updateDepartement,deleteDepartement,allDepartementByPays,OneDepartement } = require('./../controllers/departemenController.js')
 const route = express.Router()

 route.post('/departement/:pays',AddDepartement);
 route.get('/departement/:pays',allDepartementByPays)
 route.get('/departement/info/:id',OneDepartement)
 route.delete('/departement/:id',deleteDepartement)
 route.put('/departement/:id',updateDepartement)


 module.exports.DepRouter= route