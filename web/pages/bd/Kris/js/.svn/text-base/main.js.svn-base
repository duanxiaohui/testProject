/**
 * 吴亦凡生日会
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-11-02 12:28:56
 */
(function () {
	function GetCookie (name) {
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
	if(app.getUa.weixin){
		var auto = GetCookie('auto');
		if(!auto){
			var url = window.location.href;
			window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
			return;
		}
	}
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
	var _data = {
		tmpl:'\
			<div class="setup1">\
				<div class="setup1Face">\
					<img src="/pages/bd/Kris/images/setup1FaceLight.png" class="animated infinite flashQ" alt="">\
					<img src="/pages/bd/Kris/images/setup1Face.png" alt="">\
				</div>\
				<img class="setup1Txt" src="/pages/bd/Kris/images/setup1Txt.png" width="100%" alt="">\
				\
				<div class="setup1JT">\
					<img src="/pages/bd/Kris/images/setup1JTLight.png" class="animated infinite flashQ" alt="">\
					<img src="/pages/bd/Kris/images/setup1JT.png" alt="">\
				</div>\
				\
				<div class="setup1Btn">\
					<img src="/pages/bd/Kris/images/setup1BtnLight.png" class="animated infinite flashBtn" alt="">\
					<img src="/pages/bd/Kris/images/setup1Btn.png" alt="">\
				</div>\
			</div>\
			\
			<div class="setup2">\
				<div class="con">\
					<div class="conInner">\
						<img src="/pages/bd/Kris/images/setup2TxtLight.png" class="animated infinite flashBtn" width="100%" alt="">\
						<img src="/pages/bd/Kris/images/setup2Txt.png" width="100%" alt="">\
					</div>\
				</div>\
				<div class="setup2Btns">\
					<img class="addBtn" src="/pages/bd/Kris/images/addScheduleBtn.png" height="60" alt="">\
					<img class="shareBtn" src="/pages/bd/Kris/images/shareBtn.png" height="60" alt="">\
				</div>\
			</div>\
			\
			<div class="shareBg none">\
				<img src="/pages/bd/Kris/images/shareBg.png" width="100%" alt="">\
			</div>\
		'
	}
	var K = {
		init: function () {
			$('.start').on('tap', function () {
				$('.setup1').fadeIn();

				$('.loading').fadeOut(function () {
					$('.loading').remove();
				});

				$('.music').removeClass('none');
			});

			$('.setup1Btn').on('tap', function () {
				$('.setup1').fadeOut(function () {
					$('.setup1').remove();
				});
				$('.setup2').fadeIn();
				if(app.getUa.ios){
					new IScroll('.con');
				}

				$('.footer').html('<img src="/pages/bd/Kris/images/logo1.png" width="110" alt="" style="margin-top: 5px; margin-right: 15px;"><img src="/pages/bd/Kris/images/logo.png" width="80" alt="">')
			});

			$('.shareBtn').on('tap', function () {
				if(app.getUa.weixin || app.getUa.qq){
					$('.shareBg').fadeIn();
				}
				else{
					app.call({
		                action: 'share',
		                params: [
		                    {
		                        name: 'shareString',
			        			value: JSON.stringify({
			        				title: '365日历独家爆料吴亦凡生日安排',
			        				content: '凡凡生日进行时！365日历带你全程感受fantastic见面会行程！',
			        				link: 'http://www.365rili.com/pages/bd/Kris/index.html',
			        				image: 'http://www.365rili.com/pages/bd/Kris/images/wx.jpg',
			        				isEvent: 'true'
			        			})
		                    }
		                ],
		                callBack: function (headers) {}
		            });
				}
			});

			$('.shareBg').on('tap', function () {
				$('.shareBg').fadeOut();
			});

			$('.addBtn').on('tap', K.addSchedule);
		},
		addSchedule: function () {
			if(app.getUa.qq){
				return plug.alert('下载365日历关注日程', '将有机会获得凡凡亲笔签名礼品');
			}

			var schedule = K.schedule.shift();

			if(!schedule){
				plug.alert('成功添加至个人日程', '您已获得凡凡亲笔签名礼品抽奖资格');
				return;
			}

			if(app.getUa.weixin){
				$.ajax({
					url: '/calendar/getCalendarListByUser.do',
					type: 'post',
					dataType: 'json',
					success: function (data) {
						for (var i = 0; i < data.length; i++) {
							if (data[i].is_primary == "true" && data[i].data_domain != 'google'){

								var postData = {
									schTitle : schedule.title,
									alldayEvent : schedule.allDayEvent,
									calendarId : data[i].id,
									startTime : (function (d) {
										return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-').replace(/(\D)(\d)(?=\D|$)/g, '$10$2') + ' ' + ['', d.getHours(), d.getMinutes()].join(':').replace(/(\D)(\d)(?=\D|$)/g, '$10$2').substr(1) + ':00';
									})(new Date(schedule.startTime)),
									timeZone : 8,
									duration : schedule.duration,
									description : '',
									repeatType : 0,
									calendarType : 'S',
									before_minutes : 10,
									fromDate : '1970-01-01',
									toDate : '1970-01-01',
									repeatCount : '',
									repeatDay : '',
									repeatFrequency : '',
									repeatMonth : '',
									repeatMonthDay : '',
									repeatStopTime : '',
									scheduleId : '',
									linked_url : '',
									location : '',
								};

								postData.updateV2Origin = 'Kris';
								$.ajax({
									url: '/schedule/updateV2.do',
									data: postData,
									complete: function () {
										K.addSchedule();
									}
								});
								return;
							}
						};
					}
				});
			}
			else{
				app.call({
	                action: 'addSchedule',
	                params: [
	                    {
	                        name: 'scheduleJSON',
	                        value: JSON.stringify({
				                schedule:schedule,
				                "alarms":[10]
				            })
	                    }
	                ],
	                callBack: function () {
	                	K.addSchedule();
	                }
	            });
			}
		},
		schedule: [
			{
                "startTime": (new Date('2015/11/05 15:00:00')).getTime(),
                "duration": 0,
                "allDayEvent": false,
                "title" : "今日头条×吴亦凡 算数发布会",
                description : ''
            },
			{
                "startTime": (new Date('2015/11/06 19:30:00')).getTime(),
                "duration": 0,
                "allDayEvent": false,
                "title" : "吴亦凡2015Fantastic见面会",
                description : ''
            },
			{
                "startTime": (new Date('2015/11/06 13:00:00')).getTime(),
                "duration": 0,
                "allDayEvent": false,
                "title" : "吴亦凡2015Fantastic见面会彩排",
                description : ''
            }
		],
		music: function () {
			var audio = $('#music_av')[0];
			audio.loop = false;
			audio.addEventListener('ended', function(){
			    audio.play();
			}, false);
			$('.music, .start').on('tap', function () {
				var me = $(this);
				if(audio.paused){
					me.find('img').eq(0).fadeIn();
					audio.play();
				}
				else{
					me.find('img').eq(0).fadeOut();
					audio.pause();
				}
			});
		},
		loading: function () {
			$('.loading').removeClass('none');
			K.show_num(0);
			function setPre (n) {
				n = Math.ceil(n * 100.00);
				setTimeout(function () {
					K.show_num(n);

					if(n == 100){
						setTimeout(function () {
							$('body').append(_data.tmpl);
							$('.loadingTxt').fadeOut();
							$('.start').fadeIn('slow');
							K.music();
							K.init();

						}, 500);
					}
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
				'/pages/bd/Kris/images/lightLight.png',
				'/pages/bd/Kris/images/light.png',
				'/pages/bd/Kris/images/loadingIcon.png',
				'/pages/bd/Kris/images/startLight.png',
				'/pages/bd/Kris/images/start.png',
				'/pages/bd/Kris/images/musicLight.png',
				'/pages/bd/Kris/images/music.png',
				'/pages/bd/Kris/images/setup1Face.png',
				'/pages/bd/Kris/images/setup1Txt.png',
				'/pages/bd/Kris/images/setup1JTLight.png',
				'/pages/bd/Kris/images/setup1JT.png',
				'/pages/bd/Kris/images/setup1BtnLight.png',
				'/pages/bd/Kris/images/setup1Btn.png',
				'/pages/bd/Kris/images/setup2TxtLight.png',
				'/pages/bd/Kris/images/addScheduleBtn.png',
				'/pages/bd/Kris/images/shareBtn.png',
				'/pages/bd/Kris/images/shareBg.png',
				'/pages/bd/Kris/images/logo.png',
				'/pages/bd/Kris/images/bg.jpg'
			];

			var img_len_static = img_len = data.length + 1;

			var mp3Name = '/pages/bd/Kris/mp3/bg.mp3';
			loadMp3(mp3Name);

			for (var i = 0; i < data.length; i++) {
				loadImage(data[i]);
			};
		},
		show_num: function (n) {
			$('.loadingTxt span').html(n);
		}
	};
	K.loading();
})();