superagent = require('superagent')
cheerio = require('cheerio')
#/* GET home page. */

tv = (page)->
  @page = page
tv.prototype = {
  getData: (response)->
    superagent.get(@page).end((err, res)->
      if err
        console.error(err)
      else

        response.render('teleplay', {
          data: JSON.parse(rev_text)
          title: 'sai'
        })
    )
}
module.exports = tv;
