require.config({
    baseUrl: '/third_cooperation/base_calendar/js/app/',
    paths: {
        "zepto": "/js/lib/zepto.min",
        /* ----- common ----- */
        "util": "common/util"
    },
    shim: {
        "zepto": {
            exports : "$"
        }
    }
});
require(['zepto', 'util'], function ($, util){
	var access_token = util.query('access_token');
	var openid = util.query('openid');
	var group_openid = util.query('group_openid');
    var _data = window.d = {
    	schedule:{
    		p: {},
    		n: {}
    	},
		dateRange: {
			from: new Date,
			to: new Date
		},
		current:{
			p: new Date,
			n: new Date
		},
		allowPrev: true,
		allowNext: true,
		load : 0,
		scrollT: true,
		scrollB: true
	};

	var cid = util.query('cid');
	
	$('.schedule_list').width($(window).width() - 17 - 1).css('padding-top','15px');

	$('.schedule_list').on('tap', 'dl', function () {
		var sid = $(this).data('sid');
		var uuid = $(this).data('uuid');
		window.location.href = '/third_cooperation/qqgroup/schedule.html?sid=' + sid + '&cid=' + cid + '&uuid=' + uuid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid;
	})

	getNext();

	$(window).scroll(checkScroll);

	function checkScroll (e) {
		if(document.body.scrollTop <= 10 && !_data.noPrev && _data.scrollT){
			_data.scrollT = false;
			_data.windowST = $(window).scrollTop();
			_data.firstDOM = $('.schedule_list div:first');
			getPrev();
		}
		if(document.body.scrollHeight - document.body.scrollTop - window.screen.availHeight < 100 && !_data.noNext && _data.scrollB){
			_data.scrollB = false;
			getNext();
		}
	}

	function initBtn (pn) {
		$('.more_btn').remove();
		// var prev = $('<div class="more_btn history_btn">已无更多日程</div>');
		// var next = $('<div class="more_btn future_btn">已无更多日程</div>');

		// prev.prependTo('.main');
		// next.appendTo('.main');

		// $('.main').off('tap.prev');
		// $('.main').off('tap.next');

		if(!_data.noPrev){
			// $('.main').on('tap.prev', '.history_btn', function () {
			// 	_data.windowST = $(window).scrollTop();
			// 	_data.firstDOM = $('.schedule_list div:first');
			// 	getPrev();
			// });
			// prev.html('<a href="javascript:;">点击加载更多</a>');
		}

		if(!_data.noNext){
			// $('.main').on('tap.next', '.future_btn', getNext);
			// next.html('<a href="javascript:;">点击加载更多</a>');
		}

		if(_data.noNext && !_data.load || _data.neverNext){
			_data.neverNext = true;
			// next.remove();
		}

		// var h = prev.height();
		var h = 15;

		//高度需要修复
		var wh = $(window).height();
		var mh = $('.main').height();

		if(wh > mh){
			$('.main').height(wh + h);
		}

		if(pn == 'p'){
			var sh = -15;
			if(!_data.noPrev){
				sh += _data.firstDOM.offset().top + _data.windowST
			}
			$(window).scrollTop(sh);
		}
		// if(pn == 'n' && _data.noNext){
		// 	sh = $('.future_btn').height();
		// 	var st = $(window).scrollTop();
		// 	$(window).scrollTop(st - sh);
		// }

		if(_data.load == 0){
			$(window).scrollTop(h);
			_data.load = 1;
		}
	}

	function fixedHeight () {
		var wh = $(window).height();
		if(wh > $('.schedule_list').height()){
			$('.schedule_list').height(wh);
		}
	}

	function getNext () {
		// $('.main').off('tap.next');
		// $('.future_btn').html('<img src="/third_cooperation/qqgroup/images/loading.gif" width="16" height="16" style="padding: 11px 0;">');

		getScheduleByLocal('n');
	}

	function getPrev () {
		// $('.main').off('tap.prev');
		// $('.history_btn').html('<img src="/third_cooperation/qqgroup/images/loading.gif" width="16" height="16" style="padding: 11px 0;">');
		getScheduleByLocal('p');
	}

	function getScheduleByLocal (pn) {
		var schedule = _data.schedule[pn];
		//检查是否有日程
		if(JSON.stringify(schedule) == '{}'){
			if((pn == 'n' && _data.allowNext) || (pn == 'p' && _data.allowPrev))
			return getSchedule(pn);
		}
		// return
		//从当前显示点检索到边界，取最临近的一个月的数据
		var current = _data.current[pn];
		current.setHours(0,0,0,0);
		var farest = _data.dateRange[pn == 'n' ? 'to' : 'from'];
		var data = null;
		/*
		if(pn == 'n'){
			for (var i = current.getFullYear() * 12 + current.getMonth(); i <= farest.getFullYear() * 12 + farest.getMonth(); i++) {
				data = _data.schedule[pn][[current.getFullYear(), current.getMonth() + 1].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2')]
				if(!data){
					current.setMonth(current.getMonth() + 1);
					continue;
				}
				else{
					return parseSchedule(data, pn);
				}
			};
		}
		else{
			for (var i = current.getFullYear() * 12 + current.getMonth(); i >= farest.getFullYear() * 12 + farest.getMonth(); i--) {
				data = _data.schedule[pn][[current.getFullYear(), current.getMonth() + 1].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2')]
				if(!data){
					current.setMonth(current.getMonth() - 1);
					continue;
				}
				else{
					return parseSchedule(data, pn);
				}
			};
		}
		*/

		//从当前显示点检索到边界，取最临近的50条数据，当天补齐
		var MAX = 50;
		var INDEX = 0;
		var dateStringForMonth = '';
		var _schedule = _data.schedule[pn];
		var endDate = null;
		if(pn == 'n'){
			//从当前时间点检索到最大数据边界（月）
			for (var i = current.getFullYear() * 12 + current.getMonth(); i <= farest.getFullYear() * 12 + farest.getMonth(); i++) {
				data = {};
				//检查是否存在月数据
				dateStringForMonth = [current.getFullYear(), current.getMonth() + 1].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
				if(_schedule[dateStringForMonth]){
					//获取本月最后一日的日号
					endDate = new Date(current);
					endDate.setDate(1);
					endDate.setMonth(endDate.getMonth() + 1);
					endDate.setDate(0);

					//从当前时间检索到本月最后一日
					while(current <= endDate){
						var dateStringForDay = [current.getFullYear(), current.getMonth() + 1, current.getDate()].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');

						//检查是否存在日数据
						if(_schedule[dateStringForMonth][dateStringForDay]){
							data[dateStringForDay] = [];
							//塞入数据
							for (var _i = 0; _i < _schedule[dateStringForMonth][dateStringForDay].length; _i++) {
								data[dateStringForDay].push(_schedule[dateStringForMonth][dateStringForDay][_i]);
								INDEX++;
							};

							//检测极限, 如果极限值位于一日数据中间位置，则跑到该日结束
							if(INDEX >= MAX){
								_data.scrollT = _data.scrollB = true;
								return parseSchedule(data, pn);
							}
						}

						current.setDate(current.getDate() + 1);
					}
					current.setDate(0);

					//如果本月数据取完，未达到50条，先渲染
					parseSchedule(data, pn);
				}

				//恢复时间标识到当月1日
				current.setDate(1);

				//下一个月
				current.setMonth(current.getMonth() + 1)
			};
		}
		else{
			//从当前时间点检索到最大数据边界（月）
			for (var i = current.getFullYear() * 12 + current.getMonth(); i >= farest.getFullYear() * 12 + farest.getMonth(); i--) {
				data = {};
				//检查是否存在月数据
				dateStringForMonth = [current.getFullYear(), current.getMonth() + 1].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
				if(_schedule[dateStringForMonth]){
					//获取本月第一日的日号
					endDate = new Date(current);
					endDate.setDate(1);

					//从当前时间检索到本月最后一日
					while(current >= endDate){
						var dateStringForDay = [current.getFullYear(), current.getMonth() + 1, current.getDate()].join('/').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');

						//检查是否存在日数据
						if(_schedule[dateStringForMonth][dateStringForDay]){
							data[dateStringForDay] = [];
							//塞入数据
							for (var _i = 0; _i < _schedule[dateStringForMonth][dateStringForDay].length; _i++) {
								data[dateStringForDay].push(_schedule[dateStringForMonth][dateStringForDay][_i]);
								INDEX++;
							};

							//检测极限, 如果极限值位于一日数据中间位置，则跑到该日结束
							if(INDEX >= MAX){
								_data.scrollT = _data.scrollB = true;
								return parseSchedule(data, pn);
							}
						}

						current.setDate(current.getDate() - 1);
					}

					//如果本月数据取完，未达到50条，先渲染
					parseSchedule(data, pn);
					//恢复时间标识到当月最后一日
					current.setDate(1);
					current.setMonth(current.getMonth() + 2)
					current.setDate(0);
				}

				//上一个月
				current.setDate(1);
				current.setDate(0);
			};
		}

		//检查是否还有数据
		if(JSON.stringify(schedule) == '{}'){
			if(pn == 'n'){
				_data.noNext = true;
			}
			else{
				_data.noPrev = true;
			}
		}
		
		pn == 'p' && _data.noPrev && parseSchedule({}, pn) && noScheduleTips(pn);;
		pn == 'n' && _data.noNext && parseSchedule({}, pn) && noScheduleTips(pn);;
		_data.scrollT = _data.scrollB = true;
	}

	function getSchedule (pn) {
		if(pn == 'n'){
			if(_data.noNext) return;
			var beginDate = _data.dateRange.to;
			var endDate = new Date(beginDate);
			endDate.setYear(endDate.getFullYear() + 1);

			_data.dateRange.to = endDate;
		}
		else{
			if(_data.noPrev) return;
			var endDate = _data.dateRange.from;
			var beginDate = new Date(endDate);
			beginDate.setYear(beginDate.getFullYear() - 1);
			endDate.setDate(endDate.getDate() - 1);

			_data.dateRange.from = beginDate;
		}
		$.ajax({
			url: '/schedule/listQQSchedule.do',
			data: {
				fromDate : parseDate(beginDate),
				toDate : parseDate((function () {
					var e = new Date(endDate);
					e.setDate(endDate.getDate() + 1);
					return e;
				})()),
				timeZone : 8,
				calendarId : cid,
				t:+new Date()
			},
			success: function (data) {
				var _dataSchedule = _data.schedule[pn];
				var schedules = data.data[0].schlist;
				if(schedules.length == 0){
					if(_data.load == 0){
						$('.main').append('<div class="tipForNoScheduleList"><img src="/third_cooperation/qqgroup/images/icon_noSchedule.png" width="69" height="69" alt="" /><p>您近期没有日程安排</p></div>');
					}
				}

				if(pn == 'p'){
					_data.allowPrev = false;
				}
				else{
					_data.allowNext = false;
				}

				var schedule = null;
				for (var i = 0; i < schedules.length; i++) {
					schedule = schedules[i];
					var date = schedule.start_time.split(' ')[0].split('-');
					var _day = date[2];
					var _month = date[1];
					var _year = date[0];

					var __month = _year + '/' + _month;
					if(!_dataSchedule[__month]){
						_dataSchedule[__month] = {};
					}

					var __day = _year + '/' + _month + '/' + _day;
					if(!_dataSchedule[__month][__day]){
						_dataSchedule[__month][__day] = [];
					}
					_dataSchedule[__month][__day].push(schedule);
				};
				getScheduleByLocal(pn);
			}
		});
	}

	function parseSchedule (data, pn) {
		var schedules = [];
		for(var i in data){
			data[i].sort(function (x, y) {
				if(x.allday_event && y.allday_event){
					var order = {
						'birthday': 3,
						'study': 2,
						'game': 1
					};
					return (order[y.extend.point] || 0) - (order[x.extend.point] || 0);
				}
				else if(x.allday_event){
					return -1
				}
				else if(y.allday_event){
					return 1
				}
				else{
					var d = new Date(x.start_time.replace(/-/g, '/')) - new Date(y.start_time.replace(/-/g, '/'));
					if(!d){
						var order = {
							'birthday': 3,
							'study': 2,
							'game': 1
						};
						return (order[y.extend.point] || 0) - (order[x.extend.point] || 0);
					}
					return d > 0 ? 1 : 0;
				}
			});
			schedules.push({
				date : i,
				schedule : data[i]
			});
		}

		schedules.sort(function (x, y) {
			return new Date(x.date) - new Date(y.date);
		});

		var html = util.format('\
			<p class="schedule_day">{$date}{$d_day}</p>\
			{$schedule}\
		', schedules, {
			date: function (o) {
				var date = o.split('/');
				return date[0] + '年' + date[1] + '月' + date[2] + '日';
			},
			schedule: function (o) {
				return util.format('\
					<dl data-sid="{$id}" data-uuid="{$uuid}">\
						<dd class="schBody">\
							<span class="time">{$start_time}</span>\
							<span class="over_time">{$over_time}</span>\
						</dd>\
						<dt>{$text}</dt>\
						{$extend}\
					</dl>\
				', o, {
					'start_time': function (o, p, d, i) {
						if(p['allday_event']){
							return '全天'
						}
						else{
							var s = o.split(' ')[1].split(':');
							return s[0] + ':' + s[1];
						}
					},
					'over_time': function (o, p, d, i) {
						if(p['allday_event']){
							return ''
						}
						var startTime = new Date(p.start_time.replace(/-/g, '/'));
						var time = new Date(startTime.getTime() + p.duration * 1000);
						var timestr = ['', time.getHours(), time.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);
						return timestr + '结束';
					},
					'text': function(o, p, d, i) {
						o = o.replace(/&amp;/g, "&");
						o = o.replace(/</g, "&lt;");
						o = o.replace(/>/g, "&gt;");
						o = o.replace(/ /g, "&nbsp;");
						o = o.replace(/\'/g, "&#39;");
						o = o.replace(/\"/g, "&quot;");
						var point = p.extend.point;
						o = point ? '<img src="/third_cooperation/qqgroup/images/scheduleIcon/'+point+'_schedule.png" width="20" style="float:left; margin-right: 12px;" alt="">' + o : o;
						return o;
					},
					'extend': function (o, p) {
						if(o.sCalName){
							return '<dd class="extend">来自'+o.sCalName+'</dd>'
						}
						return ''
					}
				});
			},
			d_day: function (o, p) {
				var date = p.date.split('/');
				var targetDay = new Date(date[0], date[1] - 1, date[2]);

				var today = new Date;
				today.setHours(0,0,0,0);

				var d_day = 0;
				if(targetDay.getTime() !== today.getTime()){
					d_day = ((targetDay - today) / 1000 / 60 / 60 / 24);
				}

				//如果存在差值则非今天
				if(d_day === 1){
					return ['（明天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === 2){
					return ['（后天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === -1){
					return ['（昨天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === -2){
					return ['（前天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day){
					return ['（', (Math.abs(d_day)), '天', d_day > 0 ? '后 周' : '前 周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else{
					return ['（今天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
			}
		});

		//使用后的数据需要清除
		if(schedules.length){
			pn == 'p' && $('.tipForNoScheduleList').remove();
			var month = schedules[0].date.split('/');
			month = [month[0], month[1]].join('/');
			var _dataMonthSchedule = _data.schedule[pn][month];
			for (var i = 0; i < schedules.length; i++) {
				delete _dataMonthSchedule[schedules[i].date];
			};
			//若日程全部显示则删除该月
			if(JSON.stringify(_dataMonthSchedule) == '{}'){
				delete _data.schedule[pn][month];
			}
		}

		var _html = html;

		var $html = $('<div></div>').html(_html);
			$html[pn == 'n' ? 'appendTo' : 'prependTo']($('.schedule_list'));
		
		initBtn(pn);
	}

	function noScheduleTips (pn) {
		// var pn = (pn == 'p' ? '过去' : '未来');
		var tips = $('<div class="tips">已无更多日程</div>');
		tips.appendTo('body');
		tips.fadeIn(function () {
			setTimeout(function () {
				tips.fadeOut(function () {
					tips.remove();
				});
			}, 2000);
		})
	}

	function parseDate (d) {
		return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
	}
});