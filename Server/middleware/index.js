const multer = require('multer')
const multerConf = {
  storage: multer.diskStorage({
    destination: function(req, file, next){
      next(null, './uploads')
    },
    filename: function(req, file, next){
      const ext = file.originalname.split('.')[1]
      next(null, file.originalname.split('.')[0] + '.'+ext)
    }
  }),
}
module.exports = multer(multerConf)