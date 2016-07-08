/**
 * 
 * @authors 张明臣 (vest0804@gamil.com)
 * @date    2014-10-25 10:49:18
 * @version 1.0
 */
function copyTo (ce, e) {
    for (var i in ce) {
        if (typeof i === 'undefined') continue;
        if (typeof ce[i] == 'object') {
            e[i] = {};
            if (ce[i] instanceof Array) e[i] = [];
            copyTo(ce[i], e[i]);
            continue;
        }
        e[i] = ce[i];
    }
}
function apply (object, config, defaults) {
    if (defaults) {
        apply(object, defaults);
    }
    if (object && config && typeof config === 'object') {
        var i, j;

        for (i in config) {
            object[i] = config[i];
        }
    }

    return object
}
function typeOf (o) {
    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
}
function template (s,o,defaults) {
    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
    var _html = [];
    defaults = defaults || {};
    if(typeOf(o) === 'array'){
        for (var i = 0, len = o.length; i < len; i++) {
            _html.push(template(s, o[i],defaults));
        };
    }else{
        var __o = {};
        copyTo(o, __o);
        apply(__o, defaults);
        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o) : (o[_o] || __o[_o] || '');
        }));
    }
    return _html.join('');
}
function getURLParameter(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		}

(function(){
	var cid=getURLParameter("calendarID");
	var self = {
		render: function(data, container, showFooter){
			self.data = data;
			var h=$(window).height() - 52;
			$(".group_main").height(h);
		
			self.renderContent();
			//showFooter && self.renderFooter()
			//self.bindEvent();
			footer.init({
				type:'groupCalendar',
				cocourl:'coco://365rili.com/subscribe?calendarID='+cid
			});
		},
		renderContent:function(){
			$.ajax({
				url: '/schedule/getGroupSchedules.do?calendarID='+cid,
				type: 'post',
				dataType: 'json',
				success: function(data){
					//修复微信下会自动点击第一个日程的bug
					setTimeout(function () {
						var divTmpl='<div class="group_schedule_list"></div>';
						var schedule_list_dl='<dl class="schedule_list_dl {$today}" time="{$start}"><dt>{$start}</dt>{$sch}</dl>';
						var schedules_list_dd='<dd class="e_clear">\
												<div class="schedule_remind">\
							    					<a href="javascript:;" data-uuid="{$uuid}" data-sid="{$id}"></a>\
							    				</div>\
							    				<div class="schedule_img"><a href="{$url}" class="group_detail_btn"><img src="{$thumb}" style="width: 100%;"></a></div>\
							    				<div class="sc_schedule_txt">\
							    					<a href="{$url}" class="group_detail_btn">\
								    					<div class="sc_schedule_txt_p figcaption">\
								    						<p class="title">{$title}</p>\
								    						<p class="h3"><span class="group_schedule_time">{$all}</span></p>\
								    					</div>\
							    					</a>\
							    				</div></dd>';
						if(!data.schedules){
							$(".group_main").html(divTmpl);
							var $h=$(window).height() - $(".header").height();
							$(".group_schedule_list").height($h);
							$(".group_schedule_list").addClass("none_content_box").html("群组的好友们创建了不少活动和日程哦~<br />快使用365日历加入大家的生活吧~")
						}
						else{
							var schlistarry=data.schedules.schlist;
							schlistarry.sort(function(a,b){
								return a.start - b.start;
							});
							schlistarry.length = 5;
							var map = {};
							var map2 = [];

							schlistarry.map(function (o) {
								var _d = new Date(+o.start);
								var start = _d.getFullYear() + '年' + (_d.getMonth() + 1) + '月' + _d.getDate() + '日';
								if(!map[start])
									map[start] = [];
								map[start].push(o);
							});

							for(var i in map){
								map2.push({
									today:'',
									start: i,
									sch: map[i]
								});
							}
							// for (var i = 0; i < map2.length; i++) {
							// 	map2[i].sch.sort(function (a, b) {
							// 		return a.start - b.start;
							// 	})
							// };
							$(".group_main").append(divTmpl);
							$(".group_schedule_list").html(template(schedule_list_dl, map2, {
								today:function(o, p, d, i){
									var _d = new Date(p.start.replace(/[年月]/g, '/').replace('日', ''));
									var _dday = _d.getDate(); 
									var today = (new Date()).getDate(); 
									if(_dday == today){
										return "today"
									}
								},
								start: function (o) {
									var _d = new Date(o.replace(/[年月]/g, '/').replace('日', ''));
									var now = (new Date()).getFullYear();
									var _year = _d.getFullYear();
									var _week = '一二三四五六日'.charAt(_d.getDay() - 1);

									if(_year == now){
										return [(_d.getMonth() + 1) + '月' + _d.getDate() + '日', '星期' + _week].join(' ');
									}
									return [_d.getFullYear() + '年' + (_d.getMonth() + 1) + '月' + _d.getDate() + '日', '星期' + _week].join(' ');
								},
								sch: function(o){
									return template(schedules_list_dd, o, {
										all: function(o, p){
											if(o){
												return '全天'
											}
											var start = p.start;
											var time = new Date(start);
											var m = time.getMinutes();
											return time.getHours() + ' : ' + (m < 10 ? ('0' + m) : m)
										},
										url: function(o, p){
											return "group_detail.html?cid="+p.cid+"&uuid=" + p.uuid+"&bgu=" + data.bgu+"&sid=" + p.id
										},
										thumb: function(o){
											if(!o){
												return 'http://www.365rili.com/share/images/new/default_avatar.jpg';
											}
											return o;
										},
										title: function (o) {
											return self.htmlEncode(o)
										},
										desc: function (o) {
											return self.htmlEncode(o)
										}
									});
								}
							}) + '<p class="group_list_more">查看更多日程</p>');
		//					$(".group_schedule_list").html($.format(schedule_list_dl,$.map(data,function(o){return {td:o.schlist[0].td}})));
						}
						self.bindEvent();
						footer.init({
							type:'groupCalendar',
							cocourl:'coco://365rili.com/subscribe?calendarID'+cid
					});
					},500);
				},
				error: function(){
					alert("您的网络有缓慢，请稍后重试")
				}
			});
		},
		bindEvent: function(){
			$('.group_list_more').on('tap', function () {
				// app.open('coco://365rili.com/subscribe?calendarID='+cid,
				// 	app.getUa.ios
				// );
				// if(app.getUa.weixin){
				// 	location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
				// 	return;
				// }
				// function callback(evt){
				// 	if(app.getUa.weixin){
				// 		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
				// 		return;
				// 	}
				// 	location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609"
				// }
				app.showTip('group');
			});
			// $('.schedule_remind').on('tap', function () {
			// 	if(bIsWeixin){
			// 		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
			// 		return;
			// 	}
			// 	var uuid = $(this).data('uuid');
			// 	var sid = $(this).data('sid');
			// 	function callback(evt){
			// 		if(bIsWeixin){
			// 			location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609";
			// 			return;
			// 		}
			// 		location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609"
			// 	}
			// 	self.redirectApp('coco://365rili.com/schedule?scheduleUuid=' + uuid +'&cid='+cid, bIsIpad||bIsIphoneOs, function(){
			// 			if($('.tips_container').length > 0){
			// 				$('.tips_container').css('display', 'block');
			// 			}else{
			// 				var tip = $('<div class="tips_container">\
			// 					<div class="tips_layer">\
			// 						<p></p>\
			// 	        			<a href="javascript:;" class="layer_btn">立即使用</a>\
			// 	    			</div>\
			// 	    			<div class="mask" style="height:'+$(window).height()+'px"></div>\
			// 	    		   </div>');
			// 				var sTip = '请使用365日历，为感兴趣的日程添加提醒';
			// 				tip.find('p').html(sTip);
			// 				$('body').append(tip);
			// 				tip.find(".layer_btn").on("tap", callback);
							
			// 				tip.find(".mask").on("tap", function(e){
			// 					$(".tips_container").css("display", "none");
			// 				})
			// 			}
			// 	});
			// });
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
	  		//s = s.replace(/\n/g, "<br>");  
	  		return s;
		}
	}
	window.groupShare = self;
})();