<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.Map" %>
<%@ page import="com.rili.common.beans.Schedule" %>
<%
String data = (String)request.getAttribute("data");
String creator = (String)request.getAttribute("creator");

%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="viewport" name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0, maximum-scale=1.0">
<meta content="telephone=no" name="format-detection">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0"> 

<title>${creator}的日程</title>
<link href="/pages/client_calendar_h5/css/silde_s.css?v=2" rel="stylesheet" media="screen">
<link href="/share/style/share.css?20141126" rel="stylesheet">
<link href="/css/footer.css?20141126" rel="stylesheet">
<link href="/pages/client_calendar_h5/css/main_new.css?t=201501292" rel="stylesheet"/>
<script>
	var G= JSON.stringify(<%=data%>);
</script>
</head>
<body>
	<div class="personal_box">	
		<div class="success_tip"><div class="tips_icon"></div><span>已加入日程，请到365日历公众号(我要-我的日程)中查看</span></div>
		<div class="calendar_content">
			<div class="personal_title"></div>
			<div class="personal_txt"></div>
			<div class="personal_pic_div"></div>
			<div class="personal_address arrow"></div>
			<div class="personal_url"></div>
		</div>
		<div class="personal_remind">
			<div class="personal_time e_clear"></div>
			<div class="personal_remind_div"></div>
			<div class="personal_repeat"></div>
		</div>

		<div class="personal_team"></div>
		<div class="personal_btn">
			<div>
				<span class="join_txt"></span>
			</div>
		</div>	
	</div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script src="/pages/client_calendar_h5/js/calendar_personal.js?20160315"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
    <script src="/js/lib/footer.js?20141126"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
    <script type="text/javascript" src="/js/lib/slide_s.js?20141126"></script>
    <script>
	    function query(name, href) {
	        var reg = new RegExp("(^|\\?|&)" + name + "=([^&^\#]*)(\\s|&|\#|$)", "i");
	        href = href || location.href;
	        if (reg.test(href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	        return ""
	    }
    	$(function() {
			scheduleShare.render(G);
			wxProtocol.init({
				imgUrl: G.imgUrl == "" ? 'http://cocoimg.365rili.com/logo/114.png' : G.imgUrl,
				title: G.scheduleTitle,
				desc: '来自' + G.creator + '的邀请'
			});
		})
    </script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?type=quick&ak=7641c2bcde6b6d1d3c07de7a090029f8&v=1.0"></script>
</body>
</html>
