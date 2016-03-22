express = require('express')
router = express.Router()
router.get('/', (req, res)->
  res.render('paipian', {
    title: 'test22444'
  })
)
module.exports = router;
