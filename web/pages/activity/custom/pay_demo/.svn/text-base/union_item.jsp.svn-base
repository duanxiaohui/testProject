<%@ page contentType="text/html;charset=utf-8"%>
<%
	long eventId = (Long) request.getAttribute("eventId");
%>
<!DOCTYPE html>
<html>
<head>
<title>支付demo购买页</title>
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta id="viewport" name="viewport"
	content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
</head>
<body>
	购票数量：1 总价格：0.01元
	<button onclick="payAll()">使用微信支付</button>
</body>
<script src="/js/lib/zepto.min.js"></script>
<script src="http://www.365rili.com/js/lib/app.js"></script>
<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
<script src="/share/js/weixin_1.0.js"></script>
<script type="text/javascript">
	var G = {};
	var callType;
	var payOrderId;
	var isAndroid = false;
	
	if (app.getUa.androidCoco) {
		callType = "android";
	} else if(app.getUa.weixin) {
		callType = "wechat";
	} else {
		callType = "other";
	}
	if (app.getUa.android) {
    	isAndroid = true;
	}
	
	function payAll() {
	    var url = 'http://www.365rili.com/event/payDemo/createOrder.do';
	    getTokenByCoco(url, function (header) {
	        $.ajax({
	            url: url,
	            headers : header,
	            type:"post",
	            data:{
	                eventId:'<%=eventId%>',
					count : 1
				},
				success : function(data) {
					if (data.state == "ok") {
						payOrderId = data.payOrderId;
						prepay(data.payOrderId);
					} else {
						alert("创建订单失败");
					}
				}
			});
		});
	}
	
	function prepay(payOrderId) {
		var url = 'http://www.365rili.com/tenpay/' + (callType == "wechat" ? 'webPrepay' : 'prepay') + '.do';
		getTokenByCoco(url, function(header) {
			$.ajax({
				url : url,
				headers : header,
				type : 'post',
				data : {
					payOrderId : payOrderId
				},
				success : function(data) {
					if (data.state == "ok") {
						if (callType == "android") {
							AliansBridge.nativeTenpay(JSON.stringify(data),
									payOrderId);
						} else if(callType == "wechat") {
							G.tenpayOrderInfo = data;
							jsApiCall();
						} else {
							data.payorderid = payOrderId;
							G.tenpayOrderInfo = JSON.stringify(data);
							window.location.href = "cocoinapp://tenpay";
						}
					} else {
						alert(data.msg);
					}
				}
			});
		});
	}
	
	//发起查询支付结果
	function getPayResult() {
		var url = "http://www.365rili.com/tenpay/" + (callType == "wechat" ? "webPayResult" : "payResult") + ".do";
		getTokenByCoco(url, function(header) {
			$.ajax({
				url : url,
				headers : header,
				type: 'post',
				data : {
					payOrderId : payOrderId
				},
				success : function(data) {
					if (data.state == "ok") {
						window.location.href = data.jumpUrl;
					} else {
						alert("支付失败");
					}
				}
	
			});
		});
	}

	//调用微信JS api 支付
	function jsApiCall() {
		 wx.chooseWXPay({
			 timestamp: G.tenpayOrderInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			 nonceStr: G.tenpayOrderInfo.nonceStr, // 支付签名随机串，不长于 32 位
			 package: G.tenpayOrderInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			 signType: G.tenpayOrderInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			 paySign: G.tenpayOrderInfo.paySign, // 支付签名
			 success: function (res) {
				 // 支付成功后的回调函数
				 alert(JSON.stringify(res));
				 getPayResult();
			 }
		 });
	}

	function callpay() {
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    jsApiCall();
		}
	}

	function getTokenByCoco(url, callBack) {
		if(!isAndroid && callType == "wechat") {
			callBack({});
			return;
		}
		var mar = setTimeout(function() {
			try {
				var t = '';
				var tSource = (new Base64()).decode(t);
				if (tSource.indexOf('%') == -1) {
					callBack({
						'Authorization' : 'Basic ' + t
					});
				} else {
					callBack({
						'x-365rili-key' : t
					});
				}
			} catch (e) {
				callBack({});
			} 
		}, 500); 
		
		try {
			app.call({
				action : 'getEncryptHeaders',
				params : [ {
					name : 'url',
					value : url
				} ],
				callback : function(headers) {
					try {
						clearTimeout(mar);
					} catch (e) {
					}
					headers = JSON.parse(headers);
					callBack(headers);
				}
			});
		} catch (e) {
			try {
				app.call({
					action : 'getToken',
					callBack : function(token) {
						try {
							clearTimeout(mar);
						} catch (e) {
						}
						var headers = {
							'x-365rili-key' : token
						};
						callBack(headers);
					}
				});
			} catch (e) {
				
			}
		}
	}

</script>
</html>
