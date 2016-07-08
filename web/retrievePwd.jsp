<%@ page contentType="text/html;charset=utf-8" %>
<%
Integer pageType = (Integer) request.getAttribute("pageType");
%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>日历</title>
<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet" type="text/css"/>
<link href="/css/retrievepassword.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
	    var G = {
	    	pageType: <%=pageType%>
	    };
	</script>
</head>
<body>
<div class="retrieve_password">
	<div class="retrieve_password_top">
		<a href="/" title="返回网站首页" id="lnk_goback">365日历精彩每一天</a>
	</div>
	<div class="retrieve_password_crumbs">
		<div class="crumbs_content e_clear">
			<h3>找回密码</h3>
			<ul id="ul_tab" class="e_clear">
				<li class="a on"><a href="javascript:;" onclick="toPage(0);">1.填写安全邮箱</a></li>
				<li class="b">2.接收找回密码邮件</li>
				<li class="c">3.重置密码</li>
			</ul>
		</div>
	</div>
	<div id="div_panels" class="retrieve_password_content">
		<div class="fill_user_email">
			<h3>请输入用户名或邮箱</h3>
			<dl class="e_clear">
				<dt>用户名/邮箱：</dt><dd><input id="ipt_username" type="text" class="user_email"/></dd>
				<dt></dt><dd><a id="lnk_send_email" href="javascript:;" class="submit_btn">提交</a></dd>
			</dl>
		</div>
		<div class="emial_verification none">
			<p>我们已将“[365日历]找回密码”邮件发送到您的邮箱 ******@163.com 中，请在30分钟内收信重置密码。</p>
			<a href="javascript:;" class="go_email">去163邮箱</a>
			<p>没有收到找回密码邮件？<br/>到邮件垃圾箱里找找，或者点击这里<a href="###">重新发送找回密码邮件。</a></p>
		</div>
		<div class="reset_password none">
			<h3>重置密码</h3>
			<dl class="e_clear">
				<dt>密码：</dt>
				<dd><input id="ipt_pwd" type="password"/><div id="div_tip" class="login_error_tips none">两次密码输入不一致</div></dd>
				<dt>重复密码：</dt>
				<dd><input id="ipt_cfm" type="password"/></dd>
				<dt></dt>
				<dd><a id="lnk_reset_pwd" href="javascript:;" class="submit_btn">提交</a></dd>
			</dl>
		</div>
		<div class="contact">
			<h3>客服联系方式</h3>
			<p>邮箱：<a href="mailto:help@365rili.com">help@365rili.com</a>    电话：15910709384     QQ群： 92767096</p>
		</div>
	</div>
	<div class="footer">Copyright &copy; 2007-2013 365rili.com    京ICP备12041791号    京公网安备11010102002007号   内容合作：contact365rili.com</div>
</div>
<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/newweb/common.js"></script>
<script type="text/javascript" src="/js/retrievePwd.js"></script>
</body>
</html>