// 最简单的一点击就回到顶部的代码
    var goLink = document.getElementById('goLink');
function goLinl(){
    goLink.onclick= function(){
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
    }
}

//动画方式返回到顶部：
//点击Go 的话让它消失后再滚动 
//总时间(duration)：500ms;
//频率： 多长时间走一步， 10ms
//总距离(target): 当前的位置（当前的scrollTop的值- 目标的位置(0))
//步长(step): 每一次走的距离 （target/duration）=每一秒走的步长，但是每10秒走一次，所以实际步长就是 target/duration）*定时器执行的秒数
function goLink2(ele){
    // 需求: 返回顶部的开始GO ,在第一屏展示的时候默认是隐藏的，scrollTop 值大于第一屏得高度后才展示。只要浏览器里面的
    // 滚动条在滚动，我们就需要判断Go的显示还是隐藏
    // 浏览器滚动条发生滚动的方式有：鼠标滚轮，拖动滚动条，键盘上下键或者pageDown/pageUp,点击滚动条空白处或者是上下箭头（自主操作的行为）...
    // 还可以用js 控制scrollTop的值实现滚动条的滚动
        function setDisplay(ele){ //只要滚动条动了就会触发，不管怎操作的
            var curTop = document.documentElement.scrollTop|| document.body.scrollTop;
            var curHeight = document.documentElement.clientHeight|| document.body.clientHeight;
            ele.style.display= curTop>curHeight ? "block" : "none";
        }
    window.onscroll = function(){
        setDisplay(ele)
    }
    ele.onclick= function(){
        this.style.display="none"; // 只设置这一行，往后走的时候又触发了window.onscroll,我们需要取消掉
        window.onscroll = null;
        var duration = 500, interval = 10,target = document.documentElement.scrollTop||document.body.scrollTop;
        var step = (target/duration)*interval;
        var timer = window.setInterval(function(){
            var curTop = document.documentElement.scrollTop||document.body.scrollTop;
            if(curTop===0){
                window.clearInterval(timer);
                window.onscroll = function(){
                       setDisplay(ele)
                   }
                return;
            }
            curTop -= step;
            document.documentElement.scrollTop = curTop
            document.body.scrollTop= curTop
        },interval)
    }
}
goLink2(goLink)

