define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/widget/scheduleCreator',
	'rebuild/widget/allTask',
	'rebuild/widget/schedule'
],function (c, cp, scheduleCreator) {
	function Gird (dom, i) {
		var me = this;
		me.dom = dom;
		me.$dom = $(dom);
		me.index = i;
		me.date = null;
		me.day = null;
		me.month = null;
		me.realMonth = null;
		me.lunar = null;
		me.festival = null;
		me.schedule = [];
		me.dateString = null;
		me.calendars = null;
		me.outOfDayNum = false;
		me.template = '\
					<dl primary="{primary}">\
						<dt><div class="spheric ui-corner-all-16 jsc-{cid}" style="border-color:{color}; background-color:{bgc}"></div>\
						<span class="month_view_schedule_time">{time}</span>\
						<a href="javascript:;" title="修改日程" class="month_view_edit_schedule none"></a><a href="javascript:;" title="删除日程" class="month_view_del_schedule none"></a></dt>\
						<dd class="listTaskText on {completed}">{text}</dd>\
					</dl>';
		me.noEditTemplate = '\
					<dl primary="{primary}">\
						<dt><div class="spheric ui-corner-all-16 jsc-{cid}" style="border-color:{color}; background-color:{bgc}"></div>\
						<span class="month_view_schedule_time">{time}</span></dt>\
						<dd class="listTaskText on {completed}">{text}</dd>\
					</dl>';
		me.deleteTemplate = '\
					<dl primary="{primary}">\
						<dt><div class="spheric ui-corner-all-16 jsc-{cid}" style="border-color:{color}; background-color:{bgc}"></div>\
						<span class="month_view_schedule_time">{time}</span>\
						<a href="javascript:;" title="删除日程" class="month_view_del_schedule none"></a></dt>\
						<dd class="listTaskText on {completed}">{text}</dd>\
					</dl>';
		me.more = false;
	};

	Gird.prototype.init = function () {
		var me = this;
		amplify.subscribe('dateUpdated', me, me.updateDate);
		amplify.subscribe('scheduleDataChanged', me, me.updateScheduleData);
		amplify.subscribe('panelResized', me, me.updateScheduleView);
		amplify.subscribe('showOnly', me, me.toggleScheduleShow);

		me.$dom
			//绑定显示新建日程按钮事件
			.on('mouseenter.Gird_' + me.index, function (e) {
				me.showScheduleCreator.call(me);
			})

			//绑定隐藏新建日程按钮事件
			.on('mouseleave.Gird_' + me.index, function (e) {
				me.hideScheduleCreator.call(me);
			})

			//绑定显示编辑删除按钮事件
			.on('mouseenter.Gird_' + me.index, 'dt', me.showTools)

			//绑定隐藏编辑删除按钮事件
			.on('mouseleave.Gird_' + me.index, 'dt', me.hideTools)

			//绑定展开事件
			.on('click.Gird_' + me.index,'.listTaskText', me.showSchedule)

			//绑定新建事件
			.on('click.Gird_' + me.index, '.month_view_add_schedule_btn', function (e) {
				e.stopPropagation();
				me.createSchedule(this);
			})

			//绑定删除事件
			.on('click.Gird_' + me.index, '.month_view_del_schedule', function (e) {
				e.stopPropagation();
				me.deleteSchedule(this);
			})
			//绑定编辑事件
			.on('click.Gird_' + me.index, '.month_view_edit_schedule', function (e) {
				e.stopPropagation();
				me.editSchedule(this);
			})
		;
	};

	Gird.prototype.toggleScheduleShow = function () {
		var me = this;
		if(me.schedule.length !== 0){
			//本身具备日程并且符合日期，则显示
			me.outOfDayNum || me.$dom.show();
			return
		}
		if(arguments[0]){
			me.$dom.stop(true, true).hide();
		}
		else{
			//需要联合判断，如果超出日期范围则不显示
			me.outOfDayNum || me.$dom.stop(true, true).fadeIn('fast');
		}
	};

	Gird.prototype.deleteSchedule = function (elem) {
		var schedule = cp.getScheduleByPrimary($(elem).parents('dl').attr('primary'));
		var sid = schedule.id;
		var cid = schedule.cid;
		var date = schedule.date;

		//TODO: 整理代码
		$.confirm('确定要删除这个日程吗？', {
			buttons: [{
				text: "删除",
				click: function(e) {
					var _this = this;

					$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data) {
						if (data == true) {
							$(_this).dialog("close");
							amplify.publish('scheduleDeleted', {'sid': sid});
						} else if (data.state == 'wrongpass') {
							amplify.publish('loginTimeout');
						}
					});
				}
			}, {
				text: "取消",
				click: function(e) {
					$(this).dialog("close");
				}
			}]
		});
	};

	Gird.prototype.editSchedule = function (elem) {
		var schedule = cp.getScheduleByPrimary($(elem).parents('dl').attr('primary'));
		scheduleCreator.showForm(undefined, schedule.id);
	};
	Gird.prototype.showTools = function () {
		$(this).find('.month_view_edit_schedule, .month_view_del_schedule').stop(true,true).fadeIn('fast');
	}

	Gird.prototype.hideTools = function () {
		var me = this;
		$(this).find('.month_view_edit_schedule, .month_view_del_schedule').stop(true,true).fadeOut('fast');
	}

	Gird.prototype.showSchedule = function () {
		$(this).toggleClass('on');
	}

	Gird.prototype.createSchedule = function () {
		var me = this;
		scheduleCreator.showForm(me.dateString, undefined);
	};

	Gird.prototype.showScheduleCreator = function () {
		var me = this;
		me.$dom.find('.month_view_add_schedule_btn').css('display', 'block');
	};

	Gird.prototype.hideScheduleCreator = function () {
		var me = this;
		me.$dom.find('.month_view_add_schedule_btn').css('display', 'none');
	};

	Gird.prototype.showAllTask = function () {
		var me = this;
		me.$dom.allTask({
			schedules: me.schedule,
			date: me.date
		});
	};

	Gird.prototype.destroy = function () {
		var me = this;
		amplify.unsubscribe('dateUpdated', me.updateDate);
		amplify.unsubscribe('scheduleDataChanged', me.updateScheduleData);
		amplify.unsubscribe('panelResized', me.updateScheduleView);
		me.$dom.off('.Gird_' + me.index);
	};

	Gird.prototype.updateScheduleData = function () {
		var me = this;
		// console.log(arguments[0])
		//公共数据不存在则退出
		globalData = arguments[0]['scheduleList'] || cp.getScheduleList()

		if(!globalData){
			return;
		}

		var _data = globalData[me.dateString]; //提取自身日期的日程
		var calendars = me.calendars = arguments[1] || cp.getCalendarListSelectedCld();
		var schedules = [];

		var schedulesByCid,
			//克隆的本地展开日程
			schedulesByClonedCid;

		//数据变更时首先清理视图信息
		me.empty();

		//无数据提前结束更新，上报无数据
		if(!_data){
			return amplify.publish('scheduleViewUpdated', 'noData', me.dateString, calendars);
		}

		//根据日历id筛选出自身日程数据, 缺少的日历会统计
		var notGetCalendar = [];
		for (var i = 0, l = calendars.length; i < l; i++) {
			schedulesByCid = _data[calendars[i]];
			schedulesByClonedCid = _data[calendars[i] + '_cloned']
			if(!schedulesByCid){
				notGetCalendar.push(calendars[i]);
				continue;
			}
			schedules = schedules.concat(schedulesByCid);

			//链接克隆数据
			schedulesByClonedCid && (schedules = schedules.concat(schedulesByClonedCid));
		}

		//如果存在未获取的日历，则上报消息
		if(notGetCalendar.length !== 0){
			return amplify.publish('scheduleViewUpdated', 'noData', me.dateString, notGetCalendar);
		}

		//排序
		schedules.sort(function (x, y) {
			if(x.time === '全天' && y.time !== '全天'){
				return -1;
			}
			else if(x.time !== '全天' && y.time === '全天'){
				return 1;
			}
			else if(x.time === '全天' && y.time === '全天'){
				return x.cid - y.cid;
			}
			else{
				var date1 = (new Date(x.start_time.replace(/-/g, '/'))).getTime();
				var date2 = (new Date(y.start_time.replace(/-/g, '/'))).getTime();
				if(date1 != date2){
					return date1 - date2;
				}
				else{
					return x.cid - y.cid;
				}
			}
			
		});
		
		me.schedule = schedules;

		me.updateScheduleView();

	};

	Gird.prototype.updateScheduleView = function () {
		var me = this;

		var scheduleLen = me.schedule.length;

		var html = [];

		//无日程
		if(me.schedule.length === 0){
			me.empty();
		}

		//显示日程
		var calendar = null;
		var schedule = null
		for (var i = 0, l = scheduleLen; i < l; i++) {
			schedule = me.schedule[i];
			schedule.completed = schedule.completed ? 'iscompleted' : '';
			calendar = cp.getCalendarById(me.schedule[i].cid);
			if(calendar.access_type == 2 || calendar.access_type == 3){
				if(parseInt(schedule.index_type) == 91 || parseInt(schedule.index_type) == 92 || parseInt(schedule.index_type) == 93 || parseInt(schedule.index_type) == 95){
					html.push($.format(me.deleteTemplate, me.schedule[i]));		
				}
				else{
					html.push($.format(me.template, me.schedule[i]));
				}
			}
			else{
				html.push($.format(me.noEditTemplate, me.schedule[i]));
			}
		};
		
		//脱离句柄散开插入domtree
		me.withOutHandle(function () {
			me.$dom.find('.month_view_schedule').html(html.join(''));
			// $(html.join('')).appendTo();
		});


		amplify.publish('scheduleViewUpdated', me);
	};

	Gird.prototype.updateDate = function () {
		var me = this;
		var _data = arguments[0];
		var fromDate = _data.fromDate;

		//获取自身日期及其他信息
		var date = new Date(fromDate);
			date.setDate(fromDate.getDate() + me.index);

		me.date = date;
		me.day = date.getDate();
		me.month = date.getMonth();
		me.realMonth = me.month + 1;
		me.year = date.getFullYear();

		me.lunar = lunar(date);
		me.festival = me.lunar.festival()[0];
		me.dateString = c.formatDate(me.date);

		//涉及到一些数据检测，而两个函数互不干扰，所以脱离句柄
		me.withOutHandle(function () {
			me.updateDateView(_data)
		});
		me.withOutHandle(function () {
			me.updateScheduleData(_data)
		});

	};

	Gird.prototype.updateDateView = function () {
		var me = this;
		var _data = arguments[0];

		$('.month_view_today').remove();

		//超出日总数则隐藏自身
		if(me.index >= _data.dayNum){
			//超出日期绝对隐藏
			me.$dom.hide();
			me.outOfDayNum = true;

			//清空日程缓存
			me.schedule = [];
			return;
		}
		else{
			//符合日期则需要与日程控制联合判断，此处不做处理
			me.outOfDayNum = false;
		}


		//更新视图
		var $dom = me.$dom;

		//今天
		if(me.date.toDateString() === _data.today.toDateString()) {
			//上报自身为今天
			amplify.publish('today', me);
			me.withOutHandle(function () {
				$('<p class="month_view_today">今天</p>').insertBefore(me.$dom.find('.month_view_add_schedule_btn'));
			});
		}

		//公历
		me.withOutHandle(function () {
			$dom.find('.month_view_ymd').text(c.formatDate(me.date));
		});

		me.withOutHandle(function () {
			$dom.find('.month_view_week').text('周' + me.lunar.cnDay);
		});
		//节日||节气||农历
		var $lunar = $dom.find('.month_view_solar');
		me.withOutHandle(function () {
			if(me.festival){
				me.$dom.find('.month_view_festival').text(me.festival.desc);
			}
			else{
				me.$dom.find('.month_view_festival').text('');
			}
		});

		me.withOutHandle(function () {
			$lunar.text([me.lunar.lMonth,'月',me.lunar.lDate].join(''));
		});
	};

	Gird.prototype.empty = function () {
		var me = this;
		me.withOutHandle(function () {
			me.$dom.find('.month_view_schedule').empty();
		})
	};

	Gird.prototype.withOutHandle = function (fn) {
		setTimeout(fn,(function (n, m) {
			return Math.random() * (m - n) + n
		})(0, 1));
	}

	return Gird;
})