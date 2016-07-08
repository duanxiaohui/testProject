/**
 * lettle
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-10-08 10:39:15
 */

(function () {
	var lettle = {
		init: function () {
			function stopDefault( e ) { 
			    if ( e && e.preventDefault ) 
			        e.preventDefault(); 
			    else
			        window.event.returnValue = false; 
			    return false;
			}
			if(app.getUa.ios){
				$(window).on('touchstart', stopDefault);
				$(window).on('pointerdown', stopDefault);
			}
			lettle.loadResource()
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
						$('.main').html('\
							<img class="lettle lettle3" src="/pages/bd/lettle/images/lettle_all.png" width="375" alt="">\
							<img class="lettle lettle2" src="/pages/bd/lettle/images/lettle_all.png" width="375" alt="">\
							<div class="lettle lettle1">\
								<img src="/pages/bd/lettle/images/logo.png" width="59" class="logo" alt="" />\
								<img src="/pages/bd/lettle/images/lettle_mask.png" style="position: absolute; left: 0; top: 0; z-index: 3;" width="375" alt="">\
								<div class="contain">\
									<div class="cont">\
										<img src="/pages/bd/lettle/images/zyhdyfx.png" width="44" alt="" class="zyhdyfx">\
										<div class="mask"></div>\
										<img src="/pages/bd/lettle/images/content.png" width="99.9%" alt="" class="contentImg">\
									</div>\
								</div>\
								<img src="/pages/bd/lettle/images/lettle_base.png" style="position: absolute; left: 0; top: 0; z-index: 1;" width="375" alt="">\
								<div class="animated lettle_p" style="z-index: 4;">\
									<img src="/pages/bd/lettle/images/lettle_f1.png" class="back" width="375" alt="">\
									<img src="/pages/bd/lettle/images/lettle_b.png" class="front" width="375" alt="">\
								</div>\
							</div>\
							<img class="pen" src="/pages/bd/lettle/images/pen.png" width="150" alt="" />\
							<img class="pen1" src="/pages/bd/lettle/images/pen.png" width="150" alt="" />\
						').removeClass('none');

						lettle.resize();

						setTimeout(function () {
							$('.lettle_p').addClass('rotate');

							setTimeout(function () {
								lettle.fallDown();
								$('.lettle_p').css({
									'z-index': 1
								});
							}, 2000);
						}, 1000)
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
				'/pages/bd/lettle/images/logo1.png',
				'/pages/bd/lettle/images/bg.jpg',
				'/pages/bd/lettle/images/lettle_all.png',
				'/pages/bd/lettle/images/lettle_all.png',
				'/pages/bd/lettle/images/lettle_mask.png',
				'/pages/bd/lettle/images/zyhdyfx.png',
				'/pages/bd/lettle/images/content.png',
				'/pages/bd/lettle/images/lettle_base.png',
				'/pages/bd/lettle/images/lettle_f1.png',
				'/pages/bd/lettle/images/up.png',
				'/pages/bd/lettle/images/lettle_b.png'
			];
			var img_len_static = img_len = data.length;

			for (var i = 0; i < data.length; i++) {
				loadImage(data[i]);
			};
		},
		resize: function () {
			var _window = $(window);
			var ww = _window.width();
			var wh = _window.height();

			var w = 375;
			var h = 627;

			var wpre = ww / wh;
			var pre = w / h;

			if(wpre > pre){
				window.p = wh / h;
				$('.main').css({
					'-webkit-transform': 'scale(' + wh / h + ')'
				});
				$('.main').css({
					'margin-left': ($(window).width() - $('.main').width()) / 2 + 'px'
				});
			}
			else{
				window.p = ww / w;
				$('.main').css({
					'-webkit-transform': 'scale(' + ww / w + ')'
				});

				$('.main').css({
					'top': ($(window).height() - $('.main').height()) / 2 + 'px'
				});
			}
		},
		fallDown: function () {
			$('.lettle1').css({
				top: 400 + 'px'
			});
			$('.pen').css({
				top: 747 + 'px'
			});
			$('.pen1').css({
				top: -($(window).height() - $('.main').height()) / 2 - 240 + 'px',
				display: 'block'
			});
			setTimeout(function () {
				$('.contain').css({
					height: (627 - 40) + 'px'
				})
				setTimeout(function () {
					$('.pen1').css({
						top: '200px'
					});
					$('.mask').css({
						top: '367px',
						height: 0
					});
					setTimeout(function () {
						$('.pen1').css({
							opacity: 0,
							'-webkit-transition': 'all 1s'
						});
						$('.zyhdyfx').css({
							opacity: 0
						});
						$('.mask').remove();
						$('.contentImg').css({
							opacity: 1
						});
						// $('.cont').height($('.contentImg').height() + 300);
						setTimeout(function () {
							$('.pen1').remove();
							$('.zyhdyfx').remove();

							if(app.getUa.ios){
								new IScroll('.cont');
							}
							$('.main').append('<img class="up" src="/pages/bd/lettle/images/up.png">')

						}, 1000);
					},4000);
				}, 900);
			}, 1000);
			$('.lettle2').fadeOut();
			setTimeout(function () {
				$('.lettle3').fadeOut();
			}, 300);
		}
	};
	lettle.init();
})();