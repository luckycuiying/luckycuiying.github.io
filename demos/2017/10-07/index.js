
function addClass(ele,className){
    if(ele && ele.nodeType && ele.nodeType ===1 && className && typeof(className) == 'string' ){
       var reg = new RegExp('\\b'+className+'\\b');
       if(!reg.test(ele.className)){
        ele.className += ' '+className;
       } 
    }
}
function removeClass(ele,className){
    if(ele && ele.nodeType && ele.nodeType === 1 && className && typeof(className) == 'string'){
        var reg = new RegExp('\\b'+ className +'\\b', 'g');
        if(reg.test(ele.className)){
            ele.className =ele.className.replace(reg,'');
        }
    }
}
function getEleChildren(ele,tagName){
    if(ele && ele.nodeType && ele.nodeType ===1 && tagName && typeof(tagName) =='string'){
        tagName = tagName.toUpperCase();
        var a = [];
        var ch = ele.childNodes;
        for (var i = 0; i < ch.length; i++) {
            if(ch[i].nodeType===1&&ch[i].tagName==tagName){
                a.push(ch[i]);
            }
        }
        return a;
    }else{
        alert('arguments error!')
    }
}
function getIndex(ele){
    if(ele && ele.nodeType && ele.nodeType===1){
        var parent = ele.parentNode;
        var eles = getEleChildren(parent,'li');
        // console.log(eles)
        for (var i = 0; i < eles.length; i++) {
            if(ele == eles[i]) {
                // console.log(i)
                return i;
            }
        }
    }
}
function changeTab(){
  var nIndex = getIndex(this);
  var box = this.parentNode.parentNode;
  var ul = getEleChildren(box,'ul')[0];
  var oLis = getEleChildren(ul,'li');
  var divBox = document.getElementById('tabCt');
  var oDivs = getEleChildren(divBox,'div');
  for (var i = 0; i < oLis.length; i++) {
    removeClass(oLis[i],'selectedLi');
    removeClass(oDivs[i],'selectedDiv');
  }
  addClass(oLis[nIndex],'selectedLi');
  addClass(oDivs[nIndex],'selectedDiv')
}

function tabBind(eleId){
    var  oLis = eleId.getElementsByTagName('li');
    for (var i = 0; i < oLis.length; i++) {
     oLis[i].onclick =changeTab;
    }
}
window.onload = function(){
    // var tab = document.getElementById('tabbox');
    tabBind(document.getElementById('tabbox'))
}