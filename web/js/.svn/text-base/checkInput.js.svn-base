String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
};
var checkInput = {
    emailOK:true,
    usernameOK:false,
    oldpasswordOK:true,
    checkUsername: function() {
        var username = $('#username').val();
        if(0 == username.length) {
            $('#usernameOK').hide();
            $('#usernameTip p').addClass('fieldError').text('请输入用户名');
            this.usernameOK = false;
            return false;
        } else if(username.length < 4 || username.length > 20) {
            $('#usernameOK').hide();
            $('#usernameTip p').addClass('fieldError').text('用户名长度应在4至20位之间');
            this.usernameOK = false;
            return false;
        }
        var regexp = /[`,\.;\/\\'" \t\r\n<>\?~!@#\$%\^&\*\(\)\[\]\{\}\+\-\|]/ig;
        if(null != username.match(regexp)) {
            $('#usernameTip p').addClass('fieldError').text('用户名不能含有特殊字符');
            this.usernameOK = false;
            return false;
        }
        $.ajax({
            type:'post',
            url:'/account/checkUsernameAction.do',
            data:{'username':username},
            async:false,
            success: function(response) {
                checkInput.usernameOK = false;
                if('usernameExist' == response.state) {
                    $('#usernameOK').hide();
                    $('#usernameTip p').addClass('fieldError').text('对不起,该用户名已被占用');
                    return false;
                } else if('success' == response.state){
                    $('#usernameTip p').removeClass('fieldError').text('');
                    $('#usernameOK').show();
                    checkInput.usernameOK = true;
                    return true;
                } else if('emptyUsername' == response.state) {
                    $('#usernameOK').hide();
                    $('#usernameTip p').addClass('fieldError').text('用户名不能为空');
                    return false;
                } else if('invalid_username' == response.state) {
                    $('#usernameOK').hide();
                    $('#usernameTip p').addClass('fieldError').text('用户名不能含有特殊字符');
                    return false;
                } 
                else {
                    $('#usernameOK').hide();
                    $('#usernameTip p').addClass('fieldError').text('系统异常,暂时无法提供服务');
                    return false;
                }
            }
        });
    },
    checkEmail: function() {
    	$('#emailTip p').removeClass('fieldError').text('');
        var email = $('#email').val();
        var regexp = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(email.Trim().length == 0){
        	$('#emailTip p').text('请输入有效的邮箱地址').addClass('fieldError').show();
            this.emailOK = false;
            return true;
        }
        if(!regexp.test(email)) {
            $('#emailTip p').text('请输入有效的邮箱地址').addClass('fieldError').show();
            this.emailOK = false;
            return false;
        }
        $.ajax({
            type:'post',
            url:'/account/checkEmailAction.do',
            data:{'email':email},
            success: function(response) {
                checkInput.emailOK = false;
                if('emailExist' == response.state) {
                    $('#emailOK').hide();
                    $('#emailTip p').addClass('fieldError').text('对不起,该邮箱地址已被占用').show();
                } else if('success' == response.state || 'emptyEmail' == response.state){
                    $('#emailTip p').removeClass('fieldError').text('');
                    $('#emailOK').show();
                    checkInput.emailOK = true;
                } else {
                    $('#emailOK').hide();
                    $('#emailTip p').addClass('fieldError').text('系统异常,暂时无法提供服务').show();
                }
            }
        });
    },
    checkOldPassword: function() {
        
    },
    //检查两个密码是否一致的细节
    checkPassword: function() {
        var pass = $('#password').val();
        if(pass.length < 6 || pass.length > 20) {
            $('#passwordTip p').addClass('fieldError').text('新密码长度应为6-20位');
            $('#passwordOK').hide();
            return false;
        } else {
            var pass2 = $('#password2').val();
            if(pass2.length > 0) {
                if(pass == pass2) {
                    $('#passwordTip p,#password2Tip p').removeClass('fieldError').text('');
                    $('#passwordOK,#password2OK').show();
                } else {
                    $('#password2OK').hide();
                    $('#password2Tip p').addClass('fieldError').text('两次输入的密码不一致');
                }
            }
            $('#passwordOK').show();
            $('#passwordTip p').removeClass('fieldError').text('');
            return true;
        }
    },
    checkPassword2: function() {
        if($('#password').val() != $('#password2').val()) {
            $('#password2OK').hide();
            $('#password2Tip p').addClass('fieldError').text('两次输入的密码不一致');
            return false;
        } else {
            if($('#password2').val().length > 0) {
                $('#password2Tip p').removeClass('fieldError').text('');
                $('#password2OK').show();
                return true;
            } else {
                $('#password2OK').hide();
                return false;
            }
        }
    },
    checkVerifyCode: function() {
        if($('#verifyCode').val().Trim().length < 4) {
            $('#verifyCodeTip p').addClass('fieldError').text('请输入验证码');
            return false;
        } else {
            $('#verifyCodeTip p').removeClass('fieldError').text('');
            return true;
        }
    },
    showTip:function(field) {
        $('#' + field.name + 'Tip p').removeClass('fieldError');
        if (field.name == 'email') {
            $('#emailTip p').text('用邮箱可找回密码');
        } else if (field.name == 'username') {
            $('#usernameTip p').text('请输入您想注册的用户名(长度：4-20)');
//        } else if (field.name == 'name') {
//            document.getElementById('nameTip').innerHTML = '您的昵称会显示在您创建的日历和加入的小组中。';
        } else if (field.name == 'password') {
            $('#passwordTip p').text('请输入6至20位密码');
        } else if (field.name == 'password2') {
            $('#password2Tip p').text('请再次输入您的密码');
        } else if(field.name=='verifyCode') {
            $('#verifyCodeTip p').text('请输入下面图片中的数字');
        } 
//        else if(field.name=='oldpassword') {
//            $('#oldpasswordTip').html('请输入注册时的密码');
//        }
    }
};

var formSubmiter = {
    modifyPageSubmit: function() {
        var pass = $('#password').val();
        var pass2 = $('#password2').val();
        if($('#modifyPass').prop('checked')) {
            if(!(checkInput.checkPassword() && checkInput.checkPassword2())) {
                return false;
            }
        } else {
            pass = pass2 = '';
        }
        $.ajax({
            type:'post',
            url:'/account/webUserSettingsAction.do',
            data:{
                userId:curUser.id,
                email:$('#email').val(),
                userName:$('#username').val(),
                oldPassword:hex_md5($('#oldpassword').val()),
                password:(0 == pass.Trim().length)?'':hex_md5(pass),
                password2:(0 == pass2.Trim().length)?'':hex_md5(pass2)
            },
            success: function(response) {
                var error = $('#errorInfo p');
                error.removeClass('pass').hide();
                switch(response.state) {
                case 'nouser':
                    error.html('登录后方能修改个人信息').show();break;
                case 'wrongpass':
                    error.html('原始密码不正确,请查实').show();break;
                case 'old_pass_empty':
                    error.html('原始密码不能为空').show();break;
                case 'invalid_email':
                    error.html('邮箱地址不合规则').show();break;
                case 'invalid_username':
                    error.html('用户名不合规则').show();break;
                case 'invalid_new_password':
                    error.html('新密码长度应为6-20位').show();break;
                case 'new_password_not_matched':
                    error.html('两次输入的新密码不一致').show();break;
                case 'exist_username':
                    error.html('用户名已被占用').show();break;
                case 'exist_email':
                    error.html('邮箱地址已被占用').show();break;
                case 'ok':
                    error.html('恭喜您,修改成功').addClass('pass').show();break;
                    default:
                }
            }
        });
    },
    regPageSubmit: function() {
        with(checkInput) {
            checkUsername();
            if(usernameOK && emailOK && checkPassword() && checkPassword2() && checkVerifyCode()) {
                $('#registerActionForm').submit();
            }
        }
    },
    bind_reg:function(){
    	with(checkInput) {
            checkUsername();
            if(usernameOK && checkPassword() && checkPassword2()) {
                return true;
            }else{
            	return false;
            }
        }
    }
};
//trim方法
String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, ""); 
}