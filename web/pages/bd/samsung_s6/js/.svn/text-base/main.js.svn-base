/**
 * samsung_s6
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2015-04-08 18:40:11
 */

(function () {
	var _data = {
		gifts: {
			1: {
				name: '三星 Galaxy S6 松珀绿',
				img: '/pages/bd/samsung_s6/images/s1.jpg'
			},
			2: {
				name: '三星 Galaxy S6 铂光金',
				img: '/pages/bd/samsung_s6/images/s2.jpg'
			},
			3: {
				name: '三星 Galaxy S6 冰玉蓝',
				img: '/pages/bd/samsung_s6/images/s3.jpg'
			}
		}
	};
	var s6 = window.s6 = {
		init: function () {
			//获取相关id
			var sid = _data.sid = s6.getURLParameter('shareId');
			_data.gid = s6.getURLParameter('giftid');


			if(sid){
				s6.getShareDetail(sid);
			}
			else{
				s6.getEventDetail();
			}
		},

		getShareDetail: function (sid) {
			$.ajax({
				url: 'http://www.365rili.com/operation/shareDetail.do?shareId=' + sid,
				dataType: 'json',
				success: s6.getDetailCallBack
			});
		},

		getEventDetail: function () {
			var url = 'http://www.365rili.com/operation/eventDetail.do?eventId=86';
			var getData = function (header) {
				header = header || {};
				$.ajax({
					url: url,
					headers: header,
					dataType: 'json',
					success: s6.getDetailCallBack
				})
			}
			if(app.getUa.weixin){
				getData();
			}
			else{
				s6.getTokenByCoco(url, getData);
			}
		},

		getDetailCallBack: function (data) {
			_data.detail = data;

			//标记状态
			var isSharePage = _data.isSharePage = !!_data.sid;
			var isGiftPage = _data.isGiftPage = !!_data.gid;
			var isListPage = _data.isListPage = !isSharePage && !isGiftPage;
			var isOwner = !!data.isOwner;
			var isLogin = _data.isLogin = !(data.state == 'not-login');
			var isShare = _data.isShare = isOwner || data.state == 'ok';

			//刷新giftId，不能提前，否则会影响当前是否单页的判断
			_data.gid = _data.gid || data.giftId;

			//如果存在错误，则直接跳转列表
			if(data.state == 'error'){
				window.location.href = "http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?isappinstalled=" + s6.getURLParameter('isappinstalled') + '&from=' + s6.getURLParameter('from');
			}

			//分享页 + 作者 = 显示自己的分享页
			if(isSharePage && isOwner){
				s6.showDetailByOwner();
			}

			//分享页 + 非作者 = 显示分享页
			else if(isSharePage && !isOwner){
				s6.showDetail();
			}

			//列表 + 已分享 = 显示自己的分享页
			else if(isListPage && isShare){
				s6.showDetailByOwner();
			}

			//列表 + 未分享 = 显示列表页
			else if(isListPage && !isShare){
				s6.showList();
			}

			//单页 ps:未登录无法进入该页，已登录已分享无法进入该页，只有已登录，未分享可以进入，所以无需做多余判断
			else if(isGiftPage){
				s6.showSingle();
			}


			//绑定微信分享
			app.getUa.weixin && s6.bindWeixinShare();
		},

		showDetail: function () {
			var gift = _data.gifts[_data.detail.giftId];
			var data = {
				name: gift.name,
				img: gift.img,
				count: _data.detail.count + '',
				isLike: _data.detail.isLike,
				owner: _data.detail.owner
			}
			var html = s6.template(s6.templateCode.detail, data, {
				isLike: function (o, p, d, i) {
					return o ? 'has' : '';
				}
			});
			$('.main').html(html);
			$('.my_play_btn')[0].href = "http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?isappinstalled=" + s6.getURLParameter('isappinstalled') + '&from=' + s6.getURLParameter('from');
			if(!_data.isLogin){
				return $('.score').on('click', function () {
					var url = 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?shareId=' + _data.sid;
					if(app.getUa.weixin){
						window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
					}
				});
			}
			if(!_data.detail.isLike){
				$('.score').on('click', s6.like);
			}
		},
		showDetailByOwner: function () {
			var gift = _data.gifts[_data.detail.giftId];
			var data = {
				name: gift.name,
				img: gift.img,
				count: _data.detail.count + ''
			};
			var html = s6.template(s6.templateCode.detailOwner, data, {
				isClient: function (o, p, d, i) {
					return app.getUa.weixin ? '' : 'display:none';
				}
			});

			$('.main').html(html);

			_data.isListPage = _data.isGiftPage = false;
			_data.isSharePage = true;
			_data.sid = _data.sid || _data.detail.shareId;

			//微信下显示下载
			app.getUa.weixin && $('.down_txt').on('click', s6.down);

			if(!app.getUa.weixin){
				s6.showTop();
			}
		},
		showList: function () {
			var box = $('.main');
			box.html(s6.templateCode.list);
			box.on('click', 'a', function () {
				var gid = $(this).attr('data-giftid');
				if(!_data.isLogin){
					s6.login(gid);
				}
				else{
					_data.isListPage = _data.isSharePage = false;
					_data.isGiftPage = true;
					_data.gid = gid;

					//刷新微信分享
					app.getUa.weixin && s6.bindWeixinShare();

					s6.showSingle();
				}
			});
		},
		showSingle: function () {
			var html = s6.template(s6.templateCode.single, _data.gifts[_data.gid]);
			$('.main').html(html);

			//微信下显示下载
			app.getUa.weixin && $('.down_txt').on('click', s6.down);

			//我要玩
			$('.control').on('click', s6.play);
		},

		showTop: function () {
			_data.detail.top.sort(function (x, y) {
				return y.count - x.count;
			})

			var html = s6.template('<li><span>{$count}</span>{$index}、{$nick}</li>', _data.detail.top, {
				index: function (o, p, d, i) {
					return i + 1;
				},
				count: function (o, p, d, i) {
					return o ? o : 0;
				}
			})

			var box = $('\
				<div class="score_list_div">\
					<div class="score_list_img"></div>\
					<div class="rull" style="text-align:center">第1-3名可获得三星S6一部<br />第4-50名可获得价值199元的礼品一份<br />第51-100名可获得价值99元礼品一份</div>\
					<div class="my_list_num">您的当前排名：' + _data.detail.rank + '</div>\
					<div class="score_list">\
						<h3>--当前排行总榜--</h3>\
						<ul>' + html + '</ul>\
					</div>\
				</div>').appendTo('.main');

			$('.control').on('click', s6.play);
		},

		down: function () {
			var url = 'http://www.365rili.com/operation/like.do?shareId=-1';
			var tongjidown = function (header) {
				$.ajax({
					url:url,
					headers: header,
					complete: function () {
						app.open('coco://365rili.com',app.getUa.ios,null);
					}
				});
			}

			if(app.getUa.weixin){
				tongjidown({});
			}
			else{
				s6.getTokenByCoco(url, tongjidown);
			}
		},

		like: function () {
			$.ajax({
				url: 'http://www.365rili.com/operation/like.do?shareId=' + _data.sid,
				dataType: 'json',
				success: function (data) {
					if(data.state == 'ok'){
						var scoreBox = $('.score span');
						scoreBox.html(+scoreBox.html() + 1);
						$('.score').addClass('has');
						return _data.detail.isLike = true;
					}
					$('.score').on('click', s6.like);
				}
			});
			$('.score').off('click');
		},

		play: function () {
			if(app.getUa.weixin){
				// s6.shareInWeixin();
			}
			else{
				s6.shareInApp();
			}
			return false;
		},

		shareInApp: function () {
			s6.tongji();
			$.ajax({
                url:'http://www.365rili.com/tmpmessage/shared.do',
                data:{
                    id: '42',
                    target: 'samsung_s6'
                },
                success: function (datas) {
                    if(datas.state != 'ok'){
                        return false;
                    }
                    var url = 'http://www.365rili.com/operation/shareCallback.do?shareId=' + _data.detail.shareId + '&giftId=' + _data.gid;
					s6.getTokenByCoco(url, function (header) {
						//单页，生成订单
						if(_data.isSharePage){
							return $.ajax({
								headers: header,
								url: url,
								success: function () {
									app.call({
				                        action: 'share',
				                        params: [
				                            {
				                                name: 'shareString',
							        			value: JSON.stringify({
							        				title: '帮['+ _data.detail.owner +']赢取三星S6，是朋友点击进来给TA红心！',
							        				content: '颜值高+0.7秒相机启动+内置365日历精彩活动，365任性送S6，戳就有！',
							        				link: 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?shareId=' + _data.detail.shareId,
							        				image: 'http://www.365rili.com/pages/bd/samsung_s6/images/wx.jpg',
							        				isEvent: 'true'
							        			})
				                            }
				                        ],
				                        callBack: function (headers) {}
				                    });
								}
							});
						}
						$.ajax({
							headers: header,
							url: url,
							success: function () {
								app.call({
			                        action: 'share',
			                        params: [
			                            {
			                                name: 'shareString',
						        			value: JSON.stringify({
						        				title: '365日历要送我三星S6，是朋友点击进来给我红心！',
						        				content: '颜值高+0.7秒相机启动+内置365日历精彩活动，365任性送S6，戳就有！',
						        				link: 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?shareId=' + _data.detail.shareId,
						        				image: 'http://www.365rili.com/pages/bd/samsung_s6/images/wx.jpg',
						        				isEvent: 'true'
						        			})
			                            }
			                        ],
			                        callBack: function (headers) {}
			                    });
							}
						});
					});
                },
                error: function () {

                }
            });
		},

		shareInWeixin: function () {
			$('.share_bg').fadeIn('fast').on('click', function () {
				$(this).fadeOut('fast');
			});
		},

		bindWeixinShare: function () {
			//生成分享内容

			//列表页
			if(_data.isListPage){
				_data.shareObject = {
					title: '365日历任性送,想要三星S6？戳一下就有啦！',
					desc: '颜值高+0.7秒相机启动+内置365日历精彩活动，365任性送S6，戳就有！',
					link: 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html',
					imgUrl: 'http://www.365rili.com/pages/bd/samsung_s6/images/wx.jpg',
					success: s6.tongji
				};
			}

			//分享页，显示他人分享
			if(_data.isSharePage){
				_data.shareObject = {
					title: '[' + _data.detail.owner + ']选择了' + _data.gifts[_data.gid].name + '，送TA红心帮TA赢到吧!',
					desc: '颜值高+0.7秒相机启动+内置365日历精彩活动，365任性送S6，戳就有！',
					link: 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?shareId=' + _data.sid,
					imgUrl: 'http://www.365rili.com/pages/bd/samsung_s6/images/wx.jpg',
					success: s6.tongji
				};
			}

			//单页，生成订单
			if(_data.isGiftPage){
				_data.shareObject = {
					title: '帮['+ _data.detail.owner +']赢取三星S6，是朋友点击进来给TA红心！',
					desc: '颜值高+0.7秒相机启动+内置365日历精彩活动，365任性送S6，戳就有！',
					link: 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?shareId=' + _data.detail.shareId,
					imgUrl: 'http://www.365rili.com/pages/bd/samsung_s6/images/wx.jpg',
					success: s6.createZ
				};
			}
			wxProtocol.init(function () {
				wx.onMenuShareAppMessage(_data.shareObject);
			    wx.onMenuShareTimeline(_data.shareObject);
			});
		},

		tongji: function () {
			var url = 'http://www.365rili.com/operation/like.do?shareId=-2';
			var fn = function (header) {
				$.ajax({
					url:url,
					headers: header
				});
			}
			if(app.getUa.weixin){
				fn({});
			}
			else{
				s6.getTokenByCoco(url, fn);
			}
		},

		createZ: function () {
			_data.isShare || (function () {
				var url = 'http://www.365rili.com/operation/shareCallback.do?shareId=' + _data.detail.shareId + '&giftId=' + _data.gid;
				$.ajax({
					url: url,
					success: function () {
						$.ajax({
							url:'/operation/like.do?shareId=-2',
							success: function () {
								window.location.reload();
								_data.isShare = true;
							}
						});
					}
				});
			})();
		},

		login: function (gid) {
			var url = 'http://www.365rili.com/pages/bd/samsung_s6/weixin/list.html?giftid=' + gid;
			if(app.getUa.weixin){
				window.location.href = "/wx/login.do?redURL=" + encodeURIComponent(url);
			}
			else{
				$('.main').html(s6.template(s6.templateCode.noLogin, _data.gifts[gid]));
			}
		},

		/**
		 * 模板代码
		 */
		
		templateCode: {
			noLogin: '\
				<div class="noLogin">\
					<div class="txt">你选择了{$name}</div>\
					<div class="noLogin_img">\
						<img src="{$img}">\
					</div>\
					<div class="noLogin_txt">\
						亲，你还未登录365日历哦<br/>\
						不登陆我们无法通知您是否中奖哦<br/>\
						快登录参与活动吧！\
					</div>\
				</div>',
			list:'\
				<div class="list_div">\
					<div class="main_img">\
						<img src="/pages/bd/samsung_s6/images/list_img.jpg" alt="">\
					</div>\
					<div class="txt">— 如下三色S6，选你所爱365日历送给你！—</div>\
					<div class="p list">\
						<a data-giftid="1" href="javascript:;"><img src="/pages/bd/samsung_s6/images/list_img1.jpg" alt=""></a>\
						<a data-giftid="2" href="javascript:;"><img src="/pages/bd/samsung_s6/images/list_img2.jpg" alt=""></a>\
						<a data-giftid="3" href="javascript:;"><img src="/pages/bd/samsung_s6/images/list_img3.jpg" alt=""></a>\
					</div>\
				</div>',
			single: '\
				<div class="play_div">\
					<div class="txt">你选择了{$name}</div>\
					<div class="p info">\
						<img src="{$img}">\
					</div>\
					<div class="other_txt">我获得的红心</div>\
					<a href="javascript:;" class="control" style="background-image:url(/pages/bd/samsung_s6/images/score1.png)" ><span>0</span></a>\
					<div class="message">\
						<img src="/pages/bd/samsung_s6/images/massage.png" alt="">\
					</div>\
				</div>',
			detail: '\
				<div class="other_div">\
					<div class="txt">[{$owner}]选择了{$name}<br>送TA红心帮TA赢到吧!</div>\
					<div class="p info">\
						<img src="{$img}">\
					</div>\
					<div class="other_txt" style="display:none;">快给Ta红心，帮他得到这个手机</div>\
					<a href="javascript:;" class="score {$isLike}"><span>{$count}</span></a>\
					<a href="javascript:;" class="my_play_btn"></a>\
					<div class="message" style="display: none;">\
						<img src="/pages/bd/samsung_s6/images/massage.png" alt="">\
					</div>\
				</div>',
			detailOwner: '\
				<div class="my_div">\
					<div class="txt">你选择了{$name}</div>\
					<div class="p info">\
						<img src="{$img}">\
					</div>\
					<div class="my_txt">我获得红心</div>\
					<a href="javascript:;" class="control"><span>{$count}</span></a>\
					<a class="down_txt" href="javascript:;" style="{$isClient}">下载365日历即可查看最新排名信息</a>\
					<div class="message" style="display: none;">\
						<img src="/pages/bd/samsung_s6/images/massage.png" alt="">\
					</div>\
				</div>'
		},

		/**
		 * 以下函数与业务无关
		 */

		getURLParameter: function(name, href) {
	        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
	        href = href || location.href;
	        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	        return ""
	    },

		getTokenByCoco: function (url, callBack) {
			try{
				app.call({
					action: 'getEncryptHeaders',
					params: [
						{
							name: 'url',
							value: url
						}
					],
					callback: function (headers) {
						headers = JSON.parse(headers);
						callBack(headers);
					}
				});
			}
			catch(e){
				try{
					app.call({
						action: 'getToken',
						callBack: function (token) {
							var headers = {
								'x-365rili-key': token
							};
							callBack(headers);
						}
					});
				}
				catch(e){}
			}
		},
		copyTo: function (ce, e) {
		    for (var i in ce) {
		        if (typeof i === 'undefined') continue;
		        if (typeof ce[i] == 'object') {
		            e[i] = {};
		            if (ce[i] instanceof Array) e[i] = [];
		            s6.copyTo(ce[i], e[i]);
		            continue;
		        }
		        e[i] = ce[i];
		    }
		},
		apply: function (object, config, defaults) {
		    if (defaults) {
		        s6.apply(object, defaults);
		    }
		    if (object && config && typeof config === 'object') {
		        var i, j;

		        for (i in config) {
		            object[i] = config[i];
		        }
		    }

		    return object
		},
		typeOf: function (o) {
		    return /^\[object (.*)\]$/.exec(Object.prototype.toString.call(o).toLowerCase())[1];
		},
		template: function (s,o,defaults, index) {
			index = index || 0;
		    if(s6.typeOf(s) === 'undefined' || s6.typeOf(o) === 'undefined') return '';
		    var _html = [];
		    defaults = defaults || {};
		    if(s6.typeOf(o) === 'array'){
		        for (var i = 0, len = o.length; i < len; i++) {
		            _html.push(s6.template(s, o[i], defaults, i));
		        };
		    }else{
		        var __o = {};
		        s6.copyTo(o, __o);
		        s6.apply(__o, defaults);
		        _html.push(s.replace(/\{\$([^}]*)\}/g, function(_,_o){
		            return s6.typeOf(__o[_o]) === 'function' ? __o[_o](o[_o], o, __o, index) : (o[_o] || __o[_o] || '');
		        }));
		    }
		    return _html.join('');
		}
	};
	s6.init();
})();