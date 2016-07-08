require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	'rebuild/tw_admin/calendarList',
	'rebuild/module/calendarPanel',
	'rebuild/tw_admin/user'
	],function (c) {
		amplify.publish("initApp");
});