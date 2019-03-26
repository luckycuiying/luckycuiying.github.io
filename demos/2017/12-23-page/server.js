var http = require("http"),
    url = require('url'),
    fs = require("fs");
var server1 = http.createServer(function(req,res){
    var urlObj = url.parse(req.url,true),
        pathname = urlObj["pathname"],
        query = urlObj["query"];
    // 处理静态资源文件的请求
    var reg = /\.(HTML|JS|CSS|JSON|TXT|ICO|JPG|GIF|PNG|BMP|)/i;
    if(reg.test(pathname)){
        var suffix = reg.exec(pathname)[1].toUpperCase();
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
            res.writeHead(200,{'content-type':suffixMIME+';charset=utf-8;'});
            res.end(fs.readFileSync("."+pathname,"utf-8"));
        }catch(e){
            res.writeHead(404);
            response.end("request file is no find~")
        }
    }
    //API 里 数据的请求处理
    var data = JSON.parse(fs.readFileSync("./json/my.json","utf-8"));
    if(pathname==="/getList"){
        var n = query["n"],ary =[];
        for (var i = (n-1)*10; i <=n*10-1; i++) { if(i>data.length-1){
                break;
            }
            ary.push(data[i]);
        }
        console.log(ary)

        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify({
            code:0,
            msg:"成功",
            total:Math.ceil(data.length/10),
            data:ary
        }));
        return;
    }
    if(pathname==="/getInfo"){
        var myId = query["id"],
        obj=null;
        for (var i = 0; i < data.length; i++) {
            if(data[i]["id"]==myId){
                obj = data[i];
            }
        }
        var result = {
            code:1,
            msg:"学生不存在",
            data:null
        };
        if(obj){
            result={
                code:0,
                msg:"成功",
                data:obj
            }
        }
        res.writeHead(200,{'content-type':'application/json;charset=utf-8;'});
        res.end(JSON.stringify(result));
        return;
    }
    // 请求的接口不存在,返回404
    res.writeHead(404);
    res.end("request api url is not found~");
})
server1.listen(80,function(){
    console.log("server is  success, listening on 80 port!")
})</=n*10-1;>