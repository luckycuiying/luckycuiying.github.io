~function(){
    // 创建一个类
    function AutoBanner(curEleId, ajaxUrl,interval){
        // 获取需要的Dom 元素的变量都作为实例的私有属性
        this.banner = document.getElementById(curEleId);
        this.bannerInner = utils.firstChild(this.banner);
        this.bannerTip = utils.children(this.banner,"ul")[1];
        this.bannerLink = utils.children(this.banner,'a');
        this.bannerLeft = this.bannerLink[0];
        this.bannerRight = this.bannerLink[1];
        this.imgLi = this.bannerInner.getElementsByTagName("li");
        this.imgList = this.bannerInner.getElementsByTagName("img");
        this.tipLis = this.bannerTip.getElementsByTagName("li");
        //全局变量也需要变成私有的属性
        this.jsonData = null;
        this.interval = interval||2300;
        this.autoTimer =null;
        this.step=0;
        this.ajaxUrl = ajaxUrl;
        return this.init();
    }
    //类的原型
    AutoBanner.prototype={
        constructor:AutoBanner,
        //Ajax请求数据
        getData:function(){
            var self = this;
            var xhr = new XMLHttpRequest;
            xhr.open("get",self.ajaxUrl+"?_="+Math.random(),false);
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                    self.jsonData = utils.jsonParse(xhr.responseText);
                }
            };
            xhr.send(null);

        },
        // 实现数据绑定
        bindData:function(){
            var str ="",str2 ="";
            if(this.jsonData){
                for (var i = 0; i < this.jsonData.length; i++) {
                    var curData = this.jsonData[i];
                    str += '<li><img src alt trueimg="'+curData[" img"]+'"></li>';
                    i===0 ? str2 +='<li class="bg"></li>' : str2 += '<li></li>';
                }
            }
            this.bannerInner.innerHTML = str;
            this.bannerTip.innerHTML = str2
        },
        // 图片延迟加载
        lazyImg:function(){
            var self = this;
            for (var i = 0; i < this.imgList.length; i++) {
                ~function(i){
                    var curImg = self.imgList[i];
                    var oImg = new Image;
                    oImg.src = curImg.getAttribute("trueImg");
                    oImg.onload = function(){
                        curImg.src = this.src;
                        curImg.style.display = "block";
                        if(i===0){
                            var curLi = curImg.parentNode;
                            curLi.style.zIndex =1;
                            myAnimate(curLi,{opacity:1},200,function(){

                            })
                        }
                    }  
                }(i)
                

            }
        },
        // 实现自动轮播
        autoMove:function(){
            if(this.step===(this.jsonData.length-1)){
                this.step=0;
            }else{
                this.step++;
            }
            this.setBanner();
        },
        //切换效果和焦点对齐
        setBanner:function(){
            //实现轮播图切换效果
            for (var i = 0; i < this.imgLi.length; i++) {
                var curLi = this.imgLi[i];
                if(i===this.step){
                    utils.css(curLi,"zIndex",1);
                    myAnimate(curLi,{opacity:1},200,function(){
                        var curLiSib = utils.siblings(this);
                        for (var j = 0; j < curLiSib.length; j++) {
                            var cur = curLiSib[j];
                            utils.css(cur,"opacity",0);
                        }
                    });
                    continue;
                }
                utils.css(curLi,"zIndex",0);
            }
            //实现焦点对齐
            for (var i = 0; i < this.tipLis.length; i++) {
                var curLi = this.tipLis[i];
                i ===this.step ? utils.addClass(curLi,'bg') : utils.removeClass(curLi,'bg');
            }
        },
        // 控制自动lunbo
        mouseEvent:function(){
            var self = this;
            this.banner.onmouseover = function(){
                window.clearInterval(self.autoTimer);
                self.bannerLeft.style.display = self.bannerRight.style.display ="block";
            };
            this.banner.onmouseout = function(){
                window.clearInterval(self.autoTimer);
                self.autoTimer = window.setInterval(function(){
                    // self.autoMove.call(self);
                    // console.log('ii')
                    self.autoMove();
                },self.interval);
                self.bannerLeft.style.display = self.bannerRight.style.display ="none";
            }

        },
        //实现焦点切花
        tipEven:function(){
            var self = this;
            for (var i = 0; i < this.tipLis.length; i++) {
                var curLi = this.tipLis[i];
                curLi.index = i;
                curLi.onclick = function(){
                    self.step = this.index;
                    self.setBanner();
                }
            }
        },
        // 实现左右按钮切换
        leftRight:function(){
            var self = this;
            this.bannerRight.onclick = function(){
                self.autoMove();
            };
            this.bannerLeft.onclick = function(){
                if(self.step === 0){
                    self.step = self.jsonData.length
                }
                self.step--;
                self.setBanner();
            }
        },
        //命令模式：唯一入口
        init:function(){
            var self = this;
            this.getData();
            this.bindData();
            window.setTimeout(function(){
                self.lazyImg();
            },500);
            this.autoTimer = window.setInterval(function(){
                self.autoMove();
            },this.interval)
            this.mouseEvent();
            this.tipEven();
            this.leftRight();
            return this;
        }
    }
    window.AutoBanner = AutoBanner;
}()