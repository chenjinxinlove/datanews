// 处理数据

d3.json("./data/areaData.json", function (err, root) {
    var cityList = root.cityList;
    var coreData = root.coreData;
    var windowSize = {};
    var cityTierArray  = coreData;
    var vLine;
    var yLine;
    var timeYear;
    var circleRipple;
    var matrixPage = {
        currentCityName : "北京",
        mouse : {},
        cityTier:3,
        priceMax : 5,
        cellWidth : 2,//时间的长度，计算出单个的宽度
        cellHeight : 9,//城市的长度，计算出单个的长度
    
        init : function(){
            $("#matrixPage-canvasDiv .matrixDiv").css({
                "width" : matrixPage.cellWidth*dateList,
                "height" : matrixPage.cellHeight*cityList.length,
            });
            $("#matrixPage-canvasDiv .timeline").css("width", matrixPage.cellWidth*dateList);
            $("#matrixPage-canvasDiv .titleDiv").css("height", matrixPage.cellHeight*cityList.length);
            $("#matrixPage #matrix-CanvasDiv").css("width", $("#matrixPage-canvasDiv .matrixDiv").innerWidth() + $("#matrixPage-canvasDiv .titleDiv").innerWidth());
        },
    
        matrix : {
            init : function(){
                var matrixDiv = d3.select("#matrixPage-canvasDiv").select(".matrixDiv");
                // 画一条提示的线
                var rects = matrixDiv.append("section")
                    .attr("width", $("#matrixPage-canvasDiv .matrixDiv").innerWidth())
                    .attr("height", $("#matrixPage-canvasDiv .matrixDiv").innerHeight())
                    .attr( "cellspacing", 0)
                    .attr("class","matrix");
                for(var i in cityTierArray){
                    var rectsLine = rects.append("div").attr('class', 'area-tr js-area' + cityTierArray[i]['qy']);
    
                    for(var j = 0 ;j < dateList; j++){
                        var currentRect = {
                            "name": cityTierArray[i].city ,
                            "value":cityTierArray[i].value[j],
                            "x":j,
                            "y":i
                        };
                        rectsLine.append("div")
                            .attr("class", 'block-year')
                            // .append("span")
                            .attr("id", j + "-" + i)//x-y
                            .attr("alt", j + "+" + i + "+" + currentRect.name + currentRect.value)
                            // .css("width", '2px')
                            // .attr("height", function(){
                            //     // if(currentRect.name == matrixPage.currentCityName){
                            //     //     $(this).css("height", matrixPage.cellHeight*3);
                            //     // }
                            //     // else
                            //         $(this).css("height", matrixPage.cellHeight);
                            //     return matrixPage.matrix.cellHeight;
                            // })
                            .style("background", colorPool[currentRect.value])
                            .on("mouseover",function() {
                                //鼠标引入事件
                                var yearValue = + $(this).attr('alt').split('+')[0];
                                var vlx = yearValue * 2;
                                var yly = $(this).attr('alt').split('+')[1] * 9;
                                // debugger;
                                vLine.style("display", null);
                                vLine.style('left', vlx + 84 + 'px');
                                var yearValueTotal = yearValue;
                                if(yearValue !== 0) {
                                    yearValueTotal = yearValue;
                                }
                                timeYear.style('left', vlx + 84 + 'px').text((1470 + yearValueTotal) + '年');
                                yLine.style("display", null);
                                yLine.style('top', yly + 'px');
                                circleRipple.style("display", null);
                                circleRipple.style({'top': yly - 3 + 'px', 'left': vlx + 82 + 'px'});

                                console.log($(this).attr("alt"))
                            })
                            .on("mouseout", function(){
                                $(this).css("background-image","none");
                            });
                    }
                }
                vLine = matrixDiv.append("div")
                    .attr('width', '1px')
                    .attr('height', $("#matrixPage-canvasDiv .matrixDiv").innerHeight() + 'px')
                    .attr('class', 'focusLine')
                    .style('display', 'none');
                timeYear =  matrixDiv.append("div")
                    .attr('class', 'timeYear');
                yLine = matrixDiv.append("div")
                    .attr('width', '1094px')
                    .attr('height', '1px')
                    .attr('class', 'xfocusLine')
                    .style('display', 'none')
                circleRipple = matrixDiv.append("div")
                    .attr("class", 'circle-ripple')
                    // .append("div")
                    // .attr('class', 'yearShow')
            }
        },//matrix end
    
        sideTitle : {
    
            init : function(){
                var titleDiv = d3.select("#matrixPage-canvasDiv").select(".titleDiv");
    
                var text = titleDiv.selectAll(".cityName")
                    .data(cityTierArray)
                    .enter().append("div")
                    .attr("class", function(d,i){
                        if(i%2 == 0)
                            return "cityNameUp cityName";
                        else
                            return "cityNameDown cityName";
                    })
                    .attr("id", function(d) {return d.city; })
                    .attr("height", function(){
                        $(this).css("height", matrixPage.cellHeight*2);
                        return matrixPage.cellHeight*2;
                    })
                    .style("line-height", 13 + "px")
                    .text(function(d) { return d.city; });
            }
        },//matrix end
    
        timeline : {
            drawX: function () {
                var timeLineDom = $('.timeline');
               timeLineDom.css('border-top', "solid 1px #5f6a72");
               function renderDom(dynasty, year ) {
                   return '<section class="scale" style="left: ' + calculateDistance(year) + 'px">' +
                                '<div class="scale-line"></div>'+
                                '<div class="scale-content">' +
                                    '<p class="dynasty">'+ dynasty +'</p>'+
                                    '<p class="year">'+ year +'年</p>'+
                                '</div>'+
                            '</section>'
               }
               function calculateDistance(year) {
                   var totalWidth = $("#matrixPage-canvasDiv .timeline").innerWidth();
                   return (totalWidth / dateList) * (year - 1470)
               }
               var scaleArr = [{'dynasty':'明', 'year': '1470'}, {'dynasty':'清', 'year': '1644'}, {'dynasty':'民国', 'year': '1912'}, {'dynasty':'新中国', 'year': '1949'}];
               for (var i = 0; i < scaleArr.length; i++) {
                   timeLineDom.append(renderDom(scaleArr[i].dynasty, scaleArr[i].year))
               }
            }
        },
    
        initLoading : function(){
            $("#matrixPage .timeline").css("marginRight", 50);
            $("#matrixPage svg").remove();
            matrixPage.init();
            matrixPage.matrix.init();
            matrixPage.sideTitle.init();
            // 处理x轴
            matrixPage.timeline.drawX()
        }
    }
    


    //操作区域展示
    $(function($) {
        //加载面积图
        matrixPage.initLoading();
        var OperateDrawArea  = function () {
            this.activeArea = [];
            this.init();
        };
    
        OperateDrawArea.prototype.init = function () {
            var self = this;
            $('.js-aside-area li').on('click', function(e) {
                var index = $(this).index();
                self.switchShow(index);
                self.switchArea(index);
            })
        };
    
        OperateDrawArea.prototype.switchShow = function (index) {
            if ($('.js-aside-area li').eq(index).hasClass('active')) {
                $('.js-aside-area li').eq(index).removeClass('active')
            } else {
                $('.js-aside-area li').eq(index).addClass('active');
            }
        };
        
        OperateDrawArea.prototype.switchArea = function (index) {
            var self = this;
            var select = '.js-area' + (index + 1);
            //如果都没有
            if (!$('.area-tr').hasClass('opacity3')) {
                //开始就没有
                if (self.activeArea.length > 0) {
                    $(select).addClass('opacity3');
                    self.activeArea.pop();
                } else {
                    for(var i = 1 ; i < 7; i++ ) {
                        if (i !== index + 1 ) {
                            var selecti = '.js-area' + i;
                            $(selecti).addClass('opacity3');
                        } else {
                            self.activeArea.push(index + 1);
                        }
                    }
                }
                //全点了没有
            } else {
                //如果只有一个
                if (!$(select).hasClass('opacity3') && self.activeArea.length > 1) {
                    $(select).addClass('opacity3');
                    self.activeArea.pop();
                } else if (!$(select).hasClass('opacity3') && self.activeArea.length === 1) {
                    $('.area-tr').removeClass('opacity3');
                    self.activeArea = [];
                }else {
                    $(select).removeClass('opacity3');
                    self.activeArea.push('1');
                }
            }
        };
        operate = new OperateDrawArea();
    });
});

