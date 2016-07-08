<%@ page contentType="text/html;charset=utf-8" %>
<%
String calendarTitle = (String)session.getAttribute("calendarTitle");

String username = (String)session.getAttribute("username");
String invitee = (String)session.getAttribute("invitee");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content = "width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
<title>
	绑定365小组日历Android版
</title>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/mobile.css" />
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/js/smsinvite.js"></script>
</head>
<body>
<div id="info_container" class="info_container">
	<div id="info" class="info">
		<div style = "float:left">
			<img class = "icon_face" src="/images/mobile/validate_pass.png"/>
		</div>
		<div style="margin-left:60px;">Hi <span class="green_text"><%=invitee%></span>，
		您已经成功加入<span class="green_text"><%=username%></span>的小组日历<span class="green_text"><%=calendarTitle%></span>，
		现在就可以与你的朋友共享日程了！</div>
	</div>
	<div class="notice">
		如果您已安装365日历Android版：
	</div>
	<div class = "submit_button_blue" align="center" onclick = "eventHandlers.open_click('android', '<%=invitee%>');">
		点击进入我的日历
	</div>
	<div class="notice">
		如果您未安装：
	</div>
	<div class = "submit_button_green" align="center" onclick = "eventHandlers.dl_click('android');">
		<img class = "icon_android" src="/images/mobile/icon-android.png"/>现在就下载吧
	</div>
	<div id="slogan" class="slogan">
		精彩每一天  365日历
	</div>
</div>
</body>
</html>