const Race = require('../models/race')
const Class = require('../models/class')
const Item_base = require('../models/item_base')
const Item_rarity = require('../models/item_rarity')
const Equipment = require('../models/equipment')
const Item = require('../models/item')
const User = require('../models/user')
require('../db/funkcje')
const Exptable = require('../models/exptable')

  exports.index = function(req,res){
      //console.log('strona glowna')

      User.findById(req.user)
        .populate('rasa')
         .populate('klasa').exec(function(err, user_ext){
          if(user_ext){
               var curr_poziom = user_ext.poziom
               var next_p = curr_poziom + 1
               Exptable.findOne({poziom: next_p}).then((next_lvl) => {
             var curr_dosw = user_ext.doswiadczenie
             res.render('index',{
               user: user_ext,
               next_lvl: next_lvl.doswiadczenie,
               title: 'Strona główna'
               });
       
               })
                   }
       
                   else{
                       res.render('index',{
                           
                           title: 'Strona główna'
                           });
       
       
                   }




          


         })
    }




