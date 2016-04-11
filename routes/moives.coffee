express = require('express')
router = express.Router()
mvso = require('../spiders/movies')
#/* GET home page. */
router.get('/', (req, res)->
  mvs = new mvso('http://www.cbooo.cn/Mdata/getMdata_movie?area=50&type=0&year=0&initial=全部&pIndex=1')
  mvs.getData(res)
)
module.exports = router;
