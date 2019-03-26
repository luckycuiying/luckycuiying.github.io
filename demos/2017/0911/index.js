function Tabfiler(){
    this._constructor();
}
Tabfiler.prototype={
    _constructor:function(){
        this.initDoms();
        this.initEvents();
    },
    initDoms:function(){
        this._jsWanttogo = $('#js_wanttogo');
        this._tagbox = this._jsWanttogo.find('.tagbox');
        this._ctListItem = this._jsWanttogo.find('.ct .list_item');
        this._imgbox = this._ctListItem.find('.item');
    },
    initEvents:function(){
        var self = this;
        self._imgbox.delegate('.imgbox', 'mouseenter', function(event) {
            var d_height = $(this).find('.t').height()+$(this).find('.c').height();
            var d_txt = $(this).find('.txt');
            $(this).find('.t').css({color:'#000'});
            d_txt.css({background:'#fff'})
            d_txt.animate({height: d_height, opacity: .8}, '300',function(){
                $(this).find('.c').show();
                $(this).find('.t').css({color:'#000'});
                $(this).css({background:'#fff'});
            })
        });
        self._imgbox.delegate('.imgbox', 'mouseleave', function(event) {
            var d_txt = $(this).find('.txt');
            d_txt.animate({height: 30, opacity:'0'}, '300',function(){
                $(this).find('.t').css({color:'#fff'});
                $(this).find('.c').hide();
                $(this).removeAttr('style');
            })
        });

        self._tagbox.delegate('.item', 'click', function(event) {
           $(this).addClass('current').siblings('.item').removeClass('current');
           var currentIndex = $(this).index();
           self._ctListItem.find(`.item:eq(${currentIndex})`).addClass('current').siblings('.item').removeClass('current');
        });


    }

}
var currentTab = new Tabfiler();
