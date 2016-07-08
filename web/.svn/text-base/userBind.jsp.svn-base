<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title>
<link rel="stylesheet" type="text/css" href="/css/reset.css"/>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/userBind.css"/>
</head>
<body class="cover">
	<div class="main">
		<div id="div_header">注册并绑定365日历账号</div>
		<div id="div_reg">
			<div class="tip"></div>
			<div class="inputbg">
				<div class="title">用&nbsp;&nbsp;户&nbsp;&nbsp;名：</div><input class="input" value="" />
			</div>
			<div class="tip"></div>
			<div class="inputbg">
				<div class="title">设置密码：</div><input class="input" type="password" />&nbsp;&nbsp;(6-20位)
			</div>
			<div class="tip"></div>
			<div class="inputbg">
				<div class="title">重复密码：</div><input class="input" type="password" />
			</div>
			<div class="line">
				<div class="btn word" id="btn_reg_cancle" style="margin-right:55px;">&nbsp;&nbsp;&nbsp;&nbsp;取&nbsp;消</div>
				<div class="btn word" id="btn_bind_reg" style="margin-right:15px;">&nbsp;&nbsp;&nbsp;&nbsp;绑&nbsp;定</div>
			</div>
		</div>
	</div>	
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/js/communicator.js"></script>
<script type="text/javascript" src="/js/userBind.js"></script>
<% String autoRegBy = (String)request.getAttribute("autoRegBy");  %>
<script type="text/javascript">
	var bind_reg;
<%
	if(autoRegBy != null){
		if(autoRegBy.equals("weibo")){
%>
			bind_reg = communicator.bindWeibo_reg;
<%
		}else if(autoRegBy.equals("baidu")){
%>
			bind_reg = communicator.bindBaidu_reg;
<%
		}else if(autoRegBy.equals("qh360")){
%>
			bind_reg = communicator.bindqh360_reg;
<%
		}else if(autoRegBy.equals("qqt")){
%>
			bind_reg = communicator.bindQQT_reg;
<%
		}else if(autoRegBy.equals("qqz")){
%>
			bind_reg = communicator.bindQQZ_reg;
<%
		}
	}
%>
</script>
<% if(autoRegBy != null && autoRegBy.equals("baidu")){ %>
<!-- 百度应用客户端监控代码 -->
<script src="http://app.baidu.com/static/appstore/monitor.st"></script>
<% } %>
</body>
</html>