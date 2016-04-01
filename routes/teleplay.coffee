express = require('express')
router = express.Router()


router.get('/',(req,res)->
  res.send('aaaaaaaaaaaaaaa');
)

module.exports = router
