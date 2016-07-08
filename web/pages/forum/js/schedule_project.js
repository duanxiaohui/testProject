
var schedule_topic = {

	init: function() {
		/*
		try {
			AliansBridge.howToBack('back');
		} catch(e) {

		}
		*/
		app.call({
			action: 'howToBack',
			params: [{
				name: 'how',
				value: 'back'
			}],
			callback: function() {}
		});
		schedule_topic.initUI();
		schedule_topic.checkRemind();
		schedule_topic.bindEvents();
	},

	initUI: function() {
		/*
		var $schedule_project_list = $('.schedule_project_list');
		
		if(app.getUa.weixin) {
			$schedule_project_list.addClass('wenxin');
		} else {
			$schedule_project_list.removeClass('wenxin');
		}
		*/
	},

	shareJump: function() {
		app.call({
        	action: 'share',
        	params: [
        		{
        			name: 'shareString',
        			value: JSON.stringify({
        				title: '【日程专题】',
        				content: $('.calendar_project_info p').text(),
        				link: window.location.href,
        				image: $('#bkImg').attr('src'),
        				isEvent: 'true'
        			})
        		}
        	],
        	callback: function(data) {}
        });
	},

	checkRemind: function() {

	},

	bindEvents: function() {
		$('.share_btn').on('click', function() {
			//alert('nicky');
			schedule_topic.shareJump();
		});
		//提醒
		$('body').on('click', '.schedule_list_div dt', function() {
			/*
			var $remind = $(this),
				calendarId = $remind.data('id'),
				scheduleUuid = $remind.data('uuid'),
				status = $remind.data('status') == 'unsubscribe' ? 'subscribe' : 'unsubscribe';

			showFocusLoading('.calendar_project_list');
			callCoCo(status, {calendarID: calendarId, scheduleUUID: scheduleUuid});
			*/
		});
		//进入下级
		$('.schedule_list_div').on('click', 'dd', function(event) {
			if($(event.target).is('.schedule_list_div dt')) return;
			//window.location.href = 'http://' + 'www.baidu.com';
		});
	}

};

$(document).ready(function() {
	setTimeout(function() {
		schedule_topic.init();
	}, 1000);
});