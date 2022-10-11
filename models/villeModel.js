const mongoose = require("mongoose");

const villeSchema = mongoose.Schema({

    libelle:
    {
        type: String,
        required : true
    },
    commune:{
        type:String,
        required : true
    }
}, { timestamps: true })

module.exports.Ville  = mongoose.model('Ville',villeSchema)