const mongoose = require('mongoose')

const inventorySchema = new mongoose.Schema({
    username:{
        type: String   
    },
    przedmioty: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Item"
        }
      ]




}
    )


    const deepPopulate = require('mongoose-deep-populate')(mongoose);
    inventorySchema.plugin(deepPopulate, {
      whitelist: ['przedmioty', 'przedmioty.itembase']
    });


const Inventory = mongoose.model('Inventory', inventorySchema)
module.exports = Inventory