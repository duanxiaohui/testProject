/**
 * mak
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-06-08 09:40:10
 */

(function () {
	if(!app.getUa.weixin && window.location.pathname.split('/')[4] == 'plaza'){
		$('html').addClass('plaza');
	}
	var _data = {
		'zfy': [
			'一年中总有一些日子想起你；虽不能时时问候，却想在此刻轻轻道声：端午节愉快，我的朋友！',
			'这个端午，送个特殊的粽子给你。爱情是外皮，里面第一层是想你，第二层是爱你，第三层是呵护着你。亲爱的，希望永远和你一起快乐地过粽子节！',
			'天长地久一碗米，吉祥如意一颗枣，幸福美满一片叶，愿亲爱的您端午快乐！',
			'端午节到，送给你我亲手包的粽子。祝你心情“粽”是好，工作“粽”是顺，财运“粽”是旺。',
			'端午节到来之际，仅以此粽，代表我们至SHI不渝的交情。 注意，这个馅的粽子只有和我有些经历的才送哦！'
		],
		'filling_txt':[
			{
				name: '钻戒',
				txt: '一生一世，不离不弃',
			},
			{
				name: '金元宝',
				txt: '金子耶！',
			},
			{
				name: '护身符',
				txt: '一个有情有义的护身符',
			},
			{
				name: '唐僧肉馅',
				txt: '吃了可以长生不老哦！',
			},
			{
				name: '奔驰车钥匙',
				txt: '装B就靠它！',
			},
			{
				name: '随机馅',
				txt: '我懒，替我选一个',
			},
			{
				name: '蜜枣',
				txt: '甜甜蜜蜜，永远不腻',
			},
			{
				name: '貔貅',
				txt: '可挡五煞，吞纳八方之财的神物',
			},
			{
				name: '一坨便便',
				txt: '没错，我就是一坨巧克力味儿的便便',
			},
			{
				name: 'VISA黑卡',
				txt: '无上限信用卡，拿去随便花',
			}
		]
	};

	var mak = {
		init: function () {
			if(app.getUa.weixin){
				wxProtocol.init(function (wx, link) {
					wx.onMenuShareAppMessage({
					    title: '我正在包个特殊的粽子给你，什么馅，绝对想不到！',
					    desc: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
					    link: link,
						imgUrl: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
					    success: mak.postShare
					});
					wx.onMenuShareTimeline({
					    title: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
					    link: link,
						imgUrl: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
					    success: mak.postShare
					});
				});
			}



			$('.share_btn').off('tap').on('tap', function () {
				$.ajax({
	                url:'/operation/share.do?shareId=126&channel=' + window.location.pathname.split('/')[4],
	                success: function () {
	                    app.call({
	                        action: 'share',
	                        params: [
	                            {
	                                name: 'shareString',
	                                value: JSON.stringify({
	                                    title: '我正在包个特殊的粽子给你，什么馅，绝对想不到！',
	                                    content: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
	                                    link: window.location.href,
	                                    image: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
	                                    isEvent: 'true'
	                                })
	                            }
	                        ],
	                        callBack: function (headers) {}
	                    });
	                }
	            });
			});

			_data.setup = 1;
			mak.showSetup();
		},
		postShare: function (channel) {
			if(channel == 'showpage'){
				channel = app.getUa.weixin ? 'weixin' : channel
				$.ajax({
					url: '/operation/share.do?shareId=126&channel=' + channel,
					success: function () {
						window.location.href = 'http://www.365rili.com/pages/bd/dragonboat/weixin/additional.html';
					}
				});
			}

			channel = app.getUa.weixin ? 'weixin' : channel
			$.ajax({
				url: '/operation/share.do?shareId=126&channel=' + channel
			});
		},
		showSetup: function (setup) {
			setup = setup || _data.setup;
			_data.setup = setup;

			$('.setup').hide();
			$('.setup_' + setup).fadeIn('fast', function () {
				mak['setup' + setup]();
			});
		},
		setup1: function () {
			$('.bamboo').each(function (i, o) {
				setTimeout(function () {
					$(o).addClass('fadeInDown');
				}, i * 150);
			});

			$('.bamboo').on('tap', function () {
				$('.bamboo').removeClass('selected');
				$(this).addClass('selected');
				_data.bambooSelected = $(this).index();

				$('.setup_1_btn a').off('tap').on('tap', function () {
					mak.showSetup(2);
				})

				$('.setup_1_btn div').removeClass('none');
			})
		},
		setup2: function () {
			$('.bar_progress_div').width('35%');
			$('.rice').each(function (i, o) {
				setTimeout(function () {
					$(o).addClass('fadeInDown');
				}, i * 150);
			});

			$('.rice').on('tap', function () {
				$('.rice').removeClass('selected');
				$(this).addClass('selected');
				_data.riceSelected = $(this).index();

				$('.setup_2_btn a').off('tap').on('tap', function () {
					mak.showSetup(3);
				})

				$('.setup_2_btn div').removeClass('none');
			})
		},
		setup3: function () {
			$('.bar_progress_div').width('60%');
			$('.dw_select_filling_list li').each(function (i, o) {
				setTimeout(function () {
					$(o).addClass('bounceZoonIn');
				}, i * 150);
			});

			$('.filling').on('tap', function () {
				$('.filling').removeClass('selected');
				$(this).addClass('selected');
				_data.fillingSelected = $(this).index();

				if(_data.fillingSelected ==  5){
					_data.fillingSelected = (function () {
						i = Math.ceil(app.random(-1, 9));
						if(i == 5){
							return arguments.callee();
						}
						return i
					})();
				}

				$('.filling_txt').find('h5').html(_data['filling_txt'][$(this).index()].name);
				$('.filling_txt').find('p').html(_data['filling_txt'][$(this).index()].txt)

				$('.setup_3_btn a').off('tap').on('tap', function () {
					mak.showSetup(4);
				})

				$('.setup_3_btn div').removeClass('none');
			})
		},
		setup4: function () {
			mak.refreshWX();

			$('.share_btn').off('tap').on('tap', function () {
				$.ajax({
	                url:'/operation/share.do?shareId=126&channel=' + window.location.pathname.split('/')[4],
	                success: function () {
	                    app.call({
	                        action: 'share',
	                        params: [
	                            {
	                                name: 'shareString',
	                                value: JSON.stringify({
	                                    title: ($('input').val() ? $('input').val() : '我') + '包了个特殊的粽子给你，什么馅，绝对想不到！',
	                                    content: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
	                                    link: mak.getShareUrl(),
	                                    image: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
	                                    isEvent: 'true'
	                                })
	                            }
	                        ],
	                        callBack: function (headers) {}
	                    });
	                }
	            });
			});
			$('.bar_progress_div').width('84%');
			$('.dw_complete_content').addClass('movedown');
			setTimeout(function () {
				$('.dw_complete_title').addClass('fadeInUp');
			}, 500)
			setTimeout(function () {
					$('.giv_btn').addClass('fadeInUp');
			}, 700)
			$('.giv_btn').off('tap').on('tap', function () {
					mak.showSetup(5);
			});
		    $.ajax({
		        url: '/operation/share.do?shareId=126&channel=send'
		    })
		},
		setup5: function () {
			$('textarea').val('填写你对TA的祝福语\n懒得写？历姐给你备了滋味不同的5款留言，可以任性选一个。').on('focus', function () {
				var _val = $.trim($(this).val());
				if(_val == '填写你对TA的祝福语\n懒得写？历姐给你备了滋味不同的5款留言，可以任性选一个。'){
					$(this).val('');
				}
			}).on('blur', function () {
				var _val = $.trim($(this).val());
				if(_val == ''){
					$(this).val('填写你对TA的祝福语\n懒得写？历姐给你备了滋味不同的5款留言，可以任性选一个。');
				}
			}); 

			$('input').on('input', mak.refreshWX);

			$('textarea').on('input', mak.refreshWX);

			$('.roll_btn').on('tap', function () {
				var _val = $.trim($('textarea').val());
				var i = Math.ceil(app.random(-1, 4));
				if(_val == _data.zfy[i]){
					return arguments.callee();
				}
				$('textarea').val(_data.zfy[i]);
				mak.refreshWX();
			});

			if(app.getUa.android){
				// $('.footer').remove();
				$('textarea, input').on('focus', function () {
					$('.btn_s').css({
						position:'relative',
						bottom: '0'
					});
					$('.footer').css({
						position: 'static'
					});
					// $('<img class="bgimg" src="/pages/bd/dragonboat/images/index_bg.jpg">').css({
					// 	height: $(document).height() + 'px',
					// 	width: '100%',
					// 	position: 'fixed',
					// 	'z-index': '-1',
					// 	'top': '0'
					// }).appendTo('body');
					// $('body').css({
					// 	overflow: 'hidden'
					// })
				});
				$('textarea, input').on('blur', function () {
					$('body').scrollTop(0);
					$('.btn_s').css({
						position:'absolute',
						bottom: '20px'
					});
					$('.footer').css({
						position: 'fixed'
					});
					// $('.bgimg').remove();
				});
			}

			$('.fourth').on('tap', function () {

				if(app.getUa.weixin){
					return $('.mask').fadeIn('fast');
				}
				else{
			        $('.fourth').on('tap', function () {
			        	$.ajax({
			                url:'/operation/share.do?shareId=126&channel=' + window.location.pathname.split('/')[4],
			                success: function () {
			                    app.call({
			                        action: 'share',
			                        params: [
			                            {
			                                name: 'shareString',
			                                value: JSON.stringify({
			                                    title: ($('input').val() ? $('input').val() : '我') + '包了个特殊的粽子给你，什么馅，绝对想不到！',
			                                    content: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
			                                    link: mak.getShareUrl(),
			                                    image: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
			                                    isEvent: 'true'
			                                })
			                            }
			                        ],
			                        callBack: function (headers) {}
			                    });
			                }
			            });
			        });
				}

			});
			$('.mask').on('tap', function () {
				$('.mask').fadeOut('fast');
			});
		    $.ajax({
		        url: '/operation/share.do?shareId=126&channel=signature'
		    })
		},
		refreshWX: function () {
			if(app.getUa.weixin){
				wxProtocol.init(function (wx, link) {
					wx.onMenuShareAppMessage({
				        title: ($('input').val() ? $('input').val() : '我') + '包了个特殊的粽子给你，什么馅，绝对想不到！',
				        desc: '看到这几款奇葩的粽子馅，小伙伴们再也无法淡定了！',
				        link: mak.getShareUrl(),
						imgUrl: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
				        success: function () {
				        	mak.postShare('showpage')
				        }
				    });
				    wx.onMenuShareTimeline({
				        title: ($('input').val() ? $('input').val() : '我') + '包了个特殊的粽子给你，什么馅，绝对想不到！',
				        link: mak.getShareUrl(),
						imgUrl: 'http://www.365rili.com/pages/bd/dragonboat/images/wx.jpg',
				        success: function () {
				        	mak.postShare('showpage')
				        }
				    });
				});
			}
		},
		getShareUrl: function () {
			var checkUndefined = function (o) {
				return Object.prototype.toString.call(o) == '[object Undefined]';
			}
			if(checkUndefined(_data.bambooSelected) || checkUndefined(_data.riceSelected) || checkUndefined(_data.fillingSelected)){
				return 'http://www.365rili.com/pages/bd/dragonboat/'+window.location.pathname.split('/')[4]+'/index.html';
			}

			var url = ['http://www.365rili.com/pages/bd/dragonboat/'+window.location.pathname.split('/')[4]+'/split.html'];

			url.push('?s1=' + _data.bambooSelected);
			url.push('&s2=' + _data.riceSelected);
			url.push('&s3=' + _data.fillingSelected);

			url.push('&s4=' + (function () {
				var zfy = $.trim($('textarea').val());

				zfy = zfy == '填写你对TA的祝福语\n懒得写？历姐给你备了滋味不同的5款留言，可以任性选一个。' ? '' : zfy;

				return zfy;
			})());

			url.push('&s5=' + $.trim($('input').val()));
			return url.join('');
		}
	};
	mak.init();
})();