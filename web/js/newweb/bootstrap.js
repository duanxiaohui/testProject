function browserCheck(){
	if ($.browser.msie) {
		var ver = parseInt($.browser.version);
		if (ver < 8) {
			var text = ver < 7 ? '对不起，您使用的网页浏览器版本非常古老，<br/>不仅无法使用365日历的部分功能，而且还会错过其它网站的精彩体验，<br/>强烈建议您升级您的浏览器！<br/><a href="http://www.ie6countdown.com/" target="_blank" style="color:blue">看看正在消失的IE6浏览器</a>' : '尊敬的365日历用户，您想体验更好用的、更快的、更酷的365日历产品吗？请升级您的网页浏览器！'
			$.confirm(text, {
				width: 500,
				buttons: [{
					text: '马上升级',
					click: function(){
						open('http://www.microsoft.com/zh-cn/download/ie.aspx?q=internet+explorer');
						$(this).dialog("close");
					}
				}, {
					text: '下次再说',
					click: function(){
						$(this).dialog("close");
					}
				}]
			});
		}
	}
}

if (G.isPC = isPCVersion()) {
	$(document.documentElement).removeClass('web').addClass('pc');
	js365.runScriptDeskWnd('$("#div_calendar").webCalendar()');
	js365.runScriptMainBackgroundWnd('Cmd.calendar("' + G.currUser.username + '");');
}
$(function($){
	G.isPC || showLoginInfo();
	$("#sp_user_info").html(getGreetingText(G.currDate));
	G.cldList = $('#div_calendar_list');
	G.cldPanel = $('#div_calendar_panel');
	$.loading();
	G.cldList.calendarList();
	G.cldPanel.calendarPanel();
	G.isPC || browserCheck();
	G.isPC && disableSelectAndRightClick();

	//set notification
	notificationManager.init();
});
