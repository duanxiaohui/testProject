/**
 * 中秋节
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-09-11 14:08:57
 */

(function () {
	var to = app.query('to');
	var from = app.query('from1');
	var job = app.query('job');
	var customer = app.query('customer');
	var beginDate = app.query('beginDate');
	var endDate = app.query('endDate');
	var isLoaded = app.query('isLoaded');

	var _data = {
		tmpl: '\
		<div class="tool">\
			<a href="javascript:;" class="share"><img src="/pages/bd/MidAutumn-2015/images/share.png" alt=""></a>\
			<a href="javascript:;" class="music"><img class="musicBtn animated rotate infinite" src="/pages/bd/MidAutumn-2015/images/music.png" alt=""></a>\
		</div>\
		<div class="setups pages">\
			<section class="page setup setup0">\
				<img src="/pages/bd/MidAutumn-2015/images/setup0Bg.jpg" class="bg" alt="">\
				<img class="desk" src="/pages/bd/MidAutumn-2015/images/desk.png" width="100%" alt="" />\
				<img class="flowerBox" src="/pages/bd/MidAutumn-2015/images/flowerBox.png" width="29.6%" alt="" />\
				<img class="openLettleLow" src="/pages/bd/MidAutumn-2015/images/openLettleLow.png" width="56.4%" alt="" />\
				<img class="openLettle animated infinite" src="/pages/bd/MidAutumn-2015/images/openLettle.png" width="56.4%" alt="" />\
				<img class="setup0cl1" src="/pages/bd/MidAutumn-2015/images/setup0cl1.png" width="49.6%" alt="" />\
				<img class="setup0cl2" src="/pages/bd/MidAutumn-2015/images/setup0cl2.png" width="54%" alt="" />\
				<img class="setup0ct" src="/pages/bd/MidAutumn-2015/images/setup0ct.png" width="52%" alt="" />\
				<img src="/pages/bd/MidAutumn-2015/images/365logo.png" width="75" alt="" class="logo365" />\
			</section>\
			<section class="page setup setup1">\
				<img src="/pages/bd/MidAutumn-2015/images/bg1.jpg" class="bg" alt="">\
				<div class="panelTop1">\
					<img src="/pages/bd/MidAutumn-2015/images/panelTop1.png" width="100%" alt="">\
				</div>\
				<div class="panelBox">\
					<div class="panel animated">\
						<img src="/pages/bd/MidAutumn-2015/images/panelMain1.png" class="panelMain" alt="">\
						<div class="panelTxt">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt1-1.png" class="animated" width="176" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt1-2.png" class="animated" width="141" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt1-3.png" class="animated" width="246" alt="">\
						</div>\
					</div>\
				</div>\
				<img src="/pages/bd/MidAutumn-2015/images/365logo.png" width="75" alt="" class="logo365" />\
			</section>\
			<section class="page setup setup2">\
				<img src="/pages/bd/MidAutumn-2015/images/bg2.jpg" class="bg" alt="">\
				<div class="panelTop2">\
					<img src="/pages/bd/MidAutumn-2015/images/panelTop2.png" class="clT" width="181" alt="">\
					<img src="/pages/bd/MidAutumn-2015/images/panel2-cl1.png" class="cl1 animated infinite" width="225" alt="">\
					<img src="/pages/bd/MidAutumn-2015/images/panel2-cl2.png" class="cl2 animated infinite" width="254" alt="">\
					<div class="point">\
						<img src="/pages/bd/MidAutumn-2015/images/p1.png" class="p1 animated infinite" width="1" alt="">\
						<img src="/pages/bd/MidAutumn-2015/images/p2.png" class="p2 animated infinite" width="44" alt="">\
						<img src="/pages/bd/MidAutumn-2015/images/p3.png" class="p3 animated infinite" width="2" alt="">\
						<img src="/pages/bd/MidAutumn-2015/images/p4.png" class="p4 animated infinite" width="3" alt="">\
						<img src="/pages/bd/MidAutumn-2015/images/p5.png" class="p5 animated infinite" width="2" alt="">\
						<img src="/pages/bd/MidAutumn-2015/images/p6.png" class="p6 hudie animated infinite" width="20" alt="">\
					</div>\
				</div>\
				<div class="panelBox">\
					<div class="panel animated">\
						<img src="/pages/bd/MidAutumn-2015/images/panelMain2.png" class="panelMain" alt="">\
						<div class="panelTxt">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt2-1.png" class="animated" width="191" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt2-2.png" class="animated" width="254" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt2-3.png" class="animated" width="213" alt="">\
						</div>\
					</div>\
				</div>\
				<img src="/pages/bd/MidAutumn-2015/images/365logo.png" width="75" alt="" class="logo365" />\
			</section>\
			<section class="page setup setup3">\
				<img src="/pages/bd/MidAutumn-2015/images/bg3.jpg" class="bg" alt="">\
				<div class="panelTop3">\
					<img src="/pages/bd/MidAutumn-2015/images/panelTop3-light.png" class="light animated infinite" width="253" alt="">\
					<img src="/pages/bd/MidAutumn-2015/images/panelTop3.png" width="253" alt="">\
				</div>\
				<div class="panelBox">\
					<div class="panel animated">\
						<img src="/pages/bd/MidAutumn-2015/images/panelMain3.png" class="panelMain" alt="">\
						<div class="panelTxt">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt3-1.png" class="animated" width="158" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt3-2.png" class="animated" width="213" alt="">\
							<img src="/pages/bd/MidAutumn-2015/images/panelTxt3-3.png" class="animated" width="209" alt="">\
						</div>\
					</div>\
				</div>\
				<img src="/pages/bd/MidAutumn-2015/images/365logo.png" width="75" alt="" class="logo365" />\
			</section>\
			<section class="page setup setup4">\
				<img class="setup4BgLight animated infinite" src="/pages/bd/MidAutumn-2015/images/setup4BgLight.jpg" width="100%" alt="">\
				<div class="center setup4Txt animated"><img src="/pages/bd/MidAutumn-2015/images/setup4Txt.png" width="100%" alt=""></div>\
				<a class="setup4Btn" href="javascript:;"></a>\
				<img src="/pages/bd/MidAutumn-2015/images/365logo.png" width="75" alt="" class="logo365" />\
			</section>\
		</div>\
		<div class="next red"></div>'
	}
	var ani = {
		music: function () {
			$('.music').on('tap', function () {
				var me = $(this);
				var audio = $('#music_av')[0];
				if(audio.paused){
					me.find('img').removeClass('stop');
					audio.play();
				}
				else{
					me.find('img').addClass('stop');
					audio.pause();
				}
			});
		},
		setShare: function () {
			if(!app.getUa.weixin){
				$('.share').on('tap', function () {
					app.call({
		                action: 'share',
		                params: [
		                    {
		                        name: 'shareString',
			        			value: JSON.stringify({
			        				title: '团圆请假单，让爱不缺席',
			        				content: '月常圆，人却不常团聚，这个中秋向家人递一份团圆请假单，让爱陪家人团圆。',
			        				link: 'http://www.365rili.com/pages/bd/MidAutumn-2015/app/index.html',
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
				$('.share').hide();
			}
		},
		nLoading: function () {
			if(app.getUa.weixin || app.getUa.ios){
				$('<audio loop preload id="music_av"><source src="/pages/bd/MidAutumn-2015/audio/bg.mp3" /></audio>').appendTo('body');
			}
			$('.loading').remove();
			$('body').append(_data.tmpl);

			ani.setShare()

			ani.setSize();

			$('.music').addClass('none');

			ani.music();
			ani.init();
		},
		loading: function () {
			$('.loading').removeClass('none');
			ani.show_num(0);
			function setPre (n) {
				n = Math.ceil(n * 100.00);
				setTimeout(function () {
					ani.show_num(n);

					if(n == 100){
						setTimeout(function () {
							$('.loading').css({
								opacity: 0
							});
							setTimeout(function () {
								$('.loading').remove();
							}, 500);
							ani.init();
						}, 500);
					}
				}, 0)
			}

			function loadMp3 (src) {
				$('<audio loop preload id="music_av"><source src="'+src+'" /></audio>').appendTo('body');
				loadSuccess();
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
				img_len--;
				setPre((img_len_static - img_len) / img_len_static);

				if(img_len == 0){
					setTimeout(function () {
						$('body').append(_data.tmpl);

						ani.setShare();

						ani.setSize();

						$('.music').addClass('none');

						ani.music();
					}, 300);
				}
			}

			function loadFailed () {
				if(this.loadNum > 5){
					return loadSuccess();
				}
				loadImage.call(this, this.src);
			}

			setPre(0);

			var data = [
				'/pages/bd/MidAutumn-2015/images/bg1.jpg',
				'/pages/bd/MidAutumn-2015/images/bg2.jpg',
				'/pages/bd/MidAutumn-2015/images/bg3.jpg',
				'/pages/bd/MidAutumn-2015/images/buildBtn.png',
				'/pages/bd/MidAutumn-2015/images/desk.png',
				'/pages/bd/MidAutumn-2015/images/fgx.png',
				'/pages/bd/MidAutumn-2015/images/flower.png',
				'/pages/bd/MidAutumn-2015/images/flowerBox.png',
				'/pages/bd/MidAutumn-2015/images/formBg.jpg',
				'/pages/bd/MidAutumn-2015/images/formTitle.png',
				'/pages/bd/MidAutumn-2015/images/l1.png',
				'/pages/bd/MidAutumn-2015/images/l2.png',
				'/pages/bd/MidAutumn-2015/images/l3.png',
				'/pages/bd/MidAutumn-2015/images/l4.png',
				'/pages/bd/MidAutumn-2015/images/l5.png',
				'/pages/bd/MidAutumn-2015/images/l6.png',
				'/pages/bd/MidAutumn-2015/images/lettle.png',
				'/pages/bd/MidAutumn-2015/images/mail.png',
				'/pages/bd/MidAutumn-2015/images/mailMask.jpg',
				'/pages/bd/MidAutumn-2015/images/metoo.png',
				'/pages/bd/MidAutumn-2015/images/moon.png',
				'/pages/bd/MidAutumn-2015/images/moonLoad.png',
				'/pages/bd/MidAutumn-2015/images/moonMask.png',
				'/pages/bd/MidAutumn-2015/images/music.png',
				'/pages/bd/MidAutumn-2015/images/next.gif',
				'/pages/bd/MidAutumn-2015/images/next.png',
				'/pages/bd/MidAutumn-2015/images/number.png',
				'/pages/bd/MidAutumn-2015/images/numberLoading.png',
				'/pages/bd/MidAutumn-2015/images/open365.png',
				'/pages/bd/MidAutumn-2015/images/openLettle.png',
				'/pages/bd/MidAutumn-2015/images/openLettleLow.png',
				'/pages/bd/MidAutumn-2015/images/p1.png',
				'/pages/bd/MidAutumn-2015/images/p2.png',
				'/pages/bd/MidAutumn-2015/images/p3.png',
				'/pages/bd/MidAutumn-2015/images/p4.png',
				'/pages/bd/MidAutumn-2015/images/p5.png',
				'/pages/bd/MidAutumn-2015/images/p6.png',
				'/pages/bd/MidAutumn-2015/images/panel2-cl1.png',
				'/pages/bd/MidAutumn-2015/images/panel2-cl2.png',
				'/pages/bd/MidAutumn-2015/images/panelMain1.png',
				'/pages/bd/MidAutumn-2015/images/panelMain2.png',
				'/pages/bd/MidAutumn-2015/images/panelMain3.png',
				'/pages/bd/MidAutumn-2015/images/panelTop1.png',
				'/pages/bd/MidAutumn-2015/images/panelTop2.png',
				'/pages/bd/MidAutumn-2015/images/panelTop3-light.png',
				'/pages/bd/MidAutumn-2015/images/panelTop3.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt1-1.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt1-2.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt1-3.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt2-1.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt2-2.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt2-3.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt3-1.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt3-2.png',
				'/pages/bd/MidAutumn-2015/images/panelTxt3-3.png',
				'/pages/bd/MidAutumn-2015/images/person.png',
				'/pages/bd/MidAutumn-2015/images/preview.jpg',
				'/pages/bd/MidAutumn-2015/images/previewBg.png',
				'/pages/bd/MidAutumn-2015/images/previewBtn.png',
				'/pages/bd/MidAutumn-2015/images/previewLogo.png',
				'/pages/bd/MidAutumn-2015/images/setup0Bg.jpg',
				'/pages/bd/MidAutumn-2015/images/setup0cl1.png',
				'/pages/bd/MidAutumn-2015/images/setup0cl2.png',
				'/pages/bd/MidAutumn-2015/images/setup0ct.png',
				'/pages/bd/MidAutumn-2015/images/setup4Bg.jpg',
				'/pages/bd/MidAutumn-2015/images/setup4Bg.png',
				'/pages/bd/MidAutumn-2015/images/setup4BgLight.jpg',
				'/pages/bd/MidAutumn-2015/images/setup4BgLight.png',
				'/pages/bd/MidAutumn-2015/images/setup4Btn.png',
				'/pages/bd/MidAutumn-2015/images/setup4Txt.png',
				'/pages/bd/MidAutumn-2015/images/share.png',
				'/pages/bd/MidAutumn-2015/images/whiteBg.png',
				'/pages/bd/MidAutumn-2015/images/wx.jpg',
				'/pages/bd/MidAutumn-2015/images/wxShare.png'
			];

			var img_len_static = img_len = data.length + 1;

			var mp3Name = '/pages/bd/MidAutumn-2015/audio/bg.mp3';
			if(app.getUa.weixin || app.getUa.ios){
				loadMp3(mp3Name);
			}
			else{
				img_len_static--;
				img_len--;
			}

			for (var i = 0; i < data.length; i++) {
				loadImage(data[i]);
			};
		},
		show_num: function (n) { 
		    var it = $(".t_num i");
			var len = String(n).length;
			for (var i = 0; i < len; i++) {
			    if (it.length <= i) {
			        $(".t_num").append("<i></i>");
			    }
			    var num = String(n).charAt(i);
			    var y = -parseInt(num) * 22 + 4;
			    (function (_i, _y) {
			    	$(".t_num i").eq(_i).css({
				    	'background-position': '0 ' + String(_y) + 'px'
				    });
			    })(i, y);
			}
		    $('.moonMask').css({
		    	'margin-left': (-n / 100 * 60),
		    	'margin-top': (-n / 100 * 60)
		    });
		},
		fixSetup4Txt: function () {

			var ww = $(window).width();
			var wh = $(window).height();

			var oh = ww / 320 * 157;
			var omt = $('.setup4BgLight').height() * (50 / 394);

			var eh = wh - $('.setup4BgLight').height() + omt - 73;
			if(eh < oh){
				$('.setup4Txt img').height(eh)[0].removeAttribute('width');
			}
		},
		init: function () {
			ani.fixSetup4Txt();
			if(app.getUa.weixin || app.getUa.ios){
				$('#music_av')[0].play();
				$('.music').removeClass('none');
			}
			if(!app.getUa.weixin){
				$('.music').find('img').addClass('stop');
			}
			if(!to){
				$('.setup0').remove();
				$('.setups').parallax({
					direction: 'vertical',
					swipeAnim: 'cover', 	
					drag: true,
					loading: false,		
					indicator: false,		
					arrow: false,		
					onchange: function(index, element, direction) {
						ani['setup' + (index + 1)]();
					}
				});
			}
			else{
				$('.setups').parallax({
					direction: 'vertical',
					swipeAnim: 'cover', 	
					drag: true,
					loading: false,		
					indicator: false,		
					arrow: false,		
					onchange: function(index, element, direction) {
						ani['setup' + (index)]();
					}
				});
				$('.openLettle').on('tap', function () {
					window.location.href = 'http://www.365rili.com/pages/bd/MidAutumn-2015/app/case.html?' + ['to=' + to, 'from1=' + from, 'job=' + job, 'customer=' + customer, 'beginDate=' + beginDate, 'endDate=' + endDate].join('&');
				});
			}
		},
		setSize: function () {
			var _window = $(window);
			var ww = _window.width();
			var wh = _window.height();

			var w = 375;
			var h = 627;

			var wpre = ww / wh;
			var pre = w / h;

			if(wpre > pre){
				$('.panelBox').css({
					'-webkit-transform': 'scale(' + wh / h + ')'
				});
			}
			else{
				$('.panelBox').css({
					'-webkit-transform': 'scale(' + ww / w + ')'
				});
			}
		},
		setup0: function () {
			$('.openLettle').addClass("qqflash");
			$('.next').removeClass('none').addClass('red');
		},
		setup1: function () {
			$('.next').removeClass('none red');
			var panel = $('.setup1 .panel');
			setTimeout(function () {
				panel.addClass('fadeInUp');
			}, 500);
			setTimeout(function () {
				ani.showPanelTxt.call(panel)
			}, 1500);
		},
		setup2: function () {
			$('.next').removeClass('none red');
			var panel = $('.setup2 .panel');
			setTimeout(function () {
				panel.addClass('fadeInUp');
			}, 500);
			setTimeout(function () {
				ani.showPanelTxt.call(panel)
			}, 1500);

			$('.cl1').addClass('swing');
			$('.cl2').addClass('swing2');

			var point = $('.point img');
			point.each(function (i, o) {
				setTimeout(function () {
					$(o).addClass('qqflash');
				}, 300 * i)
			})
		},
		setup3: function () {
			$('.next').removeClass('none red');
			var panel = $('.setup3 .panel');
			setTimeout(function () {
				panel.addClass('fadeInUp');
			}, 500);
			$('.light').addClass("qqflash");
			setTimeout(function () {
				ani.showPanelTxt.call(panel)
			}, 1500);
		},
		setup4: function () {
			$('.next').addClass('none');
			setTimeout(function () {
				$('.setup4Txt').addClass('fadeInSlow');
			}, 500);
			$('.setup4BgLight').addClass("qqflash");
			$('.setup4Btn').on('tap', function () {
				if(app.getUa.weixin){
					window.location.href = "/wx/login.do?redURL=" + encodeURIComponent('/pages/bd/MidAutumn-2015/app/form.html');
				}
				else{
					window.location.href = '/pages/bd/MidAutumn-2015/app/form.html';
				}
			});
		},
		showPanelTxt: function () {
			this.find('.panelTxt img').each(function (i, o) {
				setTimeout(function () {
					$(o).addClass('fadeInDown');
				}, 900 * i)
			});
		},
		showError: function (txt, btn) {
			var message = $('\
				<div class="message">\
					<p class="messagetxt">' + txt + '</p>\
					<a href="javascript:;" class="messagebtn">' + btn + '</a>\
				</div>\
				<div class="mask"></div>\
				').appendTo('body');

			if(!btn){
				$('.messagebtn').addClass('none');
				$('.mask').css('opacity', 1);
			}

			$('.message').css('top', ($(window).height() - message.height()) / 2);
			$('.messagebtn').on('tap', function () {
				$('.messagebtn').off('tap');
				message.remove();
			})
		},
		checkScreen: function(event) {
			var win = $(window);
			if(win.width() > win.height()){
				ani.showError('手机竖屏体验效果更佳', '')
			}
			else{
				$('.messagebtn').off('tap');
				$('.message').remove();
				$('.mask').remove();
			}
		}
	};
	if(isLoaded){
		ani.nLoading();
	}
	else{
		ani.loading();	
	}

	window.addEventListener('orientationchange', createOrientationChangeProxy(ani.checkScreen, window), false); 

	function createOrientationChangeProxy(fn, scope) {  
	    return function() {
	        clearTimeout(scope.orientationChangedTimeout);  
	        var args = Array.prototype.slice.call(arguments, 0);  
	        scope.orientationChangedTimeout = setTimeout($.proxy(function() {  
	            var ori = window.orientation;  
	            if (ori != scope.lastOrientation) {  
	                fn.apply(scope, args);
	            }  
	            scope.lastOrientation = ori;  
	        }, scope), $.os.android ? 300 : 0);  
	    };  
	}

	ani.checkScreen();
})();