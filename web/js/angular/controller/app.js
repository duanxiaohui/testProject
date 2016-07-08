angular.module('365_calendar', ['ui.date'])
.controller('CalendarController', ['$scope','$http', 'CalendarModel','ScheduleModel', function($scope, $http, CalendarModel, ScheduleModel){
	var self = {};
	/**************************************   init   ***************************************************/
	self.currentDate = new Date();
	$scope.CalendarModel = CalendarModel;
	$scope.ScheduleModel = ScheduleModel;
	CalendarModel.getCalendarList().then(function(data){
		$scope.calendarAryIds = CalendarModel.getCalendarAryIds();
		$scope.calendarArySelected = CalendarModel.getCalendarArySelected();
		var cids;
		if($scope.calendarArySelected){
			cids = $scope.calendarAryIds.join(",");
		}else{
			cids = CalendarModel.selected.id;
		}
		ScheduleModel.setScheduleData(cids).then();
	});
	ScheduleModel.getStaticMonthRows(self.currentDate);
	ScheduleModel.getWeekRows(self.currentDate);
	ScheduleModel.getListRows(self.currentDate);
	$scope.year = self.currentDate.getFullYear();
	$scope.month = self.currentDate.getMonth();
	$scope.viewType = 'month';
	$scope.greetingText = getGreetingText(new Date());
	
	/**************************************   event  ***************************************************/
	$scope.showTip = function(schedule, $event){
		$event.stopPropagation();
		$scope.$broadcast('showTip', schedule);
	}
	$scope.showScheduleCreator = function(cell, $event){
		$scope.$broadcast('showScheduleCreator', cell, $event);
	}
	$scope.monthChanged = function(delta){
		self.currentDate.setDate(delta > 0 ? 32 : 0);
		ScheduleModel.getStaticMonthRows(self.currentDate);
		$scope.year = self.currentDate.getFullYear();
		$scope.month = self.currentDate.getMonth();
		ScheduleService.setScheduleData().then();
	}
	$scope.selectCalendar = function(calendar){
		CalendarModel.selectCalendar(calendar);
		$scope.calendarArySelected = false;
		CalendarModel.setCalendarArySelected(false);
		ScheduleModel.setScheduleData(calendar.id).then();
	}
	$scope.selectCalendarAry = function(){
		$scope.calendarArySelected = true;
		CalendarModel.setCalendarArySelected(true);
		ScheduleModel.setScheduleData($scope.calendarAryIds.join(",")).then();
	}
	$scope.saveCalendarAryId = function(){
		$scope.showCalendarList = false;
		$scope.calendarAryIds = CalendarModel.getCalendarAryIds();
		ScheduleModel.setScheduleData($scope.calendarAryIds.join(",")).then();	
	}
	$scope.showScheduleMoreList = function(cell, $event){
		$event.stopPropagation();
		$scope.$broadcast('showScheduleMoreList', cell, $event);

	}
	$scope.hideNormalDialog = function($event){
		//hide tip
		$scope.$broadcast('closeTip', $event);
	}
	$scope.closeCalendarList = function(){
		$scope.showCalendarList = false;
	}
}])
.controller('ScheduleTip', ['$scope', 'CalendarModel', function($scope, CalendarModel){
	$scope.show  = false;
	$scope.$on('showTip', function(e, schedule) {
		$scope.show = true;
		$scope.calendarName = CalendarModel.getCalendarNameById(schedule.cid);
		$scope.content = schedule.text;
		$scope.datetime = schedule.start_time;
	});
	
	$scope.$on('closeTip', function(e, $event){
		$scope.show = false;
	});
	$scope.closeTip = function(){
		$scope.show  = false;	
	}
}])
.controller('ScheduleMoreList', ['$scope', function($scope){
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

