~function(){
    //->getXHR:创建AJAX对象(使用惰性思想进行封装,兼容所有的浏览器的)
    var getXHR = function () {
        var flag = false, xhr = null, ary = [function () {
            return new XMLHttpRequest;
        }, function () {
            return new ActiveXObject("Microsoft.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml2.XMLHTTP");
        }, function () {
            return new ActiveXObject("Msxml3.XMLHTTP");
        }];
        for (var i = 0, len = ary.length; i < len; i++) {
            var temp = ary[i];
            try {
                xhr = temp();
                getXHR = temp;
                flag = true;
                break;
            } catch (e) {

            }
        }
        if (!flag) {
            throw new Error("your browser is not support ajax~");
        }
        return xhr;
    };
    var sendAJAX = function (options) {
        //->参数初始化
        var _default = {
            url: "", //请求的地址
            type: "get", // 请求方式
            dataType:"json" , // 设置请求回来的内容格式
            async: true,  // 同步异步
            data: null, // 放在求情主体中的内容
            success: null // 当ready state ===4 的时候执行的回调方法
            getHead: null  //当ready state ===2 的时候执行的回调方法
        };
        // 用传递进来的参数，替换初始化参数
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                _default[key] = options[key];
            }
        }

        //->发送请求
        var xhr = getXHR();
        if (_default["type"].toLowerCase() === "get") {
            //->GET请求还需要在URL的末尾追加随机数
            var suffix = _default["url"].indexOf("?") > -1 ? "&" : "?";
            _default["url"] += suffix + "_=" + Math.random();
        }
        xhr.open(_default["type"], _default["url"], _default["async"]);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
                var data = "JSON" in window ? JSON.parse(xhr.responseText) : eval("(" + xhr.responseText + ")");
                _default["success"] && _default["success"](data);
            }
        };
        xhr.send(_default["data"]);
    };

    window.sendAJAX = sendAJAX;




}()