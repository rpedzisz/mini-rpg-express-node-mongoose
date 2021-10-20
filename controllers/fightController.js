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
const { find, update } = require('../models/item_base')
const Monster = require('../models/monster')
const Exptable = require('../models/exptable')
require('../db/funkcje')

exports.monster_page_get = function(req,res){

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie
        


        Monster.find().sort('poziom').exec(function(err, monsters){

        res.render('monster',{
            user: user_ext,
            potwory: monsters,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Potwory'
            });

        })
    })



     })


}

exports.player_page_get = function(req,res){

    User.findById(req.user)
    .populate('rasa')
     .populate('klasa').exec(function(err, user_ext){
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie


        User.find({ _id: {$ne: req.user._id} }).sort('poziom').exec(function(err, users){

        res.render('player',{
            user: user_ext,
            gracze: users,
            next_lvl: next_lvl.doswiadczenie,
            title: 'Gracze'
            });

        })
    })


     })



}

hit_chance_formula = function(atak,obrona){
     var pr = (atak/obrona)
     if(pr > 1){
         pr = 1
     }
     else if (pr < 0){
         pr = 0
     }

     percentage = pr*100
    return Math.round(percentage)
}

trafienie = function(atak,obrona){
if(between(1,100) <= hit_chance_formula(atak,obrona)){
    return true
}
else{
    return false
}
return false
}



exports.monster_page_post_vs = function(req,res){
    var monster = req.body.atak
    var user = req.user
    var koszt_energii = 10
    User.findById(user._id)
    .populate('rasa')
    .populate('klasa').then((user_e) => {
        if(user_e.energia >= koszt_energii){

            user_e.energia -= koszt_energii

        Monster.findById(monster).
        deepPopulate(
            [
            'droptable',
             'droptable.items',
              'droptable.items.itembase',
               'droptable.items.rzadkosc'
            ]).then((monster_e) => {


            var hit_left = hit_chance_formula(user_e.atak_m, monster_e.obrona)
            var hit_right = hit_chance_formula(monster_e.atak, user_e.obrona_m)
           //console.log( hit_chance_formula(user_e.atak_m, monster_e.obrona))

            var Tablica_walki = function(zycie_left,obrazenia_left,tura, obrazenia_right, zycie_right){
                this.zycie_left = zycie_left,
                this.obrazenia_left = obrazenia_left,
                this.tura = tura
                this.zycie_right = zycie_right,
                this.obrazenia_right = obrazenia_right
                }
                var poczatkowa_tura = 0
                var tab_base = []
                var tab = []
                var zycie_pocz = user_e.zycie_curr
                var zycie_right_max = monster_e.zycie_right
                var zycie_curr_left = user_e.zycie_curr
                var zycie_curr_right = monster_e.zycie
                var tura = poczatkowa_tura
                tab_base.push({zycie_left: user_e.zycie_curr,obrazenia_left: 0, tura: poczatkowa_tura, obrazenia_right: 0, zycie_right: monster_e.zycie});
                
            
                walka_trwa = true
              while(walka_trwa)
              {
                if(zycie_curr_left <=0 || zycie_curr_right <= 0){
                    walka_trwa = false
                }
                if(!walka_trwa){
                  break;
                }
                tura++
                var trafienie_left = trafienie(user_e.atak_m, monster_e.obrona)
                var trafienie_right = trafienie(monster_e.atak, user_e.obrona_m)
                
                var obr_left = 0
                var obr_right = 0
                if(trafienie_left){
                    obr_left = between(user_e.obrazenia_min_m, user_e.obrazenia_max_m) - monster_e.pancerz

                    if ((obr_left) < 0){
                        obr_left = 0   
                    }
                    else{
                        zycie_curr_right -= obr_left
                    }

                }
                if(trafienie_right){
                    obr_right = between(monster_e.obrazenia_min, monster_e.obrazenia_max) - user_e.pancerz_m
                    if ((obr_right) < 0){
                        obr_right = 0   
                    }
                    else{
                        zycie_curr_left -= obr_right
                    }

                    

                }


tab.push({zycie_left: zycie_curr_left,trafienie_left:trafienie_left, obrazenia_left: obr_left, tura: tura, obrazenia_right: obr_right,trafienie_right:trafienie_right, zycie_right: zycie_curr_right});



  
              }
              var wynik 
              var wynik1
              if(zycie_curr_left <=0 && zycie_curr_right <= 0){
                  wynik = 'REMIS'
                  user_e.zycie_curr = 0

              }
              else if (zycie_curr_left <=0){
               // console.log("Przegrana")
                var gold_loss = Math.round(user_e.zloto * 0.01) 
                user_e.zloto -= gold_loss
                user_e.zycie_curr = 0
                wynik = 'Przegrałeś walkę i straciłeś ' + gold_loss + ' złota'

                user_e.save()
              }
              else if (zycie_curr_right <=0){
               // console.log("Wygrana")
                var gold_gain = Math.round(monster_e.zloto)
                var exp_gain = Math.round(monster_e.doswiadczenie)
                user_e.zycie_curr = zycie_curr_left
                user_e.zloto += gold_gain
                user_e.doswiadczenie +=exp_gain
                wynik = 'Wygrałeś walkę i zyskałeś ' + gold_gain + ' złota oraz ' + exp_gain + ' punktów doświadczenia'
                
                   



                
                

                user_e.save()
              }

              var curr_poziom = user_e.poziom
              var next_p = curr_poziom + 1

              Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      

                var curr_dosw = user_e.doswiadczenie
               //console.log(curr_dosw +'/'+next_lvl.doswiadczenie)

                if( curr_dosw >= next_lvl.doswiadczenie){
                  user_e.poziom++
                  user_e.punkty_statystyk +=next_lvl.punkty      
                 wynik1 = 'Twój poziom zwiększył się o 1, zyskano ' + next_lvl.punkty + ' punktów statystyk.'               
                }

            var tablica = monster_e.droptable.items
            tablica.sort(compareItems)
            var rand = between(1,100)
            var drop
            for (i = 0; i < tablica.length; i++){
            
            if(rand <= tablica[i].szansa ){
                console.log('Wydropiło')
                console.log(tablica[i].itembase.nazwa + ' ' + tablica[i].rzadkosc.nazwa + ' ' + tablica[i].szansa)
                drop = 'Zyskałeś przedmiot ' + tablica[i].rzadkosc.nazwa + ' '+ tablica[i].itembase.nazwa
                

                var item = generateItem(tablica[i].itembase, tablica[i].rzadkosc)
                item.save()
                addItemToUserInventory(user_e, item)

                break
            }
            
            }

    
            res.render('vsmonster',{
                user: user_e,
                monster: monster_e,
                hit_chance_left: hit_left,
                hit_chance_right: hit_right,
                zycie_pocz: zycie_pocz,
                walka_base: tab_base,
                walka: tab,
                user: user_e,
                wynik: wynik,
                wynik1: wynik1,
                drop: drop,
                next_lvl: next_lvl.doswiadczenie,
                title: 'Walka z: '+monster_e.nazwa

                });
            })
    
    
      })

    }
    else{
        req.flash('error_msg','Nie masz wystarczająco energii')
        res.redirect('/fight/monster')
    }

    })


}
exports.player_page_post_vs = function(req,res){
    var user2 = req.body.atak
    var user = req.user
    var koszt_energii = 15
    User.findById(user._id)
    .populate('rasa')
    .populate('klasa').then((user_e) => {

        if(user_e.energia >= koszt_energii){

            user_e.energia -= koszt_energii

        User.findById(user2).then((user2_e) => {


            var hit_left = hit_chance_formula(user_e.atak_m, user2_e.obrona_m)
            var hit_right = hit_chance_formula(user2_e.atak_m, user_e.obrona_m)
           //console.log( hit_chance_formula(user_e.atak_m, monster_e.obrona))

            var Tablica_walki = function(zycie_left,obrazenia_left,tura, obrazenia_right, zycie_right){
                this.zycie_left = zycie_left,
                this.obrazenia_left = obrazenia_left,
                this.tura = tura
                this.zycie_right = zycie_right,
                this.obrazenia_right = obrazenia_right
                }
                var poczatkowa_tura = 0
                var tab_base = []
                var tab = []
                var zycie_pocz = user_e.zycie_curr
                var zycie_pocz2 = user2_e.zycie_curr
                var zycie_curr_left = user_e.zycie_curr
                var zycie_curr_right = user2_e.zycie_curr
                var tura = poczatkowa_tura
                tab_base.push({zycie_left: user_e.zycie_curr,obrazenia_left: 0, tura: poczatkowa_tura, obrazenia_right: 0, zycie_right: user2_e.zycie_curr});
                
            
                walka_trwa = true
              while(walka_trwa)
              {
                if(zycie_curr_left <=0 || zycie_curr_right <= 0){
                    walka_trwa = false
                }
                if(!walka_trwa){
                  break;
                }
                tura++
                var trafienie_left = trafienie(user_e.atak_m, user2_e.obrona_m)
                var trafienie_right = trafienie(user2_e.atak_m, user_e.obrona_m)
                
                var obr_left = 0
                var obr_right = 0
                if(trafienie_left){
                    obr_left = between(user_e.obrazenia_min_m, user_e.obrazenia_max_m) - user2_e.pancerz_m

                    if ((obr_left) < 0){
                        obr_left = 0   
                    }
                    else{
                        zycie_curr_right -= obr_left
                    }

                }
                if(trafienie_right){
                    obr_right = between(user2_e.obrazenia_min_m, user2_e.obrazenia_max_m)
                    if ((obr_right) < 0){
                        obr_right = 0   
                    }
                    else{
                        zycie_curr_left -= obr_right
                    }

                    

                }


tab.push({zycie_left: zycie_curr_left,trafienie_left:trafienie_left, obrazenia_left: obr_left, tura: tura, obrazenia_right: obr_right,trafienie_right:trafienie_right, zycie_right: zycie_curr_right});



  
              }
              var wynik 
              var wynik1
              if(zycie_curr_left <=0 && zycie_curr_right <= 0){
                  wynik = 'REMIS'
                  user_e.zycie_curr = 0

              }
              else if (zycie_curr_left <=0){
               // console.log("Przegrana")
                var gold_loss = Math.round(user_e.zloto * 0.10) 
                user_e.zloto -= gold_loss
                user_e.zycie_curr = 0
                wynik = 'Przegrałeś walkę i straciłeś ' + gold_loss + ' złota'

                user_e.save()
              }
              else if (zycie_curr_right <=0){
                //console.log("Wygrana")
                var gold_gain = Math.round(user2_e.zloto *0.1)
                var exp_gain = Math.round(user2_e.doswiadczenie*0.5)
                user_e.zycie_curr = zycie_curr_left
                user_e.zloto += gold_gain
                user_e.doswiadczenie +=exp_gain
                user2_e.zycie_curr = zycie_pocz2
                user2_e.zloto -=gold_gain

                wynik = 'Wygrałeś walkę i zyskałeś ' + gold_gain + ' złota oraz ' + exp_gain + ' punktów doświadczenia'
                
                    /*
                    var curr_poziom = user_e.poziom
                    var next_p = curr_poziom + 1

                Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      
                    

                    var curr_dosw = user_e.doswiadczenie
                   
                    if( curr_dosw >= next_lvl.doswiadczenie){
                      user_e.poziom++
                      user_e.punkty_statystyk +=next_lvl.punkty
                     
                     wynik1 = 'Twój poziom zwiększył się o 1, zyskano ' + next_lvl.punkty + ' punktów statystyk.'
                      
                    }
                  
                                   
                  })
                  */



                
                
                  user2_e.save()
                user_e.save()
              }

              var curr_poziom = user_e.poziom
              var next_p = curr_poziom + 1

              Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      
                

                var curr_dosw = user_e.doswiadczenie
               console.log(curr_dosw +'/'+next_lvl.doswiadczenie)

                if( curr_dosw >= next_lvl.doswiadczenie){
                  user_e.poziom++
                  user_e.punkty_statystyk +=next_lvl.punkty
                 
                 wynik1 = 'Twój poziom zwiększył się o 1, zyskano ' + next_lvl.punkty + ' punktów statystyk.'
                  
                }
              
    
            res.render('vsplayer',{
                user: user_e,
                user2: user2_e,
                hit_chance_left: hit_left,
                hit_chance_right: hit_right,
                zycie_pocz: zycie_pocz,
                walka_base: tab_base,
                walka: tab,
                wynik: wynik,
                wynik1: wynik1,
                next_lvl: next_lvl.doswiadczenie,
                title: 'Walka z: '+user2_e.username
                });



            })
    
    
      })


    }
    else{
        req.flash('error_msg','Nie masz wystarczająco energii')
        res.redirect('/fight/player')
    }

    })










}