const mongoose = require("mongoose");

const quartierSchema = mongoose.Schema({

    libelle:
    {
        type: String,
        required : true
    },
    arrondissement:{
        type:String,
        required : true
    }
}, { timestamps: true })

module.exports.Quartier  = mongoose.model('Quartier',quartierSchema)