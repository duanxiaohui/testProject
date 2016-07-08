<%@ page contentType="text/html;charset=utf-8" %>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>message</title>
</head>
<%  
	int code = (Integer)request.getAttribute("code");
	String message="";
	switch(code){
		case 1:message="抱歉，无法连接微博，请稍后重试";break;
		case 2:message="密码错误";break;
		case 21:message="抱歉，无法连接百度，请稍后重试";break;
		case 31:message="抱歉，无法连接360，请稍后重试";break;
		case 41:message="抱歉，无法连接QQ，请稍后重试";break;
		case 42:message="您已取消QQ登录";break;
		case 43:message="抱歉，无法连接微信，请稍后重试";break;
        case 45:message="参数错误";break;
		default:message="抱歉，无法连接微博，请稍后重试";
	}
%>
<body>
<%= message %>
</body>
</html>