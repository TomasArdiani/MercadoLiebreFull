const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
     cb(null, 'public/images/products')
  },
  filename: function (req, file, cb) {
    cb(null, "img-prod-code" + req.body.code + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  limits: {fileSize: 5000000},
  fileFilter: (req, file, callback) => {
    const fileTypes = /png|jpg|jpeg/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extName) {
      return callback(null,true);
    } else {
      return callback("El archivo debe ser una imagen válida (.png, .jpg, .jpeg)");
    }
  }
}).single('image');

let uploadFile = {
  uploadFile: (req,res,next) => {
    upload(req,res, (error) => { error != undefined ? res.render("product-create-form", {error}) : next() });
  }
}

module.exports = uploadFile;