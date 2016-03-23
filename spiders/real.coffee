superagent = require('superagent')
cheerio = require('cheerio')
#/* GET home page. */

real = (url)->
  @url = url
real.prototype = {
  getData: (response)->
    superagent.get(@url).end((err, res)->
      if err
        console.error(err)
      else
        all = []
        films = []
        imgs = []
        $ = cheerio.load(res.text)
        img = ''
        grade = ''
        $('#topdatatr tr').each(->
          if $(this).find('td:nth-child(8)').children().length > 0
            img = 'http://www.cbooo.cn' + $(this).find('td:nth-child(8) img').attr('src').trim()
            grade = $(this).find('td:nth-child(8)').text().trim()
          films.push({
            id: $(this).attr('id')
            order: $(this).find('td:nth-child(1)').text()
            name: $(this).find('td:nth-child(2)').text()
            ptime: $(this).find('td:nth-child(3)').text()
            rate: $(this).find('td:nth-child(4)').text()
            pall: $(this).find('td:nth-child(5)').text()
            prate: $(this).find('td:nth-child(6)').text()
            days: $(this).find('td:nth-child(7)').text()
            img: {
              isup: img
              grade: grade
            }
          })
        )
        $('#dvBannerRight dl').each(->
          imgs.push {
            id: $(this).attr('id').trim().substring(indexOf('_'))
            img: $(this).find('dt span img').attr('src').trim()
          }
        )
        all.push({
          films: films
          imgs: imgs
        })
        response.send(all)
#        response.render('realtime', {
#          title: 'xepress'
#          fms: films
#        })
    )
}
module.exports = real;
