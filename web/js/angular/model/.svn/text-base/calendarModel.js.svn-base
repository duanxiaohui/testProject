angular.module('365_calendar').service( 'CalendarModel', ['$http', '$q',  function($http, $q) {
	function hex2rgba(hex){
		var r = parseInt(hex.substr(2, 2), 16); 
		var g = parseInt(hex.substr(4, 2), 16); 
		var b = parseInt(hex.substr(6, 2), 16); 
		var alpha = parseInt(hex.substr(0, 2), 16);
		return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
	}
	
	var self = {
		calendars:[],
		selected:undefined,
		getCalendarList: function(){
			var deferred = $q.defer();
			$.ajax({
				url:"/calendar/getCalendarListByUser.do",
				type:"post",
				dataType:"json",
				success:function(data){
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
						o.selectedInCalendarAry = true;
						o.selectedInCalendarAryOriginal = true;
						return o;
					});
					self.calendars = extend_data;
					self.selected = extend_data[0];
					deferred.resolve(extend_data);
				}
			});
			return deferred.promise;
		},
		getCalendarListWithExtend: function(){
			var deferred = $q.defer();
			$http.get("/qzone/getCalendarListWithExtend.do").success(function(data){
				if(data.state == "wrongpass"){
					deferred.resolve(data);
					return;
				}
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
		getQzoneCalendarListWithExtend: function(){
			var deferred = $q.defer();
			$.ajax({
				url:"/qzone/getCalendarListWithExtend.do",
				type:"GET",
				dataType:"json",
				success:function(data){
					if(data.state == "wrongpass"){
						deferred.resolve(data);
						return;
					}
					var calendars = $.map(data.calendars, function(o, i){
						if(o.calendar.access_type == 1){
							o.calendar.extend = o.extend;
							if(o.extend && o.extend.theme && o.extend.theme.nt)
								o.calendar.titleColor = hex2rgba(o.extend.theme.nt.cl);
							return o.calendar;							
						}
					});
					calendars.sort(function(a, b){
						var a_seq = parseInt(a.sequence);
						var b_seq = parseInt(b.sequence);
						return a_seq - b_seq;
					});
					self.calendars = calendars;
					self.selected = calendars[0];
					if(self.selected){
						self.selected.selected = true;	
					}
					deferred.resolve(calendars);
				}
			});
			return deferred.promise;
		},
		selectCalendar:function(calendar){
			if(calendar){
				if(self.selected)
					self.selected.selected = false;
				self.selected = calendar;
				self.selected.selected = true;
			}
			return self.selectedCalendar;
		},
		addCalendar: function(calendar){
			self.calendars.push(calendar);
			self.calendars.sort(function(a, b){
				var a_seq = parseInt(a.sequence);
				var b_seq = parseInt(b.sequence);
				return a_seq - b_seq;
			});
			//判断当前是否没有日历被选择
			if(!self.selected){
				self.selected = self.calendars[0];
				self.selected.selected = true;
				return true;
			}
			return false;
		},
		updateCalendar: function(calendar){
			
		},
		deleteCalendar: function(calendar){
			for(var i in self.calendars){
				var item = self.calendars[i];
				if(item.id == calendar.id){
					self.calendars.splice(i, 1);
				}
			}
			if(self.selected.id == calendar.id){
				if(self.calendars.length == 0){
					self.selected = undefined;
				}else{
					self.selected = self.calendars[0];
					self.selected.selected = true;					
				}
			}
		},
		getCalendarNameById: function(cid){
			for (var o, i = 0, l = self.calendars.length; i < l; i++) {
				o = self.calendars[i];
				if (o.id == cid) { return o.title; }
			}
		},
		getCalendarColorById: function(cid){
			for (var o, i = 0, l = self.calendars.length; i < l; i++) {
				o = self.calendars[i];
				if (o.id == cid) {
					var hsl = rgbToHsl(o.color), h = hsl[0], s = hsl[1];
					return {
						"background-color":hslToRgb.call(null, h, s, 0.96),
						"border-color":o.color
					}
				}					
			}
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
						var rs = self.addCalendar(data.calendar);
						deferred.resolve(rs);						
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
					self.deleteCalendar(calendar);
					deferred.resolve(self.selected);
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
		},
		setCalendarArySelected:function(selected){
			$.cookie('yy_calendarArySelected' + "20140320", selected, {
				expires: 365,
				path:"/"
			});
		},
		getCalendarArySelected:function(){
			var rs = $.cookie('yy_calendarArySelected' + "20140320");
			if(rs == "true")
				return true;
			return false;
		},
		setCalendarAryIds: function(){
			$.cookie('yy_calendarAryIds' + "20140320", "", {
				expires: 365,
				path:"/"
			});
		},
		getCalendarAryIds: function(){
			return $.map(self.calendars, function(o,i){
				if(o.selectedInCalendarAry){
					return o.id;					
				}
			});
		},
		setCalendarId: function(){
			$.cookie('yy_calendarId' + "20140320", "", {
				expires: 365,
				path:"/"
			});
		}
	}
	return self;
}])
.service( 'CategoryModel', ['$q',  function($q){
	var self = {
		category:[],
		selectedCategory:undefined,
		publicCalendars:[],
		getCalendarCategory: function(){
			var deferred = $q.defer();
			$.ajax({
				url:"/qzone/getCategoryCalendars.do",
				type:"get",
				dataType:"json",
				success:function(data){
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
					self.category = data.category;
					self.publicCalendars = data.active_calendars;
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		},
		selectCategory:function(category){
			if(self.selectedCategory)
				self.selectedCategory.selected = false;
			self.selectedCategory = category;
			self.selectedCategory.selected = true;
		},
		getCategoryCalendars: function(id){
			var deferred = $q.defer();
			$.ajax({
				url:"/qzone/getCategoryCalendars.do?category_id=" + id,
				type:"get",
				dataType:"json",
				success: function(data){
					data.active_calendars.sort(function(a, b){
						var a_seq = parseInt(a.sequence);
						var b_seq = parseInt(b.sequence);
						return a_seq - b_seq;
					});
					self.publicCalendars = data.active_calendars;
					deferred.resolve(data);
				}
			});
			return deferred.promise;
		}
	}
	return self;
}]);