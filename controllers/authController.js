const { User } = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { ErrorMessage } = require("../utils/ErrorMessage");

module.exports.UserRegister = async (req, res,next) => {
    const userInfo = req.body;

    const passwordCrypt = await bcrypt.hash(userInfo.password, 8)

    const newUser = new User({...userInfo,password:passwordCrypt})
    try {

        const saveUser = await newUser.save();
        const contenu = {
            state: 'success',
            message: 'Account create successfully'
        }
        res.status(200).json(contenu);

    } catch (error) {
        next(ErrorMessage(500,'Impossibloe de créer un nouveau utilisateur'))
    }
};


module.exports.loginUser = async (req, res,next)=>{
    const {username,password} = req.body

    try {
        const user = await User.findOne({username:username});

        if(user)
        {
            const checkPassword = await bcrypt.compare(password,user.password)
            if(checkPassword)
            {
                const {password,isAdmin, ...otherDetails} = user._doc;
                const token  = jwt.sign({
                    id:user._id,
                    isAdmin:user.isAdmin
                },process.env.JWT)
               res.cookie('access_token', token,{
                httpOnly:true
               }).json({
                    state:'success',
                    message:{...otherDetails}
                })
                 
            }
            else{
                next(ErrorMessage(500,'email ou mot de passe erroné'))
            }
        }
        else{
            next(ErrorMessage(500,'Utilisateur non reconnu'))
        }
    } catch (error) {
        next(ErrorMessage(500,'Un soucis de connection au serveur'))
    }
};