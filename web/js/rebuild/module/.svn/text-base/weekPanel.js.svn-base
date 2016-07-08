define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/class/Gird',
	'rebuild/module/getHolidays',
	'rebuild/module/scheduleData',
	'rebuild/base/solarAndLunar',
], function(c, cp, Gird, Holidays, sd) {
	var GIRDNUM = 7;
	var _data = {};
	var _ex = {
		modeName: 'week',
		report: function () {
			amplify.publish('initPanelModule', _ex.modeName, '#ul_view_switcher li[tab="week"]');
		},

		//检测是否需要初始化模块，避免重复
		checkPanel: function () {
			var currentPanel = arguments[0];
			var prevPanel = cp.getCurrentPanel();

			//如果自身为第一个模块，执行初始化
			if(!prevPanel && currentPanel === _ex.modeName){
				_ex.init();
			}

			//如果不为第一个模块，就算是自身也不能初始化，防止冲突，需要等待其他模块注销完毕。此处仅记录
			if(prevPanel){
				_data.currentPanel = currentPanel;
			}

			//如果不为自身，则注销
			if(prevPanel === _ex.modeName && currentPanel !== _ex.modeName){
				try{
					_ex.destroy();
				}catch(e){}
				return;
			}
		},

		checkOtherPanelDestroy: function () {
			var destroyPanel = arguments[0];

			//如果注销的模块不为自身，且当前模块为自身，则切换过来
			if(destroyPanel !== _ex.modeName && _data.currentPanel == _ex.modeName){
				_ex.init();
			}
		},

		destroy: function () {

			_data.prevBtn.attr("title", "前一个月");
			_data.nextBtn.attr("title", "后一个月");

			//解绑窗口resize
			$(window).off('.weekPanel');

			//解绑切换
			$('.today_calendar').off('.weekPanel');

			//隐藏周
			$('#today_calendar_week').hide();

			//隐藏今天
			$('#lnk_today').hide();

			//注销单元格
			_ex.destroyGird();

			$('#div_calendar_panel').empty();

			amplify.unsubscribe('scheduleViewUpdated', _ex.checkScheduleUpdated);
			amplify.unsubscribe('AcrossTheDay', _ex.acrossDate);

			amplify.publish('panelDestroied', _ex.modeName);
		},

		destroyGird: function () {
			for (var i = 0, l = _data.Girds.length; i < l; i++) {
				_data.Girds[i].destroy();
				_data.Girds[i] = null;
			};
			_data.Girds = [];
		},

		init: function () {
			//初始化数据
			_ex.buildData();
			
			//初始化基础UI
			_ex.buildBaseUI();

			//初始化逻辑
			_ex.buildLogic();

			//发出消息，模块已经切换完毕
			amplify.publish('calendarPanelChanged', _ex.modeName);
		},

		buildData: function () {
			_data.html = {
				head: '\
					<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head">\
						<tbody>\
							<tr class="calendar_th">\
								<th height="38">周一</th>\
								<th>周二</th>\
								<th>周三</th>\
								<th>周四</th>\
								<th>周五</th>\
								<th class="weekend">周六</th>\
								<th class="weekend">周日</th>\
							</tr>\
						</tbody>\
					</table>',
				headForSun: '\
					<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head">\
						<tbody>\
							<tr class="calendar_th">\
								<th height="38" class="weekend">周日</th>\
								<th>周一</th>\
								<th>周二</th>\
								<th>周三</th>\
								<th>周四</th>\
								<th>周五</th>\
								<th class="weekend">周六</th>\
							</tr>\
						</tbody>\
					</table>',
				day: '\
					<td class="ui-selectee ui-droppable" i="{i}" cellindex="{cell}" rowindex="{row}" valign="top">\
						<dl class="day_box">\
							<dt class="e_clear">\
								<span class="lunar-text"></span>\
								<span class="solar-text"></span>\
							</dt>\
						</dl>\
					</td>'
			};

			_data.yearDom = $('#sp_year');
			_data.monthDom = $('#sp_month');
			_data.prevBtn = $('#lnk_prev');
			_data.nextBtn = $('#lnk_next');

			_data.Girds = [];

			_data.today = new Date(+G.currDate);

			_data.date = new Date(+G.currDate)
			_data.month = _data.date.getMonth();
			_data.calendar = new Calendar(_data.date);
			_data.isSundayFirst = cp.getFirstDay() === 'sunday';
			_data.fromDate = _ex.getFromDate();
			_data.fromMonth = _data.fromDate.getMonth();

			_data.holidays = Holidays.getHolidays();

			_data.girdReady = 0;
			_data.needGetScheduleDayRang = null
		},

		buildBaseUI: function () {
			var htmlTemp = _data.html;
			var html = [];
			var cell = row = 0;
			for(var day = 0; day < GIRDNUM; day++){

				//判断周
				if(day % 7 == 0 && day !== 0){
					html.push('</tr><tr>');
				}
				cell = day % 7;
				row = parseInt(day / 7);
				html.push($.format(htmlTemp.day, {
					'i': day,
					'cell': cell,
					'row': row
				}));
			}

			//插入日表头
			html.unshift('<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table ui-selectable" id="div_wview" style="height: 373px;"><tbody><tr>');

			//插入星期
			html.unshift(_data.isSundayFirst ? htmlTemp.headForSun : htmlTemp.head);

			//插入日表尾
			html.join('</tbody></table>');

			$('#div_calendar_panel').html(html.join(''));

			_data.prevBtn.attr("title", "前一个周");
			_data.nextBtn.attr("title", "后一个周");

			_ex.resize();
		},

		buildLogic: function () {
			
			//监听resize
			$(window).on('resize.weekPanel', _ex.resize);

			$('.today_calendar')
				//后一个周
				.on('click.weekPanel', '#lnk_next', _ex.nextWeek)

				//前一个周
				.on('click.weekPanel', '#lnk_prev', _ex.prevWeek)

				//今天
				.on('click.weekPanel', '#lnk_today', _ex.toWeek)
			;

			//显示周
			$('#today_calendar_week').show();

			//显示今天
			$('#lnk_today').show();

			//注册单元格
			_ex.registGrid();

			amplify.subscribe('scheduleViewUpdated', _ex.checkScheduleUpdated);
			amplify.subscribe('AcrossTheDay', _ex.acrossDate);

		},

		getFromDate: function () {
			return _data.isSundayFirst ? _data.calendar.getWeekSundayFirstDate() : _data.calendar.getWeekFirstDate();
		},

		nextWeek: function () {
			//切换到下周
			var date = _data.date;
			date.setDate(date.getDate() + 7);

			_ex.updateDate()
		},

		prevWeek: function () {
			//切换到上周
			var date = _data.date;
			date.setDate(date.getDate() - 7);

			_ex.updateDate()
		},

		toWeek: function () {
			//切换到今天
			var date = _data.date;
			date.setYear(_data.today.getFullYear());
			date.setMonth(_data.today.getMonth());
			date.setDate(_data.today.getDate());

			_ex.updateDate()
		},

		acrossDate: function () {
			//如果为当前月，需要更新_data.date
			if(!(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth() || _data.date.getDate() !== _data.today.getDate())){
				_data.date = new Date(+G.currDate);
			}

			//更新今天
			_data.today = new Date(+G.currDate);
			
			_ex.updateDate()
		},

		updateDate: function () {
			//更新其他信息
			_data.month = _data.date.getMonth();
			_data.calendar = new Calendar(_data.date);
			_data.fromDate = _ex.getFromDate();
			_data.fromMonth = _data.fromDate.getMonth();

			var thisDay = _data.date;
			var thisDayY = thisDay.getFullYear();
			var thisDayM = thisDay.getMonth() + 1;
			var firstDay = new Date(thisDayY, 0, 1);
			var dayweek = thisDay.getDay();
			if (dayweek == 0) {
				dayWeek = 7;
			}
			var startWeek = firstDay.getDay();
			if (startWeek == 0) {
				startWeek = 7;
			}
			var weekNum = parseInt(((thisDay.getTime() - firstDay.getTime()) / (24 * 60 * 60 * 1000) + startWeek - dayweek) / 7 + 1);
			$("#sp_week").html([thisDayY, "年第", weekNum, "周     ", thisDayM, "月"].join(""));

			//判断是否需要显示今天
			if(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth() || _data.date.getDate() !== _data.today.getDate()){
				$('#lnk_today').show();
			}
			else{
				$('#lnk_today').hide();
			}

			amplify.publish('dateUpdated', _data);
		},

		registGrid: function () {
			var girdDom = _data.gird = $('.calendar_table td');
			var gird = null;
			for (var i = 0, l = girdDom.length; i < l; i++) {
				gird = new Gird(girdDom[i], i);
				gird.init();

				_data.Girds.push(gird);
			};

			_ex.toWeek();
		},

		checkScheduleUpdated: function  () {

			//检测数初始化
			if(_data.girdReady === GIRDNUM){
				_data.girdReady = 0;
			}

			_data.girdReady++;

			//如果缺少数据，设置需要获取的日期范围
			if(arguments[0] === 'noData'){
				_ex.setNeedGetScheduleRang(arguments[1], arguments[2]);
			}

			// //如果缺少日历，设置需要获取的日历
			// if(arguments[0] === 'notEnoughCalendars'){
			// 	_ex.setNeedGetScheduleCalendarRang(arguments[1]);
			// }

			//检测数未满，跳过
			if(_data.girdReady !== GIRDNUM){
				return
			}

			//最终判断1：数据不完整，请求数据；2：数据完整，日历准备完毕
			if(_data.needGetScheduleRang){
				amplify.publish('scheduleDataNotEnough', _data.needGetScheduleRang)
				
				//清空，否则会死循环
				rang = _data.needGetScheduleRang = null;
			}
			else{
				amplify.publish('calendarReady');
				amplify.publish('calendarAndScheduleChanged', 'week'); //通知更新桌面widget
			}
		},

		setNeedGetScheduleRang: function (dateString, calendars) {
			var rang = _data.needGetScheduleRang;
			var girdDate = new Date(dateString.replace(/-/g, "/"));

			if(!rang) {
				rang = _data.needGetScheduleRang = {};
				rang.begin = rang.end = girdDate;
				rang.calendars = {};
			}

			else if(girdDate < rang.begin){
				rang.begin = girdDate;
			}

			else if(girdDate > rang.end){
				rang.end = girdDate;
			}

			//无日期表示无数据，则不光是日期信息，还需要包括所选日历信息
			for (var i = 0, l = calendars.length; i < l; i++) {
				if(!rang.calendars[calendars[i]]){
					rang.calendars[calendars[i]] = 1;
				}
			};
		},

		resize: function () {
			var panel = $('.calendar_table');
			var windowHeight = $(window).height();
			var resizeHeight = windowHeight - $('#div_today').height() - $('.js_tb_head').height();
			if(!c.isPCVersion()){
				resizeHeight -= $('.calendar_header').height();
			}
			$('.calendar_table').height(
				resizeHeight
			);
			amplify.publish('panelResized');
		}
	};

	amplify.subscribe('toChangeCalendarPanel', _ex.checkPanel);
	amplify.subscribe('panelReady', _ex.report);
	amplify.subscribe('panelDestroied', _ex.checkOtherPanelDestroy);
})