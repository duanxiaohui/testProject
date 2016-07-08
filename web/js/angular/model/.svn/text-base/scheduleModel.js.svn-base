angular.module('365_calendar').service( 'ScheduleModel', ['$http', '$q', 'CalendarModel' , function($http, $q, CalendarModel ) {
	//require Calendar
	//require lunar
	var festival2013 = {}, workday2013 = {};
	$.each('m1d1 m1d2 m1d3 m2d9 m2d10 m2d11 m2d12 m2d13 m2d14 m2d15 m4d4 m4d5 m4d6 m4d29 m4d30 m5d1 m6d10 m6d11 m6d12 m9d19 m9d20 m9d21 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
		festival2013[key] = 'rest';
	});

	$.each('m1d5 m1d6 m2d16 m2d17 m4d7 m4d27 m4d28 m6d8 m6d9 m9d22 m9d29 m10d12'.split(' '), function(_, key){
		workday2013[key] = 'work';
	});
	var festival2014 = {}, workday2014 = {};
	$.each('m1d1 m1d31 m2d1 m2d2 m2d3 m2d4 m2d5 m2d6 m4d5 m4d6 m4d7 m5d1 m5d2 m5d3 m5d31 m6d1 m6d2 m9d6 m9d7 m9d8 m10d1 m10d2 m10d3 m10d4 m10d5 m10d6 m10d7'.split(' '), function(_, key){
		festival2014[key] = 'rest';
	});

	$.each('m1d26 m2d8 m5d4 m9d28 m10d11'.split(' '), function(_, key){
		workday2014[key] = 'work';
	});
	
	function setTimeZero(date){
		var ndate = new Date(date);
		ndate.setHours(0);
		ndate.setMinutes(0);
		ndate.setSeconds(0);
		ndate.setMilliseconds(0);	
		return ndate;
	}
	
	function getDayMatter(date){
		var t = setTimeZero(new Date());
		var d = setTimeZero(date);
		var num = Math.floor((d.getTime() - t.getTime()) / 86400000);
		
		if(num == 0){
			return "";
		}else if(num == 1){
			return "明天";
		}else if(num == -1){
			return "昨天";
		}else if(num > 0){
			return num + "天后";
		}else{
			return -num + "天前";
		}
	}
	
	
	function DateInfo(date, t, calMonth){
		if(!t)	t = new Date();
		var y = date.getFullYear(), m = date.getMonth(), d = date.getDate(), w = date.getDay();
		var l = lunar(date), festival = l.festival(), isToday = d == t.getDate() && m == t.getMonth() && y == t.getFullYear();
		var key = 'm' + (m + 1) + 'd' + d;
		var lMonth = l.lMonth;
		if(lMonth == "十一"){
			lMonth = "冬";
		}
		if(lMonth == "十二"){
			lMonth = "腊";
		}
		var lunarStr = lMonth +"月"+ l.lDate;		
		return {
			isToday:isToday ,
			isVocation: (y == 2013 && festival2013[key]) || (y == 2014 && festival2014[key]),
			isWork: (y == 2013 && workday2013[key]) || (y == 2014 && workday2014[key]),
			isMonthBefore: m < calMonth,
			isMonthAfter:  m > calMonth,
			isWeekend:  w == 0 || w == 6,				
			solar: date.getDate(),
			year:date.getFullYear(),
			month:date.getMonth(),
			day:date.getDay(),
			lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
			festival:festival[0] && festival[0].desc,
			date: formatDate(date),
			color: '808080',
			week: l.cnDay,
			dateObj:new Date(date),
			lunarStr:lunarStr,
			daymatter:getDayMatter(date),
			schedules:[]
		}
	}
	
	function mergeScheduleData(data){
		//获取日程数据，存储到oSort
		$.each(data, function(_, c){
			//需要处理跨天的日程
			var expand_schlist = [];
			$.each(c.schlist, function(_, o){
				//处理图片
				if(c.piclist && c.piclist[o.uuid]){
					o.pics = c.piclist[o.uuid];
				}
				if(o.duration > 0){
					expand_schlist.push(o);
					function getDateFromStr(str){
						var d = new Date();
						try{
							var ary = o.start_time.split(" ");
							d.setFullYear(ary[0].split("-")[0]);
							d.setMonth(parseInt(ary[0].split("-")[1],10) - 1);
							d.setDate(ary[0].split("-")[2]);
							
							d.setHours(ary[1].split(":")[0]);
							d.setMinutes(ary[1].split(":")[1]);
							d.setSeconds(ary[1].split(":")[2])
							return d;
						}catch(e){
							return new Date(str);
						}
					}
					var start = getDateFromStr(o.start_time);
					var end = new Date(start.getTime() + o.duration*1000);
					var start_zero = new Date(start);
					start_zero.setHours(0);
					start_zero.setMinutes(0);
					start_zero.setSeconds(0);
					
					for(var i=new Date(start_zero.getTime() + 86400000); i<=end; i=new Date(i.getTime()+86400000)){
						var clonedObj = {};
						$.extend(clonedObj,o);
						clonedObj.start_time = formatDate(i) + " 09:00:00";
						clonedObj.allday_event = true;
						expand_schlist.push(clonedObj);
					}
				}else{
					expand_schlist.push(o);
				}
			});
			$.each(expand_schlist, function(_, o){
				//add pic_str
				if(o.pics){
					o.pic_str = $.map(o.pics, function(val, index){
						return val.pic;
					}).join(",");
				}else{
					o.pic_str = "";
				}
				var d = o.start_time.split(' ')[0];
				//o.access_type = oPermissions[o.cid];
				o.time = o.allday_event ? '' : o.start_time.slice(11, 16);
				o.colorStyle = CalendarModel.getCalendarColorById(o.cid);
				if (self.dateMap[d]) {
					var cell = self.dateMap[d];
					cell.schedules.push(o);
				}
			});
		
		});
		
	}
	
	function mergeScheduleData4Share(data){
		$.each(data, function(_, o){
			//add pic_str
			if(o.pics){
				o.pic_str = $.map(o.pics, function(val, index){
					return val.pic;
				}).join(",");
			}else{
				o.pic_str = "";
			}
			var date = new Date(o.startTime);
			var d = formatDate(date);
			var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
			o.access_type = o.accessType;
			o.start_time = d + " " + time;
			o.time = o.allDayEvent ? '全天' : date.getHours() + ":" + date.getMinutes() ;
			o.allday_event = o.allDayEvent;
			o.text = o.title;
			if (self.dateMap[d]) {
				var cell = self.dateMap[d];
				cell.schedules.push(o);
			}
		});
	}
	
	var self = {
		monthRows:[],
		weekRows:[],
		listRows:[],
		dateMap:{},
		selectedDateItem:undefined,
		fromDate:new Date(),
		toDate:new Date(),
		cids:"",
		getMonthDateItems:function(date){
			var cld = new Calendar(date), calYear = date.getFullYear(), calMonth = date.getMonth(), calDate = date.getDate(), t = new Date();
			var fromDate = cld.getCalendarFirstDate();	
			var startDate = new Date(fromDate);
			var cells = $.map(new Array(42), function(_, j){
					var cell;
					var strDate = formatDate(startDate);
					if(self.dateMap[strDate]){
						var m = startDate.getMonth();
						cell = self.dateMap[strDate];
						cell.isMonthBefore = m < calMonth;
						cell.isMonthAfter  = m > calMonth;
					}else{
						cell = new DateInfo(startDate, t, calMonth);
						self.dateMap[strDate] = cell;	
					}
					void (startDate.setDate(startDate.getDate() + 1));
					return cell;
			});
			
			var toDate = new Date(startDate);
			self.fromDate = fromDate;
			self.toDate   = toDate;
			
			if(self.selectedDateItem){
				self.selectedDateItem.selected = false;
			}
			var strDate = formatDate(date);
			self.selectedDateItem = self.dateMap[strDate];
			self.selectedDateItem.selected = true;
			self.monthRows = cells;
			return cells;
		},
		selectDateItem: function(item, date){
			if(item){
				if(self.selectedDateItem)
					self.selectedDateItem.selected = false;
				self.selectedDateItem = item;
				self.selectedDateItem.selected = true;
			}
			if(date){
				self.selectedDateItem.selected = false;
				var strDate = formatDate(date);
				self.selectedDateItem = self.dateMap[strDate];
				self.selectedDateItem.selected = true;
			}
			return self.selectedDateItem;
		},
		getMonthRows:function (date, len){
			var cld = new Calendar(date), calYear = date.getFullYear(), calMonth = date.getMonth(), calDate = date.getDate(), t = new Date();
			var fromDate = cld.getCalendarFirstDate();	
			var startDate = new Date(fromDate);
			var rows = [];
			for(var i = 0; i < len; i++){
				var row = {};
				row.cells = $.map(new Array(7), function(_, j){
					var cell;
					var strDate = formatDate(startDate);
					if(self.dateMap[strDate]){
						var m = startDate.getMonth();
						cell = self.dateMap[strDate];
						cell.isMonthBefore = m < calMonth;
						cell.isMonthAfter  = m > calMonth;
					}else{
						cell = new DateInfo(startDate, t, calMonth);
						self.dateMap[strDate] = cell;	
					}
					void (startDate.setDate(startDate.getDate() + 1));
					return cell;
				});
				rows.push(row);
			}
			var toDate = new Date(startDate);
			self.fromDate = fromDate;
			self.toDate   = toDate;
			var strDate = formatDate(date);
			self.selectedDateItem = self.dateMap[strDate];
			self.selectedDateItem.selected = true;
			return rows;
		},
		getWeekRows: function(date){
			var cld = new Calendar(date), calYear = date.getFullYear(), calMonth = date.getMonth(), calDate = date.getDate(), t = new Date();
			var startDate = cld.getWeekFirstDate();
			self.weekRows = $.map(new Array(7), function(_, j){
				var cell;
				var strDate = formatDate(startDate);
				if(self.dateMap[strDate]){
					var m = startDate.getMonth();
					cell = self.dateMap[strDate];
				}else{
					cell = new DateInfo(startDate, t, calMonth);
					self.dateMap[strDate] = cell;	
				}
				void (startDate.setDate(startDate.getDate() + 1));
				return cell;
			});
		},
		getStaticMonthRows:function(date){
			self.monthRows = self.getMonthRows(date, 6);
		},
		getMutableMonthRows:function(date){
			var cld = new Calendar(date)
			self.monthRows = self.getMonthRows(date, cld.getCalendarMonthRowCount())
		},
		getListRows: function(date){
			var t = new Date();
			var calMonth = date.getMonth();
			var curDate = new Date(date);
			curDate.setDate(1);
			var startDate = new Date(curDate);
			curDate.setMonth(curDate.getMonth() + 1);
			curDate.setDate(0);
			var days = curDate.getDate();
			
			var rows = [];
			for(var i = 0; i < days; i++){
				var cell;
				var strDate = formatDate(startDate);
				if(self.dateMap[strDate]){
					cell = self.dateMap[strDate];
					cell.schedules = [];
				}else{
					cell = new DateInfo(startDate, t, calMonth);
					self.dateMap[strDate] = cell;	
				}
				rows.push(cell);
				startDate.setDate(startDate.getDate() + 1);
			}
			self.listRows = rows;
		},
		setScheduleData:function(cids){
			var deferred = $q.defer();
			if(cids != undefined){
				self.cids = cids;
			}
			for(var i in self.dateMap){
				self.dateMap[i].schedules = [];
			}
			if(self.cids == ""){
				return deferred.promise;
			}
			$.ajax({
				url:"/schedule/list.do",
				data:{
					fromDate: formatDate(self.fromDate),
					toDate: formatDate(self.toDate),
					timeZone: -self.fromDate.getTimezoneOffset() / 60,
					calendarId: self.cids	
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
						var cids = $.map(data, function(o, i){
							return o.cid;
						}).join(",");
						if(self.cids == cids){
							mergeScheduleData(data);	
						}
						deferred.resolve(data);
					}	
				}
			})
			return deferred.promise;
		},
		clearScheduleData:function(){
			for(var i in self.dateMap){
				self.dateMap[i].schedules = [];
			}
		},
		setPublicScheduleData4Share:function(cids){
			if(cids){
				self.cids = cids;
			}
			for(var i in self.dateMap){
				self.dateMap[i].schedules = [];
			}
			$http({
				url:"/coco/single/getPublicSchedulesByRange.do",
				params:{
					fromDate: formatDate(self.fromDate),
					toDate: formatDate(self.toDate),
					timeZone: -self.fromDate.getTimezoneOffset() / 60,
					calendarID: self.cids
				}
			}).success(function(data){
				if(data == ""){
					var strDate = formatDate(new Date());
					var cell = self.dateMap[strDate];
					var d = JSON.parse(G.data);
					for(var i in d.schedules){
						var item = d.schedules[i];
						item.text = item.title;
						item.time = item.startTime;
						cell.schedules.push(item);
					}
				}
				mergeScheduleData4Share(data);
			});
		},
		getPublicScheduleData: function(cid){
			var deferred = $q.defer();
			var today = new Date();
			var fromDate = new Date(today.getTime());
			var toDate = new Date(today.getTime() + 86400000 * 30);
			$http({
				url:'/qzone/getPublicSchedulelist.do',
				params:{
					fromDate: formatDate(fromDate),
					toDate: formatDate(toDate),
					timeZone: -fromDate.getTimezoneOffset() / 60,
					calendarId: cid
				}
			}).success(function(data){
				$.each(data[0].schlist, function(i, o){
					o.time = o.allday_event ? '' : o.start_time.slice(11, 16);
					//add pic_str
					if(o.pics){
						o.pic_str = $.map(o.pics, function(val, index){
							return val.pic;
						}).join(",");
					}else{
						o.pic_str = "";
					}
				});
				deferred.resolve(data[0].schlist.slice(0, 3));
			});
			return deferred.promise;
		},
		addSchedule: function(schedule, cid, isSimple){
			function formatDateTime(date){
				return formatDate(date) + " " + [
				        ("0" + date.getHours()).slice(-2),
				        ("0" + date.getMinutes()).slice(-2),
				        ("0" + date.getSeconds()).slice(-2)
				].join(":");
			}
			
			var deferred = $q.defer();
			var startTime = [formatDate(schedule.startTime), " ", schedule.startHour,":",schedule.startMinute, ":00"].join("");
			var postData = {
				schTitle: schedule.schTitle,
				alldayEvent: schedule.alldayEvent,
				calendarId: cid,
				startTime: startTime,
				timeZone: -(new Date()).getTimezoneOffset() / 60
			}
			
			if(!isSimple){
				postData = {
					schTitle: schedule.schTitle,
					alldayEvent: schedule.alldayEvent,
					calendarId: cid,
					startTime: startTime,
					timeZone: -(new Date()).getTimezoneOffset() / 60,
					repeatType: 0,
					calendarType: schedule.calendarType,
					before_minutes: '',
					fromDate: formatDate(self.fromDate),
					toDate: formatDate(self.toDate),
					duration: 0,
					repeatCount: '',
					repeatDay: '',
					repeatFrequency: '',
					repeatMonth: '',
					repeatMonthDay: '',
					repeatStopTime: '',
					scheduleId: '',
					linked_url: schedule.linked_url,
					location: schedule.location
				}
			}

			postData.updateV2Origin = '2';
			
			$.ajax({
				type:"post",
				dataType:"json",
				url:"/schedule/updateV2.do",
				data:postData,
				success:function(data){
					mergeScheduleData([data]);
					deferred.resolve(data);					
				}
			});			
			return deferred.promise;
		},
		updateSchedule: function(){
			
		},
		deleteSchedule: function(sid){
			var deferred = $q.defer();
			$http.get("/schedule/delete.do?scheduleId=" + sid).success(function(data){
				if(data == "true"){
					$.each(self.dateMap, function(i, o){
						for (var j = o.schedules.length - 1; j > -1; j--) {
							if (sid == o.schedules[j].id) {
								o.schedules.splice(j, 1);
							}
						}
					});
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		}
	}
	return self;
}]);
