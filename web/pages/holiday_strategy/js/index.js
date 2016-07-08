/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-02-17 17:49:02
 * @version $Id$
 */
(function () {
    var s = new Date('2016/04/27');
    s.setHours(10,0,0,0);
    var dateNum = s.getTime();
    
	var _data = {
		holidayJson:{
			schedule:{
                "startTime":dateNum,
                "allDayEvent": false,
                "title" : '五一我要休假！现在去跟老板请假咯！5月3号~5月6号请4天，就可以拼假成9天超长假期啦~',
                "duration":0,
                "repeatType":1,
                "repeatCount":3
            },
            "alarms":[0]
		}
	}
	var strategy = {
		init:function () {
			strategy.bindEvent();
            strategy.shareFn();
            strategy.setFn();
		},
		openUrl: openUrl,
		bindEvent:function () {
			$('.remind_btn_2').on('tap',function () {
                if(app.getUa.weixin || app.getUa.qq || app.getUa.weibo){
                    app.open('coco://365rili.com',app.getUa.ios)
                }
					app.call({
                        action: 'addSchedule',
                        params: [
                            {
                                name: 'scheduleJSON',
                                value: JSON.stringify(_data.holidayJson)
                            }
                            ],
                            callBack: function (data) {
                                if(data.indexOf('-') > 0){
                                    plug.alert('','日程添加成功','',true);
                                    $(".remind_btn_2").unbind( "tap" );
                                    $(".remind_btn_2").css({
                                            'background':'#ccc'
                                        });
                                }else{
                                    plug.alert('','服务器繁忙,请稍后重试','',true)
                                }

                            }
                    })
			});

			$('body').on('tap', '[data-url]',function () {
				strategy.openUrl.call(this);
			})
		},
        shareFn:function () {
            var shareData ={
                    "title": '五一要乐啵，今天不卧客',
                    "content": '聪明的人已经在愉快的玩耍了',
                    "link":window.location.href,
                    "image": 'http://www.365rili.com/pages/holiday_strategy/images/share_img.jpg'
                }
            if(app.getUa.coco){
                app.call({
                    action: 'setShareContent',
                    params: [
                        {
                            name: 'shareString',
                            value: JSON.stringify(shareData)
                        }
                        ],
                    callBack: null
                })
            }
            wxProtocol.init(function (wx, link) {
                wx.onMenuShareAppMessage({
                    title: '五一要乐啵，今天不卧客',
                    desc: '聪明的人已经在愉快的玩耍了',
                    imgUrl: 'http://www.365rili.com/pages/holiday_strategy/images/share_img.jpg'
                });
                wx.onMenuShareTimeline({
                    title: '五一要乐啵，今天不卧客',
                    imgUrl: 'http://www.365rili.com/pages/holiday_strategy/images/share_img.jpg'
                });
            });
        },
        setFn:function () {
            var date = new Date();
            var d0429 = new Date('2016/04/29');
                d0429.setHours(10,0,0,0);
            if(date >= d0429){
                $('.remind_btn_2').hide().remove();
            }
            if(_data.falg){
                $("remind_btn_2").unbind( "tap" );
                $("remind_btn_2").css({
                    'background':'#ccc'
                });
            }
        }
	}
	strategy.init();
})()
