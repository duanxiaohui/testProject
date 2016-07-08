define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/widget/scheduleCreator',
	'rebuild/widget/allTask',
	'rebuild/widget/schedule'
],function (c, cp, scheduleCreator) {
	function monthGird (dom, i) {
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
		me.template = '<dd primary="{primary}" class="task jsc-{cid}" style="border-color:{color}; background-color:{bgc}"><div class="spheric ui-corner-all-16" style="border-color:{color}; background-color:{sbgc}"></div><p class="task_text" title="{time}&nbsp;{text}">{time}&nbsp;{text}</p></dd>';
		me.moreTemplate = '<dd class="task_more">还有{num}个日程</dd>';
		me.scheduleNum = 0;
		me.shownScheduleNum = 0;
		me.more = false;
	};

	monthGird.prototype.init = function () {
		var me = this;
		amplify.subscribe('dateUpdated', me, me.updateDate);
		amplify.subscribe('scheduleDataChanged', me, me.updateScheduleData);
		amplify.subscribe('panelResized', me, me.updateScheduleView);

		//绑定全部日程事件
		me.$dom.on('click.Gird_' + me.index, '.task_more', function (e) {
			e.stopPropagation();
			me.showAllTask.call(me);
		});

		//绑定查看日程事件
		me.$dom.on('click.Gird_' + me.index, '.task', function (e) {
			e.stopPropagation();
			me.showschedule.call(this);
		});

		//绑定新建日程事件
		me.$dom.on('click.Gird_' + me.index, function (e) {
			e.stopPropagation();
			me.createSchedule.call(me);
		});

		//更新可显示数量
		me.updateScheduleNum();
	};

	monthGird.prototype.createSchedule = function () {
		var me = this;
		scheduleCreator.showForm(me.dateString, undefined, me.$dom);
	};

	monthGird.prototype.showschedule = function () {
		var elem = $(this);
		var schedule = cp.getScheduleByPrimary(elem.attr('primary'));
		elem.schedule({
			schedule: schedule
		});
	};

	monthGird.prototype.showAllTask = function () {
		var me = this;
		me.$dom.allTask({
			schedules: me.schedule,
			date: me.date
		});
	};

	monthGird.prototype.destroy = function () {
		var me = this;
		amplify.unsubscribe('dateUpdated', me.updateDate);
		amplify.unsubscribe('scheduleDataChanged', me.updateScheduleData);
		amplify.unsubscribe('panelResized', me.updateScheduleView);
		me.$dom.off('.Gird_' + me.index);
	};

	monthGird.prototype.showOthers = function () {
		self.moreTip = $(self.tmplMore).appendTo('body');
		self.moreTip.resizable({
			minWidth: 165,
			minHeight: 60,
			resize: function(event, ui) {
				var height = ui.size.height;
				ui.element.find('dl:last').height(height - ui.element.find('dl:first').height());
			}
		});
		self.moreTip.find('a.close_btn').click(function() {
			self.moreTip.hide('fade');
		});
	};

	monthGird.prototype.updateScheduleNum = function () {
		var me = this;
		var viewHeight = me.$dom.height() - me.$dom.find('dt').height();
		var elseHeight = viewHeight % 22;
		me.scheduleNum = parseInt(viewHeight / 22);

		//如果数量超出可视范围，少显示一个以显示更多按钮
		if(me.scheduleNum < me.schedule.length){
			if(elseHeight < 18){
				//如果可显示个数为负数，修正为0
				--me.scheduleNum < 0 && ++me.scheduleNum;
			}
			me.more = true;
		}else if(me.scheduleNum >= me.schedule.length){

			//最大显示不可超过日程总数
			me.scheduleNum = me.schedule.length;22
			me.more = false;
		}
	};

	monthGird.prototype.updateScheduleData = function () {
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

		var schedulesByCid;

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
			if(!schedulesByCid){
				notGetCalendar.push(calendars[i]);
				continue;
			}
			schedules = schedules.concat(schedulesByCid);
		}

		//如果存在未获取的日历，则上报消息
		if(notGetCalendar.length !== 0){
			return amplify.publish('scheduleViewUpdated', 'noData', me.dateString, notGetCalendar);
		}

		me.schedule = schedules;

		me.updateScheduleView();

	};

	monthGird.prototype.updateScheduleView = function () {
		var me = this;

		me.updateScheduleNum();

		var scheduleLen = me.schedule.length;
		var needShowNum = me.scheduleNum - me.shownScheduleNum;

		var html = [];

		//无日程
		if(me.schedule.length === 0){
			me.empty();
		}

		//增加显示日程
		else if(needShowNum >= 0){
			for (var i = me.shownScheduleNum, l = me.scheduleNum; i < l; i++) {
				html.push($.format(me.template, me.schedule[i]));
			};
			
			//脱离句柄散开插入domtree
			me.withOutHandle(function () {
				$(html).appendTo(me.$dom.find('dl'));

				//需要再次更新，防止用户快速切换窗口大小
				me.shownScheduleNum = me.$dom.find('.task').length;

				me.setMore();
			});

			me.shownScheduleNum = me.scheduleNum;
		}

		//减少显示日程
		else if(needShowNum < 0){
			var $tasks = me.$dom.find('.task');
			var needRemove = [];

			for(var i = me.shownScheduleNum, l = me.scheduleNum; i >= l; i--){
				needRemove.push($tasks.eq(i));
			}
			
			//脱离句柄散开插入domtree
			me.withOutHandle(function () {
				for (var i = 0, l = needRemove.length; i < l; i++) {
					needRemove[i].remove();
				};

				//需要再次更新，防止用户快速切换窗口大小
				me.shownScheduleNum = me.$dom.find('.task').length;

				me.setMore();
			});

			me.shownScheduleNum = me.scheduleNum;
		}


		amplify.publish('scheduleViewUpdated', me);
	};

	monthGird.prototype.setMore = function () {
		var me = this;
		me.$dom.find(".task_more").remove();
		if(me.more){
			$(me.moreTemplate.replace('{num}', me.schedule.length - me.shownScheduleNum)).appendTo(me.$dom.find('dl'));
		}
	};

	monthGird.prototype.updateDate = function () {
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
		me.withOutHandle(me.updateDateView(_data));
		me.withOutHandle(me.updateScheduleData(_data));

	};

	monthGird.prototype.updateDateView = function () {
		var me = this;
		var _data = arguments[0];


		//更新视图
		var $dom = me.$dom;

		//公历
		var $solar = $dom.find('.solar-text')
			me.withOutHandle(function () {
				$solar.text(me.date.getDate());
			});
			
		// $dom.attr('date', me.dataString);
		if(me.month < _data.month){
			me.withOutHandle(function () {
				$dom.removeClass('month_befor month_after table-today weekend').addClass('month_befor');
			});
		}
		else if(me.month > _data.month){
			me.withOutHandle(function () {
				$dom.removeClass('month_befor month_after table-today weekend').addClass('month_after');
			});
		}
		else{
			me.withOutHandle(function () {
				$dom.removeClass('month_befor month_after table-today weekend');
			});
		}

		//作息调整
		var yearHoliday = _data.holidays[me.year];
		$dom.find('.vocationt-text, .work-text, .today-text').remove();
		if(yearHoliday){
			//放假
			if(yearHoliday.festival['m' + me.realMonth + 'd' + me.day]){ 
				me.withOutHandle(function () {
					$dom.find('dt').append('<span class="vocationt-text">放假</span>');
				});
			}
			//工作
			else if(yearHoliday.workday['m' + me.realMonth + 'd' + me.day]){
				me.withOutHandle(function () {
					$dom.find('dt').append('<span class="work-text">工作</span>');
				});
			}
		}

		//今天
		if(me.date.toDateString() === _data.today.toDateString()) {
			me.withOutHandle(function () {
				$dom.find('dt').append('<span class="today-text">今天</span>');
			});
		}
		
		//节日||节气||农历
		var $lunar = $dom.find('.lunar-text');
		if(me.festival){
			me.withOutHandle(function () {
				$lunar.text(me.festival.desc);
				$lunar.css('color', '#198500');
			});
		}
		else if(me.lunar.term){
			me.withOutHandle(function () {
				$lunar.text(me.lunar.term);
				$lunar.css('color', '#198500');
			});
		}
		else if(me.lunar.dateIndex !== 0){
			me.withOutHandle(function () {
				$lunar.text(me.lunar.lDate);
			});
		}
		else{
			me.withOutHandle(function () {
				$lunar.text(
					   me.lunar.lMonth + '月'
					 + (me.lunar.isBigMonth ? '大' : '小')
				);
			});
		}
	};

	monthGird.prototype.empty = function () {
		var me = this;
		me.withOutHandle(function () {
			me.$dom.find('.task').remove();
			me.$dom.find('.task_more').remove();
		})
		me.shownScheduleNum = 0;
	};

	monthGird.prototype.withOutHandle = function (fn) {
		setTimeout(fn,(function (n, m) {
			return Math.random() * (m - n) + n
		})(0, 1));
	}

	return monthGird;
})