<%@page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8" %>
<%
	String screenName = (String) request.getAttribute("screen_name");
	String img = (String)request.getAttribute("img");
	String userName = (String)request.getAttribute("username");
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<style type="text/css">
	.txt{
		font-family:Microsoft YaHei;
		color:#666666;
	}
	.btn{
		height:28px;
		width:170px;
		margin-top:24px;
		text-align:center;
		font-family:Microsoft YaHei;
		color:#666666;
		font-size:16px;
		line-height:16px;
		padding-top:7px;
		background:url(/login/images/btnbg.png);
	}
	a{
		text-decoration:none;
		color:#666666;
	}
	.clear{
		clear:both;
	}
</style>
<script type="text/javascript" src="/js/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="/js/render.js"></script>
<title></title>
</head>
<body>
<div style="height:50px;margin:58px 0 0;padding-left:24px;">
<% if(screenName != null && screenName.length() > 0){ %>
	<img src="<%= img %>" alt = "<%= screenName %>" style="float:left;" />
	<div style="height:50px;float:left;margin-left:15px;">
		<div style="height:18px;line-height:18px;font-size:16px;" class="txt"><%= screenName %></div>
		<div style="height:12px;line-height:12px;margin-top:8px;font-size:12px;" class="txt"><a href="/account/logout.do?redURL=/account/subLogin.do">[退出]</a></div>
	</div>
<% }else{ %>
	<div class="txt" style="float:left;">账号：<%= userName %></div>
	<a href="/account/logout.do?redURL=/account/subLogin.do" class="txt"  style="font-size:12px;margin-top:3px;float:left;margin-left:20px;">[退出]</a>
	<div class="clear"></div>
	<div style="margin-top:16px;cursor:pointer;" id="bind_weibo">
		<img src="/images/cal365_default/weibologo_24x24.png" style="float:left;" alt="">
		<div class="txt" style="float:left;height:20px;margin:4px 4px;font-size:14px;">&nbsp;绑定新浪微博</div>
	</div>
	<script type="text/javascript">
		$("#bind_weibo").click(function(){
			var win = render.popupWin("/weibo/bind-weibo.do","",380,580);
			var intervalId=setInterval(function(){
				if(win.closed){
					clearInterval(intervalId);
					window.location.reload();
				}else if(win.weiboAuth=="success"){
					win.close();
					clearInterval(intervalId);
					window.location.reload();
				}
			},500);
		});
	</script>
<% } %>
	<div class="clear"></div>
	<div class="btn"><a target="_blank" href="http://www.365rili.com/main/subscribe.do">进入我的关注</a></div>
</div>
</body>
</html>
