#str yyyy*mm*dd
Date.prototype.Format = (str)->
  str = str.toLowerCase().replace(/yyyy/, this.getFullYear())
  .replace(/mm/g, if this.getMonth() < 9 then '0' + (this.getMonth() + 1) else this.getMonth() + 1)
  .replace(/dd/g, if this.getDate() < 9 then '0' + this.getDate() else this.getDate())
  return str
Date.prototype.Week = ->
  Week = ['日', '一', '二', '三', '四', '五', '六']
  return '星期' + Week[this.getDay()]

module.exports = Date
