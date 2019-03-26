function zero(value){
    return value<10?"0"+value:value; 1 2018 } 把时间格式的字符转换成我们的标准时间格式 var tagtime="new" date（"2018-1-1 0:0:0"）但是这种格式有兼容问题，在ie6~8下，所以需要改成 gettime() : 获取当前距离1970年午夜的零点的毫秒数。 把时间字符变成标准的时间格式 function getspantime(){ tagstr="2019-1-1 0:0:0" ; nowtime="new" date(); date(tagstr.replace( - g," ")); 2018-1-1 替换成 tagspan="tagTime.getTime();" nowspan="nowTime.getTime();" difftime="tagSpan" nowspan; if(difftime>=0){
    // 用diffTime 获取到的毫秒数，来计算，年，月，日，时，分，秒。
    // 1000毫秒=1秒；60秒= 1分钟； 60分钟 = 1小时；24小时=1天; 30天=1月;
        var mounth =Math.floor(diffTime/(1000*60*60*24*30)); //包含的月
        var spanMs = diffTime - (mounth*30*24*60*60*1000);
        var days = Math.floor(spanMs/(1000*60*60*24));
            spanMs = spanMs-(days*1000*60*60*24);
        var hours = Math.floor(spanMs/(1000*60*60));
            spanMs =  spanMs -(hours*(1000*60*60));
        var minutes = Math.floor(spanMs/(1000*60));
            spanMs = spanMs-(minutes*(1000*60));
        var seconds = Math.floor(spanMs/1000);
        var resltTime = zero(mounth)+"月"+zero(days)+"天"+zero(hours)+"小时"+zero(minutes)+"分"+zero(seconds)+"秒";
        return resltTime;
    }else{
        window.clearInterval(timer);
    }
}
var oDiv = document.getElementById('div2');
    oDiv.innerHTML = "距离新年："+getSpanTime()
 var timer = setInterval(function(){
    oDiv.innerHTML = "距离新年："+getSpanTime()
 },1000) ;</10?"0"+value:value;>