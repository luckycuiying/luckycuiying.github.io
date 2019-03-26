function DianZan(){
    this._constructor();
}
DianZan.prototype={
    _constructor:function(){
        this.initDoms();
        this.initView();
        this.initEvent();
    },
    initDom:function(){
        this._$contents = $('.main_info_r');
        this._$likeBox = this._$contents.find('.like');
        this._$num = this._$likeBox.find('.num');
        this._$text = this._$num.text();
        this._addOne = this._$likeBox.find('.add_one')
    },
    initView:function(){
    },
    initEvent:function(){
        var self = this;
        self._$likeBox.click(function(e) {
           if(self._$likeBox.hasClass('selected')){
            return;
           }else{
            self.post();
           }
        });
    },
    
    post:function(){
        var self = this;

    }

   

}
var dianzan = new DianZan();

