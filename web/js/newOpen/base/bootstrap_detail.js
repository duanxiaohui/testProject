/**
 * bootstrap for newOpen detail
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-02 17:15:47
 */

require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	'rebuild/module/schedule', //日程
	'newOpen/module/calendarList' //日历列表模块
	],function (c, cp) {
		amplify.publish("initApp");
});