
(function () {
	var _data = {
		n:true,
		p:true,
		allowPre:true,
		allowNext:true
	};
	window.data = _data;
	var tmpl='\
				<li data-day={$date}>{$dateP}\
				{$schedule}</li>';
	var scheduleTmpl = '<dl data-sid="{$id}" data-uuid="{$uuid}" data-cid="{$cid}">\
					<dt class="e_clear">\
						<span class="end_time">{$end_time}</span>\
						<span class="start_time">{$start_time}</span>\
						<div class="time_icon {$allday}">{$dayNum}</div>\
					</dt>\
					<dd>\
						<p class="schedule_txt cld-ui-nowrap">{$text}</p>\
						<div class="invitation_div">\
							<ul class="e_clear">\
								{$invitationList}\
								{$invitationMore}\
							</ul>\
						</div>\
						<div class="source_alarm_invitation_box e_clear">\
							<div class="invitation_user">{$extend}</div>\
							<div class="source_div">{$scheduleType}</div>\
							<div class="alarm_div {$exp}">{$alarmSize}</div>\
						</div>\
					</dd>\
				</dl>';
	var tokenTmpl = '\
		<div class="token_div">\
			<div class="token_icon"></div>\
			<div class="token_txt">这不是日程创建者分享的，您无权查看<br/>但是，我们帮您想到了解决办法</div>\
			<div class="token_pic"></div>\
			<a href="javascript:;" class="token_btn">下载365日历</a>\
			<div class="token_txt1">自己创建日程，不受他人摆布</div>\
		</div>\
	';
	// var loadingTmpl = '\
	// 	<div class="wx_loading">\
	// 		<div class="cld-ui-loading">\
	//     		<div class="loading_blue"></div>\
	//     		<div class="loading_red"></div>\
	//     		<div class="loading_black"></div>\
	//     		<div class="loading_green"></div>\
	//     	</div>\
	//     	<p>正在加载……</p>\
 //    	</div>';
	var scheduleList = {
		init:function () {
			$(window).scrollTop(0);
			scheduleList.loginStatus();
			scheduleList.shareFn();
			// scheduleList.loadingFn();
		},
		// loadingFn:function () {
		// 	if($('.wx_loading').length ==0){
		// 		$('body').append(loadingTmpl);
		// 		$('.wx_loading').height($(window).height());
		// 	}
		// },
		// removeLoadingFn:function () {
		// 	if($('.wx_loading').length >0){
		// 		$('.wx_loading').css({
		// 			"opacity":"0"
		// 		});
		// 		setTimeout(function(){
		// 			$('.wx_loading').remove();
		// 		},2000);
				
		// 	}
		// },
		bindEvent:function () {
			$('body').on('tap','.wx_schedule_main dl',function () {
				var sid = $(this).attr('data-sid'),
					cid = $(this).attr('data-cid'),
				    uuid = $(this).attr('data-uuid');
				window.location.href='http://www.365rili.com/pages/wx_schedule/schedule.html?data-sid='+ sid + '&uuid=' + uuid +'&cid=' + cid;
			});
			$(window).scroll(function () {
				scheduleList.flowFn();
			})
		},
		loginStatus:function () {
			var url = window.location.href;
			$.ajax({
				url:'/account/getPersonalDetail.do',
				dataType:"json",
				success:function (data) {
					if(data.state == 'unknown' || data.state == 'wrongpass'){
						window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
						// scheduleList.ajaxFn();
					}else{
						scheduleList.ajaxFn();
					}
				},
				error:function (data) {
					console.log(data);
				}
			})
		},
		ajaxFn:function () {
			var nowDate = scheduleList.parseDate(new Date());

			$.ajax({
				url:'/schedule/wxList.do',
				dataType:"json",
				success:function (data) {

					if(data.state == 'ok'){
						var positionValue = data.nextData[0] ? data.nextData[0].start_time.split(' ')[0] : 0;
						var preHtml = data.preData && scheduleList.render(data.preData);
						var nextHtml = data.nextData && scheduleList.render(data.nextData);
						$('.wx_schedule_main ul:first').append(preHtml);
						$('.wx_schedule_main ul:first').append(nextHtml);
						scheduleList.bindEvent();
						if(data.nextData.length < 8){
							_data.n = false;
						}
						if(data.preData.length < 8){
							_data.p = false;
						}
						_data.next = data.next;
						_data.pre = data.previous;
						
						// scheduleList.removeLoadingFn();
						setTimeout(function(){
							$('.wx_schedule_main').removeClass('none');
							scheduleList.positionFn(positionValue);
						},300)
					}
					
				}
			})
		},
		render:function (data) {
			return template(tmpl,data,{
							dateP: function (o, p, d, i) {
								var day = p.start_time.split(' ')[0];
								if(i != 0){
									var prevDay = data[i - 1].start_time.split(' ')[0];
									if(day == prevDay){
										return '';
									}
								}
								var tartDay = day.replace(/-/g, '/');
								var calcTxt = scheduleList.d_day(tartDay);
								return '<p class="schedule_day">'+ day + calcTxt + '</p>';
							},
							date:function (o, p, d, i) {
								return p.start_time.split(' ')[0];
							},
							schedule:function (o, p, d, i) {
								return template(scheduleTmpl,p,{
									end_time:function (o, p ,d ,i){
										if(p['allday_event']){
											return '';
										}
										var startTime = new Date(p.start_time.replace(/-/g, '/'));
										var time = new Date(startTime.getTime() + p.duration * 1000);
										var timestr = ['', time.getHours(), time.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1);

										var startTimeZero = startTime.setHours(0,0,0,0);
										var timeZero = time.setHours(0,0,0,0);

										if(+startTime == +time){
											return timestr + '结束';
										}else{
											var timestrs = [time.getFullYear(),time.getMonth(),time.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
											return timestrs+' '+timestr + '结束';
										}										
									},
									start_time: function (o, p, d, i) {
										if(p['allday_event']){
											return '全天'
										}
										else{
											var s = o.split(' ')[1].split(':');
											return s[0] + ':' + s[1];
										}
									},
									allday:function (o,p,d,i) {
										if(p['allday_event']){
											return 'allDay_icon'
										}else{
											return ''
										}
									},
									dayNum:function (o,p,d,i) {
										if(p['allday_event']){
											var day = new Date(p.start_time.replace(/-/g, '/')).getDate();
											return day
										}else{
											return ''
										}
									},
									invitationList:function (o,p,d,i) {
										if(p.followers == null || p.count == 0){
											return ''
										}
										return template('<li><img src="{$head}"/></li>',p.followers) + '<li>等已加入日程</li>';

									},
									extend:function (o,p,d,i) {
										if(o.sCalName){
											//0普通日程 91群组 94 我邀请别人参加的 95参加别人的日程
											if(p['scheduleType'] == 94 || p['scheduleType'] == 95){
												return o.sCalName
											}else{
												return '';
											}
										}else{
											return '';
										}
									},
									scheduleType:function (o,p,d,i) {
										if(p['extend'].sCalName){
											if(o == 0 || o == 91){
												return p['extend'].sCalName
											}else{
												return '';
											}
										}else{
											return '';
										}
									},
									alarmSize:function (o,p,d,i) {
										if(o == null || o == 0){
											return '';
										}
										return o + '个提醒';
									},
									exp:function (o,p,d,i) {
										if(p['extend'].sCalName){
											return 'alarm_exp1'
										}else{
											return ''
										}
									}
								})
							}
						})
		},
		positionFn:function (data) {
			if(data != 0){
				var today_li = $('.wx_schedule_main li[data-day="'+ data +'"]');
				$('body').scrollTop(today_li.position().top)
			}else{
				var nowDate = scheduleList.parseDate(new Date());
				var html = '<li><p class="schedule_day">' + nowDate +'</p><div class="schedule_tips_div"><div class="tips_icon no_schedule"></div><div class="tips_txt">您近期没有日程安排</div></div></li>';
				$('.wx_schedule_main ul:first').append(html);
				var h = $(window).height() - 35;
				$('.schedule_tips_div').height(h);
			}
		},
		flowFn:function (data) {

			var mainTop = $(window).scrollTop(), h = window.screen.availHeight, bodyH = $('body').height();
			if(((bodyH - (mainTop + h)) < 100) && _data.n){
				_data.allowNext && scheduleList.flowDownFn();
				_data.allowNext = false;
			}
			if(mainTop < 100 && _data.p){
				_data.allowPre && scheduleList.flowTopFn();
				_data.allowPre = false;
			}
		},
		flowTopFn:function () {
			var firstLiDay = $('.wx_schedule_main ul:first').find('li').eq(0).attr('data-day');
			$.ajax({
				url:'/schedule/wxPreDataList.do',
				dataType:"json",
				data:{
					fromDate:_data.pre
				},
				success:function (data) {
					_data.pre = data.previous;
					if(data.data.length < 8){
						_data.p = false;
					}
					if(data.data.length == 0){
						return '';
					}
					var html = scheduleList.render(data.data);
					$('.wx_schedule_main ul:first').prepend(html);
					scheduleList.positionFn(firstLiDay);
				},
				complete:function () {
					_data.allowPre = true;
				}
			})
		},
		flowDownFn:function () {
			$.ajax({
				url:'/schedule/wxNextDataList.do',
				dataType:"json",
				data:{
					fromDate:_data.next
				},
				success:function (data) {
					_data.next = data.next;
					if(data.data.length < 8){
						_data.n = false;
					}
					if(data.data.length == 0){
						return '';
					}
					var html = scheduleList.render(data.data);
					$('.wx_schedule_main ul:first').append(html);
				},
				complete:function () {
					_data.allowNext = true;
				}
			})
		},
		binary:function (arr,findval,leftIndex,rightIndex) {
			if(arr.length == 0){
				return 0
			}
			//找到中间的值
		    var midIndex = Math.floor((leftIndex+rightIndex)/2);
		    var midval = new Date(arr[midIndex].start_time.replace(/-/g,'/').split(' ')[0]);
		    //防止无穷递归
		    if( leftIndex > rightIndex ){
		        var leftTime = new Date(arr[leftIndex].start_time.replace(/-/g,'/').split(' ')[0]),
		        	rightTime = new Date(arr[rightIndex].start_time.replace(/-/g,'/').split(' ')[0]);
		       	if(+leftTime - +findval > +rightTime - +findval){
		       		return arr[rightIndex].start_time.split(' ')[0];
		       	}else{
		       		return arr[leftIndex].start_time.split(' ')[0];
		       	}
		    }
		    //进行查找
		    if( +midval > +findval ){
		        //在左边找
		        return scheduleList.binary(arr,findval,leftIndex,midIndex-1);
		    }else if(+midval < +findval){
		        //说明往右边找
		        return scheduleList.binary(arr,findval,midIndex+1,rightIndex);
		    }else{
		        return arr[midIndex].start_time.split(' ')[0];
		    }
		},
		parseDate:function(d) {
			return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');
		},
		d_day: function (o) {
				var date = o.split('/');
				var targetDay = new Date(date[0], date[1] - 1, date[2]);

				var today = new Date;
				today.setHours(0,0,0,0);

				var d_day = 0;
				if(targetDay.getTime() !== today.getTime()){
					d_day = ((targetDay - today) / 1000 / 60 / 60 / 24);
				}

				//如果存在差值则非今天
				if(d_day === 1){
					return ['（明天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === 2){
					return ['（后天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === -1){
					return ['（昨天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day === -2){
					return ['（前天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else if(d_day){
					return ['（', (Math.abs(d_day)), '天', d_day > 0 ? '后 周' : '前 周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
				else{
					return ['（今天 ', '周', ["日","一","二","三","四","五","六"][targetDay.getDay()], '）'].join('');
				}
		},
		shareFn:function () {
			var url = 'http://www.365rili.com/pages/wx_schedule/schedule_list.html?share=false';

			wxProtocol.init(function (wx) {
				wx.hideOptionMenu();
			});
		}
	}
	scheduleList.init()

})()
