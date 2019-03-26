function TabCalendar(){
    this._cachedData = {};
    this._constructor();
}
TabCalendar.prototype={
    _constructor:function(){
        this.initDoms();
        this.initEvents();
        this._js_calendar.find('.item').eq(new Date().getMonth()).click();
    },
    initDoms:function(){
        this._js_calendar = $('#js_calendar');
        this._baseDom = this._js_calendar.find('.imglistbox');
        this._tagbox = this._js_calendar.find('.tagbox');
    },
    fetchData:function(m_month){
        var self = this;
        $.ajax({
            url: '//travel.qunar.com/place/api/calendar/dests?month=' + m_month,
            type: 'get',
            dataType: 'jsonp',
            data: {}
        })
        .done(function(json) {
            // console.log('fetchData  this', this)
          self.renderView(json, m_month);
        })
        .fail(function() {
            console.log("error");
        })
    },
    renderView:function(json, m_month){
        var self = this;
        if(json && json.data){
            var d = json.data;
            var dataList=['<ul class="list_item current clrfix">']
            for (var i = 0; i < d.length; i++) {
                var dest = d[i];
                dataList.push(`<li class="item">`,
                    `<a href="${dest.destUrl}" class="img"><img src="${dest.destBasicInfo.image}" alt="${dest.destName}" width="235" height="175"></a>`,
                    `<div class="titbox clrfix">`,
                        `<a href="${dest.destUrl}" class="tit">${dest.destName}</a>`,
                        `<span class="area">${dest.superiorName}</span>`,
                    `</div>`,
                    '</li>'
                )
            }
            dataList.push('</ul>');
            let htmlStr = dataList.join('');
            this._baseDom.html(htmlStr);
            this._cachedData[m_month]=htmlStr;
        }
    },
    showPanel:function(m_month){
        // console.log('showPane this', this)
        var monthData = this._cachedData[m_month];
        if(monthData){
            this._baseDom.html(monthData);
        }else {
            this.fetchData(m_month);
        }

    },
    initEvents:function(m_month){
        var self = this;
        self._tagbox.delegate('.item', 'click', function(event) {
           $(this).addClass('current').siblings('.item').removeClass('current');
           var currentIndex = $(this).index();
           var m_month = currentIndex+1;
           self.showPanel(m_month);
           // console.log('item click this', this)
        });
    },
}
var currentMonth = window.tabInstance = new TabCalendar();
