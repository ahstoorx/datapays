const mongoose = require("mongoose");

const arrondissementSchema = mongoose.Schema({

    libelle:
    {
        type: String,
        required : true
    },
    ville:{
        type:String,
        required : true
    }
}, { timestamps: true })

module.exports.arrondissement  = mongoose.model('arrondissement',arrondissementSchema)