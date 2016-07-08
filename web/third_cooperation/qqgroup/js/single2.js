define(['zepto','amplify', 'monthView', 'util', 'appData', 'lunar'],function($,amplify, mv, util, appData, L) {
	var _data = {
		viewType: 'month',
		yj: {}
	};

	var firstAccess = GetCookie('firstAccess') == '1';
	if(firstAccess){
		showGuide();
	}
	else{
		go();
	}

	function setCookie (name, value, expires, path, domain, secure) {
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24
        };
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '/') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '')
    }


    function GetCookie(name) {
        var value = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].replace(/^\s+|\s+$/g, '');
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    value = decodeURIComponent(cookie.substring(name.length + 1));
                    break
                }
            }
        }
        return value
    }

    function deleteCookie (name, path, domain) {
        if (GetCookie(name)) {
            document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        }
    }

	function showGuide () {
		$('\
			<div class="guide">\
				<img class="g1" src="/third_cooperation/qqgroup/images/guide1.jpg" alt="" />\
				<img class="g2" src="/third_cooperation/qqgroup/images/guide2.jpg" alt="" />\
				<img class="g3" src="/third_cooperation/qqgroup/images/guide3.jpg" alt="" />\
			</div>').appendTo('body');
		$('.guide img').on('tap', function () {
			$(this).fadeOut(function () {
				$(this).remove();
				if(!$('.guide img').length){
					$('.guide').remove();
					deleteCookie('firstAccess')
					go();
				}
			});
		})
	}

	function go () {
		//修正宽度
		$('.schedule_list').width($(window).width() - 17 - 13 - 1);
		$('.nearMonth').on('tap', function (e) {
			var d = new Date();
			var now = $('#select_month').val().split('-');

			d.setYear(now[0]);
			if(_data.viewType == 'month'){
				d.setDate(1);
				if($(this).hasClass('prev')){
					d.setMonth(now[1] - 2);
				}
				else{
					d.setMonth(now[1]);
				}
				amplify.publish('ev:changeMonth', d);
			}
			else{
				d.setMonth(now[1] - 1)
				if($(this).hasClass('prev')){
					d.setDate(+now[2] - 7);
				}
				else{
					d.setDate(+now[2] + 7);
				}
				d.setDate(d.getDate() - d.getDay());
				amplify.publish("ev:changeDateWeek",d);
			}
		});

		amplify.subscribe('over:renderMonth', function () {

			/**
			 * 修复行数
			 */

			var girds = $('.js-cld-panel li');
			var h = 55 * 6;
			var mh = 0;

			var flag = true;
			for (var i = 0; i < 7; i++) {
				if(!girds.eq(i).hasClass('other-month')){
					flag = false;
					break;
				}
			};
			flag && (h -= 55) && (mh -= 55);
			flag = true;
			for (var i = girds.length - 7; i < girds.length; i++) {
				if(!girds.eq(i).hasClass('other-month')){
					flag = false;
					break;
				}
			};
			flag && (h -= 55);
			flag = true;
			for (var i = girds.length - 14; i < girds.length - 7; i++) {
				if(!girds.eq(i).hasClass('other-month')){
					flag = false;
					break;
				}
			};
			flag && (h -= 55);
			$('.calendar_panel').height(h);
			$('.js-cld-panel').css('margin-top', mh);

		});

		amplify.subscribe('over:renderMonth', function (d) {
			var _d = new Date(d);
			if(!cid){
				return false;
			}

			//初始化首日
			_d.setDate(1);

			var dataString = [_d.getFullYear(), _d.getMonth() + 1].join('\/');
			//如果日期未变则不处理
			if(_data.loadingScheduleDateForMonth == dataString){
				return false;
			}

			//abort上一次ajax
			_data.ajaxForMonth && _data.ajaxForMonth.abort();

			/**
			 * 获取日程
			 */

			var loadingScheduleDateForMonth = _data.loadingScheduleDateForMonth = dataString;
			var endDate = new Date(_d);
			endDate.setMonth(endDate.getMonth() + 1);

			_data.ajaxForMonth = $.ajax({
				url: '/schedule/listQQDates.do',
				data: {
					fromDate : (_data.loadingScheduleDateForMonth + '/1').replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
					toDate : [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
					calendarId : cid,
					t: +new Date()
				},
				dataType: 'json',
				success: function (data) {
					if(data.state == 'error'){
						alert('未登录');
					}
					//如果已经发生下次请求，则不处理
					if(loadingScheduleDateForMonth !== _data.loadingScheduleDateForMonth){
						return false;
					}

					//插入数据
					showScheduleDay(data);
				}
			});
		});

		amplify.subscribe('over:renderWeek', function (d) {
			var _d = new Date(d);
			if(!cid){
				return false;
			}

			//初始化首日
			_d.setDate(_d.getDate() - _d.getDay());

			var dataString = [_d.getFullYear(), _d.getMonth() + 1, _d.getDate()].join('\/');
			//如果日期未变则不处理
			if(_data.loadingScheduleDateForWeek == dataString){
				return false;
			}

			//abort上一次ajax
			_data.ajaxForWeek && _data.ajaxForWeek.abort();

			/**
			 * 获取日程
			 */

			var loadingScheduleDateForWeek = _data.loadingScheduleDateForWeek = dataString;

			var endDate = new Date(_d);
			endDate.setDate(endDate.getDate() + 7);

			_data.ajaxForWeek = $.ajax({
				url: '/schedule/listQQDates.do',
				data: {
					fromDate : (_data.loadingScheduleDateForWeek).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
					toDate : [endDate.getFullYear(), endDate.getMonth() + 1, endDate.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
					calendarId : cid,
					t: +new Date()
				},
				dataType: 'json',
				success: function (data) {
					if(data.state == 'error'){
						alert('未登录');
					}
					//如果已经发生下次请求，则不处理
					if(loadingScheduleDateForWeek !== _data.loadingScheduleDateForWeek){
						return false;
					}

					//插入数据
					showScheduleDay(data);
				}
			});
		});

		amplify.subscribe('ev:viewTypeChanged', function (viewType) {
			_data.loadingScheduleDateForMonth = '';
			_data.loadingScheduleDateForWeek = '';
			_data.viewType = viewType;

			appData.set('viewType', viewType);
		});

		amplify.subscribe('over:changeDate', function (d) {
			var _d = new Date(d);
			var dataString = [_d.getFullYear(), _d.getMonth() + 1, _d.getDate()].join('\/');

			appData.set('date', dataString);

			$(window).scrollTop(0);

			if(!cid){
				return false;
			}

			//如果日期未变则不处理
			if(_data.loadingScheduleDate == dataString){
				return false;
			}

			//增加距离今天的提示
			showDayDef(d);

			//abort上一次ajax
			_data.ajax && _data.ajax.abort() && (delete _data.ajax);

			/**
			 * 获取日程
			 */

			var loadingScheduleDate = _data.loadingScheduleDate = [_d.getFullYear(), _d.getMonth() + 1, _d.getDate()].join('\/');

			var endDate = new Date(d);
			endDate.setDate(endDate.getDate() + 1);

			//loading动画
			loading();

			_data.ajax = $.ajax({
				url: '/schedule/listQQScheduleByDay.do',
				data: {
					date : (_data.loadingScheduleDate).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
					cid : cid,
					t: +new Date()
				},
				success: function (data) {
					delete _data.ajax
					//如果已经发生下次请求，则不处理
					if(loadingScheduleDate !== _data.loadingScheduleDate){
						return false;
					}

					//插入数据
					initScheduleUI(data.data);
					getOther(d);
				},
				error: function () {
					//插入空数据
					initScheduleUI([]);
					getOther(d);
				}
			});

			/**
			 * 临时储存日期
			 */
			window.name.selectedDate = d;

			function getOther (d) {
				_data.QP_HIS_HLajax && _data.QP_HIS_HLajax.abort() && (delete _data.QP_HIS_HLajax);
				_data.QP_HIS_HLajax = $.ajax({
					url: '/qqun/homepage.do',
					data: {
						date : (_data.loadingScheduleDate).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
						t: +new Date()
					},
					dataType: 'json',
					success: function (data) {
						delete _data.QP_HIS_HLajax
						//如果已经发生下次请求，则不处理
						if(loadingScheduleDate !== _data.loadingScheduleDate){
							return false;
						}
						showQPHIS(data.fantastic,data.history,d);
					},
					error: function () {
						showQPHIS(null,null,d);
					}
				});
			}
		});

		function showDayDef (d) {
			$('.d_day').remove();
			//获取今天的时间戳，时分秒为0
			var today = new Date;
			today.setHours(0,0,0,0);

			var selectedDay = new Date(d);
			selectedDay.setHours(0,0,0,0);

			//获取差值
			var d_day = 0;
			if(selectedDay.getTime() !== today.getTime()){
				d_day = ((selectedDay - today) / 1000 / 60 / 60 / 24);
			}

			//如果存在差值则非今天
			if(d_day){
				$(['<div class="d_day"><span>', (Math.abs(d_day)), '天', d_day > 0 ? '后 周' : '前 周', ["日","一","二","三","四","五","六"][selectedDay.getDay()], '</span></div>'].join('')).appendTo('.calendar_grid');
			}
		}

		function showQPHIS (qp,his,d) {

			$('<dl class="todayOther nsch">\
					<dd class="schBody">\
						<span class="time">看今天</span>\
					</dd>\
					<dt></dt>\
				</dl>').appendTo('.schedule_list');

			if(!qp){
				showYJ(d, 'full');
				return false;
			}

			$('\
				<div class="fullBox qp none">\
					<a onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'奇葩节日\', \''+ qp.title +'\'])" href="'+ qp.linkurl +'?needMore=true"></a>\
					<span class="qpTitle">'+ qp.title +'</span>\
				</div>\
				<div class="half his none">\
					<a onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'历史上的今天\', \''+ his.title +'\'])" href="'+ his.linkurl +'"></a>\
					<span class="hisTitle">'+ his.title +'</span>\
				</div>\
			').appendTo('.todayOther dt');

			var qpimg = new Image;
			qpimg.onload = function () {
				$('.qp a').append('<img src="'+ qpimg.src +'" width="100%">');
				$('.qp').show();
			}
			qpimg.onerror = function () {
				qpimg.src = '/third_cooperation/qqgroup/images/fullError.png';
			}
			qpimg.src = qp.picture;

			var hisimg = new Image;
			hisimg.onload = function () {
				$('.his a').append('<img src="'+ hisimg.src +'" width="100%">');
				$('.his').show();
			}
			hisimg.onerror = function () {
				hisimg.src = '/third_cooperation/qqgroup/images/nFullError.png';
			}
			hisimg.src = his.picture;

			showYJ(d);
		}

		function showYJ (d, full) {
			var day = new Date(d);
			var yjmonth = [day.getFullYear(), day.getMonth() + 1].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').replace('-', '');
			var yjday = [yjmonth, day.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').replace('-', '');
			var yj = _data.yj[yjday];

			_data.yjAjax && _data.yjAjax.abort() && (delete _data.yjAjax);

			_data.loadingYJDate = yjmonth;

			//无数据时不操作
			if(yj === 'nodata'){
				return false;
			}

			if(!yj){
				return _data.yjAjax = $.ajax({
					url: 'http://qq.365rili.com/third_cooperation/qqgroup/yjdata/' + yjmonth + '.json',
					success: function (json) {
						delete _data.yjAjax;

						for(var yjd in json){
							_data.yj[yjd] = json[yjd];
						}

						//如果已经发生下次请求，则不处理
						if(yjmonth !== _data.loadingYJDate){
							return false;
						}

						showYJ(d, full);
					},
					error: function () {
						//当天无数据则整月无数据
						var date = new Date(d);
						date.setDate(1);
						date.setHours(0,0,0,0);

						var nextMonth = new Date(date);
						nextMonth.setMonth(nextMonth.getMonth() + 1);
						do{
							_data.yj[[date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').replace(/-/g, '')] = 'nodata';
						}while(date.setDate(date.getDate() + 1) < nextMonth);

					},
					dataType: 'json'
				});
			}
			else{
				// $('.no_schedule').remove();
				// $('.noschedule').removeClass('noschedule');
				if(full == 'full'){
					$('\
					<div class="yj fullBox none">\
						<a onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'黄历\', \''+ appData.get('date') +'\'])" href="/third_cooperation/qqgroup/lunar.html">\
							<span>今日宜：'+ yj.yi +'</span>\
						</a>\
					</div><div class="e_clear"></div>').appendTo('.todayOther dt');

					var yjimg = new Image;
					yjimg.onload = function () {
						$('.yj a').prepend('<img src="'+ yjimg.src +'" width="100%">');
						$('.yj').show();
					}
					yjimg.onerror = function () {
						yjimg.src = '/third_cooperation/qqgroup/images/fullError.png';
					}
					yjimg.src = '/third_cooperation/qqgroup/images/huangli.png';
				}
				else{
					$('\
					<div class="yj half none">\
						<a onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'黄历\', \''+ appData.get('date') +'\'])" href="/third_cooperation/qqgroup/lunar.html">\
							<span>今日宜：'+ yj.yi +'</span>\
						</a>\
					</div><div class="e_clear"></div>').appendTo('.todayOther dt');

					var yjimg = new Image;
					yjimg.onload = function () {
						$('.yj a').prepend('<img src="'+ yjimg.src +'" width="100%">');
						$('.yj').show();
					}
					yjimg.onerror = function () {
						yjimg.src = '/third_cooperation/qqgroup/images/nFullError.png';
					}
					yjimg.src = '/third_cooperation/qqgroup/images/huangli_s.png';
				}
				//有黄历的情况下需要修补高度
				$('.schedule_list').height('auto');
			}
		}

		/**
		 * 获取群信息
		 */
		
		var access_token = util.query('access_token');
		var openid = util.query('openid');
		var group_openid = util.query('group_openid');
		var cid = 0;

		var identity = 0;
		var accessType = 0;

		(function () {
			$.ajax({
				url:'/mobile-qqun/getQunInfo.do',
				data: {
					access_token: access_token,
					openid: openid,
					group_openid: group_openid,
					t: +new Date()
				},
				dataType: 'json',
				success: function (data) {
					//刷新用户身份
					$.ajax({
						url: '/mobile-qqun/refreshUserInfo.do',
						data: {
							access_token: access_token,
							openid: openid,
							group_openid: group_openid,
							t: +new Date()
						},
						dataType: 'json',
						success: function (_data) {
							if(_data.state !== 'ok'){
								throw('刷新用户身份失败');
							}
							identity = _data.identity;
							accessType = _data.accessType;
							appData.set('identity', _data.identity);
							appData.set('accessType', _data.accessType);
							
							if(identity == 1){
								$('.power_btn').remove();
							}

							cid = data.cid;
							$('.schedule_list').on('tap', 'dl:not(.nsch):not(.fsch)', function () {
								var sid = $(this).data('sid');
								var uuid = $(this).data('uuid');
								window.location.href = '/third_cooperation/qqgroup/schedule.html?sid=' + sid + '&cid=' + cid + '&uuid=' + uuid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid;
							});

							$('.list_btn').attr('href', $('.list_btn').data('href') + '?cid=' + cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid);
							$('.power_btn').attr('href', $('.power_btn').data('href') + '?cid=' + cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid);

							//判断禁言
							if(accessType == 1){
								$('.create_btn').attr('href', 'javascript:;').addClass('forbiddenSpeak').on('tap', forbiddenSpeak);
							}
							else{
								$('.create_btn').attr('href', $('.create_btn').data('href') + '?cid=' + cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid);
							}
							$('.create_btn').removeClass('none');

							//管理面板
							$('.tools_btn').on('tap', showSet);
							var viewDate = appData.get('date');
							viewDate = viewDate || new Date();
							amplify.publish('over:renderMonth', new Date(viewDate));
							amplify.publish('over:changeDate', new Date(viewDate));

						}
					});
				}
			})
		})();

		function forbiddenSpeak () {
			plug.alert('','群主收回了您创建日程的权利<br />请联系群主');
		}

		function showSet () {
			$('.tools').fadeIn('fast');
			$('<div class="mask"></div>').appendTo('body').fadeIn('fast');
			$('.mask, .week_btn').on('tap.mask', function () {
				$('.mask').fadeOut(function () {
					$(this).remove();
				});
				$('.week_btn').off('tap.mask')
				$('.tools').fadeOut('fast');
			});
		}

		function loading () {
			if($('.loading').length != 0)return false;
			$('.schedule_list').addClass('noschedule').html('<div class="loading"><img src="/third_cooperation/qqgroup/images/loading.gif" width="16" height="16"></div>');
		}
		function initScheduleUI (data) {
			var schedules = data;

			schedules.sort(function (x, y) {
				if(x.allday_event && y.allday_event){
					var order = {
						'birthday': 3,
						'study': 2,
						'game': 1
					};
					return (order[y.extend.point] || 0) - (order[x.extend.point] || 0);
				}
				else if(x.allday_event){
					return -1
				}
				else if(y.allday_event){
					return 1
				}
				else{
					var d = new Date(x.start_time.replace(/-/g, '/')) - new Date(y.start_time.replace(/-/g, '/'));
					if(!d){
						var order = {
							'birthday': 3,
							'study': 2,
							'game': 1
						};
						return (order[y.extend.point] || 0) - (order[x.extend.point] || 0);
					}
					return d > 0 ? 1 : 0;
				}
			});

			var html = util.format('\
				<dl data-sid="{$id}" data-uuid="{$uuid}">\
					<dd class="schBody">\
						<span class="time">{$startDesc}</span>\
						<span class="over_time">{$endDesc}</span>\
					</dd>\
					<dt>{$text}</dt>\
					{$extend}\
				</dl>\
			', schedules, {
				'startDesc': function (o, p, d, i) {
					return p['allday_event'] ? '全天' : o;
				},
				'text': function(o, p, d, i) {
					o = o.replace(/&amp;/g, "&");
					o = o.replace(/</g, "&lt;");
					o = o.replace(/>/g, "&gt;");
					o = o.replace(/ /g, "&nbsp;");
					o = o.replace(/\'/g, "&#39;");
					o = o.replace(/\"/g, "&quot;");
					var extend = p.extend;
					var point = '';
					if(extend != '{}'){ 
						point = JSON.parse(extend).point;
					}
					o = point ? '<img src="/third_cooperation/qqgroup/images/scheduleIcon/'+point+'_schedule.png" width="20" style="float:left; margin-right: 12px;" alt="">' + o : o;
					return o;
				},
				'extend': function (o, p) {
					if(o.sCalName){
						return '<dd class="extend">来自'+o.sCalName+'</dd>'
					}
					return ''
				}
			});

			var _html = '';
			if(html){
				_html = '<div class="mainpanel e_clear">'+html+'</div>';
			}
			else{
				_html = '\
				<div class="mainpanel e_clear">\
					<dl class="nsch">\
						<dd class="schBody">\
							<span class="time">暂无群日程</span>\
						</dd>\
						<dt>快来添加群日程,让小伙伴都来参加吧!</dt>\
					</dl>\
				</div>';
			}
			$('.schedule_list').html(_html);

			if(accessType == 1){
				$('\
					<dl class="fsch">\
						<dd class="schBody">\
							<span class="time">提示</span>\
						</dd>\
						<dt>群主收回了您创建日程的权利，请联系群主.</dt>\
					</dl>\
				').prependTo('.mainpanel');
			}

			$('.schedule_list').height('auto');
			// $('.logo').css('position', 'static');

			$('.schedule_list').removeClass('noschedule');
			//修补高度
			setTimeout(function () {
				var wh = $(window).height();
				var ch = $('.calendar_main').height();
				if(wh - ch - 46 > $('.schedule_list').height()){
					$('.schedule_list').height(wh - ch - 56);
				}
			}, 0);
		}

		function showScheduleDay (data) {
			$('.js-cld-panel li').removeClass('has_schedule');
			delete data.state;
			var gird;
			for(var i in data){
				gird = $('li[data-date="' + i.replace(/-/g, '\/') + '"]');
				gird.addClass('has_schedule');
				if(data[i] != 0){
					// gird.find('.solar_data, .lunar_data').addClass('none');
					// $('<a href="javascript:;" class="scheduleIconForList" style="background-image:url(/third_cooperation/qqgroup/images/scheduleIcon/'+data[i]+'_list.png)" />').appendTo(gird.find('.grid'));

					gird.addClass('schedule_icon_'+data[i])
				}
			}
		}
	}
});