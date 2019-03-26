// 
// 
//
~function(){
function getCss (curEle,attr){
    var val =null,reg =null;
    if("getComputedStyle" in window){
        val = window.getComputedStyle(curEle,null)[attr];
    }else{
        if(attr ==="opacity"){
            val = curEle.currentStyle["filter"]; //"alpha(opacity=10)"
            reg = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/i;
            val =  reg.test(val) ? reg.exec(val[1]/100):1;
        }
        val = curEle.currentStyle[attr];

    } // 去掉单位的正则
    reg = /^-?(\d+(\.d+)?)(px|pt|rem|em)?$/i;
    return reg.test(val)? parseFloat(val):val;
};

var oBox = document.getElementById("box");
console.log(oBox)
var oWrap = document.getElementById("wrap");
var oBegin = document.getElementById("conBegin");
var maxLeft = getCss(oBegin,'width');

function move(){
    var curLeft = oWrap.scrollLeft ++;
    //  利用的scrollLeft 存在最大值的思想： 达到最大值之后再怎么累加，scrollLeft 的值都不会发生改变到头了。
    if(curLeft >= maxLeft){  
        // clearInterval(timer)
        oWrap.scrollLeft = 0;
    }
};
var timer = setInterval(move,10);
oBox.onmouseover = function(){
    this.style.backgroundColor = "pink";
        clearInterval(timer);
};
oBox.onmouseout = function(){
         this.style.backgroundColor = "";
         timer = setInterval(move,10)
};

}()