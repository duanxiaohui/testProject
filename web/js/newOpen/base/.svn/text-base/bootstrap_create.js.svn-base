/**
 * bootstrap for newOpen create
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-01 16:06:08
 */
require.config({
	baseUrl: '/js/'
})

require([
	'rebuild/base/common', //公共模块
	'rebuild/base/calendar_Protocol', //公共数据
	'newOpen/widget/scheduleCreator_v2',
	'rebuild/base/solarAndLunar',
	'newOpen/module/calendarList' //日历列表模块
	],function (c, cp, scheduleCreator) {
		amplify.subscribe('calendarListReady', function () {
			var d = new Date();
			scheduleCreator.showForm(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(), undefined);
		})

		amplify.publish("initApp");
});