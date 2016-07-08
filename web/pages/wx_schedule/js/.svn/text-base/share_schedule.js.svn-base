/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-03-07 18:04:13
 * @version $Id$
 */

(function () {
	var share_schedule = {
		init:function () {
			var schedule_title = query('title', decodeURIComponent(location.href)),
				schedule_dec = query('description', decodeURIComponent(location.href)),
				schedule_time = query('startTime', decodeURIComponent(location.href));

			$('.schedule_txt').html(schedule_title);
			if(schedule_dec){
				$('.schedule_dec').html(schedule_dec);
				$('.schedule_dec').css({
					'border':0
				})
			}else{
				$('.schedule_txt').css({
					'border':0
				})
			}
			var startTimeDate = share_schedule.parseDate(new Date(+schedule_time))
			$('.schedule_time').html(startTimeDate);
			$('.schedule_remid_repeat').css({
				"margin-top":10+"px",
				"borderTop":"1px solid #d5d5d5"
			});
			$('.schedule_tips p').on('tap',function () {
				app.open(
					{
						ios:'coco://365rili.com/add',
						android:'coco://365rili.com/schedule'
					},app.getUa.ios
				)
			})
		},
		parseDate:function(date) {
			return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');;
		}
	}
	share_schedule.init();
})()