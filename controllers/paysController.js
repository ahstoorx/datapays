

const { Pays } = require("../models/paysModel");
const { ErrorMessage } = require("../utils/ErrorMessage");


module.exports.AddPays = async (req, res, next) => {
    data = req.body;

    try {
        newUser = await new Pays(data);

        newUser.save();
        res.json({ 'message': 'Création de pays éffectué avec succès', 'success': true })
    } catch (error) {
        next(ErrorMessage(500, 'création du pays échouée'));
    }


}

module.exports.updatePays = async (req, res, next) => {
    const id = req.params.idpays;
    const newValue = req.body;

    try {
        let updatedata = await Pays.findByIdAndUpdate(id, { $set: newValue })
        res.send(`pays ${id} updated successfully`);

    } catch (error) {
        next(ErrorMessage(500, 'Mise à jour échouée'))
    }
}

module.exports.deletePays = async (req, res, next) => {
    const id = req.params.idpays;

    try {
        let deletepays = await Pays.findByIdAndDelete(id)
        res.send(`pays ${id} deleted successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Suppression échouée'))
    }

}

module.exports.allPays = async (req, res, next) => {

    try {
        const pays = await Pays.find();
        res.json(pays);
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficher la liste des pays'))
    }
}

module.exports.onePays = async (req, res, next) => {
    const id = req.params.idpays
    try {
        const pays = await Pays.findById(id);
        res.json(pays);
    } catch (error) {
        next(ErrorMessage(500, 'Impossible d\'afficher le pays demandé'))
    }
}
