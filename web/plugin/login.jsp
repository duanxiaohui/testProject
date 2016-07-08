<%@ page contentType="text/html;charset=utf-8" %>

<HTML>
<script type="text/javascript" src="/js/jquery/jquery-1.6.1.min.js"></script>
<script type="text/javascript" src="/js/md5.js"></script>

<link rel="stylesheet" type="text/css" href="plugin.css" />



<style type="text/css">
.inputItem {
    height:29px;
    line-height:29px;
    margin:20px 0;
}
.errorInfo {
    color:red;
    font:normal 12px 宋体,serif;
    padding-left:110px;
    background:url(/images/cal365_default/err_icon.png) 90px 50% no-repeat;
}
</style>
<script type="text/javascript" >
function postUserLogin() 
{
    var _form = $('#userLoginForm')[0];

    var _params = {};

    // 准备登录数据
    //_params.login = 'true';
    _form.username.value = $.trim(_form.username.value);
    if (_form.remember.checked) {
        _form.save.value = 'true';
    }
    else
    {
        _form.save.value = 'false';
    }

    if (!_form.username.value) {
        $('.errorInfo').text('请输入邮箱或用户名');
        return;
    }
    if (!_form.pass.value) {
        $('.errorInfo').text('请输入密码');
        return;
    }

    // 密码加密
    _form.password.value = hex_md5(_form.pass.value);
    _form.submit();
}
</script>

<%
String error = request.getParameter("error");
String info = "&nbsp;&nbsp;";
if(error!=null)
{
    if(error.equals("1")) info = "验证码错误";
    if(error.equals("2")) info = "用户不存在";
    if(error.equals("3")) info = "密码错误";
}

%>
	<body style="border:0px;padding:0px;margin:0px">
		<div id="plugin_main">
            <div class="plugin-dialog-hd plugin-dialog-hd-closable">
                <span class="plugin-dialog-title"><img align="absmiddle" alt="图片" src="/plugin/logo.gif"> 登录365日历           
                </span>
                                <a class="plugin-dialog-close" href="/plugin/closePlugin.html">X</a>
            </div>
			<div id="content" class="plugin-dialog-bd">
				 <form id="userLoginForm" method="post" action="/account/loginAction4Plugin.do"  class="plugin-dialog-form">
                    <div class="row plugin-dialog-error">
                        <div class="row-hd"></div>
                        <div class="row-bd">
                        <span name="infoDiv" id="infoDiv" class="plugin-dialog-highlight"><%=info%></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-hd"><label for="user">用户名</label></div>
                        <div class="row-bd">
                                                    <input type="text" name="username" id="user" style="color:#aaaaaa" class="plugin-dialog-text" tabindex="1">
                                                    <a target="_blank" href="/account/register.do">现在注册？</a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-hd"><label for="pass">密&nbsp;&nbsp;码</label></div>
                        <div class="row-bd">
                            <input type="password" name="pass" id="pass" class="plugin-dialog-text" tabindex="2">
                            <!-- <a target="_blank" href="">忘记密码</a> -->
                        </div>
                    </div>
                    <div class="row">
                        <div class="row-hd"></div>
                        <div class="row-bd">
                            <label for="rem"><input type="checkbox" checked="true" name="remember" id="rem">自动登录</label>
                        </div>
                    </div>
                         
                    <div class="row btns-row">
                        <input onclick="postUserLogin()" type="submit" value="登 录" name="loginbtn" id="loginbtn" class="plugin-dialog-btn">      
                     </div>

					 <input id="password" name="password" type="hidden"/>
					<input id="save" name="save" type="hidden"/>
                </form>
            </div>
			<div class="plugin-dialog-ft">
               
            </div>
        </div>
	</body>
</HTML>
 
