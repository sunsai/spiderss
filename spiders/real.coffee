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
        footer = []
        bangdan=[]
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
              value: $(this).find('td:nth-child(6)').text(),
              color: '#' + Math.floor(Math.random() * 16777215).toString(16)
              label: $(this).find('td:nth-child(2)').text()
            }
          )
        )
        $('#dvBannerRight dl').each(->
          imgs.push({
              id: $(this).attr('id').trim().substring(2)
              img: $(this).find('dt span img').attr('src').trim()
              order: $(this).find('#rImgText').text().trim()
              rMoviename: $(this).find('#rMoviename').text().trim()
              rCountry: $(this).find('#rCountry').text().trim()
              rRuntime: $(this).find('#rDaoyan').text().trim()
              rBianju: $(this).find('#rRuntime').text().trim()
              rDaoyan: $(this).find('#rBianju').text().trim()
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
      tnews = []
      $('#newsmore p').each(->
        tnews.push({
          href: $(this).find('a').attr('href').trim()
          title: $(this).find('a').text().trim()
          time: $(this).find('em').text().trim()
        })
      )
      footer.push({
        title: $('#titleH2 a').text().trim()
        href:$('#titleH2 a').attr('href').trim()
        pic: $('#n_pic img').attr('src').trim()
        time: $('#n_time').text().trim()
        content: $('#n_content').text().trim()
        news: tnews
      })
      aTop = []
      $('ul.ul_jjsy').first().find('li').each(->
        console.log('================================aTop')
        console.log($(this).find('a img').attr('title'))
        aTop.push({
          title: $(this).find('a img').attr('title').trim()
          img: $(this).find('a img').attr('src').trim()
          href: 'http://www.cbooo.cn/' + $(this).find('a').first().attr('href')
          content: $(this).find('p').text().trim()
        })
      )
      dTop = []
      $('ul.ul_jjsy').eq(1).find('li').each(->
        console.log('================================aTop')
        console.log($(this).find('a img').attr('title'))
        dTop.push({
          title: $(this).find('a img').attr('title').trim()
          img: $(this).find('a img').attr('src').trim()
          href: 'http://www.cbooo.cn/' + $(this).find('a').first().attr('href')
          content: $(this).find('p').text().trim()
        })
      )
      bTop = []
      $('ul.ul_jjsy').eq(2).find('li').each(->
        console.log('================================bTop')
        console.log($(this).find('a img').attr('title'))
        bTop.push({
          title: $(this).find('a img').attr('title').trim()
          img: $(this).find('a img').attr('src').trim()
          href: 'http://www.cbooo.cn/' + $(this).find('a').first().attr('href')
          content: $(this).find('p').text().trim()
        })
      )
      bangdan.push({
        aTop: aTop
        dTop: dTop
        bTop: bTop
      })
      d = new Date()
      all.push(
        titles: {
          day: d.Format('yyyy-mm-dd')
          week: d.Week()
          total: $('#week').parent().text().trim()
        }
        films: films
        pdata: pchart
        imgs: imgs
        releases: releaselist
        footers:footer
        bangdan: bangdan
      )
      response.render('realtime', {
        title: '中国票房'
        all: all
      })
    )
}
module.exports = real;
