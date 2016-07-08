<%@ page contentType="text/html;charset=utf-8" %>
<%
	String calendarTitle = (String) session
			.getAttribute("calendarTitle");
	String username = (String) session.getAttribute("username");
	String phoneNumber = (String) session.getAttribute("phoneNumber");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content = "width = device-width, initial-scale = 1, minimum-scale = 1, maximum-scale = 1" />
<title>
	绑定365小组日历
</title>
<link rel="stylesheet" type="text/css" href="/css/cal365_default/mobile.css" />
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/js/smsinvite.js"></script>
</head>
<body>
<div id="info_container" class="info_container">
		<div id="info" class="info">
			<div style="float: left">
				<img class="icon_face" src="/images/mobile/validate_pass.png" />
			</div>
			<div style="margin-left: 60px;">
				验证成功！接下来只需简单设置信息即可与<span class="green_text"><%=username%></span>共享小组日历
				<span class="green_text"><%=calendarTitle%></span>
			</div>
		</div>
		<div class="btn_line">
			<span class="btn btnon" name="newuser_tab">注册</span>
			<span class="btn btnoff" name="existuser_tab">登录</span>
		</div>
		<div id="main">
			<div class="tab" id="newuser_tab">
				<div id="warning_reg" class="warning"></div>
				<div class="input_line">
					<input class="input_field" style="margin-bottom:-15px;"
						id="newuser" name="newuser" type="text"
						value="<%=phoneNumber%>" placeholder="用户名（长度：4-20位）"
						onclick="eventHandlers.reg_field_click();"/>
					<a class="clear" id="clearField" href="#" onclick="eventHandlers.clearField('newuser');">
    					<img class="clear" src="/images/mobile/reg_del.gif" alt="" />
					</a>	
				</div>
				<div class="input_line">
					<input class="input_field" id="email" name="email" type="text"
						value="" placeholder="邮箱（name@example.com）"
						onclick="eventHandlers.reg_field_click();" />
				</div>
				<div class="input_line">
					<input class="input_field" id="newpass" name="newpass" type="text"
						value="" placeholder="密码（长度：6-20位）"
						onclick="eventHandlers.reg_field_click();" />
				</div>
				<div class="submit_button_green" align="center"
					onclick="eventHandlers.reg_click();">注册并加入小组</div>
			</div>
			<div class="tab hidden" id="existuser_tab">
				<div>
					<img id="weibo_login" alt="" class="thirdpartyicon" src="/v3/images/login/id_weibo.png"/>
					<img id="qqt_login" alt="" class="thirdpartyicon" src="/v3/images/login/id_qq3.png"/>
					<img id="bd_login" alt="" class="thirdpartyicon" src="/v3/images/login/id_baidu.png"/>
					<img id="qh360_login" alt="" class="thirdpartyicon" src="/v3/images/login/id_360.png"/>
				</div>
				<div id="warning_bind" class="warning" style="float:left; margin-top:15px;"></div>
				<div class="input_line">
					<input class="input_field" style="margin-bottom:-15px;"
						id="username" name="username"
						type="text" value="" placeholder="账号"
						onclick="eventHandlers.bind_field_click();" />
					<a class="clear" id="clearField" href="#" onclick="eventHandlers.clearField('username');">
    					<img class="clear" src="/images/mobile/reg_del.gif" alt="" />
					</a>	
				</div>
				<div class="input_line">
					<input class="input_field" id="password" name="password"
						type="password" value="" placeholder="密码"
						onclick="eventHandlers.bind_field_click();" />
				</div>
				<div class="submit_button_blue" align="center"
					onclick="eventHandlers.bind_click();">
					<img class="icon_group" src="/images/mobile/group.png" />登录并加入小组
				</div>
				
			</div>
		</div>
		<div id="slogan" class="slogan">精彩每一天 365日历</div>
	</div>
<script type="text/javascript">
$(document).ready(function(){
	$(".btn").click(function(){
		$(".btn").removeClass("btnon");
		$(this).addClass("btnon");
		$(".btn").addClass("btnoff");
		$(this).removeClass("btnoff");
		$(".tab").addClass("hidden");
		$("#"+$(this).attr("name")).removeClass("hidden");
	});
	$("#weibo_login").click(function(){
		window.location="/weibo/glogin.do";
	});
	$("#qqt_login").click(function(){
		window.location="/qt/glogin.do";
	});
	$("#bd_login").click(function(){
		window.location ="/baidu/glogin.do";
	});
	
	$("#qh360_login").click(function(){
		var url = "https://openapi.360.cn/oauth2/authorize?client_id=0a4107ab27aa0f8a388d483f9a3d12c4&response_type=code" + 
						"&redirect_uri=http://www.365rili.com/qh360/callback.do&scope=basic&state=mlogin&display=mobile.default";
		window.location= url;
		window.location ="/qh360/glogin.do";
	});
	
});
</script>	
</body>
</html>