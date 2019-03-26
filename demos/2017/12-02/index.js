var banner = document.getElementById("banner");
var banner2 = document.getElementById("banner2");
var imgFir = banner.getElementsByTagName("img")[0];
var imgFir2 = banner2.getElementsByTagName("img")[0];

// 单张首屏延迟加载
window.setTimeout(function(){
    imgFir.src = imgFir.getAttribute("trueImg");
    imgFir.style.display ="block";
    // 如果我们获取的真实图片地址错误的话，控制台会报错。还会出现碎图影响视觉效果
    // 获取图片地址，验证地址的有效性，是有效值在赋值。不是有效值的话不进行赋值
    var oImg =  new Image;
    oImg.src = imgFir.getAttribute("trueImg");
    oImg.onload = function(){
        imgFir.style.display ="block";
        imgFir.src = this.src;
        oImg = null;
    }
},1000)


window.onscroll = function(){
        if(banner2.isLoad){
            return;
        }
        var A = banner2.offsetHeight + utils.offset(banner2).top;
        var B = utils.win("clientHeight") +utils.win("scrollTop");
        if(A < B){
            var oImg = new Image;
            oImg.src = imgFir2.getAttribute("trueImg");
            oImg.onload = function(){
                imgFir2.style.display = "block";
                imgFir2.src = this.src;
                oImg = null;
            }
            banner2.isLoad = true;
        }
    }
