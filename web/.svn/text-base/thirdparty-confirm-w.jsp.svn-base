<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%  
	String callback = (String)request.getAttribute("callback");
	String bindType = (String)request.getAttribute("bindType"); 
   	String account365 = (String)request.getAttribute("account365");
   	String account3rdParty = (String)request.getAttribute("account3rdParty"); %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" type="text/css" href="/css/cal365_default/userConfirm.css" />
<script type="text/javascript" src="/js/userConfirm.js"></script>
<title>第三方账号绑定确认</title>
</head>
<body>
<div class="bar_container">
	<div class="topbar_orange"></div>
	<div class="topbar_yellow"></div>
	<div class="topbar_lightblue"></div>
	<div class="topbar_darkblue"></div>
</div>
<div id="info_container" class="info_container">
	<div id="info" class="info">
		您的<%=bindType%>账号<span class="green_text"><%=account3rdParty%></span>与365日历账号<span class="blue_text"><%=account365%></span>已绑定，
		继续将解除该绑定关系。
	</div>
	<div class="submit_button_green" align="center" onclick="eventHandlers.continue_click();">
		继续
	</div>
	<div class="submit_button_blue" align="center" onclick="eventHandlers.cancel_click();">
		退出
	</div>
	<div id="slogan" class="slogan">精彩每一天 365日历</div>
</div>
<form id="user_confirm" name="user_confirm" action="<%=callback%>"></form>
</body>
</html>