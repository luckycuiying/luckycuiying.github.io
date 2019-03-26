var cookieRender = function(){
    // 设置
    function setValue(options){
        var defaultSate ={
            name:null,
            value:null,
            expires: new Date(new Date().getTime()+(1000*60*60*24)),
            path:'/',
            domain:''
        };
        for (var key in options) {
            if(options.hasOwnProperty(key)){
                defaultSate[key] = options[key]
            }
        }
        document.cookie = defaultSate.name+'='+escape(defaultSate.value)+";expires="+defaultSate.expires.toGMTString()+";path="+defaultSate.path+
        ";domian="+defaultSate.domain;
    };
    //获取
    function getValue(name){
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        if(arr!=null){
            return unescape(arr[2]);
        }
        return null;
    }
    // 删除
    function removeValue(options){
        var defaultSate ={
            name:null,
            path:'/',
            domain:''
        };
        for (var key in options) {
            if(options.hasOwnProperty(key)){
                defaultSate[key] = options[key]
            }
        };
        if(getValue(defaultSate.name)){
            document.cookie = defaultSate.name+"= ;expires=Fir,02-Jan-1979 00:00:00 GMT ;path="+defaultSate.path+
            ";domian="+defaultSate.domain;
        }
    }
    return {
        set:setValue,
        get:getValue,
        remove:removeValue
    }
}()