const express = require('express')
const bodyParser = require('body-parser')

const port = 8000
const app = express()

const assert = require('assert');
const mongoose = require('./db/mongoose')
const hbs = require('express-handlebars')
const session = require('express-session');
const flash = require('connect-flash');
var hb = require('handlebars');




hb.registerHelper('ifeq', function (a, b, options) {
    if (a == b) { return options.fn(this); }
    return options.inverse(this);
});

hb.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});


var path = require('path')
app.use(bodyParser.urlencoded({
    extended: true

}))




app.use(express.static(path.join(__dirname, 'public')))
const router = express.Router()

//dane

//const data = require('./db/data')
//const data2 = require('./db/data2')

//routes
const usersRoutes = require('./routes/users.js')
const homeRoutes = require('./routes/home.js')
const characterRoutes = require('./routes/character.js')
const fightRoutes = require('./routes/fight.js')
const cityRoutes = require('./routes/city.js')

const passport = require('passport'); // do logowania
require('./config/passport')(passport)

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/',
runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true

}}))
app.set('view engine', 'hbs')
  
//sesja
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
   }));
//flash messages
app.use(passport.initialize());
app.use(passport.session());
   app.use(flash());
   app.use((req,res,next)=> {
     res.locals.success_msg = req.flash('success_msg');
     res.locals.error_msg = req.flash('error_msg');
     res.locals.error  = req.flash('error');
   next();
   })



app.use('/users', usersRoutes)
app.use('/character', characterRoutes)
app.use('/fight', fightRoutes)
app.use('/city', cityRoutes)

app.use('/', homeRoutes)

const User = require('./models/user')
const replenishEnergy = async  => {
    var energia = 1
    

    User.find().exec((err,users)=>{
        //console.log('zregenerowano energię')
        users.forEach(user => {
            if(user.energia < 100){
                user.energia += energia
                user.save()
            }
        });


        
    })




setTimeout(replenishEnergy, 5000);


}
replenishEnergy()




app.listen(port)