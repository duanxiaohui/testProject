String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
var username;
var password;
var emailAddress;
var exchangeWSURL;
var verifyCode;
var checkInput = {
    usernameOK:false,
    passwordOK:false,
    emailAddressOK:false,
    checkUsername: function() {
        username = $('#username').val();
        $('#usernameOK').hide();
        if(0 == username.length) {
            $('#usernameTip p').addClass('fieldError').text('请输入用户名');
            this.usernameOK = false;
            return false;
        } 
        var regexp = /[`,;\/\\'" \t\r\n<>\?~!#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig;
        if(null != username.match(regexp)) {
            $('#usernameTip p').addClass('fieldError').text('用户名不能含有特殊字符');
            this.usernameOK = false;
            return false;
        }
        else {
        	this.usernameOK = true;
        	$('#usernameTip p').removeClass('fieldError').text('');
        	$('#usernameOK').show();
        	return true;
        }
    },
    checkPassword: function() {
        password = $('#password').val();
        $('#passwordOK').hide();
        if(0 == password.length) {
            $('#passwordTip p').addClass('fieldError').text('请输入密码');
            this.passwordOK = false;
            return false;
        } 
        else {
        	this.passwordOK = true;
        	$('#passwordTip p').removeClass('fieldError').text('');
        	$('#passwordOK').show();
        	return true;
        }
    },    
    checkEmail: function() {
    	emailAddress = $('#emailAddress').val();
        var regexp = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(0 == emailAddress.Trim().length || !regexp.test(emailAddress)) {
            $('#emailAddressOK').hide();
            $('#emailAddressTip p').addClass("fieldError").text('请输入有效的邮箱地址').show();
            this.emailAddressOK = false;
            return false;
        }
        else {
        	this.emailAddressOK = true;
        	$('#emailAddressTip p').removeClass('fieldError').text('');
        	$('#emailAddressOK').show();
        	return true;
        }
    },
    checkExchangeWSURL: function() {
    	exchangeWSURL = $('#exchangeWSURL').val();
    	if(exchangeWSURL == null) {
    		exchangeWSURL = "";
    	}
        $('#exchangeWSURLTip p').removeClass('fieldError').text('');
        return true;
    },
    checkVerifyCode: function() {
    	verifyCode = $('#verifyCode').val().Trim();
        if(verifyCode.length < 4) {
            $('#verifyCodeTip p').addClass('fieldError').text('请输入验证码');
            return false;
        } else {
            $('#verifyCodeTip p').removeClass('fieldError').text('');
            return true;
        }
    },
    showTip:function(field) {
        $('#' + field.name + 'Tip p').removeClass('fieldError');
        if (field.name == 'emailAddress') {
            $('#emailAddressTip p').text('请输入您的Outlook邮箱');
        } else if (field.name == 'username') {
            $('#usernameTip p').text('请输入您的Outlook账户的用户名');
        } else if (field.name == 'password') {
            $('#passwordTip p').text('请输入您的Outlook账户的密码');
        } else if (field.name == 'exchangeWSURL') {
            $('#exchangeWSURLTip p').text('请输入您的Outlook Web服务地址（可选 ）');
        } else if(field.name=='verifyCode') {
            $('#verifyCodeTip p').text('请输入下面图片中的数字');
        } 
    }
};

var formSubmiter = {
		outlookBindPageSubmit: function() {
			with(checkInput) {
				checkEmail();
				if(emailAddressOK && checkUsername() && checkPassword() && checkExchangeWSURL() && checkVerifyCode()) {
					var parm = new Object();
					parm.username = username;
					parm.password = password;
					parm.emailAddress = emailAddress;
					parm.exchangeWSURL = exchangeWSURL;
					parm.verifyCode = verifyCode;
					var cover = render.cover();
					render.googleSync();
					communicator.bindOutlook(parm, function(result){
						if(result.state_bind=="ok"){
							window.location='/main/calendar.do';
						}else{
							var info;
							if(result.error == "1") {
								info = '验证码错误';
							} else if(result.error == "2") {
								info = '绑定Outlook账号失败，请联系365rili.com';
							} else if(result.error == "3") {
								info = '绑定Outlook账号失败，请检查您的Email地址，并设置Outlook Web服务地址';
								$('#manualInputUrl').removeClass('hidden');
								$('#exchangeWSURL').focus();
							} else if(result.error == "4") {
								info = '绑定Outlook账号失败，请检查您的Outlook Web服务地址"';
								$('#manualInputUrl').removeClass('hidden');
								$('#exchangeWSURL').focus();
							}; 
							$('#errorInfo').removeClass('hidden').text(info);
							$('#verifyCodeImg').attr('src',"/account/getVerifyCodeAction.do?" + Math.random());
							$('#verifyCode').val('');
							render.removeGoogleSync();
							render.removeCover();
						}
					},
					function(xhr) {
						$('#errorInfo').removeClass('hidden').text("Outlook服务暂时不可以，请稍候再试。给您造成的不便，我们深表歉意！");
						$('#verifyCodeImg').attr('src',"/account/getVerifyCodeAction.do?" + Math.random());
						$('#verifyCode').val('');
						render.removeGoogleSync();
						render.removeCover();
					}
					);
				}
			}
		}
};

//trim方法
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
}