function isPCVersion(){
	if ($.browser.webkit) {
		try {
			js365.runScriptDeskWnd('+new Date()');
			return true;
		} catch (ex) {
		}
	}
	return false;
}
 
if (isPCVersion()) {
	$(document.documentElement).removeClass('web').addClass('pc');
	js365.runScriptMainBackgroundWnd('Cmd.password();');
	$("#lnk_goback").attr("href","/account/login.do");
}
function toPage(pageNo){
	var $ul = $('#ul_tab'), cnames = ['', 'second', 'third'];
	$ul.removeClass(cnames.join(' ')).addClass(cnames[pageNo]);
	$ul.find('li').removeClass('on').eq(pageNo).addClass('on');
	return $('#div_panels > div').slice(0, 3).addClass('none').eq(pageNo).removeClass('none');
}

$(function(){
	var key = $.query('key');
	if (key && G.pageType == 2) {
		var $page = toPage(2), $hint = $('#div_tip');
		$('#ipt_pwd, #ipt_cfm').ctrlEnter({
			action: $('#lnk_reset_pwd'),
			noCtrl: true
		});
		$('#lnk_reset_pwd').click(function(evt){
			evt.preventDefault();
			if (requesting) { return; }
			var $pwd = $('#ipt_pwd'), $cfm = $('#ipt_cfm'), pwd1 = $pwd.val(), pwd2 = $cfm.val();
			if (!pwd1) {
				$hint.text('请输入密码').show();
				return false;
			}
			if (pwd1.length < 6 || pwd1.length > 20) {
				$hint.text('密码长度应在6至20位之间').show();
				return false;
			}
			if (!pwd2) {
				$hint.text('请输入确认密码').show();
				return false;
			}
			if (pwd1 != pwd2) {
				$hint.text('两次输入的密码不一致').show();
				return false;
			}
			$hint.hide();
			$.ajax({
				url: '/account/updatePwdAsync.do',
				type: 'post',
				data: {
					key: key,
					password: pwd1,
					password2: pwd2
				},
				dataType: 'json',
				success: function(data){
					if (data.state == 'ok') {
						$.alert('密码修改成功！点确定打开登录页面', {
							buttons: {
								'确定': function(){
									location = '/account/login.do';
								}
							}
						});
					} else {
						$.alert(data.message);
					}
				},
				error: function(){
					$.alert('系统繁忙，请稍后再试');
				},
				complete: function(){
					requesting = false;
				}
			})
		});
	}
	var map = {
		'126.com': 'http://www.126.com/',
		'vip.126.com': 'http://vip.126.com/',
		'163.com': 'http://mail.163.com/',
		'vip.163.com': 'http://vip.163.com/',
		'yeah.net': 'http://www.yeah.net/',
		'188.com': 'http://www.188.com/',
		
		'sina.com.cn': 'http://mail.sina.com.cn/',
		'vip.sina.com': 'http://vip.sina.com.cn/',
		
		'yahoo.cn': 'http://mail.cn.yahoo.com/',
		'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
		
		'21cn.com': 'http://mail.21cn.com/',
		'vip.21cn.com': 'http://mail.21cn.com/vip/',
		
		'gmail.com': 'http://mail.google.com/',
		
		'hotmail.com': 'mail.hotmail.com/',
		
		'qq.com': 'https://mail.qq.com/',
		'vip.qq.com': 'https://mail.qq.com/',
		'foxmail.com': 'https://mail.qq.com/',
		
		'tom.com': 'http://mail.tom.com/',
		'vip.tom.com': 'http://mail.tom.com/',
		'163.net': 'http://mail.tom.com/',
		
		'139.com': 'http://mail.10086.cn/',
		'189.cn': 'http://webmail3.189.cn/webmail/',
		'sogou.com': 'http://mail.sogou.com/',
		
		'sohu.com': 'http://mail.sohu.com/',
		'vip.sohu.com': 'http://vip.sohu.com/',
		
		'263.net': 'http://mail.263.net/',
		'263.net.cn': 'http://mail.263.net/',
		'x263.net': 'http://mail.263.net/'
	};
	var $iptName = $('#ipt_username'), $lnkSendEmail = $('#lnk_send_email'), requesting = false;
	$iptName.ctrlEnter({
		action: $lnkSendEmail,
		noCtrl: true
	});
	$lnkSendEmail.click(function(evt){
		evt.preventDefault();
		if (requesting) { return; }
		var username = $.trim($iptName.val());
		if (username) {
			requesting = true;
			$.ajax({
				url: '/account/send-retrieve-email-async.do',
				type: 'post',
				data: {
					username: username
				},
				dataType: 'json',
				success: function(data){
					//{"message":"已向您绑定的邮箱发送验证邮件，请查看","pageType":"1","state":"ok"}
					if (data.state == 'ok') {
						var $page1 = toPage(1);
						//$.alert(data.message);
						$.alert(data.message,{
							buttons: {
								'确定': function(){
									if(map[domain]){
										window.location =map[domain];
									}
									$(this).dialog("close");
								}
							}
						});
						var isEmail = username.indexOf('@') > -1;
						if (isEmail) {
							var domain = (username.split('@')[1] || '').toLowerCase();
							$page1.html('<p>我们已将“[365日历]找回密码”邮件发送到您的邮箱' + username + ' 中，请在30分钟内收信重置密码。</p>' + (map[domain] ? '<a href="' + map[domain] + '" class="go_email">去' + domain + '邮箱</a>' : '') + '<p>没有收到找回密码邮件？<br/>到邮件垃圾箱里找找，或者点击这里<a href="javascript:;" onclick="toPage(0)">重新发送找回密码邮件。</a></p>');
						} else {
							$page1.html('<p>我们已将“[365日历]找回密码”邮件发送到您的帐户' + username + ' 所绑定的邮箱中，请在30分钟内收信重置密码。</p><p>没有收到找回密码邮件？<br/>到邮件垃圾箱里找找，或者点击这里<a href="javascript:;" onclick="toPage(0)">重新发送找回密码邮件。</a></p>');
						}
					} else {
						$.alert(data.message);
					}
				},
				error: function(){
					$.alert('系统繁忙，请稍后再试，如需帮助，请联系客服人员');
				},
				complete: function(){
					requesting = false;
				}
			})
		} else {
			$.alert('请填写用户名或邮箱', {
				buttons: {
					'确定': function(){
						$iptName.val('').focus();
						$(this).dialog("close");
					}
				}
			});
		}
	});
	
});
