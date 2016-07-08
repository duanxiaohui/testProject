angular.module('365_calendar', ['ngTouch']).
	controller('CalendarShareController', function($scope, $http, ScheduleModel){
		var currentDate = new Date();
		$scope.ScheduleModel = ScheduleModel;
		
		ScheduleModel.getMutableMonthRows(currentDate);
		ScheduleModel.setPublicScheduleData4Share(G.cid);
		$scope.theme = getTheme(G.theme);
		$scope.calendarTitle = G.title;
		var monthStr = currentDate.getMonth() + 1;
		if(monthStr < 10) monthStr = "0" + monthStr;
		$scope.yearMonthStr = currentDate.getFullYear() + "-" + monthStr;
		$scope.selectDateItem = function(item){
			//document.body.scrollTop=$(".area_top").outerHeight();			
			ScheduleModel.selectDateItem(item);
		}		
		
		function getTheme(skinJsonStr){
			var theme = {};
			var skinJson = JSON.parse(skinJsonStr);
			$("body style").html("@font-face{font-family:'custom_font';src:url('"+skinJson.tf+"');}");
			var deviceWidth = $(window).width();
			var deviceHeight = Math.floor(816 * deviceWidth / 480);
			deviceHeight = deviceHeight > 816 ? 816 : deviceHeight;
			theme.bgu = {
				"background-image":"url(" + skinJson.bgu + ")",
				"height":deviceHeight + "px"
			}
			//日历名：字体属性 ——KEY_NAME_TEXT = "nt";
			theme.nt = renderFont(skinJson.nt);	
			//年月：字体属性 ——KEY_YEAR_AND_MONTH_TEXT = "ynm";
			theme.ynm = renderFont(skinJson.ynm);
			//周（工作日）：字体属性 ——KEY_WEEK_WEEKDAY_TEXT = "wdt";
			theme.wdt = renderFont(skinJson.wdt, true);
			theme.wdt.background = hex2rgba(skinJson.wdb);
			//周（周末）：字体属性 ——KEY_WEEK_WEEKAND_TEXT = "wkt";
			theme.wkt = renderFont(skinJson.wkt, true);
			theme.wkt.background = hex2rgba(skinJson.wkb);
			//日期（工作日）：字体属性 ——KEY_DATE_WEEKDAY_TEXT = "ddt";
			theme.ddt = renderFont(skinJson.ddt);
			theme.ddb = {
				background:hex2rgba(skinJson.ddb)
			}
			//日期（周末）：字体属性 ——KEY_DATE_WEEKAND_TEXT = "dkt";
			theme.dkt = renderFont(skinJson.dkt);
			theme.dkb = {
				background:hex2rgba(skinJson.dkb)
			}
			theme.l = {
				"border-color": hex2rgba(skinJson.l),
				background:hex2rgba(skinJson.ddb)
			};
			theme.mu = skinJson.mu;
			theme.dsb = {
				"background-color":hex2rgba(skinJson.dsb)
			}
			theme.scheduleStyle = renderFont(skinJson.sct);
			theme.scheduleStyle.background = hex2rgba(skinJson.sb);
			return theme;
		}
		
		function hex2rgba(hex){
			var r = parseInt(hex.substr(2, 2), 16); 
			var g = parseInt(hex.substr(4, 2), 16); 
			var b = parseInt(hex.substr(6, 2), 16); 
			var alpha = parseInt(hex.substr(0, 2), 16);
			return ["rgba","(",r,",",g,",",b,",",alpha/255,")"].join('');
		}
		
		
		function renderFont(fontObj, noFontSize){
			var rs = {};
			rs.color = hex2rgba(fontObj.cl);
			if(fontObj.tf && fontObj.tf != 0){
				rs["font-family"] = "custom_font";
			}else{
				rs["font-family"] = "";
			}
			if(fontObj.r > 0){
				var shadow_style = fontObj.dx + "px " + fontObj.dy + "px " + "0 " + hex2rgba(fontObj.sc);
				rs["text-shadow"] = shadow_style;
			}else{
				rs["text-shadow"] = "";
			}
			if(!noFontSize){
				rs["font-size"] = fontObj.sz + "px";				
			}
			return rs;
		}
})
.service("CalendarModel", function(){
	
});