/**
 * 个人日历启动
 * @authors huangyi
 * @date    2014-05-26
 * @version 1.0
 */ 
define([
	'rebuild/base/common'
], function(c){
	//private date
	var _data = window.d = {};

	//private method
	var _ex = {
		buildData: function () {
			_data.firstDay = $.cookie('calendar_panel_first') || '';
			_data.normalPanel = (G.currUser ? $.cookie('normalPanel' + G.currUser.id) : $.cookie('normalPanel')) || 'month';
		},

		saveNormalPanel: function () {
			var panelName =  arguments[0];
			_data.normalPanel = panelName;
			G.currUser ? $.cookie('normalPanel' + G.currUser.id, panelName, {
				expires: 365,
				path: '/'
			}) : $.cookie('normalPanel', panelName, {
				expires: 365,
				path: '/'
			})
		},

		updateCalendarList: function () {
			var data = arguments[0];
			_data.calendarList = data;
		},

		updateCurrentList: function () {
			_data.selectedCld = arguments[0];
		},

		updateScheduleData: function () {
			_data.scheduleList = arguments[0]['scheduleList'];
			_data.allSchedule = arguments[0]['allSchedule'];
			_data.allScheduleById = arguments[0]['allScheduleById'];
			_data.getedCalendars = arguments[0]['getedCalendars'];
		},

		//added by Xiaoqi 保存该用户日历列表信息
		updateAllCalendarListData: function() {
			_data.allCalendarList = arguments[0];	
		},

		updateDateInfo: function(){
			_data.dateInfo = arguments[0];
		},

		setCurrentCalendarPanel: function () {
			_data.currentPanel = arguments[0];
		},

		updateDateRange: function  () {
			var beginDate = arguments[1].from;
			var endDate = arguments[1].to;
			
			//检查默认数据
			if(!_data.dateRange){
				_data.dateRange = {from: beginDate, to: endDate};
				_data.currentDateRange = {from: beginDate, to: endDate};	//added by Xiaoqi
				return 
			}

			//判断缓存开始时间是否小于本次请求开始时间
			if(new Date(beginDate.replace(/-/g, "/")) < new Date(_data.dateRange.from.replace(/-/g, "/"))){
				_data.dateRange.from = beginDate;
			}

			//判断缓存结束时间是否大于本次请求结束时间
			if(new Date(endDate.replace(/-/g, "/")) > new Date(_data.dateRange.to.replace(/-/g, "/"))){
				_data.dateRange.to = endDate;
			}
		},
		updateTopicData: function () {
			_data.topic = arguments[0];
		}
	};

	//public Method
	var ex = {
		getNormalPanel: function () {
			return _data.normalPanel;
		},
		getCalendarList: function () {
			try{
				return _data.calendarList
			}catch(e){
				return false;
			}
		},
		getCalendarListSelectedCld: function () {
			return _data.calendarList.selectedCld == -1 ? _data.calendarList.selectedClds : [_data.calendarList.selectedCld]
		},
		///////////////////// added by Xiaoqi /////////////////////
		// 获取集合日历列表
		getSelectedCalIds: function() {
			return _data.calendarList.selectedClds;	
		},
		// 获取用户当前所关注的日历列表
		getRealCalendarList: function() {
			return _data.calendarList.calendarList;
		},
		// 获取要在list widget显示的日程
		getScheduleDataForListWidget: function() {
			var schList = _data.scheduleList;
			var selIdList = ex.getCalendarListSelectedCld();
			var curSchList = [];
			var daySchList;
			var calSchList;
			var selId;
			var today = new Date();
			for(var i = 0; i < 7; i++) {
				var date = new Date(today.getTime() + 86400 * 1000 * i);
				daySchList = schList[c.formatDate(date)];
				if(daySchList && selIdList) {
					for(var j = 0, l = selIdList.length; j < l; j++) {
						selId = selIdList[j];
						calSchList = daySchList[selId];
						if(calSchList && calSchList.length > 0) {
							for(var k = 0, lc = calSchList.length; k < lc; k++) {
								curSchList.push(calSchList[k]);
							}
						}
					}
				}
			}
			return curSchList;
		},
		// 获取要在calendar widget显示的日程
		getScheduleDataForCalendarWidget: function() {
			var dateFrom = new Date(_data.currentDateRange['from'].replace(/-/g, "/"));
			var schList = _data.scheduleList;
			var selIdList = ex.getCalendarListSelectedCld();
			var curSchList = [];
			var daySchList;
			var calSchList;
			var selId;
			for(var i = 0; i < 42; i++) {
				var date = new Date(dateFrom.getTime() + 86400 * 1000 * i);
				daySchList = schList[c.formatDate(date)];
				if(daySchList && selIdList) {
					for(var j = 0, l = selIdList.length; j < l; j++) {
						selId = selIdList[j];
						calSchList = daySchList[selId];
						if(calSchList && calSchList.length > 0) {
							for(var k = 0, lc = calSchList.length; k < lc; k++) {
								curSchList.push(calSchList[k]);
							}
						}
					}
				}
			}
			return curSchList;
		},
		// 获取当月视图显示日期范围
		getCurrentDateRange: function() {
			return _data.currentDateRange;
		},
		// 判断是否初始化过数据
		getInitedStatus: function() {
			if(!_data.isInited) {
				_data.isInited = true;
				return false;
			}
			return true;
		},
		// 获取用户所有日历列表信息
		getAllCalendarList: function() {
			return _data.allCalendarList;
		},
		///////////////////////////////////////////
		getUsedColors: function () {
			try{
				return _data.calendarList.usedColors
			}catch(e){
				return false;
			}
		},

		getCurrentPanel: function () {
			try{
				return _data.currentPanel
			}catch(e){
				return false;
			}
		},

		getCalendarById: function (id) {
			var List = _data.calendarList.calendarList;
			for (var i = 0, l = List.length; i < l; i++) {
				if(List[i].id == id) return List[i];
			};
			return null;
		},

		getScheduleByPrimary: function (primary) {
			var List = _data.allSchedule;
			return List[primary];
		},
		
		getScheduleList: function () {
			return _data.scheduleList || null;
		},
		
		getAllSchedule: function () {
			return _data.allSchedule || null;
		},
		
		getAllScheduleById: function () {
			return _data.allScheduleById || null;
		},
		
		getScheduleById: function (id) {
			return _data.allScheduleById[id] || null;
		},

		getPublic: function(cid){
			var cldList = _data.calendarList.calendarList;
			for (var o, i = 0, l = cldList.length; i < l; i++) {
				o = cldList[i];
				if (o.id == cid) { return o.is_public; }
			}
			return null;
		},

		getAllCalendarNames: function(noReadOnly){
			var rslt = [];
			var cldList = _data.calendarList.calendarList;
			var permissionMap = _data.calendarList.oPermissions;
			if (cldList) {
				$.each(cldList, function(i, o){
					if (!noReadOnly || permissionMap[o.id] != 1) {
						//rslt[o.title] = o.id;
						rslt.push({
							id: o.id,
							name: o.title
						});
					}
				});
			}
			return rslt;
		},

		getDateRange: function(){
			return _data.dateRange
		},

		getFirstDay: function () {
			return _data.firstDay;
		},

		isCalendarGeted: function (cid) {
			return _data.getedCalendars[cid] ? true : false;
		},

		getTopic: function () {
			return _data.topic;
		},

		getTopicByScheduleId: function () {
			var sid = arguments[0];
			if(!_data.topic){
				return null;
			}
			for (var i = 0; i < _data.topic.length; i++) {
				if(_data.topic[i].scheduleId == sid){
					return _data.topic[i]
				}
			};
			return null;
		},

		getTopicById: function () {
			var id = arguments[0];
			for (var i = 0; i < _data.topic.length; i++) {
				if(_data.topic[i].id == id){
					return _data.topic[i]
				}
			};
			return null;
		}
	}

	//sub message
	amplify.subscribe('calendarListDataUpdated', _ex.updateCalendarList);
	amplify.subscribe('currentListChanged', _ex.updateCurrentList);
	amplify.subscribe('scheduleDataChanged', _ex.updateScheduleData);
	amplify.subscribe('calendarPanelChanged', _ex.setCurrentCalendarPanel);
	amplify.subscribe('dateUpdated', _ex.updateDateInfo);
	amplify.subscribe('initApp', _ex.buildData);
	amplify.subscribe('calendarPanelChanged', _ex.saveNormalPanel);
	amplify.subscribe('sceduleDataGeted', _ex.updateDateRange);
	amplify.subscribe('updateTopicData', _ex.updateTopicData);
//	amplify.subscribe('currentScheduleUpdated', _ex.updateCurrentScheduleData); //added by Xiaoqi
	amplify.subscribe('allCalendarListUpdated', _ex.updateAllCalendarListData); //added by Xiaoqi
	//pub message
	return ex;
});