
var utils = (function(){
    return{
        // BOM 浏览器窗口信息方法
        /*
         如果只传了attr 没有传递value ,默认是"获取"
         如果两个参数都传了，就是 "设置"
         不太严谨的关于"类的重载" : 同一个方法，通过传递参数的不同实现了不同的功能
         */
        win :function(attr,value){
            if(typeof value === "undefined"){ // 获取
                return document.documentElement[attr] || document.body[attr];
            }
            //设置
            document.documentElement[attr] = value;
            document.body[attr] = value
        },
        getCss:function(curEle,attr){
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
                console.log(typeof(val))
            } // 去掉单位的正则
            reg = /^-?(\d+(\.d+)?)(px|pt|rem|em)?$/i;
            return reg.test(val)?parseInt(val):val;
        },
        listToArray:function(likeAry){
            var ary = [];
            try{
                ary = Array.prototype.slice.call(likeAry,0);
            }catch(e){
                for (var i = 0; i < likeAry.length; i++) {
                    ary[ary.length] = likeAry[i];
                }
            }
            return ary;
        },
        offset:function(curEle){
            var disLeft = curEle.offsetLeft,
            disTop = curEle.offsetTop,
            par=curEle.offsetParent;
            while(par){
                if(navigator.userAgent.indexOf("MSIE 8")===-1){
                    disLeft += par.clientLeft;
                    disTop += par.clientTop;
                }
                disLeft += par.offsetLeft;
                disTop += par.offsetTop;
                par = par.offsetParent;
            }
            return {left:disLeft,top:disTop};
        },
        jsonParse:function(jsonStr){
            return "JSON" in window ? JSON.parse(jsonStr) : eval("("+jsonStr+")");
        },
        // 方法一  children : 获取curEle 下的所有的元素子节点（兼容所有的浏览器）, 如果传递了tagName,可以在获取的集合中进行二次筛选，把指定的标签名的获取到
        // 获取某一个容器中的所有元素子节点(还可以筛选出指定标签名的)
        children:function(curEle,tagName){
            var ary = [];
            if(/MSIE (6|7|8)/i.test(navigator.userAgent)){
                var nodeList = curEle.childNodes;
                for (var i = 0; i < nodeList.length; i++) {
                    var curNode = nodeList[i];
                    curNode.nodeType===1 ? ary[ary.length]=curNode : null;
                }
                nodeList = null;
            }else{
                ary = this.listToArray(curEle.children);
            }
            if(typeof tagName ==="string"){
                for (var k = 0; k < ary.length; k++) {
                    var curEleNode =  ary[k];
                    if(curEleNode.tagName.toLowerCase()!==tagName.toLowerCase()){
                        ary.splice(k,1);
                        k--;
                    }
                }
            }
            return ary;
        },
        // prev : 获取上一个哥哥元素节点
        //  首先获取当前的上一个哥哥节点，判断是否为元素节点，不是的话就基于当前的继续查找上面的哥哥节点...一直找到哥哥元素节点为止，如果没有哥哥元素节点，返回null即可。
        prev:function(curEle){
            if(!/MSIE (6|7|8)/i.test(navigator.userAgent)){
                return curEle.previousElementSibling;
            }else{
                var pre = curEle.previousSbiling;
                while(pre && pre.nodeType !==1){
                    pre = pre.previousSbiling;
                }
                return pre
            }
        },
        // next : 获取下一个弟弟节点
        next:function(curEle){
            if(!/MSIE (6|7|8)/i.test(navigator.userAgent)){
                return curEle.nextElementSibling;
            }else{
                var nex= curEle.nextSibling;
                while(nex && nex.nodeType!==1){
                    nex = curEle.nextSibling;
                }
                return nex;
            }
        },
        // prevAll : 获取所有哥哥元素节点
        prevAll : function(curEle){
            var ary =[];
            var pre = this.prev(curEle);
            while(pre){
                ary.unshift(pre);
                pre = this.prev(pre);
            }
            return ary;
        },
        // nextAll :获取所有弟弟节点元素
        nextAll:function(curEle){
            var ary = [];
            var nex = this.next(curEle);
            while(nex){
                ary.push(nex);
                nex = this.next(nex);
            }
            return ary;
        },
        // sibling: 获取相邻的两个元素节点
        sibling:function(curEle){
            var pre = this.prev(curEle);
            var nex = this.next(curEle);
            var ary =[];
            pre ? ary.push(pre) :null;
            nex ? ary.push(nex) :null;
            return ary;
        },
        // siblings: 获取所有的兄弟元素节点
        siblings: function(curEle){
            return this.prevAll(curEle).concat(this.nextAll(curEle))
        },
        // index : 获取当前元素的索引
        index:function(curEle){
            return this.prevAll(curEle).length;
        },
        //  firstChild:获取第一个元素节点
        firstChild:function(curEle){
            var chs = this.children(curEle);
            return chs.length > 0 ? chs[0] : null;
        },
        // lastChild:获取最后一个元素节点
        lastChild:function(curEle){
            var chs = this.children(curEle);
            return chs.length > 0 ? chs[chs.length-1] : null;
        },
        // append : 向指定容器的末尾追加元素
       append:function(newEle, container){
            container.appendChild(newEle)
       },
        // prepend : 向指定容器的开头追加元素(把新元素添加到容器中的第一个元素节点的前面)
        // 如果指定的容器里面一个元素都没有的话，就直接追加到末尾就好。
        prepend:function(newEle, container){
            var fir  = this.firstChild(container);
            if(fir){
                container.insertBefore(newEle,fir);
                return;
            }
            container.appendChild(newEle);
        },
        // insertBefore : 向容器中指定元素的前面追加
        insertBefore: function(newEle,oldEle){
            return oldEle.parentNode.insertBefore(newEle,oldEle);
        },
        // insertAfter : 把新元素(newEle)追加到指定元素（oldEle)的后面。
        // 相当于追加到oldEle 弟弟元素的前面，如果弟弟不存在的话，也就是当前元素已经是最后一个了，我们把新元素追加到末尾即可
        insertAfter:function(newEle,oldEle){
            var nex = this.next(oldEle);
            if(nex){
                oldEle.parentNode.insertBefore(newEle,nex);
                return;
            }
            oldEle.parentNode.appendChild(newEle);
        },
       
        // remveClass : 删除样式类名
        removeClass:function(curEle,className){
            var ary = className.replace(/(^ +| +$)/g," ").split(/ +/g);
            for (var i = 0; i < ary.length; i++) {
                var curName =  ary[i];
                if(this.hasClass(curEle,curName)){
                    var reg = new RegExp("(^| )"+curName+"( +|$)","g");
                    curEle.className = curEle.className.replace(reg," ");
                }
            }
        },
        // hasClass : 判断是否存在某一个样式类名
        hasClass:function(curEle,className){
            if(curEle.className.indexOf(className)>-1){
                var reg = new RegExp("(^| +)"+ className+ "( +|$)");
                return reg.test(curEle.className);
            }
        },
        // getElementsByClassName的兼容问题
        getElementsByClass:function(strClass,context){
            context = context || document;
            if(/MSIE (6|7|8)/i.test(navigator.userAgent)){
            var ary = [];
            var strClassAry = strClass.replace(/(^ +| +$)/g," ").split(/ +/g);
            var nodeList = context.getElementsByTagName("*");
            for (var i = 0; i < nodeList.length; i++) {
                var curNode = nodeList[i];
                var isOk = true;
                for (var j = 0; j < strClassAry.length; j++) {
                    var reg = new RegExp("(^ | +)"+strClassAry[j]+"( +|$)");
                    if(!reg.test(curNode.className)){
                        isOk = false;
                        break;
                    }
                    if(isOk){
                        ary[ary.length] = curNode;
                        ary.push(curNode);
                    }
                }
            }
            return ary;
            }else{
                return this.listToArray(context.getElementsByClassName(strClass));
            }
        },
        setCss:function(curEle,attr,value){
            // 在JS 中设置float样式值得话也需要处理兼容问题
            if(attr === "float"){
                curEle["style"]["cssFloat"] = value;
                curEle["style"]["styleFloat"] = value;
                return ;
            }
            // 如果打算设置的是元素的透明度的话，我们需要设置两套样式来兼容所有的浏览器
            if(attr ==="opacity"){
                curEle["style"]["opacity"] = value;
                curEle["style"]["filter"] = "alpha(opacity="+value*100+")";
                return;
            }
            //对于某些样式的属性，如果传递进来的值没有加单位，我们需要把单位默认的补充上，这样的话方法就会人性一点
            var reg = /^(width|height|top|bottom|left|right|((margin|padding)(Top|Left|Right|Bottom)?))$/;
            if(reg.test(attr)){
                //判断传进来的value是不是一个有效数字,如果是有效数字，就证明传进来的值没有加单位，我们就补充上
                if(!isNaN(value)){
                    value += "px";
                }
            }
            curEle["style"][attr] = value;
        },

        // setGroupCss  给当前元素批量的设置样式属性值
        setGrounpCss:function(curEle,options){
            options = options || 0;
            // 首先检查options的数据类型，如果不是一个对象，则不能进行批量设置
            // Object.prototype.toString.call(options)
            if(options.toString() !== "[object Object]"){
                return;
            }
            for(var key in options){
                if(options.hasOwnProperty(key)){  
                this.setCss(curEle,key,options[key]);
                }
            }
        },
        //  css: 此方法实现了获取，单独设置，批量设置元素的样式值
        css:function(curEle,attr,value){
            var argTwo = arguments[1];
            if(typeof argTwo === "string"){ //第一个参数值是一个字符串，这样的话很有可能就是在获取样式;为什么说是呢？因为还需要判断第三个参数是否存在
                // 如果第三个参数值存在的话，不是获取了，而是在单独的设置样式属性值
                var argThree = arguments[2];
                if(typeof argTwo === "string"){ // 第三个参数不存在
                    if(typeof argThree ==="undefined"){
                    // return this.getCss(curEle,argTwo);
                    return this.getCss.apply(this,arguments);
                    }
                }
                // 第三个参数存在就是单独设置
                // this.setCss(curEle,argTwo,argThree);
                this.setCss.apply(this,arguments);
            }
            argTwo = argTwo || 0;
            if(argTwo.toString() === "[object Object]"){
                this.setGrounpCss.apply(this,arguments);
            }
        }
    }
})()


// 方法二 通过出class名 通过元素的样式类名获取一组元素(兼容所有浏览器)