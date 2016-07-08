/**
 * movie
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-04-15 11:14:33
 */

(function () {
	if(app.getUa.weixin){
		$('.gdyp').attr('href', 'http://www.365rili.com/c/NzZhNTkyZTAtMTdjMC00ZGQ0LThmODQtNmNjMjdlNTM0NWNl?from=singlemessage&isappinstalled=1');

		wxProtocol.init({
			title: '吐血推荐北京电影节最全观影攻略',
			desc: '365日历-北京电影节超经典大片观影攻略',
            link: 'http://www.365rili.com/pages/bd/movie/wx/index.html',
			imgUrl: 'http://www.365rili.com/pages/bd/movie/images/wx.jpg'
		});
	}
	else{
        if(app.getUa.android){
            $('.gdyp').hide();
        }
		$('.gdyp').on('click', function () {
			app.open(
                {
                    ios:'coco://365rili.com/subscribe?calendarID=125821939&calendarType=public',
                    android:'coco://365rili.com/subscribe?calendarID=125821939'
                },
                app.getUa.ios
            );
		})
		$('<img src="/pages/bd/movie/images/share.gif" class="share" alt="" />').on('click', function () {
			$.ajax({
                url:'http://www.365rili.com/tmpmessage/shared.do',
                data:{
                    id: '43',
                    target: '.'
                },
                success: function (datas) {
                    if(datas.state != 'ok'){
                        return false;
                    }
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
			        			value: JSON.stringify({
			        				title: '吐血推荐北京电影节最全观影攻略',
			        				content: '365日历-北京电影节超经典大片观影攻略',
			        				link: 'http://www.365rili.com/pages/bd/movie/wx/index.html',
			        				image: 'http://www.365rili.com/pages/bd/movie/images/wx.jpg',
			        				isEvent: 'true'
			        			})
                            }
                        ],
                        callBack: function (headers) {}
                    });
                },
                error: function () {

                }
            });
		}).appendTo('.footer');
	}
})();