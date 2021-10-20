const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    nazwa:{
        type: String,
        required: true
    },
    obrazek: {
        type: String,
        default: 'password'
    },
    atak_mod: {
        type: Number,
        default: 1.0
    },
    obrona_mod: {
        type: Number,
        default: 1.0
    }
    
}
    )

const Class = mongoose.model('Class', classSchema)
module.exports = Class