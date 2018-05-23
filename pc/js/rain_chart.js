//旱涝显示
var incidentArr = [{'dynasty': '1628年-1644年 明末爆发李自成、张献忠等农民起义', 'year': '1630'},
    {'dynasty': '1877-1878 年发生“丁戊奇荒”特大旱灾灾荒', 'year': '1877'},
    {'dynasty': '1899-1901年 清末爆发义和团农民起义', 'year': '1900'},
    {'dynasty': '1998年 长江流域、松花江、嫩江流域发生特大洪水', 'year': '1998'}]
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
                    if(start_time > 158 && start_time < 162 ) {
                        $('.info-incident').eq(0).show()
                    }else {
                        setTimeout(function() {
                            $('.info-incident').eq(0).hide()
                        }, 10000)
                        
                    }

                    if(start_time > 406 && start_time < 408 ) {
                        $('.info-incident').eq(1).show()
                    }else {
                        setTimeout(function() {
                            $('.info-incident').eq(1).hide()
                        }, 10000)
                        
                    }

                    if(start_time > 429 && start_time < 432 ) {
                        $('.info-incident').eq(2).show()
                    }else {
                        setTimeout(function() {
                            $('.info-incident').eq(2).hide()
                        }, 10000)
                        
                    }

                    if(start_time > 527 && start_time < 529 ) {
                        $('.info-incident').eq(3).show()
                    }else {
                        setTimeout(function() {
                            $('.info-incident').eq(3).hide()
                        }, 10000)
                        
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
                return 10;
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

  