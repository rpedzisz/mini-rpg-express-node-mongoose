const multer = require('multer');
var path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/photo');
    },

    
    filename: function(req, file, cb) {
        
        var user = req.user
        var newpath = '/images/photo/'+user.username+path.extname(file.originalname)
        user.obrazek = newpath
        user.save()
        


        cb(null, user.username + path.extname(file.originalname));
    }
});
exports.storage = storage;


const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'To nie jest obrazek';
        return cb(new Error('To nie jest obrazek'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;


