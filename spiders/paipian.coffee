superagent = require('superagent')
#cheerio = require('cheerio')
#/* GET home page. */

pp = (url)->
  @url = url
pp.prototype = {
  getData: (response)->
    superagent.get(@url).end((err, res)->
      if err
        console.error(err)
      else
#        $ = cheerio.load(res.text)
        response.send({
          rzData: JSON.parse(res.text).data4.sort((a, b)->
            return a.MovieID - b.MovieID
          )
          title: "cool"
        })
#        response.render('paipian', {
#          rzData: JSON.parse(res.text).data4.sort()
#          title: "cool"
#        })
    )
}
module.exports = pp;
