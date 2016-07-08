/*
 * 事件处理句柄
 */
var eventHandlers={
	phoneNumber_click:function(){
		$('#warning').html("");
	},
	validate_click:function(){
		var phoneNumber=$("#phoneNumber").val();
		if(phoneNumber == null || phoneNumber.length < 4) {
			alert("您输入的手机号码不够4位");
			return;
		}
		ajaxSubmit.validate(phoneNumber, function(result){
			if(result.state=="ok"){
				window.location="/jsp/365share_calendar_bind.jsp";
			} else if(result.state=="nocode"){
				$('#warning').html("邀请码已失效，请重新进入");
			} else if(result.state=="nopn"){
				$('#warning').html("您输入的手机号码不够4位");
			} else if(result.state=="failed"){
				$('#warning').html("手机号码验证失败，请重新输入");
			}
		});
	},
	bind_field_click:function(){
		$('#warning_bind').html("");
	},
	bind_click:function(){
		var username = $("#username").val();
		var password = $('#password').val();
		if(username == null || username.length == 0) {
			alert("请您输入的您的用户名");
			return;
		} else if(password == null || password.length == 0) {
			alert("请您输入的您的密码");
			return;
		}
		
		ajaxSubmit.bind(username, hex_md5(password), function(result){
			if(result.state=="ok"){
				window.location = result.next;
			} else if(result.state=="nocode"){
				$('#warning_bind').html("邀请码已失效，请重新进入");
			} else if(result.state=="nopn"){
				$('#warning_bind').html("请您输入的您的用户名或密码");
			} else if(result.state=="failed"){
				$('#warning_bind').html("您输入的您的用户名或密码有误，请核对");
			}
		});
	},
	clearField:function(field){
		$('#'+field).val('');
	},
	reg_field_click:function(){
		$('#warning_reg').html("");
	},
	reg_click:function(){
		var newuser = $("#newuser").val();
		if(newuser == null || newuser.length < 4 || newuser.length > 20) {
			alert("请输入用户名(长度：4-20)");
			return;
		}
		var usernameReg = /[`,\.;\/\\'" \t\r\n<>\?~!@#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig;
		if(usernameReg.test(newuser)){
			alert("用户名不能含有特殊字符")
			return;
		}
		
		var email = $("#email").val();
		if(email == null || email.length == 0) {
			alert("请输入邮箱地址");
			return;
		}

		var emailReg = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(!emailReg.test(email)){
			alert("请输入有效的邮箱地址")
			return;
		}
		
		var newpass = $('#newpass').val();
		if(newpass == null || newpass.length < 6 || newpass.length > 20) {
			alert("请输入密码(长度：6-20)");
			return;
		}
		
		ajaxSubmit.reg(newuser, email, newpass, function(result){
			if(result.state=="ok"){
				window.location = result.next;
			} else if(result.state=="nocode"){
				$('#warning_reg').html("邀请码已失效，请重新进入");
			} else if(result.state=="noname"){
				$('#warning_reg').html("请输入用户名(长度：4-20)");
			} else if(result.state=="noemail"){
				$('#warning_reg').html("请输入有效的邮箱地址");
			} else if(result.state=="nopass"){
				$('#warning_reg').html("请输入密码(长度：6-20)");
			} else if(result.state=="userexist"){
				$('#warning_reg').html("您输入的您的用户名已被占用，请重新输入");
			} else if(result.state=="emailexist"){
				$('#warning_reg').html("您输入的您的email地址已注册，请重新输入");
			} else if(result.state=="failed"){
				$('#warning_reg').html("注册失败，请重试");
			}
		});
	},
	dl_click:function(type){
		if(type=="ios") {
			window.location = "http://itunes.apple.com/cn/app/id456880164";
		} else {
			window.location = "http://when.365rili.com/dl/android/Calendar365.apk";
		}
	},
	open_click:function(type, username) {
		if(type=="ios") {
			window.location = "rili365://sync?u="+username;
		} else {
			window.location = "http://i.365rili.com/sync?u="+username;
		}
	}
}

var ajaxSubmit={
	validate:function(phoneNumber,callback){
		$.ajax({
        	type: 'post',
            url: '/calendar/validate.do',
            data: {phoneNumber:phoneNumber},
            success: callback,
            dataType: 'json'
     	});
	},
	bind:function(username, password,callback){
		$.ajax({
        	type: 'post',
            url: '/calendar/bind.do',
            data: {username:username, password:password},
            success: callback,
            dataType: 'json'
     	});
	},
	reg:function(newuser, email, newpass, callback){
		$.ajax({
        	type: 'post',
            url: '/calendar/reg.do',
            data: {newuser:newuser,email:email, newpass:newpass},
            success: callback,
            dataType: 'json'
     	});
	}
}	

