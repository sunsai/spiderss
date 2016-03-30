superagent = require('superagent')
cheerio = require('cheerio')
#/* GET home page. */

ppt = (url)->
  @url = url
ppt.prototype = {
  getData: (response)->
    superagent.get(@url).end((err, res)->
      if err
        console.error(err)
      else
        $ = cheerio.load(res.text)
        ulPaipian = []
        $('#ulPaipian li a').each(->
          ulPaipian.push({
            text: $(this).text().trim()
            href: $(this).attr('href').replace('http://www.cbooo.cn', '').trim()
          })
        )
#        response.send({
#          ulPaipian: ulPaipian
#          title:"cool"
#        })
        response.render('paipiantrend', {
          ulPaipian: ulPaipian
          title:"cool"
        })
    )
}
module.exports = ppt;
