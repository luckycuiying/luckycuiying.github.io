//要求输出今天是星期几
//定义一个星期字符串
$(function(){
    var str = "星期日,星期一,星期二,星期三,星期四,星期五,星期六";
    //创建一个日期对象
    var today = new Date();
    //使用today对象的getDay()方法 获取当前星期几的索引
    var week = today.getDay();
    //把字符串拆分成数组，分隔符要以字符串里面的分隔符一致
    var arr = str.split(","); //[星期日,星期一,星期二,星期三,星期四,星期五,星期六]
    console.log("今天是："+arr[week])
    // 用数组的reverse() 翻转数组
    var arr1 =arr.reverse(); //[星期六,星期五,星期四,星期三,星期二,星期一,星期日]
    
    //把数组转化为字符串 join() 方法
    var str2 = arr1.join("|") // 星期六|星期五|星期四|星期三|星期二|星期一|星期日
    console.log(str2)


  //简化版
  function reverseString(str){
    return str.split("").reverse().join("");
  }
})