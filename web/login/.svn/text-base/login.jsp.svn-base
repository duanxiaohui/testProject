<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<%
String error = request.getParameter("error");
String info = "";
String username = request.getParameter("username");
if(error!=null)
{
    if(error.equals("1")) info = "验证码错误";
    if(error.equals("2")) info = "用户不存在";
    if(error.equals("3")) info = "密码错误";
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="/login/css/login.css" />
	<script type="text/javascript" src="/js/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="/js/md5.js"></script>
	<script type="text/javascript" src="/js/render.js"></script>
	<script type="text/javascript" src="/login/js/login.js"></script>
</head>
<body style="overflow: hidden;">
<div class="infoBox" >
			<h2 style="line-height:30px;color:#252525;">登录365日历</h2>
			<div class="errorInfo">
				<%
            		if(error != null) {%> <%=info %> <%} 
            	%>
			</div>
			<form id="userLoginForm" method="post" action="http://www.365rili.com/account/loginAction.do">
				<input name = "redURL" type="hidden" value="http://www.365rili.com/account/userInfo.do" />
				<div class="input_bg">
					<input type="text" onfocus="focusUserInput();" onblur="blurUserInput();" id="username" name="username" title="登录名" tabindex="1" autocomplete="off" value="请输入用户名"/>
				</div>
				<div class="input_bg">
					<input id="pass" name="pass" onblur="blurPassInput();" style="display:none;" title="密码" tabindex="2" type="password"/>
					<input id="password_text" onfocus="focusPassInput();" style="display:block;" type="text" value="请输入密码"/>
				</div>
				<div style="margin: 20px 0;">
					<input class="textBox" id="verifyCode" name="verifyCode" maxlength="4"/>
					<img id="verifyCodeImg" src="http://www.365rili.com/account/getVerifyCodeAction.do" width="60" height="19" alt="验证码" style="vertical-align:middle;margin-left:10px;"/>
					<span class="link_login" onclick="refreshVerifyCode()">刷新</span>
				</div>
				<div style="margin: 20px 0;">
					<input type="button" value="登录" onclick="postUserLogin()" style="float:left;cursor:pointer;border:none;width:87px;height:26px;background:url(http://www.365rili.com/images/cal365_default/reg_btn_bg.gif) no-repeat transparent;"/>
					<img id="weibo_login" style="display:block;float:left;margin-left:16px;" alt="" src="/images/cal365_default/weibologin24.png" />
				</div>
				<div style="height:18px;width:107px;cursor:pointer;">
					
				</div>
				<input id="password" name="password" type="hidden"/>
				<input id="save" name="save" type="hidden"/>
			</form>
		</div>
</body>
</html>