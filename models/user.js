const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        default: 'password'
    },
    admin: {
        type: Boolean,
        
    },
    obrazek: {
        type: String,
        default: '/images/photo/default.jpg'
        
    },


    rasa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Race'
    },   
    klasa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class'
    },  

    poziom: {
        type: Number,
        
    },   
    doswiadczenie: {
        type: Number,
        
    },   
    punkty_statystyk: {
        type: Number,
        
    },  

    zloto: {
        type: Number,
        
    },   
    wyposazenie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    },   
    ekwipunek: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory'
        
    },   
    sila_base: {
        type: Number,
        
    },  
    sila_m: {
        type: Number,
        
    },   
    zrecznosc_base: {
        type: Number,
        
    },
    zrecznosc_m: {
        type: Number,
        
    },   
    wytrzymalosc_base: {
        type: Number,
        
    },  
    wytrzymalosc_m: {
        type: Number,
        
    }, 
    atak_base: {
        type: Number,
        
    },   
    atak_m: {
        type: Number,
        
    },  
    obrona_base: {
        type: Number,
        
    },
    obrona_m: {
        type: Number,
        
    },     
    pancerz_base: {
        type: Number,
        
    },
    pancerz_m: {
        type: Number,
        
    },

    obrazenia_base_min: {
        type: Number,
        
    },   
    obrazenia_min_m: {
        type: Number,
        
    }, 
    obrazenia_base_max: {
        type: Number,
        
    },
    obrazenia_max_m: {
        type: Number,
        
    },

    zycie_curr: {
        type: Number,
        
    }, 

    zycie_base: {
        type: Number,
        
    },   
    zycie_m: {
        type: Number,
        
    },  

    energia: {
        type: Number,
        
    }


}
    )


    const deepPopulate = require('mongoose-deep-populate')(mongoose);
    userSchema.plugin(deepPopulate);
const User = mongoose.model('User', userSchema)
module.exports = User