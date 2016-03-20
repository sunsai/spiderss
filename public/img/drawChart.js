var colorArr = ["#109bee", "#83cdfa", "#979568", "#fcac2a", "#fdd77b", "#1dd173", "#2bf68c"];
var drawChar = {
    colorArr: ["#109BEE", "#4FB8F9", "#83CDFA", "#FFB63F", "#FFCE58", "#FEEA58", "#979568", "#AFAD8B", "#1DD173", "#42E68F", "#70C3F5", "#95D4FB", "#B5E1FC", "#FFD38C", "#FEE19B", "#FEF29B", "#C1BFA4", "#CFCEB9", "#77E3AB", "#8EF0BC"],
    editDate: function (dt, m) {
        if (dt.indexOf('-') > 0)
            m = '-';
        var dArr = dt.replace(' 0:00:00', '').split('' + m + '');
        return dArr[0] + '年' + dArr[1] + '月' + dArr[2] + '日';
    },
    // 单日票房混合图
    drawHh: function (elmId, chartTitle, nameArr, boxArr, year, mday, n) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                var danwei = '单位：万元';
                if (mday && mday.indexOf('screen_city') > -1) {
                    danwei = '单位：场次';
                }
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 110,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: danwei,
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 170,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();

                var option = {
                    title: {
                        text: chartTitle,
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },                    
                    grid: {
                        x: 150,
                        x2: 50
                    },
                    xAxis: [
                            {
                                type: 'value',
                                boundaryGap: [0, 0.01],
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }],
                    yAxis: [
                                {
                                    type: 'category',
                                    data: nameArr,
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    }

                                }],
                    series: [
                            {
                                name: year,
                                type: 'bar',
                                data: boxArr,
                                barMinHeight: 20, //柱条（K线蜡烛）宽度，不设时自适应
                                barWidth: 20                                
                            },
                            {
                                name: '',
                                type: 'pie',
                                radius: [50, 70],
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{a} {b} : {c} ({d}%)'
                                },
                                center: ['85%', '71%'],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            length: -160,
                                            show: false
                                        }
                                    }
                                },
                                data: boxArr
                            }
                    ]
                };
                myChart.setOption(option);
                if (mday == 'mDay') { //单日图
                    setTimeout(function () {
                        var i = myChart.getImage('png');
                        var u = myChart.getDataURL('png');
                        if (!u) return;
                        $('#divFenx').append(i);
                        $.ajax({
                            url: '/boxOffice/getImg',
                            type: 'post',
                            data: { imgStr: u, imgName: 'movieday' + n },
                            success: function (data) {
                                console.log(data);
                            }
                        });
                    }, 2000);
                }
                if (mday && mday.indexOf('screen_city') > -1) { //排片图
                    setTimeout(function () {
                        var i = myChart.getImage('png');
                        var u = myChart.getDataURL('png');
                        if (!u) return;
                        $('#divFenx').append(i);
                        $.ajax({
                            url: '/boxOffice/getImg',
                            type: 'post',
                            data: { imgStr: u, imgName: (mday + n) },
                            success: function (data) {
                                shareData.pic = data + '?v=' + new Date().getTime();
                                shareData.url = 'http://www.cbooo.cn/citypaipian';
                                $('#bdshare').attr('data', objToString(shareData));
                            }
                        });
                    }, 2000);
                }
                if (mday == 'ss' || mday == 'ys') { //实时
                    setTimeout(function () {
                        var i = myChart.getImage('png');
                        var u = myChart.getDataURL('png');
                        if (!u) return;
                        $('#divFenx').append(i);
                        var imgNameStr = 'hour_' + mday;
                        if (mday == 'ys') imgNameStr = 'hour_' + mday + '_' + n;
                        $.ajax({
                            url: '/boxOffice/getImg',
                            type: 'post',
                            data: { imgStr: u, imgName: imgNameStr },
                            success: function (data) {
                                console.log(data);
                            },
                            error: function (a,b,c) {
                                console.log('error---create-img:'+b);
                            }
                        });
                    }, 2000);
                }
            }
                );
    },
    drawPie_day_new: function (elmId, chartTitle, nameArr, boxArr, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var option = {
                    title: {
                        text: chartTitle,
                        x: 35,
                        y: 24,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b}</br>{c}场'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 40,
                        y: 260,
                        data: nameArr,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    
                    axis: {
                        position: 'right'
                    },
                    series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: ['70', '90'],
                                    center: ['50%', 150],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        }
                                    },
                                    data: boxArr
                                }
                    ]
                };
                myChart.setOption(option);
            }
            );
    },
    drawPie_wap_new: function (elmId, chartTitle, nameArr, boxArr, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var option = {
                    title: {
                        text: chartTitle,
                        x: 60,
                        y: 10,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} {b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: nameArr,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    axis: {
                        position: 'right'
                    },
                    series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: ['40', '60'],
                                    center: ['50%', 110],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        }
                                    },
                                    data: boxArr
                                }
                    ]
                };
                myChart.setOption(option);
            }
            );
    },
    // 首页排片圆饼图
    drawPie_day: function (elmId, chartTitle, nameArr, boxArr, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var option = {
                    title: {
                        text: chartTitle,
                        x: 250,
                        y: 40,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter:'{b}&nbsp;&nbsp;{c}场'
                    },
                    legend: {
                        orient: 'vertical',
                        x: 250,
                        y: 90,
                        data: nameArr,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    axis: {
                        position: 'right'
                    },
                    series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: ['70', '90'],
                                    center: ['20%', 150],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        }
                                    },
                                    data: boxArr
                                }
                    ]
                };
                myChart.setOption(option);
            }
            );
    },
    // 首页排片圆饼图-wap
    drawPie_wap: function (elmId, chartTitle, nameArr, boxArr, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var option = {
                    title: {
                        text: chartTitle,
                        x: 60,
                        y: 10,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} {b} : {c} ({d}%)"
                    },
                    legend: {
                        x: 'center',
                        y: 'bottom',
                        data: nameArr,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    axis: {
                        position: 'right'
                    },
                    series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: ['40', '60'],
                                    center: ['50%', 110],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        }
                                    },
                                    data: boxArr
                                }
                    ]
                };
                myChart.setOption(option);
            }
            );
    },
    //单日票房趋势 折线
    dayInfoLine: function (elmId, chartTitle, nameArr, boxArr, year, dinfo) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        var isChange = false;
        var sx = 0;
        var ex = 100;
        if (year == 'ckValue') {
            isChange = true;
            ex = 75;
        }
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 80,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 110,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '单位：万元',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 80,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 130,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} {b}{c} ({d}%)"
                    },
                    grid: {
                        x2: 50
                    },
                    dataZoom: {
                        show: isChange,
                        realtime: true,
                        start: sx,
                        end: ex
                    },
                    xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                boundaryGap: true,
                                splitNumber: 10
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: true },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                    ],
                    series: [
                            {
                                name: '',
                                type: 'line',
                                stack: '总量',
                                data: boxArr,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 4,
                                itemStyle: {
                                    normal: {
                                        lineStyle: {
                                            color: drawChar.colorArr[0]
                                        }
                                    }
                                }
                            }
                    ]
                };

                myChart.setOption(option);
                if (dinfo == 'dayInfo') {
                    setTimeout(function () {
                        var i = myChart.getImage('png');
                        var u = myChart.getDataURL('png');
                        if (!u) return;
                        $('#divFenx').append(i);
                        $.ajax({
                            url: '/boxOffice/getImg',
                            type: 'post',
                            data: { imgStr: u, imgName: 'DayInfo' },
                            success: function (data) {
                                console.log(data);
                            }
                        });
                    }, 2000);
                }
            }
            );
    },
    //中美票房 折线
    lineUC: function (elmId, chartTitle, nameArr, boxArr, boxArr2) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} {b}{c} ({d}%)"
                    },
                    legend: {
                        x: 'right',
                        data: ['北美', '中国'],
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    grid: {
                        x: 0,
                        y: 30,
                        x2: 15,
                        y2: 25
                    },
                    xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                boundaryGap: true,
                                splitNumber: 10
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: true },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                }, axisLabel: {
                                    show: false,
                                    margin: -90
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                splitNumber: 3
                            }
                    ],
                    series: [
                            {
                                name: '北美',
                                type: 'line',
                                data: boxArr,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 2
                            },
                            {
                                name: '中国',
                                type: 'line',
                                data: boxArr2,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 2
                            }
                    ]
                };

                myChart.setOption(option);
            }
            );
    },
    // 周末票房 工作日
    drawHhWeek: function (elmId, chartTitle, nameArr, boxArr, boxArrDay, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 150,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 80,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '单位：万元',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 150,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 170,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    grid: {
                        x: 150,
                        x2: 20
                    },
                    xAxis: [
                            {
                                type: 'value',
                                boundaryGap: [0, 0.01],
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }],
                    yAxis: [
                                {
                                    type: 'category',
                                    data: nameArr,                                   
                                    splitLine: {
                                        show: false
                                    },
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    },
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        }
                                    }

                                }],
                    series: [
                            {
                                name: year,
                                type: 'bar',
                                stack: '总量',
                                data: boxArr,
                                barWidth: 20
                            },
                            {
                                name: year,
                                type: 'bar',
                                stack: '总量',
                                data: boxArrDay,
                                barWidth: 20
                            },
                            {
                                name: '',
                                type: 'pie',
                                radius: [50, 70],
                                tooltip: {
                                    trigger: 'item',
                                    formatter: '{a} {b} : {c} ({d}%)'
                                },
                                center: ['87%', '71%'],
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            length: -160,
                                            show: false
                                        }
                                    }
                                },
                                data: boxArr
                            }
                    ]
                };
                myChart.setOption(option);
            }
                );
    },
    //地域排片　堆叠柱状图片
    drawAreaColumn: function (elmId, chartTitle, nameArr, boxArr, tol, d) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 75,
                        y: _ZR.getHeight() - 7,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));               
                _ZR.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 20,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        //data: tol,                        
                        data: ['一线城市', '二线城市', '三线城市', '其他'],
                        y: 350,
                        x: 300,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    grid: {
                        x2: 20,
                        y: 30,
                        y2: 70
                    },
                    xAxis: [
                            {
                                type: 'category',
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLabel: {
                                    formatter: function (value) {
                                        return (value.length > 4 ? value.substr(0, 4) + "." : value);
                                    },
                                    textStyle: {
                                        fontFamily: '微软雅黑'
                                    }
                                }                               
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitNumber: 3,
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                    ],
                    series: [
                                {
                                    name: '一线城市',
                                    type: 'bar',
                                    stack: '总量',
                                    itemStyle: {
                                        normal: {
                                            color: drawChar.colorArr[0]
                                        }
                                    },
                                    data: boxArr[0]
                                },
                                {
                                    name: '二线城市',
                                    type: 'bar',
                                    stack: '总量',
                                    itemStyle: {
                                        normal: {
                                            color: drawChar.colorArr[2]
                                        }
                                    },
                                    data: boxArr[1]
                                },
                                {
                                    name: '三线城市',
                                    type: 'bar',
                                    stack: '总量',
                                    itemStyle: {
                                        normal: {
                                            color: drawChar.colorArr[4]
                                        }
                                    },
                                    data: boxArr[2]
                                },
                                {
                                    name: '其他',
                                    type: 'bar',
                                    stack: '总量',
                                    itemStyle: {
                                        normal: {
                                            color: drawChar.colorArr[6]
                                        }
                                    },
                                    data: boxArr[3]
                                },
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: [50, 70],
                                    tooltip: {
                                        trigger: 'item',
                                        formatter: '{a} {b} : {c} ({d}%)'
                                    },
                                    center: ['87%', '35%'],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                length: -160,
                                                show: false
                                            }
                                        }
                                    },
                                    data: boxArr[4]
                                }
                    ]
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    var imgName = 'screen_Area' + d;
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: imgName },
                        success: function (data) {
                            shareData.pic = data + '?v=' + new Date().getTime();
                            shareData.text = $('#divFenx').find('img').attr('title');
                            shareData.url = 'http://www.cbooo.cn/citypaipian';
                            $('#bdshare').attr('data', objToString(shareData));
                        }
                    });
                }, 2000);
            }
                );
    },
    /// 排片趋势 折线图
    drawTrendLine: function (elmId, chartTitle, nameArr, boxArr, tol, cid, legenObj) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 75,
                        y: _ZR.getHeight() - 7,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 75,
                        y: _ZR.getHeight() - 7,
                        color: '#666',
                        text: '单位：场次',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 20,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: tol,
                        x: 80,
                        y: 310,
                        selected: legenObj,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    grid: {
                        x2: 20,
                        y: 30,
                        y2: 95
                    },
                    xAxis: [
                            {
                                type: 'category',
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                splitArea: {
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                axisLine: {
                                    show: false
                                }
                            }
                    ],
                    series: boxArr
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    if (!cid || cid == 'undefined') cid = 'All';
                    var imgName = 'screen_Trend' + cid;
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: imgName },
                        success: function (data) {
                            shareData.pic = data + '?v=' + new Date().getTime();
                            shareData.text = $('#divFenx').find('img').attr('title');
                            shareData.url = 'http://www.cbooo.cn/paipiantrend';
                            $('#bdshare').attr('data', objToString(shareData));
                        }
                    });
                }, 2000);
            }
                );
    },
    // 单日排片
    drawScreen_day: function (elmId, chartTitle, nameArr, boxArr, year, d) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 7,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));

                _ZR.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 20,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} {b} <br/> {c}场"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 360,
                        y: 90,
                        itemGap: 30,
                        data: nameArr,
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    axis: {
                        position: 'right'
                    },
                    series: [
                                {
                                    name: '',
                                    type: 'pie',
                                    radius: ['90', '120'],
                                    center: [200, 160],
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: false
                                            },
                                            labelLine: {
                                                show: false
                                            }
                                        }
                                    },
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    },
                                    data: boxArr
                                }
                    ]
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    var imgName = 'screen_Country' + d;
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: imgName },
                        success: function (data) {
                            shareData.pic = data + '?v=' + new Date().getTime();
                            shareData.text = weiboTxt;
                            shareData.url = 'http://www.cbooo.cn/paipian';
                            $('#bdshare').attr('data', objToString(shareData));
                        }
                    });
                }, 2000);
            }
            );
    },
    // 中美 大盘
    lineUC_day: function (elmId, chartTitle, nameArr, boxArr, boxArr2, Zoom) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 0,
                        y: _ZR.getHeight() - 7,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 0,
                        y: _ZR.getHeight() - 20,
                        width: _ZR.getWidth() - 45,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: '360',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        textStyle: {
                            align: 'left'
                        },
                        padding: 10
                    },
                    dataZoom: {
                        show: true,
                        y: 380,
                        realtime: true,
                        start: Zoom.start,
                        end: Zoom.end
                    },
                    legend: {
                        x: 'left',
                        y: 40,
                        data: ['北美', '中国'],
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    grid: {
                        x: 0,
                        x2: 55,
                        y: 60,
                        y2: 100
                    },
                    xAxis: [
                            {
                                type: 'category',
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                boundaryGap: true,
                                splitNumber: 7
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: true },
                                position: 'right',
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                splitLine: false,
                                axisLabel: {
                                    show: true,
                                    margin: -90
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                splitArea: false,
                                splitNumber: 7
                            }
                    ],
                    series: [
                            {
                                name: '北美',
                                type: 'line',
                                data: boxArr,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 0
                            },
                            {
                                name: '中国',
                                type: 'line',
                                data: boxArr2,
                                smooth: true,
                                symbol: 'circle',
                                symbolSize: 0
                            }
                    ]
                };

                myChart.setOption(option);
            }
            );
    },
    //中美
    box_UC_ComPar: function (elmId, elmId2, chartTitle, nameArr, boxArr, maxY) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/line': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        var isChange = false;
        var sx = 0;
        var ex = 100;
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 60,
                        y: 80,
                        color: '#666',
                        text: '单片票房对比',
                        textFont: 'normal 14px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: true,
                        x: 'left',
                        y: 35,
                        selectedMode: false,
                        data: ['北美', '中国']
                    },
                    grid: {
                        x: 50,
                        x2: 10,
                        y2: 30
                    },
                    xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                splitLine: { show: false },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'none'
                                    }
                                },
                                splitNumber: 10
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: false },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                    ],
                    series: [
                                {
                                    name: '北美',
                                    type: 'line',
                                    data: boxArr[1],
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 0
                                },
                                {
                                    name: '中国',
                                    type: 'line',
                                    data: boxArr[0],
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 0
                                }
                    ]
                };
                myChart.setOption(option);
                var myChart2 = ec.init(document.getElementById(elmId2));
                var _ZR2 = myChart2.getZrender();
                var TextShape2 = require('zrender/shape/Text');
                var imgShape2 = require('zrender/shape/Image');
                _ZR2.addShape(new TextShape({
                    style: {
                        x: 60,
                        y: 25,
                        color: '#666',
                        text: '同期大盘对比',
                        textFont: 'normal 14px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR2.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR2.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));

                var option2 = {
                    tooltip: {
                        trigger: 'item'
                    },
                    grid: {
                        x: 50,
                        x2: 10,
                        y: 5
                    },
                    xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                splitLine: { show: false },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    show: false,
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                splitNumber: 10
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: false },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                    ],
                    series: [
                                {
                                    name: '北美',
                                    type: 'line',
                                    data: boxArr[3],
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 0
                                },
                                    {
                                        name: '中国',
                                        type: 'line',
                                        data: boxArr[2],
                                        smooth: true,
                                        symbol: 'circle',
                                        symbolSize: 0
                                    }
                    ]
                };
                myChart2.setOption(option2);
                myChart.connect([myChart2]);
                myChart2.connect([myChart]);
            }
            );
    },
    tvDayPlay: function (elmId, chartTitle, nameArr, boxArr, imgName) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 10,
                        color: '#666',
                        text: '数据来源：ETVT艺恩电视决策智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 80,
                        y: _ZR.getHeight() - 10,
                        color: '#666',
                        text: '单位：万次',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 22,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 37,
                        color: '#666',
                        text: '数据来自优酷、土豆、爱奇艺、搜狐、腾讯、乐视视频、芒果网站。数据来自网络，与实际可能存在偏差。',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    color: colorArr,
                    grid: {
                        y: 40,
                        y2: 110
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        y: 350,
                        data: ['优酷', '土豆', '爱奇艺', '搜狐', '腾讯', '乐视', '芒果']
                    },
                    xAxis: [
        {
            type: 'value',
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontWeight: 'normal'
                }
            }
        }
                    ],
                    yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                textStyle: {
                    fontFamily: '微软雅黑',
                    fontWeight: 'normal'
                }
            },
            data: nameArr
        }
                    ],
                    series: [
        {
            name: '优酷',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[0]
        },
        {
            name: '土豆',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[1]
        },
        {
            name: '爱奇艺',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[2]
        },
        {
            name: '搜狐',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[3]
        },
        {
            name: '腾讯',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[4]
        },
        {
            name: '乐视',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[5]
        },
        {
            name: '芒果',
            type: 'bar',
            stack: '总量',
            itemStyle: { normal: { label: { show: false, position: 'insideRight'}} },
            data: boxArr[6]
        }
                    ]
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: imgName },
                        success: function (data) {
                            shareData.pic = data + '?v=' + new Date().getTime();
                            shareData.text = weiboTxt;
                            shareData.url = 'http://www.cbooo.cn/';
                            $('#bdshare').attr('data', objToString(shareData));
                        }
                    });
                }, 2000);
            }
            );
    },
    VariDayPlay: function (elmId, chartTitle, nameArr, boxArr, imgName) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 10,
                        color: '#666',
                        text: '数据来源：ETVT艺恩电视决策智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 30,
                        color: '#666',
                        text: '数据来自优酷、土豆、爱奇艺、搜狐、腾讯、乐视、芒果视频网站。数据来自网络，与实际可能存在偏差。',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 80,
                        y: _ZR.getHeight() - 10,
                        color: '#666',
                        text: '单位：万次',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));

                for (var i = 0; i < nameArr.length; i++) {
                    _ZR.addShape(new TextShape({
                        style: {
                            x: document.getElementById(elmId).offsetWidth / 2 - 20,
                            y: 79 + (i * 37),
                            color: '#666',
                            text: nameArr[i],
                            textFont: 'normal 12px 微软雅黑',
                            textAlign: 'left'
                        },
                        hoverable: false
                    }));
                }

                _ZR.addShape(new imgShape({
                    style: {
                        x: 50,
                        y: _ZR.getHeight() - 20,
                        width: _ZR.getWidth() - 60,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    color: colorArr,
                    tooltip: {
                        show: true,
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'horizontal',
                        x: 'center',
                        y: _ZR.getHeight() - 60,
                        data: ['优酷', '土豆', '爱奇艺', '搜狐', '腾讯', '乐视', '芒果']
                    },
                    series: boxArr
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: imgName },
                        success: function (data) {
                            shareData.pic = data + '?v=' + new Date().getTime();
                            shareData.text = weiboTxt;
                            shareData.url = 'http://www.cbooo.cn/';
                            $('#bdshare').attr('data', objToString(shareData));
                        }
                    });
                }, 2000);
            }
            );
    },
    box_UC_Async: function (elmId, chartTitle, nameArr, boxArr) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/line': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        var isChange = false;
        var sx = 0;
        var ex = 100;
        require(
            [
                'echarts',
                'echarts/chart/line'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 60,
                        y: 80,
                        color: '#666',
                        text: '单片票房对比',
                        textFont: 'normal 14px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.refresh();
                var option = {
                    title: {
                        text: chartTitle,
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        show: true,
                        x: 'left',
                        y: 35,
                        selectedMode: false,
                        data: ['北美', '中国']
                    },
                    grid: {
                        x: 50,
                        x2: 10,
                        y2: 30
                    },
                    xAxis: [
                            {
                                type: 'category',
                                boundaryGap: true,
                                data: nameArr,
                                axisTick: {
                                    show: false
                                },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                splitLine: { show: false },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'none'
                                    }
                                },
                                splitNumber: 10
                            }
                    ],
                    yAxis: [
                            {
                                type: 'value',
                                splitArea: { show: false },
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                    ],
                    series: [
                                {
                                    name: '北美',
                                    type: 'line',
                                    data: boxArr[1],
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 0
                                },
                                {
                                    name: '中国',
                                    type: 'line',
                                    data: boxArr[0],
                                    smooth: true,
                                    symbol: 'circle',
                                    symbolSize: 0
                                }
                    ]
                };
                myChart.setOption(option);
            });
    },
    EFMT_Bar: function (elmId, chartTitle, nameArr, boxArr, year) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });

        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EFMT艺恩电影营销智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    onmousedown: function (param) {
                        window.open('http://www.entgroup.com.cn/enbase/enbase.shtml');
                    },
                    hoverable: false
                }));

                _ZR.addShape(new TextShape({
                    style: {
                        x: _ZR.getWidth() - 110,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: "",//"单位：分",
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 170,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();

                var option = {
                    title: {
                        text: chartTitle,
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        x: 150,
                        x2: 50
                    },
                    xAxis: [
                            {
                                type: 'value',
                                boundaryGap: [0, 0.01],
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                },
                                max:10
                            }],
                    yAxis: [
                                {
                                    type: 'category',
                                    data: nameArr,
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    }

                                }],
                    series: [
                            {
                                name: year,
                                type: 'bar',
                                data: boxArr,
                                barMinHeight: 20, //柱条（K线蜡烛）宽度，不设时自适应
                                barWidth: 20
                            }
                    ]
                };
                myChart.setOption(option);
            }
                );
    },

    EFMT_Line: function (elmId, chartTitle, xArr, boxArr,lengend,minY) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });            
        require(
        [
            'echarts',
            'echarts/chart/pie'
        ],
        function (ec) {
            var myChart = ec.init(document.getElementById(elmId));
            var _ZR = myChart.getZrender();
            var TextShape = require('zrender/shape/Text');
            var imgShape = require('zrender/shape/Image');
            _ZR.addShape(new TextShape({
                style: {
                    x: 80,
                    y: _ZR.getHeight() - 15,
                    color: '#666',
                    text: '数据来源：EFMT艺恩电影营销智库',
                    textFont: 'normal 12px 微软雅黑',
                    textAlign: 'left'
                },
                onmousedown: function (param) {
                    window.open('http://www.entgroup.com.cn/enbase/enbase.shtml');
                },
                hoverable: false
            }));
            _ZR.addShape(new TextShape({
                style: {
                    x: _ZR.getWidth() - 110,
                    y: _ZR.getHeight() - 15,
                    color: '#666',
                    text: '单位：分',
                    textFont: 'normal 12px 微软雅黑',
                    textAlign: 'left'
                },
                hoverable: false
            }));
            _ZR.addShape(new imgShape({
                style: {
                    x: 50,
                    y: _ZR.getHeight() - 30,
                    width: _ZR.getWidth() - 100,
                    color: '#666',
                    text: '',
                    textAlign: 'left',
                    image: '../../Content/images/imgline.png'
                }
            }));
            _ZR.refresh();
            var option = {
                title: {
                    text: chartTitle,
                    x: 'left',
                    textStyle: {
                        fontFamily: '微软雅黑',
                        fontWeight: 'normal',
                        fontSize: 10
                    }
                },
                legend: {
                    x: 'right',
                    data: lengend
                },
                tooltip: {
                    trigger: 'axis'
                },
                grid: {
                    x:50,
                    x2: 50,
                    borderWidth:0
                },                    
                xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: xArr,
                            splitLine: { show: false },
                            axisTick: {
                                show: false
                            },
                            axisLine: {
                                show: false                                   
                            },
                            axisLabel: {
                                textStyle: {
                                    fontFamily: '微软雅黑',
                                    fontWeight: 'normal'
                                }
                            },                                
                            boundaryGap: true,
                            splitNumber: 10
                        }
                ],
                yAxis: [
                        {
                            type: 'value',
                            splitArea: { show: false },                                
                            max: 10,
                            min:minY,
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#C8C8CA'
                                }
                            },
                            axisLabel: {
                                textStyle: {
                                    fontFamily: '微软雅黑',
                                    fontWeight: 'normal'
                                }
                            }
                        }
                ],
                series: boxArr
            };
            myChart.setOption(option);
        }
        );
    }
    //实时上座率
    , HourBookingRate: function (elmId, chartTitle, nameArr, seriesArr) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));                
                _ZR.addShape(new imgShape({
                    style: {
                        x: 120,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 170,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();

                var option = {
                    title: {
                        text: chartTitle,
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: '{b}<br/>{a1}：{c1}%<br/>{a}：{c}人'
                    },
                    color: [colorArr[0], colorArr[3]],
                    legend: {
                        data: ['上座率', '场均人次'],
                        y: '35px'
                    },                    
                    grid: {
                        x: 150,
                        x2: 50
                    },
                    xAxis: [
                            {
                                type: 'value',
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    }
                                }
                            }],
                    yAxis: [
                                {
                                    type: 'category',
                                    data: nameArr,
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        }
                                    },
                                    splitLine: {
                                        show: false
                                    },
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    }

                                }],
                    series: seriesArr
                };
                myChart.setOption(option);
                setTimeout(function () {
                    var i = myChart.getImage('png');
                    var u = myChart.getDataURL('png');
                    if (!u) return;
                    $('#divFenx').append(i);
                    $.ajax({
                        url: '/boxOffice/getImg',
                        type: 'post',
                        data: { imgStr: u, imgName: 'hour_sz'},
                        success: function (data) {
                            console.log(data);
                        }
                    });
                }, 2000);                          
            });
    }
    //影片详细 实时票房
    ,mDatass: function (elmId, chartTitle, xDataArr, seriesArr) {
        require.config({
            paths: {
                'echarts': '../Content/echarts-2.0.0/build/echarts',
                'echarts/chart/pie': '../Content/echarts-2.0.0/build/echarts'
            }
        });
        require(
            [
                'echarts',
                'echarts/chart/pie'
            ],
            function (ec) {
                var myChart = ec.init(document.getElementById(elmId));
                var _ZR = myChart.getZrender();
                var TextShape = require('zrender/shape/Text');
                var imgShape = require('zrender/shape/Image');
                _ZR.addShape(new TextShape({
                    style: {
                        x: 70,
                        y: _ZR.getHeight() - 15,
                        color: '#666',
                        text: '数据来源：EBOT艺恩票房智库',
                        textFont: 'normal 12px 微软雅黑',
                        textAlign: 'left'
                    },
                    hoverable: false
                }));
                _ZR.addShape(new imgShape({
                    style: {
                        x: 70,
                        y: _ZR.getHeight() - 30,
                        width: _ZR.getWidth() - 120,
                        color: '#666',
                        text: '',
                        textAlign: 'left',
                        image: '../../Content/images/imgline.png'
                    }
                }));
                _ZR.refresh();

                var option = {
                    title: {
                        text: chartTitle,
                        subtext: '',
                        x: 'center',
                        textStyle: {
                            fontFamily: '微软雅黑',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: '{b}点<br/>{a}：{c}万<br/>{a1}：{c1}%'
                    },
                    color: [colorArr[0], colorArr[3]],
                    legend: {
                        data: ['票房', '上座率'],
                        y: '298'
                    },
                    grid: {
                        x: 70,
                        x2: 50,
                        y2: 100                        
                    },
                    xAxis: [
                            {
                                type: 'category',
                                axisLine: {
                                    show: false,
                                    lineStyle: {
                                        color: '#C8C8CA'
                                    }
                                },
                                axisTick: {
                                    show: false
                                },
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    textStyle: {
                                        fontFamily: '微软雅黑',
                                        fontWeight: 'normal'
                                    },
                                    formatter: '{value}点'
                                },
                                data: xDataArr
                            }],
                    yAxis: [
                                {
                                    type: 'value',
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        },
                                        formatter: '{value}万'
                                    },                                    
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    }
                                }, {
                                    type: 'value',
                                    axisLabel: {
                                        textStyle: {
                                            fontFamily: '微软雅黑',
                                            fontWeight: 'normal'
                                        },
                                        formatter: '{value}%'
                                    },                                    
                                    interval: 'auto',
                                    axisLine: {
                                        show: false,
                                        lineStyle: {
                                            color: '#C8C8CA'
                                        }
                                    },
                                    axisTick: {
                                        show: false
                                    }
                                }],
                    series: seriesArr
                };
                myChart.setOption(option);
            });
    }
};

function setBodyTip() {
    var wapTitle = 'CBO中国票房站';
    var pageTip = '<div id="divPageTip" style="text-align:center;background-color:#FFF3C1;height:25px; line-height:25px;font-size:12px;">由于系统升级，票房数据12月25日22:00至次日7:00暂停更新<span id="spanclosetip" class="closeNotice ThemeColor3" style="cursor:pointer;margin-left:10px;color:#007CDB;font-size:15px;" widthurl="1" noticeid="UVQLAAXUCG" title="关闭">×</span><div>';
    $('body').prepend(pageTip);
    $('#spanclosetip').on('click', function () {
        $('#divPageTip').hide();
    });
}
$(function () {
    //setBodyTip();
});
