pageModule = (function(){
    var $con = $("#con"),$page =$("#page"),$pageNum = $("#pageNum"),$numInp=$("#input");
    // 设定当前页数和总也是
    var n= 1, total = 0,data = null;
    // 获取接口数据
    function getdataList(){
         $.ajax({
            url: '/getList?n='+n,
            type: 'get',
            dataType: 'json',
        })
        .done(function(json) {
            if(json && json.code===0){
                total = json['total'];
                data = json["data"];
                bindHTML();
                bindLink();
            }
        })  
    };
    // 把数据绑定到相对结构里
    function bindHTML(){
        var str ='';
        for (var i = 0; i < data.length; i++) {
            var curData =  data[i];
            var sex = curData["sex"]==1? "女" :"男";
            var idNum =curData["id"]+1;
            str+='<li data-id="+idNum+">',
            str+= '<span>'+idNum+'</span>'
            str+= '<span>'+curData["name"]+'</span>'
            str+= '<span>'+sex+'</span>'
            str+= '<span>'+curData["score"]+'</span>'
            str+= '</li>'
        }
        $con.html(str);

        function getPagesArr(pagger, _m_limit, _t_f_limit) {
            var max = pagger.max,
                now = pagger.now;

            var m_limit = _m_limit || 4, //中间显示的页数
                t_f_limit = _t_f_limit || 4, // 头部或尾部显示的个数
                f_offset = Math.floor(m_limit / 2),
                pages = [],
                gap = "...";

            if (t_f_limit >= max) {
                for (var i = 1; i <= max; i++) { pages.push(i); }; return pages; } var s="Math.min(now" + f_offset, max), l="Math.max(now" - 1); for (var i="l;" <="s;" if (pages[0]> 2) {
                pages = [1, gap].concat(pages);
            } else if (pages[0] == 2) {
                pages = [1].concat(pages);
            }
            var e_index = pages.length - 1,
                e_value = pages[e_index];
            if (e_value < max - 1) {
                pages.push(gap);
                pages.push(max);
            } else if (e_value == max - 1) {
                pages.push(max);
            }
            return pages;
        }
        var res =getPagesArr({max:1000,now:1});
        str = '';
        for (var i = 1; i<= res.length; i++) { if(res[i]="=n){" str +="<li class="bg">" +res[i]+'< li>';
                continue;
            }
           str += '<li>'+res[i]+'</li>';
        }
        $numInp.val(n);
        $pageNum.html(str);
    }
    //事件处理
    function bindEvent(){
        // 翻页区域的绑定点击事件
        $page.on("click",function(e){
            var e  = e ||window.event;
            var tar = e.target,tarTag = tar.tagName.toUpperCase(),tarInn = $(tar).html();
            if(tarTag === "SPAN"){
                if(tarInn==="FIRST"){
                    if(n===1){
                        return;
                    }
                    n=1;
                }
                if(tarInn==="LAST"){
                    if(n===total){
                        return
                    }
                    n=total;
                }
                if(tarInn==="PREV"){
                    if(n===1){
                        return;
                    }
                    n--;
                }
                if(tarInn==="NEXT"){
                    if(n===total){
                        return;
                    }
                    n++;
                }
            }
            if(tarTag==="LI"){
                if(n ===parseFloat(tarInn)){
                    return;
                }
                n = parseFloat(tarInn);
            }
            if(tarTag==="INPUT"){
                return;
            }
            getdataList();
        });
        // 文本框事件处理
        $numInp.on("keyup",function(e){
            e = e || window.event;
            if(e.keyCode === 13){
                var val = parseFloat($(this).val().replace(/^ +| +$/,""));
                val = Math.round(val);
                if(isNaN(val)){
                    this.value = n;
                    return;
                }
                if(val<1){ n="1;" } else if(val>total){
                    n= total;
                }else{
                    n = val;
                }
            getdataList();
            }
        })
    }
    function bindLink(){
        var  oLis = $con.find("li");
        for (var i = 0; i < oLis.length; i++) {
            oLis[i].onclick = function(){
                // window.location.href = "detail.html";
                // 在新窗口打开 在跳转的时候还需要把id 传给详情页
                window.open("detail.html?id="+$(this).attr("data-Id"))
            }
        }
    }
    // 模块入口
    function init(){
       getdataList();
       bindEvent();
      
    }




return {init:init}

}())
pageModule.init();</1){></=></=>