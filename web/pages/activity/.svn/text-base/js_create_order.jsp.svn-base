<%@ page contentType="text/html;charset=utf-8" %>
<%
	long eventId = (Long)request.getAttribute("eventId");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title></title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
<script src="/js/lib/zepto.min.js"></script>
<script src="/js/lib/gmu/gmu.js"></script>
<script src="http://www.365rili.com/js/lib/app.js"></script>
<meta id="viewport" name="viewport"
	content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
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
				encodeURIComponent('参加活动'),
				"&url=",
				encodeURIComponent(url.substr(7, url.length) + '&isjumped=true') ]
				.join('');
	}
</script>
</head>
<body>
    
    <script>
    	var token;
		function setToken(t){
			token = t;
		}
		function getTokenByCoco (url, callBack) {
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
		if(app.getUa.weixin){
			$.ajax({
				url: "/event/createOrder.do?eventId=" + <%=eventId%>,
				type: "GET",
				dataType: "json",
				success: function(data){
					if(data.state == "ok"){
						var url   = ["http://", location.host, "/event/orderDetail.do?orderId=", data.id].join('');
						location.href = url;
					}else{
						if(data.msg){
							_alert('创建订单失败:' + data.msg);
						}else if(data.state == "wrongpass"){
							_alert('创建订单失败:用户未登录');
						}else{
							_alert('创建订单失败');					
						}
					}
				}
			})
		}
		else{
			var title = "订单详情";
			var url, headers;
			url = "http://www.365rili.com/event/createOrder.do";
			getTokenByCoco(url, function (headers) {
				$.ajax({
					url: url,
					type: "POST",
					dataType: "json",
					data:{
						eventId:'<%=eventId%>'
					},
					headers: headers,
					success: function(data){
						if(data.state == "ok"){
							var url   = [location.host, "/event/orderDetail.do?orderId=", data.id].join('');
							location.href = ["coco://365rili.com/jumpEvent", "?title=", encodeURIComponent(title), "&url=", encodeURIComponent(url)].join('');
						}else{
							if(data.msg){
								_alert('创建订单失败:' + data.msg, function() {
									if (app.getUa.android) {
										AliansBridge.back();
									} else {
										location.href = "cocoinapp://back";
									}
								});
							}else{
								_alert('创建订单失败', function() {
									if (app.getUa.android) {
										AliansBridge.back();
									} else {
										location.href = "cocoinapp://back";
									}
								});
							}
						}
					}
				})
			});
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
    </script>
</body>
</html>