const express = require("express");
const { addVille,allVille,deleteVille,UpdateVille,OneVille, allVilleByDepartement, allVilleByPays } = require('./../controllers/villeController.js')
const route = express.Router()


route.get('/ville/:commune',allVille);
route.get('/ville/depatement/:departement',allVilleByDepartement);
route.get('/ville/pays/:id',allVilleByPays);
route.get('/ville/info/:id',OneVille);
route.post('/ville/:commune',addVille);
route.delete('/ville/:id',deleteVille);
route.put('/ville/:id',UpdateVille);


module.exports.villeRouter = route;
