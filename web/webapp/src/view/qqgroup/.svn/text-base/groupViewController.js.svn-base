define(function(require,exports, module) {
	var MonthView    = require("./monthView");
	var DayView 	 = require("./dayView");
	var $calendar    = require("../../server/calendar");
	var $schedule    = require("../../server/schedule");
	var $settingView = require("./settingView");
	var $scheduleData = require("../../model/scheduleData");
	var $fusion = require("../../server/fusion");
	var $socket = require("../../server/websocket");
	var $scheduleCreateView = require("../common/scheduleCreateView");
	
	var self = {};
	module.exports = self;
	self.calendarView = $(".calendar_view");
	
	self.init = function(){
		self.monthContainer = $(".month_view");
		self.monthView = new MonthView(self.monthContainer, loadScheduleData);
		self.monthView.render();
		
		self.dayView = new DayView($(".day_view"), loadScheduleData);
		$settingView.init();
		initEvent();
		if(G.websocket){
			//$socket.init(["ws://msg.qgroup.qq.com", "?appId=", G.appID,"&openId=", G.openID,"&openKey=", G.openKey,"&groupOpenId=", G.groupOpenID].join(""));			
		}
	}
	
	function getScheduleList(fromDate, toDate, render){
		$scheduleData.loadScheduleData(fromDate, toDate, self.cid, render);
	}
	
	function loadScheduleData(fromDate, toDate, render){
		if(self.cid){
			getScheduleList(fromDate, toDate, render);		
		}else{
			$calendar.getQunInfo(G, function(data){
				self.userInfo = data;
				self.cid =  data.cid;
				self.groupOpenID = G.groupOpenID;
				G.cid = self.cid;
				G.title = data.title;
				G.accessType = data.access_type;
				if(data.is_group_manager){
					$(".setting_tab").show();
				}
				$(".calendar_title").html(data.title);
				$(".calendar_icon img").attr("src", data.bgu);
				$calendar.refresh(G, function(data){});
				
				//第一次进入群应用的时候发送消息
				if(data.is_new){
					$fusion.sendObjMsg(G.groupOpenID, "groupCalendar");
					$scheduleCreateView.createFirstSchedule(data.title, self.cid, function(data){
						getScheduleList(fromDate, toDate, render);						
					})
				}else{
					getScheduleList(fromDate, toDate, render);
				}
			});
		}
		
	}
	
	function initEvent(){
		//设置按钮
		$(".setting_tab").click(function(){
			$(".header_btn_list").hide();
			$(".calendar_btn_setting").hide();
			$(".setting_return_btn").show();
			self.calendarView.hide();
			$settingView.render(self.cid, self.groupOpenID);
		});
		$(".setting_return_btn").click(function(){
			$(".header_btn_list").show();
			$(".calendar_btn_setting").show();
			$(".setting_return_btn").hide();
			self.calendarView.show();
			$settingView.hide();	
		});
		$(".month_tab").click(function(){
			$(".header_btn_list li.on").removeClass("on");
			$(this).addClass("on");
			self.monthView.show();
			self.dayView.hide();
		});
		$(".day_tab").click(function(){
			$(".header_btn_list li.on").removeClass("on");
			$(this).addClass("on");
			self.monthView.hide();
			self.dayView.show();
		});
		$(".calendar_btn_setting").click(function(evt){
			evt.preventDefault();
			//手机上下载 统计
			_czc.push(﻿["_trackPageview","/qqun/downBtnClicked","http://www.365rili.com/qqun/main.do"]); 
			$(".down_layer").removeClass("none");
			$(".first,.second").removeClass("mt625");
			$(".four").addClass("mt625");
		});
		$(".first_btn").click(function(evt){
			evt.preventDefault();
			$(".first").addClass("mt625");
		});
		$(".second_btn").click(function(evt){
			evt.preventDefault();
			$(".second").addClass("mt625");
		});
		$(".first_btn_365").click(function(evt){
			evt.preventDefault();
			$(".four").removeClass("mt625");
		})
		$(".down_layer_colse,.three_btn,.four_btn").click(function(evt){
			evt.preventDefault();
			$(".down_layer").addClass("none");
		});
		$(".boot_next_btn").click(function(evt){
			evt.preventDefault();
			$(this).parents("div.boot_first").addClass("ml920");
		});
		$(".boot_next_btn").click(function(evt){
			evt.preventDefault();
			$(this).parents("div.boot_second").addClass("ml920");
		});
		$(".boot_next_btn").click(function(evt){
			evt.preventDefault();
			$(this).parents("div.boot_three").addClass("ml920");
		});
		$(".boot_star_btn").click(function(evt){
			evt.preventDefault();
			$(".boot_box").addClass("none");
			$(".boot_five").removeClass("none");
			$(".boot_first").removeClass("ml920");
			$(".boot_second").removeClass("ml920");
			$(".boot_three").removeClass("ml920");
		});
		$(".boot_box_new").click(function(){
			$(".boot_box_new").hide();
			$(".bg").hide();
		});
		$(".calendar_function").click(function(evt){
			evt.preventDefault();
			$(".boot_box").removeClass("none");
		});
		$(".boot_five ,.boot_colse_btn").click(function(evt){
			evt.preventDefault();
			$(".boot_five").addClass("none");
			
		});
	}
});