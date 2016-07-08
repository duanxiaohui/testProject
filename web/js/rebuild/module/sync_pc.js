define([
	"rebuild/base/common",
	"rebuild/base/calendar_Protocol"
	], function(c, cp){
	if(!c.isPCVersion()){
		return;
	}

	function syncScheduleWidget(){
		if(typeof js365 != "undefined"){
			//原代码
//			var cldIDs = cp.getCalendarListSelectedCld().join(",");
//			js365.runScriptDeskWnd('$("#div_calendar").webCalendar({"cldIDs":"'+ cldIDs +'"})');
//			js365.runScriptWnd(5, '$(".new_list").widgetList({"cldIDs":"'+ cldIDs +'"})');
			//edited by Xiaoqi
			var cldIDs = cp.getCalendarListSelectedCld().join(",");
			var calendarList = JSON.stringify(cp.getRealCalendarList());
			
			if(arguments.length == 0) {
				var scheduleListForList = JSON.stringify(cp.getScheduleDataForListWidget());
				var scheduleListForCalendar = JSON.stringify(cp.getScheduleDataForCalendarWidget());
				
				//这一步是为了处理一些看不见的特殊字符
				scheduleListForList = encodeURI(scheduleListForList); 
				scheduleListForCalendar = encodeURI(scheduleListForCalendar);
			
				js365.runScriptDeskWnd('$("#div_calendar").webCalendar({"cldIDs":"'+ cldIDs +'", "calendarList":' + calendarList + ', "scheduleList":"' + scheduleListForCalendar + '"});');
				js365.runScriptWnd(5, '$(".new_list").widgetList({"cldIDs":"'+ cldIDs +'", "calendarList":' + calendarList + ', "scheduleList":"' + scheduleListForList + '"});');
			} else {
				js365.runScriptDeskWnd('$("#div_calendar").webCalendar({"cldIDs":"'+ cldIDs +'", "calendarList":' + calendarList + ', "updateBySelf": true});');
				js365.runScriptWnd(5, '$(".new_list").widgetList({"cldIDs":"'+ cldIDs +'", "calendarList":' + calendarList + ', "updateBySelf": true});');
			}
		}
	}

	function syncTodoWidget(){
		if(typeof js365 != "undefined"){
			js365.runScriptWnd(5, '$(".todo_list_content").calendarPluginTodo();');
		}
	}

//	amplify.subscribe("currentListChanged", syncScheduleWidget, 11);	// removed by Xiaoqi
	amplify.subscribe("calendarAndScheduleChanged", syncScheduleWidget, 11);	// added by Xiaoqi
	amplify.subscribe("scheduleCreated", syncScheduleWidget, 11);
	amplify.subscribe("scheduleUpdated", syncScheduleWidget, 11);
	amplify.subscribe("scheduleDeleted", syncScheduleWidget, 11);

	amplify.subscribe("initApp", function(){
		js365.runScriptMainBackgroundWnd('Cmd.calendar("' + G.currUser.username + '");');
		syncTodoWidget();
		c.disableSelectAndRightClick();
	}, 11);
})