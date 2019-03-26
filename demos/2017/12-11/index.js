var oBox = document.getElementById("box");
var curLeft = utils.getCss(oBox,"left");
// console.log(curLeft);
// setCss : 给当前元素的某一个样式属性设置值(增加在行内样式的)
// function setCss(curEle,attr,value){
//     // 在JS 中设置float样式值得话也需要处理兼容问题
//     if(attr === "float"){
//         curEle["style"]["cssFloat"] = value;
//         curEle["style"]["styleFloat"] = value;
//         return ;
//     }
//     // 如果打算设置的是元素的透明度的话，我们需要设置两套样式来兼容所有的浏览器
//     if(attr ==="opacity"){
//         curEle["style"]["opacity"] = value;
//         curEle["style"]["filter"] = "alpha(opacity="+value*100+")";
//         return;
//     }
//     //对于某些样式的属性，如果传递进来的值没有加单位，我们需要把单位默认的补充上，这样的话方法就会人性一点
//     var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Left|Right|Bottom)?))$/;
//     if(reg.test(attr)){
//         //判断传进来的value是不是一个有效数字,如果是有效数字，就证明传进来的值没有加单位，我们就补充上
//         if(!isNaN(value)){
//             value += "px";
//         }
//     }
//     curEle["style"][attr] = value;
// }
// setCss(oBox, "left", 200);
// setCss(oBox, "width", "200px");
// setCss(oBox, "backgroundColor", "red");
// setCss(oBox, "opacity", .5);
// setCss(oBox, "float", "right");
// utils.setCss(oBox, "left", 200);
// utils.setCss(oBox, "width", "200px");
 utils.css(oBox, "backgroundColor", "red");
// utils.setCss(oBox, "opacity", .5);
// utils.setCss(oBox, "float", "right");

// utils.css(oBox, {
//     backgroundColor:"blue",
//     borderTop:"10px solid #000",
//     float:"right"
// });
