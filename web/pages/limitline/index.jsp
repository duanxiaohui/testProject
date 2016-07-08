<%@page import="net.sf.json.JSONArray"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@page import="java.util.Map"%>
<%
	String city = String.valueOf(request.getAttribute("city"));
	String desc = String.valueOf(request.getAttribute("desc"));
	String specialDesc = String.valueOf(request.getAttribute("specialDesc"));
	JSONArray data = (JSONArray) request.getAttribute("data");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title><%=city%>限行</title>
<meta name="format-detection" content="telephone=no">
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<script>document.documentElement.style.webkitUserSelect='none';document.documentElement.style.webkitTouchCallout='none';</script>
<link href="/pages/ui-lib/css/ui-lib.css" rel="stylesheet">
<link href="/pages/limitline/style/main.css" rel="stylesheet">
<script>
var G = <%=data%>;
var city = '<%=city%>';
var specialDesc = '<%=specialDesc%>';
</script>
</head>
<body>
	<div class="wa">
		<div class="panel limit">
			<p class="date"></p>
			<div class="limit-main">
				<p class="tip">限行尾号</p>
				<div class="info" style="font-size: 375px;">
					<em class="num num1"><i></i><span></span></em><em class="num num2"><i></i><span></span></em>
				</div>
			</div>

			<p class="location"><span><%=city%>市</span></p>
			<p class="otherInfo"></p>

			<div class="detail showContent">
				<p class="label"><span>尾号限行规则</span></p>
				<div class="content">
					<p><%=desc%></p>
				</div>
				<a href="javascript:;">展开</a>
			</div>
		</div>

		<a href="javascript:;" class="panel callCar icon" style="display: none;"><span>预约用车</span></a>

		<a href="http://chaweizhang3rdparty.eclicks.cn/webapp/index?plg_nld=1&plg_uin=1&plg_auth=1&plg_usr=1&plg_dev=1&plg_vkey=1&plg_nld=1&appid=10016" class="panel peccancy icon"><span>查询违章</span></a>
	</div>

    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/app.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script src="/pages/limitline/js/main.js"></script>
</body>
</html>
