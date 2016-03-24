express = require('express')
router = express.Router()
real= require('../spiders/api')

#/* GET home page. */

router.get('/', (req, res)->
  res.render('index', {title: 'Express'})
)
router.get('/api', (req, res)->
  r = new real('http://www.cbooo.cn/')
  r.getData(res)
)
module.exports = router;
