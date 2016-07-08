<%@page import="com.rili.common.beans.Schedule"%>
<%@page import="com.rili.common.beans.Calendar365"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%
	long eventId = (Long) request.getAttribute("eventId");
	long orderId = (Long) request.getAttribute("orderId");
	boolean hideCode = (Boolean) request.getAttribute("hideCode");
	boolean expectUserData = (Boolean)request.getAttribute("expectUserData");
	boolean needPay = (Boolean)request.getAttribute("needPay");
	
	Schedule schedule = (Schedule) request.getAttribute("schedule");
	Calendar365 calendar365 = (Calendar365) request.getAttribute("calendar");
	String calendarLogo = (String) request.getAttribute("calendarLogo");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

<title>活动凭证</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<meta name="format-detection" content="telephone=no"/>
<link rel="stylesheet" type="text/css" href="/pages/activity/css/order.css" media="screen" />
<link href="/pages/activity/css/toast.css" rel="stylesheet">
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.css">
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.iOS7.css">
<link rel="stylesheet" type="text/css" href="/css/footer.css?20141128">
<script type="text/javascript">
	var G = {
		eventId:'<%=eventId %>',
		hideCode: '<%=hideCode%>',
		needPay: <%=needPay%>,
		orderId: '<%=orderId %>'
	};
</script>
</head>
<body>
    <div class="authorization">
    	<div class="success_icon">
    		<h4>报名成功</h4>
    		<p>请持以下授权码参加<%=schedule.getTitle() %></p>
    	</div>
    	<div class="authorization_code">
    		<p>授权码</p>
    		<p class="code_txt"></p>
    		<p class="send_tips_txt">
    			365日历已将授权码发送至您的手机  <a class="active_send_btn" href="javascript:;">未收到短信?</a>
    		</p>
    		<div class="iphone_div">
    			<input class="iphone_input" type="tel"/>
    			<a href="javascript:;" class="send_btn">发送</a>
    		</div>
    	</div>
    	<div class="info_show">
    		<h4>个人信息</h4>
    		<div class="auth_info_box"></div>
    	</div>
     	<div class="help_tips none">
    		<h4>友情提示</h4>
    		<p>下载365日历并成功登录后请在“我参加的活动”中查看活动信息,<a href="javascript:;" class="down_client_btn">立即下载365日历</a></p>
    	</div>
        <a href="javascript:;" class="exit_btn">退出活动</a>
    </div>
<script src="/js/lib/zepto.min.js"></script>
<script src="/js/lib/gmu/gmu.js"></script>
<script type="text/javascript" src="/pages/activity/js/toast.js"></script>
<script type="text/javascript" src="/js/lib/footer.js?20141128"></script>
<script src="/js/lib/app.js"></script>
<script src="/pages/activity/js/order.js?v=20150212"></script>

</body>
</html>