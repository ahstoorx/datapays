
const express = require("express");
const { AddCommune,updateCommune,deleteCommune,allCommuneByPays,OneCommune,allCommuneBydepartement } = require('./../controllers/communeController')
const route = express.Router()

route.post('/commune/:departement',AddCommune);
route.get('/commune/:departement',allCommuneBydepartement)
route.get('/commune/info/:id',OneCommune)
route.delete('/commune/:id',deleteCommune)
route.put('/commune/:id',updateCommune)


module.exports.ComRouter= route