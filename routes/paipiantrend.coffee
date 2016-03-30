express = require('express')
router = express.Router()
paipiant = require('../spiders/paipiantren')

router.get('/', (req, res)->
  ppt = new paipiant('http://www.cbooo.cn/paipian')
  ppt.getData(res);
)

module.exports = router
