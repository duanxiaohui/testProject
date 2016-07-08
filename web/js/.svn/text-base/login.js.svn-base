
function isPCVersion(){
	if ($.browser.webkit && typeof(js365) !== "undefined") {
		return true;
	}
	return false;
}

if (isPCVersion()) {
	$(document.documentElement).removeClass('web').addClass('pc');
	js365.runScriptMainBackgroundWnd('Cmd.login();');
}
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}
$(function(){
	var opt = getURLParameter('opt');
	if(opt == 'noregist'){
		$('#lnk_to_reg').hide();
		$('<input type="hidden" name="opt" value="noregist">').appendTo('#form_login');
	}
	$("#bd_login").click(function(){
		bd_loginOrAuth();
	});
	$("#weibo_login").click(function(){
		var win = open("/weibo/login.do", "", 'width=380,height=580');
		var intervalId = setInterval(function(){
			if (win.closed) {
				clearInterval(intervalId);
				window.location.reload();
			} else if (win.weiboAuth == "success") {
				win.close();
				clearInterval(intervalId);
				window.location = "/main/calendar.do";
			}
		}, 500);
	});
	$("#qh360_login").click(function(){
		var win = open("https://openapi.360.cn/oauth2/authorize?client_id=0a4107ab27aa0f8a388d483f9a3d12c4&response_type=code&redirect_uri=http://www.365rili.com/qh360/callback.do&scope=basic&state=weblogin&display=desktop", "", 'width=470,height=580');
		var intervalId = setInterval(function(){
			if (win.closed) {
				clearInterval(intervalId);
				window.location.reload();
			} else if (win.qh360auth == "success") {
				win.close();
				clearInterval(intervalId);
				window.location = "/main/calendar.do";
			}
		}, 500);
	});
	$("#qqt_login").click(function(){
		var win = open("/qt/login.do", "", 'width=820,height=900');
		var intervalId = setInterval(function(){
			if (win.closed) {
				clearInterval(intervalId);
				window.location.reload();
			} else if (win.qqtAuth == "success") {
				win.close();
				clearInterval(intervalId);
				window.location = "/main/calendar.do";
			}
		}, 500);
	});
	$("#qqz_login").click(function(){
		var win = open("/qz/login.do", "", 'width=380,height=580');
		var intervalId = setInterval(function(){
			if (win.closed) {
				clearInterval(intervalId);
				window.location.reload();
			} else if (win.qqzAuth == "success") {
				win.close();
				clearInterval(intervalId);
				window.location = "/main/calendar.do";
			}
		}, 500);
	});
});

$.widget('mxx.placeholder', {
	options: {
		attr: 'placeholder'
	},
	_create: function(){
		var self = this, $elem = $(this.element), opt = this.options;
		this.holdText = $elem.attr(opt.attr);
		this.holder = $elem.parent().find('label').text(this.holdText).show();
		
		$elem.on('keyup', function(){
			var $ipt = $(this), val = $ipt.val();
			if (val) {
				self.holder.hide();
			} else {
				self.holder.show();
			}
		});
	}
});

$(function(){
	var $form = $('#form_login'), $imgVerify = $('#img_verify'), $hint = $('#div_hint');
	function showHint(text, target){
		$hint.text(text).prependTo($form.find(':input[name="' + target + '"]').focus().select().one('keypress', function(){
			$hint.hide();
		}).parent()).show();
	}
	if ($.browser.msie && $.browser.version < 10) {
		$form.find('input[placeholder]').placeholder();
	}
	$form.find('input[name="verifyCode"]').focus(function(){
		if (!$imgVerify.is(':visible')) {
			$imgVerify.show();
			refreshVerifyCode()
		}
	});
	var $iptUname = $form.find(':input[name="username"]').blur(function(){
		if ($('#div_box').hasClass('reg_box')) {
			var $ipt = $(this), username = $.trim($ipt.val()), $hint = $('#div_hint');
			$ipt.val(username);
			$ipt.removeClass('suc');
			if (username) {
				if (username.length < 4 || username.length > 20) {
					showHint('用户名长度应在4至20位之间', 'username');
					return false;
				} else {
					$.ajax({
						type: 'post',
						url: '/account/checkUsernameAction.do',
						data: {
							'username': username
						},
						success: function(response){
							if ('usernameExist' == response.state) {
								showHint('该用户名已被占用', 'username');
							} else if ('success' == response.state) {
								$hint.text('').hide();
								$ipt.addClass('suc');
							} else if ('emptyUsername' == response.state) {
								showHint('用户名不能为空', 'username');
							} else if ('invalid_username' == response.state) {
								showHint('用户名不能含有特殊字符', 'username');
							} else {
								//showHint('系统异常,暂时无法提供服务', 'username');
							}
						}
					});
				}
			}
		}
	});
	var $iptEmail = $form.find(':input[name="email"]').blur(function(){
		if ($('#div_box').hasClass('reg_box')) {
			var $ipt = $(this), email = $.trim($ipt.val()), $hint = $('#div_hint');
			$ipt.val(email);
			$ipt.removeClass('suc');
			if (email) {
				var rEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if (!rEmail.test(email)) {
					showHint('请填写正确电子邮件帐号', 'email');
				} else {
					$.ajax({
						type: 'post',
						url: '/account/checkEmailAction.do',
						data: {
							'email': email
						},
						success: function(response){
							if ('emailExist' == response.state) {
								showHint('对不起,该邮箱地址已被占用', 'email');
							} else if ('success' == response.state || 'emptyEmail' == response.state) {
								$hint.text('').hide();
								$ipt.addClass('suc');
							} else if('invalid_email' == response.state) {
								showHint('对不起，该邮箱地址不合法', 'email');
							}
						}
					});
				}
			}
		}
	});
	
	$imgVerify.click(refreshVerifyCode);
	
	if ($.browser.msie && $.browser.version < 7) {
		$('#div_ie6,#div_ie6_content').removeClass('none');
	}
	function switchForm(type){
		$form.find('label.ph-label').show();
		$form[0].reset();
		$('#div_hint').hide();
		$iptUname.removeClass('suc');
		if (type == 'lnk_to_reg') {
			$('#div_box').addClass('reg_box');
			if (isPCVersion()) {
				js365.runScriptMainBackgroundWnd('Cmd.reg();');
			}
		} else {
			$('#div_box').removeClass('reg_box');
			if (isPCVersion()) {
				js365.runScriptMainBackgroundWnd('Cmd.login();');
			}
		}
		$iptUname.focus();
	}
	$('#lnk_to_reg,#lnk_to_login').click(function(evt){
		evt.preventDefault();
		switchForm($(this).attr('id'));

	});
	var toPage = $.query('page');
	if (toPage == 'register') {
		$('#lnk_to_reg').click();
	}
	
	$('#lnk_login, #lnk_reg').click(function(evt){
		evt.preventDefault();
		$form.submit();
	});
	
	$form.submit(function(evt){
		var isReg = $('#div_box').hasClass('reg_box');
		if(isReg){
			$form.attr("action", "/account/registerAction.do");
		}else{
			$form.attr("action", "/account/loginAction.do");
		}		
		return doPost.call(this, isReg);		
	});
	
	if(G.error != "null"){
		if(G.type == "register"){
			$form.find('label.ph-label').show();
			$('#div_box').addClass('reg_box');
			
			if (G.error == '1') {
				showHint('验证码输入错误', 'verifyCode');
				$form.find(':input[name="verifyCode"]').focus().select();
			} else if (G.error == '2') {
				showHint('两次输入的密码不一致', 'password');
				$form.find(':input[name="password"],:input[name="password2"]').val('').first().focus();
			} else if (G.error == '3') {
				showHint('密码长度应在6至20位之间', 'password');
				$form.find(':input[name="password"],:input[name="password2"]').val('').first().focus();
			} else if (G.error == '5') {
				showHint('Email格式不正确', 'email');
				$form.find(':input[name="email"]').focus().select();
			} else if (G.error == '6') {
				showHint('该邮箱地址已被占用', 'email');
				$form.find(':input[name="email"]').focus().select();
			} else if (G.error == '4') {
				showHint('该用户名已被占用', 'username');
				$form.find(':input[name="username"]').focus().select();
			} else if (G.error == '7') {
				showHint('用户名不能含有特殊字符', 'username');
				$form.find(':input[name="username"]').focus().select();
			}
		}else{
			if(G.error == "1"){
				showHint('验证码输入错误', 'verifyCode');
				//refreshVerifyCode();
				$form.find(':input[name="verifyCode"]').focus().select();
			}else if(G.error == "2" || G.error == "3"){
				showHint('用户名或密码不正确', 'username');
				$form.find(':input[name="username"]').focus().select();
			}else{
				showHint('系统繁忙，请稍后再试', 'username');
				$form.find(':input[name="username"]').focus().select();
			}
		}
	}else{
		$iptUname.focus();		
	}
});

function refreshVerifyCode(){
	$('#img_verify').attr('src', "/account/getVerifyCodeAction.do?" + Math.random());
}

function doPost(isReg){
	var $form = $(this), $hint = $('#div_hint'), pData = {};
	$.each($form.serializeArray(), function(el, o){
		pData[o.name] = o.value;
	});
	function showHint(text, target){
		$hint.text(text).prependTo($form.find(':input[name="' + target + '"]').focus().select().one('keypress', function(){
			$hint.hide();
		}).parent()).show();
	}
	$form.find(':input[name="username"]').val(pData.username = $.trim(pData.username));
	if (!pData.username) {
		showHint(isReg ? '请输入用户名' : '请输入邮箱或用户名', 'username');
		return false;
	}
	if (isReg) {
		if (pData.username.length < 4 || pData.username.length > 20) {
			showHint('用户名长度应在4至20位之间', 'username');
			return false;
		}
		if (pData.username.match(/[`,\.;\/\\'" \t\r\n<>\?~!@#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig)) {
			showHint('用户名不能含有特殊字符', 'username');
			return false;
		}
		$form.find(':input[name="email"]').val(pData.email = $.trim(pData.email));
		if (!pData.email) {
			showHint('请输入邮箱', 'email');
			return false;
		}
		var rEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if (!rEmail.test(pData.email)) {
			showHint('请填写正确电子邮件帐号', 'email');
			return false;
		}
	}
	if (!pData.password) {
		showHint('请输入密码', 'password');
		return false;
	}
	if (pData.password.length < 6 || pData.password.length > 20) {
		showHint('密码长度应在6至20位之间', 'password');
		return false;
	}
	if (isReg) {
		if (!pData.password2) {
			showHint('请输入确认密码', 'password');
			return false;
		}
		if (pData.password2 != pData.password) {
			showHint('两次输入的密码不一致', 'password');
			return false;
		}
	}
	if (!pData.verifyCode) {
		showHint('请输入验证码', 'verifyCode');
		return false;
	}
	if (pData.verifyCode.length != 4) {
		showHint('请检查验证码', 'verifyCode');
		return false;
	}
	if (!isReg) {
		$form.find("#save").val($form.find('input[name="chk_save"]').prop('checked'));
		$form.find("#elem_password").val(hex_md5(pData.password));
	}
}
