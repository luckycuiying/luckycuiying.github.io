~function(){

    var banner = document.getElementById("banner");
    var inner = utils.getElementsByClass("inner",banner)[0];
     var inner = utils.firstChild(banner);
    // var bannerTips = utils.children(banner,"ul")[0];
    var bannerTips = utils.getElementsByClass("bannerTips", banner)[0];
    var imgList = banner.getElementsByTagName("img");
    var tipsList = bannerTips.getElementsByTagName("li");
    // 获取左右按钮
    var btnLeft = utils.children(banner,'a')[0],
    btnRight = utils.children(banner,'a')[1];
// 1，实现数据绑定:Ajax 请求，按照字符串拼接的方式绑定数据
    var jsonData =null, count =0;
    ~function(){
        var xhr = new XMLHttpRequest();
        xhr.open('get','banner.txt?_='+Math.random()+"&haha=123",false);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)){
                jsonData = utils.jsonParse(xhr.responseText);
            }
        }
        xhr.send(null)
    }();
    //2,按照字符串拼接的方式绑定数据
    !function bind(){
        var str = "";
        var dianStr = "";
        if(jsonData){
            for (var i = 0; i < jsonData.length; i++) {
                // 绑定轮播图片的数据
                str +=  '<li><img src trueimg="'+jsonData[i][" img"]+'"></li>';
                // 绑定焦点图的数据
                i===0 ? dianStr += '<li></li>':dianStr+='<li></li>';
            }
            // 为了实现无缝滚动我们把第一张图片克隆一份放到最后面
            str +='<li><img src alt trueimg="'+jsonData[0][" img"]+'"></li>';
        }
        inner.innerHTML = str;
        count = jsonData.length+1;
        utils.css(inner,"width",count*750);
        // 绑定焦点图的数据
       bannerTips.innerHTML= dianStr;  
       utils.css(bannerTips,"width",count*28);
     
    }()
    //图片延迟加载
    function lazyImg(){
        for (var i = 0; i < imgList.length; i++) {
            ~function(i){
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function(){
                    curImg.src = this.src;
                    curImg.style.display="block";
                    oImg = null;
                    myAnimate(curImg,{opacity:1},500);
                }
            }(i)
        }
    }
    window.setTimeout(lazyImg,100)
    // 4,实现自动轮播
    var step =0 ; //当前是哪一张图片(0 是第一张图片)
    var interval =2000;
    var autoTimer = window.setInterval(autoMove,interval);
    function autoMove(){
        if(step>=(count-1)){
            step =0;
            inner.style.left = 0;
        }
        step++;
        myAnimate(inner,{left:-step*750},500);
        changeTips();
    }
    // 5,实现焦点对齐
    function changeTips(){
        var tempStep = step>tipsList.length-1?0:step;
        for (var i = 0; i 