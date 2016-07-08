/**
 * movie
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-04-15 11:14:33
 */

(function () {
	if(app.getUa.weixin){
        wxProtocol.init(function (wx, link) {
            wx.onMenuShareAppMessage({
                title: '365日历四川电视节全程攻略',
                desc: '电影节日程、分会场信息、评委阵容...365日历带你玩转四川电视节！',
                imgUrl: 'http://www.365rili.com/pages/bd/tv_sc/images/wx.jpg'
            });
            wx.onMenuShareTimeline({
                title: '365日历四川电视节全程攻略',
                imgUrl: 'http://www.365rili.com/pages/bd/tv_sc/images/wx.jpg'
            });
        });
	}
	else{
		$('<img src="/pages/bd/tv_sc/images/share.png" class="share" alt="" />').on('tap', function () {
            app.call({
                action: 'share',
                params: [
                    {
                        name: 'shareString',
                        value: JSON.stringify({
                            title: '365日历四川电视节全程攻略',
                            content: '电影节日程、分会场信息、评委阵容...365日历带你玩转四川电视节！',
                            link: 'http://www.365rili.com/pages/bd/tv_sc/index.html',
                            image: 'http://www.365rili.com/pages/bd/tv_sc/images/wx.jpg',
                            isEvent: 'true'
                        })
                    }
                ],
                callBack: function (headers) {}
            });
		}).appendTo('.footer');
	}
})();