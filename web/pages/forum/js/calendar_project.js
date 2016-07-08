
var calendar_topic = {

	config: {
		focusData: []
	},

	init: function() {
		calendar_topic.checkIosVersion();

		calendar_topic.bindEvents();
		calendar_topic.checkFocus();
	},

	initUI: function() {
		if(!app.getUa.weixin) {
			$('body').removeClass('weixin');
		}
		else{
			$('.calendar_project_list').css('padding-bottom', '52px');
		}
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
		if(version >= 5.3) {
			$('.share_btn').show();
		} else {
			$('.share_btn').hide();
		}
	},

	checkFocus: function() {
		calendar_topic.config.focusData = window.data || [];
		calendar_topic.parseFocus();
	},

	parseFocus: function() {
		var o = null,
		    focusArr = calendar_topic.config.focusData;
		for(var i=0; i<focusArr.length; i++) {
			o = $('.focus_icon[data-id="' + focusArr[i] + '"]');
			if(o) {
				o.data('status', 'subscribe').addClass('on');
				o.next('p').text('已关注');
			}
		}
	},

	shareJump: function() {
		app.call({
        	action: 'share',
        	params: [
        		{
        			name: 'shareString',
        			value: JSON.stringify({
        				title: $('.calendar_project_top_header span').text(),
        				content: $('.calendar_project_info p').text(),
        				link: window.location.href,
        				image: $('.calendar_project_top_img img')[0].src,
        				isEvent: 'true'
        			})
        		}
        	],
        	callback: function(data) {}
        });
	},

	openCalendar: function(action, data) {
		if(!action) return false;
		data = data || {};

		app.open('coco://365rili.com/' + action + '?' + $.param(data), app.getUa.ios);
	},

	openCalendarInWeixin: function(calendarID) {
		if(app.getUa.ios){
			var cocoUrl = 'coco://365rili.com/subscribe?calendarID=' + calendarID + '&calendarType=public';
		}
		else{
			var cocoUrl = 'coco://365rili.com/subscribe?calendarID=' + calendarID;
		}

		window.location.href = cocoUrl;
	},

	bindEvents: function() {
		//分享
		$('.share_btn').on('click', function() {
			calendar_topic.shareJump();
		});
		//关注
		$('body').on('click', 'div.focus_icon', function() {
			var $focus = $(this),
				calendarId = $focus.data('id'),
				status = $focus.data('status') == 'unsubscribe' ? 'subscribe' : 'unsubscribe';

			showFocusLoading('.calendar_project_list');
			callCoCo(status, {calendarID: calendarId});
		});
		//进入下级
		$('.calendar_project_list').on('click', 'dl', function(event) {
			if($(event.target).is('.focus_icon')) return;

			var calendarId = $(this).data('id');

			if(app.getUa.weixin) {
				calendar_topic.openCalendarInWeixin(calendarId);
			} else {
				if(app.getUa.ios){
					calendar_topic.openCalendar('openCalendar', {calendarID: calendarId, calendarType: 'public'});
				}
				else{
					calendar_topic.openCalendar('openCalendar', {calendarID: calendarId});
				}
			}
		});
	}

};

$(document).ready(function() {
	setTimeout(function() {
		calendar_topic.init();
	}, 1000);
});

calendar_topic.initUI();

if(!app.getUa.weixin){
	app.call({
		action: 'howToBack',
		params: [{
			name: 'how',
			value: 'back'
		}],
		callback: function() {}
	});
}