express = require('express');
router = express.Router();

#/* GET users listing. */
router.get('/', (req, res)->
  res.render('realtime',{title:'test22444'})
#  res.send('respond with a resource from the page realtime')
)

module.exports = router;
