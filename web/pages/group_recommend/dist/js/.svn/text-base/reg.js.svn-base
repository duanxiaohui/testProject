/**
 * 
 * @authors zhangmingchen (vest0804@gmail.com)
 * @date    2015-09-22 19:31:59
 * @version $Id$
 */
(function () {
	var reg ={
		init:function () {
			$('.sub_btn').click(function () {
				var flag = reg.inspec();
				if(!flag) return;
				reg.submits();
			})
		},
		submits:function () {
			$.ajax({
				url:'http://www.365rili.com/pages/group_recommend/ajax.html?'+$("form").serialize(),
				complete:function () {
					$('.reg').hide();
					$('.success').show();
				}
			})
		},
		inspec:function () {
			var acc_val = $.trim($('.acc').find('input').val());
			var group_name_val = $.trim($('.group_name').find('input').val());

			var group_info = $.trim($('.group_info').find('textarea').val());

			var user_name = $.trim($('.user_name').find('input').val());

			var user_tel = $.trim($('.user_tel').find('input').val());

			var user_mail = $.trim($('.user_mail').find('input').val());

			var user_info = $.trim($('.user_info').find('textarea').val());

			if(acc_val == ''){
				alert("请输入您的365日历账号")
				$('.acc').find('input').focus();
				return false;
			}
			if(group_name_val == ''){
				alert("请填写申请助力计划的群组日历名称")
				$('.group_name').find('input').focus();
				return false;
			}
			if(group_info == ''){
				alert("请填写群组日历的简介")
				$('.group_info').find('textarea').focus();
				return false;
			}
			if(group_info.length > 50){
				alert("您输入的简介已超过50字")
				$('.group_info').find('textarea').focus();
				return false;
			}
			if(user_name == ''){
				alert("请输入真实姓名")
				$('.user_name').find('input').focus();
				return false;
			}
			if(user_tel == ''){
				alert("请输入手机号")
				$('.user_tel').find('input').focus();
				return false;
			}
			if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(user_tel)) || user_tel.length != 11) {
                alert('请输入正确格式的手机号码！');
                $('.user_tel').find('input').focus();
                return false;
            }
			if(user_mail == ''){
				alert("请输入邮箱")
				$('.user_mail').find('input').focus();
				return false;
			}
			if(user_mail.length > 50 || !/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/i.test(user_mail)) {
					$('#user_mail').val(' ').focus();
					alert('您输入的邮箱有误');
					return false;
			}
			if(user_info == ''){
				alert("告诉我们为什么要“宠幸”这个群组")
				$('.user_info').find('textarea').focus();
				return false;
			}
			if(user_info.length > 300){
				alert("您输入的文字已超过300字")
				$('.user_info').find('textarea').focus();
				return false;
			}

			return true;
		}

	};
	reg.init();
})()