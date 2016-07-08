/*
**	main calendarListView
*/
define(function(require, exports, module) {
	var Calendar = require("../../../model/calendarObject");
	var dateInfo = require("../../../model/dateInfo");
	var $util	 = require("../../../common/util")
	
	var self = {};
	module.exports = self;

	self.container = $("#div_calendar_panel");
	
	self.headHtml = '<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head"><tbody>'+
						'<tr class="calendar_th"><th height="38">周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th class="weekend">周六</th><th class="weekend">周日</th></tr>'+
					'</tbody></table>';
	self.headHtmlSundayFirst = '<table cellspacing="0" cellpadding="0" width="100%" height="38" class="js_tb_head"><tbody>'+
								'<tr class="calendar_th"><th height="38"  class="weekend">周日</th><th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th class="weekend">周六</th></tr>'+
							  '</tbody></table>';

	
	self.tdHtml = '{rowStart}<td class="{monthClass}" date="{date}">'+
					'<dl class="day_box"><dt class="e_clear">'+
					'<span style="color:#{color}" title="{lunar}" class="lunar-text">{lunar}</span>'+
					'<span class="solar-text">{solar}</span>{todaytext}{vocationtext}{worktext}</dt>'+
					'<dd class="task_more"></dd></dl></td>{rowEnd}';
	function init(){
		renderMonth();
	}
	
	function renderMonth(){
		var cld = new Calendar(new Date());
		var startDate = cld.getCalendarFirstDate();

		var dateInfoAry = dateInfo.getMonthViewDateInfo(startDate);
		var rowsHtml = $util.format(self.tdHtml, dateInfoAry);
		self.container.html([self.headHtml, '<table cellspacing="0" cellpadding="0" width="100%" class="calendar_table">', rowsHtml, '</table>'].join(''));
		fixPanelHeight();
	}
	
	function fixPanelHeight(){
		var topHeight = $('#div_today').outerHeight();
		var theadHeight = self.container.find('table.js_tb_head').outerHeight();
		var mainTableHeight = $(document.documentElement).innerHeight() - topHeight - theadHeight;
		//if ($.browser.msie && parseInt($.browser.version) == 7) {
		//	mainTableHeight -= topHeight;
		//}
		self.container.find('table.calendar_table').height(mainTableHeight);
	}
	
	
	//exports method
	self.init = init;
});
