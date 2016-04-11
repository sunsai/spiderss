superagent = require('superagent')
url = require('url')

mvsapi = (page)->
  @page = page
mvsapi.prototype = {
  getData: (response)->
    page_urls = url.parse(@page)
    reqQuery = page_urls.query
    superagent.get(encodeURI(@page)).end((err, res)->
      if err
        console.error(err)
      else
        rev_text = res.text
        response.send(res.text)
    )
}
module.exports = mvsapi;
