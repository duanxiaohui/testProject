var myApp = angular.module('365_calendar', ['ui.date']);
myApp.controller('QzoneController', ['$scope','CalendarModel','CategoryModel', 'ScheduleModel',
                                     function($scope,CalendarModel, CategoryModel, ScheduleModel){
	var self = {};
	self.currentDate = new Date();
	/**************************************   init   ***************************************************/
	$scope.calendarModel = CalendarModel;
	$scope.categoryModel = CategoryModel;
	$scope.scheduleModel = ScheduleModel;
	//month header
	var weekAry = ["一", "二","三","四", "五","六","日"];
	$scope.monthHeaderItems = $.map(new Array(21), function(o, i){
		return {
			weekNum:weekAry[i % 7]
		}
	});
	ScheduleModel.getMonthDateItems(self.currentDate);
	CategoryModel.getCalendarCategory().then();
	CalendarModel.getQzoneCalendarListWithExtend().then(function(calendars){
		if(calendars.length == 0){
			$scope.viewType = "recommend";
		}else{
			$scope.viewType = "collect";
			ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
		}
	});
	var openid = getURLParameter("openid");
	$scope.hideMaskView = $.cookie("qzone_hideMaskView" + openid);
	setFusionHeight(0);
	/****************************************  event  ***************************************************/
	$scope.hideMaskViewClicked = function(){
		$scope.hideMaskView = true;
		$.cookie('qzone_hideMaskView' + openid, "true", {
			expires: 365,
			path:"/"
		});	
	}
	
	$scope.switchView = function(type){
		if(type == "hall"){
			$scope.viewType = "hall_list";
			setFusionHeight(CategoryModel.publicCalendars.length);
		}else{
			$scope.viewType = "collect";
			setFusionHeight(0);
		}
	}
	
	$scope.showTip = function(schedule){
		schedule.access_type = CalendarModel.selected.access_type;
		$scope.$broadcast('showTip', schedule);
	}
	
	$scope.showScheduleCreator = function(){
		$scope.$broadcast('showScheduleCreator', self.selectedDateItem);
	}
	
	$scope.monthChanged = function(delta){
		self.currentDate.setDate(delta > 0 ? 32 : 0);
		var today = new Date();
		if(self.currentDate.getMonth() == today.getMonth() && self.currentDate.getFullYear() == today.getFullYear()){
			self.currentDate.setDate(today.getDate());
		}else{
			self.currentDate.setDate(1);				
		}
		ScheduleModel.getMonthDateItems(self.currentDate);
		ScheduleModel.setScheduleData().then();
	}
	
	$scope.selectCategory = function(category){
		$scope.viewType = "hall_list";
		CategoryModel.selectCategory(category);
		CategoryModel.getCategoryCalendars(category.id).then(function(data){
			setFusionHeight(CategoryModel.publicCalendars.length);
		});
	}
	
	$scope.showPublicCalendar = function(calendar){
		$scope.viewType = "hall_panel";
		$scope.selectedPublicCalendar = calendar;
		calendar.background_img_original = calendar.background_img.substr(0, calendar.background_img.lastIndexOf("!"));
		ScheduleModel.getPublicScheduleData(calendar.id).then(function(data){
			$scope.publicScheduleData = data;
		});
		setFusionHeight(0);
	}
	
	$scope.selectCalendar = function(calendar){
		CalendarModel.selectCalendar(calendar);
		ScheduleModel.getMonthDateItems(self.currentDate);
		ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
	}
	
	$scope.subscribeCalendar = function(calendar, $event){
		$event.stopPropagation();
		if(calendar.is_subscribed == 0){
			CalendarModel.subscribeCalendar(calendar).then(function(rs){
				if(rs){
					ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
				}
				calendar.is_subscribed = 1;
			});
		}else{
			CalendarModel.unsubscribeCalendar(calendar).then(function(data){
				calendar.is_subscribed = 0;
				ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
			});
		}
	}
	
	$scope.unsubscribeCalendar = function(calendar){
		CalendarModel.unsubscribeCalendar(calendar).then(function(data){
			if(CalendarModel.selected)
				ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
			else
				ScheduleModel.clearScheduleData();
			for(var i in CategoryModel.publicCalendars){
				var c = CategoryModel.publicCalendars[i];
				if(calendar.id == c.id){
					c.is_subscribed = 0;
				}
			}
		});
	}
	
	$scope.returnToday = function(){
		var today = new Date();
		self.currentDate = today;
		if(ScheduleModel.selectedDateItem.dateObj.getMonth() == today.getMonth() && ScheduleModel.selectedDateItem.dateObj.getFullYear() == today.getFullYear()){
			ScheduleModel.selectDateItem(undefined, today);
		}else{
			ScheduleModel.getMonthDateItems(today);
			ScheduleModel.setScheduleData().then();		
		}
	}
	
	$scope.share = function(type, calendar, $event){
		$event && $event.stopPropagation();
		$scope.$broadcast('showShareView', type, calendar);
	}
	
	$scope.subscribeRecommend = function(){
		if(CategoryModel.publicCalendars[0]){
			CategoryModel.publicCalendars[0].is_subscribed = 1;
		}
		$.each(CategoryModel.publicCalendars, function(i, o){
			if(o.is_subscribed != 0){
				CalendarModel.subscribeCalendar(o).then(function(rs){
					if(rs){
						ScheduleModel.setScheduleData(CalendarModel.selected.id).then();
					}
				});
			}
		});
		$scope.viewType = "collect";
		setFusionHeight(0);
	}
	
	$scope.toggleCalendarSubscribe = function(calendar){
		if(calendar.is_subscribed == 0){
			calendar.is_subscribed = 1;			
		}
		else{
			calendar.is_subscribed = 0;
		}
	}
	
	$scope.$on("shareSchedule", function(e, schedule){
		$scope.$broadcast('showShareView', 'schedule', schedule);	
	})
}]);

myApp.controller('ScheduleTip', ['$scope', 'ScheduleModel', function($scope, ScheduleModel){
	$scope.show  = false;
	$scope.$on('showTip', function(e, schedule) {
		$scope.show = true;
		$scope.schedule = packageSchedule(schedule);
		$scope.scrollHeight = document.body.scrollHeight + "px";
		var bodyHeight=$(window).height()-300
		$scope.heightStyle = {
			"max-height":bodyHeight
		}
	});
	
	$scope.shareSchedule = function(schedule){
		$scope.$emit('shareSchedule', schedule);  
	}
	
	$scope.deleteSchedule = function(schedule){
		if(confirm("确定要删除这个日程吗？")){
			ScheduleModel.deleteSchedule(schedule.id).then(function(rs){
				$scope.show = false;
			});
		}
	}
	
	function packageSchedule(s){
		var rs = {};
		rs.datetime = s.start_time;
		if(s.allday_event){
			rs.datetime = rs.datetime.split(" ")[0] + " 全天";
		}
		//rs.lunartime = dateInfo.getLunartimeForScheduleTip(new Date(s.start_time));
		if(s.url){
			rs.url = s.url;
			rs.url_class = "";
		}else{
			rs.url_class = "none";
		}
		if(s.location){
			if(s.location.indexOf("@") != -1){
				var locationAry = s.location.split("@");
				rs.location_url = "http://api.map.baidu.com/marker?location="+locationAry[1]+"&title="+locationAry[0]+"&content="+locationAry[0]+"&output=html";
				rs.location_name = locationAry[0];
			}else{
				rs.location_url = "http://api.map.baidu.com/geocoder?address="+location+"&output=html&src=365rili";
				rs.location_name = s.location;
			}
		}else{
			rs.location_class = "none";
		}
		rs.contents = s.text.split("\n");
		rs.id = s.id;
		rs.cid = s.cid;
		rs.uuid = s.uuid;
		rs.access_type = s.access_type;
		rs.pics = s.pics;
		return rs;
	}

}]);

myApp.controller('ScheduleCreator', ['$scope', 'ScheduleModel','CalendarModel', function($scope, ScheduleModel, CalendarModel){
	$scope.show = false;
	function ScheduleDetail(){
		return {
			schTitle: "",
			alldayEvent: true,
			calendarId: "",
			startTime: new Date(),
			repeatType: 0,
			calendarType: 'S',
			before_minutes: '',
			duration: 0,
			repeatCount: '',
			repeatDay: '',
			repeatFrequency: '1',
			repeatMonth: '',
			repeatMonthDay: '',
			repeatStopTime: '',
			scheduleId: '',
			linked_url: '',
			location: '',
			startHour:"09",
			startMinute:"00"
		}
	}
	$scope.$on('showScheduleCreator', function(e, dateItem) {
		$scope.show = true;
		$scope.scrollHeight = document.body.scrollHeight + "px";
		
		$scope.schedule = new ScheduleDetail();
	});
	
	$scope.addSchedule = function(schedule){
		var cid = CalendarModel.selectCalendar().id;
		ScheduleModel.addSchedule(schedule, cid).then(function(data){
			$scope.show = false;
		});		
	}
	
	$scope.alldayEventChanged = function(e){
		if($scope.schedule.alldayEvent){
			$scope.schedule.startHour = "09";
			$scope.schedule.startMinute = "00";
		}
	}
}]);

myApp.controller('ShareViewController', ['$scope', 'CalendarModel', function($scope, CalendarModel){
	$scope.show = false;
	$scope.$on('showShareView', function(e, type, item) {
		if(type == "calendar"){
			CalendarModel.getCalendarShareUrl(item.id, "", "QQ").then(function(data){
				var pic = item.background_img || item.extend.theme.bgu;				
				$scope.show = true;
				$scope.scrollHeight = document.body.scrollHeight + "px";
				$scope.url = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey", 
				           "?url=", encodeURIComponent(data.url), 
				           "&title=", encodeURIComponent(data.title),
				           "&summary=", encodeURIComponent(data.desc),
				           "&pics=", encodeURIComponent(pic),
				           "&site=", "365日历"].join("");
			});
		}else if(type == "schedule"){
			CalendarModel.getScheuleShareUrl(item.cid, item.uuid, item.datetime, item.lunartime, "QQ").then(function(data){
				var pic;
				if(item.pics){
					pic = item.pics[0];
				}
				$scope.show = true;
				$scope.scrollHeight = document.body.scrollHeight + "px";
				$scope.url = ["http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey", 
				           "?url=", encodeURIComponent(data.url), 
				           "&title=", encodeURIComponent(data.title),
				           "&summary=", encodeURIComponent(data.desc),
				           "&pics=", encodeURIComponent(pic),
				           "&site=", "365日历"].join("");
			});
		}
	});
	
}]);


function setFusionHeight(len){
	var height = 160 * len + 54;
	height = height < 1004 ? 1004 : height;
	fusion2.canvas.setHeight({height:height});
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
