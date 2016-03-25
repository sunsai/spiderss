express = require('express')
router = express.Router()
news = require('../spiders/newslist')

router.get('/', (req, res)->
  n = new news('http://www.cbooo.cn/Information/getNewsList?pIndex=1')
  n.getData(res)
)
router.get('/:page', (req, res)->
  n = new news('http://www.cbooo.cn/Information/getNewsList?pIndex=' + req.params.page)
  n.getData(res)
)
module.exports = router;
