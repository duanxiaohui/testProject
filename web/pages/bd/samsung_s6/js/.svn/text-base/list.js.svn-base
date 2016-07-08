/**
 * list
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-03-05 18:03:16
 */

(function () {
	/**
	 * 脚部
	 */
	footer.init({
		type: 'personalSchedule'
	});

	/**
	 * 检测授权状态
	 */
	$.ajax({
		url: 'http://www.365rili.com/coco/getRecommendCalendars.do',
		dataType: 'json',
		success: function (data) {
			if(data.state == 'wrongpass'){
				return setUrl(false);
			}
			setUrl(true);
		}
	});

	/**
	 * 设置url
	 */
	function setUrl (isLogin) {
		var links = $('.list a');
		if(isLogin){
			for (var i = 0; i < links.length; i++) {
				links[i].href = links[i].getAttribute('data-href');
			};
		}
		else{
			for (var i = 0; i < links.length; i++) {
				// links[i].href = "http://www.365rili.com/wx/login.do?redURL=" + encodeURIComponent(links[i].getAttribute('data-href'));
				links[i].click(function(){
					$(".list_div").addClass("none");
					$(".noLogin").removeClass("none");
				})
			};
		}
	}

	if(app.getUa.weixin){
		var pid = getURLParameter(pid);
	}



	function getURLParameter(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	}
	/**
	 * 微信分享
	 */
	wxProtocol.init({
		imgUrl: 'http://www.365rili.com/pages/bd/holiday_38/images/wxl.jpg',
		title: '魅“历”女生节，魅力任性送！',
		desc: '8款大牌美妆产品任性送！这个女生节，一起美美的！'
	});
})();