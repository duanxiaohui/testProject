/**
 * 
 * @authors Huangyi
 * @date    2014-07-31 11:56:38
 * @version 0.0.0.1
 */
(function(){
	var baiduMapUrl = ["http://api.map.baidu.com/staticimage", "?width=281","&height=160",
					"&zoom=14", "&markerStyles=m,A,0xff0000"].join("");
	var self = {
		render: function(data, container, showFooter){
			self.data = data;
			//test pics
			// data.calendarType = "public";
			// data.pics = "http://cocoimg.365rili.com/schedule_pics/default/9b929c45-5e25-43e3-8185-1d2f49e8e6eb.jpg,http://cocoimg.365rili.com/schedule_pics/default/02e1e118-bbf8-4bfd-bc26-9a20982b76cb.jpg,http://cocoimg.365rili.com/schedule_pics/default/3144fd59-4a47-4164-bd06-5f6e12c353c1.jpg";
			//"{"cid":245837352,"isSpecial":false,"calendarType":"group","calendarName":"育儿亲子日历","calendarDesc":"","scheduleTitle":"【亲子游戏】用玩具逗宝宝玩吧","scheduleDesc":"\n\n　  妈妈站在宝宝的小床前，对宝宝说：“宝宝看，好漂亮的玩具啊！快来抓住它。”边说边协助宝宝用小手去抓住玩具。妈妈在鼓励宝宝抓握的同时，念儿歌给宝宝听：小玩具，真美丽，抓一抓，踢一踢，抓到手里笑嘻嘻。 　　\n　　游戏目的：培养宝宝手-眼-脑的协调能力。","creator":"匿名","bgu":"null","url":"null","location":"null","dateline1":"2014-07-01 全天","dateline2":"","lunar_time":"null","pics":""}"
			//data.dateline2 = "周一到周五重复";

			//package data
			if(data.scheduleTitle.length > 24 && data.calendarType === "public"){
				if(data.scheduleDesc === "null" || data.scheduleDesc === null){
					data.scheduleDesc = data.scheduleTitle;
				}else{
					data.scheduleDesc = data.scheduleTitle + data.scheduleDesc;
				}
				var index = data.scheduleTitle.indexOf('\n');
				if(index > 0){
					data.scheduleTitle = data.scheduleTitle.substr(0, index > 24 ? 24 : index);
				}else{
					data.scheduleTitle = data.scheduleTitle.substr(0, 24);
				}
			}
			
			self.container = container;
			self.container.empty();			
			self.renderHeader(data);
			self.renderContent(data);
			showFooter && self.renderFooter(data.calendarType)
			self.resize();

			self.bindEvent();
		},
		renderHeader: function(data){
			if(data.calendarType === 'public'){
				var div = $('<div class="public_schedule_top">\
								<h3></h3>\
								<div id="image_wrapper"></div>\
								<h4></h4>\
							 </div>\
							 <a href="javascript:;" class="public_btn"><div class="btn_inline_box"><span class="btn_bg"></span><span class="btn_txt">到时提醒我</span></div></a>');
				div.find('h3').html(data.calendarName);
				div.find('h4').html(data.scheduleTitle);
				self.container.append(div);

				var pics = data.pics;

				if(data.pics !== "" && data.pics !== "null"){
					$("#image_wrapper").Slide({
						pics: pics
					});
				}
			}else{
				var div = $('<div>\
	    						<div class="schedule_source_calendar"></div>\
    							<div class="schedule_txt"></div>\
	    					</div>');
				var groupTitle;
				if(data.calendarType == "group"){
					groupTitle = "[" + data.calendarName + "]";
				}else{
					groupTitle = "[" + data.creator + "]" + "的日程";
				}
				div.find('.schedule_source_calendar').html(groupTitle);
				div.find('.schedule_txt').html(data.scheduleTitle.replace(/\n/g, '<br>'));
				self.container.append(div);
			}
		},
		renderContent: function(data){
			var schedule_time_div = $('<div class="schedule_time e_clear"><div class="remind"><span></span></div></div>');
			schedule_time_div.find('span').html(data.dateline1);
			self.container.append(schedule_time_div);

			if(data.dateline2 && data.dateline2 != "" && data.dateline2 != "null" && data.dateline2.trim() != "无重复"){
				if(data.calendarType !== "public"){
					self.container.append('<div class="repeat_div e_clear"><span>'+data.dateline2+'</span></div>');
				}
			}

			
			var schedule_detail_div = $('<div class="schedule_detail">\
											<p></p>\
											<div class="schedule_images">\
												<ul></ul>\
											</div>\
										</div>');
			if(data.scheduleDesc && data.scheduleDesc !== "null"){
				schedule_detail_div.find('p').html(data.scheduleDesc.replace(/\n/g, '<br>'));
				self.container.append(schedule_detail_div);
			}
			if(data.pics !== "" && data.calendarType !== "public"){
				//render images
				var picAry = data.pics.split(',');
				var picnum = picAry.length;
				schedule_detail_div.find('.schedule_images ul').width(picnum*83);

				for(var i in picAry){
					schedule_detail_div.find('.schedule_images ul').append("<li><a href='"+picAry[i]+"'><img src='"+picAry[i]+"' class='group_image'/></a></li>");
				}


				self.container.append(schedule_detail_div);
					$('.schedule_images img').on('load',function(){
				 	 var imgw =$(this).width(), imgh = $(this).height();
		            if(imgw>imgh){
		                $(this).css('height','100%');
		            }else{
		                $(this).css('width','100%');
		            }
				});

			} else {
                $('.schedule_images').css('display', 'none');
            }
			
    		if(data.location != "" && data.location != "null" && data.location != null){
    			var location_div = $('<div class="schedule_map">\
    									<p></p>\
    									<div class="map">\
    										<img alt="" class="map_image">\
    									</div>\
    								  </div>');
				var index = data.location.indexOf("@");
				if(index > 0){
					var title = data.location.substr(0, index);
					var posAry = data.location.substr(index+1).split(",");
					var reversePos = posAry.reverse().join(",");
					var mapUrl = [baiduMapUrl, "&center=", reversePos, "&markers=", reversePos].join("");
					location_div.find(".schedule_map p").html(title);
					location_div.find(".schedule_map img").attr("src", mapUrl);	
				}else{
					var mapUrl = [baiduMapUrl, "&center=", data.location, "&markers=", data.location].join("");
					location_div.find(".schedule_map p").html(data.location);
					location_div.find(".schedule_map img").attr("src", mapUrl);
				}
				location_div.find(".schedule_map img").on("load", function(){
					if(this.naturalWidth == 1){
						$(this).parent().hide();
					}
				})
				self.container.append(location_div);
			}
			if(data.url !== "null" && data.url != null){
				self.container.append('<div class="schedule_url"><a href="'+data.url+'" target="_blank" style="color:#444;"><p>查看详情:'+data.url+'</p></a></div>');
			}
			if(data.calendarType !== "public"){
				var sourceStr;
				var btnStr;
				if(data.calendarType == "group"){
					sourceStr = "该日程来自["+data.calendarName+"]群组";
					btnStr = "进入该群组"
					}else{
					sourceStr = "";
					btnStr = "参与该日程";
				}
				self.container.append('<div class="schedule_source">'+sourceStr+'</div>');
				self.container.append('<div class="personal_btn"><a href="javascript:;" class="on"><span class="join_icon"></span><span class="join_txt">'+btnStr+'</span></a></div>');
				self.container.append('<div class="join_user">庆爷、冷爷、小雨已参与该日程</div>');
			}
            if($('.bg').length < 1) {
                self.container.after('<div class="bg"><img src="'+data.bgu+'" /></div><div class="mask_bg"></div>');
            }
		},
		renderFooter: function(type){
			var slogon;
			if(type === "public"){
				slogon = "公众日历-发现更多有趣日程";
			}else if(type === "group"){
				slogon = "群组日历-和小伙伴们共享日程";
			}else{
				slogon = "让你每一天更称心";
			}
			$("body").append('<div class="share_footer">\
    							<a href="javascript:;" class="down_btn">立即使用</a>\
     							<div class="logo"><a href="javascript:;"></a></div>\
    							<p>'+slogon+'</p>\
    						  </div>');
		},
		resize: function(){
			self.container.css("min-height", window.innerHeight - 50 + "px");
			//已经用calc代替js计算高度
			//$(".bg").height(window.innerHeight);
			//$(".mask").height(window.innerHeight);
			//$(".mask_bg").height(window.innerHeight);
		},
		bindEvent: function(){
			//根据useragent判断当前的设备类型
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
			var bIsWeibo = sUserAgent.match(/weibo/i) == "weibo";
			var bIsqq = sUserAgent.match(/qq/i) == "qq";
			var cocoUrl; 
			if(self.data.calendarType == "private"){
				cocoUrl = 'coco://365rili.com/schedule';
			}else{
				cocoUrl = 'coco://365rili.com/subscribe?calendarID=' + self.data.cid + '&calendarType=' + self.data.calendarType;
			}

			function callback(evt){
				if(bIsWeixin){
					location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
					return;
				}
				location.href = self.data.isSpecial ?  
					"http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609" :
					'http://www.365rili.com/newwap/location_coco.html';	
			}
			$(".down_btn").on("tap", function(evt){
				if(bIsWeixin){
					location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
					return;
				}		
				self.redirectApp(cocoUrl, bIsIpad||bIsIphoneOs);
			});
			$(".public_btn, .personal_btn").on("tap", function(evt){
				if(bIsWeixin){
					self.showTip(callback);
					return;
				}
				self.redirectApp(cocoUrl, bIsIpad||bIsIphoneOs, function(){
					self.showTip(callback);
				});
			})

		},
		redirectApp: function(url, ios, callback){
			var iframe = document.createElement("iframe");
			iframe.style.display = "none";
			iframe.src = url;
			document.body.appendChild(iframe);
			var startTime = new Date().getTime();
			var interval = setTimeout(function(){
				if(new Date().getTime() - startTime > 1200 && (ios)){
					return;
				}
				if(!callback){
					location.href = self.data.isSpecial ?  
								"http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609" :
								'http://www.365rili.com/newwap/location_coco.html';	
				}else{
					callback();
				}
			}, 1000)
			window.onblur= function(){
				clearTimeout(interval);
			};
		},
		showTip: function(callback){
			if($('.tips_container').length > 0){
				$('.tips_container').css('display', 'block');
			}else{
				var tip = $('<div class="tips_container">\
					<div class="tips_layer">\
						<h3></h3>\
						<p></p>\
	        			<a href="javascript:;" class="layer_btn">立即使用</a>\
	    			</div>\
	    			<div class="mask"></div>\
	    		   </div>');
				var sTip;
				if(self.data.calendarType == "public"){
					sTip = '请使用365日历<br/>为感兴趣的日程添加提醒';
				}else if(self.data.calendarType == "group"){
					sTip = '立即使用365客户端<br/>申请加入该群组';
				}else{
					sTip = '快使用365日历记录你的日程吧，从此重要事件不再错过！';
				}
				tip.find('h3').html(sTip);
				$('body').append(tip);
				tip.find(".layer_btn").on("tap", callback);
				
				tip.find(".mask").on("tap", function(e){
					$(".tips_container").css("display", "none");
				})
			}
		}
	}

	//return;
	window.scheduleShare = self;
})();