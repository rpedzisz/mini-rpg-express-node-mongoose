const mongoose = require('mongoose')

const itembaseSchema = new mongoose.Schema({
    nazwa:{
        type: String,
        required: true
    },
    obrazek: {
        type: String,
        default: ''
    },
    typ: {
        type: String,
        default: 'miecz'
    },
    opis: {
        type: String,
        default: 'to jest zwykły miecz'
    },
    
    atak_min: {
        type: Number,
        default: 0
    },   
    atak_max: {
        type: Number,
        default: 0
    },


    obrona_min: {
        type: Number,
        default: 0
    },
    obrona_max: {
        type: Number,
        default: 0
    },


    pancerz_min: {
        type: Number,
        default: 0
    },
    pancerz_max: {
        type: Number,
        default: 0
    },


    obrazenia_min1: {
        type: Number,
        default: 10
    },
    obrazenia_min2: {
        type: Number,
        default: 15
    },
    obrazenia_max1: {
        type: Number,
        default: 20
    },
    obrazenia_max2: {
        type: Number,
        default: 30
    },



    sila_add_min: {
        type: Number,
        default: 0
    },
    sila_add_max: {
        type: Number,
        default: 0
    },


    zrecznosc_add_min: {
        type: Number,
        default: 0
    },
    zrecznosc_add_max: {
        type: Number,
        default: 0
    },


    wytrzymalosc_add_min: {
        type: Number,
        default: 0
    },
    wytrzymalosc_add_max: {
        type: Number,
        default: 0
    }
    
    
}
    )
    const deepPopulate = require('mongoose-deep-populate')(mongoose);
    itembaseSchema.plugin(deepPopulate);
const Item_base = mongoose.model('Item_base', itembaseSchema)
module.exports = Item_base