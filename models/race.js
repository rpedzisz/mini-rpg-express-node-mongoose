const mongoose = require('mongoose')

const raceSchema = new mongoose.Schema({
    nazwa:{
        type: String,
        required: true
    },
    obrazek: {
        type: String,
        default: ''
    },
    sila_mod: {
        type: Number,
        default: 1.0
    },
    zrecznosc_mod: {
        type: Number,
        default: 1.0
    },
    wytrzymalosc_mod: {
        type: Number,
        default: 1.0
    }
    
    
}
    )

const Race = mongoose.model('Race', raceSchema)
module.exports = Race