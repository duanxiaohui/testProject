/**
 * 端午节制作
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-06-03 16:28:27
 */

(function () {
	if(!app.getUa.weixin && window.location.pathname.split('/')[4] == 'plaza'){
		$('html').addClass('plaza');
	}

	if(!app.getUa.weixin){
        $('.share_btn').on('tap', function () {
            $.ajax({
                url:'/operation/share.do?shareId=126&channel=' + window.location.pathname.split('/')[4],
                success: function () {
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
                                value: JSON.stringify({
                                    title: '我正在包个特殊的粽子给你，什么馅，绝对想不到！',
                                    content: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
                                    link: 'http://www.365rili.com/pages/bd/dragonboat/'+window.location.pathname.split('/')[4]+'/index.html',
                                    image: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
                                    isEvent: 'true'
                                })
                            }
                        ],
                        callBack: function (headers) {}
                    });
                }
            });
        });
	}

	$('.dw_first_btn').on('tap', function () {
		window.location.href = 'mak.html';
	})
})();