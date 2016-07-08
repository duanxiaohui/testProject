/**
 * bootstrap for newopen
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-01 14:54:58
 */

require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	// 'rebuild/module/user', //用户模块
	'newOpen/module/calendarList', //日历列表模块
	'newOpen/module/calendarPanel', //日历模块
	'rebuild/module/notification' //通知提醒模块
	],function (c) {
		amplify.publish("initApp");
});