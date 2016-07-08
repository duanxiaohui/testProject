<%@ page contentType="text/html;charset=utf-8" %>
<%
	int count = (Integer)request.getAttribute("count");
	String totalFeeStr = (String)request.getAttribute("totalFeeStr");
%>
<!DOCTYPE html>
<html>
<head>
<title>订单-抢购365日历梨</title>
<meta http-equiv="Cache-Control" content="no-siteapp" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta id="viewport" name="viewport"
	content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<script>
	if (location.href.indexOf('&isjumped=true') == -1
			&& navigator.userAgent.toLowerCase().match(/micromessenger/i) != "micromessenger") {
		var url = location.href;
		location.href = [
				"coco://365rili.com/jumpEvent",
				"?title=",
				encodeURIComponent('订单-抢购365日历梨'),
				"&url=",
				encodeURIComponent(url.substr(7, url.length) + '&isjumped=true') ]
				.join('');
	}
</script>
</head>
<body>
	【购买成功！】你成功购买了<%=count %>个梨，总价<%=totalFeeStr %>元
</body>
</html>
