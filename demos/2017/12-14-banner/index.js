 /* 淡进淡出banner图效果原理：
1> 首先是获取到的所有图片都是叠加在一起的，默认的所有图片的z-index= 0； opacity = 0;
开始让第一张图片的z-index= 1；opacity=1； 就能看到第一张图片
3s ---> 后
让第二张图片的z-index=1，其余的z-index=0；此时第二张图片透明度依然是0，只有第一张图片的透明度为1，还是看到第一张图片，只需要让第二张图片的透明度为1，，就能看到第二张图片，其他的透明度改为0；
2> 轮播图片和焦点要对齐，
3> 鼠标放到banner 上显示左右按钮，
4> 点击左边按钮向左边移动，点击右边向右边移动
*/
//获取需要的DOM
var banner = document.getElementById('banner');
var inner = utils.children(banner,"ul")[0],
    bannerTips = utils.children(banner,"ul")[1],
    bannerLink = utils.children(banner,'a'),
    bannerLeft = bannerLink[0],
    bannerRight = bannerLink[1];
var innerList = inner.getElementsByTagName('li'),
    imgList = inner.getElementsByTagName('img'),
    oLisT =  bannerTips.getElementsByTagName('li')

// 通过接口获取数据
var jsonData = null;
~function(){
    // var xhr = new XMLHttpRequest();
    var xhr = new XMLHttpRequest();
    xhr.open("get","banner.txt?_="+Math.random(),false);
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4&& /^2\d{2}$/.test(xhr.status)){
            jsonData = utils.jsonParse(xhr.responseText)
        }
    }
    xhr.send(null);

}()
// 数据绑定
~function bind(){
    var strImg = "",
        strBtn = "";
    for (var i = 0; i < jsonData.length; i++) {
        var curData = jsonData[i];
        strImg +=  '<li><img src trueimg="'+jsonData[i][" img"]+'"></li>';
        i===0 ? strBtn+= '<li class="bg"></li>':strBtn+= '<li></li>';
    }
    inner.innerHTML = strImg;
    bannerTips.innerHTML =strBtn;
}()
//3,图片延迟加载
function layzImg(){
    for (var i = 0; i < imgList.length; i++) {
        ~function(i){
            var curImg = imgList[i];
            var oImg = new Image;
            oImg.src = curImg.getAttribute('trueImg');
            oImg.onload = function(){
                curImg.src = this.src;
                curImg.style.display = "block";
                if(i===0){
                    var curDiv = curImg.parentNode;
                    curDiv.style.zIndex =1;
                    myAnimate(curDiv,{opacity:1},200);
                }
                oImg = null;
            } 
        }(i)    
    }
}
window.setTimeout(layzImg,500);

// 4,实现我们的自动轮播
var inInterval= 3000, autoTimer = null,step=0;
autoTimer = window.setInterval(autoMove,inInterval);
function autoMove(){
    if(step>=(jsonData.length-1)){
        step =0;
    }else{ 
        step++;
    }
    setBanner();
}
//实现轮播图切换效果的代码:
//第一步：让step索引对应的那个li 的z-index =1, 让当前的透明度从零变成1，当动画结束后，需要让其的li 的透明度值直接的变成零
//第二步：让其余的li 的z-index=0； 透明度也变为0
//第三步：实现焦点对齐
function setBanner(){
    for (var i = 0; i < innerList.length; i++) {
        var curLi =  innerList[i];
        if(i === step){
            utils.css(curLi,"zIndex", 1);
            myAnimate(curLi,{opacity:1},200,function(){
                var curLiSib = utils.siblings(this);
                for (var k = 0; k < curLiSib.length; k++) {
                    utils.css(curLiSib[k],"opacity",0);
                }
            });
            continue;
        }
        utils.css(curLi,"zIndex", 0)

    }
    // 实现焦点对齐
    for (var i = 0; i < oLisT.length; i++) {
        var cur = oLisT[i];
        i===step ? utils.addClass(cur,'bg') :utils.removeClass(cur,'bg');
    }
}
// 实现鼠标悬停停止自动轮播，鼠标离开在开启自动轮播的效果
banner.onmouseover = function(){
    window.clearInterval(autoTimer);
    bannerLeft.style.display = bannerRight.style.display="block";
}
banner.onmouseout = function(){
    autoTimer = window.setInterval(autoMove,inInterval);
    bannerLeft.style.display = bannerRight.style.display="none";
}
// 实现点击焦点图移动图片的效果
~function(){
    for (var i = 0; i < oLisT.length; i++) {
        var curLi = oLisT[i];
        curLi.index =i;
        curLi.onclick=function(){
            step = this.index;
            setBanner();
        }
    }

}()
// 实现左右按钮切换
bannerRight.onclick = autoMove;
bannerLeft.onclick = function(){
    if(step ===0){
        step=jsonData.length;
    }
    step--;
    setBanner()
}