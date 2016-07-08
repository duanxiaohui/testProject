require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	'rebuild/module/user', //用户模块
	'rebuild/module/calendarList', //日历列表模块
	'rebuild/module/calendarPanel', //日历模块
	'rebuild/module/notification', //通知提醒模块
	'rebuild/module/sync_pc',
	],function (c) {
		amplify.publish("initApp");
});