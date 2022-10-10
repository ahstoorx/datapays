const mongoose = require("mongoose");

const departementSchema = mongoose.Schema({

    libelle:
    {
        type: String,
        required : true
    },
    pays:{
        type:String,
        required : true
    }
}, { timestamps: true })

module.exports.Departement  = mongoose.model('Departement',departementSchema)