superagent = require('superagent')
#cheerio = require('cheerio')

ttrapi = (page)->
  @page = page
ttrapi.prototype = {
  getData: (response)->
    superagent.get(@page).end((err, res)->
      if err
        console.error(err)
      else
        rev_text = res.text
        data1 = JSON.parse(rev_text).data1
        data2 = JSON.parse(rev_text).data2
        data3 = JSON.parse(rev_text).data3
        data1.forEach((id1)->
          id1.m_daysum = 0
          id1.m_dayrate = 0
        )
        data3.forEach((id3)->
          id3.daymoives = []
          id3.daymoives.push(data1)
          data2.forEach((id2)->
            id3.daymoives[0].forEach((idd3)->
              if id3.movieid == id2.m_id and idd3.sdate == id2.m_date
                idd3.m_daysum = id2.m_daysum
                idd3.m_dayrate = (id2.m_daysum / id2.m_summoviesum * 100).toFixed(2)
            )
          )
        )
        response.send({
          data1: data1
          data2: data2
          data3: data3
        })
    )
}
module.exports = ttrapi;
