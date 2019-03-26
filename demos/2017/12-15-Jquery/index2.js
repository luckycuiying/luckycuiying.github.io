var tabFir = document.getElementById("tabFir");
var tabOptions = document.getElementById("tabOptions");
var oLis = utils.children(tabOptions);
console.log(oLis.length)
var oDivs = utils.children(tabFir,"div");
console.log(oDivs)
// function tabChange(n) {
//     for (var i = 0; i < oLis.length; i++) {
//         oLis[i].className = null;
//         oDivs[i].className = null;
//     }
//     oLis[n].className ="select";
//     oDivs[n].className ="select";
// }
//自定义属性的方式
for (var i = 0; i < oLis.length; i++) {
    oLis[i].onclick = function(){
        var curSiblings = utils.siblings(this);
        for (var i = 0; i < curSiblings.length; i++) {
           utils.removeClass(curSiblings[i], "select");
        }
           utils.addClass(this,"select");
           var index = utils.index(this);
           var oDivs = utils.nextAll(this.parentNode);
        for (var i = 0; i < oDivs.length; i++) {
               i === index ? utils.addClass(oDivs[i],"select") : utils.removeClass(oDivs[i],"select");
           }   
    }
}