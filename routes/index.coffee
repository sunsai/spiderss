express = require('express')
router = express.Router()
real = require('../spiders/api')
sapi = require('../spiders/sapi')

#/* GET home page. */

router.get('/', (req, res)->
  res.render('index', {title: 'Express'})
)
router.get('/api', (req, res)->
  r = new real('http://www.cbooo.cn/')
  r.getData(res)
)
router.get('/sapi', (req, res)->
  s = new sapi('http://www.cbooo.cn/Screen/getScreenData?days=0')
  s.getData(res)
)
module.exports = router;
