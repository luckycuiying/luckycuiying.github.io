var searchModule = (function(){
    var $searchInp = $("#searchInp");
    var $searchBox =$("#searchBox");
    function bindHtml(){
        var searchKey = $searchInp.val();
        function callback(json){
            json = json["data"];
            var str ="";
            $.each(json, function(index, item) {
                if(index<=3){ str +="<li>" +item.name+'< li>';
                }
            });
            console.log(str)
            if(str.length===0){
                $searchBox.css("display","none");
                return;
            }
            $searchBox.html(str).stop().slideDown(100);
        }
        $.ajax({
            url: 'http://travel.qunar.com/api/mapsearch/raiders_suggest?q='+searchKey,
            type: 'get',
            dataType: 'jsonp',
            jsonp:"callback",
            success:callback
        })  
    }
    function init(){
        $searchInp.on("fous keyup ",function(){
            var val = $(this).val();
            if(val.length>0){
                bindHtml();
                return;
            }
            $searchBox.stop().slideUp(100);
        });
        $(document).on("click" ,function(e){
            var target = e.target, targetName =target.tagName.toUpperCase(),
            $tar = $(target);
            if(targetName==="LI"&& target.parentNode.id==="searchBox"){
                $searchInp.val($tar.html());
                $searchBox.stop().slideUp(100);
            }
            if(target.id==="searchInp"){
                return
            };
            $searchBox.stop().slideUp(100);
            
        })
    }
    return {
        init:init
    }
})();
searchModule.init();</=3){>