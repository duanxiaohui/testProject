/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-10-14 12:15:23
 * @version $Id$
 */
(function () {
	//location页面
	var location = {
		init: function () {
			var h = $(window).height();
			$(".location").height(h-90);
			$('body').on('tap', '.location_btn', location.openUrl);
		},
		openUrl: function () {
			var url = $(this).data('url');
			app.call({
				action: 'openUrlWithNewActivity',
				params: [
					{
						name: 'url',
						value: url
					},
					{
						name: 'isInnerWebview',
						value: true
					}
				],
				callBack: null
			})
		}
	};
	location.init();
})()