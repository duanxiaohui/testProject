<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.List" %>
<%
String dateline1 = (String)request.getAttribute("dateline1");
String dateline2 = (String)request.getAttribute("dateline2");
String lunar_time = (String)request.getAttribute("lunar_time");
String title = (String)request.getAttribute("title");
String url = (String)request.getAttribute("url");
String location = (String)request.getAttribute("location");
List<String> pics = (List<String>)request.getAttribute("pics");
String calendarName = (String)request.getAttribute("calendarName");
Long calendarID = (Long)request.getAttribute("calendarID");
%>
<!DOCTYPE html>
<html>
<head>
<title>365日历</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta id="viewport" name="viewport" content="">
<link rel="stylesheet" type="text/css" href="/share/style/base.css" media="screen" />
<style>
.calendar_img img{
	width:600px;
}
</style>
</head>
<body>
<div class="top">
	<div class="top_content">
		<a href="http://d2.365rili.com/coco.apk" class="android">Android</a>
		<a href="https://itunes.apple.com/cn/app/365ri-li-xin-ban/id642101382?ls=1&mt=8" class="iphone">iPhone</a>
		<div class="logo">
			365日历
		</div>
	</div>
</div>
	<div class="calendar_box">
		<div class="position">
			<div class="source"><p>来自《<%=calendarName %>》日历</p></div>
			<div class="calendar_date">
				<h2 class="calendar_date_line1"><%=dateline1 %></h2>
				<p class="calendar_date_line2"><%=dateline2 %></p>
			</div>
		</div>
		<div class="calendar_txt">
		<%=title %>
		</div>
	</div>
	<%
	if(pics != null)
	{
		for(String pic : pics)
		{
	%>
	<div class="calendar_img">
		<img src="<%=pic %>" />
	</div>
	<%
		}
	}
	if(url != null || location != null)
	{
	%>
	<div class="address_box">
		<ul>
		<%
			if(url != null)
			{
		%>
			<li class="url"><p>查看详情(<a href="<%=url %>" target="_blank" class=""><%=url %></a>)</p></li>
		<%
			}
			if(location != null)
			{
		%>
			<li class="address"><p><%=location %></p></li>
		<%
			}
		%>
		</ul>
	</div>
	<%
	}
	%>
	<div class="code_box">
		<h4>扫瞄二维码下载365日历</h4>
		<p>支持 iOS 和 Android</p>
		<img src="/share/images/code.jpg"/>
	</div>
	<div class="phone_txt">
		<a href="http://i.365rili.com" class="down_btn" target="_blank">下载365日历</a>
		<%
			if(calendarID != null)
			{
		%>	
		<a href="coco://365rili.com/subscribe?calendarID=<%=calendarID%>" class="collection_btn">关注此日历</a>
		<%
			}
		%>
	</div>
	<div class="weixin_tip">
		<p>温馨提示:微信用户如果遇到无法点击关注或者下载的情况,请点击微信页面右上角的分享按钮, 然后选择在浏览器打开该页面.</p>
	</div>

<div class="footer">&copy; 2014 365rili Inc</div>
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/share/js/schedule.js"></script>
<div style="display: none;">
	<script src="//www.365rili.com/js/lib/app.js"></script>
</div>

</body>
</html>
