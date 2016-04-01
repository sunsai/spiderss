superagent = require('superagent')

tvapi = (page)->
  @page = page
tvapi.prototype = {
  getData: (response)->
    superagent.get(@page).end((err, res)->
      if err
        console.error(err)
      else
        rev_text = res.text
        response.send({
          data: JSON.parse(rev_text)
        })
    )
}
module.exports = tvapi;
