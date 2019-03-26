    
  var handle = function(a){
            var b = 3;
            var tmp = function(a){
                b = a + b;
                return tmp;
            }
            tmp.toString = function(){ //自定义toString方法，给alert 用的。因为aler方法会调用浏览器给Obj数据类型的默认toString方法，但是这个handle 方法的是一个函数所以alert（）返回默认toString()是函数本身。所以我们通过自定义toString(),让它返回b 的值。
                return b;
            }
            return tmp;
    }
    alert(handle(4)(5)(6)); //14
    // 第一次执行的是handle(4),浏览器会开辟一个空间这个空间里有参数a=4;局部变量var b和var tmp 都会提升，然后开始右上到下开始执行代码
    // b=3 ,tmp = function 返回的结果还是个没有执行的函数，
    // 第二次执行handle(5)是在执行handle(4）后返回的结果（function(a){ //此时a = 5
               // b = a + b; //b = 5+3 =8 ,同时把上级作用域里的b的值改变成8 
                //return tmp; //返回的有事他本身函数
            //}
    // 第三次执行handle(5) 是 还是执行的这段代码function(a){ //此时 a = 6
                //b = a + b; //b =6+8
                //return tmp;
            //}
    