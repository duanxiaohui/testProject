/**
 * bootstrap for newOpen list
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-01 16:51:38
 */

require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	'newOpen/module/calendarList', //日历列表模块
	'newOpen/module/calendarPanel', //日历模块
	],function (c, cp, scheduleCreator) {

		amplify.publish("initApp");
});