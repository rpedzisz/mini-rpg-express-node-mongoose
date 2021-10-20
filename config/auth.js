module.exports = {
    ensureAuthenticated : function(req,res,next) {
    if(req.isAuthenticated()) {
    return next();
    }
    req.flash('error_msg' , 'Proszę się zalogować');
    res.redirect('/users/login');
    }
    }