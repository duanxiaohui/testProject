define([
	'rebuild/base/common'
], function(c) {
	$.widget('mxx.userValidate', {
		options: {
			input: null,
			target: null,
			permit: null
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			$elem.click(function() {
				var $ipt = opt.input,
					username = $ipt.val();
				if (!username) {
					return $.alert("请填写用户名或邮箱！", {
						buttons: {
							'确定': function() {
								$(this).dialog("close");
								$ipt.focus().select();
							}
						}
					});
				}

				$.ajax({
					type: 'post',
					url: '/account/findUser.do',
					data: {
						username: username
					},
					dataType: 'json',
					error: function() {
						$.alert('对不起，网络繁忙，请稍后再试。');
					},
					success: function(data) {
						if (data.state == "correct") {
							if (!self.addUser($.extend(data, {
								accountType: "-100",
								icon: 'rili365'
							}))) {
								$.alert("该用户已在您的分享列表中！", {
									close: function() {
										$ipt.val('').focus();
									}
								});
							}
						} else if (data.state == "currentUser") {
							$.alert("您填写的是自己的用户名或邮箱！", {
								close: function() {
									$ipt.val('').focus();
								}
							});
						} else if (data.state == "noExist") {
							var rEemail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
							if (rEemail.test(username)) {
								$.confirm('该用户还不是365日历用户，确定邀请您的朋友加入吗？', {
									buttons: [{
										text: '马上邀请',
										click: function() {
											if (!self.addUser($.extend(data, {
												accountType: "-300",
												userid: '-1',
												username: username,
												icon: 'email_icon'
											}))) {
												$.alert("该用户已在您的分享列表中！", {
													close: function() {
														$ipt.val('').focus();
													}
												});
											}
											$(this).dialog('close');
										}
									}]
								});
							} else if (data.state == 'wrongpass') {
								$.alert('对不起，您的登录已经过期，请重新登录！', {
									buttons: {
										'确定': function() {
											location = '/account/login.do';
										}
									}
								});
							} else {
								$.alert("该用户不存在，请输入您要邀请的的邮箱地址！", {
									close: function() {
										$ipt.focus().select();
									}
								});
							}
						}
					}
				});
			});
		},
		addUser: function(data) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var $tb = opt.target,
				$ipt = opt.input,
				selected = ' selected="selected"',
				accessType = data.accessType || opt.permit.val();
			if (!$tb.find('tr[accountType="' + data.accountType + '"][accountId="' + data.userid + '"][accountName="' + data.username + '"]').size()) {
				var tmpl = '<tr accountType="{accountType}" accountId="{userid}" accountName="{username}">\
						<td width="105" align="center">&nbsp;</td>\
						<td width="340" align="left">\
							<div class="mail_type {icon}">{username}</div>\
						</td>\
						<td width="110" align="center"><select id="dlt_user_right_{userid}"><option value="1"{readonly}>收藏者</option><option value="2"{edit}>管理员</option></select></td>\
						<td width="60" align="center"><a href="javascript:;" class="js_del_user" title="取消当前日历对{username}的共享">删除</a></td>\
						<td width="55">&nbsp;</td>\
					</tr>';
				/*[
			 {"accountType":"-100","accountId":"29055524","accessType":"1"},
			 {"accountType":"-200","accountId":"1747514562","accessType":"2","accountName":"劉嘉玲"}
			 {"accountType":"-300","accountId":-1,"accessType":"1","accountName":"meixuexiang@gmail.com"},
			 ] */
				var $tr = $($.format(tmpl, $.extend(data, {
					readonly: accessType == '1' ? selected : '',
					edit: accessType == '2' ? selected : '',
					admin: accessType == '3' ? selected : ''
				}))).prependTo($tb);

				$('a.js_del_user', $tr).click(function(evt) {
					evt.preventDefault();
					$(this).blur().parents('tr[accountId]').remove();
				});

				$ipt.val('').focus();
				return true;
			}
			return false;
		}
	});

})