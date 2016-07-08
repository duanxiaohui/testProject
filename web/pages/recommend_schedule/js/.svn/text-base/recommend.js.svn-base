/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-09-23 16:23:40
 * @version $Id$
 */
(function(){
    var queryJson, str;
    $.query = function(name){
        if (!queryJson) {
            queryJson = {};
            if (str = location.search.slice(1) + '&' + location.hash.slice(1)) {
                $.each(str.split('&'), function(i, s, key, value){
                    s = s.split('='), key = s[0], value = s[1];
                    if (key in queryJson) {
                        if ($.isArray(queryJson[key])) {
                            queryJson[key].push(value);
                        } else {
                            queryJson[key] = [queryJson[key], value];
                        }
                    } else {
                        queryJson[key] = value;
                    }
                });
            }
        }
        return queryJson[name];
    };
})();
(function () {
	window.tips = {
		init:function (startTime) {
			var title = $('.recommend_schedule_top').find('h2').text();
			var desc = $('.recommend_schedule_top').find('h4').text()
			var scheduleJSON ={
                schedule:{
                    "startTime":startTime,
                    "allDayEvent": true,
                    "title" : title,
                    "description":desc
                },
                "alarms":[0]
            }
            var id = $.query('id');
            var origin = window.location.href.split('/');
                origin = origin[origin.length-1];
            $(".add_mySchedule").on('tap',function () {
                $.ajax({
                    url:'http://www.365rili.com/pages/recommend_schedule/ajax.html?origin='+origin,
                    complete:function () {
                        app.call({
                            action: 'addSchedule',
                            params: [
                                {
                                    name: 'scheduleJSON',
                                    value: JSON.stringify(scheduleJSON)
                                },
                                {
                                    name: 'id',
                                    value: id
                                }
                                ],
                                callBack: function (data) {
                                    if(data.indexOf('-') > 0){
                                        plug.alert('','日程添加成功')
                                    }else{
                                        plug.alert('','服务器繁忙,请稍后重试')
                                    }
                                }
                        })
                    }
                })
            })
		}
	}
	
})()