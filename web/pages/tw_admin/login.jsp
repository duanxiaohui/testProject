<%@ page contentType="text/html;charset=utf-8" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>团委后台-登录</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="/css/bootstrap.min.css" rel="stylesheet">
<style>
body{padding-top: 40px;padding-bottom: 40px;background-color: #eee;}
.form-signin {max-width: 330px;padding: 15px;margin: 0 auto;}
</style>
</head>
<body>
<div class="container">
	<form class="form-signin" action="/tuanwei/tw_loginAction.do" method="post">
		<h2>团委后台-登录</h2>
		<input type="text" class="form-control" name="username" placeholder="用户名" id="username"/>
		<input type="password" class="form-control" name="password" placeholder="密码" id="password"/>
		<p class="text-danger"></p>
		<button class="btn btn-lg btn-primary btn-block" id="login_btn">登录</button>
	</form>
</div>
<script src="/js/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
$(function() {
	$("#login_btn").on("click", function(evt){
		evt.preventDefault();
		var username = $("#username").val().trim();
		var pwd = $("#password").val().trim();
		if(username == ""){
			alert("请输入用户名");
			return false;
		}
		if(pwd == ""){
			alert("请输入密码");
			return false;
		}
		$(".form-signin").submit();
	});

	if(location.href.indexOf("error") > 0){
		$(".text-danger").html("用户名或密码错误");
	}
})
</script>
</body>
</html>