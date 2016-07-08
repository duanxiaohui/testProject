/**
 * 
 * @authors huangyi (huangyi@365rili.com)
 * @date    2014-07-16 16:09:08
 * @version 0.0.0.1
 */
angular.module('365_calendar.reader', [])
.controller('ReaderController', function($scope, $http, DataService){
	var scheduleData;

	DataService.getCalendarList().then(function(data){
		//set $scope
		$scope.calendars = data;
		$scope.selectedCalendar = data[0];
		$scope.allCalendar = true;
		var cids = $.map(data, function(o){
			return o.id;
		}).join(",");
		var fromDate = new Date("2014/07/01");
		var toDate = new Date("2014/08/01");
		DataService.getScheduleList(cids, fromDate, toDate).then(function(data){
			scheduleData = data;
			var scheduleList = [];			
			$.each(data, function(i,o){
				$.each(o.schlist, function(_, schedule){
					schedule.texts = schedule.text.split("\n");
					schedule.title = schedule.texts[0];
					schedule.time = schedule.start_time.substr(5, 11);
					schedule.images = o.piclist[schedule.uuid];
					if(schedule.images){
						$.each(schedule.images, function(_, image){
							image.pic = o.pic_url + image.pic;
						})
					}
					scheduleList.push(schedule);

				})
			})
			$scope.scheduleList =scheduleList;
			scheduleList[0].selected = true;
			$scope.selectedSchedule = scheduleList[0];
		});
	});


	$scope.selectCalendar = function(calendar){
		if(calendar.selected){
			return;
		}
		$scope.allCalendar = false;
		$scope.selectedCalendar.selected = false;
		calendar.selected = true;
		$scope.selectedCalendar = calendar;

		$scope.scheduleList = filterSchedule(calendar.id);
		$scope.scheduleList[0].selected = true;
		$scope.selectedSchedule = $scope.scheduleList[0];

	}

	$scope.selectSchedule = function(schedule){
		if(schedule.selected){
			return;
		}
		$scope.selectedSchedule.selected = false;
		schedule.selected = true;
		$scope.selectedSchedule = schedule;
	}

	function filterSchedule(cid){
		for(var i in scheduleData){
			if(scheduleData[i].cid == cid){
				return scheduleData[i].schlist;
			}
		}
	}

})
.service("DataService", function($q){
	var self = {
		calendars:[],
		selected:null,
		getCalendarList: function(){
			var deferred = $q.defer();
			$.ajax({
				url:"/calendar/getCalendarListByUser.do",
				type:"post",
				dataType:"json",
				success:function(data){
					data.sort(self.sortCalendar);
					var extend_data = $.map(data, function(o, i){
						// if(i == 0){
						// 	o.selected = true;
						// }
						var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1];
						o.bgcolor = hslToRgb.call(null, h, s, 0.70);
						o.selectedInCalendarAry = true;
						o.selectedInCalendarAryOriginal = true;
						return o;
					});
					deferred.resolve(extend_data);
				}
			});
			return deferred.promise;
		},
		sortCalendar: function(a, b){
			var a_accessType = parseInt(a.access_type);
			var b_accessType = parseInt(b.access_type);
			var a_cid = parseInt(a.id);
			var b_cid = parseInt(b.id);
			//先判断是否是主日历
			if(a.is_primary == "true" && a.data_domain != "google"){
				return -1;
			}else if(b.is_primary == "true" && b.data_domain != "google"){
				return 1;
			}
			//判断是否是google日历
			if(a.data_domain == "google" && b.data_domain != "google"){
				return -1;
			}else if(b.data_domain == "google" && a.data_domain != "google"){
				return 1;
			}
			if(a_accessType != b_accessType){
				return b_accessType - a_accessType;
			}
			return a_cid - b_cid;
		},
		getScheduleList: function(cids, fromDate, toDate){
			var deferred = $q.defer();
			$.ajax({
				url:"/schedule/list.do",
				data:{
					fromDate: formatDate(fromDate),
					toDate: formatDate(toDate),
					timeZone: -fromDate.getTimezoneOffset() / 60,
					calendarId: cids	
				},
				dataType:"json",
				type:"post",
				success:function(data){
					if (data.state == 'wrongpass') {
						$.alert('对不起，您的登录已经过期，请重新登录！', {
							buttons: {
								'确定': function(){
									location = '/account/login.do';
								}
							}
						});
					} else {
						deferred.resolve(data);
					}	
				}
			})
			return deferred.promise;
		}
	}
	return self;		
})
