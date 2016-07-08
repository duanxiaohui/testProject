<%@ page contentType="text/html;charset=utf-8" %>
<%
	String key = (String) request.getAttribute("key");

	Boolean expired = (Boolean) request.getAttribute("expired");
	Boolean is_login = (Boolean) request.getAttribute("is_login");
	Boolean is_member = (Boolean) request.getAttribute("is_member");

%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta id="viewport" name="viewport" content="width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<title>365日历</title>
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.css">
<link rel="stylesheet" href="/js/lib/gmu/assets/widget/dialog/dialog.iOS7.css">
<link href="/share/style/group.css?20150911" rel="stylesheet" media="screen">
<link rel="stylesheet" type="text/css" href="/css/footer.css" />



</head>
<script>
	var G = {
		key:'<%=key%>',
		is_login:<%=is_login%>,
		is_member:<%=is_member%>
	};

</script>
<body>
    <div class="group_main">
  
    </div>
    <script src="/js/lib/zepto.min.js"></script>
    <script src="/js/lib/zTouch.js"></script>
    <script src="/share/js/group.js?20141217"></script>
    <script src='http://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>
    <script src="/share/js/weixin_1.0.js"></script>
     <script type="text/javascript" src="/js/lib/footer.js"></script>
    <script type="text/javascript" src="/js/lib/app.js?20141205_2"></script>
</body>
</html>