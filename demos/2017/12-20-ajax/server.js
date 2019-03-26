var http = require("http"),
fs = require('fs'),
url = require("url");// URL 模块中提供了一个方法 url.parse()用来解析url 地址的。
// http
// http.createServer: 创建一个服务，变量server 就是我们创建出来的那个服务
// server.listen: 为这个服务器监听一个端口 80
var server = http.createServer(function(request,response){
    // 当客户端向服务器端的当前服务(端口号80这个服务)发送一个请求，并且当前服务已经成功接收到这个请求后执行的回调函数
    // request(请求)：存放的是所有客户端的请求信息，包含客户端通过问号传参数的方式传递给服务器的数据内容
    //request.url:存放的是客户端请求文件资源的目录和名称以及传递给服务器的数据
    //例如：客户端请求的地址：localhost/index.html?name=lisi&age=23
    //通过服务器端request.url 获取到的是：/index.html?name=lisi&age=23
var urlObj = url.parse(request.url,true),
    pathname = urlObj["pathname"],
    query = urlObj["query"];
        //根据请求的URl地址(具体的是根据地址中的pathname)获取到对应资源文件中的源代码
        //fs.readFileSync([path+name],[encode]):同步读取指定文件中的内容(同步读取：文件中的内容读取不完不执行下面的操作，只有读取出来才会执行后续的操作) 
    //处理静态资源文件的请求(html/css/js...) =>"前端路由"
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO|JPG|GIF|PNG|BMP|)/i;
    if(reg.test(pathname)){
        // 获取请求文件的后缀名
        var suffix = reg.exec(pathname)[1].toUpperCase();
        // 根据请求文件的后缀名获取到当前文件的MIME类型
        var suffixMIME = "test/plain";
        switch(suffix){
            case "HTML":
            suffixMIME ="text/html";
            break;
            case "CSS":
            suffixMIME ="text/css";
            break;
            case "JS":
            suffixMIME ="text/javascript";
            break;
            case "JSON":
            suffixMIME ="application/json";
            break;
            case "TXT":
            suffixMIME ="text/plain";
            break;
            case "JPG":
            suffixMIME ="image/jpeg";
            break;
            case "ICO":
            suffixMIME ="image/x-icon";
            break;
            case "GIF":
            suffixMIME ="image/gif";
            break;
            case "PNG":
            suffixMIME ="image/png";
            break;
            case "BMP":
            suffixMIME ="image/x-ms-bmp";
            break;
        }
        try{
                var conFile = fs.readFileSync("."+pathname,"utf-8");
                //重写响应头信息：告诉客户端浏览器我返回的内容是什么样的MIME类型
                response.writeHead(200,{'content-type':suffixMIME+';charset=utf-8;'})
                // response(响应)：提供客户端返回内容和数据的方法
                // response.write:向客户端返回内容
                // response.end():告诉服务器响应结束了(一定要加)
                    response.write(conFile);
                    response.end();
                }catch(e){
                    response.writeHead(404,{'content-type':suffixMIME+';charset=utf-8;'})

                    response.end("request file is no find~")
                }

    }
        
});

 server.listen(80,function(){
    // 当端口号监听成功之后执行
    console.log("server is create sucess,listening on 80 port");
 })
