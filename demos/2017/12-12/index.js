var tabFir = document.getElementById("tabFir"), oLis = tabFir.getElementsByTagName("li"),
oDivs = tabFir.getElementsByTagName("div");
function tabChange(n) {
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].className = null;
        oDivs[i].className = null;
    }
    oLis[n].className ="select";
    oDivs[n].className ="select";
}
//自定义属性的方式
for (var i = 0; i < oLis.length; i++) {
    oLis[i].index = i;
    oLis[i].onclick = function(){
        tabChange(this.index)
    }
}
// 闭包
// for (var i = 0; i < oLis.length; i++) {
//     ~function(n){
//        oLis[n].onclick = function(){
//            tabChange(n)
//        } 
//    }(i)
   
// }
// for (var i = 0; i < oLis.length; i++) {
//        oLis[i].onclick = (function(i){
//         return function(){
//             tabChange(i)
//         }
//        })(i)
       
   
   
// }

// jQuery 封装tab 切换