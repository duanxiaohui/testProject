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
	js365.runScriptMainBackgroundWnd('Cmd.setting("' + G.currUser.username + '");');
}
$.widget('mxx.simpleTab', {
	options: {
		cName: 'on',
		event: 'click',
		selected: 0
	},
	_create: function(){
		var self = this, $elem = self.element, opt = self.options;
		self.tabs = $elem.find('li');
		self.lnks = $elem.find('li > a');
		var ids = $.map(self.lnks.toArray(), function(lnk, i){
			return lnk.hash;
		}).join(',');
		self.contents = $(ids);
		
		self.lnks.bind(opt.event, function(evt){
			evt.preventDefault();
			var $lnk = $(this), $tab = $lnk.parent(), id = this.hash, $cont;
			if (!$tab.hasClass(opt.cName)) {
				self.tabs.removeClass(opt.cName);
				$tab.addClass(opt.cName);
				$cont = self.contents.hide().filter(id).show('fade');
				//$cont.find(':text,:password').not('[readonly]').first().focus();
			}
		});
		self.lnks.eq(opt.selected).click();
	}
});

function showHintText($elem, text){
	var $hint = $elem.parents('dd').find('div.password_wrong');
	$hint.html(text).show();
	$elem.blur().one('focus', function(){
		$hint.hide();
	});
	return true;
}

function initBasicInfoPanel(){
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
		
		'hotmail.com': 'https://login.live.com/',
		
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
	
	$('#lnk_save_email').click(function(evt){
		evt.preventDefault();
		//检查用户输入的email
		var submitCancel = false;
		var rEmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var $username = $('#username'), $email = $('#safe_email'), email = $.trim($email.placeholder('val'));
		if (email == '') {
			submitCancel = showHintText($email, '请填写电子邮件帐号') || submitCancel;
		} else if (!rEmail.test(email)) {
			submitCancel = showHintText($email, '请填写正确电子邮件帐号') || submitCancel;
		}
		var $pwd = $('#password365'), pwd = $pwd.val();
		if (pwd == '') {
			submitCancel = showHintText($pwd, '请填写登录365日历的密码') || submitCancel;
		}
		
		submitCancel ||
		$.ajax({
			url: '/account/basicInfo.do',
			type: 'post',
			data: {
				email: email,
				userName: $username.val(),
				password: hex_md5(pwd)
			},
			success: function(response){
				switch (response.state) {
					case 'wrongpass':
						showHintText($pwd, '原始密码不正确,请查实');
						break;
					case 'invalid_email':
						showHintText($email, '请填写正确电子邮件帐号');
						break;
					case 'exist_email':
						showHintText($email, '邮箱地址已被占用');
						break;
					case 'invalid_username':
						showHintText($username, '用户名不合规则');
						break;
					case 'exist_username':
						showHintText($username, '用户名已被占用');
						break;
					case 'ok':
						$.alert("恭喜您，修改成功！<br>已向您的邮箱发送邮箱验证邮件，请前往查看。", {
							buttons: {
								'确定': function(){
									//尝试分析email地址，帮助用户打开邮箱
									var domain = (email.split('@')[1] || '').toLowerCase();
									if (map[domain]) {
										window.open(map[domain], 'emailLogin');
									}
									$(this).dialog("close");
									location.reload();
								}
							}
						});
						break;
					default:
						break;
				}
			}
		});
	});
	$('#password365').ctrlEnter({
		action: '#lnk_save_email',
		noCtrl: true
	});
	
	
	$('#div_third_accouts dl').account();
	
	
}
(function(){
	function getCnName(partner){
		return {
			google: '谷歌',
			baidu: '百度',
			qh360: '奇虎360',
			weibo: '新浪微博',
			qqz: 'QQ空间',
			qqt: '腾讯微博',
			outlook: 'Outlook'
		}[partner];
	}
	$.widget('mxx.account', {
		options: {
			bindText: '马上绑定',
			unbindText: '解除绑定'
		},
		_create: function(){
			var self = this, $elem = self.element, opt = self.options;
			
			self.partner = $elem.attr('partner');
			self.partnerName = getCnName(self.partner);
			self.enable = $elem.attr('enable') == 'true';
			self.allowBind = $elem.attr('allowBind') == 'true';
			self.urlGet = $elem.attr('load');
			self.urlBind = $elem.attr('bind');
			self.urlUnbind = $elem.attr('unbind');
			
			self.$lnk = $elem.find('a.js_bind');
			self.$lnk.click(function(evt){
				evt.preventDefault();
				var $lnk = $(this), $elem = $lnk.parents('dl'), txt = $lnk.text();
				if (txt == opt.bindText) {
					var winParam = self.urlBind.split(';');
					if (winParam.length > 1) {
						var instWin = window.open.apply(window, winParam);
						
						var intervalId = setInterval(function(){
							if (instWin.closed) {
								clearInterval(intervalId);
								self.partner == 'google' && self._init();
							} else if (instWin.qqtAuth == "success" || instWin.weiboAuth == "success") {
								instWin.close();
								clearInterval(intervalId);
								self._init();
							}
						}, 100);
						
					} else {
						//for outlook
					}
				} else if (txt == opt.unbindText) {
					$.confirm('确定要解除与' + self.partnerName + '帐号的绑定吗？', {
						buttons: [{
							click: function(){
								var dialog = this;
								$.ajax({
									type: 'post',
									url: self.urlUnbind,
									data: self.partner == 'outlook' ? {
										outlookAccount: self.account
									} : {},
									success: function(rslt){
										if (rslt == 'ok') {
											self._showAccount('');
										}
										$(dialog).dialog('close');
									},
									dataType: 'json'
								});
							}
						}]
					});
				}
			});
		},
		_init: function(){
			var self = this, $elem = self.element, opt = self.options;
			var $lnk = this.$lnk;
			
			if (self.enable) {
				$.ajax({
					url: self.urlGet,
					type: 'post',
					success: function(account){
						self._showAccount(account);
					}
				});
			} else {
				$elem.hide();
			}
		},
		_showAccount: function(account){
			var self = this, $elem = self.element, opt = self.options;
			this.account = account;
			$elem.find('dd.mail_address').text(account);
			if (account) {
				self.$lnk.html(opt.unbindText);
			} else {
				if (self.allowBind) {
					self.$lnk.html(opt.bindText);
				} else {
					$elem.hide();
				}
			}
		}
	});
})();


function initSafeSettingPanel(){
	$('#lnk_save_pwd').click(function(evt){
		evt.preventDefault();
		var $oripwd = $('#pwd_oripwd'), oripwd = $oripwd.val(), submitCancel = false;
		if (oripwd == '') {
			submitCancel = showHintText($oripwd, '请填写登录365日历的密码') || submitCancel;
		}
		
		var $newpwd = $('#pwd_newpwd'), newpwd = $newpwd.val();
		if (newpwd == '') {
			submitCancel = showHintText($newpwd, '请填写新密码') || submitCancel;
		} else if (newpwd.length < 6 || newpwd.length > 20) {
			submitCancel = showHintText($newpwd, '新密码长度应为6-20位') || submitCancel;
		}
		
		var $rptpwd = $('#pwd_rptpwd'), rptpwd = $rptpwd.val();
		if (rptpwd == '') {
			submitCancel = showHintText($rptpwd, '请重复填写新密码') || submitCancel;
		}
		if (rptpwd != newpwd) {
			submitCancel = showHintText($rptpwd, '两次输入的新密码不一致') || submitCancel;
		}
		submitCancel ||
		$.ajax({
			url: '/account/changePwd.do',
			type: 'post',
			data: {
				password: hex_md5(oripwd),
				newPwd: hex_md5(newpwd),
				newPwd2: hex_md5(rptpwd)
			},
			success: function(response){
				switch (response.state) {
					case 'wrongpass':
						showHintText($oripwd, '原始密码不正确,请查实');
						break;
					case 'invalid_new_password':
						showHintText($newpwd, '新密码长度应为6-20位');
						break;
					case 'new_password_not_matched':
						showHintText($rptpwd, '两次输入的新密码不一致');
						break;
					case 'ok':
						$.alert("恭喜您，修改成功！");
						$("#safe_setting :input").val("");
						break;
					default:
				}
			}
		});
	});
	$('#pwd_rptpwd').ctrlEnter({
		action: '#lnk_save_pwd',
		noCtrl: true
	});
}

function initPersonalInfoPanel(){
	$('#dd_location select').addr();
	$('#ipt_birthday').datepicker($.getDPOptions({}));
}

$(function($){
	showLoginInfo();
	initBasicInfoPanel();
	initSafeSettingPanel();
	//initPersonalInfoPanel();
	$('#safe_email').placeholder();
	$('#div_tab').simpleTab();
	
});
