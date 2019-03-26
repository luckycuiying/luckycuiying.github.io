function ChangeTab(){
  this._constructor();
}
ChangeTab.prototype={
    _constructor:function(){
        this.initDoms();
        this.initEvents();
    },
    initDoms:function(){
        this.$content = $('#lineTab');
        this.$tabItem = this.$content.find('.tabItem > a');
        this.$divBox = this.$content.find('.tabCt')
        this.$imgBox = this.$divBox.find('.item')
    },
    initEvents:function(){
        var self = this;
        self.$tabItem.mouseover(function(e) {
            $(this).addClass('active').siblings().removeClass('active');
            if($(this).hasClass('hotLine')){
                indexNum = 0
            }else{
                indexNum =1
            }
            self.$divBox.eq(indexNum).addClass('current').siblings().removeClass('current');
        });

        self.$imgBox.mouseover(function(event) {
            var eleC = $(this).closest('.group2');
            // console.log(eleC.length);
            // console.log(typeof(length))
            if(eleC.length == 1){
                return false;
            }
            $(this).addClass('current').siblings().removeClass('current');
        });
    }

}
var tab = new ChangeTab()