const express = require("express");
const { AddPays,updatePays,deletePays,allPays,onePays } = require("../controllers/paysController");
const router = express.Router();

router.post('/pays',AddPays);
router.get('/pays',allPays);
router.get('/pays/:idpays',onePays);
router.put('/pays/:idpays',updatePays);
router.delete('/pays/:idpays',deletePays);


module.exports.paysRouter=router