const Race = require('../models/race')
const Class = require('../models/class')
const Item_base = require('../models/item_base')
const Item_rarity = require('../models/item_rarity')
const Equipment = require('../models/equipment')
const Inventory = require('../models/inventory')
const Item = require('../models/item')
const User = require('../models/user')
const Monster = require('../models/monster')
const Exptable = require('../models/exptable')
const Droptable = require('../models/droptable')
const Droptable_item = require('../models/droptable_item')
const Shop = require('../models/shop')


require('../db/funkcje')

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/photo');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'To nie jest obrazek';
        return cb(new Error('To nie jest obrazek'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;

let upload = multer({ storage: storage, fileFilter: imageFilter })





















between = function(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}



addItemsToShop = function(){
  const item_bases = Item_base.find().exec()
  const rzadkosc = Item_rarity.findOne({nazwa: 'zwykły'}).exec()
  Promise.all([item_bases, rzadkosc]).then(([bases, rarity]) => {   

    bases.forEach(itembas => {

      console.log(itembas)
      var cen = itembas.atak_min+
      itembas.atak_max+
      itembas.obrona_min+
      itembas.obrona_max+
      itembas.pancerz_min*25.2+
      itembas.pancerz_max*30.3+
      itembas.obrazenia_min2+
      itembas.obrazenia_max2+
      itembas.sila_add_max*5+
      itembas.zrecznosc_add_max*6+
      itembas.wytrzymalosc_add_max*8




      var shop_item = new Shop({itembase: itembas,  rzadkosc: rarity, cena: cen})
      //console.log(shop_item)

      shop_item.save()
    });

         
    }).catch(err => {console.log(err)})


}

addToDropTable = function(itembase_n, rzadkosc_n, szansa_n, monster_n){
  const itembase = Item_base.findOne({nazwa: itembase_n}).exec()
  const rzadkosc = Item_rarity.findOne({nazwa: rzadkosc_n}).exec()
  const monster = Monster.findOne({nazwa: monster_n})
  .deepPopulate(
    [
    'droptable', 'droptable.items'
    ]).exec()
  
  Promise.all([itembase, rzadkosc, monster]).then(([itembase_e, rzadkosc_e, monster_e]) => {
    
    var droptable_item = new Droptable_item({itembase: itembase_e, rzadkosc: rzadkosc_e, szansa: szansa_n})
    droptable_item.save()
    Droptable.findOneAndUpdate(
      { _id: monster_e.droptable }, 
      { $push: { items: droptable_item  } },
     function (error, success) {
           if (error) {
               //console.log(error);
           } else {
               //console.log(success);
           }
       });
    

    
  

    }).catch(err => {console.log(err)})


}


compareItems = function(obj1, obj2) {
  return obj1.szansa - obj2.szansa
}

generateDrop = function(monster_n){
  
  
  const monster = Monster.findOne({nazwa: monster_n})
  .deepPopulate(
    [
    'droptable',
     'droptable.items',
      'droptable.items.itembase',
       'droptable.items.rzadkosc'
    ]).sort('droptable.items.szansa').exec()
  
  Promise.all([monster]).then(([monster_e]) => {
    
    var tablica = monster_e.droptable.items
    tablica.sort(compareItems)
    var rand = between(1,100)
    for (i = 0; i < tablica.length; i++){
      
      if(rand <= tablica[i].szansa ){
        console.log('Wydropiło')
        console.log(tablica[i].itembase.nazwa + ' ' + tablica[i].rzadkosc.nazwa + ' ' + tablica[i].szansa)
        break
      }
     
    }
  
    }).catch(err => {console.log(err)})

}



    
checklevelUp = function(user){
  User.findById(user._id)
  .then((user_e) => {
    
    var curr_poziom = user_e.poziom
    var next_p = curr_poziom + 1
    Exptable.findOne({poziom: next_p}).then((next_lvl) => {
      
      var curr_dosw = user_e.doswiadczenie
      console.log(curr_dosw)
      console.log(next_lvl.doswiadczenie)
      if(next_lvl)
      {
      if( curr_dosw >= next_lvl.doswiadczenie){
        user_e.poziom++
        user_e.punkty_statystyk +=next_lvl.punkty
        user_e.save()
        
        
      }
    }
    

    
    })



  })

}

  updateItemRarity = function(item, rzadkosc){
    item.nazwa = rzadkosc.nazwa + ' ' + item.itembase.nazwa
    item.atak_m = item.atak * rzadkosc.atak_mod
    item.obrona_m = item.obrona * rzadkosc.obrona_mod
    item.pancerz_m = item.pancerz * rzadkosc.obrona_mod
    item.obrazenia_min_m = item.obrazenia_min * rzadkosc.obrazenia_mod
    item.obrazenia_max_m = item.obrazenia_max * rzadkosc.obrazenia_mod
    item.sila_add_m = item.sila_add * rzadkosc.sila_mod
    item.zrecznosc_add_m = item.zrecznosc_add * rzadkosc.zrecznosc_mod
    item.wytrzymalosc_add_m = item.wytrzymalosc_add * rzadkosc.wytrzymalosc_mod


    item.wartosc = 
    item.atak_m +
    item.obrona_m +
    item.pancerz_m*1.2 +
    item.obrazenia_min_m+
    item.obrazenia_max_m+
    item.sila_add_m*2+
    item.zrecznosc_add_m*2+
    item.wytrzymalosc_add_m*3

    item.rzadkosc = rzadkosc

    return item
  }



    generateItem = function(itembase, rzadkosc) {

        

    
        var nazwa = rzadkosc.nazwa + ' ' + itembase.nazwa
        var typ = itembase.typ
        var atak = between(itembase.atak_min, itembase.atak_max)
        var atak_m = atak * rzadkosc.atak_mod
        var obrona= between(itembase.obrona_min, itembase.obrona_max)
        var obrona_m = obrona * rzadkosc.obrona_mod
        var pancerz= between(itembase.pancerz_min, itembase.pancerz_max)
        var pancerz_m = pancerz * rzadkosc.obrona_mod
        var obrazenia_min= between(itembase.obrazenia_min1, itembase.obrazenia_min2)
        var obrazenia_max= between(itembase.obrazenia_max1, itembase.obrazenia_max2)
        var obrazenia_min_m = obrazenia_min * rzadkosc.obrazenia_mod
        var obrazenia_max_m = obrazenia_max * rzadkosc.obrazenia_mod
        var sila_add= between(itembase.sila_add_min, itembase.sila_add_max)
        var sila_add_m = sila_add * rzadkosc.sila_mod
        var zrecznosc_add= between(itembase.zrecznosc_add_min, itembase.zrecznosc_add_max)
        var zrecznosc_add_m = zrecznosc_add * rzadkosc.zrecznosc_mod
        var wytrzymalosc_add= between(itembase.wytrzymalosc_add_min, itembase.wytrzymalosc_add_max)
        var wytrzymalosc_add_m = wytrzymalosc_add * rzadkosc.wytrzymalosc_mod
        var wartosc = 0
        const przedmiot = new Item({
            nazwa,
            typ,
            atak,
            atak_m,
            obrona,
            obrona_m,
            pancerz,
            pancerz_m,
            obrazenia_min,
            obrazenia_min_m,
            obrazenia_max,
            obrazenia_max_m,
            sila_add,
            sila_add_m,
            zrecznosc_add,
            zrecznosc_add_m,
            wytrzymalosc_add,
            wytrzymalosc_add_m,
            wartosc,
            itembase,
            rzadkosc
        })

        var wart = 
        przedmiot.atak_m +
        przedmiot.obrona_m +
        przedmiot.pancerz_m*1.2 +
        przedmiot.obrazenia_min_m+
        przedmiot.obrazenia_max_m+
        przedmiot.sila_add_m*2+
        przedmiot.zrecznosc_add_m*2+
        przedmiot.wytrzymalosc_add_m*3

     

      przedmiot.wartosc = wart




        
        return przedmiot
    }

addItemToUserInventory = function(user, item){

      User.findById(user._id)
      .deepPopulate(
      ['ekwipunek', 'ekwipunek.przedmioty', 
    ]).then((user_e) => {

      Inventory.findOneAndUpdate(
        { _id: user.ekwipunek._id }, 
        { $push: { przedmioty: item  } },
       function (error, success) {
             if (error) {
                 //console.log(error);
             } else {
                 //console.log(success);
             }
         });
     })
}
removeItemFromUserInventory = function(user, item){

  User.findById(user._id)
  .deepPopulate(
  ['ekwipunek', 'ekwipunek.przedmioty', 
]).then((user_e) => {

  Inventory.findOneAndUpdate(
    { _id: user.ekwipunek._id }, 
    { $pull: { przedmioty: item  } },
   function (error, success) {
         if (error) {
           //  console.log(error);
         } else {
            // console.log(success);
         }
     });


 })

}


attackMonster = function(user, monster){
  User.findById(user._id).then((user_e) => {
    Monster.findById(monster._id).then((monster_e) => {
      var walka_trwa = true

      var Tablica_walki = function(zycie_left,obrazenia_left,tura, obrazenia_right, zycie_right){
        this.name = name,
        this.age = age,
        this.group = group
        }
        


      while(walka_trwa){

        if(!walka_trwa){
          break;
        }




      }


  })
})

}




addItem = function(inventory, item){
        Item.findById(item._id).then((item_e) => {
        
            Inventory.findOneAndUpdate(
                { _id: inventory._id }, 
                { $push: { przedmioty: item  } },
               function (error, success) {
                     if (error) {
                       //  console.log(error);
                     } else {
                        // console.log(success);
                     }
                 });
 
          
      })
}





removeItem = function(inventory, item){
  Item.findById(item._id).then((item_e) => {
  
      Inventory.findOneAndUpdate(
          { _id: inventory._id }, 
          { $pull: { przedmioty: item  } },
         function (error, success) {
               if (error) {
                 //  console.log(error);
               } else {
                  // console.log(success);
               }
           });

    
})
}

removeItemFromEquipment = function(user, item, which){

  User.findById(user._id)
  .deepPopulate(
  ['ekwipunek', 'ekwipunek.przedmioty',
  'wyposazenie'
]).then((user_e) => {

  

  if(item.typ == 'Broń')
  {
    if(which == 'main'){
      user_e.wyposazenie.bron = undefined
    }
    else if(which == 'off'){ 
      user_e.wyposazenie.tarcza = undefined
    }
  }
  else if(item.typ == 'Pierścień')
  {
    if(which == 'lewy'){
      user_e.wyposazenie.pierscien_1 = undefined
    }
    else if(which == 'prawy'){ 
      user_e.wyposazenie.pierscien_2 = undefined
    }  
  }
  else if(item.typ == 'Hełm'){    user_e.wyposazenie.helm = undefined }
  else if(item.typ == 'Zbroja'){    user_e.wyposazenie.zbroja = undefined }
  else if(item.typ == 'Nogawice'){    user_e.wyposazenie.nogawice = undefined }
  else if(item.typ == 'Buty'){    user_e.wyposazenie.buty = undefined }
  else if(item.typ == 'Amulet'){    user_e.wyposazenie.amulet = undefined }
  else if(item.typ == 'Tarcza'){    user_e.wyposazenie.tarcza = undefined }
  else if(item.typ == 'Rękawice'){    user_e.wyposazenie.rekawice = undefined }

  user_e.wyposazenie.save()

 })

}






  updateStats = function(user){

    User.findById(user._id)
    .deepPopulate(
    ['ekwipunek', 'ekwipunek.przedmioty',
    'wyposazenie',
    'wyposazenie.bron',
    'wyposazenie.tarcza',
    'wyposazenie.helm',
    'wyposazenie.amulet',
    'wyposazenie.zbroja',
    'wyposazenie.nogawice',
    'wyposazenie.buty',
    'wyposazenie.pierscien_1',
    'wyposazenie.pierscien_2',
    ,'rasa','klasa'
  ]).then((user_e) => {
    var sum_atak = 0
    var sum_obrona = 0
    var sum_pancerz = 0
    var sum_obr_min = 0
    var sum_obr_max = 0
    var sum_sila = 0
    var sum_zrecznosc = 0
    var sum_wytrzymalosc = 0


   if(user_e.wyposazenie.bron){
    
    sum_atak += user_e.wyposazenie.bron.atak_m
    sum_obrona += user_e.wyposazenie.bron.obrona_m
    sum_obr_min += user_e.wyposazenie.bron.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.bron.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.bron.pancerz_m
    sum_sila += user_e.wyposazenie.bron.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.bron.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.bron.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.tarcza){
    
    sum_atak += user_e.wyposazenie.tarcza.atak_m
    sum_obrona += user_e.wyposazenie.tarcza.obrona_m
    sum_obr_min += user_e.wyposazenie.tarcza.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.tarcza.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.tarcza.pancerz_m
    sum_sila += user_e.wyposazenie.tarcza.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.tarcza.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.tarcza.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.zbroja){
    
    sum_atak += user_e.wyposazenie.zbroja.atak_m
    sum_obrona += user_e.wyposazenie.zbroja.obrona_m
    sum_obr_min += user_e.wyposazenie.zbroja.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.zbroja.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.zbroja.pancerz_m
    sum_sila += user_e.wyposazenie.zbroja.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.zbroja.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.zbroja.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.helm){
    
    sum_atak += user_e.wyposazenie.helm.atak_m
    sum_obrona += user_e.wyposazenie.helm.obrona_m
    sum_obr_min += user_e.wyposazenie.helm.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.helm.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.helm.pancerz_m
    sum_sila += user_e.wyposazenie.helm.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.helm.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.helm.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.amulet){
    
    sum_atak += user_e.wyposazenie.amulet.atak_m
    sum_obrona += user_e.wyposazenie.amulet.obrona_m
    sum_obr_min += user_e.wyposazenie.amulet.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.amulet.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.amulet.pancerz_m
    sum_sila += user_e.wyposazenie.amulet.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.amulet.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.amulet.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.nogawice){
    
    sum_atak += user_e.wyposazenie.nogawice.atak_m
    sum_obrona += user_e.wyposazenie.nogawice.obrona_m
    sum_obr_min += user_e.wyposazenie.nogawice.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.nogawice.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.nogawice.pancerz_m
    sum_sila += user_e.wyposazenie.nogawice.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.nogawice.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.nogawice.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.buty){
    
    sum_atak += user_e.wyposazenie.buty.atak_m
    sum_obrona += user_e.wyposazenie.buty.obrona_m
    sum_obr_min += user_e.wyposazenie.buty.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.buty.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.buty.pancerz_m
    sum_sila += user_e.wyposazenie.buty.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.buty.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.buty.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.pierscien_1){
    
    sum_atak += user_e.wyposazenie.pierscien_1.atak_m
    sum_obrona += user_e.wyposazenie.pierscien_1.obrona_m
    sum_obr_min += user_e.wyposazenie.pierscien_1.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.pierscien_1.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.pierscien_1.pancerz_m
    sum_sila += user_e.wyposazenie.pierscien_1.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.pierscien_1.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.pierscien_1.wytrzymalosc_add_m

   }
   if(user_e.wyposazenie.pierscien_2){
    
    sum_atak += user_e.wyposazenie.pierscien_2.atak_m
    sum_obrona += user_e.wyposazenie.pierscien_2.obrona_m
    sum_obr_min += user_e.wyposazenie.pierscien_2.obrazenia_min_m
    sum_obr_max += user_e.wyposazenie.pierscien_2.obrazenia_max_m
    sum_pancerz += user_e.wyposazenie.pierscien_2.pancerz_m
    sum_sila += user_e.wyposazenie.pierscien_2.sila_add_m
    sum_zrecznosc += user_e.wyposazenie.pierscien_2.zrecznosc_add_m
    sum_wytrzymalosc += user_e.wyposazenie.pierscien_2.wytrzymalosc_add_m

   }





    sila_mod = user_e.rasa.sila_mod
    zrecznosc_mod = user_e.rasa.zrecznosc_mod
    wytrzymalosc_mod = user_e.rasa.wytrzymalosc_mod
    atak_mod = user_e.klasa.atak_mod
    obrona_mod = user_e.klasa.atak_mod

    user_e.sila_m = (user_e.sila_base + sum_sila) * sila_mod
    user_e.zrecznosc_m = (user_e.zrecznosc_base + sum_zrecznosc) * zrecznosc_mod
    user_e.wytrzymalosc_m = (user_e.wytrzymalosc_base + sum_wytrzymalosc) * wytrzymalosc_mod
    user_e.atak_m = (user_e.atak_base+ user_e.zrecznosc_m + sum_atak)*atak_mod
    user_e.obrona_m = (user_e.obrona_base+ user_e.zrecznosc_m + sum_obrona)*obrona_mod
    user_e.zycie_m = user_e.zycie_base + user_e.wytrzymalosc_m*5
    

    user_e.obrazenia_min_m = user_e.obrazenia_base_min + user_e.sila_m + sum_obr_min
    user_e.obrazenia_max_m = user_e.obrazenia_base_max + user_e.sila_m + sum_obr_max
    user_e.pancerz_m =  sum_pancerz


    user_e.save()
  })

}

createUser = function(username, password, rasa, klasa) {

    const admin = false
    const poziom = 1
    const doswiadczenie = 0
    const punkty_statystyk = 20
    const zloto = 1000
    const wyposazenie = new Equipment({username})
    const obrazek = '/images/photo/default.jpg'
    const ekwipunek = new Inventory({username})
    
    const sila_base = 10
    const sila_m = 0
    const zrecznosc_base = 10
    const zrecznosc_m = 0
    const wytrzymalosc_base = 10
    const wytrzymalosc_m = 0
    const atak_base = 20
    const atak_m = 0
    const obrona_base = 20
    const obrona_m = 0
    const pancerz_base = 0
    const pancerz_m = 0
    const obrazenia_base_min = 10
    const obrazenia_min_m = 0

    const obrazenia_base_max = 20
    const obrazenia_max_m = 0

    const zycie_curr = 100
    const zycie_base = 100
    const zycie_m = 100
    const energia = 100
    


    let rasa_id = null
    let klasa_id = null
    const user = new User({
        username,
        password,
        admin,
        obrazek,
        rasa_id,
        klasa_id,
        poziom,
        doswiadczenie,
        punkty_statystyk,
        zloto,
        wyposazenie,
        ekwipunek,
        sila_base,
        sila_m,
        zrecznosc_base,
        zrecznosc_m,
        wytrzymalosc_base,
        wytrzymalosc_m,
        atak_base,
        atak_m,
        obrona_base,
        obrona_m,
        pancerz_base,
        pancerz_m,
        obrazenia_base_min,
        obrazenia_min_m,
        obrazenia_base_max,
        obrazenia_max_m,
        zycie_curr,
        zycie_base,
        zycie_m,
        energia
      });

      const getRC = async  => {
            
        const rasa_p = Race.findOne({nazwa: rasa}).exec()
        const klasa_p = Class.findOne({nazwa: klasa}).exec()
        const item_b = Item_base.findOne({nazwa: 'Miecz krótki'}).exec()
        const item_r = Item_rarity.findOne({nazwa: 'zwykły'}).exec()
        //const inv = Inventory.findOne({username: username}).exec()

        Promise.all([rasa_p, klasa_p, item_b, item_r]).then(([rasa_w, klasa_w, item_bw, item_rw]) => {
            const startowabron = generateItem(item_bw, item_rw)
            startowabron.save()
            //console.log(startowabron)
            
            ekwipunek.save()
            wyposazenie.save()

            addItem(ekwipunek,startowabron)

           

            user.rasa = rasa_w
            user.klasa = klasa_w

            
            user.save()
            
          }).catch(err => {console.log(err)})

      }
      getRC()
      
      




  }



   