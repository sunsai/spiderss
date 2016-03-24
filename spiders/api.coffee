superagent = require('superagent')
cheerio = require('cheerio')
Date = require('./Date')
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
        pchart = []
        releaselist = []
        $ = cheerio.load(res.text)
        img = ''
        grade = '--'
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
          pchart.push({
              value: $(this).find('td:nth-child(6)').text().replace('%', ''),
              color: '#' + Math.floor(Math.random() * 16777215).toString(16)
              label: $(this).find('td:nth-child(2)').text()
            }
          )
        )
        $('#dvBannerRight dl').each(->
          imgs.push ({
            id: $(this).attr('id').trim().substring(2)
            img: $(this).find('dt span img').attr('src').trim()
            order: $(this).find('dt span #rImgText').text().trim()
            rMoviename: $(this).find('#rMoviename').text().trim()
            rCountry: $(this).find('#rCountry').text().trim()
            rRuntime: $(this).find('#rRuntime').text().trim()
            rDaoyan: $(this).find('#rDaoyan').text().trim()
            rBianju: $(this).find('#rBianju').text().trim()
            rYanyuan: $(this).find('#rYanyuan').text().trim()
          }
          )
        )
        $('#releaselist table tr').each(->
          releaselist.push ({
            id: $(this).attr('id')
            date: $(this).find('td:nth-child(1)').text().trim()
            name: $(this).find('td:nth-child(2)').text().trim()
            type: $(this).find('td:nth-child(3)').text().trim()
            index: $(this).find('td:nth-child(4)').text().trim()
          }
          )
        )
        d = new Date()
        all.push(
          titles: {
            day: d.Format('yyyy-mm-dd')
            week: d.Week()
            total: $('#week').parent().text().trim()
          }
          films: films
          data: pchart
          imgs: imgs
          releases: releaselist
        )
        response.send(all)
    )
}
module.exports = real;
