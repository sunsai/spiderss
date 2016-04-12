express = require('express')
router = express.Router()
peoples = require('../spiders/peoples')
router.get('/',(req,res)->
  pps = new peoples('http://www.cbooo.cn/Mdata/getMdate_pList?area=50&type=0&year=0&initial=全部&pIndex=1')
  pps.getData(res)
)
module.exports =router
