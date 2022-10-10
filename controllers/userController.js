const { User } = require("../models/userModel");
const { ErrorMessage } = require("../utils/ErrorMessage");


module.exports.updateUsers = async (req, res, next) => {

    const id = req.params.iduser;
    const newValue = req.body;


    try {
        const updateuser = await User.findByIdAndUpdate(id, { $set: newValue });
        res.send(`user ${id} updated successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'mise à jour échouée'))
    }

}

module.exports.deleteUsers = async (req, res, next) => {

    const id = req.params.userId;

    try {
        const updateuser = await User.findByIdAndDelete(id);
        res.send(`user ${id} deleted successfully`);
    } catch (error) {
        next(ErrorMessage(500, 'Suppression échouée'))
    }

}

module.exports.allUsers = async (req, res, next) => {
    try {
        const alluser = await User.find();
        res.json(alluser);;
    } catch (error) {
        next(ErrorMessage(500, 'Un souci d\'affichage'))
    }

}



// oneUsers
module.exports.oneUsers = async (req, res, next) => {
    const id = req.params.iduser
    try {
        const updateuser = await User.findById(id);
        res.json(updateuser);;
    } catch (error) {
        next(ErrorMessage(500, 'Un souci d\'affichage'))
    }

}