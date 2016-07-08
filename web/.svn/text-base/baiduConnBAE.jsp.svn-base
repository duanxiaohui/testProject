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
<% Boolean bae = (Boolean) request.getAttribute("bae"); %>
<% String  domain = (String) request.getAttribute("domain"); %>
<% Object  error = request.getAttribute("error"); %>
<body>
<iframe id="cFrameId" name=' cFrame' src="" style="display: none"></iframe> 
</body>
<!-- 百度应用客户端监控代码 -->
<script src="http://app.baidu.com/static/appstore/monitor.st"></script>
<script type="text/javascript">
     baidu.app.setHeight(680);
</script>
<div id="message"></div>
<script type="text/javascript">
function removeIframe()
{
	<% if(bae!=null && bae){ %>
			//kun:此处设置的url，域名要和wnl.html所在的域名一致，这样才能避免跨域限制从而可以操作wnl.html中引用js代码
			document.getElementById('cFrameId').setAttribute('src', 'http://baidu.365rili.com/wannianlibaidu/C.html');
	<% }else{ %>
			window.parent.removeIframe();
	<% } %>
}

<% if(error != null){ %>
	removeIframe();
	$("#message").html("抱歉，连接百度账号失败，请您重试。");
<% } else if(login){ %>
	try{
		removeIframe();
	}catch(e){
		$("#message").html("抱歉，连接百度账号失败，请您重试。");
	}
<% }else{ %>
	window.location.href = '<%= Baidu.getAuthRequestURL("default",domain) %>';
<% } %>
</script> 
</html>
