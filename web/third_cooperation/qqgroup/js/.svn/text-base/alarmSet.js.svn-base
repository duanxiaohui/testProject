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
var identity = '';
require(['zepto', 'util'], function ($, util){
	var access_token = util.query('access_token');
	var openid = util.query('openid');
	var group_openid = util.query('group_openid');
	var cid = util.query('cid');
	$.ajax({
		url: '/mobile-qqun/refreshUserInfo.do',
		data: {
			access_token: access_token,
			openid: openid,
			group_openid: group_openid,
			t: +new Date()
		},
		dataType: 'json',
		success: function (_data) {
			identity = _data.identity;
			$('<img width="50" height="50" src="'+_data.header+'" alt=""><p>我</p>').appendTo('.face1')
			if(_data.identity != 1){
				$('.qun, .ts').removeClass('none');
				$('<i class="'+(_data.identity == 2 ? 'master' : 'manager')+'">'+(_data.identity == 2 ? '群主' : '管理员')+'</i><em>您可以管理群内消息推送和分享</em>').appendTo('.face1 p');
			}
			else{
				$('<em>您可以管理个人消息</em>').appendTo('.face1 p');
			}
			$('.person').removeClass('none');

			$.ajax({
				url: '/mobile-qqun/queryQQunRecommendStatus.do',
				data: {
					group_openid: group_openid,
					cid: cid,
					t: +new Date()
				},
				dataType: 'json',
				success: function (data) {
					if(data.qqunPush == 'open'){
						$('#qqunPush').prop('checked', true);
					}
					if(data.qqunShare == 'open'){
						$('#qqunShare').prop('checked', true);
					}
					else{
						$('#userShare').prop('disabled', true);
						$('<p class="alarm_panelWar">'+(identity != 1 ? '该群个人分享权限已关闭' : '群主 / 管理员 已关闭该群个人分享权限')+'</p>').appendTo('.person');
					}
					if(data.userShare == 'open'){
						$('#userShare').prop('checked', true);
					}

					$('#qqunPush').on('change', changeQqunPush);
					$('#qqunShare').on('change', changeQqunShare);
					$('#userShare').on('change', changeUserShare);
				}
			});
		}
	});
	function changeQqunPush () {
		var _this = this;
		var action = $(this).prop('checked') ? 'open' : 'close';
		$.ajax({
			url: '/mobile-qqun/updateRecommendPushStatus.do',
			data: {
				group_openid: group_openid,
				cid: cid,
				action: action
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
	}	
	function changeQqunShare () {
		var _this = this;
		var action = $(this).prop('checked') ? 'open' : 'close';
		$('#userShare').prop('disabled', action == 'close');
		$.ajax({
			url: '/mobile-qqun/updateQQunRecommendShareStatus.do',
			data: {
				group_openid: group_openid,
				cid: cid,
				action: action
			},
			dataType: 'json',
			success: function (data) {
				if(data.state == 'error'){
					_this.checked = !_this.checked;
					$('#userShare').prop('disabled', !(action == 'close'));
					plug.alert('',data.reason.replace(/\s/gi, '<br />'), function () {
						if(data.action == 'main'){
							return window.history.go(-1);
						}
						window.location.reload();
					});
				}

				if(action == 'close'){
					$('<p class="alarm_panelWar">'+(identity != 1 ? '该群个人分享权限已关闭' : '群主 / 管理员 已关闭该群个人分享权限')+'</p>').appendTo('.person');
				}
				else{
					$('.alarm_panelWar').remove();
				}
			},
			error: function () {
				_this.checked = !_this.checked;
				plug.alert('','设置失败，请稍后重试');
			}
		});
	}	
	function changeUserShare () {
		var _this = this;
		var action = $(this).prop('checked') ? 'open' : 'close';
		$.ajax({
			url: '/mobile-qqun/updateUserRecommendShareStatus.do',
			data: {
				group_openid: group_openid,
				cid: cid,
				action: action
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
	}
});