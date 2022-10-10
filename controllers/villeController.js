const { Ville } = require('./../models/villeModel')
const { Commune } = require('./../models/communeModel')
const { ErrorMessage } = require('./../utils/ErrorMessage')

module.exports.addVille = async (req, res, next) => {
    const commune = req.commune;
    const body = req.body;

    try {
        const lacommune = await Commune.find({ 'libelle': commune });
        if (lacommune.length > 0) {
            const createVille = await new Ville(body, { 'commune': lacommune.libelle });
            createVille.save();
            res.json({ 'message': 'Création de la ville éffectué avec succès', 'success': true })
        }
        else {
            res.json({ 'message': 'Erreur lors de la création de la ville ', 'success': false })
        }
    } catch (error) {
        next(ErrorMessage(500, 'Création de ville échouée'))
    }
}