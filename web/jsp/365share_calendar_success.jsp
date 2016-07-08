<%@ page contentType="text/html;charset=utf-8"%>
<%
	String calendarTitle = (String) session.getAttribute("calendarTitle");

	String username = (String) session.getAttribute("username");
	String invitee = (String) session.getAttribute("invitee");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
<title>下载365小组日历</title>
<link rel="stylesheet" type="text/css"
	href="/css/cal365_default/mobile.css" />
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/js/smsinvite.js"></script>
</head>
<body>
	<div id="info_container" class="info_container">
		<div id="info" class="info">
			<div style="float: left">
				<img class="icon_face" src="/images/mobile/validate_pass.png" />
			</div>
			<div style="margin-left:60px;">Hi <span class="green_text"><%=invitee%></span>，
				您已经成功加入<span class="green_text"><%=username%></span>的小组日历<span class="green_text"><%=calendarTitle%></span>，
				这就下载客户端吧！</div>
		</div>
		<div id='infoList'>
			<div class='infoItem'>
				<div class='infoItemImgDiv'>
					<img class='infoItemImg' src='/images/index/1.png' />
				</div>
				<span class='infoItemText'>高效便捷的日程管理功能 丰富的活动资讯</span>
			</div>
			<div class='infoItem'>
				<div class='infoItemImgDiv'>
					<img class='infoItemImg' src='/images/index/2.png' />
				</div>
				<span class='infoItemText'>Google日历同步 小组日历分享</span>
			</div>
			<div class='infoItem'>
				<div class='infoItemImgDiv'>
					<img class='infoItemImg' src='/images/index/3.png' />
				</div>
				<span class='infoItemText'>数据云存储 同一帐号多平台同步</span>
			</div>
			<div class='infoItem'>
				<div class='infoItemImgDiv'>
					<img class='infoItemImg' src='/images/index/4.png' />
				</div>
				<span class='infoItemText'>精美主题 多样插件</span>
			</div>
		</div>
		<div class="notice">选择客户端下载：</div>
		<div id='actionList'>
			<a href="http://static.365rili.com/dl/android/365rili+.apk"> 
			<img id='AndroidAction' src='/images/mobile/android.png' /></a> 
			<a href="http://itunes.apple.com/cn/app/id456880164?mt=8"> 
			<img id='iPhoneAction' src='/images/mobile/iphone.png' /></a>
		</div>
		<div id="slogan" class="slogan">精彩每一天 365日历</div>
	</div>
</body>
</html>