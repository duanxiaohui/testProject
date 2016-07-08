<%@ page contentType="text/html;charset=utf-8" %>
<%@ page import="com.rili.common.beans.User" %>
<% User u = (User)request.getAttribute("user");
	boolean hasEmail = u.getEmail() != null;
	boolean activate  = (Boolean)(request.getAttribute("activate"));
	java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yyyy/MM/dd HH:mm:ss"); 
	java.util.Date currentTime = new java.util.Date();
	String currDate = formatter.format(currentTime);
	String needBind = (String)request.getAttribute("needBind");
	needBind = needBind == null || needBind == "" ? ""  : needBind;
%><!DOCTYPE HTML>
<html class="web">
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
<link href="/css/calendar1.css" rel="stylesheet">
<link href="/css/jquery-ui-1.9.2.custom.min.css" rel="stylesheet">
<title>365日历 </title>
<style type="text/css">
html{padding-top:30px;}
.calendar_header{margin-top:-30px;}
</style>
<script type="text/javascript">
    var G = {
        currUser: {
            "id": "<%=u.getUserId()%>",
            "username": "<%=u.getUsername() %>",
            "email": "<%=u.getEmail() %>"
        },
        needBind: "<%=needBind%>",
        currDate: new Date("<%=currDate%>")
    };
</script>
<script>
	if(typeof(js365) != "undefined"){
		document.documentElement.className = "pc";
	}
</script>
</head>
<body>
<div class="calendar_header">
		<div class="header_set">
			<a href="/account/logout.do" class="sign_out_btn"></a>
			<i>|</i>
			<a href="/account/manage.do" class="calendar_site"></a>
		</div>
		<div class="user_info">
			<a href="/" class="return_btn"></a>
			<span id="sp_user_info"></span>
		</div>
	</div>
<div class="calendar_info_page">
	<a href="/main/calendar.do" class="return_calendar">返回日历</a>
	<h2>账号设置</h2>
</div>
	<div id="div_tab" class="user_main" >
		<ul class="user_left">
			<li><a href="#basic_info" hidefocus="true">基本信息</a></li>
			<li><a href="#safe_setting" hidefocus="true">安全设置</a></li>
			<li><a href="#coo_acc" hidefocus="true">合作账号</a></li>
			<li><a href="#system_settings" hidefocus="true">系统设置</a></li>
			<li><a href="#quit">安全退出</a></li>
		</ul>
		<div id="basic_info" class="user_right none" style="">
			<div class="acc_info">
				<div class="acc_info_content" style="background:#fafafc;min-width:880px;">
					<dl>
						<dt>注册账号：</dt>
						<dd><div class="input_box account" id="username" title="<%=u.getUsername()%>"  val="<%=u.getUsername()%>"><%=u.getUsername()%></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>电子邮件：</dt>
						<dd><div class="input_box"><input type="text" id="safe_email" class="none" placeholder="强烈建议您填写邮箱，方便您找回密码" value="<%= hasEmail ? u.getEmail() : "" %>"/><span class="email_txt"><%= hasEmail ? u.getEmail() : "" %></span><a href="javascript:;" class="edit_email_btn">修改绑定邮箱</a></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl class="setpassword none">
						<dt>365密码：</dt>
						<dd><div class="input_box"><input type="password" id="password365" placeholder="请输入你的365日历密码"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<a href="javascript:;" class="edit_password_save_btn" id="lnk_save_email">保存</a>
					<p class="note_txt">*注：绑定邮箱，可快速找回密码。还可以用绑定邮箱登陆！</p>
				</div>
			</div>
		</div>
		
		<div id="safe_setting" class="user_right none">
			<div class="acc_info"><h2>修改密码</h2></div>
			<div class="edit_password">
				<dl class="e_clear">
					<dt>原始密码：</dt>
					<dd><div class="input_box"><input type="password" id="pwd_oripwd"/></div><div class="password_wrong none"></div></dd>
				</dl>
				<dl>
					<dt>新密码：</dt>
					<dd><div class="input_box"><input type="password" id="pwd_newpwd"/></div><div class="password_wrong none"></div></dd>
				</dl>
				<dl>
					<dt>重复密码：</dt>
					<dd><div class="input_box"><input type="password" id="pwd_rptpwd"/></div><div class="password_wrong none"></div></dd>
				</dl>
				<a href="javascript:;" id="lnk_save_pwd" class="edit_password_save_btn">保存</a>
			</div>
		</div>
		
		<div id="system_settings">
			<div class="calendar_setting" style="background:#fafafc;min-width:880px;">
				<h2>日历设置</h2>
				<div class="acc_info_content">
					<dl>
						<dt>周首日：</dt>
						<dd>
							<label><input type="radio" name="first_day_week" checked="checked" class="first_day" id="first_day_monday" value="monday" style="width:20px;height:15px;"/><span>周一</span></label>
							<label><input type="radio" name="first_day_week" class="first_day" value="sunday" id="first_day_sunday" style="width:20px;height:15px;" /><span>周日</span></label>
						</dd>
					</dl>
				</div>
				<h2 class="alam_h">提醒设置</h2>
				<div class="acc_info_content">
					<dl>
							<dt>提醒开关：</dt>
							<dd>
								<label><input type="radio" name="notification_setting" class="notification_setting" checked="checked" style="width:20px;height:15px;" value="true" /><span>开</span></label>
								<label><input type="radio" name="notification_setting" class="notification_setting" style="width:20px;height:15px;" value="false" /><span>关</span></label>
							</dd>
						</dl>
				 </div>
			</div>
		</div>
		
		<div id="coo_acc">
			<div id="div_third_accouts" class="third_party_acc_admin" style="background:#fafafc;min-width:980px;">
				<h2>第三方账号管理</h2>
				<dl partner="google" enable="true" allowBind="true" load="/getGoogle.do" bind="/google-account-bind-web.do;;width=347,height=530" unbind="/removeGoogleBind-web.do">
					<dt><img src="/images/cal365_default/google_icon2.png"/></dt>
					<dd class="mail_explain">Google账号</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="weibo" enable="true" allowBind="false" load="/weibo/getWeibo.do" bind="/weibo/bind-weibo.do;;width=380,height=580" unbind="/weibo/unbind-web.do" >
					<dt><img src="/images/cal365_default/weibologo_16x16.png"/></dt>
					<dd class="mail_explain">新浪微博</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="qqt" enable="true" allowBind="false" load="/qt/getQQT.do" bind="/qt/bind.do;;width=820,height=900" unbind="/qt/unbind-web.do">
					<dt><img src="/images/cal365_default/qqt_icon_16x16.png"/></dt>
					<dd class="mail_explain">腾讯QQ</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="baidu" enable="true" allowBind="false" load="/baidu/getBaidu.do" bind="/baidu/bind-reg.do" unbind="/baidu/unbind.do">
					<dt><img src="/images/cal365_default/baidu18x18.jpg"/></dt>
					<dd class="mail_explain">百度账号</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="qh360" enable="true" allowBind="false" load="/qh360/getQh360.do" bind="/qh360/bind-reg.do" unbind="/qh360/unbind.do">
					<dt><img src="/images/cal365_default/qh36016x16.png"/></dt>
					<dd class="mail_explain">360账号</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="qqz" enable="true" allowBind="false" load="/qz/getQQZ.do" bind="/qz/bind-365-reg.do" unbind="/qz/unbind-web.do">
					<dt><img src="/images/cal365_default/qqz_icon_16x16.png"/></dt>
					<dd class="mail_explain">QQ空间</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
				<dl partner="outlook" enable="false" allowBind="true" load="/outlook/getOutlook.do" bind="/outlook/bind-parm.do" unbind="/outlook/unbind-web.do">
					<dt><img src="/images/cal365_default/outlook_icon_18x18.png"/></dt>
					<dd class="mail_explain">outlook账号</dd>
					<dd class="mail_address"></dd>
					<dd class="mail_bind"><a href="javascript:;" class="js_bind"></a></dd>
				</dl>
			</div>
		</div>
		<div id="personal_info" class="user_right none">
			<div class="info_more">
				<h2>详细信息</h2>
				<div class="info_more_contnt">
					<dl>
						<dt>真实姓名：</dt>
						<dd><div class="username"><input type="text"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>所在地：</dt>
						<dd id="dd_location"><div class="input_box"><select></select><select></select></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>性别：</dt>
						<dd><div class="input_box"><label><input type="radio" name="gender" class="info_radio"/><span>男</span></label><label><input type="radio" name="gender" class="info_radio"/><span>女</span></label></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>生日：</dt>
						<dd><div class="input_box"><input type="text" id="ipt_birthday"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>联系邮箱：</dt>
						<dd><div class="input_box"><input type="text" value="<%=u.getEmail()%>"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>QQ：</dt>
						<dd><div class="input_box"><input type="text"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<dl>
						<dt>MSN：</dt>
						<dd><div class="input_box"><input type="text"/></div><div class="password_wrong none"></div></dd>
					</dl>
					<a href="javascript:;" id="lnk_save_personal" class="edit_password_save_btn">保存</a>
				</div>
			</div>
		</div>
	</div>

<script type="text/javascript" src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery-ui-1.9.2.custom.min.js"></script>
<script type="text/javascript" src="/js/newweb/common.js"></script>
<script type="text/javascript" src="/js/newweb/solarAndLunar.js"></script>

<script type="text/javascript" src="/js/setting.js?t=20140212"></script>

</body>
</html>