<%@ page contentType="text/html;charset=utf-8" %>
<%	
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss"); 
	java.util.Date currentTime = new java.util.Date();
	String currDate = formatter.format(currentTime);
	java.text.SimpleDateFormat yearformatter = new java.text.SimpleDateFormat("yyyy"); 
	String currYear = yearformatter.format(currentTime);
	Integer cid = (Integer) request.getAttribute("calendarID");
%>
<!DOCTYPE HTML>
<html class="web">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
	<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
	<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title>
	<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet"/>
	<link href="/gui/style/jquery.jscrollpane.css" rel="stylesheet"/>
	<link href="/share/style/calendar.css" rel="stylesheet"/>
	<script type="text/javascript">
	    var G = {
	        currDate: new Date("<%=currDate%>"),
	        cid: <%=cid%>
	    };
	</script>
</head>
<body>
<div class="calendar_top">
	<div class="logo_365">365日历出品</div>
	<div class="calendar_name e_clear">
		<dl>
			<dt><img src="/share/images/cal_icon.png" class="calendar_icon"/></dt>
			<dd class="calendar_title"></dd>
		</dl>
	</div>
</div>
<div id="div_today" class="today">
	<!--  <a href="" class="share_btn">分享</a>-->
	<div class="today_calendar e_clear">
		<div class="today_calendar_data"><span id="sp_year" title="滚动鼠标滚轮调整年份"></span>年<span id="sp_month" title="滚动鼠标滚轮调整月份"></span>月</div>
		<div class="today_calendar_pn"><a id="lnk_prev" delta="-1" href="javascript:;" class="prev" hidefocus="true" title="前一个月"></a><a id="lnk_next" delta="1" href="javascript:;" hidefocus="true" class="next" title="后一个月"></a></div>
		<a id="lnk_today" delta="0" href="javascript:;" class="today_btn none" hidefocus="true" title="切换回今天">今天</a>
	</div>
</div>
<div id="div_calendar_list" class="my_calendar_leftnone my_calendar e_clear">
	<div class="my_calendar_center"><div id="div_calendar_panel" class="calendar"></div></div>
</div>
</div>
<div class="calendar_footer">
	<p><img src="/share/images/cal_logo.png"/>本日历由365日历自动生成，随时查看相关活动请<a href="http://www.365rili.com/v4/product.html#coco" target="_blank">下载365日历手机版</a>，并收藏<span class="footer_calendar_title"></span>日历</p>
</div>
<!--
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.0.custom.min.js"></script>
<script type="text/javascript" src="/js/calendar.js"></script>
-->

<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/newweb/common.js"></script>
<script type="text/javascript" src="/js/newweb/solarAndLunar.js"></script>
<script type="text/javascript" src="/share/js/calendarPanel.js"></script>
<script type="text/javascript" src="/js/newweb/calendarCreator.js"></script>
<script type="text/javascript" src="/js/newweb/calendarPlugin.js"></script>
<script type="text/javascript" src="/js/newweb/msgCreator.js"></script>
<script type="text/javascript" src="/js/newweb/calendarList.js"></script>
<script type="text/javascript" src="/js/newweb/importFromSina.js"></script>
<script type="text/javascript" src="/js/newweb/rightBubbleMenu.js"></script>
<script type="text/javascript" src="/js/newweb/userValidate.js"></script>
<script type="text/javascript" src="/js/newweb/lunarPicker.js"></script>
<script type="text/javascript" src="/js/plugins/birthday/birthday.lunarPicker.js"></script>
<script type="text/javascript" src="/js/plugins/birthday/solarPicker.js"></script>
<script type="text/javascript" src="/js/newweb/scheduleCreator.js"></script>
<script type="text/javascript" src="/js/newweb/imageCreator.js"></script>
<script type="text/javascript" src="/gui/js/jquery.jscrollpane.js"></script>
<script type="text/javascript" src="/js/newweb/json2.js"></script>
<script type="text/javascript" src="/share/js/bootstrap.js"></script>

</body>
</html>
