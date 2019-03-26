// 获取需要绑定的数据(Ajax)
var jsonData = [
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描述描述描述描述描","img":"images/1.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描描述描述描","img":"images/2.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描描述描述描述描述描述","img":"images/3.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描描述描述","img":"images/4.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述述描述描述描述描述描述描述描述","img":"images/5.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描描述描述描述","img":"images/6.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述","img":"images/7.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描述","img":"images/8.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描述描述描述述描述","img":"images/9.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述描述描述描述描述描述","img":"images/1.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描描述描述描述描述描述描述描述述描述描述","img":"images/2.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描描述描描述描述描述","img":"images/3.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述描述描述述描述描述描述描述","img":"images/4.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描述描述描述述描述描述描述描述","img":"images/5.jpg"},
    {"title":"标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题标题","desc":"描述描述描述描描述描述描描述描述描述","img":"images/6.jpg"}
];
// ~function(){
//     var xhr = new XMLHttpRequest();
//     // 同步获取，可以避免浏览器的缓存问题，上一次获取来的数据，如果下一次地址没有变我们默认从本地缓存读取，不在去服务器请求
//     // url ? 问号后面的是参数集合，集合和集合用&符号分开？是是set=1 $weight = 80;
//     xhr.open('get','jsonData.txt?_'+Math.random(),false);
//     xhr.onreadystatechange = function(){
//         if(xhr.readyState ==4 && xhr.status ==200){
//             jsonData = xhr.responseText;
//         }
//     };
//      xhr.send(null) // 发送请求
// }();
var  oul = document.getElementById('news');
var imgList = oul.getElementsByTagName('img'); //数据还没做呢
~function(){
    var str = "";
    if(jsonData){
        for (var i = 0; i < jsonData.length; i++) {
            var curData = jsonData[i];
            str += '<li>';
            str += '<div><img src tureimg="'+ curData.img+'" alt></div>';
            str += '<div><h2>'+curData.title+'</h2><p>'+curData.desc+'</p></div>';
            str +='</li>'
        }
        oul.innerHTML = str;
    }
}()

//图片延迟加载  首先先实现单张图片延迟加载
function imgDelayLoad(curImg){ //??这个函数要被用多少次，jsonData.length
    //
    if(curImg.isLoad){
        return;
    }
    var tempImg = new Image();
    tempImg.src = curImg.getAttribute('tureImg'); //临时的图片就去加载真是的图片资源了
    tempImg.onload = function (){
        curImg.src = this.src; //说明已经加载成功了，我们这个图片的资源路径是有效的。
        curImg.style.display = 'block';
        tempImg = null;
    }
    curImg.isLoad = true; //只要你曾经加载过，不管是否成功我都没有必要去加载第二次了
}

//多张图片延迟加载
// 首先获取我们所有的图片集合
function allImgDelay(){
    for (var i = 0; i < imgList.length; i++) {
        var curImg = imgList[i];
        if (curImg.isLoad) continue; //优化 曾经加载过的图片就不需要再延迟加载了
         var browerBottomDisBodyTop = utils.win('clientHeight') + utils.win('scrollTop'); //浏览器底部距离body顶端
        var imgParentBottomDisBodyTop = utils.offset(curImg.parentNode).top + curImg.parentNode.offsetHeight;  //图片父亲容器底部距离body顶端
        if(browerBottomDisBodyTop > imgParentBottomDisBodyTop){ //判断这个图片是否已经出现在了浏览器的可视窗口内, 我们要判断img这个图片的parentNode
            imgDelayLoad(curImg); //分别多次调用单个图片延迟加载
            fadeIn(curImg); //淡入的方式
        }
    }
}
window.setTimeout(allImgDelay,1000);
window.onscroll = allImgDelay; //滚轮的时候也需要图片延迟加载
//处理多张
function fadeIn(curImg){ //淡入
    var duration = 1000; //这么长的时间间隔完成淡入效果
    var target = 1; //淡入效果变化的透明度区间，从0运动到1
    var interval = 10; //执行定时器的时间间隔
    var step = (target/duration)*interval; //每一次执行定时器需要加上的步长
    var timer = window.setInterval(function (){
        if(curOpacity >= target){ //说明已经运动到了终点，停止定时器
            window.clearInterval(timer);
            //赋值终点的动作 把target的值赋值给当前元素的样式
            return;
        };
        var curOpacity = utils.getCss(curImg,'opacity'); //赋值之前需要先获取，因为要在当前的基础上去累加步长
        curOpacity += step;

        curImg.style.opacity = curOpacity; //把已经累加好的重新赋值给样式这样才能有每次淡入一点的效果
        curImg.style.filter = 'alpha(opacity='+ curOpacity*100+ ')'; //兼容问题的处理

    },interval);
    }
