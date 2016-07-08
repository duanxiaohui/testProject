/**
 * 
 * @authors Huangyi
 * @date    2014-07-31 11:56:38
 * @version 0.0.0.1
 */
(function(){
    var rRoute, rFormat;

    $.route = function(obj, path) {
        obj = obj || {};
        var m;
        (rRoute || (rRoute = /([\d\w_]+)/g)).lastIndex = 0;
        while ((m = rRoute.exec(path)) !== null) {
            obj = obj[m[0]];
            if (obj == undefined) {
                break
            }
        }
        return obj
    };

    $.format = function() {
        var args = Array.prototype.slice.call(arguments), str = String(args.shift() || ""), ar = [], first = args[0];
        args = $.isArray(first) ? first : typeof(first) == 'object' ? args : [args];
        $.each(args, function(i, o){
            ar.push(str.replace(rFormat || (rFormat = /\{([\d\w\.]+)\}/g), function(m, n, v){
                v = n === 'INDEX' ? i : n.indexOf(".") < 0 ? o[n] : $.route(o, n);
                return v === undefined ? m : ($.isFunction(v) ? v.call(o, n) : v)
            }));
        });
        return ar.join('');
    };

    function getUserInfo() {
        if(/android/i.test(navigator.userAgent)) {
            self.data.token = AliansBridge.getToken();
        } else {
            setTimeout(function() {
                self.data.token = document.getElementById('TOKEN').value;
            }, 500);
        }
    }

    // getUserInfo();

	var baiduMapUrl = ["http://api.map.baidu.com/staticimage", "?width=281","&height=160",
					"&zoom=14", "&markerStyles=m,A,0xff0000"].join("");
    var tmpl = '<li>\
                    <div class="comments_title e_clear">\
                        <span>{username}</span><p class="comments_time">{created}</p>\
                    </div>\
                    <div class="comments_txt e_clear">\
                        <p>{content}<a href="javascript:;" class="reply" style="display:none;">回复</a></p>\
                    </div>\
               </li>';
	
	var self = {
		render: function(data, container, showFooter){
			
			self.data = data;
			var calendar_type;
			if(data.calendarType === 'public'){
				calendar_type="publicSchedule"
			}else if(data.calendarType === 'group'){
				calendar_type="groupCalendar"
			}else{
				calendar_type="personalSchedule"
			}
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

			// self.renderFooter(data.calendarType)
			footer.init({
				type:calendar_type,
				cocourl:{
					ios:'coco52://365rili.com/schedule?scheduleUuid='+self.data.uuid+'&cid='+self.data.cid,
					android:'coco://365rili.com/schedule?scheduleUuid='+self.data.uuid+'&cid='+self.data.cid
				}
			});

			self.resize();
			(function () {
				var s = $('.cares, .schedule_more_btn');
				s.length&&s.show();
			})()
			
			self.bindEvent();
		},
		renderHeader: function(data){
			if(data.calendarType === 'public'){
				var div = $('<div class="schedule_top">\
								<div class="public_schedule_top">\
									<h3></h3>\
									<div id="image_wrapper"></div>\
								 </div>\
								 <h4 class="schedule_title"></h4>\
								 <div class="btns e_clear">\
								 	<a href="javascript:;" class="public_btn">加提醒</a>\
								 </div>\
							</div>');
				div.find('h3').html(data.calendarName);
				div.find('h4').html(data.scheduleTitle);
				self.container.append(div);

				var pics = data.pics;

				if(data.pics !== "" && data.pics !== "null"){
					$("#image_wrapper").Slide({
						pics: pics
					});
				}
                $('.public_schedule_top h3').hide();
                $('title').text(data.calendarName);
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
				div.find('.schedule_txt').html(self.htmlEncode(data.scheduleTitle));
				self.container.append(div);
			}
		},
		renderContent: function(data){
			if(data.dateline1){
				var schedule_time_div = $('<div class="schedule_time e_clear"><div class="remind"><span></span></div></div>');
				schedule_time_div.find('span').html(data.dateline1);
				self.container.append(schedule_time_div);
			}

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


				self.container.append(schedule_detail_div);


				var pics = data.pics;

				if(data.pics !== "" && data.pics !== "null"){
					$(".schedule_images").Slide({
						pics: pics,
						index: false,
						scroll: false
					});
				}

			} else {
                $('.schedule_images').css('display', 'none');
            }
    		if(data.location != "" && data.location != "null" && data.location != null){
    			var location_div = $('<div class="schedule_map arrow">\
    									<p></p>\
    									<div class="map">\
    										<a href="javascript:;" class="map_link"><img alt="" class="map_image"></a>\
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
				});
				self.container.append(location_div);
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
				$('#js-mapClose').on('click', function () {
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
                $('.arrow').on('click', function() {
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
                    // var url = ['http://api.map.baidu.com/geocoder?address=', encodeURIComponent(address), '&output=html&src=365rili|365rili'].join('');
                    // $('.map_link').attr('href', url);
                });
			}
			if(data.url != "null" && data.url != "" && data.url != null){
				var _url = $('<div class="schedule_url"><a href="'+data.url+'" target="_blank" style="color:#a4aaaf;"><p>查看详情:'+data.url+'</p></a></div>');
				self.container.append(_url);
			}
			if(data.calendarType !== "public"){
				var sourceStr;
				var btnStr;
				if(data.calendarType == "group"){
					sourceStr = "该日程来自【"+data.calendarName+"】群组";
					if(data.isMember){
						if(data.isMember.toString() == 'true'){
							btnStr = '添加提醒';
						}
						else{
							btnStr = '加入该群组';
						}
					}
					else{
						btnStr = '加入该群组';
					}
					self.container.append('<div class="schedule_source">'+sourceStr+'</div>');
					self.container.append('<div class="group_btn"><a href="javascript:;">'+btnStr+'</a></div>');
					/**
					 * 群组详情的提醒按钮连带加入都隐藏掉，不知道未来还用不用，所以不删逻辑
					 */
					$('.group_btn').hide();
				}
				else{
					sourceStr = "";
					btnStr = "创建一条我的日程";
					self.container.append('<div class="schedule_source">'+sourceStr+'</div>');
					self.container.append('<div class="personal_btn"><a href="javascript:;">'+btnStr+'</a></div>');
				}
			}
			/**
			 * 2015-03-11
			 * 白色列表版去除
			 */
            // if($('.bg').length < 1) {
            //     $('body').append('<div class="bg"><img src="'+data.bgu+'" /></div><div class="mask_bg" style="height:100%;"></div>');
            // }
            if(data.calendarType == "public") {
            	if(self.data.on.toString() == 'on' || self.data.on.toString() == 'true') {
	            	$('.public_btn').text('已添加提醒').addClass('public_btn_on');
	            }
                if(data.comments == '' || data.comments == null) return;
                var commentDiv = $('<div class="comments">\
                                        <h3>全部评论</h3>\
                                        <div class="comments_content">\
                                            <ul>\
                                            </ul>\
                                        </div>\
                                   </div>');
                //<a href="javascript" class="view_all_comments">查看全部评论</a>\
                self.container.append(commentDiv);
                $('.view_all_comments').on('click', function() {
                    event.preventDefault();
                    var url = window.location.host + "/bbs365/getTopicBySchedule.do?sid=" + self.data.sid + "&pageNum=0&pageCount=2"; //&token=" + G.token;
                    location.href = url;
                });
                var comments = JSON.parse(data.comments);
                if(!comments || comments.length < 1) return $('.comments').hide();
                $('.comments_content ul').html($.format(tmpl, $.map(comments, function(o) {
                    o.created = self.formatTime(o.created);
                    return o;
                })));
            }
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
			// var sUserAgent = navigator.userAgent.toLowerCase();
			// var bIsIpad = sUserAgent.match(/ipad/i) == "ipad"; 
			// var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			// var bIsAndroid = sUserAgent.match(/android/i) == "android";
			// var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
			// var bIsWeibo = sUserAgent.match(/weibo/i) == "weibo";
			// var bIsqq = sUserAgent.match(/qq/i) == "qq";
			// var cocoUrl; 
			// if(self.data.calendarType == "private"){
   //              cocoUrl = 'coco://365rili.com/schedule?scheduleUuid=' + self.data.uuid;
			// } else if(self.data.calendarType == 'public') {
   //              cocoUrl = 'coco://365rili.com/schedule?scheduleUuid=' + self.data.uuid +'&cid='+self.data.cid;
   //          } else{
   //              cocoUrl = 'coco://365rili.com/subscribe?calendarID=' + self.data.cid + '&calendarType=' + self.data.calendarType;
   //          }

			// function callback(evt){
			// 	if(bIsWeixin){
			// 		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
			// 		return;
			// 	}
			// 	location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609"
			// }
			// $(".down_btn").on("tap", function(evt){
			// 	if(bIsWeixin){
			// 		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
			// 		return;
			// 	}
			// 	self.redirectApp(cocoUrl, bIsIpad||bIsIphoneOs);
			// });
			$(".personal_btn").on("tap", function(evt){
				app.open('coco://365rili.com/add',app.getUa.ios,app.showTip)
			});
			$('.group_btn').on('tap', function () {
				var key = split()['path'].split('/')[1];
				app.open({
					ios:'coco53://365rili.com/calendar?cid='+self.data.cid+'&key'+ key +'&action=join',
					android:'coco://365rili.com/calendar?cid='+self.data.cid+'&key'+ key +'&action=join'
				},app.getUa.ios,function(){
					if(self.data.isMember){
						//判断是否登录并成为会员
						if(self.data.isMember.toString() == 'true'){
							app.showTip(function () {
	                    		window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
	                    	});
						}else{
							if(app.getUa.weixin){
								location.href = ["/wx/login.do?redURL=http://", location.host, "/schedule/joinRedirect.do?key=", key].join('');
							}
							else{
								location.href = ["/pages/login/mlogin.html?opt=noregist&redURL=", "/schedule/joinRedirect.do?key=", key].join('');
							}
						}
					}else{
						if(app.getUa.weixin){
							location.href = ["/wx/login.do?redURL=http://", location.host, "/schedule/joinRedirect.do?key=", key].join('');
						}
						else{
							location.href = ["/pages/login/mlogin.html?opt=noregist&redURL=", "/schedule/joinRedirect.do?key=", key].join('');
						}
					}
				})
			})

            function split (url) {
                var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
                url = url || location.href;
                var arr = parse_url.exec(url);
                return {
                    scheme: arr[1],
                    slash: arr[2],
                    host: arr[3],
                    port: arr[4] || 80,
                    path: arr[5],
                    query: arr[6],
                    hash: arr[7]
                }
            }
            var _url = split(window.location.href);
            var isposting = false;
            $(".public_btn").on("click", function(evt){
     //            if(bIsWeixin) {
     //            	if(self.data.on){
					// 	return;
					// }
     //                if (isposting) {
     //                    return;
     //                };
     //                if(self.data.isLogin.toString() == 'true'){
     //                    location.href = ['/schedule/followFromH5.do', '?', ['cid=' + self.data.cid, 'uuid=' + self.data.uuid].join('&')].join('');
     //                }else{
     //                    location.href = ["/wx/login.do?redURL=/", 'schedule/followFromH5.do', '?', encodeURIComponent(['cid=' + self.data.cid, 'uuid=' + self.data.uuid].join('&'))].join('');
     //                }
     //            } else {
     //                self.redirectApp(cocoUrl, bIsIpad||bIsIphoneOs, function () {
     //                	self.showTip(function () {
     //                		window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
     //                	});
     //                });
     //            }
     //            
     //            公众日程更改为跳转入添加成功页
				window.name = '{"isAppInstalled" : '+(query('isappinstalled').toString() == '1')+'}';
				if(app.getUa.weixin){
					if(self.data.on){
						return;
					}
					if(self.data.isLogin.toString() == 'true'){
						window.location.href = '/share/add_success.html?cid='+self.data.cid+'&uuid=' + self.data.uuid + '&from=' + query('from') + '&isappinstalled=' + query('isappinstalled');
						return;
					}
					window.location.href = "/wx/login.do?redURL=" + encodeURIComponent('/share/add_success.html?cid='+self.data.cid+'&uuid=' + self.data.uuid + '&from=' + query('from') + '&isappinstalled=' + query('isappinstalled'));
				}else{
					app.open(
     					{
							ios:'coco52://365rili.com/schedule?scheduleUuid='+self.data.uuid+'&cid='+self.data.cid+'&action=alarm',
							android:'coco://365rili.com/schedule?scheduleUuid='+self.data.uuid+'&cid='+self.data.cid+'&action=alarm'
						},
						app.getUa.ios);
				}
            });

		},
		// redirectApp: function(url, ios, callback){
		// 	var iframe = document.createElement("iframe");
		// 	iframe.style.display = "none";
		// 	iframe.src = url;
		// 	document.body.appendChild(iframe);
		// 	var startTime = new Date().getTime();
		// 	var interval = setTimeout(function(){
		// 		if(new Date().getTime() - startTime > 1200 && (ios)){
		// 			return;
		// 		}
		// 		if(!callback){
		// 			location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609"
		// 		}else{
		// 			callback();
		// 		}
		// 	}, 1000)
		// 	window.onblur= function(){
		// 		clearTimeout(interval);
		// 	};
		// },
		// showTip: function(callback){
		// 	if($('.tips_container').length > 0){
		// 		$('.tips_container').css('display', 'block');
		// 	}else{
		// 		var tip = $('<div class="tips_container">\
		// 			<div class="tips_layer">\
		// 				<h3></h3>\
		// 				<p></p>\
	 //        			<a href="javascript:;" class="layer_btn">立即使用</a>\
	 //    			</div>\
	 //    			<div class="mask"></div>\
	 //    		   </div>');
		// 		var sTip;
		// 		if(self.data.calendarType == "public"){
		// 			sTip = '请使用365日历<br/>为感兴趣的日程添加提醒';
		// 		}else if(self.data.calendarType == "group"){
		// 			sTip = '立即使用365客户端<br/>申请加入该群组';
		// 		}else{
		// 			sTip = '快使用365日历记录你的日程吧，从此重要事件不再错过！';
		// 		}
		// 		tip.find('h3').html(sTip);
		// 		$('body').append(tip);
		// 		tip.find(".layer_btn").on("tap", callback);
				
		// 		tip.find(".mask").height($(window).height()).on("tap", function(e){
		// 			$(".tips_container").css("display", "none");
		// 		})
		// 	}
		// },
        formatTime: function(time) {
        	var d = new Date(parseInt(time));
            return d.getFullYear().toString() + '年' + (d.getMonth() + 1) + '月' + d.getDate().toString() + '日 ' + d.getHours().toString() + ':' + d.getMinutes().toString() + ':' + d.getSeconds().toString();
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
	//return;
	window.scheduleShare = self;
})();