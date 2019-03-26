
window.onload= function(){
     var $box1 = $('.box1');
     var offset = $box1.offset(); 
     var divTop = offset.top;
     window.onscroll = function(){
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollTop>divTop){
           $box1.css({'position':'fixed','left':0,'top':0});
        }else{
            $box1.css({'position':''});
        }
     }
}
