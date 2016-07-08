/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-03-04 09:56:56
 * @version $Id$
 */
(function () {
	var createSchedule = {
		init:function () {
			var h = $(window).height(), bodyH = $('body').height();
			if((bodyH + 90) > h){
				$('body').css({
					"padding-bottom":90 + "px"
				})
			}
			createSchedule.bindEvent();
			wxProtocol.init(function (wx) {
				wx.hideOptionMenu();
			});
		},
		bindEvent:function () {
			$('body').on('tap','.down_btn a',function () {
				app.open(
					{
						ios:'coco://365rili.com/add',
						android:'coco://365rili.com/schedule'
					},app.getUa.ios
				)
			})
		}
	}
	createSchedule.init();
})()