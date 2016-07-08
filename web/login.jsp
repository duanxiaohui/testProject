<%@ page contentType="text/html;charset=utf-8" %>
<%
String redirectUrl = (String)request.getParameter("url");
String redirectParams = (String)request.getParameter("params");
if(redirectParams != null){
	redirectParams = java.net.URLDecoder.decode(redirectParams, "utf-8");
}else{
	redirectParams = "";
}

String error = request.getParameter("error");
String type = request.getParameter("type");

String username = request.getParameter("username");
String email = request.getParameter("email");


%><!DOCTYPE html>
<html class="web">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta id="viewport" name="viewport" content="width=320;width=device-width; initial-scale=1.0; minimum-scale=1.0; maximum-scale=1.0">
<title>请您登录</title>
<link href="/css/login.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	var G = {
		error: "<%=error%>",
		type:"<%=type%>"
	};
</script>
</head>
<body>
<div class="fram"><!--body切换的class 是web pc-->
	<div class="login_news_box">
		<div class="login_news_logo"><a href="/"></a></div>
		<div class="login_news_content">
			<div class="login_news_content_left">
				<p>365日历可在每一台电脑每一台移动设备上登录使用。</p>
				<p>随时随地记录生活、工作，分享你的精彩。</p>
			</div>
			<div class="login_news_content_right">
				<div id="div_box" class="login_box">
					<h2 class="log_item">登录365日历</h2>
					<h2 class="reg_item">注册365日历</h2>
					<form id="form_login" action="" method="post" autoComplete="off">
						<% if(redirectUrl != null ) { %>
							<input type="hidden" id="hid_redirect" value='<%= redirectUrl + "?" + redirectParams  %>' name="redURL"/>
						<% } %>
						<ul>
							<li class="login_username">
								<div id="div_hint" class="login_error_tips none"></div>
								<label for="elem_username" class="ph-label"></label>
								<input id="elem_username" name="username" placeholder="请输入用户名 / 绑定邮箱(必填)" type="text" class="" maxlength="99" value="<%=username == null ? "" : username %>"/>
							</li>
							<li class="login_username reg_item">
								<label for="elem_email" class="ph-label"></label>
								<input id="elem_email" name="email" placeholder="请输入邮箱(必填)" type="text" maxlength="99" value="<%=email == null ? "" : email %>" />
							</li>
							<li class="login_password">
								<label for="elem_password" class="ph-label"></label>
								<input id="elem_password" name="password" placeholder="请输入密码(必填)" type="password" maxlength="99"/>
							</li>
							<li class="login_password reg_item">
								<label for="elem_password2" class="ph-label"></label>
								<input id="elem_password2" name="password2" placeholder="请重复输入密码(必填)" type="password" maxlength="99"/>
							</li>
							<li class="login_code">
								<label for="elem_verifyCode" class="ph-label"></label>
								<input id="elem_verifyCode" name="verifyCode" placeholder="输入验证码" type="text" maxlength="4"/><div class="login_code_img"><img id="img_verify" class="none" title="点击更换验证码"/></div>
							</li>
							<li class="login_other log_item">
								<a href="/account/retrievePwd.do" tabindex="-1">忘记密码</a><label><input id="chk_save" name="chk_save" type="checkbox"/><span>下次自动登录</span></label>
							</li>
						</ul>
						<input id="save" name="save" type="hidden"/>
						<input type="submit" id="lnk_login" class="login_btn log_item" value="登录"/>
						<a id="lnk_to_reg" href="javascript:;" class="reg_btn log_item">注册</a>
						<input type="submit" id="lnk_reg" class="login_btn reg_item" value="立即注册"/>
						<a id="lnk_to_login" href="javascript:;" class="reg_btn reg_item none">已有帐号</a>
					</form>
					<div class="other_acc">
						<p>使用其他帐号登录</p>
						<ul class="e_clear">
							<li class="none"><a id="qqt_login" title="腾讯微博帐号登录" href="javascript:;"><img src="/images/login/qt.jpg"/></a></li>
							<li><a id="qqz_login" title="腾讯QQ帐号登录" href="javascript:;"><img src="/images/login/qq.jpg"/></a></li>
							<li><a id="weibo_login" title="新浪微博帐号登录" href="javascript:;"><img src="/images/login/weibo.jpg"/></a></li>
							<li><a id="bd_login" title="百度帐号登录" href="javascript:;"><img src="/images/login/baidu.jpg"/></a></li>
							<li><a id="qh360_login" title="奇虎360帐号登录" href="javascript:;"><img src="/images/login/360.jpg"/></a></li>
						</ul>
					</div>
				</div>
				<div id="div_ie6" class="ie6 none"></div>
				<div id="div_ie6_content" class="ie6_content none">
					<h3>温馨提示</h3>
					<p>尊敬的365日历用户，</p>
					<p>您的浏览器版本过低，</p>
					<p>现在升级您的浏览器，</p>
					<p>可获得更好的用户体验。</p>
					<a href="http://www.microsoft.com/zh-cn/download/ie.aspx?q=internet+explorer" target="_blank" class="update_browser_btn">立即升级</a>
					<p>您还可以下载pc客户端，</p>
					<p>多重选择多重享受！</p>
					<a href="javascript:;" class="down_pcclient">Windows pc客户端下载</a>
				</div>
			</div>
		</div>
		<div class="login_news_footer">
			<a class="down_btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.when.coco&g_f=991609">立即下载</a>
		</div>
	</div>
</div>
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/newweb/common.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/v3/js/login_baidu.js"></script>
<script type="text/javascript" src="/js/login.js"></script>
</body>
</html>