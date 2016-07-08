angular.module('365_calendar').controller('ScheduleCreator', ['$scope', 'ScheduleModel','CalendarModel', function($scope, ScheduleModel, CalendarModel){
	$scope.show = false;
	$scope.isSimple = true;
	function ScheduleDetail(startTime){
		return {
			schTitle: "",
			alldayEvent: true,
			calendarId: "",
			startTime: new Date(startTime),
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
	$scope.$on('showScheduleCreator', function(e, dateItem, $event) {
		$scope.show = true;
		$scope.isSimple = true;
		$scope.scrollHeight = document.body.scrollHeight + "px";
		$scope.cellIndex = $($event.currentTarget).prop("cellIndex");
		var offsetWidth = 181;
		var pos = $($event.currentTarget).position();
		var left = $scope.cellIndex < 2 ? pos.left + offsetWidth : pos.left - 280;
		var top = pos.top;
		var maxTop = document.documentElement.clientHeight - 183;
		top = top > maxTop ? maxTop : top;
		$scope.position = {
			top:  top + 'px',
			left: left + 'px'
		}
		$scope.schedule = new ScheduleDetail(dateItem.dateObj);
	});
	
	$scope.addSchedule = function(schedule){
		var cid = CalendarModel.selectCalendar().id;
		ScheduleModel.addSchedule(schedule, cid, $scope.isSimple).then(function(data){
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