// 模拟我们的children 方法 ,实现获取指定元素下的元素节点
/*
  licuiying by 2017/11/10
 */

function getMyChildren(ele){
    var ary = [];
    nodes = ele.childNodes;
    for (var i = 0; i < nodes.length; i++) {
        var  cur = nodes[i];
        if(cur.nodeType===1){
            ary.push(cur);
        }
    }
    return ary

}