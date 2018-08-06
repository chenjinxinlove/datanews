
var scrollCount=0;
var sourcePic = ["map-bg.png","top.jpg", "top1.jpg", "top2.jpg","bg.jpg"];
var loadSourcPicCount = 0;
var audioPlay=1;

$(document).ready(function(){
    $('body,html').animate({
        scrollTop: 0
    },function(){scrollCount=0})
    /*var isAndroid=navigator.userAgent.match(/android/ig),isIos=navigator.userAgent.match(/iphone|ipad/ig),isWinPhone = navigator.userAgent.match(/Windows Phone/ig);
    if(isAndroid || isWinPhone)
    {

        // location = "http://datanews.caixin.com/mobile/flood/index_n.html";
    }
    else
    {*/
        loadNBSourcePic();
    // }
});

var img = new Image();
        img.src ='http://zky.koocdn.com/club/picture/2cd449e0747e47afbf7216403bb104e1.png';
        img.src ='https://zky.koocdn.com/club/picture/4c22847152984be18d3eb88ccdd5e27a.png';
        img.src = 'https://zky.koocdn.com/club/picture/5224c3ebc9604b7ebbb5d6be035b56d7.png';
        img.src='https://zky.koocdn.com/club/picture/f6ef3962ef4a41caa69214217f5f973c.png';
        img.src='https://zky.koocdn.com/club/picture/1029ee7d82634835a0b09267dcb14940.png'
// 加载图片的函数
// 加载图片的函数
function loadNBSourcePic() {
    var sLen = sourcePic.length;
    var i;

    for (i = 0; i < sLen; i++) {
        var url = "./images/" + sourcePic[i];
        var img = new Image();
        img.src = url;
        img.onload = function () {
            loadSourcPicCount++;
            if ($(window).width() < 768) {
                $("#loadingPercent").html(parseInt(loadSourcPicCount * 100 / sLen) + "%<br>建议在Wi-Fi环境浏览");
            } else
                $("#loadingPercent").html("<p>" + parseInt(loadSourcPicCount * 100 / sLen)+"%</p><p>支持浏览器：Google Chrome、Safari、Firefox</p>");

            if (loadSourcPicCount == sLen) {
                setTimeout(function () {
                    $(".loading").fadeOut(500, initMainPage);

                }, 500);
            }
            $('.top').css({
                'animation': 'slider 10s linear 0s 1'
            })
        }
    }
}

function initMainPage()
{
    setTimeout(function () {
        $('.center').addClass('scale-ani')
    }, 10)
}

$(".ending").css("margin-top",($(window).height()-100)/2+"px");

    $('#sroll-tip-image').attr('src','images/scroll-tip-pc.png');
    $(".part-7,.part-0, .part-1, .part-9, .ending-bg").css("height",$(window).height()+"px")

//轮播翻页
var n=[0,0,0,0,0,0,0,0,0];
var left=(($(window).width()-640)/2).toString()+"px";
var photoHeight='530px';
var subHeight='400px';
$(".photo-album").append("<div class='photo-next'></div><div class='photo-prev'></div>");
photoSwipeWeb(1);
    

$('.photo-album').css('height',photoHeight)
$('.sub-head-points').css('top',subHeight)

function photoSwipeWeb(id){
        
        $(".photo-album"+id).find('.photo-next').click(function(){
            var total = $(".photo-album"+id+" li").length/2;
            
         
            $(".photo-album"+id+" li").eq(n[id]).find('.photo-album-frame').fadeOut(500);
             if(n[id]<total-1) n[id]++;
            else n[id]=0;
            
            
             $(".photo-album"+id+" li").eq(n[id]).find('.photo-album-frame').fadeIn(500);

             $(this).parent().find('.sub-head-points li').removeClass('now');
             $(this).parent().find('.sub-head-points li').eq(n[id]).addClass('now');
             
          });

          $(".photo-album"+id).find('.photo-prev').click(function(){
              var total = $(".photo-album"+id+" li").length/2;

              $(".photo-album"+id+" li").eq(n[id]).find('.photo-album-frame').fadeOut(500);
             if(n[id]>0) n[id]--;
            else n[id]=total-1;

          
             $(".photo-album"+id+" li").eq(n[id]).find('.photo-album-frame').fadeIn(500);

             $(this).parent().find('.sub-head-points li').removeClass('now');
             $(this).parent().find('.sub-head-points li').eq(n[id]).addClass('now');
          });

}

function coverStart(){
    if($(window).width()<768){
        $(".play-btn").fadeIn(1000);
        setTimeout(function(){$(".play-btn").fadeOut(1000)},5000);
    }

    if($(window).width()>=768){
        $(".cover-headline").bind("click",function(){

            //$("#cover-audio").trigger("pause");
            coverShow=0;

            $('body,html').animate({
                scrollTop: 0
            },function(){scrollCount=0})

            $(".part-0").css("height",$(window).height()+"px").fadeOut(1000);
            coverShow=0;
            //$(".cover-video").trigger("pause")
            $(".flood-video").trigger("play");
            $(".flood-video-control-bar").animate({width:"100%"},60000,"linear")


            $(".flood-video").bind("ended",function(){
                $(".flood-video-poster").fadeIn();
                $(".part-0").css("position","absolute").fadeIn();
                $(".flood-video-control-bar").css("width","0");
                $(".cover-video").trigger("play")
                $(".flood-replay").fadeIn().bind("click",function(){
                    $(this).fadeOut();
                    $(".part-0").fadeOut();
                    $(".flood-video").trigger("play");
                    $(".flood-video-control-bar").animate({width:"100%"},60000,"linear")
                })
            })
        })
    }

    setTimeout(function(){
        if($(window).width() < 768) $(".cover-headline").fadeIn(3000);
        else $(".cover-headline").animate({opacity:1},3000);
    },$(window).width() >= 768?5000:9000)

    if($(window).width() >= 768){
        setTimeout(function(){
            $(".cover-headline").css("opacity",1);
        },8000);
    }

    // 提示动画
    var scrollTime = null,
        bottomVal = "60px";
    if($(window).width() < 768){
        bottomVal = "40px"
    }
    setTimeout(function(){
        scrollTime = setInterval(scrollTip,2000)
        function scrollTip(){
            $(".scroll-tip").animate({
                bottom: bottomVal,
                opacity: 1
            },{
                duration:1200,easing:'easeOutCubic',complete:function(){
                    $(".scroll-tip").css({
                        bottom: "20px",
                        opacity: 0
                    })
                }
            });
        }
    },8000)

    $(window).scroll(function(){
        hideScrollTip()
    })

    //首页
    var map_freeze=0;
    var map_count=0;

    var disaster_freeze=0;
    var disaster_count=0;
    var disaster_id=0;

    var dilishu_freeze=0;
    var dilishu_count=0;
    var dilishuPlay=0;
    //var dilishu_id=0;
    var chart98Play=0;

    var chart1Play=0;
    var chart2Play=0;
    var coverShow=1;
    function hideScrollTip(){
        if($(window).scrollTop() > 0){
            clearInterval(scrollTime)
            $(".scroll-tip").remove()
        }
    }
}

var chart98_id=0;
function chart98Ani(id){
    if(id<2){
        $(".chart98 ul").eq(1).find("li").eq(id).fadeOut(1000);
        $(".chart98 ul").eq(1).find("li").eq(id+1).fadeIn(1000);
        $(".chart98 ul").eq(0).find("li").removeClass("now");
        $(".chart98 ul").eq(0).find("li").eq(id+1).addClass("now");
        chart98_id++;

    }
    else if(id==2){
        $(".chart98 ul").eq(1).find("li").eq(id).fadeOut(1000);
        $(".chart98 ul").eq(1).find("li").eq(0).fadeIn(1000);
        $(".chart98 ul").eq(0).find("li").removeClass("now");
        $(".chart98 ul").eq(0).find("li").eq(0).addClass("now");
        chart98_id=0;
    }

}
setInterval(function(){chart98Ani(chart98_id);},2500);

var dilishu_id=0;
function dilishuAni(id){
    if(id<2){
        $(".dilishu ul").eq(1).find("li").eq(id).fadeOut(1000);
        $(".dilishu ul").eq(1).find("li").eq(id+1).fadeIn(1000);
        $(".dilishu ul").eq(0).find("li").removeClass("now");
        $(".dilishu ul").eq(0).find("li").eq(id+1).addClass("now");
        dilishu_id++;
    }
    else if(id==2){
        $(".dilishu ul").eq(1).find("li").eq(id).fadeOut(1000);
        $(".dilishu ul").eq(1).find("li").eq(0).fadeIn(1000);
        $(".dilishu ul").eq(0).find("li").removeClass("now");
        $(".dilishu ul").eq(0).find("li").eq(0).addClass("now");
        dilishu_id=0;
    }

}
setInterval(function(){dilishuAni(dilishu_id);},1000);
// part 2
$(".lead-box").height($(window).height() - 60 + "px")
$(".sub-title-box").height($(window).height() - 22 + "px")

//	打开导航菜单
var menuIndex = 0;
$(".menu-bt").mouseover(function(event){
    if(menuIndex == 0){
        $(".menu-box").animate({
            right: 0
        },220,function(){
            menuIndex = 1;
        });
        // 手机显示关闭按钮
        if($(window).width() < 768){
            $(".menu-icon").hide();
            $(".close-icon").show();
        }
    }
})

// 手机关闭按钮
if($(window).width() < 768){
    $(".close-icon").click(function(){
        closeMenu()
    })
}

$(".menu-box").mouseover(function(event){
    event.stopPropagation();
})

//	关闭导航菜单
$(document).mouseover(function(event) {
    closeMenu()
});
function closeMenu(){
    if(menuIndex == 1){
        $(".menu-box").animate({
            right: "-221px"
        },200,function(){
            menuIndex = 0;
        });
        $(".menu-subnav").slideUp(function(){
            for(var i = 0; i < $(".menu-nav li").length; i++){
                subMenuIndex[i] = 0;
            }
        });
        $(".close-icon").hide();
        $(".menu-icon").show();
    }
}

//	打开和关闭导航子菜单
var subMenuIndex = [];
for(var i = 0; i < $(".menu-nav li").length; i++){
    subMenuIndex[i] = 0;
}
$(".menu-nav li").mouseover(function(event) {
    var index = $(this).index()
    for(var i = 0; i < $(".menu-nav li").length; i++){
        if(i != index){
            $(".menu-nav li").eq(i).find(".menu-subnav").slideUp(function(){
                subMenuIndex[i] = 0;
            });
        }
    }
    if(subMenuIndex[index] == 0){
        $(this).find(".menu-subnav").slideDown(function(){
            subMenuIndex[index] = 1;
        });
    }
    return false
})

// 滚动到相应位置，cls为目标的class，isClose为手机端是否关闭导航的参数，值为true（关闭）和false（不关闭）,n为封面id
function jumpTo(cls){
    console.log(cls)
    var val = $("." + cls).offset().top
    $('body,html').animate({
        scrollTop: val
    })
    if($("body").width() >= 768){
        closeMenu()
    } else {
        if(isClose){
            closeMenu()
        }
    }
    $(".bg li").removeClass("display")
    $(".bg li").eq(n).addClass('display')
}

// 初始化图片显示为全屏
function fullScrPhoto(cls){
    if($(window).height() > $(window).width() * 2 / 3){
        $("." + cls).height($(window).height());
        $("." + cls).width("auto");
    } else {
        $("." + cls).width($(window).width());
        $("." + cls).height("auto");
    }
}


