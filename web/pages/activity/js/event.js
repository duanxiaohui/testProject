/**
 * 
 * @authors huangyi
 * @date    2014-09-09 16:51:57
 * @version $Id$
 */

(function(){
	var baiduMapUrl = ["http://api.map.baidu.com/staticimage", "?width=281","&height=160",
					"&zoom=14", "&markerStyles=m,A,0xff0000"].join("");
	var self = {
		render: function(data, container, showFooter){
			self.data = data;			
			//package data
			if(data.scheduleTitle.length > 24){
				if(data.scheduleDesc === "null" || data.scheduleDesc === null){
					data.scheduleDesc = data.scheduleTitle;
				}else{
					data.scheduleDesc = data.scheduleTitle + data.scheduleDesc;
				}
			}
			
			self.container = container;
			self.container.empty();			
			self.renderHeader(data);
			self.renderContent(data);
			self.renderBtn(data);
			// showFooter && self.renderFooter(data.calendarType)
			if(showFooter) {
				footer.init({
					type:'activityCalendar',
					cocourl:{
						ios:'coco://365rili.com/scheduleUuid='+G.uuid+'&cid='+G.calendarId,
						android:'coco://365rili.com/scheduleUuid='+G.uuid+'&cid='+G.calendarId
					}
				});
				self.resize();
			}
			
			var onlyInClient = false;
			if(arguments.length > 3) {
				onlyInClient = arguments[3];
			}
			self.bindEvent(onlyInClient);
		},
		renderHeader: function(data){
			var div;
			if(G.from=="client"){
				div= $('<div class="schedule_top">\
							<div class="public_schedule_top">\
								<div id="image_wrapper"></div>\
							</div>\
							<h4 class="schedule_title"></h4>\
						</div>');
			}else{
				div= $('<div class="schedule_top">\
							<div class="public_schedule_top">\
								<div id="image_wrapper"></div>\
							</div>\
							<h4 class="schedule_title"></h4>\
						</div>');
			}
			var h4_width = $(document).width() - 20;
			var h4_txt = txtNum(25,h4_width,18,2,data.scheduleTitle);
			div.find('h4').html(h4_txt.proTxt);
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsWeixin = sUserAgent.match(/micromessenger/i) == "micromessenger";
			self.container.append(div);
			var pics = data.pics;
			if(data.pics !== "" && data.pics !== "null"){
					$("#image_wrapper").Slide({
						pics: pics,
						proportion:true
					});
				}			
		},
		renderContent: function(data){
			//详情
			var schedule_detail_div = $('<div class="schedule_detail">\
											<p></p>\
											<a href="javascript:;" class="an_btn none">更多</a>\
											<div class="schedule_images">\
											</div>\
										</div>');
			
			if(data.scheduleDesc && data.scheduleDesc !== "null"){
				var pW = $(document).width() - 30;
				var pro_desc = txtNum(24,pW,16,3,data.scheduleDesc.replace(/\n/g, '<br>'));
				schedule_detail_div.find('p').html(pro_desc.proTxt);
				if(pro_desc.proTxt.indexOf("...") > 0){
					schedule_detail_div.find('p').css({
								"height":72 +"px"
							});
					schedule_detail_div.find('a.an_btn').removeClass("none");
					schedule_detail_div.find('a.an_btn').click(function () {
						if($(this).text() == "更多"){
							$(this).text("收起");
							schedule_detail_div.find('p').css({
								"height":pro_desc.defaultHeight +"px"
							}).off('webkitTransitionEnd webkitAnimationEnd');
							schedule_detail_div.find('p').html(data.scheduleDesc.replace(/\n/g, '<br>'))
						}else{
							$(this).text("更多");
							schedule_detail_div.find('p').css({
								"height":72 +"px"
							}).on('webkitTransitionEnd webkitAnimationEnd',function () {
								schedule_detail_div.find('p').html(pro_desc.proTxt);
							})
						
						}
					})
				}
				self.container.append(schedule_detail_div);
			}
			var person_count_div = $('<div class="person_count e_clear"><div class="count"><span></span></div></div>');
			person_count_div.find('span').html(data.joinedPerson);
			self.container.append(person_count_div);

			if(data.url !== "null" && data.url != null && data.url != ""){
				self.container.append('<div class="schedule_url"><a href="'+data.url+'" target="_blank" style="color:#444;"><p>查看活动详情</p></a></div>');
			}

			var schedule_time_div = $('<div class="schedule_time e_clear"><div class="remind"><span></span></div></div>');
			schedule_time_div.find('span').html(data.dateline1);
			self.container.append(schedule_time_div);

			if(data.dateline2 && data.dateline2 != "" && data.dateline2 != "null" && data.dateline2.trim() != "无重复"){
				if(data.calendarType !== "public"){
					self.container.append('<div class="repeat_div e_clear"><span>'+data.dateline2+'</span></div>');
				}
			}

			var _loc = $.trim(data.location);
    		if(_loc != "" && _loc != "null" && data.location != null){
    			var location_div = $('<div class="schedule_map arrow"><a href="javascript:;" class="map_link">查看地图</a><p></p>\
    									</div>');

				var index = data.location.indexOf("@");
				if(index > 0){
					var title = data.location.substr(0, index);
					var posAry = data.location.substr(index+1).split(",");
					var reversePos = posAry.reverse().join(",");
					var mapUrl = [baiduMapUrl, "&center=", reversePos, "&markers=", reversePos].join("");
					location_div.find(".schedule_map p").html(title);

				}else{
					var mapUrl = [baiduMapUrl, "&center=", data.location, "&markers=", data.location].join("");
					location_div.find(".schedule_map p").html(data.location);
				}

				self.container.append(location_div);
				/*地图按钮高度根据地图字数高度自适应*/
				// var mapH=location_div.find(".schedule_map p").height();
				// location_div.find(".schedule_map a.map_link").height(mapH+22)
			}
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
				$('#js-mapClose').on('tap', function () {
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
                $('.arrow').on('tap', function() {
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
			
			
            // if($('.bg').length < 1) {
            //     self.container.after('<div class="bg"><img src="'+data.bgu+'" /></div><div class="mask_bg"></div>');
            // }
		},
		renderBtn:function () {
			var btn = $('<div class="public_btn_div">\
								<a href="javascript:;" class="client_join_btn join_btn"><i></i><span>' + G.joinButton + '</span></a>\
								<a href="javascript:;" class="active_share"><i></i><span>分享</span></a>\
							</div>');
			self.container.append(btn);
			if(G.orderId != 0){
				btn.find(".join_btn").addClass("joined").html('<i></i><span>' + G.joinedButton + '</span>');
			}else{
				if(G.enrollFull){
					btn.find(".join_btn").addClass("expired").html("名额已满");
				}
			}
			if(G.isExpire){
				btn.find(".join_btn").addClass("expired").html("已过期");
			}
			
		},
		resize: function(){
			self.container.css("min-height", window.innerHeight - 50 + "px");
			// $(".bg").height(window.innerHeight);
			// //$(".mask").height(window.innerHeight);
			// $(".mask_bg").height(document.body.scrollHeight);
		},
		bindEvent: function(onlyInClient){

			$(".join_btn").on("tap", function(evt){
				if(G.isExpire || G.enrollFull){
					return;
				}
				/**
				 *  活动在非微信环境下暂时不允许访问，类似个人日程分享，以后产品变动需要修改此处
				 *  author : 张路
				 *  date   : 2014-11-06
				 */
				if(!app.getUa.weixin){
					location.href = '/pages/pleaseOpenWithWX.html'
					return;
				}
				
				
				if(G.isLogin){
					if(G.orderId == 0){
//						// 判断是否已报名
//						if(app.getUa.weixin) {
//							self.checkOrder();
//						} else {
//							self.checkOrderWithToken();
//						}
						location.href = ["/event/contract.do?eventId=", G.eventId].join('');
					}else{
						location.href = ["/event/orderDetail.do?orderId=", G.orderId].join('');
					}
				}else{
					if(app.getUa.weixin){
						location.href = ["/wx/login.do?redURL=", "http://", location.host, "/event/shareRedirect.do?eventId=", G.eventId].join('');
					}else{
						location.href = ["/pages/login/mlogin.html?redURL=", "/event/shareRedirect.do?eventId=", G.eventId].join('');
					}
				}
			});
			$('.active_share').on('tap',function () {
				var shareTips = $('<div class="shareTips"></div>');
				$('body').append(shareTips);
				shareTips.height($(window).height());
				shareTips.on('tap',function () {
					$(this).fadeOut('fast',function () {
						$(this).remove();
					})
				})
			})
		},
		
		checkOrderWithToken: function(){
			try{
				try{
					clearTimeout(mar)
				}
				catch(e){}
			}
			catch(e){}
			var url, headers;
			url = "/event/offlineCheckOrder.do?eventId=" + G.eventId;
			getTokenByCoco(url, function (headers) {	
				$.ajax({
					url: url,
					type: "GET",
					dataType:"json",
					headers:headers,
					success: function(data){
						if(data.state == "ok"){
							location.href = ["/event/orderDetail.do?orderId=", data.orderId].join('');
						} else {
							location.href = ["/event/contract.do?eventId=", G.eventId].join('');
						}
					}
				})
			});
		},
		checkOrder: function(){
			$.ajax({
				url: "http://www.365rili.com/event/offlineCheckOrder.do?eventId=" + G.eventId,
				type: "GET",
				dataType:"json",
				success: function(data){
					if(data.state == "ok"){
						location.href = ["/event/orderDetail.do?orderId=", data.orderId].join('');
					} else {
						location.href = ["/event/contract.do?eventId=", G.eventId].join('');
					}
				}
			})
		},

		showTip: function(callback){
			if($('.tips_container').length > 0){
				$('.tips_container').css('display', 'block');
			}else{
				var tip = $('<div class="tips_container">\
					<div class="tips_layer">\
						<h3>温馨提示</h3>\
						<p></p>\
	        			<a href="javascript:;" class="layer_btn">立即使用</a>\
	    			</div>\
	    			<div class="mask"></div>\
	    		   </div>');
				var sTip;
				if(self.data.calendarType == "public"){
					sTip = '请使用365日历，为感兴趣的日程添加提醒';
				}else if(self.data.calendarType == "group"){
					sTip = '立即使用365客户端，申请加入该群组';
				}else{
					sTip = '快使用365日历记录你的日程吧，从此重要事件不再错过！';
				}
				tip.find('p').html(sTip);
				$('body').append(tip);
				tip.find(".layer_btn").on("tap", callback);
				
				tip.find(".mask").on("tap", function(e){
					$(".tips_container").css("display", "none");
				})
			}
		}
	}

	function args(success) {
        return {
            iniL: 30,
            iniT: 100,
            eCallback: function(tPoint, d){
            	var _this = tPoint.self,
		            _inner = _this.children(),
		            singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
		            innerW = singleW * tPoint.total;
		            count = tPoint.count,
		            d = d ? d : tPoint.direction;

		        switch (d) {
		            case "left":
		                count -= (parseInt(-tPoint.mX / singleW) + 1)
		                break;
		            case "right":
		                count += (parseInt(tPoint.mX / singleW) + 1)
		        }

		        if (count >= 1) {
		            count = 0;
		        }
		        if (count <= -tPoint.total) {
		            count = (typeof _autoSlide != "undefined") ? 0 : -tPoint.total + 1;
		        }

		        var offset = count * innerW / tPoint.total;

		        //判断右边界
		        if((innerW + offset) < _inner.width()){
		        	offset = - innerW + _inner.width() + parseInt(_inner.children().css('margin-right'));
			        //修复count
			        count = -(tPoint.total - parseInt(_inner.width() / singleW) - 1);
		        }

		        //判断左边界
		        if(innerW < _inner.width()){
		        	offset = 0;
		        	count = 0;
		        }

		        transformBox(_inner, offset, tPoint.speed, tPoint.has3d);

		        tPoint.setAttr("count", count);
		        tPoint.setAttr("offset", offset);

		        success && success(tPoint);
            },
            mCallback: function(tPoint) {
                var _this = tPoint.self,
                    _inner = _this.children(),
                    singleW = (_inner.children().width() + parseInt(_inner.children().css('margin-left')) + parseInt(_inner.children().css('margin-right'))),
                    innerW = singleW * tPoint.total;
                var offset = tPoint.mX + tPoint.offset;
                transformBox(_inner, offset, 0, tPoint.has3d);
            }
        }
        
    }

    function transformBox(obj, value, time, has3d) {
        var time = time ? time : 0;
        transl = has3d ? "translate3d(" + value + "px,0,0)" : "translate(" + value + "px,0)";
        obj.css({
            '-webkit-transform': transl,
            '-webkit-transition': time + 'ms linear'
        });
    }
	//return;
	window.scheduleShare = self;
})();

function getTokenByCoco(url, callBack) {
	if(!isAndroid && callType == "wechat") {
		callBack({});
		return;
	}
	var mar = setTimeout(function() {
		try {
			var t = '';
			var tSource = (new Base64()).decode(t);
			if (tSource.indexOf('%') == -1) {
				callBack({
					'Authorization' : 'Basic ' + t
				});
			} else {
				callBack({
					'x-365rili-key' : t
				});
			}
		} catch (e) {
			callBack({});
		} 
	}, 500); 
	
	try {
		app.call({
			action : 'getEncryptHeaders',
			params : [ {
				name : 'url',
				value : url
			} ],
			callback : function(headers) {
				try {
					clearTimeout(mar);
				} catch (e) {
				}
				headers = JSON.parse(headers);
				callBack(headers);
			}
		});
	} catch (e) {
		try {
			app.call({
				action : 'getToken',
				callBack : function(token) {
					try {
						clearTimeout(mar);
					} catch (e) {
					}
					var headers = {
						'x-365rili-key' : token
					};
					callBack(headers);
				}
			});
		} catch (e) {
			
		}
	}
}
function txtNum (linght,width,fontSize,linNum,targetxt) {
	//需要显示文字的高度
	var totalH = linght * linNum; 

	var tempDiv = window.tempDiv = $('<p style="position:absolute; top:-999px; width:'+width+'px; line-height:'+linght +'px; font-size:'+fontSize+'px"></p>').appendTo('body');
		tempDiv.html(targetxt);
		var s = tempDiv.height();

	while (tempDiv.height() > totalH) {
        tempDiv.text(tempDiv.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."))
    }
    return {
    	proTxt:tempDiv.text(),
    	defaultHeight:s
    }
}