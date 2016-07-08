/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-04-15 16:09:27
 * @version $Id$
 */

(function () {
	var name = query('name');
	var holidayArray = ['20160101','20160207','20160214','20160222','20160308','20160314','20160401','20160404','20160501','20160508','20160601','20160609','20160619','20160701','20160801','20160809','20160910','20160915','20161001','20161031','20161124','20161225']
	var holiday = {
		init:function () {
			if(name){
				$('body').scrollTop($('[data-name="'+name+'"]').position().top)
			}else{
				var today = new Date();
				todayY = today.getFullYear().toString();
				todayM = today.getMonth() + 1;
				todayD = today.getDate();
				if(todayM < 10){
					todayM = '0' + todayM
				}
				if(todayD < 10){
					todayD = '0' + todayD
				}

				var holidayNum = todayY + todayM + todayD;
				var sub;
				var diff = -1;
				var temp;
				for(var i = holidayArray.length; i>0; i--){
					if(holidayArray[i] - (+holidayNum) >= 0){
						temp = holidayArray[i] - (+holidayNum);
						if(diff == -1){
							diff = temp;
						}
						if(temp < diff){
							diff = temp;
							sub = i
						}
					}
				}
				setTimeout(function () {
					$('body').scrollTop($('dl').eq(sub).position().top)
				},500)
			}
			holiday.shareFn();
		},
		shareFn:function () {
			var url = window.location.href;
			var title,desc,title1;
			if(url.indexOf('jieqi')> -1){
				title = '二十四节气';
				title1 = '2016年二十四节气查询';
				desc = '2016年二十四节气查询';
			}else{
				title = '节日安排';
				title1 = '2016年节假日安排';
				desc = '2016年节假日安排';
			}
			wxProtocol.init(function (wx, link) {
				wx.onMenuShareAppMessage({
			        title: title,
			        desc: desc,
					imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
			    });
			    wx.onMenuShareTimeline({
			        title:title1,
			        desx:desc,
					imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
			    });
			});
		}
	}
	holiday.init();
})()