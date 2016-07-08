<%@ page contentType="text/html;charset=utf-8"%>
<%
    String pageTitle = (String)request.getAttribute("pageTitle");
	String[] rules = (String[])request.getAttribute("rules");
	String bgImg = (String)request.getAttribute("bgImg");
	String prizeName = (String)request.getAttribute("prizeName");
	String lotteryBtnName = (String)request.getAttribute("lotteryBtnName");
	long eventId = (Long)request.getAttribute("eventId");
	boolean isInDate = (Boolean)request.getAttribute("isInDate");
	String eventDetail = (String)request.getAttribute("eventDetail");
	eventDetail = eventDetail.replace("\n", "\\\n");
%>
<!DOCTYPE html>
<html>
<head>
<title><%=pageTitle%></title>
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta id="viewport" name="viewport"
	content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<style type="text/css">
	body {color: #444; font: 12px / 1.5em "Hiragino Sans GB","Microsoft YaHei", 微软雅黑,SimSun,arial; margin: 0; padding: 0; }
</style>
<link rel="stylesheet" type="text/css"
	href="/pages/activity/common/lottery/css/main.css"
	media="screen" />
<link rel="apple-touch-startup-image" href="launch6.png" media="(d)">
<link rel="apple-touch-startup-image" href="launch6plus.png" media="">
<link rel="stylesheet"
	href="/js/lib/gmu/assets/widget/dialog/dialog.css">
<link rel="stylesheet"
	href="/js/lib/gmu/assets/widget/dialog/dialog.iOS7.css">
<script>
	if (location.href.indexOf('&isjumped=true') == -1
			&& navigator.userAgent.toLowerCase().match(/micromessenger/i) != "micromessenger") {
		var url = location.href;
		location.href = [
				"coco://365rili.com/jumpEvent",
				"?title=",
				encodeURIComponent("<%=pageTitle%>"),
				"&url=",
				encodeURIComponent(url.substr(7, url.length) + '&isjumped=true') ]
				.join('');
	}
</script>
</head>

<body>
	<div class="main">
		<div class="imgTops">
			<img src="<%=bgImg %>" alt=""/>
		</div>
		<div class="move_box none">
			<%if(isInDate) { %>
			<h3>验证手机号<%=lotteryBtnName %>！</h3>
			<div class="input_box">
				<div class="mobile_box e_clear">
					<a href="javascript:;" class="btn" id="js-checkcellphone">发送验证码</a>
					<input type="tel" id="cphone" name="cellphone"
						placeholder="给手机号发送验证码" />
				</div>
				<div class="code_box">
					<input type="text" id="code" name="verifyCode" placeholder="输入验证码" />
				</div>
			</div>
			<div id="js-phoneTip">
				<p>验证码已发送，没收到短信？</p>
				<p>请确认后重新输入手机号</p>
			</div>
			<a href="javascript:;" id="js-grabbing" class="grabbing_ticket"><%=lotteryBtnName %></a>
			
			<%} else { %>
			<h3>现在不是活动时段哦:）</h3>
			<%} %>
		</div>
		
		<div class="snag none">
			<h3>恭喜你！抢到手啦！</h3>
			<div class="ticket_num"></div>
			<div class="repeat_send">
				<p>奖品信息已短信发送。</p>
				<p>
					没有收到短信？<a href="javascript:;" id="js-sendagine">点我再次发送</a>
				</p>
			</div>
			<div class="rules">
				<h3>【活动须知】</h3>
				<%
					for (String rule : rules) {
				%>
				<p><%=rule %></p>
				<%
					}
				%>
			</div>
		</div>
		<div class="nsnag none">
			<div class="nsnag_bg">
				<p>很遗憾，这次没抢到哦:(</p>
				<p>让小伙伴来试试手气吧！</p>
			</div>
			<a href="javascript:;" id="js-share" class="grabbing_ticket">分享给小伙伴</a>
		</div>
	</div>
	<script src="/js/lib/zepto.min.js"></script>
	<script src="/js/lib/gmu/gmu.js"></script>
	<script src="/js/lib/app.js"></script>
	<script type="text/javascript">
		(function() {
			app.call({
				action: 'howToBack',
				params: [{
					name: 'how',
					value: 'quit'
				}],
				callback: function() {}
			});
			function getTokenByCoco (url, callBack) {
				
				if(app.getUa.weixin) { //微信中支持
					callBack({});
					return;
				}
				var mar = setTimeout(function () {
					var t = token
					var tSource = (new Base64()).decode(t);  
					if(tSource.indexOf('%') == -1){
						callBack({
							'Authorization': 'Basic ' + token
						});
					}
					else{
						callBack({
							'x-365rili-key': token
						});
					}
				}, 500);
				try{
					app.call({
						action: 'getEncryptHeaders',
						params: [
							{
								name: 'url',
								value: url
							}
						],
						callBack: function (headers) {
							try{
								clearTimeout(mar)
							}
							catch(e){};
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
								try{
									clearTimeout(mar)
								}
								catch(e){};
								var headers = {
									'x-365rili-key': token
								};
								callBack(headers);
							}
						});
					}
					catch(e){}
				}
			}
			function getTokenByAndroid (url) {
				var headers = '';
				if(app.getUa.android){
					try{
						headers = JSON.parse(AliansBridge.getEncryptHeaders(url));
					}
					catch(e){
						try{
							headers = {
								'x-365rili-key': AliansBridge.getToken()
							};
						}
						catch(e){
							headers = {};
						}
					}
				}
				else{
					if(token){
						headers = {
							'x-365rili-key': token
						}
					}
					else{
						headers = {};
					}
				}
				return headers;
			}
			
			function init() {
				try{
					clearTimeout(marInit)
				}
				catch(e){};
				var url = 'http://www.365rili.com/event/commonLottery/result.do';
				if(app.getUa.weixin){
					$.ajax({
						url : url,
						type : 'post',
						dataType : 'json',
						data : {
							eventId : <%=eventId %>
						},
						success : function(data) {
							if (data.state == 'failed') {
								_alert('您的网络不太稳定，请重新访问');
							}
							switch (data.status) {
							case 0:
								status1();
								break;
							case 1:
								status2(data['code']);
								break;
							case 2:
								status3();
								break;
							}
						},
						error : function() {
							_alert('您的网络不太稳定，请重新访问');
						}
					});
				}
				getTokenByCoco(url, function (headers) {
					$.ajax({
						url : url,
						type : 'post',
						dataType : 'json',
						headers : headers,
						data : {
							eventId : <%=eventId %>
						},
						success : function(data) {
							if (data.state == 'failed') {
								_alert('您的网络不太稳定，请重新访问');
							}
							switch (data.status) {
							case 0:
								status1();
								break;
							case 1:
								status2(data['code']);
								break;
							case 2:
								status3();
								break;
							}
						},
						error : function() {
							_alert('您的网络不太稳定，请重新访问');
						}
					});
				});
			}

			var mar = null;
			function goClock() {
				try{
					clearTimeout(mar)
				}
				catch(e){};
				var _btn = $('#js-checkcellphone');
				var _num = +_btn.html();
				_btn.html(--_num);

				if (_num > 0) {
					mar = setTimeout(goClock, 1000);
				} else {
					_btn.html('发送验证码').removeClass('goclock').on('click',
							checkPhone);
				}
			}

			function checkPhone() {
				var _input = $('#cphone');
				var _val = _input.val();
				if (_val == ''
						|| !/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
								.test(_val)) {
					var timer = setTimeout(function(){
						_alert("请输入正确格式的手机号码", function() {
							clearTimeout(timer);
							_input.val('');
							_input.focus();
						});
					}, 300);
					
					return false;
				}
				$('#js-checkcellphone').off('click').addClass('goclock');
				var url = 'http://www.365rili.com/event/commonLottery/sendVerifyCode.do';
				getTokenByCoco(url, function (headers) {
					$.ajax({
						url : url,
						type : 'post',
						dataType : 'json',
						headers : headers,
						data : {
							cellphone : _val,
							eventId : <%=eventId %>
						},
						success : function(data) {
							if (data.state == 'failed') {
								$('#js-checkcellphone').on('click', checkPhone)
										.removeClass('goclock');
								_alert('验证码发送失败，请重试');
							} else if (data.status == 1) {
								$('#js-checkcellphone').on('click', checkPhone)
										.removeClass('goclock');
								_alert('该手机号码已使用');
							} else {
								$('#js-checkcellphone').html('60');
								$('#js-phoneTip').show();
								goClock();
							}
						},
						error : function() {
							$('#js-checkcellphone').on('click', checkPhone)
									.removeClass('goclock');
							_alert('验证码发送失败，请重试');
						}
					});
				});
			}

			function grabbing() {
				var _inputMobile = $('#cphone');
				var _valMobile = _inputMobile.val();
				if (_valMobile == ''
						|| !/((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
								.test(_valMobile)) {
					
					var timer = setTimeout(function(){
						_alert("请输入正确格式的手机号码", function() {
							clearTimeout(timer);
							_inputMobile.val('');
							_inputMobile.focus();
						});
					}, 300);
					
					return false;
				}
				
				var _input = $('#code');
				var _val = _input.val();
				if (_val == '' || !/^[0-9]*$/.test(_val)) {
					var timer = setTimeout(function() {
						_alert("请正确输入验证码", function() {
							clearTimeout(timer);
							_input.val('');
							_input.focus();
						});
					}, 300);
					return false;
				}

				$(this).off('click').addClass('goclock');
				var _this = this;
				var url = 'http://www.365rili.com/event/commonLottery/lottery.do';
				getTokenByCoco(url, function (headers) {
					$.ajax({
						url : url,
						type : 'post',
						dataType : 'json',
						headers : headers,
						data : {
							verifyCode : _val,
							eventId : <%=eventId %>
						},
						success : function(data) {
							if (data.state == 'failed') {
								$(this).removeClass('goclock')
										.on('click', grabbing);
								_alert('您的网络不太稳定，请重新访问');
							} else {
								switch (data.status) {
								case 1:
									$('.move_box').addClass('none');
									status2(data['code']);
									break;
								case 2:
									$('.move_box').addClass('none');
									status3();
									break;
								case 3:
									$(_this).removeClass('goclock').on('click',
											grabbing);
									_alert('您输入的验证码有误');
									break;
								default:
									$(_this).removeClass('goclock').on('click',
											grabbing);
									_alert(data.msg);
									break;
								}
							}
						},
						error : function() {
							$(this).removeClass('goclock').on('click', grabbing);
							_alert('您的网络不太稳定，请重新访问');
						}
					});
				});
			}

			var mar1 = null;
			function goClock1() {
				clearTimeout(mar1);
				var _btn = $('#js-sendagine');
				var _num = +_btn.html().split(' ')[0];
				_btn.html(--_num + ' 秒后可重新发送');

				if (_num > 0) {
					mar1 = setTimeout(goClock1, 1000);
				} else {
					_btn.html('点我再次发送').css('color', '#208de9').on('click', send);
				}
			}

			function send() {
				$('#js-sendagine').off('click').css('color', '#999');
				var url = 'http://www.365rili.com/event/commonLottery/sendPrize.do';
				getTokenByCoco(url, function (headers) {
					$.ajax({
						url : url,
						type : 'post',
						dataType : 'json',
						headers : headers,
						data : {
							eventId : <%=eventId%>	
						},
						success : function(data) {
							if (data.state == 'failed') {
								$('#js-sendagine').on('click', send).css('color',
										'#208de9');
								_alert('您的网络不太稳定，请重新访问');
							} else {
								$('#js-sendagine').html('60 秒后可重新发送');
								_alert('信息已发送至您手机');
								goClock1();
							}
						},
						error : function() {
							$('#js-sendagine').on('click', send).css('color',
									'#208de9');
							_alert('您的网络不太稳定，请重新访问');
						}
					});
				});
			}

			function status1() {
				$('.move_box').removeClass('none');
				$('#js-checkcellphone').on('click', checkPhone);
				$('#js-grabbing').on('click', grabbing);
			}

			function status2(ticNum) {
				$('.snag').removeClass('none');
				var html = '';
				
				if(ticNum.indexOf("\n") >= 0) {
					//ticNum = ticNum.replace(/\n/g, ",");
					ticAry = ticNum.split(/\n/g);
					html = '<p><span><%=prizeName%>：</span></p>';
					for(var i = 0; i < ticAry.length; i++) {
						html += '<p>' + ticAry[i] + '</p>';
					}
				} else {
					html = '<p><span><%=prizeName%>：</span>' + ticNum + '</p>';
				}
				
				$('.ticket_num')
						.html(html);
				$('#js-sendagine').on('click', send);
			}

			function status3() {
				$('.nsnag').removeClass('none');
				if(app.getUa.weixin) {
					$('#js-share').hide();
				} else {
					$('#js-share').on('click', shareLottery);
				}
			}
			
			function shareLottery() {
				app.call({
                    action: 'share',
                    params: [
                        {
                            name: 'shareString',
		        			value: JSON.stringify({
		        				title: "<%=pageTitle%>",
		        				content: '<%=eventDetail %>',
		        				link: 'http://www.365rili.com/event/shared.do?id=<%=eventId%>',
		        				image: '<%=bgImg%>',
		        				isEvent: 'true'
		        			})
                        }
                    ],
                    callBack: function (headers) {}
                });
			}

			var token = null;
			window.setToken = function(t) {
				token = t;
				init();
			};

			if (app.getUa.android) {
				if (typeof AliansBridge != "undefined") {
					init();
				}
			}
			window.marInit = setTimeout(function () {
				init();
			}, 500);
			//如果不是在手机客户端内
			if (navigator.userAgent.toLowerCase().match(/micromessenger/i) == "micromessenger") {
				init();
			}
			window._alert = function() {
				var txt = arguments[0];
				var callback;
				if(typeof arguments[1] != 'undefined') {
					callback = arguments[1];
				}
				$(document.body).dialog({
					title : '提示',
					content : txt,
					closeBtn : false,
					width : 270,
					buttons : {
						'好' : function() {
							this.close().destroy();
						}
					},
					close: callback
				});
			}
		})();
	</script>
</body>

</html>
