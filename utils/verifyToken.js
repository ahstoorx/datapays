const jwt = require('jsonwebtoken');
const { CreateError } = require('./ErrorMessage');

module.exports.TokenVerify = (req,res,next) => {
    const token = req.cookies.access_token;

    if (token) {

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                res.json({
                    error: true,
                    message: 'Invalide token'
                })
            }
            else {
                req.user = user;
            }
        });

    }
    else {
       next(CreateError(301,"Invalide cookies"))
    }
};

