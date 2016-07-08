/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-03-03 19:26:44
 * @version $Id$
 */

(function () {
	var tipsType = query('tipstype');
	var tips ={
		init:function () {
			if(tipsType == 'no_schedule'){
				$('.tips_icon').addClass('no_schedule');
				$('tips_txt').html('您近期没有日程安排')
			}
			if(tipsType == "remove"){
				$('.tips_icon').removeClass('no_schedule');
				$('.tips_icon').addClass('tan');
				$('.tips_txt').html('您已被创建者移出日程，无法查看')
			}
			if(tipsType == "del"){
				$('.tips_icon').removeClass('no_schedule');
				$('.tips_icon').addClass('tan');
				$('.tips_txt').html('该日程已被删除，无法查看')
			}
			if(tipsType == "dels"){
				$('.tips_icon').removeClass('no_schedule');
				$('.tips_icon').addClass('tan');
				$('.tips_txt').html('已删除该日程')
			}
			if(tipsType == "exit"){
				$('.tips_icon').removeClass('no_schedule');
				$('.tips_icon').addClass('tan');
				$('.tips_txt').html('已退出日程')
			}
			if(app.getUa.weixin){
				$('.weixin_btns').removeClass('none')
			}
			wxProtocol.init(function (wx) {
				wx.hideOptionMenu();
			});
		}
		
	}
	tips.init();
})()