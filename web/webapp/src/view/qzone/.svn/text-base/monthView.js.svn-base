/*
**	monthView
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
	module.exports = MonthView;
	
	//local variable
	var containerHtml = "<div class='panel_upper'>"+

	"<div class='big_day_box'>"+
		"<div class='big_day'></div>" +
		"<div class='big_day_bottom'><span class='lunar_text'></span><span class='day_after_num'></span></div>" +
	"</div>"+
	"<div class='month_box'>"+
	"<div class='month_box_button e_clear'>"+
	"<div class='month_next_prev'><a href='javascript:void(0)' class='lnk_next'></a><a href='javascript:void(0)' class='lnk_prev'></a></div>" + 
	"<div class='year_month_div'><span class='sp_year'>2013</span>/<span class='sp_month'>12</span></div>" +
	"<a href='javascript:void(0)' class='lnk_today'>回今天</a>" +
	"</div>"+
	"<table class='month_table'></table></div></div>"+
	"<div class='month_panel_down'><div class='calendar_theme_div'>"+
	"<div class='cal_title_box'><div class='calendar_title'>我的日历</div>" +
	"<div class='calendar_btn'>"+
		"<a href='javascript:void(0)' class='share_calendar_btn'>分享此日历</a>"+
		"<a href='javascript:void(0)' class='add_schedule_btn none'>添加日程</a>"+
		"<a href='javascript:void(0)' class='unsubscribe_btn none'>取消收藏</a>"+
	"</div></div>" +
	"<ul class='schedule_list'></ul>" +
	"</div></div>";

	var headHtml = '<thead><tr><th class="weekday">周一</th><th class="weekday">周二</th><th class="weekday">周三</th><th class="weekday">周四</th><th class="weekday">周五</th>'+
'<th class="weekend">周六</th><th class="weekend">周日</th></tr></thead>';
	var headHtmlSundayFirst;
	var templateTd = '{rowStart}<td class="{monthClass} day_box_td" date="{date}">'+
'<dl class="day_box"><dt class="e_clear">'+
	'<span class="solar-text">{solar}</span></dt>'+
'</dl></td>{rowEnd}';
	var templateSchedule = "<li class='schedule_item'><div class='schedule_txt'>{timeStr}{text}</div></li>";
	
	function MonthView(container, loadSchedule, onUnsubscribed){
		var self = this;
		self.container = container;
		self.loadSchedule = loadSchedule;
		self.container.html(containerHtml);
		
		self.monthTable  = container.find(".month_table");
		self.spYear      = container.find(".sp_year");
		self.spMonth     = container.find(".sp_month");
		self.lnkToday    = container.find(".lnk_today");
		self.currentDate = new Date();
		//event
		self.container.find(".lnk_prev").click(function(){
			self.currentDate.setDate(0);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			self.render(self.calendar);
		});
		self.container.find(".lnk_next").click(function(){
			self.currentDate.setDate(32);
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				self.currentDate.setDate(today.getDate());
			}else{
				self.currentDate.setDate(1);				
			}
			self.render(self.calendar);
		});
		self.lnkToday.click(function(){
			var today = new Date();
			if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
				var dateStr = $util.formatDate(today);
				self.monthTable.find('td[date="' + dateStr + '"]').click();
			}else{
				self.currentDate = today;
				self.render(self.calendar);				
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
		self.container.find(".add_schedule_btn").click(function(){
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
		self.container.find(".unsubscribe_btn").click(function(){
			$.confirm('确定取消收藏此日历？', {
				buttons: [{
					text: "确定",
					click: function(){
						var dialog = this;
						$calendar.unsubscribe(self.cid, function(){
							$(dialog).dialog("close");
							onUnsubscribed(self.cid);
							if($(".calendar_collect_list").find("li").size()>15){
								$("div.calendar_collect_scrollpane").jScrollPane();
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
			
			
			
		});
	}
		
	MonthView.prototype.render = function(calendar, theme){
		var self = this;
		self.cid = calendar.id;
		var cld = new Calendar(this.currentDate);
		var startDate = cld.getCalendarFirstDate();
		self.renderCalendar(calendar);
		self.renderTheme(theme);
		
		self.spYear.html(this.currentDate.getFullYear());
		var month = this.currentDate.getMonth() + 1;
		month = ("0" + month).slice(-2);
		self.spMonth.html(month);
		
		var dateInfoAry = dateInfo.getMonthViewDateInfo(startDate, this.currentDate.getMonth());
		var rowsHtml = $util.format(templateTd, dateInfoAry);
		self.monthTable.html([headHtml, '<tbody>', rowsHtml, '</tbody>'].join(''));
		
		self.renderDaybox(this.currentDate);
		var dateStr = $util.formatDate(this.currentDate);
		self.monthTable.find('td[date="' + dateStr + '"]').addClass("on");
		self.monthTable.find(".day_box_td").click(function(){
			var $elem = $(this);
			if($elem.hasClass("month_befor"))
				return;
			if($elem.hasClass("on")){
				return;
			}
			self.monthTable.find(".on").removeClass("on");
			$elem.addClass("on");
			var dateStr = $elem.attr("date");
			var d = new Date(dateStr.replace(/-/g,"/"));
			self.currentDate = d;
			self.renderDaybox(d);
			self.renderSchedule(d);
		});
		var fromDate = cld.getCalendarFirstDate();
		var toDate = new Date(startDate);
		self.fromDate = fromDate;
		self.toDate = toDate;
		self.loadSchedule(fromDate, toDate, function(data){
			self.refresh(data);
		});
	}
	MonthView.prototype.refresh = function(data){
		var self = this;
		self.scheduleMap = data;
		self.monthTable.find(".day_box_schedule").css("background-image", "").removeClass("day_box_schedule");
		$.each(self.scheduleMap, function(i, o){
			if(o.length == 0)
				return;
			self.monthTable.find('td[date="' + i + '"] .day_box').addClass("day_box_schedule").css("background-image", "url("+ self.theme.mu +")");
		});
		self.renderSchedule(self.currentDate);
	}	
	MonthView.prototype.renderDaybox = function(date){
		var self = this;
		//是否显示今天
		if(isToday(date)){
			self.lnkToday.hide();
		}else{
			self.lnkToday.show();
		}
		self.container.find(".big_day").html(date.getDate());
		self.container.find(".lunar_text").html(dateInfo.getLunarDateInfo(date));
		self.container.find(".day_after_num").html(dateInfo.getDayMatter(date));
	}
	
	MonthView.prototype.renderSchedule = function(date){
		var self = this;
		var dateStr = $util.formatDate(date);
		var schedules = self.scheduleMap[dateStr];
		this.container.find(".schedule_list").empty();
		if(schedules){
			for(var i in schedules){
				var schedule = schedules[i];
				var li = $("<li class='schedule_item'><div class='schedule_txt'>"+schedule.time+schedule.encodeText+"</div></li>").appendTo(self.container.find(".schedule_list"));
				(function($elem, s){
					$elem.click(function(){
						self.showScheduleTip(s);	
					})	
				})(li, schedule);
				
			}
		}
	}
	MonthView.prototype.showScheduleTip = function(s){
		$scheduleTipView.show(s, this.access_type, self.bgu);
		$fusion.resize();
	}
	MonthView.prototype.renderCalendar = function(calendar){
		var self = this;
		self.access_type = calendar.access_type;
		self.calendar = calendar;
		self.container.find(".calendar_title").html(calendar.title);
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
	MonthView.prototype.renderTheme = function(theme){
		var self = this;
		if(!theme)
			return;
		self.theme = theme.theme;
		self.pic = self.theme.bgu;
		var bgu = self.theme.bgu;
		bgu = bgu.substr(0, bgu.lastIndexOf("!"));
		//render background
		self.container.find(".calendar_theme_div").css("background-image", "url("+bgu+")");
		//render calendar title color
		/*
		self.container.find(".calendar_title").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		self.container.find(".add_schedule_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		self.container.find(".unsubscribe_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		self.container.find(".share_calendar_btn").css("color", $colorUtil.hex2rgba(self.theme.nt.cl))
		 */
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
