/*
**	collectPanelView
*/
define(function(require, exports, module) {
	var Calendar = require("../../model/calendarObject");
	var dateInfo = require("../../model/dateInfo");
	var $util	 = require("../../common/util");
	var $colorUtil	 = require("../../common/colorUtil");
	var $scheduleCreateView = require("../common/scheduleCreateView");
	var $scheduleTipView = require("../common/scheduleTipView");
	var $scheduleData = require("../../model/scheduleData");
	var $shareView = require("../common/shareView");
	var $calendar = require("../../server/calendar");
	var $fusion  =  require("../../server/fusion");
	
	var self = {};
	module.exports = self;
	self.init = init;
	self.render = render;
	self.container = $(".calendar_collect");
	
	var headTmpl = "<li class='{type}'>{weekNum}</li>";
	var contentTmpl = "<li date='{date}' class='{monthClass}'><div class='schedule_solar'>{solar}</div><div class='schedule_icon'><img src=''/></div></li>";
	var scheduleTmpl = "<li class='schedule_item'><div class='schedule_txt'>{timeStr}{text}</div></li>";
	
	function init(loadSchedule){
		self.loadSchedule = loadSchedule;
		self.spYear      = $(".sp_year");
		self.spMonth     = $(".sp_month");
		self.lnkToday    = $(".lnk_today");
		self.currentDate = new Date();
		initEvent();
		//init month header
		var weekAry = ["一", "二","三","四", "五","六","日"];
		$(".month_table_header").html($util.format(headTmpl, $.map(new Array(21), function(o, i){
			return {
				weekNum:weekAry[i % 7]
			}
		})));
		renderMonth();
	}
	
	function render(calendar, theme){
		self.cid = calendar.id;
		renderTheme(theme);
		renderCalendar(calendar);
		self.loadSchedule(self.fromDate, self.toDate, function(data){
			refresh(data);
		});
	}
	
	function refreshMonth(){
		renderMonth();
		self.loadSchedule(self.fromDate, self.toDate, function(data){
			refresh(data);
		});
	}
	
	function renderMonth(){
		var cld = new Calendar(self.currentDate);
		var startDate = cld.getCalendarFirstDate();
		
		self.spYear.html(self.currentDate.getFullYear());
		var month = self.currentDate.getMonth() + 1;
		month = ("0" + month).slice(-2);
		self.spMonth.html(month);
		
		var dateInfoAry = dateInfo.getMonthViewDateInfo(startDate, self.currentDate.getMonth());
		$(".month_table_content").html($util.format(contentTmpl, dateInfoAry));
		
		self.fromDate = cld.getCalendarFirstDate();
		self.toDate = new Date(startDate);
		renderDaybox(self.currentDate);		
		var dateStr = $util.formatDate(self.currentDate);
		$('.month_table_content li[date="' + dateStr + '"]').addClass("on");
		$(".month_table_content li").click(function(){
			var $elem = $(this);
			if($elem.hasClass("month_befor") || $elem.hasClass("month_after"))
				return;
			if($elem.hasClass("on")){
				return;
			}
			$(".month_table_content .on").removeClass("on");
			$elem.addClass("on");
			var dateStr = $elem.attr("date");
			var d = new Date(dateStr.replace(/-/g,"/"));
			self.currentDate = d;
			renderDaybox(d);
			renderSchedule(d);
		})	
	}
	
	function refresh(data){
		self.scheduleMap = data;
		$(".month_table_content .schedule_imgshow").removeClass("schedule_imgshow");
		$.each(self.scheduleMap, function(i, o){
			if(o.length == 0)
				return;
			$(".month_table_content").find('li[date="' + i + '"] .schedule_icon img').addClass("schedule_imgshow").attr("src",  self.theme.mu);
		});
		renderSchedule(self.currentDate);
	}
	
	function renderTheme(theme){
		if(!theme)
			return;
		self.theme = theme.theme;
		self.pic = self.theme.bgu;
		var bgu = self.theme.bgu;
		bgu = bgu.substr(0, bgu.lastIndexOf("!"));
		//render background
		$(".calendar_theme_wrapper").css("background-image", "url("+bgu+")");
		//render calendar title color
		
		self.container.find(".add_schedule_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		self.container.find(".unsubscribe_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		self.container.find(".share_calendar_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
	}

	function initEvent(){
		//event
		$(".lnk_prev").click(function(){
			self.currentDate.setDate(0);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			refreshMonth();
		});
		$(".lnk_next").click(function(){
			self.currentDate.setDate(32);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			refreshMonth();
		});
		self.lnkToday.click(function(){
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				var dateStr = $util.formatDate(today);
				$('.month_table_content li[date="' + dateStr + '"]').click();
			}else{
				self.currentDate = today;
				refreshMonth();				
			}
		});
		$scheduleCreateView.init(function(data, sid){
			$scheduleData.onCreated(data, sid, function(data){
				self.refresh(data);
			})
		});
		$scheduleTipView.init({
			remove: function(sid){
				$scheduleData.onRemoved(sid, function(data){
					self.refresh(data);								
				});
			},
			detail: function(sid){
				$scheduleCreateView.show({
					from:self.fromDate,
					to:self.toDate
				}, new Date(), sid, undefined, self.cid);
			},
			addNotice: function(schedule){
				$scheduleCreateView.addNotice({
					from:self.fromDate,
					to:self.toDate
				}, schedule, self.mainCalendarId);
			}
		});
		//添加日程
		$(".add_schedule_btn").click(function(){
			$scheduleCreateView.show({
				from:self.fromDate,
				to:self.toDate
			}, self.currentDate, undefined, undefined, self.cid);
		});
		//分享日历
		self.container.find(".share_calendar_btn").click(function(){
			$shareView.shareCalendar(self.cid, "",  self.pic);
		});
		//取消收藏
		$(".unsubscribe_btn").click(function(){
			$.confirm('确定取消收藏此日历？', {
				buttons: [{
					text: "确定",
					click: function(){
						var dialog = this;
						$calendar.unsubscribe(self.cid, function(){
							$(dialog).dialog("close");
							onUnsubscribed(self.cid);
							$("div.calendar_collect_scrollpane").jScrollPane();
						});
					}
				}, {
					text: "取消",
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		});
	}
	
		
	function renderDaybox(date){
		//是否显示今天
		if(isToday(date)){
			self.lnkToday.hide();
		}else{
			self.lnkToday.show();
		}
		$(".solar_text").html(date.getDate());
		$(".lunar_text").html(dateInfo.getLunarDateInfo(date));
		$(".daymatter_text").html(dateInfo.getDayMatter(date));
	}
	
	function renderSchedule(date){
		var dateStr = $util.formatDate(date);
		var schedules = self.scheduleMap[dateStr];
		$(".schedule_list").empty();
		if(schedules){
			for(var i in schedules){
				var schedule = schedules[i];
				var li = $("<li class='schedule_item'><div class='schedule_txt'>"+schedule.time+schedule.encodeText+"</div></li>").appendTo($(".schedule_list"));
				(function($elem, s){
					$elem.click(function(){
						showScheduleTip(s);	
					})	
				})(li, schedule);
				
			}
		}
	}
	
	function showScheduleTip(s){
		$scheduleTipView.show(s, self.access_type, self.bgu);
		$fusion.resize();
	}
	
	function renderCalendar(calendar){
		self.access_type = calendar.access_type;
		self.calendar = calendar;
		//self.container.find(".calendar_title").html(calendar.title);
		//权限
		if(calendar.access_type == 1){
			self.container.find(".add_schedule_btn").hide();
			self.container.find(".unsubscribe_btn").show();
		}else if(calendar.access_type == 2 || calendar.access_type == 3){
			self.container.find(".add_schedule_btn").show();
			self.container.find(".unsubscribe_btn").hide();			
		}else{
			self.container.find(".add_schedule_btn").hide();
			self.container.find(".unsubscribe_btn").hide();
		}
	}
	
	function isToday(d){
		var t = new Date();
		if(t.getFullYear() == d.getFullYear() &&
			t.getMonth()   == d.getMonth() &&
			t.getDate()    == d.getDate()){
			return true;
		}
		return false;
	}
});
