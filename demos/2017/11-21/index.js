//设置随机获取的范围
var codeStr = "abcdefghijklmnopqrstyvwsyzABCDEFGHIJKLMNOPQRSTYVWSYZ0123456789";
//0-61 之间的随机4个索引，然后通过charAt()就可以获取到字符
//获取一个随机数
var oDiv = document.getElementById("code");
function getRandom(n,m){
    n = Number(n);
    m = Number(m);
    if(isNaN(n)||isNaN(m)){
        return Math.random();
    }
    if(n>m){
        var temp = n;
        n = m;
        m = temp
    }
    return Math.round(Math.random()*(m-n)+n);
}
// 索引去重
function unique(arr){
    var obj={};
    for (var i = 0; i < arr.length; i++) {
        var cur = arr[i];
        if(obj[cur] == cur){
            cur = arr[arr.length-1]; //把末尾那一项的值拿过来替换当前项
            arr.length--; //在把数组末尾的那一项删除
            i--;
        }
    }
    obj=null;
    return arr;
}
 function getCode(){
    var strArr = [];
    for (var i = 0; i < 4; i++) {
        var ran = getRandom(0,61);
        strArr.push(codeStr.charAt(ran));
    }
    var lastStr = unique(strArr).join(" ");
    oDiv.innerHTML = lastStr;
 }
 getCode();
 oDiv.onclick = function(){
    getCode();
 }