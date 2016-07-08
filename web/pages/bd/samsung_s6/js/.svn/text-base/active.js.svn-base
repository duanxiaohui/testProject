/**
 * active
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-03-06 11:03:09
 */

/**
var isLogin = parseInt('<%=isLogin%>');
var likeCount = parseInt('<%=likeCount%>');
var shareId = parseInt('<%=shareId%>');
var isLike = parseInt('<%=isLike%>');
var id = parseInt('<%=giftId%>');
 */
(function () {
	/**
	 * 脚部
	 */
	footer.init({
		type: 'personalSchedule'
	});
	
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
	 * 点赞
	 */
	if(isLike){
		$('.score').addClass('has');
	}
	else{
		$('.score').on('tap', function () {
			var o = $('.score span');
			if(isLogin){
				$.ajax({
					url: 'http://www.365rili.com/women/like.do?shareId=' + shareId,
					dataType: 'json',
					success: function (data) {
						if(data.state !== 'ok'){
			    			alert('您的红心传递失败，请重新尝试给红心！');
			    		}
			    		$('.score').addClass('has').off('tap');
			    		addScore(o);
			    		o.html(likeCount + 1);
			    		setTimeout(function(){
			    			window.location.reload()
			    		},500) 
					}
				})
			}
			else{
				window.location.href = "http://www.365rili.com/wx/login.do?redURL=" + encodeURIComponent(window.location.href);
			}
		});
	}

	function addScore (o){
		var shadow = o.clone();
		var pos = o.position();
		shadow.addClass('cloneScore bounceOut animated').css({
			left: pos.left + 'px',
			top: pos.top + 'px'
		}).appendTo('body');
	}

	/**
	 * 微信分享
	 */
	wxProtocol.init(function (wx, link) {
		wx.onMenuShareAppMessage({
	        title: '我要免费得' + ps[id] + '，快来帮帮忙！',
	        desc: '8款大牌美妆产品任性送！这个女生节，一起美美的！',
	        link: 'http://www.365rili.com/women/show.do?shareId=' + shareId,
	        imgUrl: 'http://www.365rili.com/pages/bd/holiday_38/images/wx' + id + '.jpg'
	    });
	    wx.onMenuShareTimeline({
	        title: '我要免费得' + ps[id] + '，快来帮帮忙！8款大牌美妆产品任性送！这个女生节，一起美美的！',
	        link: 'http://www.365rili.com/women/show.do?shareId=' + shareId,
	        imgUrl: 'http://www.365rili.com/pages/bd/holiday_38/images/wx' + id + '.jpg'
	    });
	});
})();