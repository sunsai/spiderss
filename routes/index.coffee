express = require('express')
router = express.Router()
real = require('../spiders/api')
sapi = require('../spiders/sapi')
ttrapi = require('../spiders/ttrapi')
tvapi = require('../spiders/tvapi')

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
router.get('/ttrapi', (req, res)->
  ttr = new ttrapi('http://www.cbooo.cn/Screen/getTrendScreenData')
  ttr.getData(res)
)
router.get('/tvapi', (req, res)->
  tv = new tvapi('http://www.cbooo.cn/Mess/getDayPlays?tvType=1')
  tv.getData(res)
)
module.exports = router;
