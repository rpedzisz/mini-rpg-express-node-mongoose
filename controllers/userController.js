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
require('../db/funkcje')
const Exptable = require('../models/exptable')






  

  exports.register_page_get = function(req,res){
    
    const getRC = async  => {
        const rasy = Race.find().exec()
        const klasy = Class.find().exec()
        Promise.all([rasy, klasy]).then(([rasy_w, klasy_w]) => {   

            User.findById(req.user)
        .populate('rasa')
         .populate('klasa').exec(function(err, user_ext){
            
            if(user_ext){
                var curr_poziom = user_ext.poziom
                var next_p = curr_poziom + 1
                Exptable.findOne({poziom: next_p}).then((next_lvl) => {
              var curr_dosw = user_ext.doswiadczenie
              res.render('rejestracja',{
                
                next_lvl: next_lvl.doswiadczenie,
                user: user_ext, rasy: rasy_w, klasy: klasy_w,
                title: 'Rejestracja'
                });
        
                })
                    }
        
                    else{
                        res.render('rejestracja',{
                            rasy: rasy_w, klasy: klasy_w,
                            title: 'Rejestracja'
                            });
        
        
                    }

         })
            
          }).catch(err => {console.log(err)})
       
      }
      getRC()

    }

    exports.register_page_post = function(req,res){
        var un = req.body.username
        var pswd = req.body.password
        var rasa = req.body.rasa
        var klasa = req.body.klasa

        

        let errors = [];
        if(!un || !pswd) {
            errors.push({msg : "Proszę wypełnić wszystkie pola"})
        }
        if(pswd.length < 1 ) {
            errors.push({msg : 'Hasło powinno się składać z przynajmniej 1 znaków'})
        }
        if(errors.length > 0 ) {

            
            req.flash('error_msg','Wystąpiły błędy')
            res.redirect('/users/register')
            }
        else
        {
            
                
               User.findOne({username : un}).exec((err,user)=>{
                   
                    if(user) {
                        //errors.push({msg: 'Taka nazwa użytkownika już istnieje'});
                        res.redirect('/users/register')
                        req.flash('error_msg','Taka nazwa użytkownika już istnieje')              
                    } else {

                        //hash 
            bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(pswd,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //hash
                        pswd = hash;
                    //create user
                    createUser(un, pswd, rasa, klasa)
                    
                        req.flash('success_msg','Udało ci się zarejstrować!')
                        res.redirect('/users/register')
                    
                      
                }));


                        
                        
                    }
                    
            
                })
        }
    
    }


    exports.login_page_get = function(req,res){


        User.findById(req.user)
        .populate('rasa')
         .populate('klasa').exec(function(err, user_ext){

        if(user_ext){
        var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie
      res.render('logowanie',{
        user: user_ext,
        next_lvl: next_lvl.doswiadczenie,
        title: 'Logowanie'
        });

        })
            }

            else{
                res.render('logowanie',{
                    
                    title: 'Logowanie'
                    });


            }
            


            
         })
    }


    exports.login_page_post = function(req,res,next){
        passport.authenticate('local',{
            successRedirect : '/character/stats',
            failureRedirect : '/users/login',
            failureFlash : true,
            })(req,res,next);

    }
    exports.logout = function(req,res){
        req.logout();
        req.flash('success_msg','Wylogowano');
        res.redirect('/users/login');
    }


    exports.konto_page_get = function(req,res,next){
        User.findById(req.user)
        .populate('rasa')
         .populate('klasa').exec(function(err, user_ext){
            if(req.user){
                var curr_poziom = user_ext.poziom
        var next_p = curr_poziom + 1
        Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      var curr_dosw = user_ext.doswiadczenie
      res.render('konto',{
        user: user_ext,
        next_lvl: next_lvl.doswiadczenie,
        title: 'Ustawienia konta'
        });

        })
            }

            else{
                res.render('konto',{
                    
                    title: 'Ustawienia konta'
                    });


            }
           



        

        

        })

    }

    
    exports.konto_page_post_obrazek = function (req,res,next){
          
                
        const file = req.file
        if (!file) {
            req.flash('error_msg','Nie wybrano pliku')
            res.redirect('/users/konto')
        }
        else
        {
            res.redirect('/users/konto')
        }

    }

    exports.konto_page_post_haslo = function(req,res,next){

        var p1 = req.body.password1
        var p2 = req.body.password2
        console.log(p1)
        console.log(p2)

        if((p1 && p2) && (p1 == p2)){

        

        bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(p1,salt,
                (err,hash)=> {
                    if(err) throw err;
                        //hash
                        p1 = hash;
                    
                        var user = req.user
                        user.password = p1
                        user.save()

                    
                        
                        
                        
                      
                }));
                req.flash('success_msg','Zmieniono hasło')

                }
                else
                {
                    req.flash('success_msg','Hasła różnią się')
                        
                }
        
                res.redirect('/users/konto')
    }





