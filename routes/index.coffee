express = require('express')
router = express.Router()
real = require('../spiders/api')
sapi = require('../spiders/sapi')
ttrapi = require('../spiders/ttrapi')
tvapi = require('../spiders/tvapi')
mvsapi = require('../spiders/mvsapi')
ppssapi = require('../spiders/ppsapi')

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
  mv = new mvapi('http://www.cbooo.cn/Screen/getTrendScreenData')
  mv.getData(res)
)
router.get('/tvapi', (req, res)->
  tv = new tvapi('http://www.cbooo.cn/Mess/getDayPlays?tvType=1')
  tv.getData(res)
)
router.get('/mvsapi', (req, res)->
  mv = new mvsapi('http://www.cbooo.cn/Mdata/getMdata_movie?area=50&type=0&year=0&initial=全部&pIndex=1')
  mv.getData(res)
)
router.get('/ppsapi', (req, res)->
  pps = new ppsapi('http://www.cbooo.cn/Mdata/getMdate_pList?area=50&type=0&year=0&initial=全部&pIndex=1')
  pps.getData(res)
)
module.exports = router;
