var myApp = myApp || angular.module('365_calendar', ['ui.date', 'ui.utils']);
myApp.controller('CalendarController', ['$scope','$http', 'CalendarService','ScheduleService', function($scope, $http, CalendarService, ScheduleService){
	var self = {};
	//init
	self.currentDate = new Date();
	CalendarService.getCalendarData().then(function(data){
		$scope.calendars = data;
		$scope.calendarAryIds = CalendarService.getCalendarAryIds();
		$scope.calendarArySelected = CalendarService.getCalendarArySelected();
		var cids;
		if($scope.calendarArySelected){
			cids = $scope.calendarAryIds.join(",");
		}else{
			cids = CalendarService.selectCalendar().id;
		}
		ScheduleService.setScheduleData(cids).then(function(data){
			
		});
	});
	$scope.rows = ScheduleService.getStaticMonthRows(self.currentDate);
	$scope.weekRows = ScheduleService.getWeekRows(self.currentDate);
	$scope.listRows = ScheduleService.getListRows(self.currentDate);
	$scope.year = self.currentDate.getFullYear();
	$scope.month = self.currentDate.getMonth();
	$scope.viewType = 'month';
	$scope.greetingText = getGreetingText(new Date());
	$scope.showTip = function(schedule, $event){
		$event.stopPropagation();
		$scope.$broadcast('showTip', schedule);
	}
	$scope.showScheduleCreator = function(cell, $event){
		$scope.$broadcast('showScheduleCreator', cell, $event);
	}
	
	$scope.monthChanged = function(delta){
		self.currentDate.setDate(delta > 0 ? 32 : 0);
		$scope.rows = ScheduleService.getStaticMonthRows(self.currentDate);
		$scope.year = self.currentDate.getFullYear();
		$scope.month = self.currentDate.getMonth();
		ScheduleService.setScheduleData().then(function(data){
			
		});
	}
	
	$scope.changeView = function(type){
		if(type == "month"){
			$scope.showMonthView = true;
			$scope.showListView  = false;
		}else if(type == "list"){
			$scope.showMonthView = false;
			$scope.showListView  = true;
		}
	}
	
	$scope.selectCalendar = function(calendar){
		CalendarService.selectCalendar(calendar);
		$scope.calendarArySelected = false;
		CalendarService.setCalendarArySelected(false);
		//$scope.rows = ScheduleService.getStaticMonthRows(self.currentDate);
		ScheduleService.setScheduleData(calendar.id).then(function(data){
			
		});
	}
	$scope.selectCalendarAry = function(){
		$scope.calendarArySelected = true;
		CalendarService.setCalendarArySelected(true);
		ScheduleService.setScheduleData($scope.calendarAryIds.join(",")).then(function(data){
			
		});
	}
	
	$scope.saveCalendarAryId = function(){
		$scope.showCalendarList = false;
		ScheduleService.setScheduleData(CalendarService.getCalendarAryIds().join(",")).then(function(data){
			
		});	
	}
	
	$scope.showScheduleMoreList = function(cell, $event){
		$event.stopPropagation();
		$scope.$broadcast('showScheduleMoreList', cell, $event);

	}
	
	$scope.hideNormalDialog = function($event){
		//hide tip
		$scope.$broadcast('closeTip', $event);
	}
}]);

myApp.controller('ScheduleTip', ['$scope', 'CalendarService', function($scope, CalendarService){
	$scope.show  = false;
	$scope.$on('showTip', function(e, schedule) {
		$scope.show = true;
		$scope.calendarName = CalendarService.getCalendarNameById(schedule.cid);
		$scope.content = schedule.text;
		$scope.datetime = schedule.start_time;
	});
	
	$scope.$on('closeTip', function(e, $event){
		$scope.show = false;
	});
	$scope.closeTip = function(){
		$scope.show  = false;	
	}
}]);

myApp.controller('ScheduleMoreList', ['$scope', function($scope){
	$scope.show = false;
	$scope.$on('showScheduleMoreList', function(e, cell, $event) {
		$scope.show = true;
		$scope.cell = cell;
		var pos = $($event.currentTarget).parent().position();
		$scope.position = {
			top:pos.top + "px",
			left:pos.left + "px"
		}
	});
	
}]);

