const mongoose = require('mongoose')

const monsterSchema = new mongoose.Schema({
    nazwa:{
        type: String,
        required: true
    },
    obrazek: {
        type: String,
        default: ''
    },
    atak: {
        type: Number,
        default: 1.0
    },
    
    poziom: {
        type: Number,
        default: 1.0
    },
    obrona: {
        type: Number,
        default: 1.0
    },
    obrazenia_min: {
        type: Number,
        default: 1.0
    },
    obrazenia_max: {
        type: Number,
        default: 1.0
    },
    pancerz: {
        type: Number,
        default: 0
    },
    zycie: {
        type: Number,
        default: 1.0
    },
    doswiadczenie: {
        type: Number,
        default: 1.0
    },
    zloto: {
        type: Number,
        default: 1.0
    },

    droptable:
    
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Droptable' 
      }
    
    

    
})

const deepPopulate = require('mongoose-deep-populate')(mongoose);
    monsterSchema.plugin(deepPopulate);

const Monster = mongoose.model('Monster', monsterSchema)
module.exports = Monster