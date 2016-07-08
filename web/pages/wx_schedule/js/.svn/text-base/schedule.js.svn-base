/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2016-03-02 15:28:39
 * @version $Id$
 */

(function () {
	var sid = query('data-sid'), uuid = query('uuid'), cid = query('cid'), key = query('key');
	var _data ={};
	var tmplTop = '\
		<div class="success_tip {$jion_tips}"><div class="tips_icon"></div><p>已加入日程,请到365日历公众号(我要-我的日程)中查看</p></div>\
		{$isGroupCalendarTop}\
		{$invitation_top}\
		{$schedule}\
		{$followers}\
		{$codeImg}\
		{$btns}\
		<div class="schedule_tips">\
			<p><b>进入365日历APP,体验完整功能</b></p>\
			<span>提示：请您用该微信号登录浏览日程</span>\
		</div>\
		<div class="invitation_btn {$invitation}"><div class="weixin_icon"><img src="images/weixin_icon.png" alt="" width="18" /></div><span>{$invitation_txt}</span></div>\
		<div class="share_weixin" class="none"></div>\
		';
	var tmplDetail = '\
		<div class="schedule_detail_div">\
			<div class="schedule_txt">{$title}</div>\
			<div class="schedule_dec">{$description}</div>\
			<div class="schedule_pics"></div>\
			<div class="schedule_address {$locationClass}">{$location}</div>\
			{$url}\
			<div class="schedule_tag {$extendClass}">{$extend}</div>\
		</div>\
		<div class="schedule_remid_repeat">\
			<div class="schedule_time"><p>{$startTime}</p><p>{$endTime}</p></div>\
			{$alarm}\
			{$repeatType}\
		</div>\
	';
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
	var schedule = {
		init:function () {
			schedule.loginStatus();
			schedule.bindEvent();
			// schedule.loadingFn();
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
		// 		},2000)	
		// 	}
		// },
		bindEvent:function () {
			$('body').on('tap','.schedule_tips p,.token_btn',function () {
				app.open(
					'coco://365rili.com'
				)
			});

			/*删除日程按钮*/
			$('body').on('tap','.p_del_btn,.g_del_btn',function () {
				var repeatType = _data.schedule.repeatType
				if(_data.followers.count > 0){
					if(_data.schedule.repeatType >0){
						plug.confirm('','这是重复日程,删除后相关日程全部删除,且所有参与者将无法查看此日程,您确定要删除日程吗？','',schedule.delScheduleFn);
					}else{
						plug.confirm('','删除后,所有参与者将无法查看此日程,您确定要删除此日程吗?','',schedule.delScheduleFn);
					}
				}else{
					if(_data.schedule.repeatType >0){
						plug.confirm('','这是重复日程,删除后相关日程全部删除且不能恢复,您确定要删除日程吗?','',schedule.delScheduleFn);
					}else{
						plug.confirm('','删除日程后不能恢复,<br/>您确定要删除日程吗?','',schedule.delScheduleFn);
					}
				}
			});

			/*退出按钮*/
			$('body').on('tap','.sign_btn',function () {
				plug.confirm('','您确定要退出日程吗?','',function(){
					schedule.delScheduleFn('exit')
				})
			});

			/*参加按钮*/
			$('body').on('tap','.join_btn',function () {
				schedule.getFollow();
			});

			/*编辑日程按钮*/
			$('body').on('tap','.p_edit_btn',function () {
				window.location = 'http://www.365rili.com/pages/wx_schedule/create_schedule.html?cid='+cid+'&uuid='+uuid;
			});

			$('body').on('tap','.share_weixin',function () {
				$('.share_weixin').hide();
			})
			$('body').on('tap','.invitation_btn',function () {
				$('.share_weixin').height($(window).height());
				$('.share_weixin').show();
				if(_data.wxShareUrl && _data.isOwner && _data.schedule.accessType == 94){
					shareKey = _data.wxShareUrl.split('key=')[1];
					wxProtocol.init(function (wx) {
						wx.showOptionMenu();
						wx.onMenuShareAppMessage({
					        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        desc: _data.schedule.title,
					        link:_data.wxShareUrl,
							imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
							success:function (wx) {
								$('.share_weixin').addClass('none');
								$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
							}
					    });
					    wx.onMenuShareTimeline({
					        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        desc: _data.schedule.title,
					        link:_data.wxShareUrl,
							imgUrl:'http://cocoimg.365rili.com/logo/114.png',
							success:function (wx) {
								$('.share_weixin').addClass('none');
								$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
							}
					    });
					});
				}else if(_data.wxShareUrl && _data.isOwner && _data.schedule.accessType == 0){
					shareKey = _data.wxShareUrl.split('key=')[1];
					wxProtocol.init(function (wx) {
						wx.showOptionMenu();
						wx.onMenuShareAppMessage({
					        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        desc: _data.schedule.title,
					        link:_data.wxShareUrl,
							imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
							success:function (wx) {
								$('.share_weixin').addClass('none');
								$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
							}
					    });
					    wx.onMenuShareTimeline({
					        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        desc: _data.schedule.title,
					        link:_data.wxShareUrl,
							imgUrl:'http://cocoimg.365rili.com/logo/114.png',
							success:function (wx) {
								$('.share_weixin').addClass('none');
								$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
							}
					    });
					});
				}else if(!_data.wxShareUrl){
					$.ajax({
						url:'/schedule/shareScheduleToWeixin.do',
						data:{
							cid:cid,
							uuid:uuid
						},
						type:'post',
						success:function (data) {
							$('.share_weixin').removeClass('none');
							wxProtocol.init(function (wx, link) {
								wx.showOptionMenu();
								wx.onMenuShareAppMessage({
							        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        		desc: _data.schedule.title,
							        link:data.url,
									imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
									success:function (wx) {
										$('.share_weixin').addClass('none');
										$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
									}
							    });
							    wx.onMenuShareTimeline({
							        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
					        		desc: _data.schedule.title,
							        link:data.url,
									imgUrl:'http://cocoimg.365rili.com/logo/114.png',
									success:function (wx) {
										$('.share_weixin').addClass('none');
										$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
									}
							    });
							});
						}
					})
				}
			})
		},
		delScheduleFn:function (ch) {
			if(_data.fsid){
				sid = _data.fsid
			}
			$.ajax({
				url:'/schedule/wxDelete.do',
				data:{
					scheduleId:sid
				},
				type:'post',
				success:function (data) {
					if(data.state == 'ok'){
						if(ch && ch == 'exit'){
							window.location ='http://www.365rili.com/pages/wx_schedule/tips_schedule.html?tipstype=exit'
						}else{
							window.location ='http://www.365rili.com/pages/wx_schedule/tips_schedule.html?tipstype=dels'
						}
					}
				}
			})
		},
		loginStatus:function () {
			var url = window.location.href;
			$.ajax({
				url:'/account/getPersonalDetail.do',
				dataType:'json',
				success:function (data) {
					if(data.state == 'unknown' || data.state == 'wrongpass'){
						window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
					}else{
						schedule.ajaxFn();
					}
				},
				error:function (data) {
					console.log(data);
				}
			})
		},
		ajaxFn:function () {
			$.ajax({
				url: '/schedule/getWeixinSchedule.do',
				data: {
					cid: cid,
					uuid: uuid,
					key:key,
					t: +new Date
				},
				dataType:'json',
				success:function (data) {
					if(data.state == 'ok'){
						_data = data;
						_data.extend = JSON.parse(data.schedule.extend);
						if(_data.extend.sUUID && _data.extend.sCID && _data.isGroupCalendar){
							$.ajax({
								url:'/schedule/getScheduleLastEditor.do',
								data:{
									cid:_data.extend.sCID,
									uuid:_data.extend.sUUID,
									t:+new Date
								},
								dataType:'json',
								success:function (data) {
									if(data.state == 'ok'){
										_data.lastEditor = data.lastEditor;
										tmpl();
									}
								}
							})
						}
						else{
							tmpl();
						}
						function tmpl() {	
							var htmlTop = template(tmplTop,_data,{
								accessType:function (o,p,d,i) {
									switch (p.schedule.accessType)
										{
										case 0:
										  return '来自个人日历';
										  break;
										case 91:
										  return '来自群组日历'; 
										  break;
										}
										//0个人日程 91来自群组 94我主动邀请别人的日程 95别人邀请我的日程 
								},
								lastEditor:function (o,p,d,i) {
									if(o == null){
										return ''
									}
									return o
								},
								schedule:function (o,p,d,i) {
									return template(tmplDetail,o,{
										location:function (o,p,d,i) {
											if(o == null || o == 'null'){
												return ''
											}else{
												return o.split('@')[0];
											}
										},
										url:function (o,p,d,i) {
											if( o == null || o == ''){
												return '';
											}
											return '<div class="schedule_url cld-ui-nowrap">' + o +'</div>'
										},
										description:function (o,p,d,i) {
											if( o == null || o == ''){
												return '';
											}
											return o;
										},
										extend:function (o,p,d,i) {
											o = JSON.parse(o);
											if( o == null || o == '{}'){
												return '';
											}else if(o.category){
												return o.category
											}else{
												return'';
											}
										},
										locationClass:function (o,p,d,i) {
											if(p.location == '' || p.location == null){
												return 'none'
											}
										},
										urlClass:function (o,p,d,i) {
											if(p.url == '' || p.url == null){
												return 'none'
											}
										},
										extendClass:function (o,p,d,i) {
											var categoryStr = JSON.parse(p.extend);

											if(categoryStr.category == '' || categoryStr.category ==null){
												return 'none'
											}
										},
										startTime:function (o,p,d,i) {
											var startDate = new Date(o),
												startDateMonth = startDate.getMonth() + 1,
												startDateYear = startDate.getFullYear(),
												startDateDay = startDate.getDate(),
												startDateWeek = startDate.getDay(),
												startDateHours = startDate.getHours(),
												startDateMinutes = startDate.getMinutes() == 0 ? '00' :startDate.getMinutes(),
												weekNum;
											switch(startDateWeek)
											{
												case 0 : weekNum = '星期日';break;
												case 1 : weekNum = '星期一';break;
												case 2 : weekNum = '星期二';break;
												case 3 : weekNum = '星期三';break;
												case 4 : weekNum = '星期四';break;
												case 5 : weekNum = '星期五';break;
												case 6 : weekNum = '星期六';break;
											}
											return startDateYear + '年' + startDateMonth + '月' + startDateDay + '日 ' + weekNum + ' '+ startDateHours + ':'+startDateMinutes + ' 开始';

										},
										endTime:function (o,p,d,i) {
											if(p.duration > 0){
												var endDate = new Date(p.startTime + p.duration * 1000),
												endDateYear = endDate.getFullYear(),
												endDateMonth = endDate.getMonth() + 1,
												endDateDay = endDate.getDate(),
												endDateWeek = endDate.getDay(),
												endDateHours = endDate.getHours(),
												endDateMinutes = endDate.getMinutes() == 0 ? '00' :endDate.getMinutes(),
												weekNum;
											switch(endDateWeek)
											{
												case 0 : weekNum = '星期日';break;
												case 1 : weekNum = '星期一';break;
												case 2 : weekNum = '星期二';break;
												case 3 : weekNum = '星期三';break;
												case 4 : weekNum = '星期四';break;
												case 5 : weekNum = '星期五';break;
												case 6 : weekNum = '星期六';break;
											}
											return endDateYear + '年' +endDateMonth + '月' + endDateDay + '日 ' + weekNum + ' '+ endDateHours + ':'+endDateMinutes + ' 结束';
											}else{
												return ''
											}
										},
										alarm:function (o,p,d,i) {
											var alarmData = o.split(","), alarmStr = '',alarmDataString;
											for (var i = 0; i < alarmData.length; i++) {
												var startTime = new Date(p.startTime);
												startTime.setMinutes(startTime.getMinutes() - alarmData[i]);
												if(p.allDayEvent == "true"){
													if(alarmData[i] == "0"){
														alarmData[i] = "当天";
														alarmStr+= '<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime).split(' ')[0] +'</span> ' + alarmData[i] +'提醒</div>';
													}else if(alarmData[i] == "1440"){
														alarmData[i] = "1天";
														$('.personal_remind_div e_clear').append('<span>'+ schedule.parseDate(startTime).split(' ')[0] +'</span> 提前' + alarmData[i] +'提醒');
													}else if(alarmData[i] == "4320"){
														alarmData[i] = "3天";
														$('.personal_remind_div e_clear').append('<span>'+ schedule.parseDate(startTime).split(' ')[0] +'</span> 提前' + alarmData[i] +'提醒');
													}
												}else{
													if(alarmData[i] == "0"){
														alarmStr+= '<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 正点提醒</div>';
													}else if(alarmData[i] == "5"){
														alarmDataString = "5分钟";
														alarmStr+= '<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmDataString +'提醒</div>';
													}else if(alarmData[i] == "10"){
														alarmData[i] = "10分钟";
														alarmStr+='<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒</div>';
													}else if(alarmData[i] == "30"){
														alarmData[i] = "30分钟";
														alarmStr+='<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒</div>';
													}else if(alarmData[i] == "60"){
														alarmData[i] = "1小时";
														alarmStr+='<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒</div>';
													}else if(alarmData[i] == 1440){
														alarmData[i] = "1天";
														alarmStr+='<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒</div>';
													}else if(alarmData[i] == "4320"){
														alarmData[i] = "3天";
														alarmStr+='<div class="personal_remind_div e_clear"><span>'+ schedule.parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒</div>';
													}
												}
											}
											if(alarmStr.length > 0){
												return '<div class="schedule_remind">' + alarmStr +'</div>';
											}else{
												return ' ';
											}
											
										},
										repeatType:function (o,p,d,i) {
											if( o == null){
												return ''
											}
											var repeatStr;

											//按日重复
											if(o == 1){
												var day = p.repeatFrequency == 1 ? '': p.repeatFrequency
											}
											
											//按周重复
											var we = '';
											if(p.repeatDay){
												$.each(p.repeatDay.split(':'),function (i,n) {
													switch(n){
														case 'SUN': we +='周日 ';break;
														case 'SAT': we +='周六 ';break; 
														case 'FRI': we +='周五 ';break; 
														case 'THU': we +='周四 ';break; 
														case 'WED': we +='周三 ';break; 
														case 'TUR': we +='周二 ';break; 
														case 'MON': we +='周一 ';break;  
													}
												})
											}
											//按月重复
											var monthTxt = '';
											if(o == 31){
												 monthTxt = (p.repeatFrequency == 1 ? '' : p.repeatFrequency)+'月 第'+ p.repeatMonthDay + '天';
											}
											//按年重复
											var yearText = '';
											if(o == 365){
												yearText = (p.repeatFrequency == 1 ? '' : p.repeatFrequency) + '年 ' + (parseInt(+p.repeatMonth)+1) + '月' + p.repeatMonthDay + '日';
											}
											//农历月重复
											var lunarMonth = ''
											if(o == 29){
												var lunarDay = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'][p.repeatMonthDay-1];

												lunarMonth = (p.repeatFrequency == 1 ? '' : p.repeatFrequency)+'月 ' + lunarDay;
											}
											//农历每年重复
											var lunarYear = '';
											if(o == 354){
												var _lunarMonth = ['一','二','三','四','五','六','七','八','九','十','十一','十二'][p.repeatMonth];
												var _lunarDay = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十', '卅一'][p.repeatMonthDay-1];

												lunarYear = '农历每' + (p.repeatFrequency == 1 ? '' : p.repeatFrequency) + '年 ' + _lunarMonth +'月'+_lunarDay;
											}
											switch(o){
												case 0:repeatStr = ' ';break;
												case 1:repeatStr = '<div class="schedule_repeat">每'+ day +'日重复</div>';break;
												case 5:repeatStr = '<div class="schedule_repeat">法定工作日重复</div>';break;
												case 7:repeatStr = '<div class="schedule_repeat">每周 '+ we +'重复</div>';break;
												case 31:repeatStr = '<div class="schedule_repeat">每'+ monthTxt +'重复</div>';break;
												case 365:repeatStr = '<div class="schedule_repeat">每'+ yearText +'重复</div>';break;
												case 29:repeatStr = '<div class="schedule_repeat">农历每' + lunarMonth + ' 重复</div>';break;
												case 354:repeatStr = '<div class="schedule_repeat">'+lunarYear+' 重复</div>';break;
											}
											return repeatStr
										}

									})
								},
								followers:function (o,p,d,i) {
									if(o.count == 0){
										return ' '
									}
									var tmpl = '<div class="followers"><p>参与者{$count}人</p><ul class="e_clear">{$followList}</ul></div>'
									var html = template(tmpl,o,{
										followList:function (o,p,d,i) {
											return template('<li><img src="{$head}" width="30"/></li>',p.followers)
										}
									})
									return html;
								},
								btns:function (o,p,d,i) {
									var html = ''
									//我的日程 和 我邀请别人参加的日程
									if(p.isOwner){
										html = '<div class="p_btns e_clear">\
													<a href="javascript:;" class="p_edit_btn"><div class="p_edit_icon"></div><span>编辑日程</span></a>\
													<a href="javascript:;" class="p_del_btn"><div class="p_del_icon"></div><span>删除日程</span></a>\
												</div>'
									}
									//来自群组的日程
									if(p.schedule.accessType == 91){
										html = '<div class="wx_one_btns"><a href="javascript:;" class="g_del_btn">删除日程</a></div>'
									}
									//别人邀请我的日程
									if(p.schedule.accessType == 95 || (!p.isOwner && p.on)){
										html = '<div class="wx_one_btns"><a href="javascript:;" class="sign_btn">退出日程</a></div>'
									}
									//不是我日程 并且没有参加
									if(!p.isOwner && !p.on){
										html = '<div class="wx_one_btns"><a href="javascript:;" class="join_btn">参加</a></div>'
									}
									if(!p.on && !p.isWxFollowed){
										html ='';
									}
									return html
								},
								invitation:function (o,p,d,i) {
									if(p.isOwner && p.schedule.accessType == 94){
										return ''
									}else if(p.isOwner && p.schedule.accessType == 0){
										return ''
									}else{
										return 'none'
									}
								},
								invitation_txt:function (o,p,d,i) {
									if(p.followers.count > 0){
										return '继续添加参与者'
									}else{
										return '添加参与者'
									}
								},
								jion_tips:function (o,p,d,i) {
									if(!p.isOwner && p.on){
										return ''
									}else{
										return 'none'
									}
								},
								codeImg:function (o,p,d,i) {
									var html ='';	
									if(!p.isWxFollowed && !p.on){
										html = '<div class="follow_div"><p class="tips_top_txt"><b>长按二维码加入日程</b><br/>及时接收日程提醒,快速回顾日程安排</p><div class="follow_code"><img src="'+p.wx_qrcode_url+'" width="172"/></div></div>'
									}
									if(!p.isWxFollowed && p.on){
										html = '<div class="follow_div"><p class="tips_top_txt"><b>长按二维码加入日程</b><br/>助你及时接收日程提醒,快速回顾日程安排</p><div class="follow_code"><img src="'+p.wx_qrcode_url+'" width="172"/></div></div>'
									}
									if(!p.isWxFollowed && p.isOwner){
										html = '<div class="follow_div"><p class="tips_top_txt"><b>长按二维码关注我</b><br/>助你快速回顾和编辑日程</p><div class="follow_code"><img src="'+p.wx_qrcode_url+'" width="172"/></div></div>'
									}
									return html;
								},
								invitation_top:function (o,p,d,i) {
									var tmpl ='<div class="schedule_top e_clear">\
												<div class="schedule_top_content">\
													<div class="schedule_user_header"><img src="{$ownerHeader}"/></div>\
													<div class="schedule_user_info">\
														<div class="scedule_source cld-ui-nowrap">{$lastEditor}</div>\
														<div class="schedule_username">微信邀请</div>\
													</div>\
												</div>\
											</div>';
								
									if(p.schedule.accessType == 94 && !p.isOwner && !p.isGroupCalendar){
										return template(tmpl,p);
									}else if(p.schedule.accessType == 0 && !p.isOwner && !p.isGroupCalendar){
										return template(tmpl,p);
									}else if(p.schedule.accessType == 95 && !p.isOwner && !p.isGroupCalendar){
										return template(tmpl,p);
									}else{
										return '';
									}
								},
								isGroupCalendarTop:function (o,p,d,i) {
									var tmpl ='<div class="schedule_top e_clear">\
												<div class="schedule_top_content">\
													<div class="schedule_user_header"><img src="{$ownerHeader}"/></div>\
													<div class="schedule_user_info">\
														<div class="scedule_source cld-ui-nowrap">{$lastEditor}</div>\
														<div class="schedule_username">最近编辑者&nbsp;&nbsp;&nbsp;&nbsp;来自 {$calName}日历</div>\
													</div>\
												</div>\
											</div>';	
									if(p.isGroupCalendar){
										return template(tmpl,p);
									}else{
										return '';
									}
								}
							});
							$('.wx_schedule').append(htmlTop);

							//处理图片
							if(_data.extend.pics){
								schedule.picFn(data);
							}else{
								setTimeout(function () {
									schedule.psStyle(data);
								},300)
								// schedule.removeLoadingFn();
								$('.wx_schedule').removeClass('none')
							}
							
							//第一次进入页面判断有没有分享权限
							schedule.shareFn(data);
						}
					}
					if(data.state == 'wrongpass'){
						window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
					}
					if(data.state == 'error'){
						$('body').html(tokenTmpl);
						var h = $(window).height();
						$('.token_div').height(h);
					}
				}
			})
		},
		getFollow:function () {
			$.ajax({
				url:'/schedule/joinWeixinSchedule.do',
				data:{
					key:key
				},
				success:function (datas) {
					if(datas.state !== 'ok'){
						return false
					}
					_data.fsid = datas.schedule.id;
					var followStr = '';
					for (var i = 0; i < datas.follower.followers.length; i++) {
						followStr += '<li><img src="'+datas.follower.followers[i].head + '" width ="30" height="30"/></li>';
					};
					var followerStr = followStr.substr(0, followStr.length - 1);
					if(followerStr.length != 0) {
						if($('.followers').length == 0){
							$('.wx_one_btns').before('<div class="followers"><p class="follow_txt">参与者' + datas.follower.count + '人</p><ul class="e_clear">' + followStr +'</ul>');
						}else{
							$('.followers ul'). html(followStr);
							$('.followers p').html('参与者'+ datas.follower.count +'人');
						}
					}
					$('.success_tip').show();
					$('.wx_one_btns').html('<a href="javascript:;" class="sign_btn">退出日程</a>')
				}
			})
		},
		psStyle:function (data) {
			var h = $(window).height(), bodyH = $('body').height();

			if(!data.schedule.description){
				$('.schedule_txt').css({
					'border':0
				})
			}
			if(data.schedule.url && !data.schedule.extend.category){
				$('.schedule_url').css({
					'border':0
				})
			}
			if(data.schedule.location && !data.schedule.url && !data.schedule.extend.category){
				$('.schedule_address').css({
					'border':0
				})
			}
			if(!data.schedule.repeatType && !data.schedule.alarm){
				$('.schedule_time').css({
					'border':0
				})
			}
			if(!data.schedule.repeatType){
				$('.schedule_remind').length && $('.schedule_remind').css({
					'border':0
				})
			}
			if(!data.schedule.description || !data.schedule.location || !data.schedule.url || !data.schedule.extend.category){
				$('.schedule_remid_repeat').css({
					'margin-top':15 + 'px',
					'borderTop':'1px solid #e6e6e6'
				})
			}
			if(!data.schedule.location && !data.schedule.url && !data.schedule.extend.category && !_data.extend.pics){
				$('.schedule_remid_repeat').css({
					'margin-top':0 + 'px',
					'borderTop':'0px solid #e6e6e6'
				})
			}
			function checkSize() {
				if(bodyH > h){
					$('.wx_schedule').css({
						'padding-bottom':"75px"
					})
				}
			}
			checkSize();
			$('body').on('resize',checkSize);
			if(data.schedule.duration == 0){
				$('.schedule_time p').css({
					'line-height':'52px',
					'padding':'0px'
				})
			}
			if($('.invitation_btn').hasClass('none')){
				$('.schedule_tips').css({
					'padding-bottom':'15px'
				})
			}
		},
		picFn:function (data) {
			var  pics = [];
			$.each(_data.extend.pics,function (o,i) {	
				var ss = 'http://cocoimg.365rili.com/schedule_pics/default/' + i;
				pics.push(ss);
			});
			if(pics){
				$(".schedule_pics").Slide({
					pics: pics,
					index: false,
					scroll: false,
					banSlid: false,
					imgBIg:true,
					imgZoom:false,
					arrow:false
				});
				$(".schedule_pics .public_image_container_ul").css({
					"width":"auto"
				});
				$(".schedule_pics .public_image_container_ul li img").on('load',function(){
				 	var w = $(window).width() - 15;
					var imgW = (w - 40)/3;
					$(this).css({
						"width": imgW + "px",
						"height": imgW + "px"
					});
					$(".schedule_pics .public_image_container_ul li").css({
						"width": imgW + "px",
						"height": imgW + "px",
						"overflow":'hidden'
					});
					setTimeout(function () {
						schedule.psStyle(data);
					},300)
				});
			}
			// schedule.removeLoadingFn();
			$('.wx_schedule').removeClass('none')
		},
		shareFn:function () {
			var shareKey = '';
			if(_data.wxShareUrl && _data.isOwner){
				shareKey = _data.wxShareUrl.split('key=')[1];
				wxProtocol.init(function (wx) {
					wx.showOptionMenu();
					wx.onMenuShareAppMessage({
				        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
				        desc: _data.schedule.title,
				        link:_data.wxShareUrl,
						imgUrl: 'http://cocoimg.365rili.com/logo/114.png',
						success:function (wx) {
							$('.share_weixin').addClass('none');
							$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
						}
				    });
				    wx.onMenuShareTimeline({
				        title: '来自'+_data.lastEditor+'的邀请：请参加日程，接收日程提醒',
				        desc: _data.schedule.title,
				        link:_data.wxShareUrl,
						imgUrl:'http://cocoimg.365rili.com/logo/114.png',
						success:function (wx) {
							$('.share_weixin').addClass('none');
							$("<iframe id='statistics_ifram' src='http://www.365rili.com/pages/wx_schedule/wx_statistics.html' name='statistics_ifram' style='display:none';></iframe>").appendTo('body');
						}
				    });
				});
			}else if(!_data.isOwner || !_data.wxShareUrl){
				wxProtocol.init(function (wx) {
					wx.hideOptionMenu();
				});
			}
		},
		parseDate:function(date) {
			return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');;
		}
	}
	schedule.init();
})()
