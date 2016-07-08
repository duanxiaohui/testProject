/**
 * 中秋节
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-09-11 14:08:57
 */
(function () {
	var _data = {};
	var to;
	var from;
	var job;
	var customer;
	var beginDate;
	var endDate;
	var q = {
		initPreview: function () {
			if(!app.getUa.weixin){
				$('.tip').html('365日历已为您创建了“回家日程”，我们将会提前给您发送日程提醒，让爱准时回家…');
				$('.share').on('tap', function () {
					app.call({
		                action: 'share',
		                params: [
		                    {
		                        name: 'shareString',
			        			value: JSON.stringify({
			        				title: '团圆请假单，让爱不缺席',
			        				content: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
			        				link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
			        				image: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
			        				isEvent: 'true'
			        			})
		                    }
		                ],
		                callBack: function (headers) {}
		            });
				});
			}
			else{
				$('.tip').html('我们已为您创建了“回家日程”，使用365日历并用微信登入，我们将会提前给您发送日程提醒，让爱准时回家……');
				$('.share').hide();
				// $('.line').removeClass('none');
				// $('.open365').removeClass('none').on('tap', function () {
				// 	var iframe = document.createElement("iframe");
				// 	iframe.style.display = "none";
				// 	iframe.src = '/pages/bd/MidAutumn-2015/openApp.html';
				// 	document.body.appendChild(iframe);

				// 	app.open('coco://365rili.com', app.getUa.ios);
				// });
			}
			to = app.query('to');
			from = app.query('from');
			job = app.query('job');
			customer = app.query('customer');
			beginDate = app.query('beginDate');
			endDate = app.query('endDate');

			var data = {
				to : to,
				from : from,
				job : job,
				customer : customer,
				beginDate : beginDate,
				endDate : endDate
			};

			var html = template('\
			<p>还记得，上一次回家<br>已经是{$beginDate}的事儿了...<br>我已经{$beginEnd}天没有回家了。</p>\
			<p>致亲爱的{$to}：<br>对不起，今年中秋不能回家了，<br>作为一名{$job}，{$customer}需要我。<br>在这里，我要向您请个假！</p>\
			<p>我计划在{$endDate}回家，<br>距离这一天还有{$nowEnd}天，<br>这是我们的约定！</p>\
			<p class="from">申请人：{$from}</p>\
			', data, {
				beginEnd: function (o, p) {
					var b = new Date(p.beginDate.replace('年', '\/').replace('月', '') + '/01');
					var e = new Date();
					e.setHours(0,0,0,0);

					var s = e - b;
					return s / 1000 / 60 / 60 / 24;
				},
				nowEnd: function (o, p) {
					var b = new Date();
					b.setHours(0,0,0,0);
					var e = new Date(p.endDate.replace('年', '\/').replace('月', '') + '/01');

					var s = e - b;
					var nowEnd = s / 1000 / 60 / 60 / 24;
					_data.nowEnd = nowEnd;
					return nowEnd;
				}
			});
			$('.main').html(html);

			$('.bg').height($(document).height());

			$('.build').on('tap', q.showMail);

			wxProtocol.init(function (wx, link) {
				wx.onMenuShareAppMessage({
			        title: '团圆请假单，让爱不缺席，我计划' + _data.nowEnd + '天后回家',
			        desc: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
			        link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
					imgUrl: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
					success: postShare
			    });
			    wx.onMenuShareTimeline({
			        title: '团圆请假单，让爱不缺席，我计划' + _data.nowEnd + '天后回家',
			        link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
					imgUrl: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
					success: postShare
			    });
			});

			function postShare () {
				$.ajax({
					url: '/pages/bd/MidAutumn-2015/shareInWX.html?ch=s'
				})
			}
		},
		initCase: function () {
			$('.share').hide();
			to = app.query('to');
			from = app.query('from1');
			job = app.query('job');
			customer = app.query('customer');
			beginDate = app.query('beginDate');
			endDate = app.query('endDate');

			var data = {
				to : to,
				from : from,
				job : job,
				customer : customer,
				beginDate : beginDate,
				endDate : endDate
			};

			var html = template('\
			<p>还记得，上一次回家<br>已经是<span>{$beginDate}</span>的事儿了...<br>我已经<span>{$beginEnd}</span>天没有回家了。</p>\
			<p>致亲爱的{$to}：<br>对不起，今年中秋不能回家了，<br>作为一名{$job}，{$customer}需要我。<br>在这里，我要向您请个假！</p>\
			<p>我计划在<span>{$endDate}</span>回家，<br>距离这一天还有<strong class="t_num">{$nowEnd}</strong>天，<br>这是我们的约定！</p>\
			<p class="from">申请人：{$from}</p>\
			', data, {
				beginEnd: function (o, p) {
					var b = new Date(p.beginDate.replace('年', '\/').replace('月', '') + '/01');
					var e = new Date();
					e.setHours(0,0,0,0);

					var s = e - b;
					return s / 1000 / 60 / 60 / 24;
				},
				nowEnd: function (o, p) {
					var b = new Date();
					b.setHours(0,0,0,0);
					var e = new Date(p.endDate.replace('年', '\/').replace('月', '') + '/01');

					var s = e - b;
					var nowEnd = s / 1000 / 60 / 60 / 24;
					_data.nowEnd = nowEnd;
					setTimeout(function () {
						q.show_num(nowEnd);
					},100);
					return '';
				}
			});
			$('.main').html(html);

			setTimeout(function () {
				$('.bg').height($(document).height());
			}, 116);

			$('.build').on('tap', function () {
				window.location.href = '/pages/bd/MidAutumn-2015/s/index.html?isLoaded=1';
			});

			wxProtocol.init(function (wx, link) {
				wx.onMenuShareAppMessage({
			        title: '团圆请假单，让爱不缺席，我计划' + _data.nowEnd + '天后回家',
			        desc: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
			        link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
					imgUrl: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
					success: postShare
			    });
			    wx.onMenuShareTimeline({
			        title: '团圆请假单，让爱不缺席，我计划' + _data.nowEnd + '天后回家',
			        link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
					imgUrl: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
					success: postShare
			    });
			});

			function postShare () {
				$.ajax({
					url: '/pages/bd/MidAutumn-2015/shareInWX.html?ch=s'
				})
			}
		},
		showMail: function () {
			$(window).scrollTop(0);
			$('.mailBox').removeClass('none');
			$('.maskTip').fadeIn('fast');
			$('.mask').fadeIn('fast');
			$('.mail').fadeIn('fast', function () {
				setTimeout(q.lettleFly, 500);
				$('body').on('tap.mail', function () {
					$('body').off('tap.mail');
					$('.lettle').removeClass('lettleFly');
					$('.mail').fadeOut('fast');
					$('.mask').fadeOut('fast');
					$('.maskTip').fadeOut('fast');
					if(app.getUa.weixin){
						$('.wxShare').fadeOut('fast');
					}
					setTimeout(function () {
						$('.mailBox').addClass('none');
					}, 300);
				});
			});
		},
		lettleFly: function () {
			$('.lettle').addClass('lettleFly').on('webkitAnimationEnd', q.showShare);
		},
		showShare: function () {
			if(app.getUa.weixin){
				$('.wxShare').fadeIn('fast');
			}
			else{
				app.call({
                    action: 'share',
                    params: [
                        {
                            name: 'shareString',
		        			value: JSON.stringify({
		        				title: '团圆请假单，让爱不缺席，我计划' + _data.nowEnd + '天后回家',
		        				content: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
		        				link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/s/index.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&'),
		        				image: 'http://www.365rili.com/pages/bd/MidAutumn-2015/images/wx.jpg',
		        				isEvent: 'true'
		        			})
                        }
                    ],
                    callBack: function (headers) {}
                });
			}
		},
		show_num: function (n) { 
		    var it = $(".t_num i");
			var len = String(n).length;
			for (var i = 0; i < len; i++) {
			    if (it.length <= i) {
			        $(".t_num").append("<i></i>");
			    }
			    var num = String(n).charAt(i);
			    var y = -parseInt(num) * 44;
			    (function (_i, _y) {
			    	setTimeout(function () {
				    	$(".t_num i").eq(_i).css({
					    	'background-position': '0 ' + String(_y) + 'px'
					    });
				    }, 100);
			    })(i, y)
			    // obj.animate({
			    //     backgroundPosition: '(0 ' + String(y) + 'px)'
			    // }, 'slow', 'swing', function() {});
			}
		} 
	};
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
	t == 'preview' ? q.initPreview() : q.initCase();
})();