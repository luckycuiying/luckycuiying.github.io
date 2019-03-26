// 通过 jQuery 选择器或者筛选的方法获取到的jQuery集合是不存在Bom 的映射机制的，之前获取到的集合，之后再页面中
// html结构改变了，集合中的内容是不会跟着自动发生变化的（js 原生获取到的集合有DOM映射的机制） 
~function(jQuery){
    function myBanner(ajaxURL,interval){
        // 获取相关DOM
        var $banner = $(this);
            $inner = $banner.children('.inner'),
            $bannerTips = $banner.children('.bannerTips'),
            $bannerLeft = $banner.children('.banner-left'),
            $bannerRight = $banner.children('.banner-right');
        var $innerList = null, $innerImgs = null,$oLis = null;   
        // ajax获取数据
        var jsonData =null;
         $.ajax({
             url: ajaxURL+'?_='+Math.random(),
             type: 'get',
             dataType: 'json',
             async:false
         })
         .done(function(data) {
            jsonData = data;
         });
         // 数据绑定
        function bindData(){
            var str ="",str2="";
            if(jsonData){
                $.each(jsonData, function(index, item) {
                     str+='<li><img src alt trueimg="+item["img"] +"></li>';
                     index === 0 ? str2+='<li class="bg"></li>' :str2+='<li></li>';
                });
                $inner.html(str);
                $bannerTips.html(str2);
                $innerList= $inner.children('li');
                $innerImgs = $inner.find("img");
                $oLis = $bannerTips.find('li');
            }
        };
        bindData();
        // 图片懒加载
        window.setTimeout(lazyImg,500);
        function lazyImg (){
            $innerImgs.each(function(index, item) {
                var self = $(this);
                var oImg = new Image;
                oImg.src = self.attr("trueImg");
                oImg.onload = function(){
                    self.prop("src",this.src).css("display","block");

                }
            });
            $innerList.eq(0).css("zIndex",1).animate({opacity: 1}, 500);
        };
        // 自动轮播
        var interval = interval || 2000,step =0,autoTimer=null;
        autoTimer = window.setInterval(autoMove,interval);
        function autoMove(){
            if(step===(jsonData.length-1)){
                step =0;
            }else{
                step++;
            }
            setBanner();
        };


        // 设置轮播图切换方法
        function setBanner(){
            var $curLi = $innerList.eq(step);
            $curLi.css("zIndex",1).siblings().css("zIndex",0);
            $curLi.animate({opacity: 1}, 500,function(){
                $(this).siblings().css("opacity",0);
            });
            var curEle = $oLis.eq(step);
            curEle.addClass('bg').siblings().removeClass('bg');
        };
        // 设置鼠标放上和离开的效果
        $banner.on("mouseover",function(){
            window.clearInterval(autoTimer);
            $bannerLeft.css("display","block");
            $bannerRight.css("display","block");
        }).on("mouseout",function(){
            window.clearInterval(autoTimer);
            autoTimer = window.setInterval(autoMove,interval);
            $bannerLeft.css("display","none");
            $bannerRight.css("display","none");
        });
        // 鼠标放在焦点上的悬停和离开后自动轮播

        $oLis.on("mouseover",function(){
            step = $(this).index();
            setBanner();

        });
        // 左右按钮
        $bannerRight.on("click",autoMove)
        $bannerLeft.on("click",function(){
            if(step===0){
                step = jsonData.length;
            };
            step --;
            setBanner();
        });
    };
    jQuery.fn.extend({
        banner:myBanner
    })
}(jQuery)