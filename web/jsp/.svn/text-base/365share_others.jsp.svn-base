<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.when.android.calendar365.calendar.proto.RiliProtos" %>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date" %>
<%
RiliProtos.ProtoSchedule pSchedule = (RiliProtos.ProtoSchedule)request.getAttribute("schedule");
String username = (String)request.getAttribute("username");
if(username==null) username="";
String title = "无此条日程";
String date = "0000-00-00 00:00";
if(pSchedule!=null)
{
	title = pSchedule.getTitle();
	date = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date(pSchedule.getStartTime()));
}
%>

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>
	下载365日历
</title>
<style>
#dl_container{
	width: 300px;
	margin: 0 auto;
}

ul{
	padding: 0;
}

</style>
</head>
<body style="margin:0;padding:0;background: url('/dl/bg.jpg');">
<div id="dl_container">
	<div id="ct_r1" style="margin-top:30px;height:116px;background:#5e5e5e;
							padding:10px 13px;font-family: Microsoft YaHei;
							color: #ffffff;line-height: 25px;">
		<div id="who_share" style="font-size: 14px;";><%=username%>分享给您一条日程: </div>
		<div id="sch_date" style="font-size: 12px;"><%=date%></div>
		<div id="sch_title" style="font-size: 12px;"><%=title%></div>
	</div>
	<div id="ct_r2" style="margin-top:35px;">
		<img src="/dl/365rili_logo.png"></img>
	</div>
	<div id="ct_r3" style="margin-top:15px;text-align:center;line-height: 25px;
							color:#737373;font-family: Microsoft YaHei;font-size:13px;
							font-weight:bold;">
		<ul>
			<li>高效管理您的工作和生活</li>
			<li>与朋友分享您的精彩日程</li>
			<li>订阅您感兴趣的活动&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
		</ul>
	</div>
</div>
</body>
</html>