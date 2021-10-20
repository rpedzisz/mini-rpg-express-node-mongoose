const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
    poziom:{
        type: Number,
        required: true
    },
    doswiadczenie: {
        type: Number,
        required: true
    },
    punkty: {
        type: Number,
        default: 5
    }
   
    
}
    )

const Exptable = mongoose.model('Exptable', expSchema)
module.exports = Exptable