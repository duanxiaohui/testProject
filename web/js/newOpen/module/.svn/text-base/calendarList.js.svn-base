/**
 * calendarList
 * @authors 张路 (zhanglu@365rili.com)
 * @date    2014-09-01 14:59:40
 */


define([
	'rebuild/base/common',
	'rebuild/base/calendar_Protocol'
], function(c, cp) {
	// console.log("module : calendarList");

	var _data = {};
	var _ex = {
		init: function() {

			//数据初始化
			_ex.initData();

			//逻辑初始化
			_ex.initLogic();

			//获取更新数据
			_ex.loadCalendarListData();
		},

		initData: function() {
			_data.usedColors = {};
			_data.oPermissions = {};
			_data.selectedClds = null;
			_data.selectedCld = null;
			_data.calendarList = null;

			//功能按钮
			_data.calendarControlData = {
				Edit: {
					text: '编辑日历',
					onclick: 'calendarCreator'
				},
				Del: {
					text: '删除日历',
					onclick: _ex.deleteCalendar
				},
				Only: {
					text: '只显示此日历',
					onclick: _ex.showOnly
				},
				Revoke: {
					text: '取消订阅',
					onclick: _ex.unsubscribe
				},
				Message: {
					text: '发送消息',
					onclick: 'msgCreator'
				},
				New: {
					text: '新建日历',
					onclick: 'calendarCreator'
				},
				BindGoogle: {
					text: '绑定Google日历',
					onclick: _ex.bindGoogle
				},
				UnbindGoogle: {
					text: '解除绑定：' + G.googleID,
					onclick: _ex.unbindGoogle
				},
				SyneGoogle: {
					text: '同步Google日历',
					onclick: _ex.syneGoogle
				}
			}
		},

		initLogic: function() {

			//更多按钮显示逻辑
			var $btn = $(".left_create_schedule_btn");
			$(".my_calendar_nav")
				.on('mouseenter', function() {
					$btn.stop(true, true).fadeIn('fast');
				})
				.on('mouseleave', function() {
					if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
						$btn.stop(true, true).fadeOut('fast');
					}
				});

			//点击展开或者折叠子项
			$(".my_calendar_nav, .group_calendar_nav, .palug_nav")
				.on('click', 'dt', function(e) {
					var o = $(this).next();
					if (o.find('li').size()) {
						o.stop(true, true).slideToggle('fast');
					}
				});

			//点击列表子项，切换选中状态，编辑日历。 经过时显示更多操作按钮
			$('.my_calendar_nav, .group_calendar_nav')
				.on('click', 'li', _ex.changeCurrentList)
				.on('mouseenter', 'li', function() {
					$('a.arrow', this).stop(true, true).fadeIn('fast');
				})
				.on('mouseleave', 'li', function() {
					var $btn = $('a.arrow', this);
					if (!($btn.data('bubbleMenu') && $btn.data('bubbleMenu').filter(':visible').size())) {
						$btn.stop(true, true).fadeOut('fast');
					}
				})
				.on('click', '.arrow', _ex.calendarControl);

			//侧栏展开收起
			$('#lnk_left_switcher').on('click', function() {
				$('#div_calendar_list').toggleClass("my_calendar_leftnone")
				$(this).toggleClass("hidden_bg");
				$('.palug_nav dd').show();
			});

			//日历集合设置
			$("#js-calendarList").on('click', '.calendar_ary_btn', _ex.calendarNavSet);

			//日历全选
			$(".selectCtrl").on('click', _ex.selectCtrl);

			$(".schedule_set_layer").on('click', function(e) {
				e.stopPropagation();
			});

			//保存多选集合
			$(".schedule_set_layer").on('click', '.save_ary', function(e) {
				var selectedInAryCount = 0;
				var selectedIds = [];
				$(".schedule_set_layer input:checkbox").each(function(i, o) {
					var me = $(this);
					var cid = me.attr("cid");
					var selectedInAry = me.prop("checked");
					if (selectedInAry) {
						selectedIds.push(cid);
					}
					$.each(_data.calendarList, function(i, o) {
						if (o.id == cid) {
							o.selectedInAry = selectedInAry;
						}
					});
				});

				$(".schedule_set_layer").fadeOut("fast");

				$.cookie('selectedClds' + G.currUser.id, JSON.stringify(selectedIds || []), {
					expires: 365
				});

				//数据更新
				amplify.publish('calendarListDataGeted', _data.calendarList);
			});

			$('body').on('click', function(e) {
				var $menu = $(".schedule_set_layer");
				if ($menu && $menu.is(':visible')) {
					$menu.fadeOut('fast');
				}
			});

			//点击加号按钮显示操作菜单
			$(".left_create_schedule_btn").on('click', _ex.mainCalendarControl)

			//其他插件
			// $("#ul_plugin_list a").calendarPlugin();
		},

		setCalendarSelectedList: function () {
			if($.cookie('selectedClds' + G.currUser.id) !== null) return;

			var cList = _data.calendarList;
			var selectedIds = [];
			for (var i = 0, l = cList.length; i < l; i++) {
				selectedIds.push(cList[i].id);
			};

			$.cookie('selectedClds' + G.currUser.id, JSON.stringify(selectedIds || []), {
				expires: 365
			});

			//数据更新
			amplify.publish('calendarListDataGeted', _data.calendarList);
		},

		selectCtrl: function () {
			var isSelected = $('.selectCtrl').hasClass('selectedAll');
			var needSelect = !isSelected;
			$('.schedule_set_layer input').prop('checked', needSelect);

			if(needSelect){
				$('.selectCtrl').addClass('selectedAll').html('全不选');
			}
			else{
				$('.selectCtrl').removeClass('selectedAll').html('全选');
			}
		},

		calendarNavSet: function (e) {
			if(e){
				e.preventDefault();
				e.stopPropagation();
			}
			var tmpl = '\
					<li>\
						<label>\
							<span class="schedule_set_icon" style="background:{color}"></span>\
							<span class="schedule_set_title" title="{title}">{title}</span>\
							<input type="checkbox" {checked} cid="{id}">\
						</label>\
					</li>';
			$(".schedule_set_layer ul").html($.format(tmpl, $.map(_data.calendarList, function(o) {
				if (o.selectedInAry) {
					o.checked = 'checked="checked"';
				} else {
					o.checked = '';
				}
				return o;
			})));
			//hide
			$(".schedule_layer").hide("fade");
			$(".add_schedule_layer").hide("fade");
			amplify.publish("closeRightBubbleMenu");
			//show
			$(".schedule_set_layer").show("fade");
			var $h = $(window).height() - 180;
			$(".schedule_set_layer ul").css("max-height", $h);

			var checkedLen = $('.schedule_set_layer input:checked').length;
			var checkBox = $('.schedule_set_layer input');

			//判断默认全选操作
			if(checkedLen === checkBox.length){
				$('.selectCtrl').addClass('selectedAll').html('全不选');
			}
			else{
				$('.selectCtrl').removeClass('selectedAll').html('全选');
			}
		},

		calendarControl: function (e) {
			e.preventDefault();
			e.stopPropagation();

			var $calendar = $(this),
				isPrimary = $calendar.attr('isprimary') == 'true',
				cid = $calendar.attr('cldid'),
				dataDomain = $calendar.attr('datadomain'),
				permit = _data.oPermissions[cid],
				isPublic = $calendar.attr('ispublic') == 'true';

			var button = [];
			if(permit != 1 && permit != 2 && dataDomain != 'google'){

				button.push(_data.calendarControlData.Edit);

				if(!isPrimary){
					button.push(_data.calendarControlData.Del);
				}
			}

			if(dataDomain != 'google' && !isPrimary){
				button.push(_data.calendarControlData.Revoke);
			}

			if(isPublic && permit == 3){
				button.push(_data.calendarControlData.Message);
			}

			$calendar.rightBubbleMenu({
				buttons: button
			});
		},

		mainCalendarControl: function (e) {
			e.preventDefault();
			e.stopPropagation();
			var calendarCData = _data.calendarControlData;
			var button = [_data.calendarControlData.New];
			//hide
			$(".add_schedule_layer").hide("fade");
			$(".schedule_set_layer").hide("fade");

			//google日历逻辑
			if(G.googleID){
				button.push(calendarCData.UnbindGoogle, calendarCData.SyneGoogle);
			}
			else{
				button.push(calendarCData.BindGoogle);
			}
			$(".left_create_schedule_btn").rightBubbleMenu({
				buttons: button
			});
		},

		unsubscribe: function() {
			var cldID = $(this).attr('cldID');
			$.confirm('确认取消订阅这个日历吗？', {
				buttons: [{
					text: "确定",
					click: function() {
						$(this).dialog("close");

						$.ajax({
							type: 'post',
							url: '/main/calendarManager/revoke.do',
							dataType: 'json',
							data: {
								calendarId: cldID
							},
							success: function(data) {
								if (data.state == 'wrongpass') {
									return amplify.publish('loginTimeout');
								}
								amplify.publish('calendarUnsubscribed');
							}
						});
					}
				}]
			});
		},

		showOnly: function() {
			var cldID = $(this).attr('cldID');
			self.showOnly(cldID);
		},

		deleteCalendar:function() {
			var cldID = $(this).attr('cldID'),
				name = $(this).attr('cldName');
			$.confirm('确定要删除这个日历吗？', {
				buttons: [{
					text: "删除",
					click: function() {
						$(this).dialog("close");
						$.ajax({
							url: '/main/calendarManager/delete.do',
							type: 'post',
							dataType: 'json',
							data: 'calendarId=' + cldID,
							success: function(data) {
								if (data.state == 'wrongpass') {
									return amplify.publish('loginTimeout');
								}
								if (data) {
									amplify.publish('calendarDeleted', cldID);
								}
								else {
									return $.alert('对不起，您没有删除该日历的权限！');
								}
							}
						});
					}
				}, {
					text: "取消",
					click: function() {
						$(this).dialog("close");
					}
				}]
			});
		},

		bindGoogle: function () {
			var instWin = open('http://when.365rili.com/google-account-bind-web.do', 'bindGoogleAnd365', 'width=347,height=530');
			var intervalId = setInterval(function() {
				if (instWin.closed) {
					clearInterval(intervalId);
					location.reload();
				}
			}, 100);
		},

		unbindGoogle: function () {
			$.confirm('确定要解除与Google帐号的绑定吗？', {
				buttons: [{
					click: function() {
						var dialog = this;
						$.ajax({
							type: 'post',
							url: '/removeGoogleBind-web.do',
							success: function(rslt) {
								if (rslt.state == 'ok') {
									location.reload();
									$(dialog).dialog('close');
								} else {

								}
							},
							dataType: 'json'
						});
					}
				}]
			});
		},

		syneGoogle: function() {
			$.loading();
			$.ajax({
				url: '/syncGoogle-web.do',
				type: 'post',
				data: {},
				dataType: 'json',
				success: function(result) {
					if (result.state == "ok") {
						location.reload();
					} else {
						$.loading.close();
						$.alert("同步出错！");
					}
				}
			});
		},

		changeCurrentList: function() {
			var cid, $li = null;
			if (arguments[0] === 'calendarListReady') {
				cid = _data.selectedCld;
				var $list = $('#js-calendarList li');
				for (var i = 0, len = $list.length; i < len; i++) {
					$li = $($list[i]);
					if ($li.attr('cldid') == cid) {
						$('#js-curCalendar').html($li.html());
						break;
					}
				};

				//未匹配到选中项，自动选中第一项
				if(i >= len){
					$li = $list.eq(_data.selectedClds.length ? 0 : 1);
					cid = $li.attr('cldid');
					$li.addClass('on');
				}
			} else {
				$li = $(this);
				_data.currentList = this;

				$li.parent().find(".on").removeClass("on");
				$li.addClass('on');

				cid = $li.attr('cldid') || '1';

			}

			//更新cookie
			$.cookie('selectedCalendarId' + G.currUser.id, cid, {
				expires: 365
			});

			//数据更新，切换了日历
			amplify.publish('currentListChanged', cid, 'currentListChanged');
		},

		checkSelectedCalendars: function () {
			var cid = arguments[0];
			if(cid == -1 && !_data.selectedClds.length){
				$.confirm('您尚未设置集合日历，是否进入设置界面？', {
					buttons: [{
						text: '设置',
						click: function (e) {
							_ex.calendarNavSet(e);
							$(this).dialog("close");
						}
					}]
				})
			}
		},

		updateListData: function() {

			/**
			 * 该函数不更新cookie，严格来说这个函数只维护内部数据
			 */
			if(arguments[1] === 'currentListChanged'){ //这里不能发送消息，否则会造成循环
				_data.selectedCld = arguments[0];
			}
			else{
				_data.calendarList = arguments[0];

				//显示颜色
				var hsl, calendar;
				for (var i = _data.calendarList.length - 1; i >= 0; i--) {
					calendar = _data.calendarList[i];

					hsl = c.rgbToHsl(calendar.color);
					calendar.bgc = c.hslToRgb.call(null, hsl[0], hsl[1], 0.96);
					calendar.sbgc = c.hslToRgb.call(null, hsl[0], hsl[1], 0.80);
				};

				_data.selectedClds = $.parseJSON($.cookie('selectedClds' + G.currUser.id) || '[]');
				_data.selectedCld = $.cookie('selectedCalendarId' + G.currUser.id);

				amplify.publish('calendarListDataUpdated', _data);
			}
		},

		loadCalendarListData: function() {
			$.ajax({
				url: '/admin/getPublicCalendarListWithExtendV2.do',
				type: 'post',
				dataType: 'json',
				success: function(data) {
					if (data.state == 'wrongpass') {
						return amplify.publish('loginTimeout');
					}
					data = data.list;
					for (var i = 0; i < data.length; i++) {
						data[i] = data[i].calendar;
					};
					data.sort(function(a, b) {
						var a_accessType = parseInt(a.access_type);
						var b_accessType = parseInt(b.access_type);
						var a_cid = parseInt(a.id);
						var b_cid = parseInt(b.id);

						//判断是否是主日历
						if (a.is_primary == "true" && a.data_domain != "google") {
							return -1;
						} else if (b.is_primary == "true" && b.data_domain != "google") {
							return 1;
						}

						//判断是否是google日历
						if (a.data_domain == "google" && b.data_domain != "google") {
							return -1;
						} else if (b.data_domain == "google" && a.data_domain != "google") {
							return 1;
						}
						if (a_accessType != b_accessType) {
							return b_accessType - a_accessType;
						}
						return a_cid - b_cid;
					});
					//获取数据完成
					amplify.publish('calendarListDataGeted', data);
				}
			});
		},

		renderList: function() {
			var data = (arguments[0]&&arguments[0].calendarList) || _data.calendarList || cp.getCalendarList();
			var tmpl = '<li title="{title}" cldID="{id}" cldName="{title}" isprimary="{is_primary}"  ispublic="{is_public}" datadomain="{data_domain}">{title}</li>',
				selectedInAryCount = 0;
				html = $.format(tmpl, $.map(data, function(o, i) {
					var hsl = c.rgbToHsl(o.color),
						h = hsl[0],
						s = hsl[1];
					o.title = c.htmlDecode(o.title);
					o.lightcolor = c.hslToRgb.call(null, h, s, 0.70);
					o.bgcolor = o.lightcolor;

					o.selectedInAry = $.inArray(o.id, _data.selectedClds) > -1 ? true : false;
					if (o.selectedInAry) {
						selectedInAryCount++;
					}

					o.calendar_purview_icon = o.access_type == "3" ? 'my_calendar_nav_set' : 'my_calendar_nav_set1';

					if (o.data_domain == "google") {
						o.calendar_purview_icon = "";
					}

					_data.oPermissions[o.id] = o.access_type;
					_data.usedColors[String(o.color).toLowerCase()] = o

					return o;
				}));
				
			$('.create_calendar_list').html(html);

			_ex.setScroll();
			//更新视图完成
			amplify.publish('calendarListReady', 'calendarListReady');

			//设置集合日历，如果为空则设置为全部日历
			_ex.setCalendarSelectedList();
		},

		setScroll: function() {
			var $calNav = $('dl.my_calendar_nav > dd'),
				windowH = $(window).height() - 190;
			if ($calNav.data('jsp')) {
				if ($calNav.is(':visible')) {
					$calNav.data('jsp').reinitialise();
					//判断如果不需要滚动条了，销毁jScrollPane
					if($calNav.data('jsp').getContentHeight() <= windowH){
						$calNav.data('jsp').destroy();
						
					}
				} else {
					$calNav.slideToggle(function() {
						$calNav.data('jsp').reinitialise();
						//判断如果不需要滚动条了，销毁jScrollPane
						if($calNav.data('jsp').getContentHeight() <= windowH){
							$calNav.data('jsp').destroy();
							
						}
					})
				}
			} else{
				$calNav.css("height", "");
				var height = $calNav.height();
				if(height > windowH){
					$calNav.height(windowH);
					$calNav.jScrollPane();					
				}
			}
		}
	};

	amplify.subscribe('initApp', _ex.init);
	amplify.subscribe('calendarListDataUpdated', _ex.renderList);
	amplify.subscribe('calendarListDataGeted', _ex.updateListData);
	amplify.subscribe('currentListChanged', _ex.updateListData);
	amplify.subscribe('currentListChanged', _ex.checkSelectedCalendars);
	amplify.subscribe('calendarListReady', _ex.changeCurrentList);
	amplify.subscribe('calendarCreated', _ex.loadCalendarListData);
	amplify.subscribe('calendarDeleted', _ex.loadCalendarListData);
	amplify.subscribe('calendarUnsubscribed', _ex.loadCalendarListData);

});