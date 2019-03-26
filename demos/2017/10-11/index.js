
function SlideShow(){
    this._constructor();
}
SlideShow.prototype = {
    _constructor: function(){
        var self = this;
        self.initDoms();
        // 调借口是回调函数，必须接口回来后才能执行
        this.initJson(function(){
            self.initViews();
            self.autosilder();
            self.initEvents();            
        });

    },
    initJson:function(cb){
        $.ajax({
            url: '/demos/server/pics.json',
            dataType: 'jsonp'
        });
        var bigArr=[];
        var smallArr = [];
        var self = this;
        window.callback = function(json){
            var data = json.data;
            // console.log(data)
            var html = '';
            for (var i = 0; i < data.length; i++) {
                bigArr.push(self.getBigItem(data[i]));
                smallArr.push(self.getSmallItem(data[i]));
            }
            self.$smallBox.html(smallArr);
            self.$bigPic.html(bigArr);
            cb && cb()
        };
    },
    getBigItem:function(data){
        return [
            '<li class="imgbox">',
                '<img src="'+ data.bigImg +'" alt>',
            '</li>'
        ].join('')
    },
    getSmallItem:function(data){
        return [
            '<li class="item">',
                '<div class="item_mask"></div>',
                '<div class="imgbox"><img width="70" height="48" src="'+data.smallImg+'" alt></div>', 
            '</li>'
        ].join('')
    },
    initDoms:function(){
        this.$content = $('#slideShow');
        this.$bigPic = this.$content.find('#bigPic');
        this.$smallBox = this.$content.find('#itemList');
    },
    initViews:function(){
        this.$bigImgs = $('.imgbox');
        console.log(this.$bigImgs)
        this.$imgNum =  this.$bigImgs.length;
        this.$firstNode = this.$bigImgs.first().clone(true);
        this.$firstNode.appendTo(this.$bigPic);
        this.$smallPics = this.$content.find('.item');
            // console.log(this.$idSlider)
        this.$imgWidth = this.$bigImgs.width(); 
        this.$divWidth = this.$imgWidth*this.$imgNum;
        this.lastW = this.$divWidth+this.$imgWidth;
        this.$bigPic.css({'width':this.lastW});
    },
    move:function(val){
        this.$bigPic.animate({marginLeft: val*-1},'1000px');
        if(this.page===this.$imgNum){
           this.page =0;
        }
        this.$smallPics.eq(this.page).addClass('current').siblings().removeClass('current');
    },
    initEvents:function(){
        var self = this;
         self.$smallPics.mouseenter(function(e) {
            var $targetEle = $(e.currentTarget);
            var index = $targetEle.index();
            $(this).addClass('current').siblings().removeClass('current');
            clearInterval(self.timerID);
            self.val =index*self.$imgWidth;
                self.move(self.val)
         });
        self.$smallPics.mouseleave(function(e) {
            var $targetEle = $(e.currentTarget);
            var indexNum  = $targetEle.index();
            self.autosilder(indexNum);
        });    
    },
    autosilder:function(indexNum){
        var self = this;
        if(indexNum == undefined){
           self.val = 0;
            self.page = 0;
        }else{
            self.val = indexNum*self.$imgWidth;
            self.page = indexNum;
        }
        self.timerID = setInterval(function(){
        self.val += self.$imgWidth;
        self.page +=1;
        if((self.val-self.$imgWidth)===self.$divWidth){
             self.$bigPic.stop().css({'marginLeft': 0});
             self.val=self.$imgWidth;//去往第二页
             self.move(self.val);//0
        }else{
             self.move(self.val);
            }
        },2000);  
    }
}
$(function(){
    var slideShow = new SlideShow();
});

    