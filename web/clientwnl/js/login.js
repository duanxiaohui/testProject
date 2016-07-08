var clientwnlIsLogin = false;

$(document).ready(function()
{
	calendarHandler.init();
	makeCal.init();
	var currentDate = new Date();
	makeCal.pareData(currentDate);
	makeCal.showCal();
	makeCal.makeHuangli(currentDate);
	clientwnlIsLogin = false;
});
