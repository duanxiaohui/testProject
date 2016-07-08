angular.module('365_calendar').service( 'DataService', ['$http', '$q',  function($http, $q ) {
	//variables
	var self = {
		dateMap:{},
		selectedCalendar:undefined,
		selectedDateItem:undefined,
		fromDate:new Date(),
		toDate:new Date(),
		cids:"",
		calendarData:""
	};
	
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
	
	function hex2rgba(hex){
		var r = parseInt(hex.substr(2, 2), 16); 
		var g = parseInt(hex.substr(4, 2), 16); 
		var b = parseInt(hex.substr(6, 2), 16); 
		var alpha = parseInt(hex.substr(0, 2), 16);
		return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
	}
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
			lunar: festival[0] && festival[0].desc || l.term || l.dateIndex == 0 && (l.lMonth + '月' + (l.isBigMonth ? '大' : '小')) || l.lDate,
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
				o.time = o.allday_event ? '全天' : o.start_time.slice(11, 16);
				
				if (self.dateMap[d]) {
					var cell = self.dateMap[d];
					cell.schedules.push(o);
				}
			});
		
		});
	}
	
	var service = {
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
			return cells;
		},
		selectDateItem: function(item, date){
			if(item){
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
		getMonthRows:function (date){
			var cld = new Calendar(date), calYear = date.getFullYear(), calMonth = date.getMonth(), calDate = date.getDate(), t = new Date();
			var fromDate = cld.getCalendarFirstDate();	
			var startDate = new Date(fromDate);
			var rows = [];
			for(var i = 0; i < 6; i++){
				var row = {};
				row.cells = $.map(new Array(7), function(_, j){
					var cell;
					var strDate = formatDate(startDate);
					if(self.dateMap[strDate]){
						var m = startDate.getMonth();
						cell = self.dateMap[strDate];
						cell.isMonthBefore = m < calMonth;
						cell.isMonthAfter  = m > calMonth;
						cell.schedules = [];
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
			return rows;
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
			return rows;
		},
		setScheduleData:function(){
			for(var i in self.dateMap){
				self.dateMap[i].schedules = [];
			}
			$http({
				url:"/schedule/list.do",
				params:{
					fromDate: formatDate(self.fromDate),
					toDate: formatDate(self.toDate),
					timeZone: -self.fromDate.getTimezoneOffset() / 60,
					calendarId: self.cids
				}
			}).success(function(data){
				if (data.state == 'wrongpass') {
					$.alert('对不起，您的登录已经过期，请重新登录！', {
						buttons: {
							'确定': function(){
								location = '/account/login.do';
							}
						}
					});
				} else {
					mergeScheduleData(data);
				}
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
		addSchedule: function(schedule){
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
				calendarId: self.selectedCalendar.id,
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
			};
			
			postData.updateV2Origin = '4';

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
		},
		getCalendarData: function(){
			var deferred = $q.defer();
			$http.post("/calendar/getCalendarListByUser.do").success(function(data){
				data.sort(function(a, b){
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
						});
				var extend_data = $.map(data, function(o, i){
					if(i == 0){
						o.selected = true;
					}
					var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1];
					o.bgcolor = hslToRgb.call(null, h, s, 0.70);	
					return o;
				});
				self.cids = extend_data[0].id;
				self.calendarData = extend_data;
				self.selectedCalendar = extend_data[0];
				deferred.resolve(extend_data);
				
			});
			return deferred.promise;
		},
		getCalendarListWithExtend: function(){
			var deferred = $q.defer();
			$http.get("/qzone/getCalendarListWithExtend.do").success(function(data){
				var calendars = $.map(data.calendars, function(o, i){
					o.calendar.extend = o.extend;
					if(o.extend && o.extend.theme && o.extend.theme.nt)
						o.calendar.titleColor = hex2rgba(o.extend.theme.nt.cl);
					return o.calendar;
				});
				calendars.sort(function(a, b){
					var a_seq = parseInt(a.sequence);
					var b_seq = parseInt(b.sequence);
					return a_seq - b_seq;
				});
				self.calendarData = calendars;
				self.selectedCalendar = calendars[0];
				self.selectedCalendar.selected = true;
				self.cids = calendars[0].id;
				deferred.resolve(calendars);
			});
			return deferred.promise;
		},
		selectCalendar:function(calendar){
			if(calendar){
				self.selectedCalendar.selected = false;
				self.selectedCalendar = calendar;
				self.selectedCalendar.selected = true;
				self.cids = self.selectedCalendar.id;				
			}
			return self.selectedCalendar;
		},
		addCalendar: function(calendar){
			
		},
		updateCalendar: function(calendar){
			
		},
		deleteCalendar: function(calendar){
			
		},
		getCalendarNameById: function(cid){
			for (var o, i = 0, l = self.calendarData.length; i < l; i++) {
				o = self.calendarData[i];
				if (o.id == cid) { return o.title; }
			}
		},
		getCalendarCategory: function(){
			var deferred = $q.defer();
			$http.get("/qzone/getCategoryCalendars.do").success(function(data){
				$.each(data.category, function(i, o){
					if(o.id == data.active_category_id){
						o.selected = true;
						self.selectedCategory = o;
					}
					//remove 工具
					if(o.title == "工具"){
						data.category.splice(i, 1);
					}
				});
				data.active_calendars.sort(function(a, b){
					var a_seq = parseInt(a.sequence);
					var b_seq = parseInt(b.sequence);
					return a_seq - b_seq;
				});
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		selectCategory:function(category){
			self.selectedCategory.selected = false;
			self.selectedCategory = category;
			self.selectedCategory.selected = true;
		},
		getCategoryCalendars: function(id){
			var deferred = $q.defer();
			$http.get("/qzone/getCategoryCalendars.do?category_id=" + id).success(function(data){
				data.active_calendars.sort(function(a, b){
					var a_seq = parseInt(a.sequence);
					var b_seq = parseInt(b.sequence);
					return a_seq - b_seq;
				});
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		subscribeCalendar: function(calendar){
			var deferred = $q.defer();
			$.ajax({
				url:"/qzone/subscribePublicCalendar.do",
				data:{
					calendarID:calendar.id
				},
				type:"post",
				dataType:"json",
				success: function(data){
					if(data.state == "ok"){
						data.calendar.extend = data.extend;
						self.calendarData.push(data.calendar);
						self.calendarData.sort(function(a, b){
							var a_seq = parseInt(a.sequence);
							var b_seq = parseInt(b.sequence);
							return a_seq - b_seq;
						});
						deferred.resolve(data);						
					}
				}
			});
			return deferred.promise;
		},
		unsubscribeCalendar:function(calendar){
			var deferred = $q.defer();
			$.ajax({
				url:"/qzone/unsubscribe.do",
				data:{
					calendarID:calendar.id
				},
				type:"post",
				dataType:"json",
				success: function(data){
					for(var i in self.calendarData){
						var item = self.calendarData[i];
						if(item.id == calendar.id){
							self.calendarData.splice(i, 1);
						}
					}
					if(self.selectedCalendar.id == calendar.id){
						self.selectedCalendar = self.calendarData[0];
						self.selectedCalendar.selected = true;
						self.cids = self.selectedCalendar.id;
						service.setScheduleData();
					}
					deferred.resolve(self.selectedCalendar);
				}
			});
			return deferred.promise;
		},
		getScheuleShareUrl:function(cid, uuid, d1, d2, target){
			var deferred = $q.defer();
			$.ajax({
				url:'/qzone/getScheuleShareUrl.do',
				data:{
					calendarID: cid,
					scheduleUUID: uuid,
					dateline1: d1,
					dateline2: d2,
					target:target
				},
				success:function(data){
					deferred.resolve(data);
				},
				type:"post",
				dataType:"json"
			});
			return deferred.promise;
		},
		getCalendarShareUrl:function(cid, data, target){
			var deferred = $q.defer();
			$.ajax({
				url:'/qzone/getCalendarShareUrl.do',
				data:{
					calendarID: cid,
					data: data,
					target:target
				},
				type:"post",
				dataType:"json",
				success:function(data){
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		}
	}
	return service;
}]);
