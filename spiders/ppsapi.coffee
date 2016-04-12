superagent = require('superagent')
url = require('url')

ppsapi = (page)->
  @page = page
ppsapi.prototype = {
  getData: (response)->
    superagent.get(encodeURI(@page)).end((err, res)->
      if err
        console.error(err)
      else
        response.send(res.text)
    )
}
module.exports = ppsapi;
