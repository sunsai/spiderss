express = require('express')
router = express.Router()
tv  =require('../spiders/teleplay')

router.get('/',(req,res)->
  t = new tv('http://www.cbooo.cn/Mess/getDayPlays?tvType=1')
  t.getData(res);
)

module.exports = router
