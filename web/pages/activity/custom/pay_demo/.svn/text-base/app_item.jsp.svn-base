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
<script type="text/javascript">
    var xheader = {};
    var G = {};
    var header;
    var isAndroid;
    var payOrderId;
    if (/android/i.test(navigator.userAgent)) {
        isAndroid = true;
    } else {
    	isAndroid = false;
    }
    
    function getReqHeaders(url) {
    	if(isAndroid) {
    		return JSON.parse(AliansBridge.getEncryptHeaders(url));
    	} 
    	return null;
    }

	function payAll() {
		var reqUrl = "/event/payDemo/createOrder.do?eventId=<%=eventId%>&count=1";
        $.ajax({
            url: reqUrl,
			headers : getReqHeaders(reqUrl),
			success : function(data) {
				if (data.state == "ok") {
					payOrderId = data.payOrderId;
					prepay(data.payOrderId);
				} else {
					alert("创建订单失败");
				}
			}
		});
	}

	function prepay(payOrderId) {
		var reqUrl = "/tenpay/prepay.do?payOrderId=" + payOrderId;
        $.ajax({
            url : reqUrl,
            headers : getReqHeaders(reqUrl),
            success : function(data) {
                if (data.state == "ok") {
               	 if (isAndroid) {
                     AliansBridge.nativeTenpay(JSON.stringify(data), payOrderId);
               	 } else {
               		 G.tenpayOrderInfo = JSON.stringify(data);
               		 window.location.href = "cocoinapp://tenpay";
               	 }
                } else {
                    alert(data.msg);
                }
            }
        });
	}
  	
  	function getPayResult() {
  		var reqUrl = "/tenpay/payResult.do?payOrderId=" + payOrderId;
  		$.ajax({
  			url : reqUrl,
            headers : getReqHeaders(reqUrl),
            success : function(data) {
                if (data.state == "ok") {
					window.location.href = data.jumpUrl;
                } else {
                    alert("支付失败");
                }
            }

  		});
  	}
</script>
</html>
