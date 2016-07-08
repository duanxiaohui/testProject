<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<%
	String agent = request.getHeader("User-Agent");
	String bA = "ie";
	if(agent.indexOf("MSIE") != -1) bA = "ie";	//out.println("NOTIE");
	if(agent.indexOf("Firefox") != -1) bA = "firefox";
	if(agent.indexOf("Opera") != -1) bA = "opera";
	if(agent.indexOf("Chrome") != -1) bA = "chrome";
	String bAfile = "sbs_"+bA+".jsp";
	//out.println(bA);
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
<link rel="shortcut icon" href="/favicon.ico">
<link rel="Bookmark" href="/favicon.ico">
<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title> 
<script type="text/javascript" src="http://up2.365rili.com/v3/js/jquery.js"></script>
<script type="text/javascript" src="http://up2.365rili.com/v3/js/dialog.js"></script>
<script type="text/javascript" src="http://up2.365rili.com/v3/js/feedback.js"></script>
<script type="text/javascript" src="fplayer/flowplayer.js"></script>
<link rel="stylesheet" type="text/css" href="http://up2.365rili.com/v3/css/reset.css" />
<link rel="stylesheet" type="text/css" href="http://up2.365rili.com/v3/css/main.css" />
<link rel="stylesheet" type="text/css" href="http://up2.365rili.com/v3/css/dialog.css" />
<style>
#body {
	overflow: hidden;
	height: auto;
}
#sectopic {
	width: 650px;
	height: 231;
	float: left;
}
#main {
	width: 648px;
	float: left;
	background-color: #fff;
	border:1px solid #ccc;
	float: left;
	height: 1058px;
}
#video {
	background:url(http://up2.365rili.com/v3/images/assistant/mov_bg.jpg) no-repeat;
	width: 584px;
	height: 439px;
	float: left;
	margin-left: 33px;
	margin-top: 15px;
	padding-left: 20px;
	padding-top: 36px;
}
#QA {
	font-family:"Arial","Microsoft YaHei","YouYuan","FangSong";
	float: left;
	color: #363636;
	padding: 0px 30px 30px 30px;
	font-size: 14px;
	line-height: 20px;
	letter-spacing:1px;
	margin-top: -20px;
}
#stepbystep {
	width: 374px;
	float: right;
	background-color: #fff;
	font-size: 12px;
	height: 1060px;
}
.stepcell {
	background:url(http://up2.365rili.com/v3/images/assistant/line.png) no-repeat;
	padding: 20px 10px 0px 10px;
	font-size: 12px;
}
.stepcellin {
	padding: 0px 16px;
}
.sc_num {
	float:left;
	margin-bottom:10px;
}
.sc_txt {
	font-family:"Arial","Microsoft YaHei","YouYuan","FangSong";
	float:left;
	width:260px;
	color:#666;
	padding-top:20px;
	margin-bottom:10px;
	line-height: 14px;
	letter-spacing:1.2px;
}
.sc_pic {
	clear:both;
	margin-bottom:24px;
	margin-left: 20px;
}
</style>
</head>
<body>
	<div id="page">
		<jsp:include page="header.jsp" flush="true" />
		<div id="body">
			<div id="main">
				<div id="sectopic"><img src="http://up2.365rili.com/v3/images/assistant/main_pic.jpg" width="648"></></div>
				<div id="video">
					<a href="media/365zs.flv"
						 style="display:block;width:550px;height:380px"
						 id="player">
					</a>
					<script>
						//flowplayer("player", "fplayer/flowplayer-3.swf", {clip:{autoPlay:false,autoBuffering:true}});
						//flowplayer("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.11.swf",  {
						flowplayer("player", "fplayer/flowplayer-3.swf", {
						playlist: [
							{
								url: "http://up2.365rili.com/v3/images/assistant/videocover.jpg",
								scaling: 'orig'
							},
							{
								url: 'media/365zs.flv',
								autoPlay: false,
								autoBuffering: true
							}
						]
						});
					</script>
				</div>
				<div id="QA">
					<img src="http://up2.365rili.com/v3/images/assistant/title_QA.jpg"><br><br>
					1. 日程助手可以为我做什么？<br>
					   一键保存网页上的信息到365账号中，可在365日历中方便地管理，并可以同步到手机、平板电脑等任意移动设备上查看并提醒。<br><br>
					
					2. 日程助手怎么用？<br>
					   浏览网页时，当看到精彩活动、演出预告、聚会聚餐等需要记录提醒的信息时，
					   选中想保存的内容，点击收藏夹/书签栏上的“添加到365日历”链接。
					   如未登录365日历账号时，会显示登录界面，之后可设置具体日期，再点击“提交”即可。<br><br>
					
					3. 日程助手支持哪些浏览器？<br>
					   Internet Explorer(IE)、360浏览器、Firefox火狐浏览器、Chrome、Opera、搜狗等主流浏览器。<br><br>
				</div>
			</div>
			<jsp:include page="<%= bAfile %>" flush='true' />
		</div>
		<div id="footer">
			<jsp:include page="/v3/footer.jsp" flush="true" />
		</div>
	</div>

</body>
</html>