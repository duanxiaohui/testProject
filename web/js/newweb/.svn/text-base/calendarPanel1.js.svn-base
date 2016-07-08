$.widget('mxx.calendarPanel', {
	options: {
		defaultDate: G.currDate,
		year: '#sp_year',
		month: '#sp_month',
		prevBtn: '#lnk_prev',
		nextBtn: '#lnk_next',
		todayBtn: '#lnk_today'
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		
		this.date = new Date(+opt.defaultDate);
		this.panel = $elem;
		this.year = $(opt.year);
		this.month = $(opt.month);
		this.prevBtn = $(opt.prevBtn);
		this.nextBtn = $(opt.nextBtn);
		this.todayBtn = $(opt.todayBtn);
		this.today = new Date(+G.currDate);
		this.headHtml = '<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head"><tbody><tr class="calendar_th"><th height="38">周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th class="weekend">周六</th><th class="weekend">周日</th></tr></tbody></table>';
		this.headHtmlSundayFirst = '<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head"><tbody><tr class="calendar_th"><th height="38"  class="weekend">周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th class="weekend">周六</th></tr></tbody></table>';

		this.tdHtml = '<td class="{monthClass}" date="{date}" valign="top"><dl class="day_box"><dt class="e_clear"><span style="color:#{color}" title="{lunar}" class="lunar-text">{lunar}</span><span class="solar-text">{solar}</span>{todaytext}{vocationtext}{worktext}</dt><dd class="task_more"></dd></dl></td>';
		this.tmplTask = '<dd stime="{start_time}" rtype="{repeat_type}" cid="{cid}" sid="{id}" access_type="{access_type}" allday_event="{allday_event}" pics="{pic_str}" class="task jsc-{cid}" cont="{text}" location="{location}" url="{url}"><div class="spheric ui-corner-all-16"></div><p class="task_text" title="{time}&nbsp;{text}">{time}&nbsp;{text}</p></dd>';
		this.tmplMore = '<div class="schedule_list_layer ui-shadow none"><dl><dt><a href="javascript:;" class="close_btn"></a><span></span></dt></dl><dl style="max-height:400px;_height:400px;overflow:auto;"></dl></div>';
		
		this.tmplList = '<li class="{evenodd}" date="{date}">\
							<div class="month_view_date">\
								<h3><span class="month_view_week">周{week}</span><span class="month_view_ymd">{date}</span></h3>\
								<p><span class="month_view_solar">{lmonth}月{ldate}</span><span class="month_view_festival">{festival}</span></p>\
								{todaytext}{vocationtext}{worktext}\
								<a href="javascript:;" class="month_view_add_schedule_btn none" date="{date}">加日程</a>\
							</div>\
							<div class="month_view_schedule">\
							</div>\
						</li>';
		self.tmplTaskList = '<dl stime="{start_time}" rtype="{repeat_type}" cid="{cid}" sid="{id}" access_type="{access_type}" allday_event="{allday_event}">\
			<dt><div class="spheric ui-corner-all-16 jsc-{cid}"></div>\
			<span class="month_view_schedule_time">{time}</span>\
			<a sid="{id}" href="javascript:;" title="修改日程" class="month_view_edit_schedule none"></a><a sid="{id}" href="javascript:;" title="删除日程" class="month_view_del_schedule none"></a></dt>\
			<dd>{htmltmpl}</dd>\
		</dl>';
		
		
		this.prevBtn.add(this.nextBtn).click(function(evt){
			evt.preventDefault();
			$.loading();
			if($('#ul_view_switcher li.on').attr("tab") == "week"){
				var $lnk = $(this), delta = Number($lnk.attr('delta'));
				if(delta > 0){
					self.date.setTime(self.date.getTime() + 86400000 * 7);					
				}else{
					self.date.setTime(self.date.getTime() - 86400000 * 7);
				}
				self._setWeekSpan(self.date);
				//TODO 改进周视图的上下切换
				self._init();
			}else{
				var $lnk = $(this), delta = Number($lnk.attr('delta'));
				delta ? self.date.setDate(delta > 0 ? 32 : 0) : (self.date = new Date(+G.currDate));
				self._init();		
			}
		});
		this.todayBtn.click(function(evt){
			self.date = new Date(+G.currDate);
			self._init();
		});
		
		this.year.add(this.month).mousewheel(function(evt, delta){
			if (this.id == opt.month.slice(1)) {
				self[delta < 0 ? 'prevBtn' : 'nextBtn'].click();
			} else {
				var year = self.year.html() - 0, month = self.month.html() - 0;
				self.date = new Date(year + delta, month - 1, 1);
				self._init();
			}
		});
		
		var $liViewSwitcher = $('#ul_view_switcher li').click(function(){
			$.loading();
			$liViewSwitcher.removeClass('on');
			$(this).addClass('on');
			$(".calendar_sub_view").hide();
			$(".today_calendar_data").hide();
			var tabType = $(this).attr("tab");
			if(tabType == "month"){
				$(".my_calendar_center").show();
				$("#today_calendar_year_month").show();
				$("#lnk_prev").attr("title", "前一个月");
				$("#lnk_next").attr("title", "后一个月");
				self.fixPanelHeight();
				$.loading.close();
			}else if(tabType == "list"){
				$("#div_calendar_lview").show();
				$("#today_calendar_year_month").show();
				$(".month_view_title").show();
				$("#lnk_prev").attr("title", "前一个月");
				$("#lnk_next").attr("title", "后一个月");
				$.loading.close();
			}else{
				$("#calenar_week_view").show();
				$("#today_calendar_week").show();
				$("#lnk_prev").attr("title", "前一周");
				$("#lnk_next").attr("title", "后一周");
				$.loading.close();
			}
			if(tabType!="month"){
				$('.schedule_list_layer').hide();
			}
		});
		
		$(window).resize(function(){
			self.fixPanelHeight();
			self.rePositionTip();
		});
		
		self.$divLview = $('#div_lview');
		self.$cldListView = $('#div_calendar_lview');
		self.$h3LviewYear = $('#h3_lview_year');
		self.$ulLviewYear = $('#ul_lview_year');
		self.$ulLviewMonth = $('#ul_lview_month');
		self.$ulLviewSchList = $('#ul_lview_schdulelist');
		self.$lnkLviewAdd = $('#lnk_lview_addsch');
		self.$pOnlyHas = $('#p_only_hassch');
		
		var ys = this.date.getFullYear() - 5, ye = this.date.getFullYear() + 3;
		self.$ulLviewYear.html($.map(new Array(ye - ys), function(_, i){
			return '<li>' + (ys + i) + '年</li>';
		}).reverse().join(''));
		
		self.$h3LviewYear.click(function(evt){
			evt.stopPropagation();
			if (self.$ulLviewYear.is(':visible')) {
				self.$h3LviewYear.removeClass('on');
				self.$ulLviewYear.hide();
			} else {
				self.$h3LviewYear.addClass('on');
				self.$ulLviewYear.show();
			}
		});
		$('body').click(function(){
			self.$h3LviewYear.removeClass('on');
			self.$ulLviewYear.hide();
		});
		self.$ulLviewYear.find('li').click(function(evt){
			evt.stopPropagation();
			var $li = $(this), text = $li.text(), year = parseInt(text, 10);
			self.$h3LviewYear.text(text);
			self.$h3LviewYear.removeClass('on');
			self.$ulLviewYear.hide();
			var date = new Date(self.date);
			date.setFullYear(year);
			self.$lnkLviewAdd.attr('date', formatDate(date));
			self.setDate(date);
		});
		self.$liLviewMonth = self.$ulLviewMonth.find('li').click(function(evt){
			self.$liLviewMonth.removeClass('on');
			var $li = $(this), text = $li.text(), month = parseInt(text, 10) - 1;
			$li.addClass('on');
			var date = new Date(self.date);
			date.setMonth(month);
			self.$lnkLviewAdd.attr('date', formatDate(date));
			self.setDate(date);
		});
		self.$liLviewMonth.eq(self.date.getMonth()).addClass('on');
		
		self.$lnkLviewAdd.attr('date', formatDate(self.date)).scheduleCreator();
		
		self.$pOnlyHas.click(function(evt){
			if (self.$pOnlyHas.hasClass('on')) {
				self.$pOnlyHas.removeClass('on');
				self.$ulLviewSchList.find('li').show();
			} else {
				self.$pOnlyHas.addClass('on');
				self.$ulLviewSchList.find('li').show();
				self.$ulLviewSchList.find('li').filter(function(){
					return !$('dl', this).size();
				}).hide();
			}
		});
		
	},
	_init: function(sid, date, scheduleContentStr){
		var self = this, $elem = $(this.element), opt = this.options;
		
		var festival2014 = {}, workday2014 = {};
		$.each('m1d1 m1d31 m2d1 m2d2 m2d3 m2d4 m2d5 m2d6 m4d5 m4d6 m4d7 m5d1 m5d2 m5d3 m5d31 m6d1 m6d2 m9d6 m9d7 m9d8 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
			festival2014[key] = 'rest';
		});
		
		$.each('m1d26 m2d8 m5d4 m9d28 m10d11'.split(' '), function(_, key){
			workday2014[key] = 'work';
		});
		
		
		var festival2013 = {}, workday2013 = {};
		$.each('m1d1 m1d2 m1d3 m2d9 m2d10 m2d11 m2d12 m2d13 m2d14 m2d15 m4d4 m4d5 m4d6 m4d29 m4d30 m5d1 m6d10 m6d11 m6d12 m9d19 m9d20 m9d21 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
			festival2013[key] = 'rest';
		});
		
		$.each('m1d5 m1d6 m2d16 m2d17 m4d7 m4d27 m4d28 m6d8 m6d9 m9d22 m9d29 m10d12'.split(' '), function(_, key){
			workday2013[key] = 'work';
		});
		
		//初始化表格视图
		var cld = new Calendar(this.date), calYear = this.date.getFullYear(), calMonth = this.date.getMonth(), calDate = this.date.getDate(), t = this.today;
		var headHtml;
		if(self._getSundayFirst()){
			this.fromDate = cld.getCalendarSundayFirstDate();
			headHtml = self.headHtmlSundayFirst;
		}else{
			this.fromDate = cld.getCalendarFirstDate();
			headHtml = self.headHtml;
		}		
		var startDate = new Date(this.fromDate);
		var rowsHtml = $.map(new Array(42), function(_, i){
			var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
			var l = lunar(startDate), festival = l.festival(), isToday = d == t.getDate() && m == t.getMonth() && y == t.getFullYear();
			var key = 'm' + (m + 1) + 'd' + d;
			
			return [i % 7 == 0 ? '<tr>' : '', $.format(self.tdHtml, {
				todaytext: isToday ? '<span class="today-text">今天</span>' : '',
				vocationtext: (y == 2013 && festival2013[key]) || (y == 2014 && festival2014[key]) ? '<span class="vocationt-text">放假</span>' : '',
				worktext: (y == 2013 && workday2013[key]) || (y == 2014 && workday2014[key]) ? '<span class="work-text">工作</span>' : '',
				monthClass: m < calMonth ? 'month_befor' : m > calMonth ? 'month_after' : isToday ? 'table-today' : w == 0 || w == 6 ? 'weekend' : '',
				solar: startDate.getDate(),
				lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: formatDate(startDate),
				color: festival.length || l.term ? '198500' : '808080'
			}), i % 7 == 6 ? '</tr>' : '', void (startDate.setDate(startDate.getDate() + 1))].join('');
		});		
		this.toDate = new Date(startDate);
		this.panel.html([headHtml, '<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table">', rowsHtml.join(''), '</table>'].join(''));
		this.mainTable = this.panel.find('table.calendar_table');
		this.schContainers = this.mainTable.find('dl');
		this.year.html(calYear);
		this.month.html(('0' + (calMonth + 1)).slice(-2));
		this.todayBtn[calYear == this.today.getFullYear() && calMonth == this.today.getMonth() ? 'hide' : 'show']();
		this.selectable();
		this.droppable();
		this.moreTask();
		this.panel.find('table.calendar_table td').scheduleCreator();
		
		//初始化列表视图
		var curDate = new Date(this.date);
		curDate.setDate(1);
		var startDate = new Date(curDate);
		curDate.setMonth(curDate.getMonth() + 1);
		curDate.setDate(0);
		var days = curDate.getDate();
		
		var calYear = this.date.getFullYear(), calMonth = this.date.getMonth(), calDate = this.date.getDate(), t = this.today;
		var listHtml = $.map(new Array(days), function(_, i){
			var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
			var l = lunar(startDate), festival = l.festival(), isToday = d == t.getDate() && m == t.getMonth() && y == t.getFullYear();
			var key = 'm' + (m + 1) + 'd' + d;
			
			return [$.format(self.tmplList, {
				evenodd: i % 2 ? 'even' : 'odd',
				week: l.cnDay,
				todaytext: isToday ? '<p class="month_view_today">今天</p>' : '',
				vocationtext: y == 2013 && festival2013[key] ? '<p class="month_view_rest">放假</p>' : '',
				worktext: y == 2013 && workday2013[key] ? '<p class="month_view_work">上班</p>' : '',
				lmonth: l.lMonth,
				ldate: l.lDate,
				festival: festival[0] && festival[0].desc || l.term || '',
				date: formatDate(startDate)
			}), void (startDate.setDate(startDate.getDate() + 1))].join('');
		});
		this.$ulLviewSchList.html(listHtml.join(''));
		var tday = this.$ulLviewSchList.find('.month_view_today'), tday_loc;
		if(tday.size()) {
		    tday_loc = tday.offset().top;
		    this.$divLview.scrollTop(tday_loc-150);
		} else {
		    this.$divLview.scrollTop(0);
		}
		this.$ulLviewSchList.find('a.month_view_add_schedule_btn').scheduleCreator();
		
		//初始化周视图
		var weekFirstDate = cld.getWeekFirstDate();
		if(self._getSundayFirst()){
			weekFirstDate = cld.getWeekSundayFirstDate();
		}
		if($('#ul_view_switcher li.on').attr("tab") == "week"){
			var tmpDate = new Calendar(this.today).getWeekFirstDate();
			var tmpFirstDate = cld.getWeekFirstDate();
			if(tmpDate.getFullYear() == tmpFirstDate.getFullYear() && tmpDate.getMonth() == tmpFirstDate.getMonth() && tmpDate.getDate() == tmpFirstDate.getDate())
				this.todayBtn.hide();
			else	
				this.todayBtn.show();
		}
		var startDate = new Date(this.fromDate);
		var weekHtml = $.map(new Array(42), function(_, i){
			var y = startDate.getFullYear(), m = startDate.getMonth(), d = startDate.getDate(), w = startDate.getDay();
			var l = lunar(startDate), festival = l.festival(), isToday = d == t.getDate() && m == t.getMonth() && y == t.getFullYear();
			var key = 'm' + (m + 1) + 'd' + d;
			var trClass = "none";
			if(startDate.getFullYear()==weekFirstDate.getFullYear()&&startDate.getMonth()==weekFirstDate.getMonth()&&startDate.getDate()==weekFirstDate.getDate()){
				trClass = "show";
			}
			return [i % 7 == 0 ? '<tr date="'+formatDate(startDate)+'" class="'+trClass+'">' : '', $.format(self.tdHtml, {
				todaytext: isToday ? '<span class="today-text">今天</span>' : '',
				vocationtext: (y == 2013 && festival2013[key]) || (y == 2014 && festival2014[key]) ? '<span class="vocationt-text">放假</span>' : '',
				worktext: (y == 2013 && workday2013[key]) || (y == 2014 && workday2014[key]) ? '<span class="work-text">工作</span>' : '',
				monthClass: m < calMonth ? 'month_befor' : m > calMonth ? 'month_after' : isToday ? 'table-today' : w == 0 || w == 6 ? 'weekend' : '',
				solar: startDate.getDate(),
				lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
				date: formatDate(startDate),
				color: festival.length || l.term ? '198500' : '808080'
			}), i % 7 == 6 ? '</tr>' : '', void (startDate.setDate(startDate.getDate() + 1))].join('');
		});
		$("#div_wview").html([headHtml, '<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table">', weekHtml.join(''), '</table>'].join(''));
		$("#div_wview").find('table.calendar_table td').scheduleCreator();
		self._setWeekSpan(this.date);
		
		this.fixPanelHeight();
		this.scheduleData = [];
		this.refresh(sid, date, scheduleContentStr);
	},
	setScroll: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $calNav = self.$divLview, height = $calNav.height()-32;
		if ($calNav.data('jsp')) {
			if ($calNav.is(':visible')) {
				$calNav.data('jsp').reinitialise();
			} else {
				$calNav.slideToggle(function(){
					$calNav.data('jsp').reinitialise();
				});
			}
		} else {
			$calNav.jScrollPane();
		}
	},
	/**
	 * 创建日历列表、切换日历显示状态 新增日程、修改日程、删除日程
	 */
	refresh: function(sid, date, scheduleContentStr){
		var self = this, $elem = $(this.element), opt = this.options;
		var cldIDs = G.cldList.calendarList('getSelectedCalendarIDs');
		if (cldIDs !== null) {
			var arNeedLoad = [], allCacheIds = $.map(this.scheduleData, function(o){
				return o.cid;
			});
			arNeedLoad = $.map(cldIDs, function(id){
				return $.inArray(id, allCacheIds) > -1 ? undefined : id;
			});
			if (arNeedLoad.length) {
				$.ajax({
					url: '/schedule/list.do',
					type: 'post',
					dataType: 'json',
					data: {
						fromDate: formatDate(this.fromDate),
						toDate: formatDate(this.toDate),
						timeZone: -this.fromDate.getTimezoneOffset() / 60,
						calendarId: arNeedLoad.join(',')
					},
					success: function(data){
						if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						} else {
							self.mergeScheduleData(data);
							self.showSchedules(cldIDs, sid, date, scheduleContentStr);
						}
					}
				});
			} else if (this.scheduleData.length) {
				self.showSchedules(cldIDs, sid, date, scheduleContentStr);
			}
		}
	},
	showSchedules: function(cldIDs, sid, date, scheduleContentStr){
		var self = this, $elem = $(this.element), opt = this.options;
		var $tasks = $('#notexist'), $dls = $('#notexist'), oSort = {}, oPermissions = G.cldList.calendarList('getPermissionsMap');
		this.schContainers.find('dd').hide().filter('.task').remove();
		$("#div_wview table.calendar_table dl").find('dd').hide().filter('.task').remove();
		//获取日程数据，存储到oSort
		$.each(this.getScheduleData(cldIDs), function(_, c){
			//需要处理跨天的日程
			var expand_schlist = [];
			$.each(c.schlist, function(_, o){
				//处理图片
				if(c.piclist && c.piclist[o.uuid]){
					o.pics = c.piclist[o.uuid];
				}
				if(o.duration > 0){
					expand_schlist.push(o);
					function getDateFromStr(str){
						var d = new Date();
						try{
							var ary = o.start_time.split(" ");
							d.setFullYear(ary[0].split("-")[0]);
							d.setMonth(parseInt(ary[0].split("-")[1],10) - 1,ary[0].split("-")[2]);
							
							d.setHours(ary[1].split(":")[0]);
							d.setMinutes(ary[1].split(":")[1]);
							d.setSeconds(ary[1].split(":")[2])
							return d;
						}catch(e){
							return new Date(str);
						}
					}
					var start = getDateFromStr(o.start_time);
					var end = new Date(start.getTime() + o.duration*1000);
					var start_zero = new Date(start);
					start_zero.setHours(0);
					start_zero.setMinutes(0);
					start_zero.setSeconds(0);
					
					for(var i=new Date(start_zero.getTime() + 86400000); i<=end; i=new Date(i.getTime()+86400000)){
						var clonedObj = {};
						$.extend(clonedObj,o);
						clonedObj.start_time = formatDate(i) + " 09:00:00";
						clonedObj.allday_event = true;
						expand_schlist.push(clonedObj);
					}
				}else{
					expand_schlist.push(o);
				}
			});
			$.each(expand_schlist, function(_, o){
				//add pic_str
				if(o.pics){
					o.pic_str = $.map(o.pics, function(val, index){
						return val.pic;
					}).join(",");
				}else{
					o.pic_str = "";
				}
				var d = o.start_time.split(' ')[0];
				if (!oSort[d]) {
					oSort[d] = [];
				}
				o.access_type = oPermissions[o.cid];
				o.time = o.allday_event ? '全天' : o.start_time.slice(11, 16);/*全天改成空串*/
				oSort[d].push(o);
			});
		});
		
		$.each(oSort, function(d, ar){
			var $td = self.panel.find('td[date="' + d + '"]'), $dl = $td.find('dl'), cellIndex = $td.prop('cellIndex'), ddsHtml = $.map(ar, function(o, i){
				o.text=htmlDecode(o.text);
				return $.format(self.tmplTask, o)
			}).sort().join('');
			var $dds = $(ddsHtml).attr('cellIndex', cellIndex);
			$dl.find('dd.task_more').before($dds);
			$tasks = $tasks.add($dds);
			$dls = $dls.add($dl);
			
			//周视图
			var $weekDl = $("#div_wview").find('td[date="' + d + '"] dl');
			if($weekDl.size() > 0){
				var weekDds = $(ddsHtml).attr('cellIndex', cellIndex);
				$weekDl.find('dd.task_more').before(weekDds);
				$tasks = $tasks.add(weekDds);
			}
		});
		
		self.$ulLviewSchList.find('li').show().find('div.month_view_schedule').empty()
		$.each(oSort, function(d, ar){
			var $li = self.$ulLviewSchList.find('li[date="' + d + '"]'), $div = $li.find('div.month_view_schedule');
			$div.html($.map(ar, function(o, i){
				o.htmltmpl=o.text.replace(/\n/g,'<br/>');				
				return $.format(self.tmplTaskList, o);
			}).sort().join(''));
		});
		var isOnlyShow = self.$pOnlyHas.hasClass('on');
		if (isOnlyShow) {
			self.$pOnlyHas.removeClass('on').triggerHandler('click');
		}
		
		self.addLviewHandler();
		G.cldList.calendarList('setColor', self.panel.add(self.$ulLviewSchList).add("#div_wview"), '.jsc-');
		
		
		this.tip($tasks);
		this.fixSize($dls);
		this.draggable();
		
		if (sid) {
			var $dl = self.panel.find('td[date="' + formatDate(self.date) + '"] dl');
			if ($dl.size()) {
				var $more = $dl.find('dd.task_more');
				self.closeTip();
				if ($more.is(':visible')) {
					$more.click();
					self.moreTip.find('dd[sid="' + sid + '"]').click();
				} else {
					$dl.find('dd[sid="' + sid + '"]').click();
				}
			}
		} else if (date) {
			var $td = this.mainTable.find('td[date="' + formatDate(date) + '"]');
			$td.scheduleCreator('showForm', $td, null, scheduleContentStr);
		}
		$.loading.close();
	},
	getScheduleData: function(cids){
		return $.map(this.scheduleData, function(o){
			return $.inArray(o.cid, cids) > -1 ? o : undefined;
		});
	},
	mergeScheduleData: function(data){
		var self = this, $elem = $(this.element), opt = this.options;
		if ($.isPlainObject(data)) {
			data = [data];
		}
		$.each(data, function(i, o){
			var cid = o.cid;
			for (var c, i = 0, l = self.scheduleData.length; i < l; i++) {
				c = self.scheduleData[i];
				if (c.cid == cid) {
					$.each(o.schlist, function(_, s){
						for (var j = c.schlist.length - 1; j > -1; j--) {
							if (s.id == c.schlist[j].id) {
								c.schlist.splice(j, 1);
							}
						}
					});
					c.schlist = c.schlist.concat(o.schlist);

					/**
					 * 原因: o.piclist为空时没有删除数据操作，相当于跳过此步
					 * 增加piclist数据判断
					 */
					if(JSON.stringify(o.piclist) === '{}'){
						c.piclist=[];
					}
					

					for(var i in o.piclist){
						if(!c.piclist){
							c.piclist=[];
						}
						c.piclist[i] = o.piclist[i];
					}
					return false;
				}
			}
			self.scheduleData.push(o);
		});
		self.scheduleData.sort(function(a, b){ return a.cid - b.cid; });
	},
	deleteScheduleData: function(sid){
		var self = this, $elem = $(this.element), opt = this.options;
		for (var c, i = 0, l = self.scheduleData.length; i < l; i++) {
			c = self.scheduleData[i];
			for (var j = c.schlist.length - 1; j > -1; j--) {
				if (sid == c.schlist[j].id) {
					c.schlist.splice(j, 1);
				}
			}
		}
	},
	addLviewHandler: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var $lnkEdit = self.$ulLviewSchList.find('a.month_view_edit_schedule'), $lnkDel = self.$ulLviewSchList.find('a.month_view_del_schedule');
		self.$ulLviewSchList.find('dl').mouseenter(function(evt){
			//判断日历的权限，如果是只读则不显示编辑和删除按钮
			var access_type = $(this).attr("access_type");
			if(access_type != 0 && access_type != 1)
				$('a.month_view_edit_schedule,a.month_view_del_schedule', this).show();
		}).mouseleave(function(evt){
			$('a.month_view_edit_schedule,a.month_view_del_schedule', this).hide();
		});
		self.$ulLviewSchList.find('li').mouseenter(function(evt){
			$('a.month_view_add_schedule_btn', this).removeClass('none');
		}).mouseleave(function(evt){
			$('a.month_view_add_schedule_btn', this).addClass('none');
		});
		self.$ulLviewSchList.find('dd').addClass("on");
		self.$ulLviewSchList.find('dd').click(function(){
			if($(this).filter("on")){
				$(this).toggleClass("on");
			}
		});
		$lnkEdit.scheduleCreator();
		$lnkDel.click(function(evt){
			evt.preventDefault();
			var $lnk = $(this);
			self.delSchedule($lnk);
		});
	},
	draggable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.schContainers.find('dd.task[access_type!="1"]').draggable({
			helper: 'clone',
			appendTo: 'body',
			delay: 800,
			scope: 'schedule',
			// containment: self.mainTable,
			opacity: 0.65,
			zIndex: 9999,
			start: function(evt, ui){
				ui.helper.width($(this).width());
			}
		});
	},
	droppable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.mainTable.find('td').droppable({
			accept: 'schedule',
			drop: function(evt, ui){
				var rtype = ui.draggable.attr('rtype'), $td = $(this), date = new Date($td.attr('date').replace(/-/g, '/'));
				if (!$td.find(ui.draggable).size() && ui.draggable.parent().attr('date') != $td.attr('date')) {
					if (rtype == "0") {
						ui.draggable.triggerHandler('click', true);
						var $detail = self.$tip.find('a.js_detail');
						$detail.scheduleCreator('autoSave', function($form){
							$form.startTime.datepicker('setDate', date);
						});
						$detail.click();
					} else {
						ui.draggable.click();
						self.$tip.find('a.js_detail').click();
					}
				}
			}
		});
	},
	selectable: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		self.panel.find('table.calendar_table').selectable({
			filter: 'td',
			cancel: 'dd',
			selecting: function(evt, ui){
				$(ui.selecting).addClass('selected');
			},
			unselecting: function(evt, ui){
				$(ui.unselecting).removeClass('selected');
			},
			stop: function(evt, ui){
				var $tds = self.panel.find('table.calendar_table td.selected');
				if ($tds.size()) {
					$tds.first().scheduleCreator('showForm', $tds, evt);
				}
			}
		});
	},
	cancelSelect: function(){
		this.panel.find('table.calendar_table td.selected').removeClass('selected');
	},
	moreTask: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		if (!self.moreTip) {
			self.moreTip = $(self.tmplMore).appendTo('body');
			self.moreTip.resizable({
				minWidth: 165,
				minHeight: 60,
				resize: function(event, ui){
					var height = ui.size.height;
					ui.element.find('dl:last').height(height - ui.element.find('dl:first').height());
				}
			});
			self.moreTip.find('a.close_btn').click(function(){
				self.moreTip.hide('fade');
			});
		}
		self.moreTip.hide();
		self.panel.find('dd.task_more').click(function(evt){
			evt.stopPropagation();
			var $more = $(this), $dl = $more.parent(), $td = $dl.parent(), $tasks = $dl.find('dd.task').clone().show(), d = $td.attr('date').split('-'), date = new Date(d.join('/'));
			self.moreTip.find('dt span').html([date.getFullYear(), '年', date.getMonth() + 1, '月', date.getDate(), '日 星期', '日一二三四五六'.split('')[date.getDay()]].join(''));
			self.moreTip.find('dl:last').attr('date', formatDate(date)).find('dd.task').remove().end().append($tasks).end().width(Math.max($td.width() * 1.5, 165)).css('height', 'auto').show().position({
				of: $td,
				my: 'left top',
				at: 'left top',
				collision: 'fit'
			});
			self.tip($tasks);
			$tasks.filter('[access_type!="1"]').draggable({
				helper: 'clone',
				appendTo: 'body',
				//containment: self.mainTable,
				scope: 'schedule',
				opacity: 0.65,
				zIndex: 9999,
				start: function(evt, ui){
					ui.helper.width($(this).width());
				}
			});
		});
	},
	getDate: function(){
		return this.date;
	},
	setDate: function(date, cid, sid){
		var y = this.date.getFullYear(), m = this.date.getMonth(), d = this.date.getDate();
		date = date instanceof Date ? date : new Date(date);
		G.cldList.calendarList('selCalendarByID', cid);
		if (date.getFullYear() == y && date.getMonth() == m) {
			this.date.setDate(date.getDate());
			this.refresh(sid);
		} else {
			this.date = date;
			this._init(sid);
		}
	},
	openScheduleByDate: function(date, content){
		var y = this.date.getFullYear(), m = this.date.getMonth();
		date = date instanceof Date ? date : new Date(date);
		if (date.getFullYear() == y && date.getMonth() == m) {
			var $td = this.mainTable.find('td[date="' + formatDate(date) + '"]');
			$td.scheduleCreator('showForm', $td, null, content);
		} else {
			this.date = date;
			this._init(null, date, content);
		}
	},
	delSchedule: function($lnk){
		var self = this, $elem = $(this.element), opt = this.options;
		var sid = $lnk.attr('sid');
		$.confirm('确定要删除这个日程吗？', {
			buttons: [{
				text: "删除",
				click: function(){
					var dialog = this;
					$.getJSON('/schedule/delete.do?scheduleId=' + sid, function(data){
						if (data == true) {
							$(dialog).dialog("close");
							$(self.$tip.data('lastTip')).remove();
							self.closeTip();
							self.deleteScheduleData(sid);
							self.refresh();
							//hide moreTip
							if(self.moreTip.is(":visible") && self.moreTip.find("dd").size() == 0){
								self.moreTip.hide();
							}
							//删除日程后需要更新提醒
							notificationManager.refresh();
						} else if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function(){
										location = '/account/login.do';
									}
								}
							});
						}
						try {
							js365.downAlarms();
						} catch (e) {
						}
					});
				}
			}, {
				text: "取消",
				click: function(){
					$(this).dialog("close");
				}
			}]
		});
	},
	closeTip: function(){
		this.$tip && this.$tip.removeData('lastTip').hide('fade');
	},
	tip: function($els){
		var self = this, $elem = $(this.element), opt = this.options;
		if (!self.$tip) {
			self.$tip = $('<div class="schedule_layer ui-shadow none"></div>').appendTo('body');
			self.$tip.click(function(evt){
				var $lnk = $(evt.target);
				if ($lnk.hasClass('js_delete')) {
					self.delSchedule($lnk);
				} else if ($lnk.hasClass('close_btn')) {
					self.closeTip();
				} else if($lnk.hasClass('js_copy')){
					//init schedule copy
					if($("#schedule_copy_container").length == 0){
						$("body").append('<div id="schedule_copy_container" class="copy_schedule_layer ui-shadow ui-draggable none"></div>');
					}
					$("#schedule_copy_container").scheduleCopy({
						sid:$lnk.attr("sid")
					});
					self.closeTip();
				}
			});
			
			self.$tip.draggable({
				containment: 'body',
				handle: 'h2',
				cancel: 'a',
				cursor: "move",
				opacity: 0.85
			});
			
		}
		self.$tip.hide();
		
		//点击其他区域的时候隐藏窗口
		$("#div_calendar_list").add("#div_today").click(function(e){
			self.closeTip();
			self.moreTip.hide();
		});
		var tmpl='<a href="javascript:;" class="close_btn"></a><h2>{calendarName}</h2><div class="schedule_content">\
			<div class="schedule_title"><p>{datetime}</p></div>\
			<div class="schedule_content_txt"><div class="txt_box">{content}</div></div>\
			<div class="schedule_bottom{editable}"><a href="javascript:;" class="js_copy" sid="{sid}">复制日程</a><i>|</i><a href="javascript:;" class="js_delete" sid="{sid}">删除</a><i>|</i><a href="javascript:;" sid="{sid}" date={date} class="js_detail">编辑日程</a></div>\
			</div>'
		
		$els.click(function(evt, isOutSight){
			evt.stopPropagation();
			//打开Tips时关闭ScheduleCreator
			$("#div_add_schedule").hide("fade");
			var $el = $(this), cid = $el.attr('cid'), access_type = $el.attr('access_type'), allday_event = $el.attr('allday_event'), cellIndex = $el.attr('cellIndex') ,screenH=$(window).height()-150;
			var pic_str = $el.attr("pics");
			var stime = $el.attr('stime'), sdate = $el.attr('stime').split(' ')[0], t;
			if (self.$tip.data('lastTip') == this && self.$tip.is(':visible')) {
				self.$tip.hide('fade');
			} else {
				if($el.attr('cont').length>200){
					self.$tip.addClass("big_schedule_box");
					
				}else if($el.attr('cont').length>500){
					self.$tip.addClass("big_schedule_box");
				}else{
					self.$tip.removeClass("big_schedule_box");
					self.$tip.addClass("small_schedule_box");
				}
				self.$tip.html($.format(tmpl, {
					calendarName: G.cldList.calendarList('getNameById', cid),
					datetime: allday_event == 'true' ? sdate + ' 全天' : $el.attr('stime'),
					content:$el.attr('cont').replace(/\n/g,'<br/>'),
					//content:htmlDecode($el.attr('cont')),
					//content: (t = $el.attr('cont')).length > 100 ? t.slice(0, 97) + '…' : t,
					sid: $el.attr('sid'),
					date: sdate,
					editable: access_type == 2 || access_type == 3 ? '' : ' none'
				})).show('fade');
				self.$tip[cellIndex < 2 ? 'addClass' : 'removeClass']('schedule_arrow_left');
				self.$tip.find('a.js_detail').scheduleCreator({
					onOpen: function(){
						self.closeTip();
					}
				});
				//显示location和url
				var url = $el.attr("url");
				if(url != "{url}"){
					var div = $("<div class='tip_url_div'><span>详细链接：</span><a href='"+url+"' target='_blank'>"+url+"</a></div>");
					self.$tip.find(".schedule_content_txt").after(div);
				}

				var location = $el.attr("location");
				if(location != "{location}"){
					var location_url;
					var location_name = location;
					if(location.indexOf("@") != -1){
						var locationAry = location.split("@");
						location_url = "http://api.map.baidu.com/marker?location="+locationAry[1]+"&title="+locationAry[0]+"&content="+locationAry[0]+"&output=html";
						location_name = locationAry[0];
					}else{
						location_url = "http://api.map.baidu.com/geocoder?address="+location+"&output=html&src=365rili";
					}
					var div = $("<div class='tip_location_div'><span>地址：</span><a href='"+location_url+"' target='_blank'>"+location_name+"</a></div>");
					self.$tip.find(".schedule_content_txt").after(div);
					
				}
				//显示图片
				if(pic_str != ""){
					var pic_ary = pic_str.split(",");
					var div = $("<div class='image_div'></div>");
					for(var i in pic_ary){
						var img = $("<a href='http://cocoimg.365rili.com/schedule_pics/default/"+pic_ary[i]+"' rel='img'><img src='http://cocoimg.365rili.com/schedule_pics/default/"+pic_ary[i]+"' class='image_item'/></a>");
						div.append(img);
					}
					self.$tip.find(".schedule_content_txt").prepend(div);
					if(pic_ary.length==1){
						$(".image_div").addClass("one_pic");
					}else{
						$(".image_div img").css({width:"50px",height:"50px"});
					}
					//点击显示大图
					div.find("a").lightbox({
						fitToScreen:true
					});
				}
				self.$tip.position(isOutSight ? {
					of: 'body',
					my: 'right',
					at: 'left',
					offset: '-20'
				} : {
					collision: 'fit',
					my: cellIndex < 2 ? 'left top' : "right top",
					at: cellIndex < 2 ? 'right top' : "left top",
					offset: '0 -28px',
					of: this
				}).data('lastTip', this);
				if($el.attr('cont').length>=200){
					$.loading();
					var contentH=self.$tip.find(".schedule_content_txt").height();
					if(contentH>screenH){
						self.$tip.find(".schedule_content_txt").css('height',screenH).jScrollPane();
					}else{
						self.$tip.find(".schedule_content_txt").css('height',contentH);
					}
					$(".one_pic img").one('load',function(){
						if(this.complete){
							var contentH=self.$tip.find(".image_div").height() + self.$tip.find(".txt_box").height();
							$.loading.close();
							if(contentH>screenH){
								self.$tip.find(".schedule_content_txt").css('height',screenH).jScrollPane();
							}else{
								self.$tip.find(".schedule_content_txt").css('height',contentH);
							}
							self.$tip.position({
								collision:'fit',
								of: 'body',
								offset:'0'
							})
						}
					});
					$.loading.close();
				}
			}
		});
	},
	rePositionTip: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		if (self.$tip && self.$tip.is(':visible')) {
			$(self.$tip.data('lastTip')).click();
		}
	},
	fixSize: function($dls){
		$dls = $dls && $dls.size() ? $dls : this.schContainers;
		var $tasks = $dls.find('dd.task');
		if ($tasks.size()) {
			var $dl = $dls.first(), tdHeight, dlHeight, available, nVisible;
			var dtHeight = $dl.find('dt').outerHeight(), ddHeight = $tasks.first().outerHeight() - 3;
			$tasks.hide();
			$dls.each(function(i, dl){
				var $dl = $(dl), $dds = $dl.find('dd.task'), $more = $dl.find('dd.task_more').hide(), numShow;
				if (i % 6 == 0) {
					tdHeight = $dl.parent().height();
					dlHeight = $dl.height();
					available = Math.max(0, dlHeight - dtHeight);
					nVisible = Math.floor(available / ddHeight);
				}
				
				if ($dds.size() > nVisible) {
					if (nVisible < 1) {
						$more.html('还有' + $dds.size() + '个日程…').show();
					} else {
						$dds.slice(0, numShow = Math.max(0, nVisible - 1)).show();
						$more.html('还有' + ($dds.size() - numShow) + '个日程…').show();
					}
				} else {
					$dds.show();
				}
			});
		}
	},
	fixPanelHeight: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		var topHeight = $('#div_today').outerHeight()/*$(".calendar_header").outerHeight()*/, theadHeight = this.panel.find('table.js_tb_head').outerHeight();
		this.mainTableHeight = $(document.documentElement).innerHeight() - topHeight - theadHeight;
		if ($.browser.msie && parseInt($.browser.version) == 7) {
			this.mainTableHeight -= topHeight;
		}
		this.panel.find('table.calendar_table').height(this.mainTableHeight);
		$("#div_wview").find('table.calendar_table').height(this.mainTableHeight);
		$("#div_wview .calendar_table td").add("#div_wview .calendar_table td dl").height(this.mainTableHeight);
		self.$divLview.height(this.mainTableHeight + theadHeight-32);
		if (this.scheduleData) {
			clearTimeout(this.fixSizeTimer);
			this.fixSizeTimer = setTimeout(function(){
				self.fixSize();
				var $form = $('#div_add_schedule.simple'), $tds;
				if ($form.is(':visible')) {
					$tds = $form.data('fromTd');
					var scheduleContentStr = $form.find("textarea[name='schTitle']").attr("value");
					if(scheduleContentStr != "")
						$tds.scheduleCreator('showForm', $tds, null, scheduleContentStr);
					else
						$tds.scheduleCreator('showForm', $tds);
						
				}
			}, 200);
		}
	},
	getDateRange: function(){
		return {
			from: this.fromDate,
			to: this.toDate
		}
	},
	_getSundayFirst: function(){
		if($.cookie("calendar_panel_first") == "sunday"){
			return true;
		}else{
			return false;
		}
	},
	_setWeekSpan: function(date){
		var self = this, $elem = $(this.element), opt = this.options;
		/*var cld = new Calendar(date);
		var start = cld.getWeekFirstDate();
		if(self._getSundayFirst()){
			start = cld.getWeekSundayFirstDate();
		}
		var end = new Date(start.getTime() + 86400000 * 6);
		var ary = formatDate(start).split("-");*/
		var thisDay=date;
		var thisDayY=thisDay.getFullYear();
		var thisDayM=thisDay.getMonth()+1;
		var firstDay=new Date(thisDayY,0,1);
		var dayweek = thisDay.getDay();
		if(dayweek == 0){dayWeek = 7;}  
		var startWeek = firstDay.getDay();
		if(startWeek == 0){startWeek = 7;} 
		var weekNum =parseInt( ((thisDay.getTime()-firstDay.getTime())/(24*60*60*1000)+startWeek-dayweek)/7 + 1); 
		$("#sp_week").html([thisDayY, "年第", weekNum, "周     ",  thisDayM, "月"].join(""));
	}
});
