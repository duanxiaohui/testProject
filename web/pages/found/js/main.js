/**
 * 发现
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-08-03 14:23:28
 */

(function () {
	// 2015-10-03  getLocation 导致app崩溃
	var _data = {};
	var found = {
		init: function () {
			//跳转处理
			$('body').on('tap', '[data-url]', found.openUrl);
			$('body').on('tap', '[schedule-url]', function () {
				var scheduleUrl = $(this).attr('schedule-url');
				location.href = scheduleUrl
			});
			$('body').on('tap', '.recommend_list_img',function () {
				var url = $(this).attr('topic-url');
				var action = $(this).attr("action");
				if(action == "3"){
					location.href = url;
				}else{
					found.openUrl.call($(this));
				}
			});
			//处理天气黄历
			try{
				found.getWeather();
			}
			catch(e){
			}
			var tmpl = '\
			{$holidayRes}\
			{$hotSchedule}\
			{$todayHistory}\
			{$recommands}\
			{$getQQActive}\
			{$task}';


			// 2015-10-03  getLocation 导致app崩溃
			var html = template(tmpl, G, {
				holidayRes: found.getHoliday,
				hotSchedule: found.getSchedule,
				todayHistory: found.getHistory,
				recommands: found.getTopic,
				getQQActive: found.getQQActive,
				task: found.task
			});
			$('body').append(html);
			found.html_active();
			
			if(_data.loc && _data.picList){
				$('.found_cityPic_content').Slide({
						pics: _data.picList,
						index: 2,
						scroll: false,
						imgBIg:false,
						banSlid:true,
						imgZoom:false,
						arrow:true
				});
				var found_cityW = $(".found_cityPic_content").width();
				$('.public_image_container li').css({
					"width":found_cityW + "px"
				});
				$('.public_image').each(function (i,o) {
					$(o).css({
						"width":"100%",
						"height":"auto"
					});
				});
			}

		    // 检测加载失败的图片
		    $('img').on('error', function () {
		    	this.loadTimes = this.loadTimes || 0;
		    	var _this = this;
		        var src = _this.src;
		        setTimeout(function () {
		            $.ajax({url: '/pages/found/imgState.html?state=err&src=' + src});
		        }, 10)
		        setTimeout(function () {
		        	if(_this.loadTimes) return false;
		        	_this.loadTimes++;
		        	_this.src = src;
		        }, 500);
		    });
		},
		openUrl: function () {
			var url;
			var dataUrl = $(this).data('url');
			if(dataUrl == "undefined" || dataUrl == undefined){
				 url = $(this).attr('topic-url');
			}else{
				url = dataUrl;
			}
			if($(this).parents(".found_cityPic").length){
				var imgUrl = $(this).attr("src").split('/');
				imgUrl = imgUrl[imgUrl.length-1];

				$.ajax({
					url:'http://www.365rili.com/pages/found/tctj.html?origin='+imgUrl,
					complete:function () {
						app.call({
							action: 'openUrlWithNewActivity',
							params: [
								{
									name: 'url',
									value: url
								},
								{
									name: 'isInnerWebview',
									value: true
								}
							],
							callBack: null
						})
					}
				})
				return;
			}
			app.call({
				action: 'openUrlWithNewActivity',
				params: [
					{
						name: 'url',
						value: url
					},
					{
						name: 'isInnerWebview',
						value: true
					}
				],
				callBack: null
			})
		},
		task: function () {
			if(app.version >= 620){
				return '\
				<div class="found_task found_panel">\
			        <h3>任务</h3>\
			        <div class="found_qb_content">\
			            <img src="/task/images/task1.jpg" width="100%" alt="">\
			        </div>\
			    </div>';
			}
			return '';
		},
		getHoliday : function (o, p, d, i) {
			if(o == null){
				return '';
			}
			var tmpl = '\
			<div class="found_qb found_panel" data-url="{$linkurl}?needMore=true">\
		        <h3>奇葩节日</h3>\
		        <div class="found_qb_content">\
		            <img src="{$picture}" width="100%" alt="">\
		            <h4>{$title}</h4>\
		            <p>{$desctribute}</p>\
		        </div>\
		    </div>';

		    var html = template(tmpl, o);

		    return html;
		},

		getSchedule : function (o, p, d, i) {
			//没有日程则返回空
			if(o == null){
				return '';
			}

			var tmpl = '\
		    <div class="found_hotSchedule found_panel">\
		        <h3>热门日程</h3>\
		        <div class="found_hotSchedule_content">\
		            {$hotSchedule}\
		        </div>\
		    </div>'

		    var html = template(tmpl, {hotSchedule: o}, {
		    	hotSchedule: function (o, p, d, i) {
		    		return template('<img schedule-url="{$jumpUrl}" src="{$pic}" alt="">', o)
		    	}
		    });

		    return html;
		},

		getHistory : function (o, p, d, i) {
			//没有历史则返回空
			if(o == null){
				return '';
			}

			var tmpl = '\
			<div class="found_history found_panel">\
		        <h3>历史上的今天</h3>\
		        <div class="found_history_content">\
			        {$isheadline_pic}\
			        {$todayHistory}\
		        </div>\
		    </div>';

		    var headline_pic = '';
		    var history = [];

		    for (var i = 0; i < o.length; i++) {
		    	if(o[i].headline_pic){
		    		headline_pic = o[i];
		    		continue;
		    	}

		    	history.push(o[i]);
		    };

		    var html = template(tmpl, {
		    	todayHistory: history,
		    	isheadline_pic: headline_pic
		    }, {
		    	isheadline_pic: function (o, p, d, i) {
		    		return template('<dt><img data-url="http://www.365rili.com/todayHistory/detail.do?id={$id}" src="{$headline_pic}" width="100%" alt=""></dt>', o)
		    	},
		    	todayHistory: function (o, p, d, i) {
		    		return template('<dd class="active_c00" data-url="http://www.365rili.com/todayHistory/detail.do?id={$id}"><p>{$title}</p></dd>', o)
		    	}
		    });

		    return html;
		},

		getTopic : function (o, p, d, i) {
			if(o == null){
				return '';
			}
			
			var tmpl = '<div class="found_recommended found_panel">\
		        <h3>专题推荐</h3>\
		        <div class="found_recommended_content">\
		            <ul>{$topic}</ul>\
		        </div>\
		    </div>';

		    var html = template(tmpl,{topic: o}, {
		    	topic: function (o, p, d, i) {
		    		return template('<li><img class="recommend_list_img" topic-url="{$url}" src="{$photo}" action="{$action}" alt=""></li>', o)
		    	}
		    });

			 return html;
			 // return '';
		},

		getQQActive: function (o, p ,d ,i) {
			var ua = navigator.userAgent.toLowerCase().split('|');
			var id = ua[ua.length - 1];
			var picList = [];
			var ids = {
				2001295:1,
				294283369:1,
				200524:1,
				294283687:1,
				294328665:1,
				294329069:1,
				3810752:1,
				277027145:1,
				54236853:1,
				61955723:1,
				29055524:1,
				240167047:1,
				95211881:1,
				2000391:1
			};
			if(!ids[id]){
				// return '';
			}
			if(_data.loc){
				_data.loc.latitude *= 1000000;
				_data.loc.longitude *= 1000000;
				_data.loc.latitude = parseInt(_data.loc.latitude);
				_data.loc.longitude = parseInt(_data.loc.longitude);
			}
				
			if(!_data.loc || _data.loc == '' || JSON.stringify(_data.loc) == '{}'){
				return '';
			}
			if(p.qqtc == "1"){
				return '';
			}
			if(p.qqtc == "2"){
				_data.picList = [{"jumpUrl":"http://www.365rili.com/pages/found/location.html","pic":"http://www.365rili.com/pages/found/images/location.jpg"}]
			}
			if(p.qqtc == "4"){
				_data.picList = [{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/index.html?_wv=3&_bid=244&atvtype=city&from=365calendar&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/location.jpg"}]
			}
			if(p.qqtc == "8"){
				_data.picList = [
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=5&classid2=2&classname=%E4%BA%A4%E5%8F%8B%E8%81%9A%E4%BC%9A&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/jiaoyou.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=8&classid2=2&classname=%E6%88%B7%E5%A4%96&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/huwai.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=7&classid2=2&classname=%E8%BF%90%E5%8A%A8&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/yundong.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=9&classid2=2&classname=%E8%AE%B2%E5%BA%A7&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/jiangzuo.jpg"},
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=6&classid2=2&classname=%E9%9F%B3%E4%B9%90&groupuin=&from=365calendar&_wv=3&_bid=4&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude,"pic":"http://www.365rili.com/pages/found/images/yinyue.jpg"}
				];
				// _data.picList = [
				// 	{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=5&classid2=2&classname=%E4%BA%A4%E5%8F%8B%E8%81%9A%E4%BC%9A&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/jiaoyou.jpg"},
				// 	{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=8&classid2=2&classname=%E6%88%B7%E5%A4%96&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/huwai.jpg"},
				// 	{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=7&classid2=2&classname=%E8%BF%90%E5%8A%A8&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/yundong.jpg"},
				// 	{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=9&classid2=2&classname=%E8%AE%B2%E5%BA%A7&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/jiangzuo.jpg"},
				// 	{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/classify.html?classid1=6&classid2=2&classname=%E9%9F%B3%E4%B9%90&groupuin=&from=365calendar&_wv=3&_bid=4","pic":"http://www.365rili.com/pages/found/images/yinyue.jpg"}
				// ];
			}

			
			var tmpl = '\
			<div class="found_cityPic found_panel">\
		        <h3>城市画报</h3>\
		        <div class="found_cityPic_content">\
		        </div>\
		    </div>';
			return tmpl;
		},

		html_active: function(){
	    	var startY,endY,newClass,self;
	    	$('body').on('touchstart', '[class*="active_"]', 
    		function (e){
    			newClass = this.className;
    			//'sports e_clear active_ce0 js-classification'
    			 var generateClass = /active_([^\s]*)/g.exec(newClass)[1];
    			 // var self = $(this);
    			 // setTimeout(function(){
    			 // 	self.addClass(generateClass);
    			 // },500)
    			 self = $(this);
    			 startY = e.targetTouches[0].pageY;
    			 //滑动时延迟3秒增加class 防止滑动时出现active状态
    			 window.clareClass=setTimeout(function(){
    			 	self.addClass(generateClass);
    			 },300)
    			 window.reClass=setTimeout(function(){
    			 	self.removeClass(generateClass);
    			 },400)

    			
	    	});
	    	$('body').on('touchend',function (e){
    			try {
    				//判断滑动的距离 如果前后都不超过5 就在对象本身 增加Class
    				var diff = e.changedTouches[0].pageY - startY;
	    			var generateClass = /active_([^\s]*)/g.exec(newClass)[1];
		    		if(diff < 5 && diff > -5){
		    			self.addClass(generateClass);
		    		}else{
	    				self.removeClass(generateClass);
		    		}
    			} catch(e) {

				}
	    	}); 
	    	$('body').on('longTap',function(){
	    		clearTimeout(window.tm);
	    		window.tm = setTimeout(stouchend, 10)
	    	});
	    	$('body').on('touchend','[class*="active_"]',function (e){
	    		clearTimeout(window.clareClass);
	    		clearTimeout(window.tm);
	    		window.tm = setTimeout(stouchend, 10)
	    	});
	    	$('body').on('tap', '.found_task', function () {
	    		window.location.href = 'coco://365rili.com/task';
	    	})

	    	window.stouchend =function(){
	    		var t = $('[class*="active_"]');
	    		t.forEach(function(o){
	    			var tClass = o.className;
	    			var generateClass = /active_([^\s]*)/g.exec(tClass)[1];
	    			$(o).removeClass(generateClass);
	    		})
	    	}
	    },

		getWeather : function (fn) {
			var tmpl = '\
			<div class="found_header e_clear" style="background-image:url(/pages/found/images/{$bg}@2x.png)">\
			<div class="found_weather e_clear">\
            <div class="found_weather_c">{$c}</div>\
            <div class="found_weather_icon"><img src="/pages/found/images/list_weather_{$icon}.png" height="60" width="60"/></div></div>\
            <div class="found_weather_txt"><span>{$date}</span><span>{$region}</span><span>{$type}</span></div>\
        	</div>\
        	</div>';
        	var hlTmpl = '\
        	<div class="found_hl">\
	            <div class="found_hl_yi">宜：{$yi}</div>\
	            <div class="found_hl_ji">忌：{$ji}</div>\
	        </div>'

	   //      var b = {
				// 	    "weather" : {

				// 	        "c" : "6",

				// 	        "region" : "地区",

				// 	        "icon" : 1,

				// 	        "type" : "天气类型",

				// 	        "date" : "日期"


				// 	    },

				// 	    "huangli" : {

				// 	         "yi" : "宜",

				// 	         "ji" : "忌"

				// 	    } 

				// 	}
				// 	var html = template(tmpl,b.weather,{
				// 		c:function(o, p ,d ,i){
				// 			alert(o);
				// 			if(o > 10){
				// 				o = o.toString();
				// 				return '<img src="/pages/found/images/' + o[0] +'.jpg"/><img src="../images/' + o[1] +'.jpg"/>'
				// 			}else{
				// 				return '<img src="/pages/found/images/' + o +'.jpg"/>'
				// 			}
				// 		},
				// 		bg:function (o, p , d, i) {
				// 			var _o = ''
				// 			switch(p.icon)
				// 			{
				// 				case 0:
				// 				case 1:
				// 				case 2:
				// 				case 3: _o = 'sun';break;
				// 				case 4:
				// 				case 5:
				// 				case 6:
				// 				case 7: _o = 'dust_storms';break;
				// 				case 8: _o = 'haze';break;
				// 				case 9:
				// 				case 10:
				// 				case 11:
				// 				case 12:
				// 				case 13:
				// 				case 14:
				// 				case 15:
				// 				case 16: _o = 'snow';break;
				// 				case 17: _o = 'cloudy';break;
				// 				case 18:
				// 				case 19:
				// 				case 20:
				// 				case 21:
				// 				case 22:
				// 				case 23:
				// 				case 24:
				// 				case 25:
				// 				case 26:
				// 				case 27:
				// 				case 28:
				// 				case 29:
				// 				case 30:
				// 				case 31:
				// 				case 32:
				// 				case 33: _o = 'rainy';break
				// 			}
				// 			return _o;
							
				// 		}
				// 	});
				// console.log(b.huangli);
				// var hlHtml = template(hlTmpl,b.huangli);

				// console.log(hlHtml);
				// $('body').prepend(html);
				// // $('.found_header').append(hlHtml);

				// $('.found_weather').on('tap',function () {
				// 	location.href="coco://365rili.com/weather?citycode="+data.citycode;
				// });
				// $('.found_hl').on('tap',function () {
				// 	location.href="coco://365rili.com/huangli?time=" + (+new Date());
				// });
				// }

			app.call({
			    action: 'getLifeInfo',
			    params: [],
			    callBack: function(data) {
			        data = JSON.parse(data);

			        if (JSON.stringify(data.weather) == '{}') {
			            var html = '<div class="found_header e_clear" style="background-image:url(/pages/found/images/default@2x.png)"><div class="found_weather e_clear"><a href="javascript:;" class="add_address_btn">添加城市天气</a></div></div>'
			        }
			        else{
			        	var html = template(tmpl, data.weather, {
			        		icon:function (o) {	
			        			return o == 0 ? 0 : o;
			        		},
				            c: function(o, p, d, i) {
				                var zero = o.indexOf('-');
				                o = parseInt(o.replace(/[^0-9]/ig, "")).toString();
				                if (zero != "-1") {
				                    if (o >= 10) {
				                        return '<img src="/pages/found/images/zero@2x.png" width="40" height="50"/><img src="/pages/found/images/' + o[0] + '@2x.png" width="40" height="50"/><img src="/pages/found/images/' + o[1] + '@2x.png" width="40" height="50"/>'
				                    } else {
				                        return '<img src="/pages/found/images/zero@2x.png" width="40" height="50"/><img src="/pages/found/images/' + o + '@2x.png" width="40" height="50"/>'
				                    }
				                }
				                if (o >= 10) {
				                    return '<img src="/pages/found/images/' + o[0] + '@2x.png" width="40" height="50"/><img src="/pages/found/images/' + o[1] + '@2x.png" width="40" height="50"/>'
				                } else {
				                    return '<img src="/pages/found/images/' + o + '@2x.png" width="40" height="50"/>'
				                }
				            },
				            bg: function(o, p, d, i) {
				                var _o = ''
				                switch (p.icon) {
				                    case 0:
				                    case 1:
				                    case 18:
				                        _o = 'sun';
				                        break;
				                    case 29:
				                    case 30:
				                    case 31:
				                    case 20:
				                        _o = 'dust_storms';
				                        break;
				                    case 32:
				                        _o = 'haze';
				                        break;
				                    case 26:
				                    case 27:
				                    case 28:
				                    case 13:
				                    case 14:
				                    case 15:
				                    case 16:
				                    case 17:
				                        _o = 'snow';
				                        break;
				                    case 2:
				                        _o = 'cloudy';
				                        break;
				                    case 3:
				                    case 4:
				                    case 5:
				                    case 6:
				                    case 7:
				                    case 8:
				                    case 9:
				                    case 10:
				                    case 11:
				                    case 12:
				                    case 19:
				                    case 21:
				                    case 22:
				                    case 23:
				                    case 24:
				                    case 25:
				                        _o = 'rainy';
				                        break
				                }
				                return _o;

				            }
				        });
			        }
			        var hlHtml = template(hlTmpl, data.huangli);
			        $('body').prepend(html);
			        $('.found_header').append(hlHtml);
			        var weatherUrl = data.weather.citycode == null ? "coco://365rili.com/weather" : 'coco://365rili.com/weather?citycode=' + data.weather.citycode;
			        $('.found_weather').on('tap', function() {
			            location.href = weatherUrl;
			        });
			        $('.found_hl').on('tap', function() {
			            location.href = "coco://365rili.com/huangli?time=" + (+new Date());
			        });
			    }
			});
		}
	};

	// 检测页面js错误
	window.onerror = function (msg,url,l) {
	    $.ajax({url: '/pages/found/pageState.html?msg=' + msg + '&url=' + url + '&l=' + l});
	    return true;
	}

	// 2015-10-03  getLocation 导致app崩溃
	var uas = navigator.userAgent.toLowerCase().split('|');
	var ua = uas[uas.length - 3];

	if(app.query('debug')){
		_data.loc = {"locationV6":{"cityID":"101010100","cityName":"北京市","districtName":"北京","districtId":"101010100","provinceID":"101010","provinceName":"北京市"},"location":{"cityID":"101010100","cityName":"北京市","districtName":"北京","districtId":"101010100","provinceID":"101010","provinceName":"北京市"},"longitude":116.4121143463947,"cityname":"北京市","latitude":39.93649680597655,"baiduCity":"北京","state":"ok"};
		found.init();
	}
	else{
		if(app.getUa.ios && ua == "6.0"){
			found.init();
		}
		else{
			app.call({
				action:'getLocation',
				params: [],
				callBack: function (loc) {
					loc = loc || '{}';
					loc = JSON.parse(loc);
					_data.loc = loc;
					found.init();
				}
			});
		}
	}


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
})()