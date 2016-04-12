superagent = require('superagent')
url = require('url')

mvsapi = (page)->
  @page = page
mvsapi.prototype = {
  getData: (response)->
    superagent.get(encodeURI(@page)).end((err, res)->
      if err
        console.error(err)
      else
        rev_text = res.text
        response.render('moives',{
          title:'sai'
          data:JSON.parse(rev_text)
        })
    )
}
module.exports = mvsapi;
