// BOM 浏览器窗口信息方法
/*
 如果只传了attr 没有传递value ,默认是"获取"
 如果两个参数都传了，就是 "设置"
 不太严谨的关于"类的重载" : 同一个方法，通过传递参数的不同实现了不同的功能
 */
function win(attr,value){
    if(typeof value === "undefined"){ // 获取
        return document.documentElement[attr] || document.body[attr];
    }
    //设置
    document.documentElement[attr] = value;
    document.body[attr] = value
}
win("clientWidth") // 获取
win("clientTop",0) // 设置

//getCss 获取当前元素所有计算过得样式中的[attr] 对应的值
//curEle :[object] 当前要操作的元素对象
//使用try,catch 来处理兼容 是有前提的：必须保证try中的代码在不兼容的浏览器中执行的时候是报错的。catch 才能捕获到异常进行处理。
function getCss(curEle,attr){
    var val= null;
    try{// 不管是什么浏览器都会执行try 里面的代码
        val = window.getComputedStyle(curEle,null)[attr];
    }catch(e){
        val = curEle.currentStyle[attr];
    }
    return val 
}
console.log(getCss(box,"border"))
// 通过判断浏览器中是否存在这个属性或者方法，不存在就是不兼容的 最常用的处理兼容问题
function getCss (curEle,attr){
    var val =null;
    if("getComputedStyle" in window){
        val = window.getComputedStyle(curEle,null)[attr];
    }else{
        val = curEle.currentStyle[attr];

    }
    return val
}
function getCss (curEle,attr){
    var val =null;
    if(window.getComputedStyle){
        val = window.getComputedStyle(curEle,null)[attr];
    }else{
        val = curEle.currentStyle[attr];

    }
}
function getCss (curEle,attr){
    var val =null;
    if(!typeof window.getComputedStyle === "undefined"){
        val = window.getComputedStyle(curEle,null)[attr];
    }else{
        val = curEle.currentStyle[attr];

    }
    return val
}
// 通过浏览器版本和类型来处理
//  /MSIE (6|7|8)/.test(navigator.userAgent)
function getCss (curEle,attr){
    if(/MSIE (6|7|8)/.test(navigator.userAgent)){
        val = curEle.currentStyle[attr];
    }else{
        val = window.getComputedStyle(curEle,null)[attr];
    }
    return val
}
console.log(getCss(box,"width")) // 200px
 
 //怎么能把返回值 200px 转换成200
 //100.px 100.3pt 100.rem 100.em  -100.5px
// 符合"数字+单位" 才会去掉单位 
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
}