/**
 * active
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-03-24 16:40:20
 */

(function () {

	function stopDefault( e ) { 
	    if ( e && e.preventDefault ) 
	        e.preventDefault(); 
	    else
	        window.event.returnValue = false; 
	    return false; 
	}
	$(window).on('touchstart', stopDefault);
	$(window).on('pointerdown', stopDefault);

	window.active = getURLParameter('active');
	window.startIds = {
		'qd': 1
	};
	window.shareTxt = {
		'qd': '他在愚人节结束生命，他已经离开我们12年。'
	};
	window.signSize = {
		'qd': {w:116, h:51}
	}
	window.startNames = {
		'qd': '张国荣'
	};
	var temp = '<li>\
					<div class="point"></div>\
					<div class="cont">\
						<h4 class="title hide animated">{$title}</h4>\
						<div class="cont_inner hide animated">\
							<p class="txt">{$content}</p>\
							{$imgs}\
						</div>\
					</div>\
				</li>';
	var linesHeight = 0;
	var scroll = null;
	var active_data = data[active];
	var active_pos = [];
	var active_shareNum = 0;
	var active_img_len = active_img_len_static = (function () {
		var len = 0;
		for (var i = 0; i < active_data.length; i++) {
			len += active_data[i].imgNum;
		};
		return len + 3;
	})();

	app.getUa.weixin || $('.share_btn').on('tap', share);
	$('.share').on('tap', share);
	// app.getUa.weixin && $('.score').hide();

	if(getURLParameter('isShowbar') == 1){
		$('body').addClass('weixin');
	}
	var wh = $(window).height() - $('.bar').height();
	$('.content').height(wh);

if(!app.getUa.weixin && app.getUa.android){
	window.onblur= function(){
		$('audio')[0].pause();
		$('.music').removeClass('active').removeClass('stop').addClass('stop');
		window.onfocus = function () {
			$('audio')[0].play();
			$('.music').removeClass('active').removeClass('stop').addClass('active');
			window.onfocus = function(){};
		}
	};

	
    var hidden, state, visibilityChange;
    if (typeof document.hidden !== 'undefined') {
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
      state = 'visibilityState';
    } else if (typeof document.mozHidden !== 'undefined') {
      hidden = 'mozHidden';
      visibilityChange = 'mozvisibilitychange';
      state = 'mozVisibilityState';
    } else if (typeof document.msHidden !== 'undefined') {
      hidden = 'msHidden';
      visibilityChange = 'msvisibilitychange';
      state = 'msVisibilityState';
    } else if (typeof document.webkitHidden !== 'undefined') {
      hidden = 'webkitHidden';
      visibilityChange = 'webkitvisibilitychange';
      state = 'webkitVisibilityState';
    }
    document.addEventListener(visibilityChange, function(e) {
    	if(document[hidden]){
    		$('audio')[0].pause();
    		$('.music').removeClass('active').removeClass('stop').addClass('stop');
    	}
    	else{
			$('audio')[0].play();
			$('.music').removeClass('active').removeClass('stop').addClass('active');
    	}
    }, false);
}

	loadResource();

	function setPre (n) {
		n = Math.ceil(n * 100.00);
		setTimeout(function () {
			$('.loading_txt').html(n + '%');
		}, 0);
	}

	function loadResource(){
		setPre(0)
		var data = active_data;
		var o = null;
		var num = 0;
		for (var i = 0; i < data.length; i++) {
			o = data[i];
			num = o.imgNum;
			for (var _i = 0; _i < num; _i++) {
				num == 1 ?
					loadImage('/pages/bd/hjmdl/images/'+active+'/' + (i + 1) + '.jpg') : 
					loadImage('/pages/bd/hjmdl/images/'+active+'/' + (i + 1) + '-' + (_i + 1) + '.jpg');
			};
		};

		loadImage('/pages/bd/hjmdl/images/'+active+'/'+active+'_color.jpg');
		loadImage('/pages/bd/hjmdl/images/'+active+'/'+active+'_black.jpg');
		// loadImage('/pages/bd/hjmdl/images/'+active+'/bir.png');
		// loadImage('/pages/bd/hjmdl/images/'+active+'/sign.png');
		var mp3Name = active;
		if(active == 'ln'){
			mp3Name = 'ln1'
		}
		if(!app.getUa.weixin && app.getUa.android){
			loadMp3('/pages/bd/hjmdl/mp3/20s/' + mp3Name + '.mp3?t=20150403_1');
		}
		else{
			loadMp3('/pages/bd/hjmdl/mp3/' + mp3Name + '.mp3?t=20150403_1');
		}
	}

	function loadMp3 (src) {
		if(!app.getUa.weixin && app.getUa.android){
			$('<audio preload><source src="'+src+'" /></audio>').appendTo('body');//.on('canplaythrough', setMp3);
		}
		else{
			$('<audio loop preload><source src="'+src+'" /></audio>').appendTo('body');//.on('canplaythrough', setMp3);
		}
		setMp3();
	}

	function setMp3 () {
		loadSuccess();
		document.addEventListener("WeixinJSBridgeReady", function () {
	        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
				$('audio')[0].play();
	        });
	    }, false);
		// $('audio')[0].play();
		$('.music').on('tap', playOrPaused);
		// $('.music').addClass('go');
	}

	function playOrPaused(){
		$('.music').removeClass('active');
		setTimeout(function () {
			$('.music').addClass('active')
		}, 0)
		var audio = $('audio')[0];
		var _this = $(this);
		if(audio.paused){
			_this.removeClass('stop');
			audio.play();
			return;
		}
		_this.addClass('stop');
		audio.pause();
	}

	function loadImage (src) {
		var loadNum = this.loadNum || 0;
		var img = new Image;
		
		img.onload = loadSuccess;
		img.onerror = loadFailed;
		img.src = src;

		//设置读取次数
		img.loadNum = ++loadNum;
	}

	function loadSuccess () {
		active_img_len--;
		setPre((active_img_len_static - active_img_len) / active_img_len_static);
		if(active_img_len == 0){
			setTimeout(function () {
				$('.loading').fadeOut(function () {
					$(this).remove();
				});
				if(!app.getUa.weixin){
					return showStart();
				}
				$('.start').remove();
				setList();
			}, 300);
		}
	}

	function showStart () {
		$('.start').show('fast');

		$('.start_btn').on('tap', function () {
			$('audio')[0].play();
			// $('.music').css({
			// 	top: $('.timeline').position().top + 18 + 'px'
			// });
			$('.start').fadeOut('fast', function () {
				setList();	
			})
		})
	}

	function loadFailed () {
		if(this.loadNum > 5){
			return loadSuccess();
		}
		loadImage.call(this, this.src);
	}

	function getHeight (html) {
		var w = $(window).width();
		var box = $('.timeline');
		// box.css({
		// 	width: w - 48 - 26 + 'px',
		// 	position: 'absolute',
		// 	left: w + 'px'
		// });

		// box.html(html).appendTo('body');

		setTimeout(function () {
			var _i = 0;
			box.find('li').each(function (i, o) {
				_i = i;
				active_pos.push({index: i, pos: $(o).position()['top']});
			});
			active_pos.shift();
			active_pos.shift();
			// setLinesHeight(box);
		}, 100);
	}

	function setLinesHeight (box) {
		linesHeight = box.height() - box.find('li:last-child').height() - 10;
		// box.remove();
		setTimeout(function () {
			alert(box.height() - box.find('li:last-child').height() - 10);
		})
	}

	function setList () {
		var html = template(temp, active_data, {
			imgs: function (o, p, d, index) {
				var num = p.imgNum;
				var imgHTML = [];
				for (var i = 0; i < num; i++) {
					num == 1 ?
						imgHTML.push('<img class="img" src="/pages/bd/hjmdl/images/'+active+'/' + (index + 1) + '.jpg" alt="">') : 
						imgHTML.push('<img class="img" src="/pages/bd/hjmdl/images/'+active+'/' + (index + 1) + '-' + (i + 1) + '.jpg" alt="">')
				};
				return imgHTML.join('');
			}
		});

		var win = $(window);
		$('.timeline').html(html);

		setTimeout(function () {
			$('.tool').fadeIn('slow');
		}, 300);

		getHeight(html);

		startAnimation();
	}

	/**
	 * 这里开始有点脏
	 */
	function startAnimation() {
		$('\
		<img class="photo_black hide" width="100%" src="/pages/bd/hjmdl/images/'+active+'/'+active+'_black.jpg" alt="">\
	    <img class="photo_color" width="100%" src="/pages/bd/hjmdl/images/'+active+'/'+active+'_color.jpg" alt="">\
	    ').appendTo('.photo');
	    setTimeout(function () {
	    	$('.photo_black').removeClass('hide');
	    }, 500);
	    setTimeout(function () {
	    	$('.photo_black').addClass('dark');
	    }, 1500);
		setTimeout(showPoint, 2300);
	}

	function setPosition (o, x, y) {
		o.css({
			position: 'absolute',
			left: x,
			top: parseInt(y) + $('.bar').height() + 'px',
			'z-index': 2
		});
	}

	function showPoint (i, n) {
		var o = $('<div class="point animated notList"></div>').appendTo('body');

		if(Object.prototype.toString.call(i).toLowerCase() == '[object undefined]') {
			setPosition(o, '26px', 20 + $('.timeline').position().top + 'px');
			o[0].addEventListener("webkitAnimationEnd", showLine, false);
			setTimeout(showTitle, 830);
			setTimeout(showContent, 2000);
			setTimeout(showTitle, 2500);
			setTimeout(showContent, 2500);
		}
		else{
			setPosition(o, '26px', i * 53 + 22 + 'px');
			setTimeout(function () {
				o.removeClass('fadeIn').addClass('zoomOutDown')[0].addEventListener('webkitAnimationEnd', function () {
					$(this).remove();
				});
				if(i == n){
					setTimeout(function () {
						$('.notList').removeClass('fadeIn').addClass('fadeOut');
						$('.timeline .point').addClass('animated fadeIn')[0].addEventListener('webkitAnimationEnd', function () {
							this.removeEventListener('webkitAnimationEnd', arguments.callee);
							setTimeout(function () {
								scroll = new IScroll('.content', {
									hScroll: false,
									momentum: true,
									bounce: false,
									probeType: 3
								});
								scroll.on('scroll', checkPoint);
							}, 0);
						});
					}, 2000);
				}
			},200 * (n - i) + 1000);
		}

		o.addClass('fadeIn');
	}

	function setEnd () {
		scroll.off('scrollEnd', setEnd);
		if($('.scrollBg').length){
			return;
		}

		var div = $('\
			<div class="scrollBg">\
				<div class="scroll_inner">\
					<div><img class="logo animated" src="/pages/bd/hjmdl/images/logo.png" width="66" height="66" alt="" /></div>\
					<div style="margin-top:10px;"><img class="animated" src="/pages/bd/hjmdl/images/slogen.png" width="193" height="15" alt="" /></div>\
					<div style="margin-top:10px;"><img class="animated none slogen1" src="/pages/bd/hjmdl/images/slogen1.png" width="191" height="41" alt="" /></div>\
					<a class="animated none schedule">今年精彩赛程</a>\
					<a class="animated none share">分享</a>\
					<a class="animated none downLoad">下载365日历</a>\
				</div>\
			</div>\
			').appendTo('.content-inner');
		div.css('height', wh);
		setTimeout(function () {
			scroll.refresh();
		},0);

		if(app.getUa.weixin){
			$('.goBack').hide();
		}

		$('.goBack').on('tap', function () {
			window.history.go(-1);
		})

		// var mash = $('<div class="mash"></div>');
		// mash.css({
		// 	width:'100%',
		// 	height:wh + 'px',
		// 	position:'absolute',
		// 	top:0,
		// 	left:0,
		// 	background: '#000',
		// 	opacity:0,
		// 	'z-index': 4
		// }).appendTo('.main');
		scroll.on('scrollEnd', showEnd);
		$('.downLoad').on('tap', function () {
			$.ajax({
				url: '/operation/share.do?shareId=90&channel=weixin'
			})
			app.open('coco://365rili.com',app.getUa.ios,null,true);
		})
		$('.downLoad').on('tap', function () {
			$.ajax({
				url: '/operation/share.do?shareId=90&channel=weixin'
			})
			app.open('coco://365rili.com',app.getUa.ios,null,true);
		})
		$('.schedule').on('tap', function () {
			if(getURLParameter('isShowbar') != 1){
				return app.open(
	                {
	                    ios:'coco://365rili.com/subscribe?calendarID=125821987&calendarType=public',
	                    android:'coco://365rili.com/subscribe?calendarID=125821987'
	                },
	                app.getUa.ios,
	                function () {
	                	window.location.href = 'http://www.365rili.com/c/Mjc0Njc3MDUtZDc2Zi00N2ZjLWE0ZTMtMTc4ZmZjMTA1M2Iz';
	                }
	            );
			}
			app.open(
                {
                    ios:'coco://365rili.com/openCalendar?calendarID=125821987',
                    android:'coco://365rili.com/openCalendar?calendarID=125821987'
                },
                app.getUa.ios,
                function () {
                	window.location.href = 'http://www.365rili.com/c/Mjc0Njc3MDUtZDc2Zi00N2ZjLWE0ZTMtMTc4ZmZjMTA1M2Iz';
                }
            );
		})
		$('.share').on('tap', function () {
			if(app.getUa.weixin){
				showShadow();
			}
			else{
				share();
			}
		});
		$('.share_layer').on('tap', function () {
			$(this).fadeOut('fast');
		})
	}

	function showShadow () {
		$('.share_layer').fadeIn('fast');
	}

	function share () {
		if(!app.getUa.weixin && getURLParameter('isShowBar') != 1){
			$.ajax({
				url: '/operation/share.do?shareId=88&channel=plaza'
			});
			app.call({
	        	action: 'share',
	        	params: [
	        		{
	        			name: 'shareString',
	        			value: JSON.stringify({
	        				title: '皇马历史大事件回顾',
	        				content: '建队113年，皇家马德里队有太多值得追忆的历史瞬间！',
	        				link: 'http://www.365rili.com/pages/bd/hjmdl/weixin/active.html?active=qd',
	        				image: 'http://www.365rili.com/pages/bd/hjmdl/images/wx.jpg',
	        				isEvent: 'true'
	        			})
	        		}
	        	],
	        	callback: function(data) {}
	        });
			return
		}
		$.ajax({
			url: '/operation/share.do?shareId=88&channel=hot'
		});
		$.ajax({
            url:'http://www.365rili.com/tmpmessage/shared.do',
            data:{
                id: '55',
                target: '123'
            },
            success: function (datas) {
                if(datas.state != 'ok'){
                    return false;
                }
                $.ajax({
					url: '/operation/qingming/relive.do?startId=' + startIds[active]
				})
                app.call({
                    action: 'share',
                    params: [
                        {
                            name: 'shareString',
		        			value: JSON.stringify({
		        				title: '皇马历史大事件回顾',
		        				content: '建队113年，皇家马德里队有太多值得追忆的历史瞬间！',
		        				link: 'http://www.365rili.com/pages/bd/hjmdl/weixin/active.html?active=qd',
		        				image: 'http://www.365rili.com/pages/bd/hjmdl/images/wx.jpg',
		        				isEvent: 'true'
		        			})
                        }
                    ],
                    callBack: function (headers) {}
                });
            },
            error: function () {

            }
        });
	}

	function showEnd (e) {
		if(Math.abs(scroll.maxScrollY) - Math.abs(scroll.y) >= wh * 0.7){
			return;
		}
		scroll.off('scrollEnd', showEnd);
		var _this = this;
		scroll.on('scrollEnd', function () {
			scroll.off('scrollEnd', arguments.callee);
			$(_this).remove();
			// $('.photo_black').removeClass('dark');
		});
		setTimeout(function () {
				$('.photo_color').addClass('show');
			},500);
		setTimeout(showLogo,1000);
		scroll.scrollTo(0, scroll.maxScrollY, 1000);
		setTimeout(function () {
			$('<div class="txtShadow"></div>').appendTo('.content-inner').css({
				position:'absolute',
				'background-color':'#000',
				opacity:'0.5',
				left: 0,
				top: '0px',
				height:$('.timeline').height() + $('.timeline').position().top + 25 + 'px',
				width:'100%',
				'box-shadow': '0px 0px 15px 8px #000'
			});
		}, 800);
	}

	function showLogo () {
		app.getUa.weixin || setTimeout(function () {
			$('.score').addClass('fadeInUp');
		}, 1500);
		if(app.getUa.weixin ){
			if(getURLParameter('isappinstalled') != 1){
				$('.downLoad').html('下载365日历');
			}
			else{
				$('.downLoad').html('打开365日历');
			}
			$('.schedule').removeClass('none')
			setTimeout(function () {
				$('.schedule').removeClass('none').addClass('fadeInUp');
			}, 1750);
			$('.downLoad').removeClass('none')
			setTimeout(function () {
				$('.downLoad').removeClass('none').addClass('fadeInUp');
			}, 2000);
		}
		else if(getURLParameter('isShowBar') != 1){
			if(app.getUa.android){
				$('.slogen1').removeClass('none');
			}
			else{
				$('.schedule').removeClass('none')
				setTimeout(function () {
					$('.schedule').removeClass('none').addClass('fadeInUp');
				}, 1750);
			}
			$('.share').removeClass('none')
			setTimeout(function () {
				$('.share').removeClass('none').addClass('fadeInUp');
			}, 2000);
		}
		else{
			$('.schedule').removeClass('none')
			setTimeout(function () {
				$('.schedule').removeClass('none').addClass('fadeInUp');
			}, 1750);
			$('.share').removeClass('none')
			setTimeout(function () {
				$('.share').removeClass('none').addClass('fadeInUp');
			}, 2000);
		}
		$('.scrollBg img').each(function (i, o) {
			setTimeout(function () {
				$(o).addClass('fadeInDown')
			}, 250 * i);
		});
	}

	function checkPoint () {
		if(active_pos.length == 0){
			scroll.off('scroll', checkPoint);
			scroll.off('scrollEnd', setEnd);
			scroll.on('scrollEnd', setEnd);
			return;
		};
		var y = Math.abs(this.y);
		var pos = active_pos[0].pos;
		if((pos - (y + wh / 2) < 10)){
			active_pos.shift();
			showTitle();
			showContent();
		}
	}

	function showContent () {
		setTimeout(function () {
			$('.cont_inner.hide:first').addClass('fadeInRightDown').removeClass('hide');
		}, 16);
	}

	function showTitle () {
		setTimeout(function () {
			$('.title.hide:first').addClass('fadeInLeft').removeClass('hide');
		}, 16);
	}

	function showLine () {
		this.removeEventListener('webkitAnimationEnd', showLine);
		$('.line').css({top: $('.timeline').position().top + 20 + 19 + 'px'})
		setTimeout(function () {
			$('.line').css({
				'-webkit-transition':'all 2s;'
			}).height(wh + 'px')[0].addEventListener('webkitTransitionEnd', function () {
				this.removeEventListener('webkitTransitionEnd', arguments.callee);
				$('.notList').removeClass('fadeIn').addClass('fadeOut');
				var box = $('.timeline');
				$(this).height(box.height() - box.find('li:last-child').height() - 10 + 'px');
				$('.timeline .point').addClass('animated fadeIn')[0].addEventListener('webkitAnimationEnd', function () {
					this.removeEventListener('webkitAnimationEnd', arguments.callee);
					setTimeout(function () {
						scroll = new IScroll('.content', {
							hScroll: false,
							momentum: true,
							bounce: false,
							probeType: 3
						});
						scroll.on('scroll', checkPoint);
						// scroll.scrollTo(0, scroll.maxScrollY, 1000);
					}, 0);
				});
			}, false);
		});
		// var n = Math.ceil(wh / 55) - 1;
		// for (var i = 0; i < n; i++) {
		// 	(function (_i) {
		// 		setTimeout(function () {
		// 			showPoint(_i + 1, n);
		// 		}, _i * 100);
		// 	})(i);
		// };
	}



	/**
	 * 其他方法
	 */

	function getURLParameter(name) {
	    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
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
	function template (s,o,defaults, index) {
		index = index || 0;
	    if(typeOf(s) === 'undefined' || typeOf(o) === 'undefined') return '';
	    var _html = [];
	    defaults = defaults || {};
	    if(typeOf(o) === 'array'){
	        for (var i = 0, len = o.length; i < len; i++) {
	            _html.push(template(s, o[i], defaults, i));
	        };
	    }else{
	        var __o = {};
	        copyTo(o, __o);
	        apply(__o, defaults);
	        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
	            return typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o, index) : (o[_o] || __o[_o] || '');
	        }));
	    }
	    return _html.join('');
	}
})();