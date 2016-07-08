/**
 * build
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-03-05 19:05:59
 */

(function () {
	/**
	 * 脚部
	 */
	footer.init({
		type: 'personalSchedule'
	});
	
	var id = getURLParameter('id');
	var ps = {
		1: 'BOBBI BROWN 眼线膏',
		2: 'DIOR润唇膏',
		3:'欧舒丹护手霜',
		4:'兰芝BB霜',
		5:'倩碧眼霜',
		6:'兰蔻柔肤水',
		7:'圣罗兰睫毛膏',
		8:'贝玲妃腮红'
	};

	/**
	 * 设置图片
	 */
	$('.info').html('<img src="http://www.365rili.com/pages/bd/holiday_38/images/pi' + id + '.jpg" alt="">')

	/**
	 * 分享提示
	 */
	$('.tipBox').css({
		height: $(window).height() + 'px'
	})
	$('.control').on('tap', function () {
		$('.tipBox').fadeIn('fast');
	});
	$('.tipBox').on('tap', function () {
		$('.tipBox').fadeOut('fast');
	});

	/**
	 * 创建订单
	 */
	function createZ () {
		$.ajax({
	    	url: 'http://www.365rili.com/women/shareCallback.do?shareId=' + shareId,
	    	dataType: 'json',
	    	success: function (data) {
	    		if(data.state !== 'ok'){
	    			alert('您的求赞创建失败，请重新尝试分享！');
	    		}
	    		window.location.href = 'http://www.365rili.com/women/show.do?shareId=' + shareId
	    	}
	    })
	}

	/**
	 * 微信分享
	 */
	wxProtocol.init(function (wx, link) {
		wx.onMenuShareAppMessage({
	        title: '我要免费得' + ps[id] + '，快来帮帮忙！',
	        desc: '8款大牌美妆产品任性送！这个女生节，一起美美的！',
	        link: 'http://www.365rili.com/women/show.do?shareId=' + shareId,
	        imgUrl: 'http://www.365rili.com/pages/bd/holiday_38/images/wx' + id + '.jpg',
	        success: createZ
	    });
	    wx.onMenuShareTimeline({
	        title: '我要免费得' + ps[id] + '，快来帮帮忙！8款大牌美妆产品任性送！这个女生节，一起美美的！',
	        link: 'http://www.365rili.com/women/show.do?shareId=' + shareId,
	        imgUrl: 'http://www.365rili.com/pages/bd/holiday_38/images/wx' + id + '.jpg',
	        success: createZ
	    });
	});

	function getURLParameter(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
})();