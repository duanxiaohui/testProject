String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
function selfClose(){
	window.parent.location.reload();
};
function turnOff(){
	window.parent.removeCover();
}

function bindEvent(){
	$("#btn_reg_cancle").click(function(){
		turnOff();
	});
	$(".input").focus(function(){
		$(this).parent().prev().html("");
	});
	
	$($("#div_reg").find("input")[0]).blur(function(){
		checkRegName($("#div_reg").find(".input")[0].value.Trim());
	});
	
	$($("#div_reg").find("input")[1]).blur(function(){
		checkPwd();
	});
	
	$($("#div_reg").find("input")[2]).blur(function(){
		checkPwdConfirm();
	});
	
	$("#btn_bind_reg").click(function(){
		var chkResult=check_reg();
		if(chkResult){
			bind_reg(
			chkResult.uname,
			chkResult.pwd,
			function(result){
				if(result != "success"){
					 $("#div_reg").find(".tip")[0].innerHTML="注册失败！";
				}else{
					selfClose();
				}
			});
		}
	});
}

var nameState="OK";
function checkRegName(uname){
	var regexp = /[`,\.;\/\\'" \t\r\n<>\?~!@#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig;
	
	if(uname.length==0){
		$("#div_reg").find(".tip")[0].innerHTML="请输入用户名！";
		nameState="ERR";
	}else if(uname.length<4 || uname.length>20){
		$("#div_reg").find(".tip")[0].innerHTML="用户名长度应在4至20位之间！";
		nameState="ERR";
	}else if(null != uname.match(regexp)){
		$("#div_reg").find(".tip")[0].innerHTML="用户名不能含有特殊字符！";
		nameState="ERR";
	}else {
		$("#div_reg").find(".tip")[0].innerHTML="";
		return communicator.checkUserName4Bind(uname,
		function(result){
			if(result.state == 'usernameExist'){
				$("#div_reg").find(".tip")[0].innerHTML="该名称已被占用！";
				nameState="ERR";
			}else if(result.state == 'success'){
				$("#div_reg").find(".tip")[0].innerHTML="";
				nameState="OK";
			}else if(result.state == 'emptyUsername'){
				$("#div_reg").find(".tip")[0].innerHTML="用户名不能为空！";
				nameState="ERR";
			}else{
				$("#div_reg").find(".tip")[0].innerHTML="对不起，系统异常，请稍后重试";
				nameState="ERR";
			}
		});
	}
}

var pwdState="OK";
function checkPwd(){
	var pwd=$("#div_reg").find(".input")[1].value.Trim();
	if(pwd.length==0){
		$("#div_reg").find(".tip")[1].innerHTML="请输入密码！";
		pwdState="ERR";
	}else if(pwd.length<6 || pwd.length>20){
		$("#div_reg").find(".tip")[1].innerHTML="密码长度应为6-20位！";
		pwdState="ERR";
	}else{
		$("#div_reg").find(".tip")[1].innerHTML="";
		pwdState="OK";
	}
}

var pwdConfirmState="OK";
function checkPwdConfirm(){
	var repwd=$("#div_reg").find(".input")[2].value.Trim();
	if(repwd!=$("#div_reg").find(".input")[1].value.Trim()){
		$("#div_reg").find(".tip")[2].innerHTML="两次密码输入不一致！";
		pwdConfirmState="ERR";
	}else{
		$("#div_reg").find(".tip")[2].innerHTML="";
		pwdConfirmState="OK";
	}
}

function check_reg(){
	checkPwd();
	checkPwdConfirm();
	if(nameState!="OK")
		return false;
	if(pwdState!="OK")
		return false;
	if(pwdConfirmState!="OK")
		return false;
	return {uname:$("#div_reg").find(".input")[0].value.Trim(),pwd:$("#div_reg").find(".input")[1].value.Trim()};
}

$(document).ready(function(){
	bindEvent();
});