
const mongoose = require("mongoose");

var paysSchema = new mongoose.Schema({

    libelle: {
        type:String,
        required:true,
        unique:true
    },
    code:{
        type:String,
        required:true
    },
    devise:{
        type:String,
        required:true
    },
    superficie:{
        type:String,
        required:true
    },
    habitants:{
        type:String,
        required:true
    },
    continent:{
        type:String,
        required:true,
    },
    flag:{
        type:String
    }


},{ timestamps: true })

module.exports.Pays = mongoose.model('Pays', paysSchema);