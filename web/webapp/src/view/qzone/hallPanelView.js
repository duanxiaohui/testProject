/*
**	calendarHallView	日历广场
*/
define(function(require, exports, module) {	
	var $fusion   = require("../../server/fusion");
	var $calendar = require("../../server/calendar");
	var $schedule = require("../../server/schedule");
	var $util     = require("../../common/util");
	var $scheduleData = require("../../model/scheduleData");
	var $shareView = require("../common/shareView");

	var self = {};
	module.exports = self;
	self.container = $(".calendar_hall_panel");
	self.ulList    = self.container.find(".public_schedule_list");
	
	var scheduleTmpl = "<li class='public_schedule_item'><div class='glance_schedule_txt'>{time}{encodeText}</div></li>";
	
	function init(){
		self.container.find(".collect_calendar_btn").click(function(){
			var $elem = $(this);
			if($elem.hasClass("on")){
				$calendar.unsubscribe(self.cid, function(){
					$elem.removeClass("on");
					$elem.html("收藏");
				});
			}else{
				$calendar.subscribePublicCalendar(self.cid, function(){
					$elem.addClass("on");
					$elem.html("已收藏");
				});	
			}
		});
		self.container.find(".share_calendar_btn").click(function(){
			var cid = $(this).attr("cid");
			var pic = $(this).attr("pic");
			$shareView.shareCalendar(cid, "", pic);
		});
	}
	
	function render(calendar){
		self.cid = calendar.id;
		renderTop(calendar);
		var today = new Date();
		var fromDate = new Date(today.getTime() - 86400000 * 30);
		var toDate = new Date(today.getTime() + 86400000 * 30)
		self.ulList.empty();
		loadScheduleData(fromDate, toDate, function(data){
			self.ulList.html($util.format(scheduleTmpl, data.slice(0, 3)));
		});
		$fusion.resize();
	}
	
	function renderTop(calendar){
		var bg_img = calendar.background_img;
		bg_img = bg_img.substr(0, bg_img.lastIndexOf("!"));
		self.container.find(".hall_top_img").attr("src", bg_img);
		self.container.find(".hall_top_title").html(calendar.title);
		self.container.find(".hall_top_desc").html(calendar.desc);
		if(calendar.is_subscribed == 1){
			self.container.find(".collect_calendar_btn").addClass("on").html("已收藏");
		}else{
			self.container.find(".collect_calendar_btn").removeClass("on").html("收藏");
		}
	}
	
	
	function renderLeft(calendar){
		self.container.find(".hall_left_img").attr("src", calendar.background_img);
		self.container.find(".hall_left_title").html(calendar.title);
		self.container.find(".hall_left_desc").html(calendar.desc);
		if(calendar.is_subscribed == 1){
			self.container.find(".collect_calendar_btn").addClass("on").html("已收藏");
		}else{
			self.container.find(".collect_calendar_btn").removeClass("on").html("收藏");
		}
	}
	
	function loadScheduleData(fromDate, toDate, render){
		$scheduleData.loadPublicScheduleData(fromDate, toDate, self.cid, render);
	}
	//exports method
	self.init = init;
	self.render = render;
});
