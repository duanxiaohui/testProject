function focusUserInput(){
		if($("#username").val().length<=0||$("#username").val()=="请输入用户名"){
			$("#username").val("");
			$("#username").css("color","#000");
		}
	}
	
	function blurUserInput(){
		if($("#username").val().length<=0){
			$("#username").val("请输入用户名");
			$("#username").css("color","#999");
		}
	}
	
	function focusPassInput(){
		if($("#pass").val().length<=0||$("#password_text").val()=="请输入密码"){
			$("#pass").css("display","block").css("color","#000").focus();
			$("#password_text").css("display","none");
		}
	}
	
	function blurPassInput(){
		if($("#pass").val().length<=0){
			$("#pass").css("display","none").val("");
			$("#password_text").css("display","block");
		}
	}
	
function refreshVerifyCode() {
		$('#verifyCodeImg').attr('src',"http://www.365rili.com/account/getVerifyCodeAction.do?" + Math.random());
	}
	
	function postUserLogin() {
		var _form = $('#userLoginForm')[0];

		var _params = {};

		// 准备登录数据
		//_params.login = 'true';
		_form.username.value = $.trim(_form.username.value);
		//if (_form.remember.checked) {
		//	_form.save.value = 'true';
		//}
		//else
		//{
		_form.save.value = 'false';
		//}

		if (!_form.username.value) {
			$('.errorInfo').text('请输入邮箱或用户名');
			return;
		}
		if (!_form.pass.value) {
			$('.errorInfo').text('请输入密码');
			return;
		}
		if (!_form.verifyCode.value) {
			$('.errorInfo').text('请输入验证码');
			return;
		}

		// 密码加密
		_form.password.value = hex_md5(_form.pass.value);
		_form.submit();
	}
	
	$(document).ready(function(){	
		$("#weibo_login").click(function(){		
			var win = render.popupWin("/weibo/login.do","",380,580);		
			var intervalId=setInterval(function(){			
				if(win.closed){				
					clearInterval(intervalId);				
					window.location.reload();			
				}else if(win.weiboAuth=="success"){
					win.close();				
					clearInterval(intervalId);				
					window.location="/account/userInfo.do";			
				}		
			},500);
		});
		$(document).bind("keyup", function(e){
			if(e !=null && e.keyCode == 13)
				postUserLogin();
		})
	});