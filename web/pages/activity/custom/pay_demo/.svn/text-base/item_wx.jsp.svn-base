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
<script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
<script src="/share/js/weixin_1.0.js"></script>
<script type="text/javascript">
    var xheader = {};
    var G = {};
    var token;
    var isAndroid;
    if (/android/i.test(navigator.userAgent)) {
    		token = AliansBridge.getToken();
        xheader["x-365rili-key"] = token;
        isAndroid = true;
    } else {
    	isAndroid = false;
    }

	function payAll() {
        $.ajax({
            url: "/event/payDemo/createOrder.do?eventId=<%=eventId%>&count=1",
			headers : xheader,
			success : function(data) {
				if (data.state == "ok") {
					prepay(data.payOrderId);
				} else {
					alert("创建订单失败");
				}
			}
		});
	}

	function prepay(payOrderId) {
         $.ajax({
             url : "/tenpay/webPrepay.do?payOrderId=" + payOrderId,
             headers : xheader,
             success : function(data) {
                 if (data.state == "ok") {
                	 G.tenpayOrderInfo = data;
                	 jsApiCall();	 
                 } else {
                     alert(data);
                 }
             }
         });
	}
	
	//调用微信JS api 支付
	function jsApiCall()
	{
		 wx.chooseWXPay({
			    timestamp: G.tenpayOrderInfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
			    nonceStr: G.tenpayOrderInfo.nonceStr, // 支付签名随机串，不长于 32 位
			    package: G.tenpayOrderInfo.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
			    signType: G.tenpayOrderInfo.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
			    paySign: G.tenpayOrderInfo.paySign, // 支付签名
			    success: function (res) {
			        // 支付成功后的回调函数
			    	alert(res.err_code+res.err_desc+res.err_msg);
			    }
			});
		 
		 
	}

	function callpay()
	{
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

  	function setToken(t){
		token = t;
        xheader["x-365rili-key"] = token;
	}
</script>
</html>
