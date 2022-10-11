const { Ville } = require('./../models/villeModel')
const { Commune } = require('./../models/communeModel')
const { ErrorMessage } = require('./../utils/ErrorMessage');
const { Pays } = require('../models/paysModel');
const { Departement } = require('../models/departementModel');

module.exports.addVille = async (req, res, next) => {
    const commune = req.params.commune;
    const body = req.body;

    try {
        const lacommune = await Commune.findOne({ libelle: commune });
        if (lacommune) {
            const createVille = await new Ville({ libelle: body.libelle, commune: lacommune.libelle });
            createVille.save();
            res.json({ 'message': 'Création de la ville éffectué avec succès', 'success': true })
        }
        else {
            res.json({ 'message': 'Erreur lors de la création de la ville ' + commune, 'success': commune })
        }
    } catch (error) {
        next(ErrorMessage(500, 'Création de ville échouée'))
    }
}


module.exports.allVille = async (req, res, next) => {
    const commune = req.params.commune;

    try {

        const findConmmune = await Commune.find({ libelle: commune.toUpperCase() });
        if (findConmmune) {
            const all = await Ville.find({ commune: commune });
            res.send(all)
        }
        else {
            next(ErrorMessage(500, 'La commune selectionné n\'exite pas ou veiillez revoir l\'orthographe'))
        }
    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
    }
}

module.exports.allVilleByDepartement = async (req, res, next) => {
    const commune = req.params.commune;

    try {
        const findConmmune = await Commune.findOne({ libelle: commune });
        if (findConmmune) {
            const all = await Ville.find({ commune: commune });
        }
        else {
            next(ErrorMessage(500, 'La commune selectionné n\'exite pas ou veiillez revoir l\'orthographe'))
        }
    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
    }
}

module.exports.allVilleByPays = async (req, res, next) => {
    const ville = [];

    const idPays = req.params.id

    try {

        const id = (idPays)

        const pays = await Pays.findOne({ libelle: idPays.toUpperCase() })

        if (pays) {

            const lePays = pays._id;

            const findDepartement = await Departement.find({ pays: lePays })

            if (findDepartement) {



                findDepartement.forEach(async (departement) => {

                    const findConmmune = await Commune.find({ departement: departement._id });

                    if (findConmmune) {
                        setTimeout(async () => {
                            const valeur = await new Promise((resolve, reject) => {

                                for (let i = 0; i < findConmmune.length; i++) {
                                    const commune = findConmmune[i]
                                    ville.push(i)
                                    
                                    const all =async ()=> await Ville.find({ commune: commune.libelle });

                                    if (all) {
                                        for (let b = 0; b < all.length; b++) {
                                            ville.push(all[b]);
                                        }
                                    }
                                }

                                resolve(res.send(ville))

                            })
                        }, 500);

                    }

                });

            }
            else {
                next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête 1'))
            }

        }
        else {
            next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête 2'))
        }
        // 

    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête 3 ' + error))
    }
}


module.exports.OneVille = async (req, res, next) => {
    const id = req.params.id;

    try {
        const villeInfo = await Ville.findById(id);

        if (villeInfo) {
            res.send(villeInfo)
        }
        else {
            next(ErrorMessage(500, 'La ville selectionné n\'exite pas ou veillez revoir l\'orthographe'))
        }
    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
    }
}

module.exports.UpdateVille = async (req, res, next) => {
    const id = req.params.id;
    const data = req.body

    try {
        const updatedVille = await Ville.findByIdAndUpdate(id, { $set: data });
        if (updatedVille) {
            res.send(`ville ${id} updated successfully`);
        }
        else {
            next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
        }
    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
    }
}


module.exports.deleteVille = async (req, res, next) => {
    const id = req.params.id;

    try {
        const villeInfo = await Ville.findByIdAndDelete(id);

        if (villeInfo) {
            res.send(`Ville ${id} deleted successfully`);
        }
        else {
            next(ErrorMessage(500, 'La ville selectionné n\'exite pas ou veillez revoir l\'orthographe'))
        }

    } catch (error) {
        next(ErrorMessage(500, 'Une erreur est survenu lors dun traitement de la requête'))
    }
}