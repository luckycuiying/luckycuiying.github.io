// function SlideShow(){
//     this._constrouctor();
// }
// SlideShow.prototype = {
//     _constrouctor: function(){
//         this.initDoms();
//         this.initEvents();
//     }
// }

// var slideShow = new SlideShow();
// slideShow();
     // $('#slideShow .bigPic').css({'width':4320});
function slideShow() {
    var timerID ;
    var $content = $('#slideShow');
    var $bigPic = $content.find('.bigPic');
    var bigImgs =$bigPic.find('.imgbox');
    var imgNum =  bigImgs .length;
    var firstNode = bigImgs.first().clone(true);
        firstNode.appendTo($bigPic);
    var W = bigImgs.width();
    var smallPics = $content.find('.item');
    var wImgs = bigImgs.length*720;
    $bigPic.css({'width':wImgs+W});
    var page = 0;
    var val = 0;
    function move(val){
        $bigPic.animate({marginLeft: val*-1},'1000px');
    }
    function autosilder(indexNum){
        if(indexNum == undefined){
            val = 0;
            page = 0;
        }else{
            val = indexNum*W;
            page = indexNum;
        }
        timerID = setInterval(function(){
        val += W;
        page +=1;
        //val-W)===wImgs/2 DOM 赋值一整份
        if((val-W)===(wImgs)){
             $bigPic.stop().css({'marginLeft': 0});
             val=W;//去往第二页
             move(val);//0
             smallPics.eq(page).addClass('current').siblings().removeClass('current');
        }else{
             move(val);
             if(page===imgNum){
                page =0;
             }
             smallPics.eq(page).addClass('current').siblings().removeClass('current');
            }
        },3000);  
    } 
    autosilder() 
    smallPics.mouseenter(function(event) {
        event.stopPropagation();
     var index = $(this).index();
    $(this).addClass('current').siblings().removeClass('current');
        clearInterval(timerID);
    var val =(index)*W;
        move(val)
   });
    smallPics.mouseleave(function(event) {
        var indexNum = $(this).index();
        autosilder(indexNum);
    });
     
}
slideShow()
