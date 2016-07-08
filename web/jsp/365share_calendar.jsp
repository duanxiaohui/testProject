<%@ page contentType="text/html;charset=utf-8" %>
<%
String username = (String)session.getAttribute("username");
String calendarTitle = (String)session.getAttribute("calendarTitle");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content = "width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
<title>
	绑定365小组日历
</title>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/mobile.css" />
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/smsinvite.js"></script>
</head>
<body>
<div id="info_container" class="info_container">
	<div id="info" class="info">您的好友<span class="green_text"><%=username%></span>用365日历创建了小组日历<span class="green_text"><%=calendarTitle%></span>，
					并邀请您加入。加入小组日历后，你们可以设置共同的日程！
	</div>
	<div class="notice">
		请输入您的手机号码后四位验证身份！
	</div>
	<div id="warning" class="warning"></div>
	<div class ="input_line">
		<input class ="input_field" id = "phoneNumber" name ="phoneNumber" type = "text" value ="" placeholder="手机号码后四位" onclick="eventHandlers.phoneNumber_click()"/>
	</div>
	<div class = "submit_button_blue" align="center" onclick="eventHandlers.validate_click()">
		验明正身
	</div>
	<div id="slogan" class="slogan">
		精彩每一天  365日历
	</div>
</div>
</body>
</html>