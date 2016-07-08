define(['zepto','amplify', 'monthView', 'util', 'appData', 'lunar'],function($,amplify, mv, util, appData, L) {
	var _data = {
		viewType: 'month',
		yj: {},
		getYYState: []
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
        document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '')
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

		amplify.subscribe('getYY', function (type) {
			_data.getYYState.push(type);
			var bannerId = GetCookie('bannerId');
			if(_data.getYYState.length == 3 && bannerId){
				var ts = $('[data-bannerId]');
				if(ts.length == 0){
					plug.alert('', '内容君离家出走了<br />下次不要错过哦！');
				}
				else{
					setTimeout(function () {
						$('body').scrollTop($('.schedule_list').position().top + $('.yy').position().top - 20);
						if(ts.data('bannerid') != bannerId){
							plug.alert('', '内容更新啦，请主银立即尝鲜');
						}
					}, 500);
				}
				_data.getYYState.length = 0;
				deleteCookie('bannerId');
			}
			else if(_data.getYYState.length == 3){
				if($('.oth').html() == '' && $('.ads').html() == '' && $('.tsch').length == 0){
					$('.yy').remove();
				}
				_data.getYYState.length = 0;
			}
		})

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
					var today = new Date;
					if([d.getFullYear(), d.getMonth(), d.getDate()].join('') == [today.getFullYear(), today.getMonth(), today.getDate()].join('')){
						getTSchedule(d);
					}
					else{
						amplify.publish('getYY','getTSchedule');
						$('.tsch').remove();
					}
					getOther(d);
					getAds(d);
				},
				error: function () {
					//插入空数据
					initScheduleUI([]);
					if([d.getFullYear(), d.getMonth(), d.getDate()].join('') == [today.getFullYear(), today.getMonth(), today.getDate()].join('')){
						getTSchedule(d);
					}
					else{
						amplify.publish('getYY','getTSchedule');
						$('.tsch').remove();
					}
					getOther(d);
					getAds(d);
				}
			});

			/**
			 * 临时储存日期
			 */
			window.name.selectedDate = d;

			function getTSchedule (d) {
				_data.TSCH_ajax && _data.TSCH_ajax.abort() && (delete _data.TSCH_ajax);
				_data.TSCH_ajax = $.ajax({
					url: '/mobile-qqun/getRecommendSchedules.do',
					data: {
						date : (_data.loadingScheduleDate).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
						group_openid: group_openid,
						t: +new Date()
					},
					dataType: 'json',
					success: function (data) {
						delete _data.TSCH_ajax
						//如果已经发生下次请求，则不处理
						if(loadingScheduleDate !== _data.loadingScheduleDate){
							return false;
						}

						if(data.datas.length){
							showTSchedule(data, d);
						}
						else{
							$('.tsch').remove();
						}
						amplify.publish('getYY','getTSchedule');
					},
					error: function () {
						$('.tsch').remove();
						amplify.publish('getYY','getTSchedule');
					}
				});
			}

			function getOther (d) {
				_data.QP_ajax && _data.QP_ajax.abort() && (delete _data.QP_ajax);
				_data.QP_ajax = $.ajax({
					url: '/qqun/homepage.do',
					data: {
						date : (_data.loadingScheduleDate).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
						t: +new Date()
					},
					dataType: 'json',
					success: function (data) {
						delete _data.QP_ajax
						//如果已经发生下次请求，则不处理
						if(loadingScheduleDate !== _data.loadingScheduleDate){
							return false;
						}

						data.fantastic && showQPHIS(data.fantastic,d);

						amplify.publish('getYY','getOther');
					}
				});
			}

			function getAds (d) {
				_data.AD_HLajax && _data.AD_HLajax.abort() && (delete _data.AD_HLajax);
				_data.AD_HLajax = $.ajax({
					url: '/mobile-qqun/getAdvertisements.do',
					data: {
						date : (_data.loadingScheduleDate).replace(/\//g, '-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2'),
						t: +new Date()
					},
					dataType: 'json',
					success: function (data) {
						delete _data.AD_HLajax
						//如果已经发生下次请求，则不处理
						if(loadingScheduleDate !== _data.loadingScheduleDate){
							return false;
						}

						data.datas.length && showAd(data.datas,d);
						amplify.publish('getYY','getAds');
					},
					error: function () {
						amplify.publish('getYY','getAds');
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

		function showTSchedule (ts, d) {
			var html = '<img src="'+ts.logo+'" width="100%" alt="" data-bannerid="'+ts.bannerId+'" />' + util.format('\
				<div class="tschedule {$status} {$fdo}" data-order="{$i}" data-rank="{$rank}" data-pic="{$picture}" data-rid="{$id}" data-status="{$status}">\
					<a data-rid="{$id}" data-rank="{$rank}" data-order="{$i}" data-pic="{$picture}" data-status="{$status}" href="javascript:;" class="{$ufdo}"><img class="msk" src="/third_cooperation/qqgroup/images/lock.png" alt="" /><img src="{$picture}" alt="" class="icon" /></a>\
					<div class="tsInfo">\
						<h4>{$title}</h4>\
						<p>{$headers}<span>{$readership}</span></p>\
					</div>\
				</div>', ts.datas, {
					headers: function (o, p, d, i) {
						return util.format('<img src="{$h}" alt="" />', o.map(function (o, i) {
							return {h: o}
						}), {});
					},
					readership: function (o) {
						if(o){
							return o + '人已完成';
						}
						return '解锁，做解密徽章第一人';
					},
					status: function (o) {
						return o ? 'finished' : 'unfinished'
					},
					fdo: function (o, p) {
						return p.status ? 'do' : '';
					},
					ufdo: function (o, p) {
						return p.status ? '' : 'do';
					},
					i: function (o, p, d, i) {
						return i;
					},
					rank: function (o) {
						return o || 0;
					}
				});	
			$(html).appendTo('.tsch');

			$('.do').on('tap', doTSch);



			setTimeout(function () {
				var wh = $(window).height();
				var ch = $('.calendar_main').height();
					$('.schedule_list').height('auto');
				if(wh - ch - 46 - $('.schedule_list').height() >= 0){
					$('.schedule_list').height(wh - ch - 46);
				}
				else{
					$('.schedule_list').height('auto');
				}
			}, 0);
		}

		function doTSch () {
			var _this = $(this);
			var rid = _this.data('rid');
			var status = _this.data('status');
			var pic = _this.data('pic');
			var rank = _this.data('rank');
			var order = _this.data('order');
			if(status == 'finished'){
				return showIcon({
					rid: rid,
					pic: pic,
					rank: rank,
					order: order,
					status: status
				});
			}
			$.ajax({
				url: '/mobile-qqun/completeRecommendedSchedule.do',
				data: {
					rid: rid,
					group_openid: group_openid,
					t: +new Date
				},
				dataType: 'json',
				success: function (data) {
					if(data.state == 'ok'){
						showIcon({
							rid: rid,
							pic: pic,
							rank: data.rank,
							order: order
						});

						$('.tschedule[data-rid="'+rid+'"], .tschedule[data-rid="'+rid+'"] a').removeClass('unfinished do').addClass('finished do').data('status', 'finished').data('rank', data.rank);

						$('.tschedule[data-rid="'+rid+'"] .tsInfo span').html(data.rank + '人已完成');

						$('.tschedule[data-rid="'+rid+'"] .tsInfo img').remove();
						
						$(util.format('<img src="{$h}" alt="" />', data.headers.map(function (o, i) {
							return {h: o}
						}), {})).prependTo('.tschedule[data-rid="'+rid+'"] .tsInfo p');

						$('.do').off('tap').on('tap', doTSch);
					}
				}
			});
		}
		function showIcon (o) {
			var rank = o.rank + '';

			var _num = '';
			for (var i = 0; i < rank.length; i++) {
				_num += '<em><span class="iconAnimateNum" data-num="'+rank[i]+'"></span></em>';
			};

			$('\
				<div class="iconAnimate">\
					<a href="javascript:;" class="iconAnimateClose">关闭</a>\
					<div class="mask" style="background-color: rgba(0,0,0,.5)"></div>\
					<img class="iconAnimateTop animated" src="/third_cooperation/qqgroup/images/iconAnimateTop'+o.order+'.png" width="219" alt="" />\
					<div class="iconAnimateMsk iconAnimateMsk_'+o.order+' animated">\
						<img class="msk" src="/third_cooperation/qqgroup/images/icon_msk.png" width="192" alt="" />\
						<img class="lock animated" src="/third_cooperation/qqgroup/images/lock.png" width="50" alt="" />\
					</div>\
					<img src="'+o.pic+'" alt="" width="192" class="iconAnimateIcon animated iconAnimateIcon_'+o.order+'" />\
					<div class="iconAnimateTip animated"><img class="lock" src="/third_cooperation/qqgroup/images/iconAnimateTip.png" width="103" alt="" /></div>\
					<div class="iconAnimateRank animated">'+_num+'</div>\
				</div>\
			').appendTo('body');
			$('.mask').fadeIn(function () {
				if(o.status == 'finished'){
					setTimeout(function () {
						$('.iconAnimateIcon').addClass('flip');
						setTimeout(function () {
							$('.iconAnimateTop').addClass('fadeInDown');
							setTimeout(function () {
								$('.iconAnimateTip').addClass('fadeInUp');
								setTimeout(function () {
									$('.iconAnimateRank').addClass('fadeInUp');
									$('.iconAnimateClose').fadeIn();
									$('.iconAnimateClose').on('tap', function () {
										setTimeout(function () {
											$('.iconAnimate').fadeOut(function () {
												$('.iconAnimate').remove();
											})
										}, 500)
									});

									$('.lock').addClass('swing');
									// $('.iconAnimateIcon').show();
									setTimeout(function () {
										// $('.iconAnimateMsk').removeClass('flip').addClass('fadeOut');

										$('.iconAnimateNum').each(function (i, o) {
											(function (_i, _o) {
												setTimeout(function () {
													$(_o).addClass('qqshake');
													setTimeout(function () {
														var _this = $(_o)
														_this.addClass('iconAnimateNum_' + _this.data('num'));
													}, 200)
												}, 100 * _i);
											})(i, o)
										});

									}, 1200)

								}, 300)
							}, 300);
						}, 800)
					}, 100)
				}
				else{
					setTimeout(function () {
						$('.iconAnimateMsk').addClass('flip');
						setTimeout(function () {
							$('.iconAnimateTop').addClass('fadeInDown');
							setTimeout(function () {
								$('.iconAnimateTip').addClass('fadeInUp');
								setTimeout(function () {
									$('.iconAnimateRank').addClass('fadeInUp');
									$('.iconAnimateClose').fadeIn();
									$('.iconAnimateClose').on('tap', function () {
										setTimeout(function () {
											$('.iconAnimate').fadeOut(function () {
												$('.iconAnimate').remove();
											})
										}, 500)
									});

									$('.lock').addClass('swing');
									$('.iconAnimateIcon').show();
									setTimeout(function () {
										$('.iconAnimateMsk').removeClass('flip').addClass('fadeOut');

										$('.iconAnimateNum').each(function (i, o) {
											(function (_i, _o) {
												setTimeout(function () {
													$(_o).addClass('qqshake');
													setTimeout(function () {
														var _this = $(_o)
														_this.addClass('iconAnimateNum_' + _this.data('num'));
													}, 200)
												}, 100 * _i);
											})(i, o)
										});

									}, 1200)

								}, 300)
							}, 300);
						}, 800)
					}, 100)
				}
			});
		}

		function showAd (ad,d) {
			$('<dl class="nsch">\
					<dt></dt>\
				</dl>').appendTo('.ads');


			// 用户1`群1^ad1,ad2`群2^ad2,ad3|用户2`群1^ad3
			var closeAD = parseCloseAD(GetCookie('closedAD') || '');

			for (var i = 0; i < ad.length; i++) {
				var id = ad[i].id;
				closeAD[openid] && closeAD[openid][group_openid] && closeAD[openid][group_openid][id] && (ad.splice(i, 1), i--);
			};

			$(util.format('\
				<div class="fullBox ad">\
					<a href="javascript:;" class="close" data-id="{$id}"></a>\
					<a class="info" onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'广告\', \'{$title}\'])" href="{$linkurl}">\
						<span class="qpTitle">{$title}</span>\
						<span class="qpDesc">{$description}</span>\
						<img src="{$picture}" height="100%" alt="" />\
					</a>\
				</div>\
			', ad, {})).appendTo('.ads dt');

			$('.ad .close').off('tap').on('tap', function () {
				var id = $(this).data('id');
				closeAD[openid] || (closeAD[openid] = {});
				closeAD[openid][group_openid] || (closeAD[openid][group_openid] = {});
				closeAD[openid][group_openid][id] = 1;
				setCookie('closedAD', getCloseAD(closeAD), 5);

				$(this).parent().fadeOut(function () {
					$(this).remove()
				});
			})

			setTimeout(function () {
				var wh = $(window).height();
				var ch = $('.calendar_main').height();
					$('.schedule_list').height('auto');
				if(wh - ch - 46 - $('.schedule_list').height() >= 0){
					$('.schedule_list').height(wh - ch - 46);
				}
				else{
					$('.schedule_list').height('auto');
				}
			}, 0);
		}

		function getCloseAD (data) {
			var s = '';
			for(var user in data){
				s += user + '`';
				for(var group in data[user]){
					s += group + '^';
					for (var ad in data[user][group]) {
						s += ad + ',';
					};
					s = s.substr(0, s.length - 1) + '`';
				}
				s = s.substr(0, s.length - 1) + '|';
			}
			return s.substr(0, s.length - 1);
		}

		function parseCloseAD (data) {
			var j = {};
			if(!data){
				return j;
			}

			// debugger
			var users = data.split('|');
			for (var i = 0; i < users.length; i++) {
				var groups = users[i].split('`');
				var user = groups.shift();
				j[user] = {};
				// debugger
				for (var _i = 0; _i < groups.length; _i++) {
					var ads = groups[_i].split('^')
					//群
					var group = ads.shift();
					j[user][group] = {};
					var ad = ads.join('').split(',');
					for (var __i = 0; __i < ad.length; __i++) {
						j[user][group][ad[__i]] = 1;
					};
				};
			};

			return j;
		}

		function showQPHIS (qp,d) {

			$('<dl class="todayOther nsch">\
					<dt></dt>\
				</dl>').appendTo('.oth');

			$('\
				<div class="fullBox qp">\
					<a class="info" onclick="_hmt.push([\'_trackEvent\', \'QQ群\', \'点击\', \'节日说\', \''+ qp.title +'\'])" href="'+ qp.linkurl +'?needMore=true">\
						<span class="qpTitle"><span class="qpbefore">节日说&nbsp;&nbsp;|&nbsp;&nbsp;</span>'+ qp.title +'</span>\
						<span class="qpDesc">'+ qp.desc +'</span>\
						<span class="fullBoxMask"></span>\
						<img src="'+ qp.picture +'" height="100%">\
					</a>\
				</div>\
			').appendTo('.todayOther dt');

			setTimeout(function () {
				var wh = $(window).height();
				var ch = $('.calendar_main').height();
					$('.schedule_list').height('auto');
				if(wh - ch - 46 - $('.schedule_list').height() >= 0){
					$('.schedule_list').height(wh - ch - 46);
				}
				else{
					$('.schedule_list').height('auto');
				}
			}, 0);
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
							$('.alarm_btn').attr('href', $('.alarm_btn').data('href') + '?cid=' + cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid);

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
					return 1
				}
				else if(y.allday_event){
					return -1
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
							<span class="time">暂无日程</span>\
						</dd>\
						<dt><a href="/third_cooperation/qqgroup/create_schedule.html?cid=' + cid + '&access_token=' + access_token + '&openid=' + openid + '&group_openid=' + group_openid + '" class="create_btn2">+ 创建日程, 和小伙伴一起玩转群日历</a></dt>\
					</dl>\
				</div>';
			}
			$('.schedule_list').html('<div class="sch"></div><div class="yy"><div class="tsch"></div><div class="oth"></div><div class="ads"></div></div>');
			$('.sch').html(_html);

			if(accessType == 1){
				$('.mainpanel').html('');
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
					$('.schedule_list').height('auto');
				if(wh - ch - 46 - $('.schedule_list').height() >= 0){
					$('.schedule_list').height(wh - ch - 46);
				}
				else{
					$('.schedule_list').height('auto');
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