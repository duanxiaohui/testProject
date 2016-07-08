<%@ page contentType="text/html;charset=utf-8" %>

<%
// 是否登录
boolean isLogin = (Boolean) request.getAttribute("isLogin");
// 点赞数
Integer likeCount = (Integer) request.getAttribute("likeCount");
// 分享id
Integer shareId = (Integer) request.getAttribute("shareId");
// 产品id
Integer giftId = 0;
Object giftIdObj = request.getAttribute("giftId");
if (giftIdObj != null) {
	giftId = (Integer) request.getAttribute("giftId");
} else {
	giftId = Integer.valueOf(request.getParameter("id"));
}


// 是否点过赞
boolean isLike = (Boolean) request.getAttribute("isLike");
%>

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>魅「历」女生节，美丽任性送</title>
<script>document.documentElement.style.webkitUserSelect='none';</script>
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<meta name="format-detection" content="telephone=no"/> 
<link href="http://www.365rili.com/css/footer.css?20141126" rel="stylesheet">
<link href="http://www.365rili.com/pages/bd/holiday_38/main.css" rel="stylesheet">
<script>
	var isLogin = <%=isLogin%>;
	var likeCount = parseInt('<%=likeCount%>');
	var shareId = parseInt('<%=shareId%>');
	var isLike = <%=isLike%>;
	var id = parseInt('<%=giftId%>');
</script>
</head>
<body>
    <img class="bg" src="http://www.365rili.com/pages/bd/holiday_38/images/bg.jpg" alt="">
	<div class="banner" >
		<img src="http://www.365rili.com/pages/bd/holiday_38/images/banner.jpg" alt="">
	</div>
	<div class="p info">
		<img src="http://www.365rili.com/pages/bd/holiday_38/images/pi<%=giftId%>.jpg" alt="">
	</div>
	<p class="infoTip"><img src="http://www.365rili.com/pages/bd/holiday_38/images/infoTip.gif" alt=""></p>
	<a href="javascript:;" class="score"><span><%=likeCount%></span></a>
	<div class="join">
		<a href="http://www.365rili.com/pages/bd/holiday_38/list.html"><img src="http://www.365rili.com/pages/bd/holiday_38/images/join.gif" alt=""></a>
	</div>
	<footer>
		<img src="http://www.365rili.com/pages/bd/holiday_38/images/logo.jpg" alt="">
	</footer>
	<div class="tipBox none">
		<div class="mash"></div>
		<div class="tip">
			<img src="http://www.365rili.com/pages/bd/holiday_38/images/tip.png" alt="">
		</div>
	</div>
	<script src="http://www.365rili.com/js/lib/zepto.min.js"></script>
	<script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
	<script type="text/javascript" src="/js/lib/footer.js"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
	<script src="http://www.365rili.com/pages/bd/holiday_38/js/active.js"></script>

    <div style="display: none;">
    </div>
</body>
</html>