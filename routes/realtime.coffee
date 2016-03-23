express = require('express');
router = express.Router();
realt = require('../spiders/real')
router.get('/', (req, res)->
  rt = new realt('http://www.cbooo.cn/')
  rt.getData(res)
)

module.exports = router;
