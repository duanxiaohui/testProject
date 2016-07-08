<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="Keywords" content="万年历,万年历查询,黄历,黄历查询,365,日历,阳历,阴历,公历,老皇历,黄道吉日,星座,赛程,赛事,日程,运程,共享,客户端,桌面日历,手机日历" />
<meta name="Description" content="365日历网是专业的日历门户网站，可以在PC、手机、网站之间同步数据。同时还提供各种日历日程信息，包括黄道吉日、农历、黄历、星座运程、体育赛程、电视节目等。" /> 
<title>365日历网(www.365rili.com)_万年历_桌面日历_手机日历_黄道吉日_星座运程</title>

<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>
<script type="text/javascript" src="/js/checkInput.js"></script>
<script type="text/javascript" src="/js/render.js"></script>
<script type="text/javascript" src="/v3/js/pngfix.js"></script>
<script type="text/javascript" src="/v3/js/login_baidu.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	if(jQuery.browser.msie && (jQuery.browser.version == "6.0"))
		correctPNG();
	//绑定登陆按钮事件
	$("#bd_login").click(function(){
		bd_loginOrAuth();
	});
});
function correctPNG()
   {
   for(var i=0; i<document.images.length; i++)
      {
     var img = document.images[i]
     var imgName = img.src.toUpperCase()
     if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
        {
       var imgID = (img.id) ? "id='" + img.id + "' " : ""
       var imgClass = (img.className) ? "class='" + img.className + "' " : ""
       var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "
       var imgStyle = "display:inline-block;" + img.style.cssText
       if (img.align == "left") imgStyle = "float:left;" + imgStyle
       if (img.align == "right") imgStyle = "float:right;" + imgStyle
       if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle     
       var strNewHTML = "<span " + imgID + imgClass + imgTitle
       + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
        + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
       + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"
       img.outerHTML = strNewHTML
       i = i-1
        }
      }
   }
</script>
<link rel="stylesheet" type="text/css" href="/v3/css/reset.css" />
<link rel="stylesheet" type="text/css" href="/v3/css/main.css" />
<link rel="stylesheet" type="text/css" href="/v3/css/register.css" />

<script type="text/javascript">
function refreshVerifyCode() {
    $('#verifyCodeImg').attr('src',"/account/getVerifyCodeAction.do?" + Math.random());
}
$(document).ready(function(){
	$("#username").focus(function(){
		if($("#usernameOK").is(":visible") == true) $("#usernameOK").hide();
		$("#usernameTip").show();
	}).blur(function(){
		if($("#usernameOK").is(":visible") == true)$("#usernameTip").hide();
	});
	$("#email").focus(function(){
		if($("#emailOK").is(":visible") == true) $("#emailOK").hide();
		$("#emailTip").show();
	}).blur(function(){
		if($("#emailOK").is(":visible") == true)$("#emailTip").hide();
	});
	$("#password").focus(function(){
		if($("#passwordOK").is(":visible") == true) $("#passwordOK").hide();
		$("#passwordTip").show();
	}).blur(function(){
		if($("#passwordOK").is(":visible") == true)$("#passwordTip").hide();
	});
	$("#password2").focus(function(){
		if($("#password2OK").is(":visible") == true) $("#password2OK").hide();
		$("#password2Tip").show();
	}).blur(function(){
		if($("#password2OK").is(":visible") == true)$("#password2Tip").hide();
	});
	$("#weibo_login").click(function(){
		var win = render.popupWin("/weibo/login.do","",380,580);
		var intervalId=setInterval(function(){
			if(win.closed){
				clearInterval(intervalId);
				window.location.reload();
			}else if(win.weiboAuth=="success"){
				win.close();
				clearInterval(intervalId);
				window.location="/main/calendar.do";
			}
		},500);
	});
	$("#qh360_login").click(function(){
		var win = render.popupWin("https://openapi.360.cn/oauth2/authorize?client_id=0a4107ab27aa0f8a388d483f9a3d12c4&response_type=code&redirect_uri=http://www.365rili.com/qh360/callback.do&scope=basic&state=weblogin&display=desktop","",420,580);
		var intervalId=setInterval(function(){
			if(win.closed){
				clearInterval(intervalId);
				window.location.reload();
			}else if(win.qh360auth == "success"){
				win.close();
				clearInterval(intervalId);
				window.location="/main/calendar.do";
			}
		},500);
	});
	$("#qqt_login").click(function(){
		var win = render.popupWin("/qt/login.do","",820,900);
		var intervalId=setInterval(function(){
			if(win.closed){
				clearInterval(intervalId);
				window.location.reload();
			}else if(win.qqtAuth=="success"){
				win.close();
				clearInterval(intervalId);
				window.location="/main/calendar.do";
			}
		},500);
	});
	$("#qqz_login").click(function(){
		var win = render.popupWin("/qz/login.do","",380,580);
		var intervalId=setInterval(function(){
			if(win.closed){
				clearInterval(intervalId);
				window.location.reload();
			}else if(win.qqzAuth=="success"){
				win.close();
				clearInterval(intervalId);
				window.location="/main/calendar.do";
			}
		},500);
	});
});
</script>
</head>
<%
String error = request.getParameter("error");
String info = "";
if(error!=null)
{
    if(error.equals("1")) info = "验证码错误";
    if(error.equals("2")) info = "您两次输入的密码不一致";
    if(error.equals("3")) info = "密码长度为6-20位";
    if(error.equals("4")) info = "注册失败";
    if(error.equals("5")) info = "邮箱格式有误";
    if(error.equals("6")) info = "该邮箱地址已被占用";
}
String invitationCode = request.getParameter("invitationCode");
if(invitationCode == null) {
	invitationCode = "-1";
}
%>
<body>
<div id="page">
	<jsp:include page="/v3/header.jsp" flush="true" />
	<div class="regContent">
		<div class="infoBoxReg" onkeydown="if(event.keyCode==13){formSubmiter.regPageSubmit()}">
			<div style="width:480px; height:480px; float:left;">
				<div style="position: absolute; left:0px; top:150px; width:258px; height:163px;">
					<img src="/v3/images/login/cloud_reg.png" width="258" height="163">
				</div>
				<div style="position: absolute; left:90px; top:260px; width:358px; height:163px; color:#FFF; font-size:18px; line-height:32px;">
					<div style="font-weight:bold; margin-left:-30px;">注册账号以后可以：</div>
					1、云端存储日程，任意设备同步，永不丢失<br />
					2、加入小组日历，多人共享日程，轻松写意<br />
					3、百度微博腾讯，各自账号登录，无缝对接<br />
				</div>
				<div style="color:#FFF;  text-shadow:0px 1px 1px #333;font-size:16px; padding-left:51px; padding-top:11px;position: absolute; left:735px; top:125px; width:258px; height:163px;">
					已经有账号？
				</div>
				<a style="text-decoration: none;" href="/account/login.do">
					<div style="color:#FFF; font-size:14px; padding-left:10px; padding-top:4px; text-shadow:0px 1px 1px #333; font-weight:bold; left:890px; top:128px; width:79px; height:28px;position: absolute; background:url(/v3/images/login/regbutton_bg.png) no-repeat;">
					立即登录
					</div>
				</a>
			</div>
			<div class="regshadow" style="position: absolute; left:522px; top:90px; font: normal 49px '微软雅黑'; color: #b0d3e8">注册</div>
			<div class="regshadow" style="position: absolute; left:622px; top:121px; font: normal 22px '微软雅黑'; color: #b0d3e8"></div>
			<div style="position: absolute;width:529px; height:13px; overflow:hidden; left:500px; top:156px;">
				<img src="/v3/images/login/title_line.png" width="529" height="13"/>
			</div>
			<form id="registerActionForm" name="registerActionForm" action="/account/registerAction.do" method="post" autoComplete="off" >
			<div id="register" style="width: 500px; float:left;	margin:100px 10px 10px 32px">
	            <%if("" != info) {%>
	            <div class="tips" style="padding-left:16px;color:red;font-size:12px;background:url(/images/cal365_default/invalid.gif) no-repeat 0 50%;"><%=info%></div>
	            <%} %>
				<div class="regline">
					<div class="regtext regshadow">用户名</div>
					<div class="reginput">
						<input class="regTextBox" id="username" name="username" onfocus="checkInput.showTip(this)" onblur="checkInput.checkUsername()" maxlength="20"/>
					</div>
					<div id="usernameOK" class="inputOK"></div>
					<div id="usernameTip" class="reginfo"><p>&nbsp;</p></div>
				</div>
				
				<div class="regline">
					<div class="regtext regshadow">电子邮件</div>
					<div class="reginput">
	                 		<input id="email" name="email" class="regTextBox" onfocus="checkInput.showTip(this)" onblur="checkInput.checkEmail(this)"/> 
					</div>
					<div id="emailOK" class="inputOK"></div>
     		        <div id="emailTip" class="reginfo"><p>&nbsp;</p></div>
				</div>

				<div class="regline">
					<div class="regtext regshadow">设置密码</div>
					<div class="reginput">
						<input class="regTextBox" type="password" id="password" name="password" onfocus="checkInput.showTip(this)" onblur="checkInput.checkPassword()"/>
					</div>
					<span id="passwordOK" class="inputOK"></span>
					<div id="passwordTip" class="reginfo"><p>&nbsp;</p></div>
				</div>
				<div class="regline">
					<div class="regtext regshadow">重复密码</div>
					<div class="reginput">
						<input class="regTextBox" type="password" id="password2" name="password2" onfocus="checkInput.showTip(this)" onblur="checkInput.checkPassword2()"/>
					</div>
					<span id="password2OK" class="inputOK"></span>
					<div id="password2Tip" class="reginfo"><p>&nbsp;</p></div>
				</div>
				
				<div class="regline">
					<div id="verifyCodeTip" class="tips"><p>&nbsp;</p></div>
					<div class="regtext regshadow">验证码</div>
					<div class="reginput1">
						<input class="regTextBox" style="width:93px;" name="verifyCode" id="verifyCode" maxlength="4" onfocus="checkInput.showTip(this)" onblur="checkInput.checkVerifyCode()"/>
					</div>
					<a href="javascript:refreshVerifyCode()"><img id="verifyCodeImg" src="/account/getVerifyCodeAction.do" alt="验证码" style="vertical-align:middle; margin:0 10px;"/>刷新</a>
				</div>
				<div class="regline">
					<input type="button" onclick="formSubmiter.regPageSubmit()" style="cursor:pointer;border:none;width:150px;height:72px;background:url(/v3/images/login/bt_reg.png) no-repeat transparent; margin-left:76px"/>
				</div>
				<div class="regline" style="margin-top:-20px;">
					<div class="regtext regshadow" style="width:400px">
						<div style="float:left; margin-left: 15px;">其他账号</div>
						<div>
						<img id="weibo_login" alt="" style="float:left;cursor:pointer; margin-left:10px;" src="/v3/images/login/id_weibo.png"/>
						<img id="qqt_login" alt="" style="float:left;cursor:pointer; margin-left:10px;" src="/v3/images/login/id_qq3.png"/>
						<img id="qqz_login" alt="" style="float:left;cursor:pointer; margin-left:10px;" src="/v3/images/login/id_qzone.png"/>
						</div>
						<div style="margin-top:35px;">
						<img id="bd_login" alt="" style="float:left;cursor:pointer; margin-left:90px;" src="/v3/images/login/id_baidu.png"/>
						<img id="qh360_login" alt="" style="float:left;cursor:pointer; margin-left:10px;" src="/v3/images/login/id_360.png"/>
						</div>
					</div>
				</div>
			</div>
			<input type="hidden" id="invitationCode" name="invitationCode" value="<%=org.apache.commons.lang.StringEscapeUtils.escapeJavaScript(invitationCode)%>" />
			</form>
		</div>
	</div>
	<div id="footer" style="margin-top: 30px; position:relative; float:left;">
		<jsp:include page="/v3/copyright.jsp" flush="true" />
	</div>
</div>
</body>
</html>