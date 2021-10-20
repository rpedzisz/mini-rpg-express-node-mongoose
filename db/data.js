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


//klasy
const czlowiek = new Race({nazwa: 'Człowiek', obrazek: '/images/rasy/czlowiek.jpg', sila_mod: 1.1, zrecznosc_mod: 1.1, wytrzymalosc_mod: 1.1})
const ork = new Race({nazwa: 'Ork', obrazek: '/images/rasy/ork.jpg', sila_mod: 1.2, zrecznosc_mod: 1.0, wytrzymalosc_mod: 1.1})
const ogr = new Race({nazwa: 'Ogr', obrazek: '/images/rasy/ogr.jpg', sila_mod: 1.3, zrecznosc_mod: 0.8, wytrzymalosc_mod: 1.2})
const elf = new Race({nazwa: 'Elf', obrazek: '/images/rasy/elf.jpg', sila_mod: 0.8, zrecznosc_mod: 1.5, wytrzymalosc_mod: 1.0})
czlowiek.save()
ork.save()
ogr.save()
elf.save()

//rasy
const wojownik = new Class({nazwa: 'Wojownik', obrazek: '/images/klasy/wojownik.jpg', atak_mod: 1.2, obrona_mod: 1.0})
const obronca = new Class({nazwa: 'Obrońca', obrazek: '/images/klasy/obronca.jpg', atak_mod: 0.9, obrona_mod: 1.3})
const zabojca = new Class({nazwa: 'Zabójca', obrazek: '/images/klasy/zabojca.jpg', atak_mod: 1.6, obrona_mod: 0.7})
wojownik.save()
obronca.save()
zabojca.save()



//item_base
//bronie
const miecz_krotki = new Item_base({
    nazwa: 'Miecz krótki',
    obrazek: '/images/bron/miecz_krotki.jpg',
    typ: 'Broń',
    opis: 'to jest krótki miecz',
    atak_min: 10,
    atak_max: 20,
    obrona_min: 5,
    obrona_max: 5,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 5,
    obrazenia_min2: 10,
    obrazenia_max1: 15,
    obrazenia_max2: 20,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
miecz_krotki.save()
const maczuga = new Item_base({
    nazwa: 'Maczuga',
    obrazek: '/images/bron/maczuga.jpg',
    typ: 'Broń',
    opis: 'to jest krótki maczuga',
    atak_min: 15,
    atak_max: 30,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 10,
    obrazenia_min2: 15,
    obrazenia_max1: 25,
    obrazenia_max2: 30,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
maczuga.save()

const kosa_zniwiaza = new Item_base({
    nazwa: 'Kosa żniwiarza',
    obrazek: '/images/bron/kosa_zniwiarza.jpg',
    typ: 'Broń',
    opis: 'to jest kosa',
    atak_min: 165,
    atak_max: 200,
    obrona_min: 10,
    obrona_max: 30,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 40,
    obrazenia_min2: 55,
    obrazenia_max1: 70,
    obrazenia_max2: 85,
    sila_add_min: 10,
    sila_add_max: 20,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 20,
    wytrzymalosc_add_max: 30
})
kosa_zniwiaza.save()

const sierp = new Item_base({
    nazwa: 'Sierp',
    obrazek: '/images/bron/sierp.jpg',
    typ: 'Broń',
    opis: 'to jest sierp',
    atak_min: 5,
    atak_max: 10,
    obrona_min: 20,
    obrona_max: 30,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 5,
    obrazenia_min2: 9,
    obrazenia_max1: 13,
    obrazenia_max2: 16,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
sierp.save()
const miecz_mrozu = new Item_base({
    nazwa: 'Miecz Mrozu',
    obrazek: '/images/bron/miecz_mrozu.jpg',
    typ: 'Broń',
    opis: 'to jest miecz mrozu',
    atak_min: 555,
    atak_max: 700,
    obrona_min: 220,
    obrona_max: 330,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 105,
    obrazenia_min2: 125,
    obrazenia_max1: 230,
    obrazenia_max2: 260,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 40,
    zrecznosc_add_max: 50,
    wytrzymalosc_add_min: 100,
    wytrzymalosc_add_max: 120
})
miecz_mrozu.save()

const mlot_boga = new Item_base({
    nazwa: 'Młot Boga',
    obrazek: '/images/bron/mlot_boga.jpg',
    typ: 'Broń',
    opis: 'to jest mlot boga',
    atak_min: 1555,
    atak_max: 2000,
    obrona_min: 1220,
    obrona_max: 1330,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 155,
    obrazenia_min2: 225,
    obrazenia_max1: 330,
    obrazenia_max2: 460,
    sila_add_min: 100,
    sila_add_max: 150,
    zrecznosc_add_min: 70,
    zrecznosc_add_max: 100,
    wytrzymalosc_add_min: 200,
    wytrzymalosc_add_max: 320
})
mlot_boga.save()
const ogromny_topor = new Item_base({
    nazwa: 'Ogromny Topór',
    obrazek: '/images/bron/ogromny_topor.jpg',
    typ: 'Broń',
    opis: 'to jest ogromny topor',
    atak_min: 355,
    atak_max: 400,
    obrona_min: 120,
    obrona_max: 130,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 55,
    obrazenia_min2: 65,
    obrazenia_max1: 70,
    obrazenia_max2: 90,
    sila_add_min: 10,
    sila_add_max: 15,
    zrecznosc_add_min: 10,
    zrecznosc_add_max: 20,
    wytrzymalosc_add_min: 10,
    wytrzymalosc_add_max: 20
})
ogromny_topor.save()
const topor_egzekutora = new Item_base({
    nazwa: 'Topór Egzakutora',
    obrazek: '/images/bron/topor_egzekutora.jpg',
    typ: 'Broń',
    opis: 'to jest topór egzekutora',
    atak_min: 555,
    atak_max: 600,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 75,
    obrazenia_min2: 95,
    obrazenia_max1: 95,
    obrazenia_max2: 130,
    sila_add_min: 20,
    sila_add_max: 35,
    zrecznosc_add_min: 20,
    zrecznosc_add_max: 30,
    wytrzymalosc_add_min: 20,
    wytrzymalosc_add_max: 30
})
topor_egzekutora.save()



//tarcze
const puklerz = new Item_base({
    nazwa: 'Puklerz',
    obrazek: '/images/tarcza/puklerz.jpg',
    typ: 'Tarcza',
    opis: 'to jest puklerz',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 30,
    obrona_max: 40,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
puklerz.save()
const wikinga = new Item_base({
    nazwa: 'Tarcza wikinga',
    obrazek: '/images/tarcza/wikinga.jpg',
    typ: 'Tarcza',
    opis: 'to jest tarcza wikinga',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 70,
    obrona_max: 120,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
wikinga.save()

const gwardzisty = new Item_base({
    nazwa: 'Tarcza gwardzisty',
    obrazek: '/images/tarcza/gwardzisty.jpg',
    typ: 'Tarcza',
    opis: 'to jest tarcza gwardzisty',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 320,
    obrona_max: 500,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
gwardzisty.save()

const rycerza = new Item_base({
    nazwa: 'Tarcza rycerza',
    obrazek: '/images/tarcza/rycerza.jpg',
    typ: 'Tarcza',
    opis: 'to jest tarcza rycerza',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 820,
    obrona_max: 1500,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
rycerza.save()
 const licza = new Item_base({
    nazwa: 'Tarcza rycerza',
    obrazek: '/images/tarcza/licza.jpg',
    typ: 'Tarcza',
    opis: 'to jest tarcza rycerza',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 1220,
    obrona_max: 1700,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 100,
    wytrzymalosc_add_max: 120
})
licza.save()   
///amulet
 const amulet_ataku = new Item_base({
    nazwa: 'Amulet ataku',
    obrazek: '/images/amulet/ataku.jpg',
    typ: 'Amulet',
    opis: 'to jest amulet ataku',
    atak_min: 200,
    atak_max: 500,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
amulet_ataku.save() 
 const amulet_obrony = new Item_base({
    nazwa: 'Amulet obrony',
    obrazek: '/images/amulet/obrony.jpg',
    typ: 'Amulet',
    opis: 'to jest amulet obrony',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 200,
    obrona_max: 500,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
amulet_obrony.save() 
//pierscienie
 const pierscien_sily = new Item_base({
    nazwa: 'Pierścień Siły',
    obrazek: '/images/pierscien/sily.jpg',
    typ: 'Pierścień',
    opis: 'to jest pierścień siły',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 20,
    sila_add_max: 70,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
pierscien_sily.save() 
 const pierscien_wytrzymalosci = new Item_base({
    nazwa: 'Pierścień Wytrzymałości',
    obrazek: '/images/pierscien/wytrzymalosci.jpg',
    typ: 'Pierścień',
    opis: 'to jest pierścień wytrzymałości',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 30,
    wytrzymalosc_add_max: 70
})
pierscien_wytrzymalosci.save() 
 const pierscien_zrecznosci = new Item_base({
    nazwa: 'Pierścień Zręczności',
    obrazek: '/images/pierscien/zrecznosci.jpg',
    typ: 'Pierścień',
    opis: 'to jest pierścień zręczności',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 0,
    pancerz_max: 0,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 50,
    zrecznosc_add_max: 120,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
pierscien_zrecznosci.save() 
 const pierscien_smoka = new Item_base({
    nazwa: 'Pierścień Smoka',
    obrazek: '/images/pierscien/smoka.jpg',
    typ: 'Pierścień',
    opis: 'to jest pierścień smoka',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 10,
    pancerz_max: 20,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 20,
    sila_add_max: 40,
    zrecznosc_add_min: 20,
    zrecznosc_add_max: 40,
    wytrzymalosc_add_min: 20,
    wytrzymalosc_add_max: 40
})
pierscien_smoka.save() 
//helmy
const helm_wikinga = new Item_base({
    nazwa: 'Hełm wikinga',
    obrazek: '/images/helm/viking.jpg',
    typ: 'Hełm',
    opis: 'to jest hełm wikinga',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 10,
    pancerz_max: 15,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
helm_wikinga.save()

const helm_straznika = new Item_base({
    nazwa: 'Hełm Strażnika',
    obrazek: '/images/helm/straznika.jpg',
    typ: 'Hełm',
    opis: 'to jest hełm strażnika',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 17,
    pancerz_max: 25,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
helm_straznika.save()
const helm_gotycki = new Item_base({
    nazwa: 'Hełm Gotycki',
    obrazek: '/images/helm/gotycki.jpg',
    typ: 'Hełm',
    opis: 'to jest hełm gotycki',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 25,
    pancerz_max: 35,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
helm_gotycki.save()


const helm_rycerza = new Item_base({
    nazwa: 'Hełm Rycerza',
    obrazek: '/images/helm/rycerza.jpg',
    typ: 'Hełm',
    opis: 'to jest hełm rycerza',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 35,
    pancerz_max: 50,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
helm_rycerza.save()
//Zbroje
const kolczuga = new Item_base({
    nazwa: 'Kolczuga',
    obrazek: '/images/zbroja/kolczuga.jpg',
    typ: 'Zbroja',
    opis: 'to jest kolczuga',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 15,
    pancerz_max: 20,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
kolczuga.save()

const zbroja_smoka = new Item_base({
    nazwa: 'Zbroja Smoka',
    obrazek: '/images/zbroja/smoka.jpg',
    typ: 'Zbroja',
    opis: 'to jest zbroja smoka',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 35,
    pancerz_max: 50,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
zbroja_smoka.save()



const zbroja_boga = new Item_base({
    nazwa: 'Zbroja Boga',
    obrazek: '/images/zbroja/boga.jpg',
    typ: 'Zbroja',
    opis: 'to jest zbroja boga',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 75,
    pancerz_max: 100,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 20,
    sila_add_max: 20,
    zrecznosc_add_min: 20,
    zrecznosc_add_max: 20,
    wytrzymalosc_add_min: 20,
    wytrzymalosc_add_max: 20
})
zbroja_boga.save()
//nogawice
const nogawice_krasnoluda = new Item_base({
    nazwa: 'Nogawice Krasnoluda',
    obrazek: '/images/nogawice/krasnoluda.jpg',
    typ: 'Nogawice',
    opis: 'to są nogawice krasnoluda',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 15,
    pancerz_max: 20,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
nogawice_krasnoluda.save()
const nogawice_gotyckie = new Item_base({
    nazwa: 'Nogawice Gotyckie',
    obrazek: '/images/nogawice/gotyckie.jpg',
    typ: 'Nogawice',
    opis: 'to są nogawice gotyckie',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 25,
    pancerz_max: 30,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
nogawice_gotyckie.save()
const nogawice_smoka = new Item_base({
    nazwa: 'Nogawice Smoka',
    obrazek: '/images/nogawice/smoka.jpg',
    typ: 'Nogawice',
    opis: 'to są nogawice smoka',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 35,
    pancerz_max: 50,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 20,
    wytrzymalosc_add_max: 30
})
nogawice_smoka.save()
//buty
const buty_gotyckie = new Item_base({
    nazwa: 'Buty Gotyckie',
    obrazek: '/images/buty/gotyckie.jpg',
    typ: 'Buty',
    opis: 'to są buty gotyckie',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 15,
    pancerz_max: 25,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
buty_gotyckie.save()

const buty_rycerza = new Item_base({
    nazwa: 'Buty Rycerza',
    obrazek: '/images/buty/rycerza.jpg',
    typ: 'Buty',
    opis: 'to są buty rycerza',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 25,
    pancerz_max: 45,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
buty_rycerza.save()
//rękawice
const rekawice_skorzane = new Item_base({
    nazwa: 'Rękawice skórzane',
    obrazek: '/images/rekawice/skórzane.jpg',
    typ: 'Rękawice',
    opis: 'to są rękawice skórzane',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 5,
    pancerz_max: 15,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
rekawice_skorzane.save()
const rekawice_sily = new Item_base({
    nazwa: 'Rękawice Siły',
    obrazek: '/images/rekawice/sily.jpg',
    typ: 'Rękawice',
    opis: 'to są rękawice siły',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 5,
    pancerz_max: 5,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 10,
    sila_add_max: 30,
    zrecznosc_add_min: 0,
    zrecznosc_add_max: 0,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
rekawice_sily.save()
const rekawice_zrecznosci = new Item_base({
    nazwa: 'Rękawice Zręczności',
    obrazek: '/images/rekawice/zrecznosci.jpg',
    typ: 'Rękawice',
    opis: 'to są rękawice zręczności',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 5,
    pancerz_max: 5,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 0,
    sila_add_max: 0,
    zrecznosc_add_min: 30,
    zrecznosc_add_max: 70,
    wytrzymalosc_add_min: 0,
    wytrzymalosc_add_max: 0
})
rekawice_zrecznosci.save()
const rekawice_saurona = new Item_base({
    nazwa: 'Rękawice Saurona',
    obrazek: '/images/rekawice/saurona.jpg',
    typ: 'Rękawice',
    opis: 'to są rękawice saurona',
    atak_min: 0,
    atak_max: 0,
    obrona_min: 0,
    obrona_max: 0,
    pancerz_min: 15,
    pancerz_max: 25,
    obrazenia_min1: 0,
    obrazenia_min2: 0,
    obrazenia_max1: 0,
    obrazenia_max2: 0,
    sila_add_min: 10,
    sila_add_max: 20,
    zrecznosc_add_min: 10,
    zrecznosc_add_max: 20,
    wytrzymalosc_add_min: 10,
    wytrzymalosc_add_max: 20
})
rekawice_saurona.save()


//item_rarity

const zniszczony = new Item_rarity({nazwa: 'zniszczony', atak_mod: 0.5, obrona_mod: 0.5, pancerz_mod: 0.5, obrazenia_mod: 0.5, sila_mod: 0.5, zrecznosc_mod: 0.5, wytrzymalosc_mod: 0.5})
const uszkodzony = new Item_rarity({nazwa: 'uszkodzony', atak_mod: 0.75, obrona_mod: 0.75, pancerz_mod: 0.75, obrazenia_mod: 0.75, sila_mod: 0.75, zrecznosc_mod: 0.75, wytrzymalosc_mod: 0.75})
const zwykly = new Item_rarity({nazwa: 'zwykły', atak_mod: 1.0, obrona_mod: 1.0, pancerz_mod: 1.0, obrazenia_mod: 1.0, sila_mod: 1.0, zrecznosc_mod: 1.0, wytrzymalosc_mod: 1.0})
const niepospolity = new Item_rarity({nazwa: 'niepospolity', atak_mod: 1.2, obrona_mod: 1.2, pancerz_mod: 1.2, obrazenia_mod: 1.2, sila_mod: 1.2, zrecznosc_mod: 1.2, wytrzymalosc_mod: 1.2})
const rzadki = new Item_rarity({nazwa: 'rzadki', atak_mod: 1.3, obrona_mod: 1.3, pancerz_mod: 1.3, obrazenia_mod: 1.3, sila_mod: 1.3, zrecznosc_mod: 1.3, wytrzymalosc_mod: 1.3})
const unikalny = new Item_rarity({nazwa: 'unikalny', atak_mod: 1.5, obrona_mod: 1.5, pancerz_mod: 1.5, obrazenia_mod: 1.5, sila_mod: 1.5, zrecznosc_mod: 1.5, wytrzymalosc_mod: 1.5})
const legendarny = new Item_rarity({nazwa: 'legendarny', atak_mod: 2.0, obrona_mod: 2.0, pancerz_mod: 2.0, obrazenia_mod: 2.0, sila_mod: 2.0, zrecznosc_mod: 2.0, wytrzymalosc_mod: 2.0})
zwykly.save()
zniszczony.save()
uszkodzony.save()
niepospolity.save()
rzadki.save()
unikalny.save()
legendarny.save()



//droptable potworow

var droptable_wilk = new Droptable({})
droptable_wilk.save()
var droptable_dzik = new Droptable({})
droptable_dzik.save()
var droptable_niedzwiedz = new Droptable({})
droptable_niedzwiedz.save()
var droptable_zombie = new Droptable({})
droptable_zombie.save()
var droptable_szkielet_wojownik = new Droptable({})
droptable_szkielet_wojownik.save()
var droptable_szkielet_zabojca = new Droptable({})
droptable_szkielet_zabojca.save()
var droptable_wilkolak = new Droptable({})
droptable_wilkolak.save()
var droptable_piaskowa_zjawa = new Droptable({})
droptable_piaskowa_zjawa.save()
var droptable_trojok = new Droptable({})
droptable_trojok.save()
var droptable_gigant = new Droptable({})
droptable_gigant.save()
var droptable_smok = new Droptable({})
droptable_smok.save()

//potwory
var wilk = new Monster({nazwa: 'Wilk', obrazek: '/images/potwory/wilk.jpg', poziom: 1, atak: 20, obrona: 10, obrazenia_min: 5, obrazenia_max: 15,  pancerz: 0, zycie: 50, doswiadczenie: 50, zloto: 100, droptable: droptable_wilk})
var dzik = new Monster({nazwa: 'Dzik', obrazek: '/images/potwory/dzik.jpg', poziom: 3, atak: 30, obrona: 50, obrazenia_min: 15, obrazenia_max: 27,  pancerz: 0, zycie: 150, doswiadczenie: 200, zloto: 300, droptable: droptable_dzik})
var niedzwiedz = new Monster({nazwa: 'Niedźwiedź', obrazek: '/images/potwory/niedzwiedz.jpg', poziom: 10, atak: 100, obrona: 200, obrazenia_min: 35, obrazenia_max: 60,  pancerz: 0, zycie: 400, doswiadczenie: 1200, zloto: 1230, droptable: droptable_niedzwiedz})
var zombie = new Monster({nazwa: 'Zombie', obrazek: '/images/potwory/zombie.jpg', poziom: 15, atak: 250, obrona: 100, obrazenia_min: 25, obrazenia_max: 50,  pancerz: 0, zycie: 250, doswiadczenie: 1500, zloto: 1200, droptable: droptable_zombie})
var  szkielet_wojownik= new Monster({nazwa: 'Szkielet Wojownik', obrazek: '/images/potwory/szkielet_wojownik.jpg', poziom: 17, atak: 300, obrona: 300, obrazenia_min: 25, obrazenia_max: 87,  pancerz: 10, zycie: 340, doswiadczenie: 2000, zloto: 1400, droptable: droptable_szkielet_wojownik})
var  szkielet_zabojca= new Monster({nazwa: 'Szkielet zabójca', obrazek: '/images/potwory/szkielet_zabojca.jpg', poziom: 20, atak: 350, obrona: 150, obrazenia_min: 65, obrazenia_max: 80,  pancerz: 20, zycie: 250, doswiadczenie: 1800, zloto: 1500, droptable: droptable_szkielet_zabojca})
var  wilkolak= new Monster({nazwa: 'Wilkołak', obrazek: '/images/potwory/wilkolak.jpg', poziom: 25, atak: 250, obrona: 100, obrazenia_min: 25, obrazenia_max: 50,  pancerz: 0, zycie: 250, doswiadczenie: 1500, zloto: 1530, droptable: droptable_wilkolak})
var  piaskowa_zjawa= new Monster({nazwa: 'Piaskowa Zjawa', obrazek: '/images/potwory/piaskowa_zjawa.jpg', poziom: 35, atak: 350, obrona: 300, obrazenia_min: 55, obrazenia_max: 90,  pancerz: 0, zycie: 500, doswiadczenie: 2500, zloto: 3000, droptable: droptable_piaskowa_zjawa})
var  trojok = new Monster({nazwa: 'Trójok', obrazek: '/images/potwory/trójok.jpg', poziom: 50, atak: 500, obrona: 200, obrazenia_min: 75, obrazenia_max: 100,  pancerz: 50, zycie: 500, doswiadczenie: 5000, zloto: 4000, droptable: droptable_trojok})
var gigant = new Monster({nazwa: 'Gigant', obrazek: '/images/potwory/gigant.jpg', poziom: 70, atak: 800, obrona: 500, obrazenia_min: 25, obrazenia_max: 130,  pancerz: 60, zycie: 700, doswiadczenie: 10000, zloto: 5000, droptable: droptable_gigant})
var  smok = new Monster({nazwa: 'Smok', obrazek: '/images/potwory/smok.jpg', poziom: 100, atak: 2000, obrona: 1000, obrazenia_min: 105, obrazenia_max: 120,  pancerz: 120, zycie: 1000, doswiadczenie: 20000, zloto: 10000, droptable: droptable_smok})


wilk.save()
dzik.save()
niedzwiedz.save()
zombie.save()
szkielet_wojownik.save()
szkielet_zabojca.save()
wilkolak.save()
piaskowa_zjawa.save()
trojok.save()
gigant.save()
smok.save()





//poziomy

var lvl1 = new Exptable({poziom: 1, doswiadczenie: 0, punkty: 0})
var lvl2 = new Exptable({poziom: 2, doswiadczenie: 500, punkty: 5})
var lvl3 = new Exptable({poziom: 3, doswiadczenie: 2000, punkty: 10})
var lvl4 = new Exptable({poziom: 4, doswiadczenie: 5000, punkty: 5})
var lvl5 = new Exptable({poziom: 5, doswiadczenie: 10000, punkty: 10})
var lvl6 = new Exptable({poziom: 6, doswiadczenie: 30000, punkty: 5})
var lvl7 = new Exptable({poziom: 7, doswiadczenie: 50000, punkty: 10})
var lvl8 = new Exptable({poziom: 8, doswiadczenie: 100000, punkty: 5})
var lvl9 = new Exptable({poziom: 9, doswiadczenie: 200000, punkty: 10})
var lvl10 = new Exptable({poziom: 10, doswiadczenie: 500000, punkty: 20})
lvl1.save()
lvl2.save()
lvl3.save()
lvl4.save()
lvl5.save()
lvl6.save()
lvl7.save()
lvl8.save()
lvl9.save()
lvl10.save()

