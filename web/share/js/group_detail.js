/**
 * group_detail
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2014-10-28 17:55:49
 * @version 1.0
 */

(function () {
	var self = {
		render: function () {
			self.getRawPubScheduleById(G.sid, G.uuid, G.bgu);
		},
		getRawPubScheduleById: function(sid, uuid, bgu){
	        $.ajax({
	            url: '/schedule/getRawScheduleByIdV2.do',
	            type: 'post',
	            dataType: 'json',
	            data: {
	                scheduleId: G.sid
	            },
	            success: function(result) {
                    $.ajax({
                        url: '/schedule/getpics.do',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            calendarID: G.cid,
                            scheduleUUID: uuid
                        },
                        success: function(data) {
                        	var pic_arr = [];
                        	if(data.pics){
	                            $.each(data.pics, function(_, o) {
	                                pic_arr.push(data.pic_url + o.pic);
	                            });
                        	}
                            console.log(result)
                            var beginTime = new Date(result.startTime);
                            var endTime = null;
                            if (result.duration > 0) {
                                endTime = new Date(beginTime.getTime() + result.duration * 1000);
                            }
                        	var pics = pic_arr.join(',')

                            var arText = [];
                            var rpType = result.repeatType;
                            var rpTimes = result.repeatFrequency;
                            var unit = {
                                1: '天',
                                7: '周',
                                29: '月',
                                31: '月',
                                354: '年',
                                365: '年',
                                5: '法定工作日'
                            }[rpType];
                            if (rpType != 5) {
                                var s = (rpTimes == 1 ? '每' : ('每隔' + rpTimes)) + unit;
                                if(rpType == 1){
                                    s += formatDate_hms(beginTime);
                                }
                                arText.push(s);
                            } else {
                                arText.push(unit);
                            }
                            if (rpType == 7) {
                                var arDaysT = {
                                    MON:'一',
                                    TUE:'二',
                                    WED:'三',
                                    THU:'四',
                                    FRI:'五',
                                    SAT:'六',
                                    SUN:'日'
                                }
                                var arDays = result.repeatDay.split(':').map(function(o) {
                                    return arDaysT[o];
                                });
                                if (arDays.length) {
                                    arText.push('周' + arDays.join('、'));
                                }
                            } else if (rpType == 31) {
                                var type = $form.rdo_repeat.filter(':checked').val()
                                if (type == 'month') {
                                    arText.push('每月第' + beginTime.getDate() + '天');
                                } else {
                                    arText.push('第' + Math.ceil(beginTime.getDate() / 7) + '个周' + '日一二三四五六'.split('')[d.getDay()]);
                                }
                            } else if (rpType == 365) {
                                arText.push('在' + (beginTime.getMonth() + 1) + '月' + beginTime.getDate() + '日');
                            } else if (rpType == 29) {
                                var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
                                arText.push(lunarInfo.cnDate);
                            } else if (rpType == 354) {
                                var lunarInfo = $form.liLunarPicker.lunarPicker('getLunarInfo');
                                arText.push(lunarInfo.cnMonth + lunarInfo.cnDate);
                            }
                            if (data.repeatStopTime) {
                                arText.push('直到' + formatDate_ymd(result.repeatStopTime) + '结束');
                            } else if (data.repeatCount) {
                                arText.push('重复' + result.repeatStopTime + '次后结束');
                            } else {
                                arText.push('永不结束');
                            }
                            var scheduleObj = {
                                cid: G.cid,
                                isSpecial: G.isSpecial,
                                calendarType: 'group',
                                calendarName: result.calendar.title,
                                calendarDesc: result.calendar.description,
                                scheduleTitle: result.title,
                                scheduleDesc: result.description,
                                creator: '',
                                bgu: G.bgu,
                                location: result.location,
                                dateline1: endTime ? (formatDate(beginTime) + ' 到 ' + formatDate(endTime)) : (formatDate(beginTime)),
                                dateline2: rpType == 0 ? '' : arText.join(),
                                lunar_time: '',
                                url: result.url,
                                pics: pics,
                                isMember: true,
                                isLogin: true
                            };
                            $('body').scrollTop(0);
					        $('.ss_main').removeClass('none');
					        $('.ss_main').css({
					            'position': 'relative',
					            'z-index': 5
					        });
                            scheduleShare.render(scheduleObj, $('.ss_main'));

                            $('.personal_btn').html('<div class="btn_inline_box"><span class="btn_bg"></span><span class="btn_txt">到时提醒我</span></div>').addClass('public_btn');
                        }
                    });
	                
	            }
	        });
	    }
	};
    function formatDate (d) {
        var h = d.getHours();
            h = h < 10 ? '0' + h : h;
        var m = d.getMinutes();
            m = m < 10 ? '0' + m : m;
        var s = d.getSeconds();
            s = s < 10 ? '0' + s : s;
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + h + ':' + m + ':' + s;
    }
    function formatDate_ymd (d) {
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    }
    function formatDate_hms (d) {
        var h = d.getHours();
            h = h < 10 ? '0' + h : h;
        var m = d.getMinutes();
            m = m < 10 ? '0' + m : m;
        var s = d.getSeconds();
            s = s < 10 ? '0' + s : s;
        return h + ':' + m + ':' + s;
    }
	window.group_detail = self;
})();