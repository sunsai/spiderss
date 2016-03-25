superagent = require('superagent')
cheerio = require('cheerio')
url = require('url')
#/* GET home page. */

news = (url)->
  @url = url
news.prototype = {
  getData: (response)->
    page = url.parse(@url)
    curPage = ''
    if page.query != "" or page.query != undefined
      curPage = page.query.toString().replace('pIndex=', '')
    superagent.get(@url).end((err, res)->
      if err
        console.error(err)
      else
        newslist = []
        response.render('newslist', {
          title: '新闻列表'
          newslist: JSON.parse(res.text)
          curPage: curPage
        })
    )
}
module.exports = news;
