const Race = require('../models/race')
const Class = require('../models/class')
const Item_base = require('../models/item_base')
const Item_rarity = require('../models/item_rarity')
const Equipment = require('../models/equipment')
const Inventory = require('../models/inventory')
const Item = require('../models/item')
const User = require('../models/user')
const Exptable = require('../models/exptable')
const bcrypt = require('bcrypt');
const passport = require('passport');
const { find, update } = require('../models/item_base')
require('../db/funkcje')





 exports.character_page_get = function(req,res){

    User.findById(req.user)
     .populate('rasa')
     .populate('klasa')
     .exec(function(err, user_ext){
        updateStats(req.user)
        checklevelUp(req.user)

        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie
        //console.log(curr_dosw +'/'+next_lvl.doswiadczenie)

        res.render('character',{
            user: user_ext,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Statystyki postaci'
            });

        })



              
      });     

}
exports.character_page_post_rozdaj = function(req,res){
var sila = req.body.sila
var zrecznosc = req.body.zrecznosc
var wytrzymalosc = req.body.wytrzymalosc

    User.findById(req.user)
     .populate('rasa')
     .populate('klasa')
     .exec(function(err, user_ext){
        if(sila || zrecznosc || wytrzymalosc){
            var sila_int
            var zrecznosc_int
            var wytrzymalosc_int
            if(!sila)  sila_int = 0
            else sila_int = parseInt(sila)

            if(!zrecznosc) zrecznosc_int = 0
            else zrecznosc_int = parseInt(zrecznosc)

            if(!wytrzymalosc) wytrzymalosc_int = 0
            else wytrzymalosc_int = parseInt(wytrzymalosc)
            
            
            var suma = sila_int+zrecznosc_int+wytrzymalosc_int
            
            if((suma) <= user_ext.punkty_statystyk){
                user_ext.punkty_statystyk -= suma
                user_ext.sila_base += sila_int
                user_ext.zrecznosc_base += zrecznosc_int
                user_ext.wytrzymalosc_base += wytrzymalosc_int
                user_ext.save()

                req.flash('success_msg','Zapisano punkty')
                updateStats(user_ext)  
                 
            }
            else{
                req.flash('error_msg','Nie masz wystarczająco punktów') 
                
            }



            
            

        }
        else{
            req.flash('error_msg','Nie wypełniłeś pól') 
            
        }
        res.redirect('/character/stats') 
        
        

        
        




        

              
      });     

}


exports.inventory_page_get = function(req,res){

    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){

        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie

        
        res.render('inventory',{
            user: user_ext,
            przedmioty: inventory.przedmioty,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Przedmioty postaci'
            });

        })
     })

    })

}

exports.inventory_page_post_filtruj = function(req,res){
var typ = req.body.typ

    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie



        var sortedArray = []
        inventory.przedmioty.forEach(przedmiot => {
            if(przedmiot.typ == typ){
                sortedArray.push(przedmiot)
            }


        
        });
       // console.log(sortedArray)
        
        




        res.render('inventory',{
            user: user_ext,
            przedmioty: sortedArray,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Przedmioty postaci'
            });

        })
     })

    })

}





exports.inventory_page_post_zaloz = function(req,res){
    var id = req.body.do_zalozenia

    var inv_p = Inventory.findOne({username: req.user.username}).populate('przedmioty').exec()
    var item_p = Item.findById(id).exec()
    var equip_p = Equipment.findOne({username: req.user.username}).populate('bron').exec()
    Promise.all([inv_p, item_p, equip_p]).then(([inv_w, item_w, equip_w]) => {   
    


       if(item_w.typ == 'Tarcza')
       {
           if(equip_w.tarcza){addItemToUserInventory(req.user, equip_w.tarcza)}
            

        equip_w.tarcza = item_w

       }
       else if(item_w.typ == 'Hełm')
       {
        if(equip_w.helm){addItemToUserInventory(req.user, equip_w.helm)}
        equip_w.helm = item_w
       }
       else if(item_w.typ == 'Rękawice')
       {
        if(equip_w.rekawice){addItemToUserInventory(req.user, equip_w.rekawice)}
        equip_w.rekawice = item_w
       }


       else if(item_w.typ == 'Amulet')
       {
        if(equip_w.amulet){addItemToUserInventory(req.user, equip_w.amulet)}
        equip_w.amulet = item_w
       }
       else if(item_w.typ == 'Zbroja')
       {
        if(equip_w.zbroja){addItemToUserInventory(req.user, equip_w.zbroja)}
        equip_w.zbroja = item_w
       }
       else if(item_w.typ == 'Nogawice')
       {
        if(equip_w.nogawice){addItemToUserInventory(req.user, equip_w.nogawice)}
        equip_w.nogawice = item_w
       }
       else if(item_w.typ == 'Buty')
       {
        if(equip_w.buty){addItemToUserInventory(req.user, equip_w.buty)}
        equip_w.buty = item_w
       }
       removeItem(inv_w, item_w)
       updateStats(req.user)
        equip_w.save()
        res.redirect('/character/inventory')
      }).catch(err => {console.log(err)})

}

exports.inventory_page_post_zaloz2 = function(req,res){
    var main = req.body.do_zalozenia_main
    var off = req.body.do_zalozenia_off
    var lewy = req.body.do_zalozenia_left
    var prawy = req.body.do_zalozenia_right

    var id
    if(main)    {   id = main  }
    else if(off){   id = off }
    else if(lewy){   id = lewy}
    else if(prawy){ id = prawy}


    var inv_p = Inventory.findOne({username: req.user.username}).populate('przedmioty').exec()
    var item_p = Item.findById(id).exec()
    var equip_p = Equipment.findOne({username: req.user.username}).populate('bron').exec()
    Promise.all([inv_p, item_p, equip_p]).then(([inv_w, item_w, equip_w]) => {   
        if(item_w.typ == 'Broń')
       {
        if(main) {
            if(equip_w.bron){addItemToUserInventory(req.user, equip_w.bron)}
             equip_w.bron = item_w 
            }
        if(off) {
            if(equip_w.tarcza){addItemToUserInventory(req.user, equip_w.tarcza)}
            equip_w.tarcza = item_w
        }
       }
       if(item_w.typ == 'Pierścień')
       {
        if(lewy) {
            if(equip_w.pierscien_1){addItemToUserInventory(req.user, equip_w.pierscien_1)}
            equip_w.pierscien_1 = item_w }
        if(prawy) {
            if(equip_w.pierscien_2){addItemToUserInventory(req.user, equip_w.pierscien_2)}
            equip_w.pierscien_2 = item_w}    
       }





       removeItemFromUserInventory(req.user, item_w)
       //removeItem(inv_w, item_w)
       updateStats(req.user)
        equip_w.save()
        
        res.redirect('/character/inventory')
      }).catch(err => {console.log(err)})

}





exports.equipment_page_get = function(req,res){
    User.findById(req.user)
        .populate('rasa')
         .populate('klasa').exec(function(err, user_ext){

            var curr_poziom = user_ext.poziom
            var next_p = curr_poziom + 1
            Exptable.findOne({poziom: next_p}).then((next_lvl) => {
          var curr_dosw = user_ext.doswiadczenie


    Equipment.findOne({username: req.user.username})
    .deepPopulate(
    ['bron', 'bron.itembase',
    'tarcza', 'tarcza.itembase',
    'helm', 'helm.itembase',
    'zbroja', 'zbroja.itembase',
    'nogawice', 'nogawice.itembase',
    'buty', 'buty.itembase',
    'rekawice', 'rekawice.itembase',
    'pierscien_1', 'pierscien_1.itembase',
    'pierscien_2', 'pierscien_2.itembase',
    'amulet', 'amulet.itembase',
    ])
    .exec(function(err, inventory){

        updateStats(req.user)

        res.render('equipment',{
            ekwipunek: inventory,
            user: user_ext,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Wyposażenie postaci'
            });

        })

    })
})

}

exports.equipment_page_post_zdejmij = function(req,res){
var user = req.user
var do_zdjecia = req.body.do_zdjecia
var which = req.body.which

Item.findById(do_zdjecia).exec(function(err, ite){
    removeItemFromEquipment(user, ite, which)
    addItemToUserInventory(user,ite)
    updateStats(req.user)
})


res.redirect('/character/equipment')
}

exports.leczenie_page_get = function(req,res){
var user = req.user
User.findById(req.user)
     .populate('rasa')
     .populate('klasa')
     .exec(function(err, user_ext){
         var heal_value = user_ext.zycie_m - user_ext.zycie_curr
         var heal_cost = heal_value*2
        var leczenie = 'By się wyleczyć z ' + heal_value + ' punktów życia musisz wydać ' + heal_cost + ' złota.'

        var curr_poziom = user_ext.poziom
            var next_p = curr_poziom + 1
            Exptable.findOne({poziom: next_p}).then((next_lvl) => {
          var curr_dosw = user_ext.doswiadczenie

        res.render('leczenie',{
            user: user_ext,
            leczenie: leczenie,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Leczenie'
            });

              
      });     
    })



}
exports.leczenie_page_post = function(req,res){

    var user = req.user
User.findById(req.user)
     .populate('rasa')
     .populate('klasa')
     .exec(function(err, user_ext){
         var heal_value = user_ext.zycie_m - user_ext.zycie_curr
         var heal_cost = heal_value*2
        var leczenie = 'By się wyleczyć z ' + heal_value + ' punktów życia musisz wydać ' + heal_cost + ' złota.'

        user_ext.zycie_curr +=heal_value
        if(user_ext.zloto >= heal_cost){
        user_ext.zloto -= heal_cost  
        user_ext.save()
        req.flash('success_msg','Wyleczono ' + heal_value + ' punktów życia ')
        res.redirect('/character/leczenie')
        }
        else{
            req.flash('error_msg','Nie masz wystarczająco złota')
            res.redirect('/character/leczenie')

        }

        

    
              
      });



    

}