const mongoose = require('mongoose')

const droptableSchema = new mongoose.Schema({
    nazwa:{
        type: String
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Droptable_item'
    }],
    
    
})

const Droptable = mongoose.model('Droptable', droptableSchema)
module.exports = Droptable