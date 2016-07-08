<%@ page contentType="text/html;charset=utf-8" %>
<%
    String msg = (String) request.getAttribute("msg");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>订单错误</title>
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0">
<style type="text/css">
.main{
	padding-top: 100px;
	font-family: "Hiragino Sans GB", "Microsoft YaHei", 微软雅黑, SimSun, arial;
	text-align: center;
	font-size: 20px;
	color: #7f7f7f;
}
</style>
</head>
<body>
	<div class="main">
		<%=msg %>
	</div>
</body>
</html>