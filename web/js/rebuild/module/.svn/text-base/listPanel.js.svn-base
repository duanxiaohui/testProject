define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/class/GirdForList',
	'rebuild/module/getHolidays',
    'rebuild/module/scheduleData',
	'rebuild/base/solarAndLunar'
], function(c, cp, Gird, Holidays) {
	//一个月最多31天，生成31个单元格对象，超出实际天数的单元格隐藏
	var GIRDNUM = 31;
	var _data = {};
	var _ex = {
		modeName: 'list',
		report: function () {
			amplify.publish('initPanelModule', _ex.modeName, '#ul_view_switcher li[tab="list"]');
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

			//解绑窗口resize
			$(window).off('.listPanel');

			//注销单元格
			_ex.destroyGird();

			//解绑切换
			$('.today_calendar').off('.listPanel');

			//解绑显示
			$('#p_only_hassch').off('.listPanel');

			//隐藏日程控制
			$('.month_view_title').hide();

			//隐藏年月
			$('#today_calendar_year_month').hide();

			//隐藏今天
			$('#lnk_today').hide();

			$('#div_calendar_panel').empty();

			amplify.unsubscribe('scheduleViewUpdated', _ex.checkScheduleUpdated);
			amplify.unsubscribe('calendarReady', _ex.position);
			amplify.unsubscribe('calendarReady', _ex.checkShowOnly);
			amplify.unsubscribe('today', _ex.setToday);
			amplify.unsubscribe('AcrossTheDay', _ex.acrossDate);

			amplify.publish('panelDestroied', _ex.modeName);

			
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
				day: '\
					<li i={i} class="{evenodd}">\
						<div class="month_view_date">\
							<h3><span class="month_view_week"></span><span class="month_view_ymd"></span></h3>\
							<p><span class="month_view_solar"></span><span class="month_view_festival"></span></p>\
							<a href="javascript:;" class="month_view_add_schedule_btn none">加日程</a>\
						</div>\
						<div class="month_view_schedule">\
						</div>\
					</li>'
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
			_data.fromDate = new Date(_data.today);
			_data.fromMonth = _data.fromDate.getMonth();

			_data.dayNum = 0;

			_data.holidays = Holidays.getHolidays();

			_data.girdReady = 0;
			_data.needGetScheduleDayRang = null
		},

		buildBaseUI: function () {
			var htmlTemp = _data.html;
			var html = [], evenodd = 'even';
			for(var day = 0; day < GIRDNUM; day++){
				//判断行
				evenodd = evenodd == 'odd' ? 'even' : 'odd';
				
				html.push($.format(htmlTemp.day, {
					'i': day,
					'evenodd': evenodd
				}));
			}

			//插入日表头
			html.unshift('<div id="div_lview" class="month_view_right"><ul id="ul_lview_schdulelist">');

			//插入日
			html.unshift(htmlTemp.head);

			//插入日表尾
			html.join('</ul></div>');

			$('#div_calendar_panel').html(html.join(''));

			_ex.resize();
		},

		buildLogic: function () {
			//监听resize
			$(window).on('resize.listPanel', _ex.resize);

			$('.today_calendar')
				//后一个月
				.on('click.listPanel', '#lnk_next', _ex.nextMonth)

				//前一个月
				.on('click.listPanel', '#lnk_prev', _ex.prevMonth)

				//今天
				.on('click.listPanel', '#lnk_today', _ex.today)
			;

			//显示今天
			$('#lnk_today').show();
			
			$('#today_calendar_year_month')
				//显示年月
				.show()

				//鼠标切换年
				.on('mousewheel.monthPanel', '#sp_year', _ex.wheelYear)

				//鼠标切换月
				.on('mousewheel.monthPanel', '#sp_month', _ex.wheelMonth)
			;

			//显示日程控制
			$('.month_view_title').show();

			//绑定日程控制
			$('#p_only_hassch').on('click.listPanel', function (e) {
				e.stopPropagation();
				var me = $(this);
				me.toggleClass('on');
				_ex.checkShowOnly();
			});

			//注册单元格
			_ex.registGrid();

			amplify.subscribe('scheduleViewUpdated', _ex.checkScheduleUpdated);
			amplify.subscribe('calendarReady', _ex.checkShowOnly);
			amplify.subscribe('today', _ex.setToday);
			amplify.subscribe('AcrossTheDay', _ex.acrossDate);
		},

		checkShowOnly: function () {
			amplify.publish('showOnly', $('#p_only_hassch').hasClass('on'));

			//重新定位
			setTimeout(_ex.position, 200);
		},

		setToday: function () {
			_data.todayGird = arguments[0];
		},

		position: function () {
			if(cp.getCurrentPanel() !== 'list'){
				return;
			}
			try{
				if(!_data.todayGird){
					$('#div_lview').scrollTop(0);
					return;
				}
				var $dom = _data.todayGird.$dom;
				$('#div_lview').scrollTop($dom.offset().top + $('#div_lview').scrollTop() - $('#div_lview').offset().top);
				}
			catch(e){}

		},

		setDayNum: function () {
			var date = new Date(_data.date);

			//切换到本月最后一天
			date.setMonth(date.getMonth() + 1);
			date.setDate(0);
			
			//设置单元格数为本月天数
			_data.dayNum = date.getDate();
		},

		registGrid: function () {
			var girdDom = _data.gird = $('#ul_lview_schdulelist li');
			var gird = null;
			for (var i = 0, l = girdDom.length; i < l; i++) {
				gird = new Gird(girdDom[i], i);
				gird.init();

				_data.Girds.push(gird);
			};

			_ex.today();
		},

		destroyGird: function () {
			for (var i = 0, l = _data.Girds.length; i < l; i++) {
				_data.Girds[i].destroy();
				_data.Girds[i] = null;
			};
			_data.Girds = [];
		},

		nextMonth: function () {
			//切换到下个月的第一天
			_data.date.setMonth(_data.date.getMonth() + 1);
			_data.date.setDate(1);

			_ex.updateDate();
		},

		prevMonth: function () {
			//切换到上个月的第一天
			_data.date.setMonth(_data.date.getMonth() - 1);
			_data.date.setDate(1);

			_ex.updateDate();
		},

		today: function () {
			//切换到当前月第一天
			_data.date.setYear(_data.today.getFullYear());
			_data.date.setMonth(_data.today.getMonth());
			_data.date.setDate(1);

			_ex.updateDate();
		},

		acrossDate: function () {
			//如果为当前月，需要更新_data.date
			if(!(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth())){
				_data.date = new Date(+G.currDate);
				_data.date.setDate(1);
			}

			//更新今天
			_data.today = new Date(+G.currDate);
			
			_ex.updateDate()
		},

		updateDate: function () {
			//更新其他信息
			_data.month = _data.date.getMonth();
			_data.calendar = new Calendar(_data.date);
			_data.fromDate = _data.date;
			_data.fromMonth = _data.fromDate.getMonth();
			_data.todayGird = null;

			//设置天数
			_ex.setDayNum();

			//判断是否需要显示今天
			if(_data.date.getFullYear() !== _data.today.getFullYear() || _data.month !== _data.today.getMonth()){
				$('#lnk_today').show();
			}
			else{
				$('#lnk_today').hide();
			}

			//更新显示日期
			$('#sp_year').text(_data.date.getFullYear());
			$('#sp_month').text(_data.date.getMonth() + 1);

			amplify.publish('dateUpdated', _data);
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
				amplify.publish('calendarAndScheduleChanged', 'list'); //通知更新桌面widget
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
			var resizeHeight = windowHeight - $('#div_today').height() - $('.month_view_title').height();
			if(!c.isPCVersion()){
				resizeHeight -= $('.calendar_header').height();
			}
			$('#div_calendar_panel').height(
				resizeHeight
			);
			amplify.publish('panelResized');
		}
	}

	amplify.subscribe('toChangeCalendarPanel', _ex.checkPanel);
	amplify.subscribe('panelReady', _ex.report);
	amplify.subscribe('panelDestroied', _ex.checkOtherPanelDestroy);
});