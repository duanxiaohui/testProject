/**
 * 帮助
 * @authors 张明臣 (vest0804@gmail.com)
 * @date    2015-08-20 15:45:28
 */
(function () {
	var help ={
		init:function(){
			$('body').on('tap', '[data-url]', help.openUrl);
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
	}
	help.init();
})()
