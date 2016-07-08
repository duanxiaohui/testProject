define([
	'rebuild/base/common'
], function(c) {
	$.widget('mxx.importFromSina', {
		options: {
			target: null
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			$elem.click(function() {
				self.users ? self.showUsers(self.users) : $.ajax({
					type: 'post',
					url: '/weibo/friends-web.do',
					success: function(data) {
						if (data.state == 'no_weibo') {
							$.confirm('您的帐号还没有绑定新浪微博，是否现在绑定？', {
								buttons: [{
									text: '现在绑定',
									click: function() {
										$(this).dialog("close");
										location = '/account/manage.do?tab=account';
									}
								}]
							});
						} else if (data.state == 'ok') {
							self.showUsers(self.users = data.users);
						} else {
							$.alert('发现未知错误：' + data.state);
						}
					},
					dataType: 'json'
				});
			});
		},
		getAlreadyShared: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var $tb = $('#tb_share_user_list'),
				$trs = $tb.find('tr[accountType="-200"]'),
				ids = {};
			$trs.each(function(i, tr) {
				var $tr = $(this),
					id = $tr.attr('accountId');
				ids[id] = true;
			});
			return ids;
		},
		showUsers: function(users) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var ids = this.getAlreadyShared();
			var tmpl = '<li class="e_clear ui-corner-all" userid="{userId}" username="{screenName}"><div class="sina_avatar"><img src="{profileImageUrl.protocol}://{profileImageUrl.host}"/></div><div class="sina_name">{screenName}</div></li>';
			var html = ['<div title="请选择您的微博好友" class="sinafriend ui-corner-all ui-shadow none"><div class="sinafriend_list"><ul class="e_clear">', $.format(tmpl, $.map(users, function(o) {
				return ids[o.userId] ? undefined : o;
			})), '</ul></div><div class="sinafriend_bottom ui-corner-bl ui-corner-br"><a href="javascript:;" class="sinafriend_btn js_invite">确认邀请</a><div class="search_sinafriend"><input type="text" class="enter js_filter" placeholder="输入名字搜索"/></div></div></div>'].join('');
			var $content = $(html).dialog({
				width: 836,
				resizable: false
			});

			var $lis = $content.find('li').click(function(evt) {
				$(this).toggleClass('on');
			});
			$content.find('input.js_filter').placeholder().input({
				onInput: function(segName) {
					segName ? $lis.hide().filter('[username*=' + segName + ']').show() : $lis.show();
				}
			});

			$content.find('a.js_invite').click(function(evt) {
				var selectedUsers = $lis.filter('.on');
				if (selectedUsers.size()) {
					var arExist = [];
					selectedUsers.map(function() {
						var $li = $(this),
							userid = $li.attr('userid'),
							username = $li.attr('username');
						if (!opt.target.userValidate('addUser', {
							accountType: "-200",
							userid: userid,
							username: username,
							icon: 'sina_weibo'
						})) {
							arExist.push(username);
						}
					});
					$content.dialog('close');
					if (arExist.length) {
						$.alert('用户"' + arExist.slice(0, 3).join('"、"') + (arExist.length > 3 ? '"等' : '"') + '已在您的分享列表中');
					}
				} else {
					$.confirm("您没有选择任何新浪微博好友！ <br/>您希望：", {
						buttons: [{
							text: '选择好友',
							click: function() {
								$(this).dialog('close');
							}
						}, {
							text: '放弃选择',
							click: function() {
								$(this).dialog('close');
								$content.dialog('close');
							}
						}]
					});
				}
			});
		}
	});

})