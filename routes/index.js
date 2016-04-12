// Generated by CoffeeScript 1.10.0
(function() {
  var express, mvsapi, ppsapi, real, router, sapi, ttrapi, tvapi;

  express = require('express');

  router = express.Router();

  real = require('../spiders/api');

  sapi = require('../spiders/sapi');

  ttrapi = require('../spiders/ttrapi');

  tvapi = require('../spiders/tvapi');

  mvsapi = require('../spiders/mvsapi');

  ppsapi = require('../spiders/ppsapi');

  router.get('/', function(req, res) {
    return res.render('index', {
      title: 'Express'
    });
  });

  router.get('/api', function(req, res) {
    var r;
    r = new real('http://www.cbooo.cn/');
    return r.getData(res);
  });

  router.get('/sapi', function(req, res) {
    var s;
    s = new sapi('http://www.cbooo.cn/Screen/getScreenData?days=0');
    return s.getData(res);
  });

  router.get('/ttrapi', function(req, res) {
    var mv;
    mv = new mvapi('http://www.cbooo.cn/Screen/getTrendScreenData');
    return mv.getData(res);
  });

  router.get('/tvapi', function(req, res) {
    var tv;
    tv = new tvapi('http://www.cbooo.cn/Mess/getDayPlays?tvType=1');
    return tv.getData(res);
  });

  router.get('/mvsapi', function(req, res) {
    var mv;
    mv = new mvsapi('http://www.cbooo.cn/Mdata/getMdata_movie?area=50&type=0&year=0&initial=全部&pIndex=1');
    return mv.getData(res);
  });

  router.get('/ppsapi', function(req, res) {
    var pps;
    pps = new ppsapi('http://www.cbooo.cn/Mdata/getMdate_pList?area=50&type=0&year=0&initial=全部&pIndex=1');
    return pps.getData(res);
  });

  module.exports = router;

}).call(this);
