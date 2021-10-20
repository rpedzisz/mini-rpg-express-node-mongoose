const mongoose = require('mongoose')

const equipmentSchema = new mongoose.Schema({
    username:{
        type: String   
    },
    bron: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        default: undefined
    },
    tarcza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
       ,default: undefined
    },
    helm: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    zbroja: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    nogawice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    buty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    rekawice: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    pierscien_1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    pierscien_2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    },
    amulet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
        ,default: undefined
    }




}
    )

    const deepPopulate = require('mongoose-deep-populate')(mongoose);
    equipmentSchema.plugin(deepPopulate);

const Equipment = mongoose.model('Equipment', equipmentSchema)
module.exports = Equipment