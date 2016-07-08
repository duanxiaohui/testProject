/*
**	calendarCollectView 我的收藏
*/
define(function(require, exports, module) {
	var $listView  = require("./collectListView");
	var $panelView = require("./collectPanelView");
	var $calendar  = require("../../server/calendar");
	var $schedule  = require("../../server/schedule");
	var $util      = require("../../common/util");
	var $scheduleData  = require("../../model/scheduleData");
	
	var self = {};
	module.exports = self;
	
	function init(container){
		self.container = container;
		$listView.init(onListClicked);
		$panelView.init(loadScheduleData);
		//var panelDiv = $("<div class='collect_panel_view'></div>").appendTo(".calendar_collect_panel");
		//self.monthView = new MonthView(panelDiv, loadScheduleData, onUnsubscribed);
		
		refresh();
	}
	
	function refresh(){
		$calendar.getCalendarListWithExtend(function(data){
			self.cldListData = data;
			var list = [];
			self.themeMap = {};
			self.calendarMap = {};
			$.each(data.calendars, function(i, o){
				list.push(o.calendar);
				self.themeMap[o.calendar.id] = o.extend;
				self.calendarMap[o.calendar.id] = o.calendar;
			});
			//根据sequence排序
			list.sort(function(a, b){
				var a_seq = parseInt(a.sequence);
				var b_seq = parseInt(b.sequence);
				return a_seq - b_seq;
			});
			//setMainCalendarId(list);
			self.cid = getSelectedCld(list);
			$listView.render(list, self.cid);
			$panelView.render(self.calendarMap[self.cid], self.themeMap[self.cid]);
			//self.monthView.render(self.calendarMap[self.cid], self.themeMap[self.cid]);
			setSelectedCld();
		});
	}
	
	function onUnsubscribed(){
		$listView.removeCurrent();
		
	}
	
	function onListClicked(cid){
		self.cid = cid;
		$panelView.render(self.calendarMap[self.cid], self.themeMap[self.cid]);
		setSelectedCld();
	}

	function loadScheduleData(fromDate, toDate, render){
		$scheduleData.loadScheduleData(fromDate, toDate, self.cid, render);
	}
	
	function getSelectedCld(data){
		//G.currUser.id
		//TODO
		var cid = $util.cookie('selectedCld' + '123456');
		if(cid == null){
			data[0].selected = 'on';
			return data[0].id;	
		}else{
			for(var i in data){
				if(data[i].id == cid){
					data[i].selected = 'on';
				}
			}
			return cid;			
		}
	}
	
	function setSelectedCld(){
		//G.currUser.id
		$util.cookie('selectedCld' + '123456', self.cid, {
			expires: 365
		});
	}
	
	function setMainCalendarId(data){
		self.monthView.mainCalendarId = data[0].id;
	}
	
	//exports method
	self.init = init;
	self.refresh = refresh;
});

