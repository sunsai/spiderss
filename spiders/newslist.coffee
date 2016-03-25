superagent = require('superagent')
cheerio = require('cheerio')
#/* GET home page. */

news = (url)->
  @url = url
news.prototype = {
  getData: (response)->
    superagent.get(@url).end((err, res)->
      if err
        console.error(err)
      else
        newslist = []
        response.render('newslist', {
          title:'新闻列表'
          newslist: JSON.parse(res.text)
        })
    )
}
module.exports = news;
