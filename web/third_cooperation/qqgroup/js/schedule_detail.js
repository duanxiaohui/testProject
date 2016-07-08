require.config({
    baseUrl: '/third_cooperation/base_calendar/js/app/',
    paths: {
        "amplify": "/js/lib/amplify.core.min",
        "zepto": "/js/lib/zepto.min",
        /* ----- common ----- */
        "util": "common/util",
        "schedule": "../../../qqgroup/js/schedule",
        "lunar": "common/solarAndLunar",//转换农历
        /* -----Model----- */
        "data": "model/data",//2015节假日等数据
        /* -----View----- */
        "monthView": "view/monthView",//月视图
        "weekView": "view/weekView",//周视图
        /* -----contorller-----*/
        "monthInfo": "contorller/monthInfo",//处理月视图需要的数据
        "weekInfo": "contorller/weekInfo",//处理周视图需要的数据
    },
    shim: {
        "zepto": {
            exports : "$"
        }
    }
});
require(['zepto', 'util', 'schedule'], function ($, util, sch){
	var sid = util.query('sid');
	var uuid = util.query('uuid');
	window.cid = util.query('cid');
	var access_token = util.query('access_token');
	var openid = util.query('openid');
	var group_openid = util.query('group_openid');
	var needBtn = false;
	if(util.query('action')){
		needBtn = true;
		$.ajax({
			url:'/mobile-qqun/getQunInfo.do',
			data: {
				access_token: access_token,
				openid: openid,
				group_openid: group_openid
			},
			dataType: 'json',
			success: function (data) {
				cid = data.cid;
				getScheduleData();
			}
		});
	}
	else{
		getScheduleData();
	}
	function getScheduleData () {
		$.ajax({
			url: '/schedule/getQQSchedule.do',
			data: {
				cid: cid,
				uuid: uuid,
				t: +new Date
			},
			success: function (data) {
				if(data.state == 'error'){
					$('.scheduleMain').html('\
						<div class="tipForNoSchedule">\
							<div class="tipForNoScheduleTop">\
						        <img src="/third_cooperation/qqgroup/images/icon_deleted.png" width="69" height="69" alt="">\
					            <p>该日程已被删除</p>\
						        <div class="btn">\
									<div>\
						    			<a class="blueBtn" href="http://qq.365rili.com/third_cooperation/qqgroup/create_schedule.html?cid='+window.cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid+'" type="submit">有新的日程安排？创建群日程</a>\
						    		</div>\
								</div>\
							</div>\
					        <div class="btn btn1">\
						        <span>您还可以</span>\
								<div>\
					    			<a href="http://qq.365rili.com/third_cooperation/qqgroup/schedule_list.html?cid='+window.cid+'" type="submit">查看全部群日程</a>\
					    			<div class="line"></div>\
					    		</div>\
					    		<div class="returnToGrid">\
					    			<a href="http://qq.365rili.com/mobile-qqun/main.do?access_token='+access_token+'&group_openid='+group_openid+'&openid='+openid+'" type="submit">查看群日历</a>\
					    		</div>\
							</div>\
				        </div>');

					if(!access_token){
						$('.returnToGrid').remove();
					}
					return;
				}
				data.schedule.sid = sid;
				sch.initSchedule(data, needBtn);
			}
		})
	}
});