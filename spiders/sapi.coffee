superagent = require('superagent')
#cheerio = require('cheerio')

sapi = (page)->
  @page = page
sapi.prototype = {
  getData: (response)->
    superagent.get(@page).end((err, res)->
      if err
        console.error(err)
      else
        response.send({
          data:JSON.parse(res.text)
        })
    )
}
module.exports = sapi;
