/**
 * 黄道吉日
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-05-12 10:55:09
 */

(function () {
	function stopDefault( e ) { 
	    if ( e && e.preventDefault ) 
	        e.preventDefault(); 
	    else
	        window.event.returnValue = false; 
	    return false;
	}

	var _data = window.d = {
		yj:{
			'365': {
				date: '7月5日',
				day: '星期日',
				eDay: 'Sunday',
				t: '有实力让情怀落地',
				b: '点击下载365日历',
				wx: '宜【让未来 就现在】'
			},
			'camera360': {
				date: '5月20日',
				day: '星期三',
				eDay: 'Wednesday',
				t: '相机360滤镜大师，不服来战！',
				b: '点击下载相机360',
				wx: '忌【修图修过头 整容又撞脸】'
			},
			'pptv': {
				date: '12月25日',
				day: '星期五',
				eDay: 'Friday',
				t: '始终和你同一频道',
				b: '点击下载pptv',
				wx: '宜【高清无码 小泽玛利亚】'
			},
			'tuniu': {
				date: '10月1日',
				day: '星期四',
				eDay: 'Thursday',
				t: '找途牛 看世界',
				b: '奉上200元旅游抵用券',
				wx: '忌【梦想那么大 胆子那么小】'
			},
			'helijia': {
				date: '8月20日',
				day: '星期四',
				eDay: 'Thursday',
				t: '遇见更好的自己',
				b: '奉上新人红包',
				wx: '忌【铅华洗尽 此颜差矣】'
			},
			'shengriguanjia': {
				date: '6月21日',
				day: '星期日',
				eDay: 'Sunday',
				t: '奉上60元新人礼包',
				b: '点击下载即可获得',
				wx: '宜【友谊与爱 不可辜负】'
			}
		},
		_pre: {
			'weixin': {
				'camera360': 20,
				'365': 20,
				'pptv': 20,
				'tuniu': 15,
				'helijia': 15,
				'shengriguanjia': 10
			},
			'365': {
				'camera360': 30,
				'pptv': 30,
				'helijia': 15,
				'tuniu': 15,
				'shengriguanjia': 10
			},
			'pptv': {
				'camera360': 30,
				'365': 30,
				'helijia': 20,
				'tuniu': 15,
				'shengriguanjia': 10
			},
			'helijia': {
				'camera360': 30,
				'365': 25,
				'pptv': 25,
				'tuniu': 10,
				'shengriguanjia': 10
			},
			'camera360': {
				'helijia': 15,
				'365': 30,
				'pptv': 25,
				'tuniu': 20,
				'shengriguanjia': 10
			}
		}
	};
	var hdjr = {
		init: function () {
			hdjr.getChannel();
			hdjr.openPre();
			hdjr.fixedBar();
			var name = hdjr.getName();
			if(name){
				hdjr.setup2(name);
			}
			else{
				hdjr.setup1();
			}
		},
		fixedBar: function () {
			if(_data.place == 'plaza'){
				$('.bar').show();
				$('.setup1').css({
					'background-position': 'center top'
				});
			}
		},
		openPre: function () {
			var em = app.getUa.weixin ? 'weixin' : _data.channel;
			var pre = _data._pre[em];
			_data.pre = [];
			for(var appName in pre){
				for (var i = 0; i < pre[appName]; i++) {
					_data.pre.push(appName);
				};
			}
		},
		getChannel: function () {
			_data.channel = window.location.pathname.split('/')[4];
			if(_data.channel == 'plaza' || _data.channel == 'hotevent'){
				_data.place = _data.channel;
				_data.channel = '365';
			}
		},
		getName: function () {
			return app.query('n') || '';
		},
		getPre: function (num) {
			return _data.pre[num];
		},
		setup1: function () {
			//禁止滚动
			$(window).on('touchstart', stopDefault);
			$('body').removeClass('s2').addClass('s1');
			$('.setup1').removeClass('none');
			$('input').on('touchstart', function () {
				event.stopPropagation();
				// $(this).focus();
			})
			.on('touchmove', stopDefault)
			.on('focus', function () {
				if(app.getUa.android){
					$('<div class="android_input_mask"></div>').appendTo('body');					
				}
			});
			$('form').on('submit', function () {
				$('input').blur();
				$('.android_input_mask').remove();
				return false;
			})
			$(window).on('tap', function () {
				$('input').blur();
				$('.android_input_mask').remove();
			})
			// .on('input', function () {
			// 	console.dir(this)
			// 	console.log(this.value)
			// 	// console.log(this.value)
			// 	// this.value = this.value.replace(/[^\u4E00-\u9FA5a-zA-Z\d\.。·]/g,'');
			// })

			var submit = function () {
				clearTimeout(mar);
				$('audio')[0].pause();
				$('audio')[0].currentTime = 0.0
				setTimeout(hdjr.submit, 16);
				$('.finger').off('touchend');
			};
			var mar = 0;
			$('.finger').on('touchstart', function () {
				$('input').blur();
				$('audio')[0].play();
				$('.finger').on('touchend', submit)
				mar = setTimeout(submit, 5000);
			});

			//微信分享
			if(app.getUa.weixin){
				wxProtocol.init({
					imgUrl: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
					title: '你的羊年黄道吉日是哪天，宝贝来测一测？',
					desc: '测得你不要不要的',
					link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html',
					success: function () {
						$.ajax({
							url: '/operation/share.do?shareId=96&channel=weixin'
						});
					}
				});
			}

			//广场分享
			if(_data.place == 'plaza'){
				var shareFn = function () {
					$.ajax({
						url: '/operation/share.do?shareId=96&channel=plaza'
					});
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
			        			value: JSON.stringify({
			        				title: '你的羊年黄道吉日是哪天，宝贝来测一测？',
			        				content: '测得你不要不要的',
			        				link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html',
			        				image: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
			        				isEvent: 'true'
			        			})
                            }
                        ],
                        callBack: function (headers) {}
                    });
				};
				$('.share_btn, .control').on('tap', shareFn);
			}
			//热点分享
			if(_data.place == 'hotevent'){
				$('.shareControl').on('tap', function () {
					$.ajax({
		                url:'http://www.365rili.com/tmpmessage/shared.do',
		                data:{
		                    id: '73',
		                    target: 'hdjr'
		                },
		                success: function (datas) {
		                    if(datas.state != 'ok'){
		                        return false;
		                    }
		                    $.ajax({
								url: '/operation/share.do?shareId=96&channel=hot'
							});
		                    app.call({
		                        action: 'share',
		                        params: [
		                            {
		                                name: 'shareString',
					        			value: JSON.stringify({
					        				title: '你的羊年黄道吉日是哪天，宝贝来测一测？',
					        				content: '测得你不要不要的',
					        				link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html',
					        				image: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
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
				});
			}

			//camera360
			if(_data.channel == 'camera360'){
				PG.ready(function (ex) {
					ex.showMenuItems({
					    list: [{
					        name: 'share',
					        list: [{
					            name: 'wechat'
					        }, {
					            name: 'wechatMoments'
					        }]
					    }]
					});

					ex.onWebShareDefault({
						title:'你的羊年黄道吉日是哪天，宝贝来测一测？',
						desc:'测得你不要不要的',
						link:'http://www.365rili.com/pages/bd/hdjr/weixin/index.html',
						imgUrl:'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
						callback:function(res){
							$.ajax({
								url: '/operation/share.do?shareId=96&channel=camera360'
							});
						}
					});

					ex.onWebShareTimeline({
						title:'你的羊年黄道吉日是哪天，宝贝来测一测？',
						desc:'测得你不要不要的',
						link:'http://www.365rili.com/pages/bd/hdjr/weixin/index.html',
						imgUrl:'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
						callback:function(res){
							$.ajax({
								url: '/operation/share.do?shareId=96&channel=camera360'
							});
						}
					});
				});
			}
		},
		setup2: function (name) {
			$(window).off('touchstart');
			_data.realName = name;
			//计算概率，获得对应的app
			var appName = hdjr.getPre(hdjr.toUnicodeSum(name) - 1);

			$('body').removeClass('s1').addClass('s2');
			$('.setup1').addClass('none');
			$('.setup2').removeClass('none');

			//插入日期
			// $('.date .bigFont').html(_data.yj[appName].date);
			$('.date .bigFont').html('365日历');
			$('.day .litFont').html('2015年');
			$('.day .bigFont').html(_data.yj[appName].date);
			
			//插入农历日期
			$('.lunar').html('<img src="/pages/bd/hdjr/images/' + appName + '.gif" width="178" height="31">');
			//插入宜忌
			$('.jy').addClass('animated').html('<div><img src="/pages/bd/hdjr/images/' + appName + 'jy.gif" width="128"></div>');
			setTimeout(function () {
				$('.jy div').addClass('jyInner', 16);
			})

			//插入logo
			$('.logo').html('<img src="/pages/bd/hdjr/images/' + appName + 'logo.jpg">');

			//插入文字
			$('.txt .t').html(_data.yj[appName].t);
			$('.txt .b').html(_data.yj[appName].b);

			//插入链接
			switch (appName){
				case '365': 
					$('.txt .b').attr('data-href', 'http://i.365rili.com/');
					break;
				case 'pptv': 
					$('.txt .b').attr('data-href', 'http://a.app.qq.com/o/simple.jsp?pkgname=com.pplive.androidphone');
					break;
				case 'helijia': 
					$('.txt .b').attr('data-href', 'http://www.helijia.com?channel=365rili');
					break;
				case 'shengriguanjia': 
					$('.txt .b').attr('data-href', 'http://365shengri.cn/jump/d/48e1Vc-610-2153E');
					break;
				case 'tuniu': 
					$('.txt .b').attr('data-href', 'http://m.tuniu.com/app/union/partner_id/16591/');
					break;
				case 'camera360': 
					if(app.getUa.weixin){
						$('.txt .b').attr('data-href', 'http://a.app.qq.com/o/simple.jsp?pkgname=vStudio.Android.Camera360&ckey=CK1301068376850');
						break;
					}
					if(_data.channel == '365'){
						$('.txt .b').attr('data-href', 'http://a.app.qq.com/o/simple.jsp?pkgname=vStudio.Android.Camera360&ckey=CK1301068376850');
						break;
					}
					if(_data.channel == 'pptv'){
						$('.txt .b').attr('data-href', 'http://a.app.qq.com/o/simple.jsp?pkgname=vStudio.Android.Camera360&ckey=CK1301327516240 ');
						break;
					}
					if(_data.channel == 'helijia'){
						$('.txt .b').attr('data-href', 'http://a.app.qq.com/o/simple.jsp?pkgname=vStudio.Android.Camera360&ckey=CK1301327274110');
						break;
					}

					break;
			}

			$('.txt .b').on('tap', function () {
				var channel = appName;
				if(channel == '365'){
					channel = _data.place;
				}
				$.ajax({
					url:'/operation/share.do?shareId=97&channel=' + appName,
					success: function () {
						window.location.href = $('.txt .b').attr('data-href');
					}
				});
			})

			//插入按钮
			//
			//我也要测
			if(app.query('n') != ''){
				$('.control').html('<img src="/pages/bd/hdjr/images/play.gif" width="100%">')

				//点击重测
				.on('tap', function () {
					console.log(123)
					window.location.href = 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html';
				})
			}
			//微信分享
			else if(_data.channel == 'weixin'){
				$('.control').html('<img src="/pages/bd/hdjr/images/wxShare.gif" width="100%">');
			}
			//客户端分享
			else{
				$('.control').html('<img src="/pages/bd/hdjr/images/share.gif" width="100%">');
			}

			//增加分享按钮
			if(app.query('n') == ''){
				$('.control').addClass('shareControl');
			}

			//兼容
			if(_data.channel == 'helijia'){
				$('.setup2').addClass('needTopMargin');
			}

			//微信分享
			if(app.getUa.weixin){
				wxProtocol.init({
					imgUrl: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
					title: _data.realName + '居然' + _data.yj[appName].wx + '你的羊年黄道吉日是哪天？',
					desc: '宝贝来测一测',
					link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
					success: function () {
						$.ajax({
							url: '/operation/share.do?shareId=96&channel=weixin'
						});
					}
				});
			}

			//广场分享
			if(_data.place == 'plaza'){
				var shareFn = function () {
					$.ajax({
						url: '/operation/share.do?shareId=96&channel=plaza'
					});
                    app.call({
                        action: 'share',
                        params: [
                            {
                                name: 'shareString',
			        			value: JSON.stringify({
			        				title: _data.realName + '居然' + _data.yj[appName].wx,
			        				content: '你的黄道吉日是哪天，宝贝来测一测',
			        				link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
			        				image: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
			        				isEvent: 'true'
			        			})
                            }
                        ],
                        callBack: function (headers) {}
                    });
				};
				$('.share_btn, .shareControl').on('tap', shareFn);
			}
			//热点分享
			if(_data.place == 'hotevent'){
				$('.shareControl').on('tap', function () {
					$.ajax({
		                url:'http://www.365rili.com/tmpmessage/shared.do',
		                data:{
		                    id: '73',
		                    target: 'hdjr'
		                },
		                success: function (datas) {
		                    if(datas.state != 'ok'){
		                        return false;
		                    }
		                    $.ajax({
								url: '/operation/share.do?shareId=96&channel=hot'
							})
		                    app.call({
		                        action: 'share',
		                        params: [
		                            {
		                                name: 'shareString',
					        			value: JSON.stringify({
					        				title: _data.realName + '居然' + _data.yj[appName].wx,
					        				content: '你的黄道吉日是哪天，宝贝来测一测',
					        				link: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
					        				image: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
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
				});
			}

			//camera360
			if(_data.channel == 'camera360'){
				PG.ready(function (ex) {
					ex.showMenuItems({
					    list: [{
					        name: 'share',
					        list: [{
					            name: 'wechat'
					        }, {
					            name: 'wechatMoments'
					        }]
					    }]
					});

					ex.onWebShareDefault({
						title:_data.realName + '居然' + _data.yj[appName].wx,
						desc:'你的黄道吉日是哪天，宝贝来测一测',
						link:'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
						imgUrl:'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
						callback:function(res){
							$.ajax({
								url: '/operation/share.do?shareId=96&channel=camera360'
							});
						}
					});

					ex.onWebShareTimeline({
						title:_data.realName + '居然' + _data.yj[appName].wx,
						desc:'你的黄道吉日是哪天，宝贝来测一测',
						link:'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
						imgUrl:'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
						callback:function(res){
							$.ajax({
								url: '/operation/share.do?shareId=96&channel=camera360'
							});
						}
					});
				});
			}

			//pptv
			if(_data.channel == 'pptv'){
				ppsdk.config({
				    api: [],
				    signature: "",
				    debug: false
				});

				ppsdk.ready(function() {
				    $('.shareControl').on('tap', function () {
				    	ppsdk.share({
					        shareText: _data.realName + '居然' + _data.yj[appName].wx,
					        shareURL: 'http://www.365rili.com/pages/bd/hdjr/weixin/index.html?n=' + _data.realName,
					        shareImgURL: 'http://www.365rili.com/pages/bd/hdjr/images/wx.png',
					        success: function(rspData) {
					        	$.ajax({
									url: '/operation/share.do?shareId=96&channel=camera360'
								});
					        },
					        error: function(errCode, msg) {

					        },
					        cancel: function() {

					        }
					    });
				    });
				});
			}
		},
		submit: function () {
			var _val = $.trim($('#realName').val());
			//检测姓名
			if(!_val){
				return hdjr.tipForRealName();
			}

			hdjr.setup2(_val);
		},
		tipForRealName: function () {
			alert('请输入您的姓名！');
		},
		toUnicodeSum: function (str) {
			var num = 0;

			for (i = 0, len = str.length; i < len; i++) {
			    num += (function () {
			    	var s = parseInt(str.charCodeAt(i).toString(16));
			    	return s.toString() == 'NaN' ? 0 : s;
			    })();
			};

			num += '';

			num = +num.substring(num.length - 2);

			if(num == 0){
				num = 100;
			}

			return num
		}
	};
	hdjr.init();
})();