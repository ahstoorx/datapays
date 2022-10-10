const mongoose = require("mongoose");

const communeSchema = mongoose.Schema({

    libelle:
    {
        type: String,
        required : true
    },
    departement:{
        type:String,
        required : true
    }
}, { timestamps: true })

module.exports.Commune  = mongoose.model('Commune',communeSchema)