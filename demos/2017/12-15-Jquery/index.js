function tabChange($box){
    var $ul = $box.children('ul'),$lis = $ul.children('li');
    $lis.on("click",function(){
        var curIndex = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        // $(this).parent().nextAll().each(function(index,item){
        //     index === curIndex ? $(item).addClass('select'):$(item).removeClass('select');
        // })
        $(this).parent().nextAll().eq(curIndex).addClass('select').siblings().removeClass('select');
    })
}
$(".box").each(function(){
    tabChange($(this));
})
