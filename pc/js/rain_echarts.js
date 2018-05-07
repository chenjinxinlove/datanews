$(function () {
    var DISASTERUPCANVAS = 'disaster-up-canvas';
    var DISAXTERDOWMCANVAS = 'disaster-down-canvas';
    var getYear = function (start, end) {
        var res = [];
        for (var i = start; i < end + 1; i++) {
            res.push(i + '年')
        }
        return res;
    };
    var RainEcharts = function () {
        this.baseOption = {
            tooltip: {
                trigger: 'axis'
            },
            grid: [{
                bottom: '10%'
            }]
        }
        this.data = {
            //洪涝数据
            "flood": {
                //受灾面积/千公顷
                "area": {
                    "name": '受灾面积/千公顷',
                    "year": getYear(1950, 2016),
                    "values": [6559.00, 4173.00, 2794.00, 7187.00, 16131.00, 5247.00, 14377.00, 8083.00, 4279.00, 4813.00, 10155.00, 8910.00, 9810.00, 14071.00, 14933.00, 5587.00, 2508.00, 2599.00, 2670.00, 5443.00, 3129.00, 3989.00, 4083.00, 6235.00, 6431.00, 6817.00, 4197.00, 9095.00, 2820.00, 6775.00, 9146.00, 8625.00, 8361.00, 12162.00, 10632.00, 14197.00, 9155.00, 8686.00, 11949.00, 11328.00, 11804.00, 24596.00, 9423.30, 16387.30, 18858.90, 14366.70, 20388.10, 13134.80, 22291.80, 9605.20, 9045.10, 7137.78, 12384.21, 20365.70, 7781.90, 14967.48, 10521.86, 12548.92, 8867.82, 8748.16, 17866.69, 7191.50, 11218.09, 11777.53, 5919.43, 6132.08, 9443.26,]
                },
                //因灾死亡人口/人
                "population": {
                    "name": '因灾死亡人口/人',
                    "year": getYear(1950, 2016),
                    "values": [1982, 7819, 4162, 3308, 42447, 2718, 10676, 4155, 3642, 4540, 6033, 5074, 4350, 10441, 4288, 1906, 1901, 1095, 159, 4667, 2444, 2323, 1910, 3413, 1849, 29653, 1817, 3163, 1769, 3446, 3705, 5832, 5323, 7238, 3941, 3578, 2761, 3749, 4094, 3270, 3589, 5113, 3012, 3499, 5340, 3852, 5840, 2799, 4150, 1896, 1942, 1605, 1819, 1551, 1282, 1660, 2276, 1230, 633, 538, 3222, 519, 673, 775, 486, 319, 686,
                    ]
                },
                //直接经济损失/亿元
                "economics": {
                    "name": "直接经济损失/亿元",
                    "year": getYear(1991, 2016),
                    "values": [239.00, 779.08, 412.77, 641.74, 1796.60, 1653.30, 2208.36, 930.11, 2550.90, 930.23, 711.63, 623.03, 838.00, 1300.51, 713.51, 1662.20, 1332.62, 1123.30, 955.44, 845.96, 3745.43, 1301.27, 2675.32, 3155.74, 1573.55, 1660.75, 3643.26,]
                }
            },
            //干旱数据
            "dry": {
                //受灾面积/千公顷
                "area": {
                    "name": '受灾面积/千公顷',
                    "year": getYear(1950, 2016),
                    "values": [2398.00, 7829.00, 4236.00, 8616.00, 2988.00, 13433.00, 3127.00, 17205.00, 22361.00, 33807.00, 38125.00, 37847.00, 20808.00, 16865.00, 4219.00, 13631.00, 20015.00, 6764.00, 13294.00, 7624.00, 5723.00, 25049.00, 30699.00, 27202.00, 25553.00, 24832.00, 27492.00, 29852.00, 40169.00, 24646.00, 26111.00, 25693.00, 20697.00, 16089.00, 15819.00, 22989.00, 31042.00, 24920.00, 32904.00, 29358.00, 18174.00, 24914.00, 32980.00, 21098.00, 30282.00, 23455.33, 20150.67, 33514.00, 14237.33, 30153.33, 40540.67, 38480.00, 22207.33, 24852.00, 17255.33, 16028.00, 20738.00, 29386.00, 12136.80, 29258.80, 13258.61, 16304.20, 9333.33, 11219.93, 12271.70, 10067.05, 9872.76]
                },
                //粮食损失/亿公斤
                "cereals": {
                    "name": "粮食损失/亿公斤",
                    "year": getYear(1950, 2016),
                    "values": [19.00, 36.88, 20.21, 54.47, 23.44, 30.75, 28.60, 62.22, 51.28, 108.05, 112.79, 132.29, 89.43, 96.67, 43.78, 64.65, 112.15, 31.83, 93.92, 47.25, 41.50, 58.12, 136.73, 6.84, 43.23, 42.33, 85.75, 117.34, 200.46, 138.59, 145.39, 185.45, 198.45, 102.71, 106.61, 124.04, 254.34, 209.55, 311.69, 283.62, 128.17, 118.00, 209.72, 111.80, 233.60, 230.00, 98.00, 476.00, 127.00, 333.00, 599.60, 548.00, 313.00, 308.00, 231.00, 193.00, 416.50, 373.60, 160.55, 348.49, 168.48, 232.07, 116.12, 206.36, 200.65, 144.41, 190.64]
                },
                //直接经济损失/亿元
                "economics": {
                    "name": "直接经济损失/亿元",
                    "year": getYear(1991, 2016),
                    "values": [4359.00, 7294.00, 3501.00, 5026.00, 1800.00, 1227.00, 1680.00, 1050.00, 1920.00, 2770.00, 3300.00, 1918.00, 2441.00, 2340.00, 2313.00, 3578.23, 2756.00, 1145.70, 1750.60, 3334.52, 2895.45, 1637.08, 2240.54, 1783.42, 836.43, 469.25]
                },
                //饮水困难人口/万人
                "water": {
                    "name": "饮水困难人口/万人",
                    "year": getYear(2006, 2016),
                    "values": [986.00, 1093.70, 545.70, 1206.59, 1509.18, 1028.00, 533.00, 1274.51, 909.76, 579.22, 484.15]
                }
            }
        }
    };
    RainEcharts.prototype.setWidth = function (dom) {
        var width = Math.min(document.body.clientWidth, 900);
        var height = width * 0.4;
        $('#' + dom).css({'width': width + 'px', 'height': height + 'px'});

    };
    RainEcharts.prototype.render = function (myChart, option) {
        myChart.setOption(option);
    };
    RainEcharts.prototype.getOption = function (type, name) {
        var option = {
            xAxis: [{
                data: this.data[type][name]['year']
            }],
            yAxis: [{
                splitLine: {show: false},
                name: this.data[type][name]['name']
            }],
            series: [{
                type: 'line',
                data: this.data[type][name]['values'],
                lineStyle: {
                    color:type !=='flood' ? '#ca330F' : '#016199'}
            }]
        };
        return $.extend(this.baseOption, option)
    };
    RainEcharts.prototype.init = function (DomName) {
        this.setWidth(DomName);
        this.myChart = echarts.init(document.getElementById(DomName));
        return this;
    };
    RainEcharts.prototype.on = function (type, name) {
        this.render(this.myChart, this.getOption(type, name))
    };
//操作逻辑代码
    var up = new RainEcharts();
    up.init(DISASTERUPCANVAS).on('flood', 'area');
    var floodList = ['area', 'population', 'economics'];
    $('#disaster-up li').on('click', function () {
        var name = floodList[$(this).index()];
        up.on('flood', name);
        $(this).parent().children().removeClass('active').end().end().addClass('active');
    });
    var down = new RainEcharts();
    down.init(DISAXTERDOWMCANVAS).on('dry', 'area');
    var dryList = ['area','cereals', 'economics','water'];
    $('#disaster-down li').on('click', function () {
        var name = dryList[$(this).index()];
        down.on('dry', name);
        $(this).parent().children().removeClass('active').end().end().addClass('active');
    });
});