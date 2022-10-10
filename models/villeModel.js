const mongoose = require("mongoose");

const arrondissementSchema = mongoose.Schema({

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

module.exports.Arrondissement  = mongoose.model('Arrondissement',arrondissementSchema)