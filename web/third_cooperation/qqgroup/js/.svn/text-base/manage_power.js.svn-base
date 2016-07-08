require.config({
    baseUrl: '/third_cooperation/base_calendar/js/app/',
    paths: {
        "zepto": "/js/lib/zepto.min",
        /* ----- common ----- */
        "util": "common/util"
    },
    shim: {
        "zepto": {
            exports : "$"
        }
    }
});
require(['zepto', 'util'], function ($, util){
	var access_token = util.query('access_token');
	var openid = util.query('openid');
	var group_openid = util.query('group_openid');
	var cid = util.query('cid');

	$.ajax({
		url: '/mobile-qqun/userList.do',
		data: {
			cid: cid
		},
		dataType: 'json',
		success: function (data) {
			if(data.state == 'error'){
				return window.history.go(-1);
			}
			$('\
				<img width="50" height="50" src="'+ data.header +'" alt="">\
				<div class="info">\
					<h4 class="'+ (data.identity == 2 ? 'master' : 'manager') +'">'+ '我' +'</h4>\
					<p>您可以收回或授予普通成员在本群创建日程的权限</p>\
				</div>\
			').appendTo('.manage_top .face');

			if(data.userList){
				var html = '<ul>' + util.format('\
					<li>\
						<div class="face">\
							<img width="50" height="50" src="{$header}" alt="">\
							<div class="name">\
								{$nick}\
								<div class="checkBox">\
									<input data-userid="{$user_id}" class="ios7CBox setBtn" {$access_type} type="checkbox">\
								</div>\
							</div>\
						</div>\
					</li>\
				', data.userList, {
					'access_type': function (o,p,d,i) {
						return o == 2 ? 'checked' : '';
					}
				}) + '</ul>';
			}
			else{
				var panelTop = $('.manage_panel').position().top;
				html = '\
					<div style="text-align:center; margin-top: 50px; height:'+ ($('body').height() - panelTop) +'px;">\
						<img src="/third_cooperation/qqgroup/images/icon_noMember.png" alt="" width="64px" />\
						<p style="margin-top: 10px; font-size: 15px; color:#a1aaaf; line-height: 25px;">暂无成员</p>\
						<a href="javascript:;" class="shareToQun">通知成员</a>\
						<p style="margin-top: 10px; font-size: 15px; color:#a1aaaf; line-height: 25px;">点击按钮后，会向聊天窗口发送一条消息，<br /> 成员点击消息授权后才能进入日历。</p>\
					</div>\
				';

				$('.manage_panel').on('tap.shareTo', '.shareToQun', shareTo)
			}

			function shareTo () {
				$('.manage_panel').off('tap.shareTo');

				$.ajax({
					url: '/mobile-qqun/check.do',
					data: {
						cid: cid
					},
					dataType: 'json',
					success: function (data) {
						if(data.state == 'error'){
						$('.manage_panel').on('tap.shareTo', '.shareToQun', shareTo)
							return plug.alert('', data.reason);
						}
						window.openGroup.share({
							appid: 100296108,
							openid: openid,
							group_openid: group_openid,
							title: '我邀请你一起使用365日历，分享群日程，纪录群里重要的事情。',
							desc: '大家都来了，就差你了！',
							share_url: 'http://qq.365rili.com/mobile-qqun/main.do',
							image_url: 'http://qq.365rili.com/images/114.png',
							debug: 1,
							onSuccess: function() {
								$.ajax({url: '/mobile-qqun/share.do?cid=' + cid});
								plug.alert('', '发送成功，请到会话窗口查看');
								$('.manage_panel').on('tap.shareTo', '.shareToQun', shareTo)
							},
							onCancel: function() {
						    	$('.manage_panel').on('tap.shareTo', '.shareToQun', shareTo)
							},
							onError: function() {
								plug.alert('', '发送失败，请重试');
								$('.manage_panel').on('tap.shareTo', '.shareToQun', shareTo)
							}
						});
					}
				});
			}

			$('.manage_panel').append(html);

			$('.showRule a').on('tap', function () {
				plug.alert('权限说明', '\
					<div class="showRuleContent">\
					<h5>各位群主和管理员同学，我们诚邀大家担负起神圣的使命，即日起，大家可以对普通成员进行如下操作：</h5>\
					<ol>\
					<li>删除ta的日程</li>\
					<li>收回或授予ta创建日程权利</li>\
					</ol>\
					<h5>为了美好的明天，大家一起来维护起群日程的纯洁和有效性吧！\
					</div>\
				');
			})

			$('.setBtn').on('change', function () {
				var _this = this;
				var userid = $(_this).data('userid');
				var state = !_this.checked;
				$.ajax({
					url: '/mobile-qqun/'+ (state ? 'revoke' : 'grant') +'.do',
					data: {
						cid: cid,
						uid: userid
					},
					dataType: 'json',
					success: function (data) {
						if(data.state == 'error'){
							_this.checked = !_this.checked;
							plug.alert('',data.reason.replace(/\s/gi, '<br />'), function () {
								if(data.action == 'main'){
									return window.history.go(-1);
								}
								window.location.reload();
							});
						}
					},
					error: function () {
						_this.checked = !_this.checked;
						plug.alert('','设置失败，请稍后重试');
					}
				});
			})
		}
	})
});