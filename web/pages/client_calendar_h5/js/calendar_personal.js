/**
 * calendar_personal
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-10-24 10:54:48
 */

(function(){
	var baiduMapUrl = ["http://api.map.baidu.com/staticimage", "?width=281","&height=160",
					"&zoom=14", "&markerStyles=m,A,0xff0000"].join("");
	var _data ={};
	var self = {
		render: function(data){
			self.data = JSON.parse(data);
			self.renderContent(data);
			$('.personal_box').show();
			//self.checkHeight();
			self.bindEvent();
		},
		renderContent: function(data){
			data = JSON.parse(data);
			if(!data.login){
				if(app.getUa.weixin){
					var url = window.location.href;
					window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
				}else{
					window.location.href = '/pages/pleaseOpenWithWX.html';
				}
			}
			//标题
			if(data.schedule.title){
				$('.personal_title').html(self.htmlEncode(data.schedule.title)).show(); 
			}

			//开始时间
			if(data.dateline1){
				$('.personal_time').html(data.dateline1).show();
			}
			
			//重复
			if(data.dateline2){
				$('.personal_repeat').html(data.dateline2).show();
			}

			//正文
			if(data.schedule.description){
				$('.personal_txt').html(self.htmlEncode(data.schedule.description)).show();
			}
			function parseDate (date) {
				return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2');;
			}
			//提醒
			console.log(data.alarm)
			if(data.alarm){
				var alarmData = data.alarm;
				for (var i = 0; i < alarmData.length; i++) {
					var startTimeStr = parseDate(new Date(data.schedule.startTime));
					var startTime = new Date(startTimeStr.replace(/-/g,"/").split('.')[0]);
					startTime.setMinutes(startTime.getMinutes() - alarmData[i]);
					if(data.allDayEvent == "true"){
						if(alarmData[i] == "0"){
							alarmData[i] = "当天";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime).split(' ')[0] +'</span> ' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "1440"){
							alarmData[i] = "1天";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime).split(' ')[0] +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "4320"){
							alarmData[i] = "3天";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime).split(' ')[0] +'</span> 提前' + alarmData[i] +'提醒<p>');
						}
					}else{
						if(alarmData[i] == "5"){
							alarmData[i] = "5分钟";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "10"){
							alarmData[i] = "10分钟";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "30"){
							alarmData[i] = "30分钟";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "60"){
							alarmData[i] = "1小时";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "1440"){
							alarmData[i] = "1天";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else if(alarmData[i] == "4320"){
							alarmData[i] = "3天";
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 提前' + alarmData[i] +'提醒<p>');
						}else{
							$('.personal_remind_div').append('<p><span>'+ parseDate(startTime) +'</span> 正点提醒<p>');
						}
					}

				};

			}else{
				$('.personal_remind_div').hide();
				$('.personal_time').css({
					"border": "none"
				})
			}
			//标签
			data.tag = data.tag || "{}";
			data.tag = JSON.parse(data.tag);
			/*2016-2-29 tag数据发生变化 判断tag是否存在*/
			if(data.tag && data.tag.category){
				$(".personal_tag").html(data.tag.category);
			}else{
				$(".personal_tag").remove();
			}
			/**
			 * 去掉默认内容
			 * 2014-12-26
			 */
			// else{
			// 	$('.personal_txt').html('<p style="color:#ddd;">ta没有留下更多的话...</p>').show();
			// }

			//图片
			if(data.pics){
				$('<div class="personal_pic"></div>').appendTo('.personal_pic_div')
				.show()
				.Slide({
					pics: data.pics,
					index: false,
					scroll: false,
					banSlid: false
				});

				$(".public_image_container_ul").css({
					"width":"auto"
				});
				$(".public_image_container_ul li img").on('load',function(){
				 	var w = $(window).width();
					var imgW = (w - 40)/3;
					$(this).css({
						"width": imgW + "px",
						"height": imgW + "px"
					});
					$(".public_image_container_ul li").css({
						"width": imgW + "px",
						"height": imgW + "px"

					})
				});

				if(data.scheduleDesc){
					$('.personal_pic .public_image_container').css('margin-top', '15px');
				}
				$('.personal_txt').show();
			}

			//地址
			if(data.location){
				var location = $('.personal_address').html('\
					<p></p>\
				').show();
					// <div class="map">\
					// 	<img alt="" class="map_image">\
					// </div>\
				var index = data.location.indexOf("@");
				if(index > 0){
					var title = data.location.substr(0, index);
					var posAry = data.location.substr(index+1).split(",");
					var reversePos = posAry.reverse().join(",");
					// var mapUrl = [baiduMapUrl, "&center=", reversePos, "&markers=", reversePos].join("");
					location.find("p").html(title);
					// location.find("img").attr("src", mapUrl);	
				}else{
					// var mapUrl = [baiduMapUrl, "&center=", data.location, "&markers=", data.location].join("");
					location.find("p").html(data.location);
					// location.find("img").attr("src", mapUrl);
				}
				// location.find("img").on("load", function(){
				// 	if(this.naturalWidth == 1){
				// 		$(this).parent().hide();
				// 	}
				// });
				var address = '',
                    index = data.location.indexOf("@");
                if(index > 0){
                    address = data.location.substr(0, index);
                } else {
                    address = data.location;
                }
				var mapBox = $('<div id="js-mapBox">\
									<div class="styleguide common-widget-nav -shadow-card -bg-normal row">\
										<a id="js-mapClose" class="btn -flat needsclick back-btn -col-auto">\
											<i class="icon -back-arrow"></i>\
										</a>\
										<div class="title -ft-large">\
											<span>'+address+'</span>\
										</div>\
										<a id="nav_maplink" class="btn -mini -flat needsclick -ft-brand -col-auto"></a>\
									</div>\
								</div>')
				mapBox.appendTo('body');
				var $map = $('<div id="js-map"></div>');
				$map.appendTo(mapBox);
				mapBox.css({
					width: '100%',
					height:'100%',
					position:'absolute',
					top:0,
					left:0,
					display:'none',
					zIndex:'999'
				});
				var map, local;
				$('#js-mapClose').on('touchend', function () {
					mapBox.hide();
					map = null;
					local = null;
					$(document.documentElement).css({
						height:'auto',
						overflow:'visible',
						'-webkit-overflow-scrolling' : 'touch'
					});
					$(document.body).css({
						height:'auto',
						overflow:'visible',
						'-webkit-overflow-scrolling' : 'touch'
					});
				});
                $('.personal_address').on('touchend', function() {
                	$(document.documentElement).css({
		            	'overflow':'hidden',
		            	height:'100%'
		            });
		            $(document.body).css({
		            	'overflow':'hidden',
		            	height:'100%'
		            });
		            mapBox.show();
	                map = new BMap.Map("js-map");  
					map.centerAndZoom('北京', 14);
					map.addControl(new BMap.ZoomControl());
					map.addControl(new BMap.ScaleControl());
					local = new BMap.LocalSearch(map, {      
					      renderOptions:{map: map}
					}); 
					local.search(address);
					$map.css({
						width: '100%',
						height: ($(window).height() - 50) + 'px',
					})
                });
			}

			//url
			if(data.url){
				$('.personal_url').html('<p data-url="'+data.url+'" style="color:#a2a2a2;"> '+data.url+'</p></a>').show();
				$('.personal_url').on('touchend',function () {
					window.location.href = data.url;
				})
			}
			
			//参与者
			// data.follow = eval('(' + data.follow + ')');
			data.follow = data.follow.followers;
			var followStr = '';
			for (var i = 0; i < data.follow.length; i++) {
				followStr += '<img src="'+data.follow[i].head + '" width ="32" height="32"/>';
			};
			var followerStr = followStr.substr(0, followStr.length - 1);
			if(followerStr.length != 0) {
				$('.personal_team').html('<p class="follow_txt">除创建者，参与者' + data.follow.length + '人</p>' + followStr).show();
			}
			else{
				$('.personal_team').html('<p>尚未有好友参与</p>').show()
			}
			
			var isLoginStr =query('isLogin').toString();

			//参与按钮
			if(data.on){
				if(data.isWxFollowed == 'true' || data.isWxFollowed == true){
					$('.personal_btn').hide();
					$('.personal_team').css({
						'border-bottom':0
					})
					if($('.schedule_tips').length <= 0){
						$('<div class="schedule_tips"><p><b>进入365日历APP,体验完整功能</b></p><span>提示：请您用该微信号登录浏览日程</span></div>').appendTo('body');
					}
				}else{
					var tmpl = '<div class="follow_div"><p class="tips_top_txt">扫描二维码关注公众号计入日程</p><p>及时接收日程提醒,快速回顾日程安排</p><div class="follow_code"><img src="'+data.wx_qrcode_url+'" width="172"/></div></div>';
					if($('.follow_div').length == 0){
						$('.personal_team').after(tmpl);
					}
				
					$('.personal_btn').hide();
					if($('.schedule_tips').length <= 0){
						$('<div class="schedule_tips"><p><b>进入365日历APP,体验完整功能</b></p><span>提示：请您用该微信号登录浏览日程</span></div>').appendTo('body');
					}
				}
			}
			else{
				$('.personal_btn div').addClass('on');
				$('.join_txt').html('参加');
			}

			//判断有没有关注过公众账号
			if(data.isWxFollowed =='false' || data.isWxFollowed == false ||  !data.isWxFollowed){
				$('.personal_btn').hide();
				var codeImg = '<div class="follow_div"><p class="tips_top_txt">关注公众账号<br/>及时接收日程提醒,快速回顾日程安排</p><div class="follow_code"><img src="'+data.wx_qrcode_url+'" width="172"/></div></div>';
				if($('.follow_div').length == 0){
					$('.personal_box').append(codeImg);
				}
				//没有关注公众号  已经参加 不是自己
				if(data.on && !data.isOwner){
					$('.success_tip').show();
					if($('.exit_btn').length<=0){
						$('.personal_box').append('<a href="javascript:;" class="exit_btn">退出日程</a>')
					}
				}
				//创建者看日程
				if(data.isOwner){
					$('.personal_box').append('<a href="javascript:;" class="del_btn">删除日程</a>')
				}
			}else{
				$('.follow_div').hide().remove();
				// if(data.on.toString() == 'true' && data.isOwner != 'true'){
				// 	$('.success_tip').show();
				// 	$('.personal_box').append('<a href="javascript:;" class="exit_btn">退出日程</a>')
				// }
				// if(data.isOwner == 'true'){
				// 	$('.personal_box').append('<a href="javascript:;" class="del_btn">删除日程</a>')
				// }
			}
			if(!data.isOwner){
				var groupTmpl = '<div class="group_schedule_top e_clear">\
					<div class="schedule_top_content">\
						<div class="schedule_user_header"><img src=""/></div>\
						<div class="schedule_user_info">\
							<div class="scedule_source"></div>\
							<div class="schedule_username"></div>\
						</div>\
					</div>\
				</div>';
				$('.calendar_content').prepend(groupTmpl);
				$('.schedule_user_header img').attr('src',data.header);
				$('.schedule_username').html('最近编辑:微信邀请');
				$('.scedule_source').html(data.creator);
			}
			//判断是否是群组日历
			if(data.isGroupCalendar){
				var groupTmpl = '<div class="group_schedule_top e_clear">\
					<div class="schedule_top_content">\
						<div class="schedule_user_header"><img src=""/></div>\
						<div class="schedule_user_info">\
							<div class="scedule_source"></div>\
							<div class="schedule_username"></div>\
						</div>\
					</div>\
				</div>';
				$('body').prepend(groupTmpl);
				$('.schedule_user_header img').attr('src',data.logoImg);
				$('.schedule_username').html('最近编辑:'+ data.lastEditor);
				$('.scedule_source').html(data.calendarName);
				$('.personal_team p').css({
					"border":0
				})
				if($('.schedule_tips').length <= 0){
						$('<div class="schedule_tips"><p><b>进入365日历APP,体验完整功能</b></p><span>提示：请您用该微信号登录浏览日程</span></div>').appendTo('body');
					}
				$('.personal_btn').hide().remove();
			}
			//判断没有图片 地址 url 标签时的样式
			if(!data.pics && !data.location && !data.url){
				$('.personal_remind').css({
					'margin-top':'0px',
					'border-top':0
				})
			}
		},
		checkHeight: function () {
			var box = $('.personal_box').show();
			var h = box.height();
			var wh = $(window).height();
			if(h < wh){
				$('.calendar_content').height(wh - 74 - $('.personal_title').height() + 'px');
				var t = $('.personal_btn').position().top;
				var xt = wh - 140 - t;
				$('.personal_btn').css('margin-top', xt);
			}


			//背景图
			// $('.bg').css('background-image','url('+self.data.bgu+')');
		},
		getFollow:function () {
			try{
			$.ajax({
				url: 'http://www.365rili.com/schedule/getRecentFollowSchedules.do',
				data: {
					cid: self.data.cid,
					uuid: self.data.uuid
				},
				success: function (datas) {
					if(datas.state !== 'ok'){
						return false
					}
					_data.uuid = datas.schedule.uuid;
					_data.cid = datas.schedule.cid;

					var followStr = '';
					for (var i = 0; i < datas.follower.followers.length; i++) {
						followStr += '<img src="'+datas.follower.followers[i].head + '" width ="32" height="32"/>';
					};
					var followerStr = followStr.substr(0, followStr.length - 1);
					if(followerStr.length != 0) {
						$('.personal_team').html( '<p class="follow_txt">除创建者，参与者' + datas.follower.count + '人</p>' + followStr).show();
					}
					$('.success_tip').show();
					$('.personal_btn').hide();
					if($('.exit_btn').length<=0){
						$('.personal_box').append('<a href="javascript:;" class="exit_btn">退出日程</a>')
					}

					if($('.schedule_tips').length <= 0){
						$('<div class="schedule_tips"><p><b>进入365日历APP,体验完整功能</b></p><span>提示：请您用该微信号登录浏览日程</span></div>').appendTo('body');
					}
				},
				error: function () {

				}
			})
		}catch(e){
			alert(e)
		}

		},
		delScheduleFn:function (ch) {
			$.ajax({
				url:'/schedule/wxDelete.do',
				data:{
					scheduleld:data.sid
				},
				type:'post',
				success:function (data) {
					if(data.state == 'ok'){
						if(ch && ch == 'exit'){
							window.location ='http://www.365rili.com/wx_schedule/tips_schedule.html?tipstype=exit'
						}
						window.location ='http://www.365rili.com/wx_schedule/tips_schedule.html?tipstype=dels'
					}
				}
			})
		},
		bindEvent: function(){
			$('body').on('tap','.schedule_tips p',function () {
					app.open('coco://365rili.com/schedule?scheduleUuid='+_data.uuid+'&cid='+_data.cid+'&action=weixin',app.getUa.ios);
			});
			$(".personal_btn").on("tap", function(evt){
				self.getFollow();
			});
			$('body').on('tap','.exit_btn',function () {
				self.delScheduleFn(exit);
			});
			$('body').on('tap','.del_btn',function () {
				self.delScheduleFn();
			});

		},
		htmlEncode: function(str){
			var s = "";  
	  		if (str.length == 0) return "";  
	  		s = str.replace(/&/g, "&amp;");
			s = s.replace(/</g, "&lt;");  
	  		s = s.replace(/>/g, "&gt;");  
	  		s = s.replace(/ /g, "&nbsp;");  
	  		s = s.replace(/\'/g, "&#39;");  
	  		s = s.replace(/\"/g, "&quot;");  
	  		s = s.replace(/\n/g, "<br>");  
	  		return s;
		}
	}
	function query(name, href) {
	    var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
	    href = href || location.href;
	    if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	    return "";
	}
	window.scheduleShare = self;
})();




