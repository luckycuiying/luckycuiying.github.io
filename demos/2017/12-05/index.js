//1, 将小写数组转化为大写的中文数字

var str = "20171205";
        var arr = ["零","壹","贰","叁","肆","伍","陆","柒","捌","玖"];
        str = str.replace(/\d/g,function(){
            // var num = arguments[0];
            // var str = arr[num];
            // return str
            return arr[arguments[0]]
            })
        // console.log(str)
//2, 获取一个字符串中出现次数最多的字符，并且获取出现的次数。
//1） 获取每一个字符出现的次数
var str= "qiongzesibian,chazhesiqin!meiyoubirengenggaodeshanmeiyoubijiaogengchangdelu.";
var obj ={};
str.replace(/[a-z]/gi,function(){
    var curVal = arguments[0];
    obj[curVal]>=1 ? obj[curVal]+=1 : obj[curVal] = 1;
});
//2）获取最多出现的次数 (假设法)
var maxNum = 0;
for(var key in obj){
    obj[key] > maxNum ? maxNum = obj[key] :null;
}

// //3) 把所有的符合出现maxNum 次数的都获取到。
var maxArr = [];
for(var key in obj){
    obj[key] === maxNum ? maxArr.push(key) :null;
}
// document.write("出现次数最多的字符是"+maxArr.toString()+"~出现了"+maxNum+"次")

// 3 模板引擎实现的初步原理
var str = "my name is{0}.my age is {1}. I come from {2}, I love {3} ~";
var arr = ["taotao","30","china","beijing"]
str = str.replace(/{(\d+)}/g,function(){
    //个里面的数字使用分组捕获到，
    console.dir(arguments[0]) //大正则捕获的内容
    console.log(arguments[1]) //第一个分组内容
    return arr[arguments[1]];
    //return arr[RegExp.$1] IE9以下不兼容
})
console.log(str)

//4 , 时间字符串替换
// "2017-12-05 13:10:00" --> "2017年12月05日 13时10分00秒"
var str = "2017-12-05 13:10:00";
var reg = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2})$/g;
var arr = ["2017","12","5","16","20","0"];

var resStr = "{0}年{1}月{2}日{3}时{4}分{5}秒";
var reg = /{(\d+)}/g
resStr = resStr.replace(reg,function(){
    var num = arguments[1],val = arr[num];
    val< 10 ? val= "0"+val : val;
    return val
})
console.log(resStr)



// 把一段英语的首字母字符转化成大写


// 6. https://www.google.co.jp/search?q=23&oq=jingd&aqs=hehjek&sourceid=chrome&ie=UTF-8 写一段js 
// 获取URL 中的各个参数并且保存为如下格式：
 var obj = {
    q :"23",
    oq:"jingd",
    oqs:"hehjek",
    ie:"UTF-8"
 }