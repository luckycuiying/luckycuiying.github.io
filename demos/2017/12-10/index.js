// 内置方法document.getElementsByClassName("w1")包含的功能： 
        // 1> 写一个className的只要包含一个className就可以
        // 2> 如果写多个时，就必须同时包含才可以，但是和className 的顺序和中间有多少个空格都是没有关系的
        // 3》 如果写一个不存在的className的话，返回的是空间集合
        // getElementsByClass :通过元素的样式类名获取一组元素集合，
        // className : y要获取的类名（可能是一个或是多个）
        // context : 获取元素的上下文，如果不传这个值的话，默认document
        // function getElementsByClass (className,context){
        //     context = context || document;
        //     var ary = [];
        //     // 把传递进来的样式类名的首尾空格去掉，然后在按照中间的空格把它里面的每一项拆分成数组
        //     var classNameAry = className.replace(/(^ +| +$)/g).split(/ +/g); //["w3","w1"]
        //     //获取指定上下文中的所有的元素标签，循环这些标签，获取每一个标签的className 样式的字符串
        //     var nodeList = context.getElementsByTagName("*");
        //     for (var i = 0; i < nodeList.length; i++) {
        //         var curNode = nodeList[i];
        //         // 判断curNode.className 是否即包含“w3" 也包含"w1", 如果两个都包含的话，curNode 就是我想要的，否则就不是我们想要的。
        //         //在循环["w3","w1"]
        //         var isOK= true;
        //         for (var k = 0; k < classNameAry.length; k++) {
        //             var reg = new RegExp("(^| +)" + classNameAry[k] +"( +|$)");
        //             if(!reg.test(curNode.className)){
        //                 isOK = false;
        //                 break;
        //             }
        //         } 
        //         if(isOK){
        //             ary.push(curNode);
        //         }
        //     }
        //     return ary;
        // }
        // var res = getElementsByClass("w1")
        var res = utils.getElementsByClass("w1")
        console.log(res)