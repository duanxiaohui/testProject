(function () {
	var iw = {
		data:{
			_setup:0,
			_type:0,
			_event:0,
			_iscolor:0,
			onorientationchange: 0,
			tmpl: $('#tmpl').html(),
			playState: true
		},
		setSize: function () {
			var _window = $('body');
			var ww = _window.width();
			var wh = _window.height();

			//横屏首页
			if(iw.data._setup == 1){
				if(ww > wh){
					$('.main').addClass('landscape');
					$('body').addClass('land');
				}
				else{
					$('.main').removeClass('landscape');
					$('body').removeClass('land');
				}
			}

			var landscape = window.orientation == 90 || window.orientation == -90 || $('.main').hasClass('landscape');

			if(!landscape || !$('.main').hasClass('landscape')){
				var w = 375;
				var h = 627;
			}
			else{
				var w = 667;
				var h = 335;
			}

			//修正安卓机在横屏后，宽高的数值还没交换
			if((window.orientation == 90 || window.orientation == -90) && ww < wh){
				var tw = ww;
				ww = wh; 
				wh = tw;
			}

			var wpre = ww / wh;
			var pre = w / h;

			if(wpre > pre){
				$('.main').css({
					'-webkit-transform': 'scale(' + wh / h + ')'
				});
			}
			else{
				$('.main').css({
					'-webkit-transform': 'scale(' + ww / w + ')'
				});
			}
		},
		music: function () {
			var audio = $('#music_av')[0];
			audio.loop = false;
			audio.addEventListener('ended', function(){
			    iw.data.playState && audio.play();
			}, false);
			$('.musicBtn').on('tap', function () {
				var me = $(this);
				if(audio.paused){
					me.find('a').removeClass('stop');
					audio.play();
					iw.data.playState = true;
				}
				else{
					me.find('a').addClass('stop');
					audio.pause();
					iw.data.playState = false;
				}
			});
		},
		init: function () {

			document.documentElement.scrollTop = document.body.scrollTop = 0;

			//修正微信下的bar的高度
			//
			if(app.getUa.weixin){
				$('body').addClass('wx');
			}
			else{
				$('body').addClass('normal');
			}

			//禁止用户滚动页面
			//
			window.onorientationchange = function orientationChange() {
				$(window).on('touchstart', stopDefault);
				$(window).on('pointerdown', stopDefault);
				$('.change, .changeBg').show();
				$('.main').addClass('none');
				$('body').removeClass('bg bg1 bg2 color gray')
				document.documentElement.scrollTop = document.body.scrollTop = 0;
				clearTimeout(iw.data.onorientationchange);
			    switch(window.orientation) {
			    　　case -90: 
			    　　case 90:
					    $(window).off('touchstart');
						$(window).off('pointerdown');
					    iw.nextSetup();
			            iw.data.onorientationchange = setTimeout(function () {
					    	if(window.orientation == 90 || window.orientation == -90){
							    $('.main').removeClass('none');
					    		$('.change, .changeBg').fadeOut('fast');
					    	}
					    }, 500);
			            break;
			    };
			};

			$('.shareBtn').on('tap', iw.share);

			$('.musicBtn, .shareBtn').removeClass('none');

			//开始
			//

			// $('.main').removeClass('none');
			// iw.ending();
			iw.setup1();

			//屏幕
			iw.setSize();
		},
		nextSetup: function () {
			if(iw.data._setup == 1){
				return iw.setup2();
			}
			if(iw.data._setup == 2){
				return iw.setup2();
			}
			if(iw.data._setup == 3){
				if(iw.data._event == -1){
					return iw.ending();
				}
				if(iw.data._event == -2){
					return;
				}
				return iw.nextEvent();
			}
		},
		setup1: function () {
			iw.data._setup = 1;
			$('.main').fadeIn('fast');
			$('.setup1').removeClass('none');
			$('.shareBtn').removeClass('none');
		},
		setup2: function () {
			$('.shareBtn').addClass('none');
			setTimeout(function () {
				$('.setup2Txt').addClass('fadeInDown');
			}, 3000);
			if($('#music_av')[0].src != ''){
				$('#music_av')[0].src = '/pages/bd/invertedWorld/mp3/begin.mp3';
				iw.data.playState && $('#music_av')[0].play();
			}
			iw.data._setup = 2;
		    $('.main').addClass('landscape').removeClass('none');
		    $('body').addClass('land');
		    iw.setSize();
			$('.setup1').addClass('none');
			$('.setup2').removeClass('none');
			$('body').removeClass('bg1 endBg gray color');
			$('body').addClass('bg bg2');

			$('.inType1 img').on('tap', function () {
				$('.inType1, .inType2, .inType3').off();
				iw.data._type = 1;
				iw.setup3();
			});

			$('.inType2 img').on('tap', function () {
				$('.inType1, .inType2, .inType3').off();
				iw.data._type = 2;
				iw.setup3();
			});

			$('.inType3 img').on('tap', function () {
				$('.inType1, .inType2, .inType3').off();
				iw.data._type = 3;
				iw.setup3();
			});

			setTimeout(function () {
				$('.inType1 img').addClass('fadeInDown');
				setTimeout(function () {
					$('.inType1 img').addClass('infinite qqflash').removeClass('fadeInDown');
				}, 1500);
			}, 1000);
			setTimeout(function () {
				$('.inType2 img').addClass('fadeInDown');
				setTimeout(function () {
					$('.inType2 img').addClass('infinite qqflash').removeClass('fadeInDown');
				}, 1500);
			}, 1500);
			setTimeout(function () {
				$('.inType3 img').addClass('fadeInDown');
				setTimeout(function () {
					$('.inType3 img').addClass('infinite qqflash').removeClass('fadeInDown');
				}, 1500);
			}, 2000);
		},
		setup3: function () {
		    iw.setSize();
			iw.data._setup = 3;
			$('.setup2').addClass('none').attr('style', '');
			$('.setup3').fadeIn();
			iw.data._event = 1;
			iw.data._iscolor = 0;
			$('.type').addClass('_none');
			$('.type' + iw.data._type).removeClass('_none');
			iw.nextEvent();
		},
		nextEvent: function () {
		    iw.setSize();
			$('.shareBtn').addClass('none');
			$('body').removeClass('bg bg1 bg2 color gray').addClass(iw.data._iscolor ? 'color' : 'gray');
			$('.event').addClass('_none');
			$('.xz img').removeClass('tada');
			$('.lightSmall, .lightBig').removeClass('flash');
			$('.et').removeClass('fadeInDown');

			if(iw.data._iscolor){
				$('#music_av')[0].src = '/pages/bd/invertedWorld/mp3/2.mp3';
				iw.data.playState && $('#music_av')[0].play();
			}
			else{
				$('#music_av')[0].src = '/pages/bd/invertedWorld/mp3/1.mp3';
				iw.data.playState && $('#music_av')[0].play();
			}

			var _thisEvent = $('.type' + iw.data._type + ' .event' + iw.data._event).removeClass('_none');

			_thisEvent.find('.xz img').addClass('tada');
			setTimeout(function () {
				_thisEvent.find('.et').addClass('fadeInDown');
			}, 1300);

			setTimeout(function () {
				_thisEvent.find('.lightBig').addClass('flash');
			}, 1000);
			setTimeout(function () {
				_thisEvent.find('.lightSmall').addClass('flash');
			}, 3300);

			iw.data._iscolor = !iw.data._iscolor;

			if(!iw.data._iscolor){
				iw.data._event++;
			}

			if(iw.data._event == 4){
				iw.data._event = -1;
			}
		},
		ending: function () {
		    iw.setSize();
			$('#music_av')[0].src = '/pages/bd/invertedWorld/mp3/end.mp3';
			iw.data.playState && $('#music_av')[0].play();
			$('.shareBtn').removeClass('none');
			iw.data._event = -2;
			$('body').removeClass('bg bg1 bg2 color gray').addClass('bg endBg');
			$('.setup3').attr('style', '');
			$('.end').removeClass('none');

			setTimeout(function () {
				$('.w2016').addClass('fadeOutUp1');
				setTimeout(function () {
					$('.w2016').hide().removeClass('animated');
				}, 1500);
			}, 1000);

			setTimeout(function () {
				$('.line1').addClass('fadeInUp1');
				setTimeout(function () {
					$('.line1').show().removeClass('animated');
				}, 1500);
			}, 2500);

			setTimeout(function () {
				$('.line2').addClass('fadeInUp1');
				setTimeout(function () {
					$('.line2').show().removeClass('animated');
				}, 1500);
			}, 3500);

			setTimeout(function () {
				$('.line3').addClass('fadeInUp1');
				setTimeout(function () {
					$('.line3').show().removeClass('animated');
				}, 1500);
			}, 4500);

			$('.back').on('tap', function () {
				$(this).off('tap');
				var backMask = $('<div style="position:absolute; left:0; top:0; width:100%; height:100%; background:#000; z-index: 98; opacity:0;"></div>').appendTo('body').fadeIn('fast');
				$('.end').fadeOut('fast', function () {
					$(this).addClass('none').attr('style', '');
					setTimeout(function () {
						$('.w2016, .line1, .line2, .line3').removeClass('fadeInUp1 fadeOutUp1').addClass('animated').attr('style', '');
					}, 4000);
					setTimeout(function () {
						iw.setup2();
					}, 200);
					setTimeout(function () {
						backMask.fadeOut('fast', function () {
							backMask.remove();
						})
					}, 400);
				});
			})
		},
		share: function () {
			$('<div id="shareMask"></div>').appendTo('body');
			setTimeout(function () {
				$('#shareMask').addClass('show');
			});
			$('#shareMask').on('tap', function () {
				$(this).fadeOut('fast', function () {
					$(this).remove();
				}).off('tap');
			})
		},
		loading: function () {
			$('#tmpl').remove();
			$('.loading').removeClass('none');
			iw.show_num('0%');
			function setPre (n) {
				n = Math.ceil(n * 100.00);
				setTimeout(function () {
					if(n == 100){
						iw.show_num('开始');
						$('.loadingIcon.animated').addClass('flashQ');
						$('.loadingIcon').css('height', '100px');
						$('.loading').on('tap', function () {
							iw.data.playState && $('#music_av')[0].play();
							$('.loading').fadeOut('fast', function () {
								$('body').append(iw.data.tmpl);
								iw.music();
								iw.init();
							});
						})
						return ;
					}
					iw.show_num(n + '%');
				}, 0)
			}

			function loadMp3 (src) {
				$('<audio loop＝"loop" preload id="music_av"><source src="'+src+'" /></audio>').appendTo('body');
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
			}

			function loadFailed () {
				if(this.loadNum > 5){
					return loadSuccess();
				}
				loadImage.call(this, this.src);
			}

			setPre(0);

			var data = [
				'/pages/bd/invertedWorld/images/2016.png',
				'/pages/bd/invertedWorld/images/back.png',
				'/pages/bd/invertedWorld/images/change.gif',
				'/pages/bd/invertedWorld/images/change.png',
				'/pages/bd/invertedWorld/images/colorEventTextIcon.png',
				'/pages/bd/invertedWorld/images/colorLightBig.png',
				'/pages/bd/invertedWorld/images/colorLightSmall.png',
				'/pages/bd/invertedWorld/images/colorScreen.png',
				'/pages/bd/invertedWorld/images/colorSpaceship.jpg',
				'/pages/bd/invertedWorld/images/colorStar.png',
				'/pages/bd/invertedWorld/images/colorXZT.png',
				'/pages/bd/invertedWorld/images/endBg.jpg',
				'/pages/bd/invertedWorld/images/english.png',
				'/pages/bd/invertedWorld/images/gj.png',
				'/pages/bd/invertedWorld/images/gn.png',
				'/pages/bd/invertedWorld/images/grayEventTextIcon.png',
				'/pages/bd/invertedWorld/images/grayLightBig.png',
				'/pages/bd/invertedWorld/images/grayLightSmall.png',
				'/pages/bd/invertedWorld/images/grayScreen.png',
				'/pages/bd/invertedWorld/images/graySpaceship.jpg',
				'/pages/bd/invertedWorld/images/grayStar.png',
				'/pages/bd/invertedWorld/images/grayXZT.png',
				'/pages/bd/invertedWorld/images/house.png',
				'/pages/bd/invertedWorld/images/indexIcon.png',
				'/pages/bd/invertedWorld/images/indexTip.png',
				'/pages/bd/invertedWorld/images/indexTxt.png',
				'/pages/bd/invertedWorld/images/line1.png',
				'/pages/bd/invertedWorld/images/line2.png',
				'/pages/bd/invertedWorld/images/line3.png',
				'/pages/bd/invertedWorld/images/loadingN.png',
				'/pages/bd/invertedWorld/images/logo.png',
				'/pages/bd/invertedWorld/images/music.png',
				'/pages/bd/invertedWorld/images/setup1Bg.jpg',
				'/pages/bd/invertedWorld/images/setup2Bg.jpg',
				'/pages/bd/invertedWorld/images/setup2Txt.png',
				'/pages/bd/invertedWorld/images/share.png',
				'/pages/bd/invertedWorld/images/shareImg.png',
				'/pages/bd/invertedWorld/images/shareImgH.png',
				'/pages/bd/invertedWorld/images/stop.png',
				'/pages/bd/invertedWorld/images/type1event1color.jpg',
				'/pages/bd/invertedWorld/images/type1event1colorText.png',
				'/pages/bd/invertedWorld/images/type1event1gray.jpg',
				'/pages/bd/invertedWorld/images/type1event1grayText.png',
				'/pages/bd/invertedWorld/images/type1event1Name.png',
				'/pages/bd/invertedWorld/images/type1event1Time.png',
				'/pages/bd/invertedWorld/images/type1event2color.jpg',
				'/pages/bd/invertedWorld/images/type1event2colorText.png',
				'/pages/bd/invertedWorld/images/type1event2gray.jpg',
				'/pages/bd/invertedWorld/images/type1event2grayText.png',
				'/pages/bd/invertedWorld/images/type1event2Name.png',
				'/pages/bd/invertedWorld/images/type1event2Time.png',
				'/pages/bd/invertedWorld/images/type1event3color.jpg',
				'/pages/bd/invertedWorld/images/type1event3colorText.png',
				'/pages/bd/invertedWorld/images/type1event3gray.jpg',
				'/pages/bd/invertedWorld/images/type1event3grayText.png',
				'/pages/bd/invertedWorld/images/type1event3Name.png',
				'/pages/bd/invertedWorld/images/type1event3Time.png',
				'/pages/bd/invertedWorld/images/type2event1color.jpg',
				'/pages/bd/invertedWorld/images/type2event1colorText.png',
				'/pages/bd/invertedWorld/images/type2event1gray.jpg',
				'/pages/bd/invertedWorld/images/type2event1grayText.png',
				'/pages/bd/invertedWorld/images/type2event1Name.png',
				'/pages/bd/invertedWorld/images/type2event1Time.png',
				'/pages/bd/invertedWorld/images/type2event2color.jpg',
				'/pages/bd/invertedWorld/images/type2event2colorText.png',
				'/pages/bd/invertedWorld/images/type2event2gray.jpg',
				'/pages/bd/invertedWorld/images/type2event2grayText.png',
				'/pages/bd/invertedWorld/images/type2event2Name.png',
				'/pages/bd/invertedWorld/images/type2event2Time.png',
				'/pages/bd/invertedWorld/images/type2event3color.jpg',
				'/pages/bd/invertedWorld/images/type2event3colorText.png',
				'/pages/bd/invertedWorld/images/type2event3gray.jpg',
				'/pages/bd/invertedWorld/images/type2event3grayText.png',
				'/pages/bd/invertedWorld/images/type2event3Name.png',
				'/pages/bd/invertedWorld/images/type2event3Time.png',
				'/pages/bd/invertedWorld/images/type3event1color.jpg',
				'/pages/bd/invertedWorld/images/type3event1colorText.png',
				'/pages/bd/invertedWorld/images/type3event1gray.jpg',
				'/pages/bd/invertedWorld/images/type3event1grayText.png',
				'/pages/bd/invertedWorld/images/type3event1Name.png',
				'/pages/bd/invertedWorld/images/type3event1Time.png',
				'/pages/bd/invertedWorld/images/type3event2color.jpg',
				'/pages/bd/invertedWorld/images/type3event2colorText.png',
				'/pages/bd/invertedWorld/images/type3event2gray.jpg',
				'/pages/bd/invertedWorld/images/type3event2grayText.png',
				'/pages/bd/invertedWorld/images/type3event2Name.png',
				'/pages/bd/invertedWorld/images/type3event2Time.png',
				'/pages/bd/invertedWorld/images/type3event3color.jpg',
				'/pages/bd/invertedWorld/images/type3event3colorText.png',
				'/pages/bd/invertedWorld/images/type3event3gray.jpg',
				'/pages/bd/invertedWorld/images/type3event3grayText.png',
				'/pages/bd/invertedWorld/images/type3event3Name.png',
				'/pages/bd/invertedWorld/images/type3event3Time.png',
				'/pages/bd/invertedWorld/images/wx.jpg',
				'/pages/bd/invertedWorld/images/XZ.png',
				'/pages/bd/invertedWorld/images/yl.png'
			];

			setTimeout(function () {
				var m1 = new Image();
				var m2 = new Image();
				var m3 = new Image();
				m1.onerror = m2.onerror = m3.onerror = function () {
					return true;
				}
				m1.src = '/pages/bd/invertedWorld/mp3/1.mp3';
				m2.src = '/pages/bd/invertedWorld/mp3/2.mp3';
				m3.src = '/pages/bd/invertedWorld/mp3/end.mp3';
			})

			var img_len_static = img_len = data.length + 1;

			var mp3Name = '/pages/bd/invertedWorld/mp3/begin.mp3';
			loadMp3(mp3Name);

			setTimeout(function () {
				for (var i = 0; i < data.length; i++) {
					loadImage(data[i]);
				};
			}, 500);
		},
		show_num: function (n) {
			$('.loadingTxt span').html(n);
		}
	}
	window.iw = iw;
	window.onerror = function (a, b, c) {}

	window.onload = iw.loading;
})();