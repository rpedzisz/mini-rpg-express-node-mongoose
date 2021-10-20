const mongoose = require('mongoose')

const droptable_itemSchema = new mongoose.Schema({
    itembase: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item_base'
    },
    rzadkosc: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item_rarity'
    },
    szansa: {
        type: Number,
      
    },
    
    
})

const Droptable_item = mongoose.model('Droptable_item', droptable_itemSchema)
module.exports = Droptable_item