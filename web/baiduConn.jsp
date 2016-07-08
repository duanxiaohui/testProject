<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%@ page import="com.rili.web.utils.Baidu" %>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<script type="text/javascript" src="/js/render.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<title>365日程管理</title>
</head>
<% Boolean login = (Boolean) request.getAttribute("login"); %>
<% String  domain = (String) request.getAttribute("domain"); %>
<% Object  error = request.getAttribute("error"); %>
<body>
<!-- 百度应用客户端监控代码1 -->
<script src="http://app.baidu.com/static/appstore/monitor.st"></script>
<script type="text/javascript">
     baidu.app.setHeight(680);
</script>
<div id="message"></div>
<script type="text/javascript">
	<% if(error != null){ %>
		if(window.parent.removeIframe)
		{
			window.parent.removeIframe();
		}
		$("#message").html("抱歉，连接百度账号失败，请您重试。");
	<% } else if(login){ %>
		try{
			if(window.parent.removeIframe){
				window.parent.removeIframe();
			}else{
				window.location.href = "/main/calendar.do";
			}
		}catch(e){
			window.location.href = "/main/calendar.do";
		}
	<% }else{ %>
		window.location.href = '<%= Baidu.getAuthRequestURL("default",domain) %>';
	<% } %>
</script>
</body>
</html>
