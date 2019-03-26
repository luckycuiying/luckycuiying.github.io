
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

function Leftfiler(){
    this._constructor();
}
Leftfiler.prototype={
    _constructor:function(){
        this.initDoms();
        this.initEvents();
    },
    initDoms:function(){
        this._first_box1 = document.getElementById("first_box1");
        this._first_box2 = document.getElementById("first_box2");
        this._left = document.getElementById("lift");
        this.box = document.getElementsByClassName("box");
        this.lift_item = document.getElementsByClassName("lift_item");
        this.J_lift_item_top = document.getElementById("J_lift_item_top");
    },
    computeDisplay:function(ele){
        var curHeight =parseInt(getCss(this._first_box1,"height"))+parseInt(getCss(this._first_box2,"height"))-200;
        var curTop = document.documentElement.scrollTop|| document.body.scrollTop;
        ele.style.display= curTop>curHeight ? "block" : "none";
    },
    getCrrentIndex:function(){
        var curScrollTop = document.documentElement.scrollTop|| document.body.scrollTop;
        for (var i = 0; i < this.box.length; i++) {
            var eleOffsetTop = this.box[i].offsetTop;
            var maxVal = eleOffsetTop + this.box[i].offsetHeight;
            if(curScrollTop>eleOffsetTop&&curScrollTop