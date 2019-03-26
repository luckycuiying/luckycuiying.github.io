FastClick.attach(document.body);
~function(){
    var desW = 640,
    winW = document.documentElement.clientWidth,
    ratio = winW/desW,
    oMain = document.querySelector(".main");
    if(winW>desW){
        oMain.style.margin ="0 auto";
        oMain.style.widht = " 0 auto";
        return;
    }
    document.documentElement.style.fontSize = ratio*100+"px";

}()

var mySwiper = new Swiper ('.swiper-container', {
        loop: true,
        direction : 'vertical',
        // 当切换结束，给当前展示区域添加对应的ID，由此实现对应的动画效果
        onSlideChangeEnd: function(swiper){
            var slideAry = swiper.slides; // 获取当前一共有多少个活动块（包含LOOP 模式先后多加的两个）
            var curIn = swiper.activeIndex;//切换结束时，告诉我现在是第几个slide
            var total = slideAry.length;
            // ID 是 page ?
            var targetId = 'page';
            switch(curIn){
                case 0:
                    targetId+=total-2;
                    break;
                case total-1:
                    targetId+=1;
                    break;
                default :
                targetId += curIn;    
            }
            // 给当前的活动块设置ID 即可, 还需要把其余的移除
            [].forEach.call(slideAry ,function(item,index){
                if(curIn===index){
                    slideAry[curIn].id = targetId;
                    return
                }
                item.id=null;
            })
            
        }
});


~function(){
    var musicMenu = document.getElementById("musicMenu"),
        musicAudio = document.getElementById("musicAudio");
        console.log(musicMenu)
        musicMenu.addEventListener('click',function(){
            if(musicAudio.paused){
                musicAudio.play();
                musicMenu.className =" music move";
                return;
            }else{
                musicAudio.pause();
                musicMenu.className =" music";
            }

        },false)
    function controlMusic(){
        musicAudio.volume = 0.1;
        musicAudio.play();
        musicAudio.addEventListener('canplay',function(){
            musicMenu.style.display="block";
            musicMenu.className =" music move";
        },false)
    }

    window.setTimeout(controlMusic,1000);

}()