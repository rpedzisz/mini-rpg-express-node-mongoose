const Race = require('../models/race')
const Class = require('../models/class')
const Item_base = require('../models/item_base')
const Item_rarity = require('../models/item_rarity')
const Equipment = require('../models/equipment')
const Inventory = require('../models/inventory')
const Item = require('../models/item')
const User = require('../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport');
const { find, update, populate } = require('../models/item_base')
const Shop = require('../models/shop')
require('../db/funkcje')
const Exptable = require('../models/exptable')




 exports.shop_page_get = function(req,res){
    User.findById(req.user)
    .populate('rasa')
    .populate('klasa')
    .exec(function(err, user_ext){
    Shop.find({}).
    populate('itembase').
    populate('rzadkosc').then((items) => {
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie


    res.render('buy',{
        user: user_ext,
        przedmioty: items,
        next_lvl: next_lvl.doswiadczenie,
        title: 'Sklep'
        });

    })
    })
           
})

}


exports.shop_page_post_kup = function(req,res){
var item_base = req.body.do_kupienia
var rarity = req.body.rzadkosc
var price = req.body.cena
var redirect_back = req.body.redirect
console.log(item_base)

const base = Item_base.findById(item_base).exec()
const rar = Item_rarity.findById(rarity).exec()
const user = req.user
console.log(redirect_back)
if(user.zloto >= parseInt(price))
{
        Promise.all([base, rar]).then(([base_e, rarity_e]) => {  
            user.zloto -=parseInt(price)
            var item = generateItem(base_e, rarity_e)
            item.save()
            addItemToUserInventory(user,item)
            user.save()
            req.flash('success_msg','Zakupiono przedmiot ' + item.nazwa)   
            res.redirect('/city/buy')

        })
    }
    else{
        req.flash('error_msg','Nie masz wystarczająco złota')
        res.redirect('/city/buy')
    }



}
exports.shop_page_post_filtruj = function(req,res){
    
    var typ = req.body.typ

    Shop.find({})
    .populate('itembase')
    .populate('rzadkosc').exec(function(err, shopitems){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){

        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie

        //console.log(shopitems)
        var sortedArray = []
        shopitems.forEach(przedmiot => {
            if(przedmiot.itembase.typ == typ){
                sortedArray.push(przedmiot)
            }

        });
      

        res.render('buy',{
            user: user_ext,
            przedmioty: sortedArray,
            title: 'Sklep',
            next_lvl: next_lvl.doswiadczenie
            });
     })
    })
    })



}

exports.sell_page_get = function(req,res){
    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie
        
        res.render('sell',{
            user: user_ext,
            przedmioty: inventory.przedmioty,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Sprzedaj'
            });

        })
     })

    })

}

exports.sell_page_post_sprzedaj = function(req,res){
  
    var item = req.body.do_sprzedazy
  
    
    
    
    const item_p = Item.findById(item).exec()
    const user = req.user
    
    
            Promise.all([item_p]).then(([item_e]) => {  
                user.zloto +=item_e.wartosc
                
                removeItemFromUserInventory(user, item_e)
                
                Item.findByIdAndDelete(item, function (err, i) { 
                    if (err){ 
                        console.log(err) 
                    } 
                    else{ 
                        console.log("Deleted : ", i); 
                    } 
                }); 

                user.save()
                req.flash('success_msg','Sprzedano przedmiot ' + item_e.nazwa)   
                res.redirect('/city/sell')
    
            })
        






}


exports.sell_page_post_filtruj = function(req,res){
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
        
        res.render('sell',{
            user: user_ext,
            przedmioty: sortedArray,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Sprzedaj'
            });
     })
    })

    })

}

exports.forge_page_get = function(req,res){
    
    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie


        res.render('forge',{
            user: user_ext,
            przedmioty: inventory.przedmioty,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Ulepszanie przedmiotów'

            });

        })
     })

    })
    

}

exports.forge_page_post_wybrano = function(req,res){
    
    var item = req.body.wybierz_przedmiot
    console.log(item)
    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        

        Item.findById(item)
        .populate('itembase')
        .populate('rzadkosc')
        .exec(function(err, item_e){

            Item_rarity.find({}).sort('atak_mod').exec(function(err, rarities){
                var curr_rzadkosc = item_e.rzadkosc
            if(curr_rzadkosc.nazwa != 'legendarny')
            {
            
                for(i = 0; i<rarities.length; i++){
                    console.log(rarities[i].nazwa)
                    if(rarities[i].nazwa == curr_rzadkosc.nazwa){
                        
                        var next_rarity = rarities[i+1]
                        
                        
                    }

                }
                
                var cena_ulepszenia = 0

               if(curr_rzadkosc.nazwa == 'zniszczony'){
                    cena_ulepszenia = item_e.wartosc *0.5

                }
                else if(curr_rzadkosc.nazwa == 'uszkodzony'){
                    cena_ulepszenia = item_e.wartosc *1.5

                }

                else if(curr_rzadkosc.nazwa == 'zwykły'){
                    cena_ulepszenia = item_e.wartosc *2.5

                }
                else if(curr_rzadkosc.nazwa == 'niepospolity'){
                    cena_ulepszenia = item_e.wartosc *4.5

                }
                else if(curr_rzadkosc.nazwa == 'rzadki'){
                    cena_ulepszenia = item_e.wartosc *7.5

                }
                else if(curr_rzadkosc.nazwa == 'unikalny'){
                    cena_ulepszenia = item_e.wartosc *10.5

                }
                var informacje = 'By ulepszyć przedmiot z ' + curr_rzadkosc.nazwa + ' na ' + next_rarity.nazwa + ' musisz zapłacić '+ cena_ulepszenia + ' zlota'

            }
            else
            {
                var informacje = 'Przedmiot jest na maksymalnym poziomie ulepszeń'
            }
                console.log(informacje)
            

               // req.flash('error_msg','Wystąpiły błędy')


        
        res.render('forge',{
            user: user_ext,
            przedmioty: inventory.przedmioty,
            info: informacje,
            wybrany_przedmiot: item_e,
            title: 'Ulepszanie przedmiotów'
            });

        })


        })

     })

    })
    

}
exports.forge_page_post_ulepsz = function(req,res){
    var item = req.body.przedmiot
    var czyulepszono = ''
    console.log(item)
    Inventory.findOne({username: req.user.username })
    .deepPopulate(['przedmioty', 'przedmioty.itembase']).exec(function(err, inventory){
        

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        

        Item.findById(item)
        .populate('itembase')
        .populate('rzadkosc')
        .exec(function(err, item_e){
            
            Item_rarity.find({}).sort('atak_mod').exec(function(err, rarities){
                var curr_rzadkosc = item_e.rzadkosc
                var informacje = ''
            if(curr_rzadkosc.nazwa != 'legendarny')
            {
            
                for(i = 0; i<rarities.length; i++){
                    console.log(rarities[i].nazwa)
                    if(rarities[i].nazwa == curr_rzadkosc.nazwa){
                        
                        var next_rarity = rarities[i+1]
                        
                        
                    }

                }
                
                var cena_ulepszenia = 0

               if(curr_rzadkosc.nazwa == 'zniszczony'){
                    cena_ulepszenia = item_e.wartosc *0.5

                }
                else if(curr_rzadkosc.nazwa == 'uszkodzony'){
                    cena_ulepszenia = item_e.wartosc *1.5

                }

                else if(curr_rzadkosc.nazwa == 'zwykły'){
                    cena_ulepszenia = item_e.wartosc *2.5

                }
                else if(curr_rzadkosc.nazwa == 'niepospolity'){
                    cena_ulepszenia = item_e.wartosc *4.5

                }
                else if(curr_rzadkosc.nazwa == 'rzadki'){
                    cena_ulepszenia = item_e.wartosc *7.5

                }
                else if(curr_rzadkosc.nazwa == 'unikalny'){
                    cena_ulepszenia = item_e.wartosc *10.5

                }
                //var informacje = 'By ulepszyć przedmiot z ' + curr_rzadkosc.nazwa + ' na ' + next_rarity.nazwa + ' musisz zapłacić '+ cena_ulepszenia + ' zlota'
                
                
                if(user_ext.zloto>= cena_ulepszenia){
                    user_ext.zloto -= cena_ulepszenia
                    
                    item_e = updateItemRarity(item_e, next_rarity )
                    item_e.save()
                    user_ext.save()
                informacje = 'By ulepszyć przedmiot z ' + curr_rzadkosc.nazwa + ' na ' + next_rarity.nazwa + ' musisz zapłacić '+ cena_ulepszenia + ' zlota'
                    //res.redirect('/city/forge')
                    czyulepszono = 'Ulepszono przedmiot z ' + curr_rzadkosc.nazwa + ' na ' + next_rarity.nazwa
                   // req.flash('success_msg','Ulepszono przedmiot z ' + curr_rzadkosc.nazwa + ' na ' + next_rarity.nazwa)
                }
                else
                {
                    czyulepszono = 'Nie masz wystarczająco złota'
                }


                


            }
            else
            {
                czyulepszono = 'Tego przedmiotu nie można wyżej ulepszyć'
                informacje = 'Przedmiot jest na maksymalnym poziomie ulepszeń'
              //  req.flash('error_msg','Tego przedmiotu nie można wyżej ulepszyć')
            }
              
            

               


        
        res.render('forge',{
            user: user_ext,
            przedmioty: inventory.przedmioty,
            info: informacje,
            czyulepszon: czyulepszono,
            wybrany_przedmiot: item_e,
            title: 'Ulepszanie przedmiotów'
            });

        })


        })

     })

    })






}