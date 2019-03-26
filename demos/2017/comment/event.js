/*
bind : 处理DOM2级事件绑定的兼容问题(绑定的方法)
@parameter:
curEle: 要绑定事件的元素
evenType: 要绑定的事件类型
evenFn: 要绑定的方法
 */ 
~function(){
    //解决了this 和重复问题
    function bind(curEle,evenType,evenFn) {
        if("addEventListener" in document){
            curEle.addEventListener(evenType,evenFn,false);
            return;
        };
        //解决IE里面this 问题
        var tempFn = function(){
            evenFn = call(curEle);
        };
        // curEle["mybind"] = tempFn;
        tempFn.photo = evenFn;
        // 首先要判断该自定义属性之前是否存在，不存在就创建一个，由于要存储多个方法化妆后的结果，所以让其值为一个数组
        if(!curEle["myBind"+evenType]){
            curEle["myBind"+evenType] =[];
        };
        //解决重复问题：每一次自己在往自定义属性对应的容器中添加前，看一下之前是否已经有了，有的话就不用再重新添加了，同理也不需要往事件池内存储了。
        var ary = curEle["myBind"+evenType];
        for (var i = 0; i < ary.length; i++) {
            var cur = ary[i];
            if(cur.photo === evenFn){
                return;
            }
        }
        ary.push(tempFn)
        curEle.attachEvent("on"+evenType,ary);
        
    }
    function unbind(curEle,evenType,evenFn) {
        if("addEventListener" in document){
            curEle.removeEventListener(evenType,evenFn,false);
            return;
        }
        // 拿evenFn 到 curEle["myBind"]这里找化妆后的结果，找到之后在事件池中把换装后的结果给移除事件池
        var ary = curEle["myBind"+evenType];
        if(ary && instanceof Array){
            for (var i = 0; i < ary.length; i++) {
                var  cur = ary[i];
                if(cur.photo===evenFn){
                    cur.splice(i,1);//找到后，把自己存储的容器中对应的移除掉
                    curEle.detachEvent("on"+ evenType,cur); //再把事件池内对应的也移除掉
                    break;
                }
            } 
        }
    }
    // 解决顺序问题： 不用浏览器自带的事件池，自己模拟标准浏览器的事件实现
    // on : 把给当前元素某一个行为类型绑定的所有的方法都存放到自定义的容器中
    function on(curEle,evenType,evenFn){
        if(!curEle["myEvent"+evenType]){
            curEle["myEvent"+evenType] = [];
        }
        var ary = curEle["myEvent"+evenType];
        for (var i = 0; i < ary.length; i++) {
            if(ary[i]===evenFn){
                return;
            }
        }
        ary.push(evenFn);
        //如果想在点击的时候执行run 方法，我们需要把run 方法添加到浏览器内置的事件池中
        //每当执行一次on 方法，都会重新的给当前元素绑定run()方法，但是这里我们是使用了上面写的bind方法实现绑定的（bind 解决了this和重复问题）
        bind(curEle,evenType,run);
    };
    //在自定义的容器中，把需要删除的方法从容器中删除掉
    function off(curEle,evenType,evenFn){
        var ary = curEle["myEvent"+evenFn];
        if(ary&&ary instanceof Array){
            for (var i = 0; i < ary.length; i++) {
                var cur = ary[i];
                if(cur === evenFn){
                    ary[i] = null;
                    break;
                }
            }
        }
    };
    // run ： 是唯一给当前元素的某个行为在内置事件池中绑定的方法，当行为触发，执行run方法，在run 方法中依次顺序执行
    function run(e){
        e = e || window.event;
        var flag = e.target?true:false;
        if(!flag){
            e.target = e.srcElement;
            e.pageX = e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
            e.pageY = e. clientY+(document.documentElement.scrollTop||document.body.scollTop);
            e.preventDefault = function(){
                e.returnValue=false;
            }
            e.stopPropagation = function(){
                e.cancelBubble = true;
            }
        }
        var ary = this["myEvent"+e.type];
        for (var i = 0; i < ary.length; i++) {
            var tempFn = ary[i];
            if(typeof tempFn === function){
                tempFn.call(this,e);
            }
            //在内置的事件池中绑定的方法执行的时候，this都是当前要操作的元素。并且浏览器还会给其传递一个事件对象；而且我们自己创建的
            //容器中存储的所有方法其实都相当于是要给当前元素绑定的事件，为了和内置的统一，我们也让其执行的时候的this 也变为当前元素，并且也给他传递一个事件对象。
            //
            else{
                ary.splice(i,1);
                i--;
            }
        }
    };
    window.myEventUtils = {
        on:on,
        off:off
    }
}();
