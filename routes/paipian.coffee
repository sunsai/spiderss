express = require('express')
router = express.Router()
paipian = require('../spiders/paipian')

router.get('/', (req, res)->
  pp = new paipian('http://www.cbooo.cn/Screen/getScreenData?days=0')
  pp.getData(res)
)
module.exports = router;
