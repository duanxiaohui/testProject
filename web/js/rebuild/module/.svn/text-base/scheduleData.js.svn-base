define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/module/getHolidays',
	'rebuild/base/solarAndLunar'
], function(c, cp, Holidays) {
	var _data = {
		scheduleList: cp.getScheduleList(),
		allSchedule: cp.getAllSchedule()
	};

	var _ex = {

		getScheduleData: function (needGetScheduleRang) {
			_data.needGetScheduleRang = needGetScheduleRang;

			var beginDate, endDate, calendars;
				beginDate = c.formatDate(needGetScheduleRang.begin);

				//参数需要，所以结束日期加一天
				endDate = new Date(needGetScheduleRang.end);
				endDate.setDate(endDate.getDate() + 1);
				endDate = c.formatDate(endDate);

			//生成本次获取的日期边界，公共数据进行处理，一些特殊数据的时候需要用到
			var dataRang = {from: beginDate, to: endDate};

			//此处获取的calendars由Gird上报并统计出来，不直接获取选中的日历，因为选中时不触发获取事件，而且是按需获取，不是按操作获取
			// calendars = cp.getCalendarListSelectedCld();	
			var calendars = [];
			for(var cid in needGetScheduleRang.calendars){
				calendars.push(cid);
			}

			//如果需要获取的日历为0，则生成空数据返回
			if(calendars.length === 0){
				$.loading.close();
				return amplify.publish('sceduleDataGeted', [], dataRang);
			}
			var pdata = {
					fromDate: beginDate,
					toDate: endDate,
					timeZone: -needGetScheduleRang.begin.getTimezoneOffset() / 60,
					calendarId: calendars.join(',')
			};
			$.ajax({
				url: '/schedule/list.do',
				type: 'post',
				dataType: 'json',
				beforeSend: function () {
					$.loading();
				},
				data: pdata,
				success: function(data) {
					if (data.state == 'wrongpass') {
						return amplify.publish('loginTimeout');
					} else {
						amplify.publish('sceduleDataGeted', data, dataRang);
					}
					$.loading.close();
				},
				error:function(){
				}
			});
		},

		removeSchedule: function () {
			var r_sid = arguments[0].sid || arguments[0];

			//从公共数据内删除，包括重复日程
			var scheduleByDate = null, scheduleByCalendar;
			for(var _date in _data.scheduleList){
				scheduleByDate = _data.scheduleList[_date];

				for(var _calendar in scheduleByDate){
					scheduleByCalendar = scheduleByDate[_calendar];

					for (var i = 0, l = scheduleByCalendar.length; i < l; i++) {
						if(scheduleByCalendar[i].id == r_sid){
							scheduleByCalendar.splice(i, 1);
							l--;
							i--;
						}
					};
				}
			}

			//从hash里删除，包括所有的重复日程
			for(var primary in _data.allSchedule){
				if(_data.allSchedule[primary].id == r_sid){
					delete _data.allSchedule[primary]
				}
			}

			amplify.publish('scheduleDataChanged', _data, cp.getCalendarListSelectedCld());
		},

		removeScheduleBySid: function (sid) {
			_ex.removeSchedule(sid);
		},

		removeScheduleByCalendar: function () {
			var r_cid = arguments[0],
				//cloned数据的cid
				r_cid_cloned = r_cid + '_cloned';

			//从hash里删除
			for(var primary in _data.allSchedule){
				if(_data.allSchedule[primary].cid == r_cid){
					delete _data.allSchedule[primary];
				}
			}

			for(var id in _data.allScheduleById){
				if(_data.allScheduleById[id].cid == r_cid){
					delete _data.allScheduleById[id];
				}
			}

			//从公共数据内删除，包括重复日程
			var scheduleByDate = null, scheduleByCalendar;
			for(var _date in _data.scheduleList){
				scheduleByDate = _data.scheduleList[_date];

				for(var _calendar in scheduleByDate){
					if(_calendar == r_cid){
						delete scheduleByDate[r_cid];
						delete scheduleByDate[r_cid_cloned];
					}
				}
			}

			amplify.publish('scheduleDataChanged', _data, cp.getCalendarListSelectedCld());
		},

		updateSchedule: function () { //编辑行为执行：删除 >> 添加
			var schedule = arguments[0];

			//删除
			var sid = schedule.schlist[0].id;
			_ex.removeScheduleBySid(sid);

			_ex.updateScheduleData([schedule]);
		},

		addSchedule: function () {
			var schedule = arguments[0];
			_ex.updateScheduleData([schedule]);
		},

		//只增加与覆盖
		updateScheduleData: function () {
			var data = arguments[0] || [];

			//无数据，初始化
			if(!_data.scheduleList){
				_data.scheduleList = {};
				_data.allSchedule = {};
				_data.allScheduleById = {};
			}

			var calendarData, cid, schedule, scheduleList = _data.scheduleList, allSchedule = _data.allSchedule, allScheduleById = _data.allScheduleById, day, hsl;

			//日历切换不处理数据
			var calendarSelId = arguments[0] == -1 ? cp.getCalendarList().selectedClds : [arguments[0]];
			
			//added by Xiaoqi 当第一次加载数据时，将当前月份视图所有日历数据都一并加载
			if(!cp.getInitedStatus()) {
				//默认加载当前月份所有日历的数据
				var cList = cp.getAllCalendarList();
				if(cList){
					var selectedIds = [];
					for (var i = 0, l = cList.length; i < l; i++) {
						selectedIds.push(cList[i].id);
					};
					calendarSelId = selectedIds;
				}
			}
			
			if(arguments[1] === 'currentListChanged'){
				return amplify.publish('scheduleDataChanged', _data, calendarSelId);
			}

			//筛选出日历对应的颜色，为显示颜色做准备
			var calendarsColor = _data.calendarsColor =  _data.calendarsColor|| {};
			var calendarsList = cp.getCalendarList().calendarList;
			for (var i = 0, l = calendarsList.length; i < l; i++) {
				calendarsColor[calendarsList[i].id] = {
					'bgc': calendarsList[i].bgc,
					'sbgc': calendarsList[i].sbgc,
					'color': calendarsList[i].color
				};
			};

			//此处数据量比较大，以后优化接口后可以考虑改成$.each
			//遍历日历节点
			for (var i = 0, l = data.length; i < l; i++) {
				calendarData = data[i];

				//提取图片集合
				_data.pic = calendarData.piclist || {};

				//无数据判断
				if(!calendarData){
					continue;
				}

				//遍历日程节点
				for (var i1 = 0, l1 = calendarData.schlist.length; i1 < l1; i1++) {
					calendarData.schlist[i1].pic_url = calendarData.pic_url;
					_ex.insertData(calendarData.schlist[i1]);
				}
			};
			//无日程的数据需要生成空日期，否则会死循环，Gird对象会发出无日期的请求
			if(_data.needGetScheduleRang){
				var rang = _data.needGetScheduleRang;
				var dateTemp = '';
				while(rang.begin.getTime() <= rang.end.getTime()){
					dateTemp = c.formatDate(rang.begin);
					if(!scheduleList[dateTemp]){
						scheduleList[dateTemp] = {};
					}
					for(var cid in rang.calendars){
						if(!scheduleList[dateTemp][cid]){
							scheduleList[dateTemp][cid] = []
						}
					}
					rang.begin.setDate(rang.begin.getDate() + 1);
					i++;
				}
			}

			/**
			 * 有日历id间隔，此处排序无意义
			 */
			//日程排序
			// for(var day in scheduleList){
			// 	for(var cid in scheduleList[day]){
			// 		scheduleList[day][cid].sort(function (bSch, eSch) {
			// 			return bSch.date - eSch.date;
			// 		})
			// 	}
			// }

			amplify.publish('scheduleDataChanged', _data, cp.getCalendarListSelectedCld());
		},

		insertData: function (schedule) {
			scheduleList = _data.scheduleList;
			allSchedule = _data.allSchedule;
			allScheduleById = _data.allScheduleById

			//判断是否需要展开日程数据 duration > 0
			/*
			if(schedule.duration > 0){
				var start = new Date(schedule.start_time.replace(/-/g, '/'));
				var end = new Date(start.getTime() + schedule.duration * 1000);

				//需要把开始时间设置为0时0分0秒，否则 2014-06-01 19:00:00 => 2014-06-04 09:00:00这种情况，6月4号出不来
				start.setHours(0);
				start.setMinutes(0);
				start.setSeconds(0);

				//展开每一天
				for(var i = new Date(start.getTime() + 86400000); i <= end; i = new Date(i.getTime()+86400000)){
					var clonedSchedule = {};
					$.extend(clonedSchedule,schedule);
					clonedSchedule.start_time = c.formatDate(i) + " 09:00:00";
					clonedSchedule.allday_event = true;
					clonedSchedule.duration = 0;

					//增加克隆类型，缓存会放入当前cid对应的cloned日历内
					clonedSchedule.cloned = true;
					_ex.insertData(clonedSchedule);
				}

				//本身也需要转为克隆类型数据，否则会导致排序问题
				schedule.cloned = true;
			}
			*/
			//workaround
			//如果title中包含[]，服务器返回的json中会将之解析为数组
			if(typeof schedule.text === "string"){
				schedule.text =  schedule.text.replace(/\&amp\;/g, '\&');
			}else{
				schedule.text = JSON.stringify(schedule.text).replace(/\&amp\;/g, '\&');
			}
			if(schedule.description){
				schedule.description = schedule.description.replace(/\&amp\;/g, '\&');
			}

			day = schedule.start_time.split(' ')[0];
			cid = schedule.cloned ? schedule.cid + '_cloned' : schedule.cid;

			//增加primary，格式id+start_time，解决重复日程sid相同
			schedule.primary = [schedule.id, schedule.start_time, schedule.duration].join('_');

			//根据start_time创建时间戳用以排序
			schedule.date = new Date(schedule.start_time);

			//写入显示时间
			schedule.time = schedule.allday_event ? '全天' : schedule.start_time.slice(11, 16);

			//写入显示颜色
			var calendarsColor = _data.calendarsColor;
			schedule.bgc = calendarsColor[schedule.cid].bgc;
			schedule.sbgc = calendarsColor[schedule.cid].sbgc;
			schedule.color = calendarsColor[schedule.cid].color;

			//写入拥有的图片
			schedule.pics = _data.pic[schedule.uuid];

			//解码中文
			schedule.url && (schedule.url = schedule.url);

			//创建日期单位的对象
			scheduleList[day] || (scheduleList[day] = {});

			//创建日程单位单位的数组
			scheduleList[day][cid] || (scheduleList[day][cid] = []);

			//如果数据不存在，插入
			if(!allSchedule[schedule.primary]){
				scheduleList[day][cid].push(schedule);
			}
			//如果数据存在，比如编辑后同步，则覆盖数据
			else{
				for (var i2 = 0, l2 = scheduleList[day][cid].length; i2 < l2; i2++) {
					if(scheduleList[day][cid][i2].primary == schedule.primary){
						scheduleList[day][cid][i2] = schedule;
					}
				};
			}

			//日程hash
			allSchedule[schedule.primary] = schedule;
			allScheduleById[schedule.id] = schedule;
		}
	}

	amplify.subscribe('sceduleDataGeted', _ex.updateScheduleData);
	amplify.subscribe('currentListChanged', _ex.updateScheduleData);
	amplify.subscribe('scheduleDeleted', _ex.removeSchedule);
	amplify.subscribe('scheduleUpdated', _ex.updateSchedule);
	amplify.subscribe('scheduleCreated', _ex.addSchedule);
	amplify.subscribe('calendarDeleted', _ex.removeScheduleByCalendar);
	amplify.subscribe('scheduleDataNotEnough', _ex.getScheduleData);
});
