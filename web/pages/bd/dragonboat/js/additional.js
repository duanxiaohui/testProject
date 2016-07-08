/**
 * 端午
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-06-11 14:52:42
 */

(function () {
	var arg = {
		cocourl:'coco://365rili.com',
		url:''
	};
	$('.footer_down_btn').on('tap', function () {
		$.ajax({
            url: '/operation/share.do?shareId=127&channel=' + window.location.pathname.split('/')[4],
            success:function () {
            	app.open(arg.cocourl,app.getUa.ios,arg.callback);
            }
        });
	})
})();