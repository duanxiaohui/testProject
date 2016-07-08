/**
 * 时空战舰
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-08-19 11:50:24
 */

(function () {
	var space = {
		sH: '100%',
		sW: '100%',
		sL: '0',
		checkVW: (function () {
			var o = $('<div style="margin-top:50vw;"></div>');
			return o.remove() && o.position().top != 0;
		})(),
		setObjectByVW: function () {
			if(space.checkVW) return;

			var winW = $(window).width();
			var os = $('[data-vmvalue]');
			os.each(setVW);

			function setVW (i, o) {
				var _o = $(o);
				var param = _o.data('vmparam');
				var value = _o.data('vmvalue');

				var _v = winW * value / 100;
				_o.css(param, _v);
			}
		},
		init: function () {
			space.noDrag();
			space.setShowSize();
			space.loadResource();

			wxProtocol.init(function (wx, link) {
				wx.onMenuShareAppMessage({
			        title: '“霸道舰长，我要你！”',
			        desc: '365时空战舰，招募一日舰长',
			        link: 'http://www.365rili.com/pages/bd/spaceship/index.html',
					imgUrl: 'http://www.365rili.com/pages/bd/spaceship/images/wx.jpg',
					success: space.postShare
			    });
			    wx.onMenuShareTimeline({
			        title: '“霸道舰长，我要你！”－365时空战舰，招募一日舰长',
			        link: 'http://www.365rili.com/pages/bd/spaceship/index.html',
					imgUrl: 'http://www.365rili.com/pages/bd/spaceship/images/wx.jpg',
					success: space.postShare
			    });
			});
		},
		postShare: function () {
			$.ajax({
				url: '/pages/bd/spaceship/share.html'
			});
		},
		loadResource: function () {
			function setPre (n) {
				n = Math.ceil(n * 100.00);
				setTimeout(function () {
					$('.loading_txt').html(n + '%');
				}, 0);
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
						$('.loading').fadeOut(function () {
							$(this).remove();
						});
						$('body').append('\
<a href="javascript:;" id="music" class="music animated rotate infinite"></a>\
<div class="screen full none" id="s_0">\
	<img src="/pages/bd/spaceship/images/s_0_bg.jpg" alt="" class="bg">\
	<div class="render" data-vmvalue="25" data-vmparam="margin-top">\
		<img src="/pages/bd/spaceship/images/renderIcon.png" class="rendericon" alt\
	="">\
		<img src="/pages/bd/spaceship/images/renderBtn.png" data-vmvalue="50" data-vmparam="margin-top" class="renderbtn" alt="">\
	</div>\
</div>\
<div class="screen full none" id="s_1">\
	<img src="/pages/bd/spaceship/images/s_1_bg.jpg" alt="" class="bg">\
	<div class="ship animated">\
		<img src="/pages/bd/spaceship/images/ship_light.png" class="shipLight animated infinite" alt="">\
		<img src="/pages/bd/spaceship/images/ship.png" alt="">\
	</div>\
	<div class="tip">\
		<div class="point"></div>\
		<span>“点击战舰 登入驾驶舱”</span>\
	</div>\
	<div class="desc animated">\
		<div class="talkBox">\
    		<div class="talk">\
	    		<div class="txt"></div>\
	    	</div>\
		</div>\
		<img src="/pages/bd/spaceship/images/face.png" class="face" alt="">\
	</div>\
</div>\
<div class="screen full none" id="s_2">\
	<img src="/pages/bd/spaceship/images/s_2_bg.jpg" alt="" class="bg">\
	<div class="crosshare_box" data-vmvalue="18" data-vmparam="margin-top" >\
		<div class="crosshair animated infinite rotate"></div>\
		<div class="crosshair_info"></div>\
	</div>\
	<div class="ball" data-vmvalue="54.07" data-vmparam="margin-top" ></div>\
	<div class="tip" data-vmvalue="69.4444" data-vmparam="margin-top" >\
    	<span>点击解锁</span>\
		<div class="point"></div>\
	</div>\
	<div class="talkBox" data-vmvalue="95" data-vmparam="margin-top">\
		<div class="talk">\
    		<div class="txt">亲爱的地球人：<br>在遥远的365宇宙空间，将召开一场 “时间管理盛会”。<br />我们发现你被赋予了管理时间的神奇能力，这正是我们需要的力量！<br><span class="c1">现在解锁战舰操纵屏，前往365宇宙空间站吧！</span></div>\
    	</div>\
	</div>\
</div>\
<div class="screen none" id="s_3">\
	<div class="title"><img src="/pages/bd/spaceship/images/title.png" alt=""></div>\
	<div class="talkBox">\
		<div class="talk">\
    		<div class="txt">“一日舰长”将受邀参加“时间管理”大会，和我们分享您和365日历的成长故事。<br><br>北京的用户：将受邀到活动现场参与访谈<br>非北京用户：工作人员将与您连线访谈<br>截止时间：8月27日<br>活动时间：8月29日  下午2点至5点</div>\
    	</div>\
	</div>\
	<form class="form" onsubmit="return false;">\
		<div class="text">\
			<label for="name">姓名</label>\
			<div><input type="text" id="name" maxlength="15" placeholder="如：王小萌"></div>\
		</div>\
		<div class="text">\
			<label for="place">城市</label>\
			<div><input type="text" id="place" maxlength="15" placeholder="如：北京"></div>\
		</div>\
		<div class="text">\
			<label for="industry">行业</label>\
			<div><input type="text" id="industry" maxlength="15" placeholder="如：互联网"></div>\
		</div>\
		<div class="text">\
			<label for="tel">电话</label>\
			<div><input type="tel" id="tel" maxlength="11" placeholder="请务必留下您的联系方式"></div>\
		</div>\
		<div class="textarea">\
			<label for="desc">您平时都用365日历做什么？</label>\
			<textarea id="desc" maxlength="100"></textarea>\
		</div>\
		<button class="btn" type="submit">确认报名&nbsp;&nbsp;&nbsp;&nbsp;解锁操控屏</button>\
	</form>\
	<p class="copyright">365日历  Calendar</p>\
</div>\
<div class="screen full none" id="s_4">\
	<img src="/pages/bd/spaceship/images/s_4_bg.jpg" alt="" class="bg">\
	<div class="ship1">\
		<img src="/pages/bd/spaceship/images/ship1.png" data-vmvalue="25" data-vmparam="margin-top" class="animated" alt="">\
		<p class="animated">成功解锁操控屏！<br>战舰正在前往365宇宙空间站···</p>\
	</div>\
</div>\
<div class="screen full none" id="s_5">\
	<img src="/pages/bd/spaceship/images/s_5_bg.jpg" alt="" class="bg">\
	<div class="talkBox" data-vmvalue="50" data-vmparam="margin-top">\
		<div class="talk">\
    		<div class="txt">恭喜您成功报名：<br>战舰已经抵达365宇宙空间站，若您成功被选为“一日舰长”，我们将在<span class="c1">8月27日前给您发去邀请函。</span><br><br>365战舰很荣幸与您并肩共战！在这里召唤更多的人加入我们，我们在这里，等待......</div>\
    	</div>\
	</div>\
	<div class="share"><a href="javascript:;" class="btn">去邀请更多地球人参加</a></div>\
	<p class="copyright">365日历  Calendar</p>\
</div>\
						');
						space.setObjectByVW();
						$('.music').addClass('none');
						space.music();
						space.setup0();
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
				'/pages/bd/spaceship/images/crosshair_shadow.png',
				'/pages/bd/spaceship/images/crosshair.png',
				'/pages/bd/spaceship/images/crosshare_info.png',
				'/pages/bd/spaceship/images/face.png',
				'/pages/bd/spaceship/images/music.png',
				'/pages/bd/spaceship/images/point.png',
				'/pages/bd/spaceship/images/renderBtn.png',
				'/pages/bd/spaceship/images/renderIcon.png',
				'/pages/bd/spaceship/images/s_0_bg.jpg',
				'/pages/bd/spaceship/images/s_1_bg.jpg',
				'/pages/bd/spaceship/images/s_2_bg.jpg',
				'/pages/bd/spaceship/images/s_3_bg.jpg',
				'/pages/bd/spaceship/images/s_4_bg.jpg',
				'/pages/bd/spaceship/images/s_5_bg.jpg',
				'/pages/bd/spaceship/images/ship_light.png',
				'/pages/bd/spaceship/images/ship.png',
				'/pages/bd/spaceship/images/ship1.png',
				'/pages/bd/spaceship/images/title.png'
			];
			var img_len_static = img_len = data.length + 1;

			var mp3Name = '/pages/bd/spaceship/audio/bg.mp3';
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
		noDrag: function () {
			function stopDefault( e ) { 
			    if ( e && e.preventDefault ) 
			        e.preventDefault(); 
			    else
			        window.event.returnValue = false; 
			    return false; 
			}
			$(window).on('touchstart', stopDefault).on('pointerdown', stopDefault);
		},
		drag: function () {
			$(window).off('touchstart').off('pointerdown');
		},
		music: function () {
			$('.music').on('tap', function () {
				var me = $(this);
				var audio = $('#music_av')[0];
				if(audio.paused){
					me.removeClass('stop');
					audio.play();
				}
				else{
					me.addClass('stop');
					audio.pause();
				}
			});
		},
		setShowSize: function () {
			var win = $(window);
			var winH = win.height();
			var winW = win.width();
			var winPre = winW / winH;
			var bgH = 1028;
			var bgW = 640;
			var bgPre = bgW / bgH;

			if(winPre > bgPre){
				space.sH = '';
			}
			else{
				space.sW = '';
			}

			//如果垂直标准横向适应，需要修正偏移
			if(space.sH == '100%'){
				space.sL = -((640 * win.height() / 1028) - win.width()) / 2;
			}
		},
		setup0: function () {
			//设置背景
			var bg = $('#s_0 .bg');
			bg.width(space.sW).height(space.sH).css('left', space.sL);

			setTimeout(function () {
				$('#s_0').show('slow');
				$('.renderbtn').on('tap', function () {
					$('.renderbtn').off('tap');
					$('#s_0').fadeOut('slow', function () {
						$('#s_0').css('z-index', -2);
					});
					space.setup1();
				});
			}, 500);
		},
		setup1: function () {
			//设置背景
			var bg = $('#s_1 .bg');
			bg.width(space.sW).height(space.sH).css('left', space.sL);

			$('#s_1').show('slow' , showShip);

			if(app.getUa.weixin || app.getUa.ios){
				$('#music_av')[0].play();
				$('.music').removeClass('none');
			}

			function showShip () {
				$('.ship').addClass('fadeInLeft');

				setTimeout(showDesc, 500);
			}

			function showTip () {
				$('.tip').fadeIn();
				$('.shipLight').addClass('flash');

				$('.ship').on('tap', function () {
					$('.ship').off('tap');
					$('#s_1').fadeOut('slow', function () {
						$('#s_1').css('z-index', -2);
					});
					space.setup2();
				})
			}

			function showDesc () {
				var txt = '亲爱的地球人：这里是365战舰，  一艘具有自由穿梭时空功能的战舰！    想了解更多，  请登录驾驶舱...';

				//设置对话框高度
				var box = $('.desc .txt');
				box.html(txt.replace('', '<br>').replace(/ /g, ''));
				setTimeout(function () {
					box.height(box.height()).html('')
				}, 16);

				var mars = [];

				// 打字机
				setTimeout(function () {
					for (var i = 0; i < txt.length; i++) {
						(function (t, _i) {
							mars.push(setTimeout(function () {
								var box = $('.desc .txt');
								var html = box.html();
								box.html(html + (t == '' ? '<br>' : t == ' ' ? '' : t));
							}, 100 * _i));
						})(txt[i], i)
					};
					mars.push(setTimeout(showTip, i * 100));

					$('.desc').on('tap', function () {
						for (var i = 0; i < mars.length; i++) {
							clearTimeout(mars[i]);
						};
						box.html(txt.replace('', '<br>').replace(/ /g, ''));
						showTip();
					})
				}, 700);

				// 显示
				$('.desc').addClass('fadeInDown');
			}
		},
		setup2: function () {
			//设置背景
			var bg = $('#s_2 .bg');

			$('#s_2').show('slow');

			$('.ball').on('tap', function () {
				$('.ball').off('tap');
				$('#s_2').fadeOut('slow', function () {
					$('#s_2').css('z-index', -2);
				});
				space.setup3();
			});
		},
		setup3: function () {
			//设置背景
			// var bg = $('#s_3 .bg');
			$('html').removeClass('fullScreen');
			space.drag();

			$('#s_3').show('slow');

			//表单处理
			$('.form').on('submit', space.postData);
		},
		setup4: function () {
			//设置背景
			var bg = $('#s_4 .bg');

			$('#s_4').show('slow', function () {
				setTimeout(function () {
					$('.ship1 p').addClass('fadeInUp');
				}, 200);
				setTimeout(function () {
					$('.ship1 img').addClass('fly');
				}, 1000);
				setTimeout(function () {
					$('#s_4').fadeOut('slow', function () {
						$('#s_4').css('z-index', -2);
					});
					setTimeout(function () {
						space.setup5();
					}, 500);
				}, 3200);
			});
		},
		setup5: function () {
			//设置背景
			var bg = $('#s_5 .bg');

			$('#s_5').show('slow');

			$('.share').on('tap', function () {
				if(!app.getUa.weixin){
					app.call({
	                    action: 'share',
	                    params: [
	                        {
	                            name: 'shareString',
			        			value: JSON.stringify({
			        				title: '“霸道舰长，我要你！”',
			        				content: '365时空战舰，招募一日舰长',
			        				link: 'http://www.365rili.com/pages/bd/spaceship/index.html',
			        				image: 'http://www.365rili.com/pages/bd/spaceship/images/wx.jpg',
			        				isEvent: 'true'
			        			})
	                        }
	                    ],
	                    callBack: function (headers) {}
	                });
				}
				else{
					space.share();
				}
			})
		},
		share: function () {
			var shareDom = $('<div class="shareTip"><img src="/pages/bd/spaceship/images/share.png" width="165" alt="" /></div>');
			shareDom.appendTo('body');
			shareDom.on('tap', function () {
				shareDom.remove();
			})
		},
		postData: function () {
			var data = {};
			data.name = $('#name').val();
			data.place = $('#place').val();
			data.industry = $('#industry').val();
			data.tel = $('#tel').val();
			data.desc = $('#desc').val();

			if(space.empty(data.name)){
				return alert('请填写姓名') || $('#name').focus();
			}
			if(space.empty(data.place)){
				return alert('请填写地址') ||$('#place').focus();
			}
			if(space.empty(data.industry)){
				return alert('请填写行业') ||$('#industry').focus();
			}
			if(space.empty(data.tel)){
				return alert('请填写电话') ||$('#tel').focus();
			}
			if(!/^1\d{10}$/.test(data.tel) && !/^0\d{2,3}-?\d{7,8}$/.test(data.tel)){
				return alert('电话格式错误') ||$('#tel').select();
			}
			if(space.empty(data.desc)){
				return alert('请填写详情') ||$('#desc').focus();
			}

			$.ajax({
				url:'/pages/bd/spaceship/data.html',
				data: data,
				success: function () {
					$('.form').off('submit');
					$('#s_3').fadeOut('slow', function () {
						$('#s_3').css('z-index', -2);
						space.noDrag();
						$(window).scrollTop(0);
						$('html').addClass('fullScreen');
						space.setup4();
					});
				},
				error: function () {
					space.showError('哎呀，解锁失败，操控屏爆炸啦！', '重新解锁');
				}
			});
		},
		empty: function (o) {
			return o == '' || o == null;
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
				space.showError('手机竖屏体验效果更佳')
			}
			else{
				$('.messagebtn').off('tap');
				$('.message').remove();
				$('.mask').remove();
			}
		}
	};

	window.addEventListener('orientationchange', createOrientationChangeProxy(space.checkScreen, window), false); 

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

	window.s = space;
	space.checkScreen();
	space.init();
})();