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
        rev_text = res.text
        data1 = JSON.parse(rev_text).data1
        data1.forEach((item)->
          JSON.parse(rev_text).data4.forEach((itd4)->
            if item.movieid is itd4.MovieID
              item.rezIndexs = itd4.RenZhiIndex
              item.days = itd4.days
          )
          JSON.parse(rev_text).data5.forEach((itd5)->
            item.buyIndexs = itd5.BuyTicketIndex if item.movieid is itd5.MovieID
          )
          JSON.parse(rev_text).data6.forEach((itd6)->
            item.rapIndexs = itd6.RapIndex if item.movieid is itd6.MovieID
          )
        )
        data1.pop()
        data3 = JSON.parse(rev_text).data3
        data3.forEach((itd3)->
          itd3.ctmoives = JSON.parse(rev_text).data1
          JSON.parse(rev_text).data2.forEach((itd2)->
            itd3.ctmoives.forEach((im)->
              if itd3.name == itd2.cityname and im.movieid == itd2.movieid
                im.sumnum = itd2.sumnum
                im.crate = (itd2.sumnum / itd3.citynum*100).toFixed(2)
            )
          )
          itd3.ctmoives.pop()
        )
        response.render('paipian', {
          data1: data1
          data3: data3
          title: "cool"
        })
    )
}
module.exports = pp;
