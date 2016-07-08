define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol'
], function(c, calendarProtocol) {
	var self = {};
	//pub message
	function pubScheduleCreated(data){
		amplify.publish('scheduleCreated', data);
	}
	function pubAlarmChanged(){
		amplify.publish('alarmChanged');
	}
	self.showForm = function(sid){
		//显示ScheduleCopy时候先关闭Tips
		$(".schedule_set_layer").hide("fade");
		$(".schedule_layer").removeData("lastTip").hide("fade");

		//init schedule copy
		if($("#schedule_copy_container").length == 0){
			$("body").append('<div id="schedule_copy_container" class="copy_schedule_layer ui-shadow ui-draggable none"></div>');
		}
		$("#schedule_copy_container").scheduleCopy({
			sid:sid
		});
	}


	$.widget('mxx.scheduleCopy', {
		options: {},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var tmpl = '<a href="javascript:;" class="close_btn js_close"></a><h2>复制日程到</h2>' +
				'<div class="calendar_list_container e_clear"></div>' +
				'<div class="schedule_bottom"><a href="javascript:;" class="js_save" sid="{sid}">保存</a></div>';
			$elem.html(tmpl).position({
				collision: 'fit',
				of: 'body',
				at: 'left top',
				my: 'center top'
			});
			$elem.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85
			});
			$elem.find('a.js_close').click(function() {
				$elem.hide('fade');
			});

			$elem.find('a.js_save').click(function() {
				if ($elem.find('.calendar_list_row input:checked').length == 0) {
					$.alert('您没有选择目标日历！');
					return;
				}
				$elem.find('.calendar_list_row input').each(function() {
					if ($(this).prop("checked")) {
						self._copySchedule($(this).attr("cld"));
					}
				});
			});
		},
		_init: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			$.ajax({
				url: '/schedule/getRawScheduleByIdV2.do',
				type: 'post',
				data: {
					scheduleId: opt.sid
				},
				success: function(data) {
					if (data.state == 'wrongpass') {
						$.alert('对不起，您的登录已经过期，请重新登录！', {
							buttons: {
								'确定': function() {
									location = '/account/login.do';
								}
							}
						});
					} else {
						var dateRange = calendarProtocol.getDateRange();
						var startTime = new Date(data.startTime);
						var repeatStopTime = new Date(data.repeatStopTime);
						var postData = {
							schTitle: c.htmlDecode(data.title),
							alldayEvent: data.allDayEvent,
							calendarId: 0,
							startTime: [c.formatDate(startTime), ' ', ('0' + startTime.getHours()).slice(-2), ":", ('0' + startTime.getMinutes()).slice(-2), ":00"].join(""),
							timeZone: -(new Date()).getTimezoneOffset() / 60,
							repeatType: data.repeatType,
							calendarType: data.calendarType,
							before_minutes: data.alarm,
							fromDate: dateRange.from,
							toDate: dateRange.to,
							duration: data.duration,
							repeatCount: data.repeatCount == 0 ? '' : data.repeatCount,
							repeatDay: data.repeatDay,
							repeatFrequency: data.repeatFrequency == 0 ? '' : data.repeatFrequency,
							repeatMonth: data.repeatMonth,
							repeatMonthDay: data.repeatMonthDay,
							repeatStopTime: [c.formatDate(repeatStopTime), ' ', ('0' + repeatStopTime.getHours()).slice(-2), ":", ('0' + repeatStopTime.getMinutes()).slice(-2), ":00"].join(""),
							scheduleId: '',
							linked_url: data.url,
							location: data.location
						};
						//判断description
						if (data.description !== null && data.description !== '' && Object.prototype.toString.call(data.description) !== '[object Undefined]') {
							postData['description'] = data.description;
						}
						for (var i in postData) {
							if (postData[i] == null) {
								postData[i] = "";
							}
						}
						self.postData = postData;
						var cldNameAry = calendarProtocol.getAllCalendarNames(true);
						$elem.find(".calendar_list_container").html($.map(cldNameAry, function(o, i) {
							if (o.id == data.calendarId)
								return "";
							return "<div class='calendar_list_row'><input type='checkbox' cld='" + o.id + "'/><span>" + o.name + "</span></div>";
						}).join(""));
						$elem.show();

						//get pics
						$.ajax({
							url: "/schedule/getpics.do",
							type: "post",
							dataType: "json",
							data: {
								calendarID: data.calendarId,
								scheduleUUID: data.uuid
							},
							success: function(imageData) {
								if (imageData.state == "ok") {
									var pics = [];
									for (var i in imageData.pics) {
										var pic = imageData.pics[i];
										pics.push({
											pic: pic.pic,
											sequence: pic.sequence,
											source: "schedule_pics"
										});
									}
									self.postData.pics = JSON.stringify(pics);
								}
							}
						});
					}
				},
				error: function() {

				},
				dataType: 'json'
			});
		},
		_copySchedule: function(cid) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			self.postData.calendarId = cid;

			self.postData.updateV2Origin = '12';
			$.ajax({
				url: '/schedule/updateV2.do',
				type: 'post',
				dataType: 'json',
				data: self.postData,
				success: function(data) {
					if (data.state == 'ok') {
						//$.alert('复制成功！');
						$elem.hide();
						if(self.postData.before_minutes && self.postData.before_minutes != ""){
							pubAlarmChanged();
						}
						pubScheduleCreated(data);
					} else if (data.state == 'wrongpass') {
						$.alert('对不起，您的登录已经过期，请重新登录！', {
							buttons: {
								'确定': function() {
									location = '/account/login.do';
								}
							}
						});
					} else {
						//{"state":"failed"}
					}
				},
				error: function(data) {}
			});
		}
	});
	return self;
})
