/**
 * schedule_project
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-01-28 14:06:23
 */


var calendar_topic = {
	version: 0,
	init: function() {
		calendar_topic.checkIosVersion();
		try {
			AliansBridge.howToBack('back');
		} catch(e) {

		}
		if(calendar_topic.version < 5.2 && app.getUa.ios && !app.getUa.weixin){
			$('.remind_div, .js-subscribe').hide();
		}
		$('.js-other').on('click', function () {
			var title = $(this).data('title') || $(this).html();
			window.location.href = 'http://www.365rili.com/pages/forum/schedule_project/iframePage.html?url=' + encodeURIComponent(this.href) + '&title=' + encodeURIComponent(title);
			return false;
		});

		$('.js-jumpToCalendar').on('click', function () {
			var _this = $(this);
			var url = _this.data('url');
			var cid = _this.data('cid');
			if(app.getUa.weixin){
				window.location.href = url;
			}
			else{
				app.open(
	                {
	                    ios:'coco://365rili.com/openCalendar?calendarID='+cid,
	                    android:'coco://365rili.com/openCalendar?calendarID='+cid
	                },
	                app.getUa.ios,
	                function () {
	                	window.location.href = url;
	                }
	            );
			}
		});

		$('.remind_div, .js-subscribe').on('click', function () {
			var _this = $(this);
			var uuid = _this.data('uuid');
			var cid = _this.data('cid');

			app.open(
				{
					ios:'coco52://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid+'&action=alarm',
					android:'coco://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid+'&action=alarm'
				},
				app.getUa.ios,
				null
			);
		});
		$('.remind_div, .js-detail').on('click', function () {
			var _this = $(this);
			var uuid = _this.data('uuid');
			var cid = _this.data('cid');

			app.open(
				{
					ios:'coco52://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid,
					android:'coco://365rili.com/schedule?scheduleUuid='+uuid+'&cid='+cid
				},
				app.getUa.ios,
				null
			);
		});
	}, 

	checkIosVersion: function() {
		var sUserAgent = navigator.userAgent.toLowerCase();
		if(app.getUa.ios) {
			var len = sUserAgent.length,
				index = sUserAgent.indexOf('ios-coco');
			if(index > -1) {
				var s = sUserAgent.substring(index, len),
					arr = s.split('|');

				calendar_topic.parseVersion(arr);
			} else {
				$('.share_btn').hide();
			}
		} else {
			var len = sUserAgent.length,
				index = sUserAgent.indexOf('android-coco');

			if(index > -1) {
				var s = sUserAgent.substring(index, len),
					arr = s.split('|');

				calendar_topic.parseVersion(arr);
			} else {
				$('.share_btn').hide();
			}
		}
	},

	parseVersion: function(arr) {
		var version = 0;
		$.each(arr, function(k, v) {
			if(/5\./i.test(v)) {
				version = parseFloat(v);
				return
			}
		});
		calendar_topic.version = version;
		if(version >= 5.3) {
			$('.share_btn').show();
		} else {
			$('.share_btn').hide();
		}
	}

};

calendar_topic.init();