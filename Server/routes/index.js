const route = require("express").Router()
const Controllers = require("../controller/Controllers")
const Controller = require('../controller/Controllers')
const multer = require('../middleware')

route.post('/json', multer.single('file'), Controllers.excelToJSON)
route.post('/log', Controllers.postLog)
route.get('/log', Controllers.getLog)
route.get('/', Controllers.getBank)

module.exports = route