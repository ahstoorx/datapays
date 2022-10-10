
const { Departement } = require("../models/departementModel");
const { Pays } = require("../models/paysModel")
const { ErrorMessage } = require("../utils/ErrorMessage");

module.exports.AddDepartement = async (req, res, next) => {
    const paysLibelle = req.params.pays;
    const libelle = req.body.libelle


    try {

        const search = await  Pays.findOne({libelle: paysLibelle.toUpperCase()})
        
        if (search) {
            const newdaprtement = await new Departement({libelle:libelle,  pays: search._id })
            newdaprtement.save()
            res.json({ 'message': 'Création du departement éffectué avec succès', 'success': true })
        }
        else {
            next(ErrorMessage(500, 'création du département échouée '))
        }
    } catch (error) {
        next(ErrorMessage(500, 'création du département échouée '))
    }
}

module.exports.updateDepartement = async (req, res, next) => {
    const id = req.params.id
    const body = req.body

    try {
        const updatedepartement = await Departement.findByIdAndUpdate(id, { $set: body });
        res.send(`departement ${id} updated successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Mise à jour échouée'))
    }

}

module.exports.deleteDepartement = async (req, res, next) => {
    const id = req.params.id

    try {
        const deleteddepartement = await Departement.findByIdAndDelete(id)
        res.send(`departement ${id} deleted successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Suppression échouée'))
    }
}

module.exports.allDepartementByPays = async (req, res, next) => {
    const payslibelle = req.params.pays;

    try {

        const serachPays = await Pays.findOne({libelle: payslibelle.toUpperCase() })
        if (serachPays) {

            const liste = await Departement.find({ pays: serachPays._id })
            res.send(liste);

        }
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficher la liste des départements'))

    }

}

module.exports.OneDepartement = async (req, res, next) =>{
    const id = req.params.id;

    try {
        const departement = await Departement.findById(id)
        res.json(departement);
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficherle département demandé'))
    }
} 