
const { Commune } = require("../models/communeModel");
const { Departement } = require("../models/departementModel");
// const { Pays } = require("../models/paysModel")
const { ErrorMessage } = require("../utils/ErrorMessage");

module.exports.AddCommune = async (req, res, next) => {
    const departement = req.params.departement;
    const libelle = req.body.libelle


    try {

        const search = await  Departement.findOne({libelle: departement})
        
        if (search) {
            const newdaprtement = await new Commune({libelle:libelle,  departement: search._id })
            newdaprtement.save()
            res.json({ 'message': 'Création du commune éffectué avec succès', 'success': true })
        }
        else {
            next(ErrorMessage(500, 'création du département échouée '))
        }
    } catch (error) {
        next(ErrorMessage(500, 'création du département échouée '+departement))
    }
}

module.exports.updateCommune = async (req, res, next) => {
    const id = req.params.id
    const body = req.body

    try {
        const updatecommune = await Commune.findByIdAndUpdate(id, { $set: body });
        res.send(`commune ${id} updated successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Mise à jour échouée'))
    }

}

module.exports.deleteCommune = async (req, res, next) => {
    const id = req.params.id

    try {
        const deletedcommune = await Commune.findByIdAndDelete(id)
        res.send(`commune ${id} deleted successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Suppression échouée'))
    }
}

module.exports.allCommuneBydepartement = async (req, res, next) => {
    const communeLibelle = req.params.departement;

    try {

        const searchCommune = await Departement.findOne({libelle: communeLibelle.toLowerCase() })
        if (searchCommune) {

            const liste = await Commune.find({ departement: searchCommune._id })
            res.send(liste);

        }
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficher la liste des communes'))

    }

}

module.exports.allCommuneByPays = async (req, res, next) => {
    const communeLibelle = req.params.departement;

    try {

        const searchCommune = await Departement.findOne({libelle: communeLibelle.toUpperCase() })
        if (searchCommune) {

            const liste = await Commune.find({ departement: searchCommune._id })
            res.send(liste);

        }
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficher la liste des communes'))

    }

}

module.exports.OneCommune = async (req, res, next) =>{
    const id = req.params.id;

    try {
        const commune = await Commune.findById(id)
        res.json(commune);
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficherle département demandé'))
    }
} 