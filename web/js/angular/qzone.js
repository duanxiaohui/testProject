var myApp = angular.module('365_calendar', ['ui.date']);
myApp.controller('QzoneController', ['$scope','$http', 'CalendarService', 'ScheduleService', function($scope, $http, CalendarService, ScheduleService){
	var self = {};
	self.currentDate = new Date();	
	//init
	//month header
	var weekAry = ["一", "二","三","四", "五","六","日"];
	$scope.monthHeaderItems = $.map(new Array(21), function(o, i){
		return {
			weekNum:weekAry[i % 7]
		}
	});
	$scope.monthDateItems = ScheduleService.getMonthDateItems(self.currentDate);
	$scope.selectedDateItem = ScheduleService.selectDateItem();
	
	CalendarService.getCalendarCategory().then(function(data){
		$scope.calendarCategory = data.category;
		$scope.publicCalendars  = data.active_calendars;
		setFusionHeight($scope.publicCalendars.length);
	});
	
	CalendarService.getQzoneCalendarListWithExtend().then(function(calendars){
		if(calendars.length == 0){
			$scope.viewType = "recommend";			
		}else{
			$scope.viewType = "collect";
		}		
		$scope.calendars = calendars;
		$scope.selectedCalendar = CalendarService.selectCalendar();
		ScheduleService.setScheduleData($scope.selectedCalendar.id).then();
	});
	
	//workaround
	$scope.monthViewHeight = $(document.documentElement).innerHeight() - 90;
	
	//event
	$scope.switchView = function(type){
		if(type == "hall"){
			$scope.viewType = "hall_list";
			setFusionHeight($scope.publicCalendars.length);
		}else{
			$scope.viewType = "collect";
			setFusionHeight(0);
		}
	}
	
	$scope.showTip = function(schedule){
		schedule.access_type = CalendarService.selectCalendar().access_type;
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
		$scope.monthDateItems = ScheduleService.getMonthDateItems(self.currentDate);
		$scope.selectedDateItem = ScheduleService.selectDateItem();
		ScheduleService.setScheduleData().then();
	}
	
	$scope.selectCategory = function(category){
		$scope.showHallList = true;
		$scope.showHallPanel = false;
		CalendarService.selectCategory(category);
		CalendarService.getCategoryCalendars(category.id).then(function(data){
			$scope.publicCalendars = data.active_calendars;
			setFusionHeight($scope.publicCalendars.length);
		});
	}
	
	$scope.showPublicCalendar = function(calendar){
		$scope.viewType = "hall_panel";
		$scope.selectedPublicCalendar = calendar;
		ScheduleService.getPublicScheduleData(calendar.id).then(function(data){
			$scope.publicScheduleData = data;
		});
		setFusionHeight(0);
	}
	$scope.selectCalendar = function(calendar){
		$scope.selectedCalendar = CalendarService.selectCalendar(calendar);
		$scope.monthDateItems = ScheduleService.getMonthDateItems(self.currentDate);
		$scope.selectedDateItem = ScheduleService.selectDateItem();
		ScheduleService.setScheduleData($scope.selectedCalendar.id).then();
		
	}
	$scope.selectDateItem = function(item){
		$scope.selectedDateItem = ScheduleService.selectDateItem(item);
	}
	
	$scope.subscribeCalendar = function(calendar, $event){
		$event.stopPropagation();
		if(calendar.is_subscribed == 0){
			CalendarService.subscribeCalendar(calendar).then(function(data){
				calendar.is_subscribed = 1;
			});
		}else{
			CalendarService.unsubscribeCalendar(calendar).then(function(data){
				calendar.is_subscribed = 0;
				$scope.selectedCalendar = data;
				ScheduleService.setScheduleData(data.id).then();
			});
		}
	}
	
	$scope.unsubscribeCalendar = function(calendar){
		CalendarService.unsubscribeCalendar(calendar).then(function(data){
			$scope.selectedCalendar = data;
			ScheduleService.setScheduleData(data.id).then();
			for(var i in $scope.publicCalendars){
				var c = $scope.publicCalendars[i];
				if(calendar.id == c.id){
					c.is_subscribed = 0;
				}
			}
		});
	}
	
	$scope.returnToday = function(){
		var today = new Date();
		if($scope.selectedDateItem.dateObj.getMonth() == today.getMonth() && $scope.selectedDateItem.dateObj.getFullYear() == today.getFullYear()){
			$scope.selectedDateItem = ScheduleService.selectDateItem(undefined, today);
		}else{
			$scope.monthDateItems = ScheduleService.getMonthDateItems(today);
			$scope.selectedDateItem = ScheduleService.selectDateItem();
			ScheduleService.setScheduleData();		
		}
	}
	
	$scope.share = function(type, calendar, $event){
		$event && $event.stopPropagation();
		$scope.$broadcast('showShareView', type, calendar);
	}
	
	$scope.subscribeRecommend = function(){
		$.each($scope.publicCalendars, function(i, o){
			if(o.is_subscribed != 0){
				CalendarService.subscribeCalendar(o).then();
			}
		});
		$scope.viewType = "collect";
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

myApp.controller('ScheduleTip', ['$scope', 'ScheduleService', function($scope, ScheduleService){
	$scope.show  = false;
	$scope.$on('showTip', function(e, schedule) {
		$scope.show = true;
		$scope.schedule = packageSchedule(schedule);
		$scope.scrollHeight = document.body.scrollHeight + "px";
	});
	
	$scope.shareSchedule = function(schedule){
		$scope.$emit('shareSchedule', schedule);  
	}
	
	$scope.deleteSchedule = function(schedule){
		if(confirm("确定要删除这个日程吗？")){
			ScheduleService.deleteSchedule(schedule.id).then(function(rs){
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
		return rs;
	}

}]);

myApp.controller('ScheduleCreator', ['$scope', 'ScheduleService','CalendarService', function($scope, ScheduleService, CalendarService){
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
		var cid = CalendarService.selectCalendar().id;
		ScheduleService.addSchedule(schedule, cid).then(function(data){
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

myApp.controller('ShareViewController', ['$scope', 'CalendarService', function($scope, CalendarService){
	$scope.show = false;
	$scope.$on('showShareView', function(e, type, item) {
		if(type == "calendar"){
			CalendarService.getCalendarShareUrl(item.id, "", "QQ").then(function(data){
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
			CalendarService.getScheuleShareUrl(item.cid, item.uuid, item.datetime, item.lunartime, "QQ").then(function(data){
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
	var height = 160 * len;
	height = height < 1004 ? 1004 : height;
	fusion2.canvas.setHeight({height:height});
}

