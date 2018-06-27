//旱涝显示
var incidentArr = [
    {
        'dynasty': '16世纪中期，明朝时期玉米引入中国',
        'year': '1550'
    },
    {
        'dynasty': '康熙中期，因土地复垦和气候趋于冷干，长江江水由清变浊，延续至今',
        'year': '1690'
    },
    {
        'dynasty': '19世纪，黄河下游连年遭水旱灾害，山东、河北、山西成千上万灾民"闯关东"，并一直持续至民国时期',
        'year': '1820'
    },
    {
        'dynasty': '太平天国运动爆发',
        'year': '1851'
    },
    {
        'dynasty': '光绪年间发生百年不遇大旱灾"丁戊奇荒"，导致2000多万人死亡',
        'year': '1887'
    },
    
    {'dynasty': '1899-1901年 清末爆发义和团农民起义', 'year': '1900'},
    {
        'dynasty': '河南发生大旱灾，夏秋两季大部绝收，河南大旱，千百万民众离乡背井、外出逃荒。',
        'year': '1943'
    },
    {
        'dynasty': '长江流域、松花江流域发生特大洪水，直接经济损失达1660亿元 ',
        'year': '1998'
    }]
var dateList = 548;
var totalWidth = 882;
var showType = {
    'hanActive': true, 'normalActive':true, 'laoActive': true, 'bjhanActive': true, 'bjlaoActive':true
};
var XUNHUAN = true;
var TIMER;
var start_time = 0;
var ZANTING = false;

var hoverShow = false;
var date_count=229;
var date_step=(cssPxToInt($(".map-part1-timeline-line").css("width"))-cssPxToInt($(".map-part1-timeline-pointer").css("width")))/date_count;
// if($(window).width()<768){date_step=$(window).width()*0.95/date_count}
var i=0;
var winHeight=$(window).height();
var winWidth=$(window).width();

var mapHeight=750;
var mapShiftTop=mapHeight+130-winHeight;
if(mapShiftTop<0) mapShiftTop=0;
// $(".map").css("height",winHeight+mapShiftTop-160+"px").css("margin-top","-"+mapShiftTop+"px");

if($(window).width()<=768) {
    $(".map").css("top","100px");}
var thisPin=0;

function cssPxToInt(str){
    var tmp=str.split("px");
    var tmp1=parseFloat(tmp[0]);
    return tmp1;
}

var width =1000,
    height = 800;

var svg = d3.select(".map").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class","svg1")
    .append("g")
    .attr("transform", "translate(0,0)")
    .style("z-index",0);

//建立一个墨卡托投影
var projection = d3.geo.conicConformal()
    .center([104.5, 36.3])
    .scale(1287)  //858
    .rotate([0,56,27])
    .translate([190, 739]);

var path = d3.geo.path()
    .projection(projection);
// 生成地图，地图是透明的，用事件绑定。


// d3.json("data/china.json", function(error, root) {
//   if (error)
//     return console.error(error);
//     //console.log(root.features);
//     svg.selectAll("path")
//     .data( root.features )
//     .enter()
//     .append("path")
//     .attr("stroke","rgba(0,0,0,0)")
//     .attr("stroke-width",0)
//     .attr("fill", function(d,i){
//       return "rgba(0,0,0,0)"
//             //return "url(#pattern)";
//           })
//     .attr("d", path )   //使用地理路径生成器
//
// });
//==颜色取值==//
var index = [0, 1, 2, 3,4,5];
var colorPool = [
    "rgba(255,255,255,0)",
    "#016199",
    "#90dbff",
    "#e2e9ee",
    "#e19f7a",
    "#d32f25"
]

var color = d3.scale.ordinal()
    .domain(index)
    .range(colorPool);
var i=0;

//放大缩小的功能
if($(window).width()>=768) {
    $(".map-zoom").bind("click touchstart",function(){
        $(".map").css('-webkit-transform','scale(1.7)').css("top","-200px").css("left","-100px");
        $(this).hide();
        $(".map-zoom-out").show();
    })
    $(".map-zoom-out").bind("click touchstart",function(){
        $(".map").css('-webkit-transform','scale(1)').css("top","0px").css("left","0px");
        $(this).hide();
        $(".map-zoom").show();
    })
}

function showDot() {
    //读取城市经纬度信息
    d3.json("data/latLon_xs.json", function(error, latLon) {

        if (error)
            return console.error(error);
        svg.selectAll(".dot-a")
            .data(latLon)
            .enter()
            .append("circle")
            .attr("class",function(d,i){
                return "dot-a dot-a-"+d.city;
            })
            .attr("cx", function(d,i){
                var c = projection(d.cp);
                return c[0];
            })
            .attr("cy", function(d,i){
                var c = projection(d.cp);
                return c[1];
            })
            .attr('opacity', 0)
        svg.selectAll(".dot-b")
            .data(latLon)
            .enter()
            .append("circle")
            .attr("class",function(d,i){
                return "dot-b dot-b"+d.city;
            })
            .attr("cx", function(d,i){
                var c = projection(d.cp);
                return c[0];
            })
            .attr("cy", function(d,i){
                var c = projection(d.cp);
                return c[1];
            })
            .attr('opacity', 0)
        svg.selectAll(".dot")
            .data(latLon)
            .enter()
            .append("circle")
            .attr("class",function(d,i){
                return "dot dot-"+d.city;
            })
            .attr("cx", function(d,i){
                var c = projection(d.cp);
                return c[0];
            })
            .attr("cy", function(d,i){
                var c = projection(d.cp);
                return c[1];
            })
            .attr('opacity', 0)


        //读取数值
        d3.json("data/csvToJson.json", function (err, root) {
            // console.log(root.length);
            if (err)
                return console.error(err);

            setTimeout(function () {
                $('.rangeslider__handle').append('<div class="timeShow"></div>');
            }, 500);
            
            function drawScale() {
                var rangeslider__handle = $('.rangeslider--horizontal');
                function renderDom(dynasty, year ) {
                    return '<section class="scale" style="left: ' + calculateDistance(year) + 'px">' +
                        '<div class="scale-line"></div>'+
                        '<div class="scale-content">' +
                        '<p class="year"></p>'+
                        '<p class="dynasty">'+ dynasty +'</p>'+
                        '</div>'+
                        '</section>'
                }
                function calculateDistance(year) {
                    return (totalWidth / dateList) * (year - 1470) + 2
                }

                function renderDomIncident(dynasty, year) {
                    return '<section class="scale-incident" style="left: ' + calculateDistance(year) + 'px">' +
                        '<p class="info-incident" >'+ dynasty +'</p>'
                    '</section>'
                }

                var scaleArr = [{'dynasty':'明朝', 'year': '1470'}, {'dynasty':'清朝', 'year': '1644'}, {'dynasty':'民国', 'year': '1912'}, {'dynasty':'新中国', 'year': '1949'}];
                for (var i = 0; i < scaleArr.length; i++) {
                    rangeslider__handle.append(renderDom(scaleArr[i].dynasty, scaleArr[i].year))
                }

                for (var j = 0; j < incidentArr.length; j++) {
                    // debugger;
                    rangeslider__handle.append(renderDomIncident(incidentArr[j].dynasty, incidentArr[j].year))
                }
                


            }

            
            function xunhan() {
                TIMER = setTimeout(function () {
                    if(!XUNHUAN) {
                        clearTimeout(TIMER);
                        TIMER = null;
                        return;
                    }


                    bf();
                    xunhan();
                }, 500)
            }
            function  bf() {
                if(start_time ===  dateList) {
                    start_time = 0;
                }

                var data = root[start_time];
                // console.log(start_time, start_time + 1470 , data);
                drawDot(data, latLon);
                // console.log(start_time);

                // $('input[type="range"]').val(start_time).change();
                $('.rangeslider__handle').css('left',(totalWidth / dateList) * start_time  + 'px');
                $('.rangeslider__fill').css('width',(totalWidth / dateList) * start_time + 'px');
                $('.timeShow').text(1470 + start_time + '年');
                
                if(!hoverShow) {
                    if(start_time > 80 && start_time < 90 ) {
                        $('.info-incident').eq(0).show()
                    }else {
                        $('.info-incident').eq(0).hide()                       
                    }

                    if (start_time > 210 && start_time < 230) {
                        $('.info-incident').eq(1).show()
                    } else {
                        $('.info-incident').eq(1).hide()
                    }

                    if (start_time > 340 && start_time < 360) {
                        $('.info-incident').eq(2).show()
                    } else {
                        $('.info-incident').eq(2).hide()
                    }

                    if (start_time > 370 && start_time < 390) {
                        $('.info-incident').eq(3).show()
                    } else {
                        $('.info-incident').eq(3).hide()
                    }

                    if (start_time > 415 && start_time < 422) {
                        $('.info-incident').eq(4).show()
                    } else {
                        $('.info-incident').eq(4).hide()
                    }
                    
                    if (start_time > 430 && start_time < 440) {
                        $('.info-incident').eq(5).show()
                    } else {
                        $('.info-incident').eq(5).hide()
                    }

                    if (start_time > 470 && start_time < 480) {
                        $('.info-incident').eq(6).show()
                    } else {
                        $('.info-incident').eq(6).hide()
                    }
                    if (start_time > 525 && start_time < 535) {
                        $('.info-incident').eq(7).show()
                    } else {
                        $('.info-incident').eq(7).hide()
                    }

                }

                

                start_time ++;

            }
            xunhan();

            $('input[type="range"]').rangeslider({
                polyfill: false,
                rangeClass: 'rangeslider',
                disabledClass: 'rangeslider--disabled',
                horizontalClass: 'rangeslider--horizontal',
                verticalClass: 'rangeslider--vertical',
                fillClass: 'rangeslider__fill',
                handleClass: 'rangeslider__handle',
                onInit: function() {},
                onSlide: function(position, value) {
                    // debugger;
                    XUNHUAN = false;
                    clearTimeout(TIMER);
                    console.log(value);
                    $('.map-replay').removeClass('zt').addClass('bf');
                    $('.timeShow').text(1470 + value + '年');
                },
                onSlideEnd: function(position, value) {
                    if(ZANTING) {
                        start_time = value;
                        bf();
                    } else {
                        XUNHUAN = true;
                        ZANTING = false;
                        start_time = value;
                        $('.map-replay').removeClass('bf').addClass('zt');
                        xunhan();
                    }

                }
            });
            setTimeout(function () {
                drawScale();
                setTimeout(function() {
                    $('.scale-incident').on('mouseover', function(e) {
                        hoverShow = true
                        var index = $(this).index()
                        $(this).find('.info-incident').show()
                        var self = this;
                        $(this).on('mouseout', function(){
                            hoverShow = false
                        })
                    })
                }, 200)
            });
            $('.map-replay').on('click', function (e) {
                if($(this).hasClass('zt')) {
                    $(this).removeClass('zt');
                    XUNHUAN = false;
                    ZANTING = true;
                    clearTimeout(TIMER);
                    $(this).addClass('bf');


                } else {
                    $(this).removeClass('bf');
                    XUNHUAN = true;
                    ZANTING = false;
                    xunhan();
                    $(this).addClass('zt')
                }

            })
            function disFloatDiv(){
                $(".floatDiv").fadeOut("slow");
            }
            function basicInit(){
                var fontSize = 10;
                windowSize.width = window.innerWidth;
                windowSize.height = window.innerHeight;
                windowSize.fontSize = Math.round(Math.max.apply(Math, [windowSize.width/100, windowSize.height/100]));
                //fit different p
                $("body").css("font-size", windowSize.fontSize);
                $("html").css("font-size", windowSize.fontSize);
                //Cit
                 cityTierArray = coreData;
            }
            window.basicInit = basicInit;
        })


    });
}
function drawDot(data) {
    svg.selectAll(".dot-a")
        .attr("r",function(d,i){
            var dd = data[i];
            if(dd == 1 || dd == 5) {
                return 9;
            }
            if(dd == 2 || dd == 4) {
                return 7;
            }
            return  7;
        })
        .attr("fill", "rgba(0,0,0,0)")
        .attr("stroke", function(d, i){
            //控制展示
            if (!data) return;
            var d = data[i];
            if(!showType.hanActive) {
                if(d == 5) {
                    return color(0);
                }
            }
            if(!showType.normalActive) {
                if (d == 3) {
                    return color(0);
                }
            }
            if(!showType.laoActive) {
                if (d == 1) {
                    return color(0);
                }
            }
            if(!showType.bjlaoActive) {
                if (d == 2) {
                    return color(0);
                }
            }
            if(!showType.bjhanActive) {
                if (d == 4) {
                    return color(0);
                }
            }
            return color(d);
        })
        .attr("stroke-width", 1)
        .style("opacity",1)
        .transition()
        .duration(500)

    svg.selectAll(".dot")
    .attr("r",function(d,i){
        var dd = data[i];
        if(dd == 1 || dd == 5) {
            return 6;
        }
        if(dd == 2 || dd == 4) {
            return 4;
        }
        return  4;
        })
        .attr("fill", function(d, i){
            //控制展示
            if (!data) return;
            var d = data[i];
            if(!showType.hanActive) {
                if(d == 5) {
                    return color(0);
                }
            }
            if(!showType.normalActive) {
                if (d == 3) {
                    return color(0);
                }
            }
            if(!showType.laoActive) {
                if (d == 1) {
                    return color(0);
                }
            }
            if(!showType.bjlaoActive) {
                if (d == 2) {
                    return color(0);
                }
            }
            if(!showType.bjhanActive) {
                if (d == 4) {
                    return color(0);
                }
            }
            return color(d);
        })
        .style("opacity",1)
}
//自己添加

$('.droughtFlood li').bind('click', function (e) {
    var classArr = [ 'laoActive', 'bjlaoActive', 'normalActive', 'bjhanActive', 'hanActive'];
    var classActive = classArr[$(this).index()];
    if ($(this).hasClass(classActive)) {
        $(this).removeClass(classActive);
        showType[classActive] = false;
    } else {
        $(this).addClass(classActive);
        showType[classActive] = true;
    }
});

  