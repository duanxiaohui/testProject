define([
	'zepto',
	'util',
	'/third_cooperation/qqgroup/js/create.js',
	'/third_cooperation/qqgroup/js/appData.js',
	'/js/lib/DatePicker_1/DateTimePicker.js'
],function ($, util, create, appData) {
	window.create = create;
	var access_token = util.query('access_token');
	var openid = util.query('openid');
	var group_openid = util.query('group_openid');
	window.cid = util.query('cid');
	window.uuid = util.query('uuid');
	var tmpl = '\
		<div class="panel">\
			<div class="schtitle schDetail">{$schTitle}</div>\
			<div class="line"></div>\
			<div class="timeRang">\
				{$startTime}\
				{$endTime}\
			</div>\
			{$before_minutes}\
			{$repeat}\
			{$extend}\
			{$edit}\
		</div>\
		{$btn}\
		';

	var ex = {
		initSchedule: function (data, needBtn) {
			var schedule = data.schedule;
			var nick = data.nick;
			var isOwner = data.isOwner;
			var header = data.header;
			var userId = getCookie('auto').split('%')[0];

			var identity = data.userAuthInfo.identity;
			// identity = 1;
			var oaccessType = data.ownerAuthInfo.accessType;
			var oidentity = data.ownerAuthInfo.identity;

			$('.scheduleMain').html('');
			$('.scheduleMain').append('<div class="face face_panel"><img width="50" height="50" src="' + 
					(header ? header : '/third_cooperation/qqgroup/images/120.png') + 
					'" alt="" />' + 
				 	(isOwner ? ('我' + (oaccessType == 1 ? '<span>无法编辑日程</span>' : '')) : nick + 
				 	(identity == 1 ? '' : oidentity == 1 ? (oaccessType == 1 ? '<a href="javascript:;" class="forbidden" data-type="cancel">授予创建权限</a>' : '<a href="javascript:;" class="forbidden" data-type="set">禁止创建日程</a>') : '') + '</div>'));

			$('.forbidden').on('tap', function () {
				var state = $(this).attr('data-type') == 'set';
				plug.confirm('', state ? '确定要禁止 '+ nick +' 创建日程吗？' : '是否要授予 '+ nick +' 创建日程的权限？', '', function() {
					$.ajax({
						url: '/mobile-qqun/'+ (state ? 'revoke' : 'grant') +'.do',
						data: {
							cid: window.cid,
							uid: data.schedule.ownerId
						},
						dataType: 'json',
						success: function (data) {
							if(data.state == 'ok'){
								if(state){
									$('.forbidden').html('授予创建权限').attr('data-type', 'cancel');
								}
								else{
									$('.forbidden').html('禁止创建日程').attr('data-type', 'set');
								}
							}
							else if(data.state == 'error'){
								plug.alert('',data.reason.replace(/\s/gi, '<br />'), function () {
									window.location.reload();
								});
							}
						}
					});
				})
			})

			$('.scheduleMain').append(util.format(tmpl, schedule, {
				schTitle: function (o, p) {
					o = o || p.title;
					o = o.replace(/&amp;/g, "&");
					o = o.replace(/</g, "&lt;");  
			  		o = o.replace(/>/g, "&gt;");  
			  		o = o.replace(/ /g, "&nbsp;");  
			  		o = o.replace(/\'/g, "&#39;");  
			  		o = o.replace(/\"/g, "&quot;"); 
			  		o = o.replace(/\r\n/g, '<br>').replace(/\n/g, '<br>');

					o = $.trim(o);

					o = o.replace(/(<br>)+/g, '<br>');

					if(p.extend){
						var point = JSON.parse(p.extend).point;
						if(point){
							o = '<img src="/third_cooperation/qqgroup/images/scheduleIcon/'+point+'_schedule.png" width="20" style="float:left;" alt="" /><p style="padding-left: 30px;">' + o + '</p>';
						}
					}
					return o;
				},
				startTime: function (o, p) {
					var time;
					if(typeof o == 'number'){
						time = new Date(o);
					}
					else{
						time = new Date(o.replace(/-/g, '/'));
					}

					var allday = p.alldayEvent || p.allDayEvent;
					allday = allday.toString() == 'true';
					var timestr = allday ? parseDateShot(time) : parseDateLong(time);

					return '<p>' + timestr + (p.duration == 0 ? '' : '开始') + '</p>';
				},
				endTime: function (o, p) {
					var startTime;
					var _o = p.startTime;
					if(typeof _o == 'number'){
						startTime = new Date(_o);
					}
					else{
						startTime = new Date(_o.replace(/-/g, '/'));
					}
					var time = new Date(startTime.getTime() + schedule.duration * 1000);
					var allday = p.alldayEvent || p.allDayEvent;
					allday = allday.toString() == 'true';
					var timestr = allday ? parseDateShot(time) : parseDateLong(time);

					return (p.duration == 0 ? '' : '<p>' + timestr + '结束</p>');
				},
				'before_minutes': function (o, p) {
					var beginDate;
					var _o = p.startTime;
					if(typeof _o == 'number'){
						beginDate = new Date(_o);
					}
					else{
						beginDate = new Date(_o.replace(/-/g, '/'));
					}
					o = o || p.alarm || '';
					var point = o.split(',');
					var html = [];
					var allday = p.alldayEvent || p.allDayEvent;
					allday = allday.toString() == 'true';
					for (var i = 0; i < point.length; i++) {
						var timePoint = point[i];
						var tpDate = new Date(beginDate);
						tpDate.setMinutes(beginDate.getMinutes() - timePoint);
						var str = '';
						switch (timePoint.toString()) {
							case '0': 
								str = '正点';
								break;
							case '5': 
								str = '提前5分钟';
								break;
							case '10': 
								str = '提前10分钟';
								break;
							case '30': 
								str = '提前30分钟';
								break;
							case '60': 
								str = '提前1小时';
								break;
							case '1440': 
								str = '提前1天';
								break;
							case '4320': 
								str = '提前3天';
						}
						html.push('<p data-point="'+timePoint+'">' + str + '提醒：<span>' + (!allday ? parseDateNormal(tpDate) : (parseDateAllDay(tpDate) +' 09:00')) + '</span></p>');
					};
					if(o.length){
						return '\
							<div class="line"></div>\
							<div class="timePointTxt tip">'+html.join('')+'</div>'
					}
					return ''
				},
				repeat: function (o, p, d, i) {
					var repeatType = p.repeatType;
					var html = '';
					switch(repeatType){
						case 0:
							return ''
						case 1:
							html = '<div class="repeatTxt tip"><p>每天 重复</p></div>'
							break;
						case 7:
							html = '<div class="repeatTxt reTip tip"><p>每周(周'+'日一二三四五六'.split('')['SUN MON TUE WED THU FRI SAT'.split(' ').indexOf(p.repeatDay)]+') 重复</p></div>'
							break;
						case 31:
							html = '<div class="repeatTxt reTip tip"><p>每月('+p.repeatMonthDay+'日) 重复</p></div>'
							break;
						case 365:
							html = '<div class="repeatTxt reTip tip"><p>每年('+p.repeatMonth+'月'+p.repeatMonthDay+'日) 重复</p></div>'
							break;
					}
					return '<div class="line"></div>' + html;
				},
				extend: function (o, p) {
					if(!o)return '';
					o = JSON.parse(o);
					if(o.sCalName){
						return '\
							<div class="line"></div>\
							<a href="/schedule/gotoLinkedUrl.do?calendarID='+window.cid+'&uuid='+window.uuid+'" class="extend">来自'+o.sCalName+'</a>'
					}
					return ''
				},
				edit: function (o, p) {
					if(data.ownerAuthInfo.accessType != 1 && p.ownerId == userId || !p.ownerId){
						return '\
						<div class="edit">\
							<div class="editBtn scheduleBtn">\
				    			<button type="submit">编辑日程</button>\
				    		</div><div class="deleteBtn scheduleBtn">\
				    			<button type="submit">删除日程</button>\
				    		</div>\
			    		</div>\
			    		';
					}

					if(data.userAuthInfo.identity != 1 && data.ownerAuthInfo.identity == 1){
						return '\
						<div class="edit manager">\
							<div class="deleteBtn scheduleBtn">\
				    			<button type="submit">删除日程</button>\
				    		</div>\
			    		</div>\
			    		';
					}
					return ''
				},
				btn: function () {
					if(needBtn){
						return '\
						<div class="btn">\
							<div>\
				    			<a href="http://qq.365rili.com/third_cooperation/qqgroup/schedule_list.html?cid='+window.cid+'" type="submit">查看群日程</a>\
				    		</div>\
				    		<div>\
				    			<a href="http://qq.365rili.com/mobile-qqun/main.do?access_token='+access_token+'&group_openid='+group_openid+'&openid='+openid+'" type="submit">查看群日历</a>\
				    		</div>\
			    		</div>\
						';
					}
					return ''
				}
			}));
			document.title = '日程详情';
			$('.deleteBtn button').on('tap', function () {
				var _this = this;
				var txt = schedule.repeatType ? '此日程为重复日程，删除日程那么相关的日程都会消失，不可恢复。您确定要删除日程吗？' : '您确定要删除此日程吗？'
				plug.confirm('', txt, '', function() {
			       	$(_this).attr('disabled', true).html('删除中...');
					$.ajax({
						url: '/schedule/qqDelete.do',
						data: {
							scheduleId: schedule.sid
						},
						headers: {
							'coco-ua': ['qq', userId, '1.0', 'mobile-qq', userId].join('|')
						},
						success: function (data) {
							if(data.state == 'ok'){
								var notic = {
									scheduleID: schedule.sid,
									action: 'D'
								};

								$.ajax({
									url: '/mobile-qqun/sendGroupMsg.do',
									data: notic
								});

								// window.history.go(-1);

								$('.scheduleMain').html('\
							        <div class="tipForNoSchedule">\
										<div class="tipForNoScheduleTop">\
									        <img src="/third_cooperation/qqgroup/images/icon_deleted.png" width="69" height="69" alt="">\
								            <p>该日程已被删除</p>\
									        <div class="btn">\
												<div>\
									    			<a class="blueBtn" href="http://qq.365rili.com/third_cooperation/qqgroup/create_schedule.html?cid='+window.cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid+'" type="submit">有新的日程安排？创建群日程</a>\
									    		</div>\
											</div>\
										</div>\
								        <div class="btn btn1">\
									        <span>您还可以：</span>\
											<div>\
								    			<a href="http://qq.365rili.com/third_cooperation/qqgroup/schedule_list.html?cid='+window.cid+'" type="submit">查看全部群日程</a>\
								    			<div class="line"></div>\
								    		</div>\
								    		<div class="returnToGrid">\
								    			<a href="http://qq.365rili.com/mobile-qqun/main.do?access_token='+access_token+'&group_openid='+group_openid+'&openid='+openid+'" type="submit">查看群日历</a>\
								    		</div>\
										</div>\
							        </div>');

								if(!access_token){
									$('.returnToGrid').remove();
								}
							}
							else{
								plug.alert('',data.reason.replace(/\s/gi, '<br />'), function () {
									window.location.reload();
								});
							}
						}
					})
			    });
			});

			$('.editBtn button').on('tap', function () {
				setTimeout(function () {
					window.create.create(schedule);
				}, 500);
			})
			
		}
	};


	function getCookie (name) {
        var value = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    value = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return value
    }

	function parseDateLong(time){
		var xq = ["周日","周一","周二","周三","周四","周五","周六"];
		return (time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + xq[time.getDay()] + ' ' + ['', time.getHours(), time.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
	}

	function parseDateShot(time){
		var xq = ["周日","周一","周二","周三","周四","周五","周六"];
		return (time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + xq[time.getDay()];
	}

	function parseDateNormal (d) {
		return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + ['' , d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
	}

	function getCookie (name) {
        var value = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    value = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return value
    }
			
			function parseDateAllDay (d) {
				return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
			}

	return ex;
});