const mongoose = require('mongoose')

const itemschema = new mongoose.Schema({
    
    nazwa: {
        type: String,
        default: '1'
    },
    typ: {
        type: String,
        default: 'Broń'
    },
    
    atak: {
        type: Number,
        default: 0
    }, 
    atak_m: {
        type: Number,
        default: 0
    }, 
    obrona: {
        type: Number,
        default: 0
    },
    obrona_m: {
        type: Number,
        default: 0
    },
    pancerz: {
        type: Number,
        default: 0
    },
    pancerz_m: {
        type: Number,
        default: 0
    },
    obrazenia_min: {
        type: Number,
        default: 0
    },
    obrazenia_min_m: {
        type: Number,
        default: 0
    },
    obrazenia_max: {
        type: Number,
        default: 0
    },
    obrazenia_max_m: {
        type: Number,
        default: 0
    },
    sila_add: {
        type: Number,
        default: 0
    },
    sila_add_m: {
        type: Number,
        default: 0
    },
    zrecznosc_add: {
        type: Number,
        default: 0
    },
    zrecznosc_add_m: {
        type: Number,
        default: 0
    },
    wytrzymalosc_add: {
        type: Number,
        default: 0
    },
    wytrzymalosc_add_m: {
        type: Number,
        default: 0
    },
    wartosc: {
        type: Number,
        default: 0
    },


    itembase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item_base'
    }, 
    rzadkosc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item_rarity'
    },
    
    
    
}
    )


const Item = mongoose.model('Item', itemschema)
module.exports = Item