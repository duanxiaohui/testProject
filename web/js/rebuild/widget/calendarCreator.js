define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol',
	'rebuild/widget/placeholder',
	'rebuild/widget/userValidate',
	'rebuild/widget/ctrlEnter',
	'rebuild/widget/importFromSina',
	'rebuild/widget/loading'
], function(c, cp) {
	$.widget('mxx.calendarCreator', {
		options: {
			usedColors: [],
			attrCldID: 'cldID',
			attrCldName: 'cldName',
			target: null
		},
		_create: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;

			var cldID, title = '创建新日历';
			if (opt.target && (cldID = opt.target.attr(opt.attrCldID))) {
				title = '编辑日历';
			}
			if (!self.addForm) {
				self._initForm();
			}

			self.addForm.dialog({
				title: title,
				width: 684,
				modal: true,
				open: function(evt, ui) {
					self.addForm.find(".create_schedule_email").show();
					cldID && self.loadData(cldID);
				}
			});
		},
		_initForm: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;

			var usedColors = cp.getUsedColors();
			var arColors = $.map('ce312d,df4176,9a409b,6629cf,30659b,2f63cf,12ab99,2c9360,009802,64ac00,aaab00,d7af00,f08800,df5500,a9706f,8d6c8d,617488,6f82a9,5a8d87,898a4e,b18c55'.split(','), function(c, o) {
				return {
					color: c,
					title: (o = usedColors['#' + c]) ? (o.title) : ''
				};
			});
			var tmpl = '<div class="create_schedule_layer ui-shadow none"><div class="create_schedule_content"><div class="create_schedule_box">' +
				'<dl class="e_clear"><dt>名称：<input type="hidden" class="js_cldid"/></dt>' +
				'<dd><input type="text" class="schedule_name js_cldname" maxlength="20" placeholder="请输入日历名称"/></dd></dl>' +
				//增加了日历描述
				'<dl class="e_clear"><dt>描述：</dt>' +
				'<dd><input type="text" class="schedule_description js_clddescption" maxlength="200" placeholder="请输入日历描述"/></dd></dl>' +

				'<dl class="e_clear"><dt>选颜色：</dt><dd class="e_clear"><div class="selected_color"></div>' +
				'<ul class="selected_color_list e_clear">' +
				$.format('<li title="{title}" bcolor="#{color}" style="background-color:#{color};"></li>', arColors) +
				'</ul></dd></dl></div><div class="create_schedule_email"><table cellspacing="0" cellpadding="0" width="100%" ><tr><th width="105"></th><th width="340" align="left">用户</th><th width="110">权限设置</th><th width="60">删除</th><th width="55"></th></tr><tr class="operating"><td width="105" align="right">共享给：</td><td width="340" align="left"><input maxlength="" type="text" class="add_email_input js_inputname"><a href="javascript:;" class="add_email_btn js_adduser">添加</a><span class="sina_icon js_import none" title="从新浪微博导入"><img src="/images/sina.png" width="16" height="16"/></span><span class="qq_icon none" title="从腾讯微博导入"><img src="/images/qq.png" width="16" height="16"/></span></td><td width="110" align="center"><select id="dlt_user_right" class="js_permit"><option value="1">收藏者</option><option value="2">管理员</option></select></td><td width="60"></td><td width="55"></td></tr><tr><td><div class="add_friends"><table class="js_userlist" cellspacing="0" cellpadding="0" width="100%" ></table></div></td></tr></table></div></div><div class="create_schedule_bottom"><a href="javascript:;" class="giveup_schedule_btn">放弃</a><a href="javascript:;" class="create_schedule_btn">保存</a></div></div>';

			self.addForm = $(tmpl);
			self.iptCldID = self.addForm.find('input.js_cldid');
			self.iptCldName = self.addForm.find('input.js_cldname');
			self.iptCldDesc = self.addForm.find('input.js_clddescption');
			self.colorList = self.addForm.find('ul.selected_color_list');
			self.colorDemo = self.colorList.prev();
			self.userList = self.addForm.find('table.js_userlist');
			self.iptShare = self.addForm.find('input.js_inputname');
			self.lnkAdd = self.addForm.find('a.js_adduser');
			self.spImport = self.addForm.find('span.js_import')
			self.btnCancel = self.addForm.find('a.giveup_schedule_btn');
			self.btnSave = self.addForm.find('a.create_schedule_btn');
			self.permit = self.addForm.find('select.js_permit');

			self.iptCldName.placeholder();
			self.iptCldDesc.placeholder();

			var $lis = self.colorList.find('li').click(function() {
					var color = $(this).attr('bcolor');
					self.colorDemo.css('background-color', color).attr('bcolor', color);
				}),
				$li = $lis.eq(Math.floor(Math.random() * $lis.size()));
			$lis = $lis.filter('[title=""]');
			$li = $lis.size() ? $lis.first() : $li;
			$li.click();

			self.lnkAdd.userValidate({
				input: self.iptShare,
				target: self.userList,
				permit: self.permit
			});
			self.iptShare.ctrlEnter({
				action: self.lnkAdd,
				noCtrl: true
			});
			self.spImport.importFromSina({
				target: self.lnkAdd
			});

			self.btnCancel.click(function(evt) {
				self.addForm.dialog('close');
			});
			self.btnSave.loading();
			self.btnSave.click(function(evt) {
				if (evt.isImmediatePropagationStopped() || self.btnSave.loading('is')) {
					return false;
				}
				evt.stopPropagation();
				var cid = self.iptCldID.val(),
					isEdit = !!cid,
					$ipt = self.iptCldName;
				var cldname = $.trim($ipt.placeholder('val')),
					color = self.colorDemo.attr('bcolor'),
					postData;
				var clddesc = $.trim(self.iptCldDesc.placeholder('val'));
				if (!cldname) {
					$.alert("请给您的日历起个名吧！", {
						buttons: {
							'确定': function() {
								$(this).dialog("close");
								$ipt.focus().select();
							}
						}
					});
					return;
				}

				postData = self._getShareUsersData();
				if (isEdit) {
					postData.name = cldname == self.iptCldName.attr('oriName') ? '' : cldname;
					postData.color = color == self.colorDemo.attr('oriColor') ? '' : color;

					if (clddesc != self.iptCldDesc.attr('oriDesc')) {
						postData.publicSetting = JSON.stringify({
							desc: clddesc
						});
					}

					if (!postData.name && !postData.color && !postData.publicSetting && postData.addShare == '[]' && postData.updatePower == '[]' && postData.deleShare == '[]') {
						$.confirm('日历设置没有修改，不需要保存！<br/>您希望：', {
							buttons: [{
								text: '不改了',
								click: function() {
									self.addForm.dialog('close');
									self.iptCldName.val(self.iptCldName.attr('oriName'));
									$(this).dialog('close');
								}
							}, {
								text: '继续修改'
							}]
						});
						return;
					}
				} else {
					postData = $.extend(postData, {
						color: self.colorDemo.attr('bcolor'),
						name: cldname,
						publicSetting: JSON.stringify({
							desc: clddesc
						})
					});
				}
				self.btnSave.loading('start');
				$.ajax({
					url: isEdit ? '/main/calendarManager/save.do' : '/main/calendarManager/create.do',
					type: 'post',
					dataType: 'json',
					data: postData,
					success: function(data) {
						self.btnSave.loading('end');
						if (data.state == 'wrongpass') {
							$.alert('对不起，您的登录已经过期，请重新登录！', {
								buttons: {
									'确定': function() {
										location = '/account/login.do';
									}
								}
							});
						} else {
							if (isEdit && data === true || data.state == 'ok') {
								amplify.publish("calendarCreated", isEdit ? '' : data.calendarId);
								self.addForm.dialog('close');
							}
						}
					},
					error: function() {
						self.btnSave.loading('end');
					}
				});
			});
		},
		_getShareUsersData: function() {
			var self = this,
				$elem = $(this.element),
				opt = this.options;
			var cid = self.iptCldID.val(),
				isEdit = !!cid,
				$trs = self.userList.find('tr'),
				spliter = ':';

			if (isEdit) {
				var addShare = [],
					deleShare = [],
					updatePower = [],
					oUsers = {},
					oUsersNoAccess = {};

				$.each(self.oriData.users, function(i, o) {
					var ar = [o.accountType, o.accountId, o.accountName];
					oUsers[ar.join(spliter)] = o;
				});

				$trs.each(function() {
					var $tr = $(this),
						accountType = $tr.attr('accountType'),
						accountId = $tr.attr('accountId'),
						accountName = $tr.attr('accountName'),
						accessType = $tr.find('select').val();
					var ar = [accountType, accountId, accountName],
						user;

					if (user = oUsers[ar.join(spliter)]) {
						delete oUsers[ar.join(spliter)];
						if (accessType != user.accessType) {
							updatePower.push($.extend({}, user, {
								accessType: accessType
							}));
						}
					} else {
						addShare.push({
							accountType: accountType,
							accountId: accountId,
							accountName: accountName,
							accessType: accessType
						});
					}
				});

				$.each(oUsers, function(_, user) {
					deleShare.push({
						accountId: user.accountId,
						accountType: user.accountType,
						invitationId: user.invitationId
					});
				});

				return {
					calendarId: cid,
					addShare: JSON.stringify(addShare),
					deleShare: JSON.stringify(deleShare),
					updatePower: JSON.stringify(updatePower)
				};
			} else {
				return {
					share: JSON.stringify($trs.map(function() {
						var $tr = $(this),
							obj = {
								accountType: $tr.attr('accountType'),
								invitationId: $tr.attr('accountId'),
								accessType: $tr.find('select').val()
							};
						obj.accountType == '-100' || (obj.accountName = $tr.attr('accountName'));
						return obj;
					}).get())
				};
			}
		},
		loadData: function(cldID) {
			var self = this,
				$elem = $(this.element),
				opt = this.options;

			$.ajax('/main/getCalendarInfo.do?id=' + cldID, {
				dataType: 'json',
				cache: false,
				success: function(data) {
					if (data.state == 'ok') {
						self.oriData = data;
						self.iptCldID.val(data.calendarId);
						self.iptCldName.val(data.calendarName).attr('oriName', data.calendarName);
						self.iptCldDesc.val(data.desc).attr('oriDesc', data.desc);
						self.colorDemo.css('background-color', data.calendarColor).attr('bcolor', data.calendarColor).attr('oriColor', data.calendarColor);
						if (data.isPrimary == "true" && data.users.length==0) {
							self.addForm.find(".create_schedule_email").hide();
						}
						$.each(data.users, function(i, o) {
							o = $.extend({}, o)
							o.userid = o.accountId;
							o.username = o.accountName;
							o.icon = o.accountType == '-100' ? 'rili365' : o.accountType == '-200' ? 'sina_weibo' : 'email_icon';
							self.lnkAdd.userValidate('addUser', o);
						});
					} else if (data.state == 'wrongpass') {
						amplify.publish("loginTimeout");
					} else {
						$.alert('数据异常');
					}
				},
				error: function() {

				}
			});
		}
	});
})