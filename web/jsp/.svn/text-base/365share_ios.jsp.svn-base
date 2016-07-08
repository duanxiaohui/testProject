<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.when.android.calendar365.calendar.proto.RiliProtos" %>
<%@ page import="java.text.SimpleDateFormat"%>
<%@ page import="java.util.Date" %>
<%@ page import="com.rili.web.utils.Base64" %>
<%
RiliProtos.ProtoSchedule pSchedule = (RiliProtos.ProtoSchedule)request.getAttribute("schedule");
String encodeString =   new String(Base64.encode(pSchedule.toByteArray()));
//String encodeString =  "";
String username = (String)request.getAttribute("username");
String groupID = (String)request.getAttribute("groupID");
if(username==null) username="";
String title = "无此条日程";
String date = "0000-00-00 00:00";
if(pSchedule!=null)
{
	title = pSchedule.getTitle();
	if(pSchedule.getAlldayEvent() == 1){
		date = new SimpleDateFormat("yyyy-MM-dd ").format(new Date(pSchedule.getStartTime())) + "全天";
	}else{
		date = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date(pSchedule.getStartTime()));
	}
}
%>

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>
	下载365日历iPhone版
</title>
<script>
function autoResize(){
	var w = document.getElementById("dl_container").style.paddingLeft;
	w = w.substring(0, w.length - 2);
	document.getElementById("dl_container").style.width = (window.screen.width - 2 * w) + "px";
	document.getElementById("dl_btn").style.width = (window.screen.width - 2 * w) + "px";
	document.getElementById("insert_to_cal").style.width = (window.screen.width - 2 * w) + "px";
}
</script>
</head>
<body onload="setTimeout('autoResize()', 300);" style="margin:0;padding:0;background: url('/dl/bg.jpg');">
<div id="dl_container" style="padding-left:15px; padding-right: 15px;">
	<div id="ct_r1" style="margin-top:20px;min-height:116px;background:#5e5e5e;
							padding:10px 13px;font-family: Microsoft YaHei;
							color: #ffffff;line-height: 25px;">
		<div id="who_share" style="font-size: 16px;color:#fff36e;";><%=username%>分享给您一条日程: </div>
		<div id="sch_date" style="font-size: 16px;"><%=date%></div>
		<div id="sch_title" style="font-size: 16px;"><%=title%></div>
	</div>
	<div id="ct_r2" style="margin: 10px auto 0px;font-family: Microsoft YaHei;
							font-size: 14px;color: #9a9a9a;font-weight:bold;
							line-height: 25px;">
		如果您已安装365日历iPhone版：
	</div>
	<div id="ct_r3" style="margin-top:10px;">
		<a href="rili365://insert2iphone?s=<%=encodeString%>&g=<%=groupID%>">
			<img id="insert_to_cal" src="/dl/ios/insert_to_cal.png"></img>
		</a>
	</div>
	<div id="ct_r4" style="margin: 5px auto 0px;font-family: Microsoft YaHei;
							font-size: 14px;color: #9a9a9a;font-weight:bold;
							line-height: 25px;">
		如果您是新用户：
	</div>
	<div id="ct_r5" style="margin-top:10px;">
		<a href="http://itunes.apple.com/cn/app/id456880164">
			<img id="dl_btn" src="/dl/ios/dl_btn.png"></img>
		</a>
	</div>	
	<div id="ct_r6" style="margin-top:35px;margin-bottom:25px;color:#9a9a9a;font-size:20px;
							font-weight:bold;text-align:center;
							font-family: Microsoft YaHei;">
		精彩每一天  365日历
	</div>
</div>
</body>
</html>