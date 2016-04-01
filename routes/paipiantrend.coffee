express = require('express')
router = express.Router()
paipiant = require('../spiders/paipiantren')

router.get('/', (req, res)->
  ppt = new paipiant('http://www.cbooo.cn/Screen/getTrendScreenData')
  ppt.getData(res);
)

module.exports = router
