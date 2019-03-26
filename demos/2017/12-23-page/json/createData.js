function getRandom(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var str = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤";
var str2 = "一二三四五六七八九壹贰叁肆伍陆柒捌玖拾";
console.log(str.length)
console.log(str2.lngth)

var ary = [];
for (var i = 0; i < 99; i++) {
    var obj = {};
    obj["id"] = i;
    obj["name"] = str[getRandom(0,71)]+str2[getRandom(0,17)]+str2[getRandom(0,17)];
    obj["sex"] = getRandom(0,1);
    obj["score"] = getRandom(50,99);
    ary.push(obj)
}

console.log(JSON.stringify(ary))