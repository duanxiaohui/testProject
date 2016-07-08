/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-12-02 10:27:55
 * @version $Id$
 */

(function () {
	var _data = {};
	var found = {
		init:function () {
			var tmpl = '\
			{$banner}\
			{$constellation}\
			<div class="found_holiday_history e_clear">\
			{$holidayRes}\
			{$todayHistory}\
			</div>\
			<div class="money_div none"></div>\
			{$task}\
			<div class="found_activity">\
		    	<h3 class="e_clear">玩乐主题 THEME</h3>\
		    	<div class="found_activity_content">\
		    		<ul class="e_clear">\
		    			{$activityCategory}\
		    		</ul>\
		    	</div>\
		    	<a href="javascript:;" data-url="http://www.365rili.com/pages/found/found_active_list.html?citycode='+_data.citycode+'" class="more">查看更多</a>\
		    </div>\
		    {$activityList}\
		    <div class="found_topic">\
		    	<h3 class="e_clear">专题 SPECIAL TOPIC</h3>\
		    	<div class="found_topic_content">\
		    		<ul>\
		    			{$recommands}\
		    			{$getQQActive}\
		    		</ul>\
		    	</div>\
		    </div>';
			var html = template(tmpl, G, {
				banner:found.banner,
				holidayRes: found.getHoliday,
				todayHistory:found.getHistory,
				constellation: found.getConstellation,
				recommands: found.getTopic,
				activityCategory: found.activityCategory,
				getQQActive: found.getQQActive,
				task: found.task,
				activityList:found.activityList
			});

			$('body').append(html);
			found.bindEvent();

			var bodyW = $(window).width();
			$('.found_activity_content li').css({
				"width":(bodyW/2 - 5) + "px",
				"height":(bodyW/2 - 5) + "px"
			})
			$('.found_history,.found_holiday').css({
				"width":(bodyW/2 - 5) + "px",
			})
			if(_data.pic){
				$('.banner_div').Slide({
						pics: _data.pic,
						index: 1,
						scroll: false,
						imgBIg:false,
						banSlid:true,
						imgZoom:false,
						arrow:false
				});
				var found_bannerW = $(".banner_div").width();
				$('.public_image_container li').css({
					"width":found_bannerW + "px"
				});
			}

			if(_data.activeNum){
				$('.found_activity').hide();
			}

			$('.activityList img').on('load',function () {
				if($(this).height()<200){
					$(this).parents('li').height($(this).height())
				}
			}).each(function (o,i) {
				$(i).attr('src',$(i).attr('data-src'));
			});

			var sUserAgent = navigator.userAgent.toLowerCase().split('|');
			var android_test = sUserAgent[sUserAgent.length - 2];

			if(android_test == 'test'){
				//猎豹推广
				var w = $(window).width();
				var html = ''
				$.ajax({
					url:'/liebao/queryAD.do',
					dataType:'json',
					data:{
						clientInfo:_data.lb_info,
						h:250,
						w:w,
					    adn:1
					},
					success:function (data) {
						_data.liebao = data;
						var dataJson = JSON.parse(data.ads)
						if(_data.liebao.ads == '[]'){
							$('.money_div').hide()
						}else{
							$('.money_div').html('<div class="money_h3"><span>推广</span><p class="cld-ui-nowrap">'+dataJson[0].title+'</p></div><div class="money_img"><img src="'+dataJson[0].background+'" width="100%"/><p>'+dataJson[0].desc+'</p></div>').removeClass('none');
							$('.money_div').attr('data-url',dataJson[0].click_url);
						}
						//展示统计
						$.ajax({
							url:dataJson[0].impr_tracking_url,
							headers:{
								UserAgent:navigator.userAgent.toLowerCase()
							},
							success:function () {
								console.log('展示上报成功');
							}
						})
					}
				})
			}

		},
		bindEvent:function () {
			/**zhuge**/
			/*天气*/
			$('body').on('tap','.weather',function () {
				// alert(_data.citycode)
				// if(_data.citycode == undefined){
				// 	location.href="coco://365rili.com/weather";
				// }else{
				// 	location.href="coco://365rili.com/weather?citycode="+_data.citycode;
				// }
				location.href="coco://365rili.com/weather?citycode="+_data.citycode;

				zhuge.track("发现-天气",{
					"event":'天气'
				});
			});
			/*黄历*/
			$('body').on('tap','.yiji',function () {
				location.href="coco://365rili.com/huangli?time=" + (+new Date());
				zhuge.track("发现-黄历",{
					"event":'黄历'
				});
			});
			/*星座展开*/
			$('body').on('tap.found_constellation', '.found_constellation', function (e) {
				zhuge.track("发现-星座",{
					"event":'展开'
				});
				$(this).css({"height":"auto"});
				$('body').off('tap.found_constellation');
			});
			/*星座设置*/
			$('body').on('tap', '.set_constellaction_btn', function (e) {
				zhuge.track("发现-星座",{
					"event":'设置'
				});
				found.constellationMore();
			});
			/*星座选择*/
			$('body').on('tap', '[data-name]', function () {
				_data.dataName = $(this).data('name');
				_data.dataeName = $(this).attr('data-eName');
				$('.set_constellation_list li').removeClass("on");
				$(this).addClass("on");
				$(".save_constellaction_btn").css({
					"background":"#2bacee"
				});
				$(".save_constellaction_btn").text("确定");
			});
			/*星座保存*/
			$('body').on('tap', '.save_constellaction_btn', function (){
				document.title = '发现';
				if(app.getUa.ios){
					app.call({
						action:'titleChanged'
					})
				}
				if($('.set_constellation_list li').hasClass("on")){

					localStorage.constellationID = $('.set_constellation_list li.on').data('name');
					localStorage.constellationNum = $('.set_constellation_list li.on').attr('data-eName');
					found.constellactionAjax();
					$(".set_constellation_list").hide().remove();
					$("body,html").css({
						"height": "auto",
						"overflow":"visible"
					})
				}else{
					$(".set_constellation_list").hide().remove();
					$("body,html").css({
						"height": "auto",
						"overflow":"visible"
					})
				}
			});
			/*banner*/
			$('body').on('tap', '.banner_div .public_image_container li img', function () {
				zhuge.track("发现-banner",{
					"url":$(this).data('url')
				});
				if($(this).data('url') == 'http://www.365rili.com/pages/bd/invertedWorld/index.html'){
					return found.openUrl.call(this, true);
				}
				if($(this).data('url') == 'http://www.365rili.com/temp/benzTj.html'){
					return found.openUrl.call(this, true);
				}
				found.openUrl.call(this);
			});
			/*历史上的今天*/
			$('body').on('tap', '.found_history', function () {
				zhuge.track("发现-历史上的今天",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
			});
			/*奇葩节日*/
			$('body').on('tap', '.found_holiday', function () {
				zhuge.track("发现-奇葩节日",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
			});
			/*活动更多*/
			$('body').on('tap', '.found_activity .more', function () {
				zhuge.track("发现-活动更多",{
					"event":'更多'
				});
				found.openUrl.call(this);
			});
			/*活动列表*/
			$('body').on('tap', '[class*="activity_div"]', function () {
				zhuge.track("发现-活动",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
			});
			/*专题更多*/
			$('body').on('tap', '.found_topic .more', function () {
				zhuge.track("发现-专题更多",{
					"event":'更多'
				});
				found.openUrl.call(this);
			});
			/*专题列表*/
			$('body').on('tap', '.found_topic li', function () {
				zhuge.track("发现-专题",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
			});	
			/*城市画报*/	
			$('body').on('tap', '.found_topic li:last', function () {
				zhuge.track("发现-城市画报",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
			});
			/*任务*/
			$('body').on('tap', '.found_task', function () {
	    		window.location.href = 'coco://365rili.com/task';
				zhuge.track("发现-任务",{
					"event":'入口'
				});
	    	});
	    	/*活动列表*/
	    	$('body').on('tap', '.activityList li', function () {
				zhuge.track("发现-活动列表",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
	    	});

	    	/*活动列表*/
	    	$('body').on('tap', '.activityList li', function () {
				zhuge.track("发现-活动列表",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
	    	});

	    	$('body').on('tap', '.activityList a', function () {
				zhuge.track("发现-活动列表更多按钮",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
	    	});

	    	$('body').on('tap','.found_activity_content li',function () {
	    		zhuge.track("发现-玩乐主题四个分类",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
	    	})
	    	/*任务*/
	    	$('body').on('tap','.task_list a',function () {
	    		zhuge.track("发现-每日任务",{
					"url":$(this).data('url')
				});
				found.openUrl.call(this);
	    	})

	    	/*猎豹*/
	    	$('body').on('tap','.money_div',function () {
	    		found.openUrl.call(this, true);
	    		var url =JSON.parse(_data.liebao.ads)[0].click_tracking_url
	    		$.ajax({
					url:url,
					headers:{
						UserAgent:navigator.userAgent.toLowerCase()
					},
					success:function () {
						console.log('点击上报成功');
					}
				})
	    	})
		},
		openUrl: openUrl,
		getWeather:function () {
			var tmpl = '<div class="found_status e_clear">\
				    	<div class="weather e_clear">\
				    		<div class="found_weather_icon">\
				    			<img src="/pages/found/images_news/list_weather_{$icon}.png" width="25" height="25" alt="">\
				    		</div>\
				    		<div class="found_weather_c">{$c}</div>\
				    		<div class="found_weather_city">{$region}  <span class"found_weather_type">{$type}</span></div>\
				    	</div>\
				    	</div>\
				    </div>';
			var hlTmpl = '<div class="yiji">\
				    		<div class="yi">\
				    			<div class="yi_content cld-ui-nowrap">{$yi}</div>\
				    		</div>';
	 	//     var b = {
			//     "weather" : {

			        

			//     },

			//     "huangli" : {

			//          "yi" : "嫁娶 于是无语 诸事不宜",

			//          "ji" : "忌"

			//     },
			//     "citycode":1001010

			// };
			app.call({
		    	action: 'getLifeInfo',
		    	params: [],
		    	callBack: function(data) {
		    		data = JSON.parse(data);
		    		if (JSON.stringify(data.weather) == '{}') {
		    			var html = '<div class="found_status e_clear">\
		    				<div class="weather e_clear">\
		    					<div class="add_weather">添加城市天气</div>\
		    				</div>\
		    			</div>'
		    		}else{
					var html = template(tmpl,data.weather,{
						icon:function (o) {	
			        			return o == 0 ? 1 : o + 1;
			        		},
				        c: function(o, p, d, i) {
			                var zero = o.indexOf('-');
			                o = parseInt(o.replace(/[^0-9]/ig, "")).toString();
			                if (zero != "-1") {
			                    if (o >= 10) {
			                        return '<img src="/pages/found/images_news/zero@2x.png" width="10" height="14"/><img src="/pages/found/images_news/' + o[0] + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/' + o[1] + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/deg@2x.png" width="5" height="5"/>'
			                    } else {
			                        return '<img src="/pages/found/images_news/zero@2x.png" width="10" height="14"/><img src="/pages/found/images_news/' + o + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/deg@2x.png" width="5" height="5"/>'
			                    }
			                }
			                if (o >= 10) {
			                    return '<img src="/pages/found/images_news/' + o[0] + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/' + o[1] + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/deg@2x.png" width="5" height="5"/>'
			                } else {
			                    return '<img src="/pages/found/images_news/' + o + '@2x.png" width="10" height="14"/><img src="/pages/found/images_news/deg@2x.png" width="5" height="5"/>'
			                }
			            }
					});
			    }
			   	var hlHtml = template(hlTmpl,data.huangli);
				$('body').prepend(html);
				$('.found_status').append(hlHtml);
				//处理天气超出显示省略号
				var cLen = $('.found_weather_c img').length;
				var cLenNum ;
				if(cLen == 4){
					cLenNum = 35
				}else if(cLen == 3){
					cLenNum = 25
				}else{
					cLenNum = 15
				}
				var cityW = $('.weather').width() - 25 - 30 - cLenNum;
				//处理结束
				
				$('.found_weather_city').width(cityW);
				_data.citycode = data.weather.citycode;
				found.init();
			    }
		    })
		},
		banner:function (o,p,d,i) {
			if(o == null){
				return '';
			}
			_data.pic = o.sort(compare('headline'));
			var tmpl = '<div class="banner_div"></div>'	;
			return tmpl;
		},
		task: function () {
			if(app.version >= 620){
				var date = new Date();
				var d0406 = new Date('2016/04/06');
				var d0410 = new Date('2016/04/10');
				var d0414 = new Date('2016/04/14');
				var d0418 = new Date('2016/04/18');
				var d0422 = new Date('2016/04/22');
				var d0425 = new Date('2016/04/25');
				var d0429 = new Date('2016/04/29');
				var img = date >= d0429 ? '0429' : 
						  date >= d0425 ? '0425' : 
						  date >= d0422 ? '0422' :
						  date >= d0418 ? '0418' :
						  date >= d0414 ? '0414' :
						  date >= d0410 ? '0410' :
						  date >= d0406 ? '0406' : 
						  'task1';
				var taskList = date >= d0429 ? 
												'<a href="javascript:;" data-url="coco://365rili.com/task?id=45&url='+encodeURIComponent('http://www.365rili.com/task/sing.html?tasks=45')+'">每天唱歌</a><a href="javascript:;" data-url="coco://365rili.com/task?id=63&url='+encodeURIComponent('http://www.365rili.com/task/kiss.html?tasks=63')+'">每天亲亲</a><a href="javascript:;" data-url="coco://365rili.com/task?id=35&url='+encodeURIComponent('http://www.365rili.com/task/tansuan.html?tasks=35')+'">不喝碳酸</a>'
											:
							   date >= d0425 ? 
							   					'<a href="javascript:;" data-url="coco://365rili.com/task?id=55&url='+encodeURIComponent('http://www.365rili.com/task/rubbish.html?tasks=55')+'">爱护环境</a><a href="javascript:;" data-url="coco://365rili.com/task?id=27&url='+encodeURIComponent('http://www.365rili.com/task/shuijiao.html?tasks=27')+'">早点睡觉</a><a href="javascript:;" data-url="coco://365rili.com/task?id=67&url='+encodeURIComponent('http://www.365rili.com/task/dog.html?tasks=67')+'">去遛狗</a>'
							   				:
							   date >= d0422 ?
							   					'<a href="javascript:;" data-url="coco://365rili.com/task?id=49&url='+encodeURIComponent('http://www.365rili.com/task/lababa.html?tasks=49')+'">排便便</a><a href="javascript:;" data-url="coco://365rili.com/task?id=3&url='+encodeURIComponent('http://www.365rili.com/task/shuiguo.html?tasks=3')+'">吃果蔬</a><a href="javascript:;" data-url="coco://365rili.com/task?id=23&url='+encodeURIComponent('http://www.365rili.com/task/jishi.html?tasks=23')+'">记日记</a>'
							   				:
							   date >= d0418 ?
							   					'<a href="javascript:;" data-url="coco://365rili.com/task?id=43&url='+encodeURIComponent('http://www.365rili.com/task/walk.html?tasks=43')+'">静心漫步</a><a href="javascript:;" data-url="coco://365rili.com/task?id=61&url='+encodeURIComponent('http://www.365rili.com/task/jielu.html?tasks=61')+'">戒撸</a><a href="javascript:;" data-url="coco://365rili.com/task?id=29&url='+encodeURIComponent('http://www.365rili.com/task/qichuang.html?tasks=29')+'">每天早起</a>'
							   				:
							   date >= d0414 ?
							   					'<a href="javascript:;" data-url="coco://365rili.com/task?id=39&url='+encodeURIComponent('http://www.365rili.com/task/sqjinshi.html?tasks=39')+'">睡前禁食</a><a href="javascript:;" data-url="coco://365rili.com/task?id=47&url='+encodeURIComponent('http://www.365rili.com/task/mask.html?tasks=47')+'">回归真我</a><a href="javascript:;" data-url="coco://365rili.com/task?id=57&url='+encodeURIComponent('http://www.365rili.com/task/danshen.html?tasks=57')+'">单身打卡</a>'
							   				:
							   date >= d0410 ?
							   					'<a href="javascript:;" data-url="coco://365rili.com/task?id=1&url='+encodeURIComponent('http://www.365rili.com/task/zaocan.html?tasks=1')+'">吃早餐</a><a href="javascript:;" data-url="coco://365rili.com/task?id=31&url='+encodeURIComponent('http://www.365rili.com/task/chunjie.html?tasks=31')+'">打扫卫生</a><a href="javascript:;" data-url="coco://365rili.com/task?id=59&url='+encodeURIComponent('http://www.365rili.com/task/mingxiang.html?tasks=59')+'">冥想</a>'
							   				:
							   date >= d0406 ?
							                 	'<a href="javascript:;" data-url="coco://365rili.com/task?id=15&url='+encodeURIComponent('http://www.365rili.com/task/smile.html?tasks=15')+'">早起喝水</a><a href="javascript:;" data-url="coco://365rili.com/task?id=45&url='+encodeURIComponent('http://www.365rili.com/task/smile.html?tasks=45')+'">每日一笑</a><a href="javascript:;" data-url="coco://365rili.com/task?id=21&url='+encodeURIComponent('http://www.365rili.com/task/smile.html?tasks=21')+'">每日计划</a>':'';		

				return '\
				<div class="found_topic found_task">\
			    	<h3 class="e_clear">任务 TASK</h3>\
			    	<div>\
			    		<img src="/task/images/task_'+img+'.jpg" width="100%" alt="">\
			    		<div class="task_list e_clear">' +taskList+' <a href="javascript:;" data-url="coco://365rili.com/task">查看更多</a></div>\
			    	</div>\
			    </div>';
			}
			return '';

		},
		getConstellation:function () {
			_data.constellactionData = {
				shuiping:{
					txt:"水瓶座",
					times:"1-20 ~ 2-18",
					bgu:'http://www.365rili.com/pages/found/images_news/shuiping_bg.png'
				},
				shuangyu:{
					txt:"双鱼座",
					times:"2-19 ~ 3-20",
					bgu:'http://www.365rili.com/pages/found/images_news/shuangyu_bg.png'
				},
				baiyang:{
					txt:"白羊座",
					times:"3-21 ~ 4-20",
					bgu:'http://www.365rili.com/pages/found/images_news/baiyang_bg.png' 
				},
				jinniu:{
					txt:"金牛座",
					times:"4-21 ~ 5-20",
					bgu:'http://www.365rili.com/pages/found/images_news/jinniu_bg.png' 
				},
				shuangzi:{
					txt:"双子座",
					times:"5-21 ~ 6-21",
					bgu:'http://www.365rili.com/pages/found/images_news/shuangzi_bg.png' 
				},
				juxie:{
					txt:"巨蟹座",
					times:"6-22 ~ 7-22",
					bgu:'http://www.365rili.com/pages/found/images_news/juxie_bg.png'
				},
				shizi:{
					txt:"狮子座",
					times:"7-23 ~ 8-22",
					bgu:'http://www.365rili.com/pages/found/images_news/shizi_bg.png' 
				},
				chunv:{
					txt:"处女座",
					times:"8-23 ~ 9-22",
					bgu:'http://www.365rili.com/pages/found/images_news/chunv_bg.png' 
				},
				tiancheng:{
					txt:"天秤座",
					times:"9-23 ~ 10-22",
					bgu:'http://www.365rili.com/pages/found/images_news/tiancheng_bg.png' 
				},
				tianxie:{
					txt:"天蝎座",
					times:"10-23 ~11-21",
					bgu:'http://www.365rili.com/pages/found/images_news/tianxie_bg.png' 
				},
				sheshou:{
					txt:"射手座",
					times:"11-22 ~ 12-21",
					bgu:'http://www.365rili.com/pages/found/images_news/sheshou_bg.png'
				},
				mojie:{
					txt:"摩羯座",
					times:"12-22 ~ 1-19",
					bgu:'http://www.365rili.com/pages/found/images_news/mojie_bg.png' 
				}
			}
			var tmpl ='<div class="found_constellation" style="height:50px">\
				    	<div class="found_constellation_content e_clear">\
				    		<h3>每日星座运势</h3>\
				    		<p>今天你的生活和工作该注意些什么？来自占星师的十二星座小提示，助你未雨绸缪、趋利避害，快乐安稳每一天！快快设置自己的星座吧~</p>\
				    		<a href="javascript:;" class="set_constellaction_btn">设置星座</a>\
				    	</div>\
				    </div>';
			var constellationID = localStorage.constellationID,
				constellationNum = localStorage.constellationNum;

			if(constellationNum && constellationNum != "undefined"){
				found.constellactionAjax();
			}
			return tmpl;
		},
		constellationMore:function () {
			var tmpl = '<div class="set_constellation_list">\
				    	<ul class="e_clear">\
				    		<li data-name="白羊座" data-eName="baiyang">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/baiyang_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">白羊座</p>\
				    			<p class="con_data">3/21 - 4/20</p>\
				    		</li>\
				    		<li data-name="金牛座"  data-eName="jinniu">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/jinniu_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">金牛座</p>\
				    			<p class="con_data">4/21 - 5/20</p>\
				    		</li>\
				    		<li data-name="双子座"  data-eName="shuangzi">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/shuangzi_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">双子座</p>\
				    			<p class="con_data">5/21 - 6/21</p>\
				    		</li>\
				    		<li data-name="巨蟹座"  data-eName="juxie">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/juxie_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">巨蟹座</p>\
				    			<p class="con_data">6/22 - 7/22</p>\
				    		</li>\
				    		<li data-name="狮子座"  data-eName="shizi">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/shizi_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">狮子座</p>\
				    			<p class="con_data">7/23 - 8/22</p>\
				    		</li>\
				    		<li data-name="处女座"  data-eName="chunv">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/chunv_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">处女座</p>\
				    			<p class="con_data">8/23 - 9/22</p>\
				    		</li>\
				    		<li data-name="天秤座"  data-eName="tiancheng">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/tiancheng_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">天秤座</p>\
				    			<p class="con_data">9/23 - 10/22</p>\
				    		</li>\
				    		<li data-name="天蝎座"  data-eName="tianxie">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/tianxie_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">天蝎座</p>\
				    			<p class="con_data">10/23 - 11/21</p>\
				    		</li>\
				    		<li data-name="射手座"  data-eName="sheshou">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/sheshou_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">射手座</p>\
				    			<p class="con_data">11/22 - 12/21</p>\
				    		</li>\
				    		<li  data-name="摩羯座" data-eName="mojie">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/mojie_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">摩羯座</p>\
				    			<p class="con_data">12/22 - 1/19</p>\
				    		</li>\
				    		<li data-name="水瓶座" data-eName="shuiping">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/shuiping_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">水瓶座</p>\
				    			<p class="con_data">1/20 - 2/18</p>\
				    		</li>\
				    		<li data-name="双鱼座" data-eName="shuangyu">\
				    			<div class="icon">\
				    				<img src="/pages/found/images_news/shuangyu_icon.png" height="40" alt="">\
				    			</div>\
				    			<p class="name">双鱼座</p>\
				    			<p class="con_data">2/19 - 3/20</p>\
				    		</li>\
				    	</ul>\
						<a href="javascript:;" class="save_constellaction_btn cld-ui-corner-all-5">确定</a>\
				    </div>';
				    $('body').append(tmpl);
				    document.title = '设置星座';
				    if(app.getUa.ios){
						app.call({
							action:'titleChanged'
						})
					}

				    $('.set_constellation_list li[data-eName="'+localStorage.constellationNum+'"]').addClass("on");

					if($('.set_constellation_list li').hasClass("on")){
						$(".save_constellaction_btn").css({
							"background":"#2bacee"
						})

					}else{
						$(".save_constellaction_btn").css({
							"background":"#f7820c"
						});
						$(".save_constellaction_btn").text("返回");
					}
					var cllH = $('.set_constellation_list').height(),
						H = $(window).height();
					if(H > cllH){
						$("body,html").css({
							"height": H + "px",
							"overflow":"hidden"
						});
						$(".set_constellation_list").css({
							"height": (H-40) + "px",
							"overflow":"hidden"
						});
					}else{
						$("body,html").css({
							"height": cllH + "px",
							"overflow":"hidden"
						});
					}
		},
		constellactionAjax:function () {
			var constellationID = localStorage.constellationID,
				constellationNum = localStorage.constellationNum;
			$.ajax({
				url:'/horoscope/info.do',
				type:'post',
				dataType: 'json',
		        data: {
	            	horoscopeName: constellationID,
	            	t:+new Date
	            },
		        success: function(data) {
		        	if(data.state == "ok"){
		        		$('.found_constellation_content h3').html(_data.constellactionData[constellationNum].txt+'<span>'+_data.constellactionData[constellationNum].times+'</span>');

		        		$('.found_constellation_content p').html(data.desc);
		        		$('.set_constellaction_btn').text('切换星座');
		        		$('.found_constellation').css({
		        			height:"auto",
		        			"backgroundImage":'url('+_data.constellactionData[constellationNum].bgu+')'
		        		})
		        	}
		        }
			});
		},
		getHoliday:function (o, p , d ,i) {
			if(o == null){
				return '';
			}
			var tmpl = '<div class="found_holiday" data-url={$linkurl}?needMore=true>\
				    		<img src="{$picture}" width="100%" alt=""/>\
				    	</div>';
			var html = template(tmpl,o);
			return html;
		},
		getHistory:function (o, p , d ,i) {
			if(o == null){
				return '';
			}
			var tmpl = '<div class="found_history" data-url="http://www.365rili.com/todayHistory/detail.do?date={$time}">\
				    		<img src="{$picture}" width="100%" alt="">\
				    	</div>';
			var html = template(tmpl,o);
			return html;
		},
		// getActive:function  (o,p,d,i) {
		// 	if(o == null){
		// 		_data.activeNum = 1;
		// 		return '';
		// 	}
		// 	o = o.sort(compare('position'));
		// 	var html = template('{$item}',o,{
		// 		item:function (o,p,d,i) {
		// 			var html = template('<div class="activity_div{$position}" data-url={$linkurl}><img src="{$picture}" alt=""></div>',p);
		// 			if(p.position == 3){
		// 				html = '<div class="activity_div5"> ' + html;
		// 			}else if(p.position == 4){
		// 				html += '</div>'
		// 			}
		// 			return html;
		// 		}
		// 	})
		// 	return html;
		// },
		activityCategory:function (o,p,d,i) {
			var citycodeAry = [101010100,101020100,101280101,101280601];
			if(citycodeAry.indexOf(+_data.citycode) != -1){
				return '\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=1">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/food_new.jpg"/>\
					</li>\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=2">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/music_new.jpg"/>\
					</li>\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=4">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/movie_new.jpg"/>\
					</li>\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=10">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/city_new.jpg"/>\
					</li>'
			}else{
				return '\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=2" style="margin-bottom:0">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/music_new.jpg"/>\
					</li>\
					<li data-url="http://www.365rili.com/pages/found/found_active_lists.html?citycode='+_data.citycode+'&listid=4" style="margin-bottom:0;">\
						<img src="http://cocoimg.365rili.com/xianqu_activity/movie_new.jpg"/>\
					</li>'
			}
		},
		activityList:function (o,p,d,i) {
			if(o == null){
				return '';
			}
			var tmpl = '\
				<div class="activityList">\
					<h3>{$title}</h3>\
					<ul class="e_clear">{$activityItem}</ul>\
					<a href="javascript:;" data-url="{$more}" class="more">查看更多</a>\
				</div>';
			var html = template(tmpl,o,{
				activityItem:function (o,p,d,i) {
					if(p.data == null){
						return '';
					}
					var tmplItem = '\
						<li data-url="{$linkurl}">\
			    			<div class="img_div"><img data-src="{$picture}" width="100%"/></div>\
			    			<div class="txt_div">\
			    				<h4>{$title}</h4>\
			    				<p class="cld-ui-nowrap">{$starttime} {$address}</p>\
			    			</div>\
			    		</li>';
		    		return template (tmplItem,p.data,{
		    			starttime:function (o,p,d,i) {
		    				return o.split(' ')[0];
		    			}
		    		})
				}
			});
			return html;
		},
		getTopic:function (o,p,d,i) {
			if(o == null){
				return '';
			}
			var tmpl = '<li data-url="{$url}"><img src="{$photo}"/></li>'
			var html = template(tmpl, o.slice(0,5));
			return html;
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
				_data.picList = [
					{"jumpUrl":"http://www.365rili.com/pages/found/location.html"}]
			}
			if(p.qqtc == "4"){
				_data.picList = [
					{"jumpUrl":"http://qqweb.qq.com/m/qunactivity/index.html?_wv=3&_bid=244&atvtype=city&from=365calendar&lng="+_data.loc.longitude+"&lat="+_data.loc.latitude}]
			}
			if(p.qqtc == "8"){
				_data.picList = [
					{"jumpUrl":"http://www.365rili.com/pages/found/found_city_list.html"}
				];
			}
			
			var tmpl = '<li data-url={$jumpUrl}><img src="/pages/found/images_news/tongcheng_top.jpg" width="100%"/></li>';
			var html = template(tmpl, _data.picList);
			return html;
		}
	}
	app.call({
		action:'getLocation',
		params: [],
		callBack: function (loc) {
			loc = loc || '{}';
			loc = JSON.parse(loc);
			_data.loc = loc;

			var sUserAgent = navigator.userAgent.toLowerCase().split('|');
			var android_test = sUserAgent[sUserAgent.length - 2];

			//android调用猎豹推广接口
			if(android_test == 'test'){
				app.call({
					action:'getAdkMobInfo',
					params: [],
					callBack: function (lb_info) {
						_data.lb_info = lb_info;
						found.getWeather();
					}
				});
			}else{
				found.getWeather();
			}
			
		}
	});
	
})()


