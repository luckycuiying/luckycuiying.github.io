
    var obj = [{
        id: 0,
        chiild: [{
            msg: '1111'
        }, {
            msg: '2222'
        }]
    }, {
        id: 1,
        chiild: [{
            msg: '3333'
        }, {
            msg: '4444'
        }]
    }]
    //拼接字符串方法, o 是形参
    function renderItem(o) {
        return `<li>第${o.idx}组，${o.m}</li>`
    }
    // 声明一个空数组
    var htmlArr = [];
    //分析数据 obj是数组所以可以使用for 查询，
    for (var i = 0; i < obj.length; i++) {
        // m值则是对象
        var m = obj[i];
        // 对象取值
        var ch = m.chiild;
        // ch 的值有是数据，所以又可以用for 查询，
        for (var j = 0; j < ch.length; j++) {
            // htmlArr 是数组所以可以用.push()方法塞数据
            htmlArr.push(
                // 把renderItem方法返回的结果作为push 的参数塞到到htmlArr数组里
                renderItem(
                    // 把对象作为参数传给renderItem()
                {
                idx: i,
                m: ch[j].msg
            }));
        }
    }
var box = document.getElementById('box');
box.innerHTML=htmlArr.join('')

