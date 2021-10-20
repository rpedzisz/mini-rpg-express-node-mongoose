const mongoose = require('mongoose')

const itemraritySchema = new mongoose.Schema({
    nazwa:{
        type: String,
        required: true
    },

    atak_mod: {
        type: Number,
        default: 1.0
    },   
    obrona_mod: {
        type: Number,
        default: 1.0
    },
    pancerz_mod: {
        type: Number,
        default: 1.0
    },
    obrazenia_mod: {
        type: Number,
        default: 1.0
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

    const deepPopulate = require('mongoose-deep-populate')(mongoose);
    itemraritySchema.plugin(deepPopulate);

const Item_rarity = mongoose.model('Item_rarity', itemraritySchema)
module.exports = Item_rarity