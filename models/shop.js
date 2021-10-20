const mongoose = require('mongoose')

const shopSchema = new mongoose.Schema({
    itembase: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item_base"
        },
    rzadkosc: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item_rarity"
        },
    cena: 
        {
          type: Number,
          defaut: 100
        },
      




}
    )




const Shop = mongoose.model('Shop', shopSchema)
module.exports = Shop