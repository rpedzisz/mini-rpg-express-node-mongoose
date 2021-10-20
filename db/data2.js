
const Race = require('../models/race')
const Class = require('../models/class')
const Item_base = require('../models/item_base')
const Item_rarity = require('../models/item_rarity')
const Equipment = require('../models/equipment')
const Item = require('../models/item')
const User = require('../models/user')
const Monster = require('../models/monster')
const Exptable = require('../models/exptable')
const Droptable = require('../models/droptable')
//funkcje
require('../db/funkcje');

//to można dopiero wykonać po dodaniu wszystkiego z pliku data.js

//dodawanie przedmiotow do droptable
addToDropTable('Miecz krótki', 'zwykły', 50,'Wilk')
addToDropTable('Miecz krótki', 'rzadki', 5,'Wilk')
addToDropTable('Puklerz', 'zwykły', 35,'Wilk')
addToDropTable('Puklerz', 'legendarny', 10,'Wilk')







//dodanie wszystkich itembase do sklepu

addItemsToShop()