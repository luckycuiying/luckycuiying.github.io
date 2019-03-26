// 方法： 模拟我们的children 方法，实现获取指定元素下的元素子节点
/*
 getMyChildren: 获取指定元素下的所有的元素节点
 @ parameter:
 ele:我们要获取谁下面的，就把谁传进来
 tagName: 获取那种类型的元素。 例如：div 
 @return :
 我们最后获取的元素子节点
 */


function getMyChildren(ele,tagName){
    var arg =[],nodes = ele.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var cur = nodes[i];
        if(cur.nodeType===1){
            if(tagName){
                if(cur.nodeName.toLowerCase() === tagName.toLowerCase()){
                   arg.push(cur);
                }
            }
        }
    }
    // console.log(arg)
    return arg;
}
var oDiv = document.getElementById('box');
getMyChildren(oDiv,"li") ;

// 方法： 模拟我们的previousSibling 方法，实现获取指定元素的哥哥元素子节点

function prev(ele){
    var pre = ele.previousSibling,arg=[];
    while(pre&&pre.nodeType!==1){
        pre = pre.previousSibling;
        arg.unshift(pre);
    }
    return arg;
}

// 获取指定元素的所有哥哥节点
function prevAll(ele){
    var pre = ele.previousSibling, arg=[];
    while(pre){
        if(pre.nodeType===1){
            arg.unshift(pre);// 向数组的最前面添加
        }
        pre = pre.previousSibling;
    }
    return arg;
}
// 获取指定元素的弟弟节点
function next(ele){
    var next = ele.nextSibling,arg =[];
    while(next&&next.nodeType!==1){
        next = next.nextSibling;
        arg.unshift(next);
    }
    return arg;
}
// 获取指定元素的所有弟弟节点
function nextAll(ele){
    var next = ele.nextSibling, arg=[];
    while(next){
        if(next.nodeType===1){
            arg.unshift(next);
        }
        next = next.nextSibling;
    }
    return arg;
}
var oLi3 = document.getElementById('li3');
// console.log(oLi3)
var nextNode = next(oLi3);
// console.log(nextNode)
var nextNodes = nextAll(oLi3)
// console.log(nextNodes)

// 获取相邻的两个元素节点
function adjacentNode(ele){
    var pre = prev(ele);
    var next2= next(ele);
    var adjacentNodes = pre.concat(next2);
    return adjacentNodes;
}
var adjacent = adjacentNode(oLi3);
console.log(adjacent)

// 获取所有的兄弟节点
function siblings(ele){
    var preA = prevAll(ele);
    var nextA = nextAll(ele);
    var allSiblings = preA.concat(nextA);
    return allSiblings;
}
var siblingsA = siblings(oLi3);
console.log(siblingsA)

 function getRandom(n,m){
     n = Number(n);
     m = Number(m);
     if(isNaN(n)||isNaN(m)){
         return Math.round();
     }
     if(n>m){
         var temp = n;
         n = m;
         m = temp
     }
     return Math.round(Math.random()*(m-n)+n);
 }
//获取4位 0-61之间的随机数
var arg=[];
for(var i=0;i